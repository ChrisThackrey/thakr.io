"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ImageGalleryControlsProps {
  onClose: () => void
  onDownload: () => void
  onShare: () => void
  isPlaying: boolean
  onTogglePlay: () => void
}

export function ImageGalleryControls({
  onClose,
  onDownload,
  onShare,
  isPlaying,
  onTogglePlay,
}: ImageGalleryControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onTogglePlay}>
        {isPlaying ? <Icons.pause className="h-5 w-5" /> : <Icons.play className="h-5 w-5" />}
        <span className="sr-only">{isPlaying ? "Pause" : "Play"} Slideshow</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={onShare}>
        <Icons.share className="h-5 w-5" />
        <span className="sr-only">Share</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={onDownload}>
        <Icons.download className="h-5 w-5" />
        <span className="sr-only">Download</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <Icons.close className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  )
}
