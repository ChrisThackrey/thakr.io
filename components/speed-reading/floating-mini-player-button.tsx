"use client"

import { useState } from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { SpeedReadingMode } from "@/components/speed-reading/speed-reading-mode"

interface FloatingMiniPlayerButtonProps {
  contentSelector?: string
  contentId?: string
  className?: string
  slug?: string
}

export function FloatingMiniPlayerButton({
  contentSelector = "article .prose",
  contentId,
  className,
  slug,
}: FloatingMiniPlayerButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { y: scrollY } = useScrollPosition()

  // Only show after scrolling down a bit
  const shouldShow = scrollY > 200

  const handleOpenReader = () => {
    setIsOpen(true)
  }

  const handleCloseReader = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "fixed bottom-36 right-4 z-50 shadow-md rounded-full transition-opacity duration-300",
          shouldShow ? "opacity-100" : "opacity-0 pointer-events-none",
          className,
        )}
        onClick={handleOpenReader}
        aria-label="Speed Read"
      >
        <Icons.rocket className="h-5 w-5" />
      </Button>

      {isOpen && (
        <SpeedReadingMode
          contentId={contentId}
          selector={contentSelector}
          onClose={handleCloseReader}
          slug={slug}
          startInMiniPlayer={true}
        />
      )}
    </>
  )
}
