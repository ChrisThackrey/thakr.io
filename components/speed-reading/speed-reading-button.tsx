"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SpeedReadingMode } from "./speed-reading-mode"

interface SpeedReadingButtonProps {
  contentId?: string
  selector?: string
  className?: string
  slug?: string
  startInMiniPlayer?: boolean
}

export function SpeedReadingButton({ contentId, selector, className, slug, startInMiniPlayer }: SpeedReadingButtonProps) {
  const [showSpeedReader, setShowSpeedReader] = useState(false)

  const handleOpenSpeedReader = () => {
    setShowSpeedReader(true)
  }

  const handleCloseSpeedReader = () => {
    setShowSpeedReader(false)
  }

  return (
    <>
      <Button
        onClick={handleOpenSpeedReader}
        className="flex items-center gap-2 bg-transparent"
        variant="outline"
        size="sm"
      >
        <Icons.rocket className="h-4 w-4" />
        <span>Speed Read</span>
      </Button>

      {showSpeedReader && (
        <SpeedReadingMode
          contentId={contentId}
          selector={selector}
          onClose={handleCloseSpeedReader}
          slug={slug}
          startInMiniPlayer={true}
        />
      )}
    </>
  )
}
