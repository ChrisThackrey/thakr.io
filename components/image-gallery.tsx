"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ZoomableImage } from "./zoomable-image"
import { FullscreenGallery } from "./fullscreen-gallery"
import { ImageAnnotationTool } from "./image-annotation-tool"
import { AnnotationPanel } from "./annotation-panel"
import { ExportAnnotationsDialog } from "./export-annotations-dialog"
import { useImageGallery } from "@/hooks/use-image-gallery"
import { ImageGalleryControls } from "./image-gallery/image-gallery-controls"
import { ImageGalleryNavigation } from "./image-gallery/image-gallery-navigation"
import { ImageGalleryInfo } from "./image-gallery/image-gallery-info"
import { ImageGalleryThumbnails } from "./image-gallery/image-gallery-thumbnails"
import { Icons } from "./icons"

export interface Annotation {
  id: string
  x: number
  y: number
  text: string
  color: string
}

export interface ImageWithAnnotations {
  url: string
  alt: string
  caption?: string
  annotations?: Annotation[]
  blurDataURL?: string
}

interface ImageGalleryProps {
  images: ImageWithAnnotations[]
  className?: string
  aspectRatio?: "square" | "video" | "wide" | "auto"
  height?: string
  showThumbnails?: boolean
  projectTitle?: string
}

export function ImageGallery({
  images,
  className,
  aspectRatio = "video",
  height = "500px",
  showThumbnails = true,
  projectTitle = "Architecture Project",
}: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const {
    currentIndex,
    setCurrentIndex,
    isZoomed,
    handleZoomChange,
    isFullscreen,
    setIsFullscreen,
    toggleFullscreen,
    isAnnotating,
    toggleAnnotationMode,
    showAnnotations,
    toggleShowAnnotations,
    imagesWithAnnotations,
    loadedImages,
    showExportDialog,
    setShowExportDialog,
    annotatedImageRef,
    currentImage,
    hasAnnotations,
    goToNext,
    goToPrevious,
    goToImage,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    handleExport,
    handleAnnotationUpdateInFullscreen,
  } = useImageGallery(images)

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
                ref={annotatedImageRef}
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
                    priority={currentIndex === 0}
                    blurDataURL={currentImage.blurDataURL}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <ImageGalleryControls
            isAnnotating={isAnnotating}
            toggleAnnotationMode={toggleAnnotationMode}
            hasAnnotations={hasAnnotations}
            setShowExportDialog={setShowExportDialog}
            showAnnotations={showAnnotations}
            toggleShowAnnotations={toggleShowAnnotations}
            currentImage={currentImage}
            projectTitle={projectTitle}
            toggleFullscreen={toggleFullscreen}
          />

          {!isZoomed && !isAnnotating && (
            <>
              <ImageGalleryNavigation onPrevious={goToPrevious} onNext={goToNext} />
              <ImageGalleryInfo
                currentIndex={currentIndex}
                totalImages={imagesWithAnnotations.length}
                caption={currentImage.caption}
              />
            </>
          )}
        </div>

        {isAnnotating && hasAnnotations && (
          <AnnotationPanel
            annotations={currentImage.annotations}
            onUpdateAnnotation={updateAnnotation}
            onDeleteAnnotation={deleteAnnotation}
          />
        )}

        {showThumbnails && imagesWithAnnotations.length > 1 && !isZoomed && !isAnnotating && (
          <ImageGalleryThumbnails
            images={imagesWithAnnotations}
            currentIndex={currentIndex}
            onThumbnailClick={goToImage}
            loadedImages={loadedImages}
          />
        )}

        {!isZoomed && !isAnnotating && (
          <div className="text-xs text-muted-foreground flex items-center justify-center space-x-4">
            <span className="flex items-center">
              <Icons.ImageIcon className="h-3 w-3 mr-1" /> Click image to zoom
            </span>
            <span className="flex items-center">
              <Icons.MessageSquare className="h-3 w-3 mr-1" /> Annotate available
            </span>
            <span className="flex items-center">
              <Icons.Maximize2 className="h-3 w-3 mr-1" /> Fullscreen available
            </span>
          </div>
        )}

        {isAnnotating && (
          <div className="text-xs text-muted-foreground flex items-center justify-center">
            <span className="flex items-center">
              <Icons.MessageSquare className="h-3 w-3 mr-1" /> Click on the image to add annotations
            </span>
          </div>
        )}
      </div>

      <ExportAnnotationsDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onExport={handleExport}
        hasAnnotations={hasAnnotations}
      />

      <FullscreenGallery
        images={imagesWithAnnotations}
        currentIndex={currentIndex}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        onIndexChange={setCurrentIndex}
        projectTitle={projectTitle}
        onAnnotationUpdate={handleAnnotationUpdateInFullscreen}
      />
    </>
  )
}
