"use client"

import { Button } from "@/components/ui/button"
import { Pause, Play, Share2, Download, X } from "lucide-react"

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
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        <span className="sr-only">{isPlaying ? "Pause" : "Play"} Slideshow</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={onShare}>
        <Share2 className="h-5 w-5" />
        <span className="sr-only">Share</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={onDownload}>
        <Download className="h-5 w-5" />
        <span className="sr-only">Download</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  )
}
