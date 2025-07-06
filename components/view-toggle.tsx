"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState, useCallback } from "react"

interface ViewToggleProps {
  view: "detailed" | "gallery"
  onViewChange: (view: "detailed" | "gallery") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const detailedButtonRef = useRef<HTMLButtonElement>(null)
  const galleryButtonRef = useRef<HTMLButtonElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    transform: "translateX(0)",
  })

  // Update indicator position and size based on the selected button
  const updateIndicator = useCallback(() => {
    if (prefersReducedMotion) return

    const activeButton = view === "detailed" ? detailedButtonRef.current : galleryButtonRef.current

    if (activeButton) {
      const { offsetWidth, offsetLeft } = activeButton
      setIndicatorStyle({
        width: offsetWidth,
        transform: `translateX(${offsetLeft}px)`,
      })
    }
  }, [prefersReducedMotion, view])

  // Update on mount and when view changes
  useEffect(() => {
    setMounted(true)
    updateIndicator()
  }, [view, mounted, prefersReducedMotion, updateIndicator])

  // Update on window resize
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleResize = () => updateIndicator()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [prefersReducedMotion, updateIndicator])

  return (
    <div className="relative bg-muted rounded-md p-1 flex">
      <Button
        ref={detailedButtonRef}
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("detailed")}
        className={cn(
          "relative z-10 transition-all duration-300",
          view === "detailed" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <List
          className={cn(
            "h-4 w-4 mr-2 transition-transform duration-300",
            view === "detailed" ? "scale-110" : "scale-100",
          )}
        />
        Detailed
      </Button>
      <Button
        ref={galleryButtonRef}
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("gallery")}
        className={cn(
          "relative z-10 transition-all duration-300",
          view === "gallery" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <LayoutGrid
          className={cn(
            "h-4 w-4 mr-2 transition-transform duration-300",
            view === "gallery" ? "scale-110" : "scale-100",
          )}
        />
        Gallery
      </Button>

      {!prefersReducedMotion && mounted && (
        <div
          className="absolute inset-y-0 rounded-md transition-all duration-300 ease-out bg-background"
          style={{
            width: `${indicatorStyle.width}px`,
            transform: indicatorStyle.transform,
            height: "calc(100% - 0.5rem)",
            margin: "0.25rem 0",
          }}
        />
      )}
    </div>
  )
}
