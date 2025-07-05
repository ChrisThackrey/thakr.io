"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ImageGalleryNavigationProps {
  onPrevious: () => void
  onNext: () => void
}

export function ImageGalleryNavigation({ onPrevious, onNext }: ImageGalleryNavigationProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onPrevious}
        aria-label="Previous image"
      >
        <Icons.ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onNext}
        aria-label="Next image"
      >
        <Icons.ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
