"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { ArrowUp, Clock, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReadingTimeCalculator } from "@/hooks/use-reading-time-calculator"
import { useReadingSpeed } from "@/hooks/use-reading-speed"

interface MobileReadingIndicatorProps {
  target?: string
  className?: string
  showScrollToTop?: boolean
}

export function MobileReadingIndicator({
  target = "article",
  className,
  showScrollToTop = true,
}: MobileReadingIndicatorProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const { theme } = useTheme()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { preset } = useReadingSpeed()
  const isCustomSpeed = preset !== "normal"

  useEffect(() => {
    const article = document.querySelector(target)
    if (!article) return

    const calculateReadingProgress = () => {
      const articleBox = article.getBoundingClientRect()
      const articleHeight = articleBox.height
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY

      // Calculate how far we've scrolled into the article
      const scrollY = Math.max(0, scrollTop - articleBox.top + window.scrollY)

      // Calculate the total scrollable distance (article height minus viewport height)
      const totalScrollDistance = articleHeight - windowHeight

      // Calculate progress as a percentage
      let progress = (scrollY / totalScrollDistance) * 100

      // Clamp progress between 0 and 100
      progress = Math.min(100, Math.max(0, progress))

      setReadingProgress(progress)

      // Show indicator when we've scrolled down a bit
      const shouldBeVisible = scrollTop > windowHeight * 0.5

      if (shouldBeVisible !== isVisible) {
        if (shouldBeVisible) {
          setIsFadingOut(false)
          setIsVisible(true)
        } else {
          // Start fade out animation
          setIsFadingOut(true)

          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }

          // Set timeout to hide the element after animation completes
          timeoutRef.current = setTimeout(() => {
            setIsVisible(false)
            setIsFadingOut(false)
          }, 300) // Match the animation duration
        }
      }
    }

    // Calculate initial reading progress
    calculateReadingProgress()

    // Add scroll event listener
    window.addEventListener("scroll", calculateReadingProgress, { passive: true })

    // Clean up event listener and timeout
    return () => {
      window.removeEventListener("scroll", calculateReadingProgress)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [target, isVisible])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const { readingTime } = useReadingTimeCalculator()
  const [remainingTime, setRemainingTime] = useState<number | null>(null)

  useEffect(() => {
    if (readingTime > 0 && readingProgress >= 0) {
      // Calculate remaining time based on percentage read and total time
      const timeRemaining = Math.ceil((readingTime * (100 - readingProgress)) / 100)
      setRemainingTime(timeRemaining)
    }
  }, [readingTime, readingProgress])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-full shadow-lg transition-all duration-300 md:hidden mobile-reading-indicator",
        isFadingOut && "fade-out",
        theme === "dark"
          ? "bg-background/80 backdrop-blur-sm border border-primary/20"
          : "bg-background/90 backdrop-blur-sm border border-border",
        className,
      )}
    >
      <div className="text-xs font-medium">{Math.round(readingProgress)}%</div>
      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-150 ease-out rounded-full",
            theme === "dark" ? "bg-primary/80" : "bg-primary",
          )}
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      {remainingTime !== null && remainingTime > 0 && (
        <div className="text-xs flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>{remainingTime}m left</span>
          {isCustomSpeed && <Gauge className="ml-1 h-2.5 w-2.5 text-primary" />}
        </div>
      )}
      {showScrollToTop && (
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
