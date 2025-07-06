"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ZoomableImage } from "./zoomable-image"
import { ImageShareMenu } from "./image-share-menu"
import { ImageDownloadButton } from "./image-download-button"

interface FullscreenGalleryProps {
  images: {
    url: string
    alt: string
    caption?: string
  }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onIndexChange: (index: number) => void
  projectTitle?: string
}

export function FullscreenGallery({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
  projectTitle = "Architecture Project",
}: FullscreenGalleryProps) {
  const goToNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onIndexChange])

  const goToPrevious = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onIndexChange])

  const goToImage = (index: number) => {
    onIndexChange(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, goToNext, goToPrevious, onClose])

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="relative h-full w-full flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h3 className="text-lg font-medium">{currentImage.alt}</h3>
                <p className="text-sm text-white/70">
                  {currentIndex + 1} of {images.length}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <ImageDownloadButton imageUrl={currentImage.url} imageName={currentImage.alt} variant="fullscreen" />
                <ImageShareMenu
                  imageUrl={currentImage.url}
                  imageTitle={currentImage.alt}
                  projectTitle={projectTitle}
                  variant="fullscreen"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={onClose}
                  aria-label="Close fullscreen"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main image area */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full max-w-7xl mx-auto"
              >
                <ZoomableImage
                  src={currentImage.url}
                  alt={currentImage.alt}
                  aspectRatio="auto"
                  height="100%"
                  className="h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            {/* Caption */}
            {currentImage.caption && (
              <div className="text-center text-white mb-4 max-w-3xl mx-auto">
                <p className="text-sm md:text-base">{currentImage.caption}</p>
              </div>
            )}

            {/* Thumbnails */}
            <div className="flex justify-center space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "relative h-12 w-16 md:h-16 md:w-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                    currentIndex === index
                      ? "border-white"
                      : "border-white/30 hover:border-white/60 opacity-70 hover:opacity-100",
                  )}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 64px, 96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
