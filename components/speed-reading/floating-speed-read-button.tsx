"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import { SpeedReadingMode } from "@/components/speed-reading/speed-reading-mode"
import { cn } from "@/lib/utils"

interface FloatingSpeedReadButtonProps {
  contentId?: string
  selector?: string
  className?: string
  slug?: string
}

export function FloatingSpeedReadButton({
  contentId,
  selector = "article .prose",
  className,
  slug,
}: FloatingSpeedReadButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible] = useState(true) // Add isVisible state

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          className,
        )}
        aria-label="Speed read this article"
      >
        <Rocket className="h-5 w-5" />
      </Button>

      {isOpen && (
        <SpeedReadingMode contentId={contentId} selector={selector} onClose={() => setIsOpen(false)} slug={slug} />
      )}
    </>
  )
}
