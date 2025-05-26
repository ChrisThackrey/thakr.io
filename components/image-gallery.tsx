"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ImageIcon, Maximize2, MessageSquare, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ZoomableImage } from "./zoomable-image"
import { FullscreenGallery } from "./fullscreen-gallery"
import { ImageShareMenu } from "./image-share-menu"
import { ImageDownloadButton } from "./image-download-button"
import { ImageAnnotationTool } from "./image-annotation-tool"
import { AnnotationPanel } from "./annotation-panel"
import { Badge } from "@/components/ui/badge"
import { ExportAnnotationsDialog } from "./export-annotations-dialog"
import { exportAnnotatedImage } from "@/utils/export-annotations"

export interface Annotation {
  id: string
  x: number
  y: number
  text: string
  color: string
}

interface ImageWithAnnotations {
  url: string
  alt: string
  caption?: string
  annotations?: Annotation[]
}

interface ImageGalleryProps {
  images: ImageWithAnnotations[]
  className?: string
  aspectRatio?: "square" | "video" | "wide" | "auto"
  height?: string
  showThumbnails?: boolean
  projectTitle?: string
}

interface ExportOptions {
  includeImage: boolean
  includeSummary: boolean
}

export function ImageGallery({
  images,
  className,
  aspectRatio = "video",
  height = "500px",
  showThumbnails = true,
  projectTitle = "Architecture Project",
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAnnotating, setIsAnnotating] = useState(false)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [imagesWithAnnotations, setImagesWithAnnotations] = useState<ImageWithAnnotations[]>(() => {
    return images.map((image) => ({
      ...image,
      annotations: image.annotations || [],
    }))
  })

  const [showExportDialog, setShowExportDialog] = useState(false)
  const annotatedImageRef = useRef<HTMLDivElement>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const currentImage = imagesWithAnnotations[currentIndex]
  const hasAnnotations = currentImage.annotations && currentImage.annotations.length > 0

  const goToNext = () => {
    if (!isZoomed && !isAnnotating) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesWithAnnotations.length)
    }
  }

  const goToPrevious = () => {
    if (!isZoomed && !isAnnotating) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesWithAnnotations.length) % imagesWithAnnotations.length)
    }
  }

  const goToImage = (index: number) => {
    if (!isZoomed && !isAnnotating) {
      setCurrentIndex(index)
    }
  }

  const handleZoomChange = (zoomed: boolean) => {
    setIsZoomed(zoomed)
  }

  const toggleFullscreen = () => {
    if (!isAnnotating) {
      setIsFullscreen(!isFullscreen)
    }
  }

  const toggleAnnotationMode = () => {
    setIsAnnotating(!isAnnotating)
    if (isZoomed) {
      setIsZoomed(false)
    }
  }

  const toggleShowAnnotations = () => {
    setShowAnnotations(!showAnnotations)
  }

  const addAnnotation = (annotation: Annotation) => {
    setImagesWithAnnotations((prev) => {
      const newImages = [...prev]
      const currentImageAnnotations = [...(newImages[currentIndex].annotations || [])]
      currentImageAnnotations.push(annotation)
      newImages[currentIndex] = {
        ...newImages[currentIndex],
        annotations: currentImageAnnotations,
      }
      return newImages
    })
  }

  const updateAnnotation = (id: string, text: string) => {
    setImagesWithAnnotations((prev) => {
      const newImages = [...prev]
      const currentImageAnnotations = [...(newImages[currentIndex].annotations || [])]
      const annotationIndex = currentImageAnnotations.findIndex((a) => a.id === id)
      if (annotationIndex !== -1) {
        currentImageAnnotations[annotationIndex] = {
          ...currentImageAnnotations[annotationIndex],
          text,
        }
      }
      newImages[currentIndex] = {
        ...newImages[currentIndex],
        annotations: currentImageAnnotations,
      }
      return newImages
    })
  }

  const deleteAnnotation = (id: string) => {
    setImagesWithAnnotations((prev) => {
      const newImages = [...prev]
      const currentImageAnnotations = [...(newImages[currentIndex].annotations || [])]
      const filteredAnnotations = currentImageAnnotations.filter((a) => a.id !== id)
      newImages[currentIndex] = {
        ...newImages[currentIndex],
        annotations: filteredAnnotations,
      }
      return newImages
    })
  }

  const handleExport = async (options: ExportOptions) => {
    if (annotatedImageRef.current) {
      await exportAnnotatedImage(
        annotatedImageRef.current,
        currentImage.url,
        currentImage.alt,
        currentImage.annotations || [],
        options,
      )
    }
  }

  // Exit annotation mode when changing images
  useEffect(() => {
    setIsAnnotating(false)
  }, [currentIndex])

  return (
    <>
      <div className={cn("space-y-4", className)} ref={containerRef}>
        <div className="relative group">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isAnnotating ? (
                  <ImageAnnotationTool
                    src={currentImage.url || "/placeholder.svg"}
                    alt={currentImage.alt}
                    aspectRatio={aspectRatio}
                    height={height}
                    onAddAnnotation={addAnnotation}
                    existingAnnotations={showAnnotations ? currentImage.annotations || [] : []}
                  />
                ) : (
                  <ZoomableImage
                    src={currentImage.url}
                    alt={currentImage.alt}
                    aspectRatio={aspectRatio}
                    height={height}
                    onZoomChange={handleZoomChange}
                    annotations={showAnnotations ? currentImage.annotations || [] : []}
                    isAnnotatable={!isZoomed}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Control buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant={isAnnotating ? "default" : "ghost"}
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90",
                isAnnotating && "bg-primary text-primary-foreground",
              )}
              onClick={toggleAnnotationMode}
              aria-label={isAnnotating ? "Exit annotation mode" : "Annotate image"}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>

            {hasAnnotations && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
                onClick={() => setShowExportDialog(true)}
                aria-label="Export with annotations"
              >
                <FileDown className="h-4 w-4" />
              </Button>
            )}

            {hasAnnotations && !isAnnotating && (
              <Button
                variant={showAnnotations ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90",
                  showAnnotations && "bg-primary text-primary-foreground",
                )}
                onClick={toggleShowAnnotations}
                aria-label={showAnnotations ? "Hide annotations" : "Show annotations"}
              >
                <Badge className="h-4 w-4 flex items-center justify-center p-0">
                  {currentImage.annotations?.length || 0}
                </Badge>
              </Button>
            )}

            <ImageDownloadButton
              imageUrl={currentImage.url}
              imageName={currentImage.alt}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
            />

            <ImageShareMenu
              imageUrl={currentImage.url}
              imageTitle={currentImage.alt}
              projectTitle={projectTitle}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
            />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
              onClick={toggleFullscreen}
              aria-label="View fullscreen"
              disabled={isAnnotating}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation arrows - only show when not zoomed and not annotating */}
          {!isZoomed && !isAnnotating && (
            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}

          {/* Image counter - only show when not zoomed and not annotating */}
          {!isZoomed && !isAnnotating && (
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow-md">
              {currentIndex + 1} / {imagesWithAnnotations.length}
            </div>
          )}

          {/* Caption - only show when not zoomed and not annotating */}
          {!isZoomed && !isAnnotating && currentImage.caption && (
            <div className="absolute bottom-4 left-20 right-4 bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 text-sm shadow-md">
              {currentImage.caption}
            </div>
          )}
        </div>

        {/* Annotation Panel - only show when in annotation mode */}
        {isAnnotating && currentImage.annotations && currentImage.annotations.length > 0 && (
          <AnnotationPanel
            annotations={currentImage.annotations}
            onUpdateAnnotation={updateAnnotation}
            onDeleteAnnotation={deleteAnnotation}
          />
        )}

        {/* Thumbnails - only show when not zoomed and not annotating */}
        {showThumbnails && imagesWithAnnotations.length > 1 && !isZoomed && !isAnnotating && (
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            {imagesWithAnnotations.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  "relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                  currentIndex === index ? "border-primary" : "border-transparent hover:border-primary/50",
                )}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                {image.annotations && image.annotations.length > 0 && (
                  <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {image.annotations.length}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Instructions */}
        {!isZoomed && !isAnnotating && (
          <div className="text-xs text-muted-foreground flex items-center justify-center space-x-4">
            <span className="flex items-center">
              <ImageIcon className="h-3 w-3 mr-1" /> Click image to zoom
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" /> Annotate available
            </span>
            <span className="flex items-center">
              <Maximize2 className="h-3 w-3 mr-1" /> Fullscreen available
            </span>
          </div>
        )}

        {/* Annotation Instructions */}
        {isAnnotating && (
          <div className="text-xs text-muted-foreground flex items-center justify-center">
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" /> Click on the image to add annotations
            </span>
          </div>
        )}
      </div>

      {/* Export Dialog */}
      <ExportAnnotationsDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onExport={handleExport}
        hasAnnotations={hasAnnotations}
      />

      {/* Fullscreen Gallery */}
      <FullscreenGallery
        images={imagesWithAnnotations}
        currentIndex={currentIndex}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        onIndexChange={setCurrentIndex}
        projectTitle={projectTitle}
        onAnnotationUpdate={(index, annotations) => {
          setImagesWithAnnotations((prev) => {
            const newImages = [...prev]
            newImages[index] = {
              ...newImages[index],
              annotations,
            }
            return newImages
          })
        }}
      />
    </>
  )
}
