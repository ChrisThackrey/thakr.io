"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useReadingPosition } from "@/hooks/use-reading-position"

interface HeaderReadingProgressProps {
  className?: string
  height?: "thin" | "medium" | "thick"
  showPercentage?: boolean
}

export function HeaderReadingProgress({
  className,
  height = "thin",
  showPercentage = false,
}: HeaderReadingProgressProps) {
  const { currentReadPercentage } = useReadingPosition()
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Show only after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 100)
    }

    // Set initial visibility
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Height classes
  const heightClasses = {
    thin: "h-0.5",
    medium: "h-1",
    thick: "h-1.5",
  }

  if (!isVisible) return null

  return (
    <div className={cn("fixed top-16 left-0 right-0 z-50 w-full", className)}>
      <div className={cn("w-full bg-muted/30", heightClasses[height])}>
        <div
          className={cn("h-full transition-all duration-150 ease-out", isDark ? "bg-primary/80" : "bg-primary")}
          style={{ width: `${currentReadPercentage}%` }}
        />
      </div>

      {showPercentage && (
        <div className="absolute right-4 top-0 transform translate-y-full bg-background text-foreground px-2 py-1 rounded text-xs font-medium">
          {Math.round(currentReadPercentage)}%
        </div>
      )}
    </div>
  )
}
