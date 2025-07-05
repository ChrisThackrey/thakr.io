"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageDownloadButton } from "@/components/image-download-button"
import { ImageShareMenu } from "@/components/image-share-menu"
import { cn } from "@/lib/utils"
import type { ImageWithAnnotations } from "@/components/image-gallery"
import { Icons } from "@/components/icons"

interface ImageGalleryControlsProps {
  isAnnotating: boolean
  toggleAnnotationMode: () => void
  hasAnnotations: boolean
  setShowExportDialog: (show: boolean) => void
  showAnnotations: boolean
  toggleShowAnnotations: () => void
  currentImage: ImageWithAnnotations
  projectTitle: string
  toggleFullscreen: () => void
}

export function ImageGalleryControls({
  isAnnotating,
  toggleAnnotationMode,
  hasAnnotations,
  setShowExportDialog,
  showAnnotations,
  toggleShowAnnotations,
  currentImage,
  projectTitle,
  toggleFullscreen,
}: ImageGalleryControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
        <Icons.MessageSquare className="h-4 w-4" />
      </Button>

      {hasAnnotations && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
          onClick={() => setShowExportDialog(true)}
          aria-label="Export with annotations"
        >
          <Icons.FileDown className="h-4 w-4" />
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
        <Icons.Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
