"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Clock } from "lucide-react"
import { useReadingPosition } from "@/hooks/use-reading-position"
import { motion, AnimatePresence } from "framer-motion"

interface FloatingBubbleProgressProps {
  className?: string
  showTimeRemaining?: boolean
  readingTime?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  size?: "small" | "medium" | "large"
  showOnlyOnScroll?: boolean
}

export function FloatingBubbleProgress({
  className,
  showTimeRemaining = true,
  readingTime = "5 min",
  position = "bottom-right",
  size = "medium",
  showOnlyOnScroll = true,
}: FloatingBubbleProgressProps) {
  const { currentReadPercentage } = useReadingPosition()
  const [isVisible, setIsVisible] = useState(!showOnlyOnScroll)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Calculate remaining time
  const [remainingTime, setRemainingTime] = useState<number | null>(null)

  useEffect(() => {
    if (readingTime) {
      // Extract the number from the reading time string (e.g., "5 min" -> 5)
      const totalMinutes = Number.parseInt(readingTime.split(" ")[0], 10) || 5
      const timeRemaining = Math.ceil((totalMinutes * (100 - currentReadPercentage)) / 100)
      setRemainingTime(timeRemaining)
    }
  }, [readingTime, currentReadPercentage])

  // Show/hide based on scroll position
  useEffect(() => {
    if (!showOnlyOnScroll) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show after scrolling down 20% of the viewport height
      setIsVisible(scrollPosition > windowHeight * 0.2)
    }

    // Set initial visibility
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showOnlyOnScroll])

  // Size classes
  const sizeClasses = {
    small: "h-12 w-12 text-xs",
    medium: "h-16 w-16 text-sm",
    large: "h-20 w-20 text-base",
  }

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-24 right-4",
    "bottom-left": "bottom-24 left-4",
    "top-right": "top-24 right-4",
    "top-left": "top-24 left-4",
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed z-50 flex items-center justify-center rounded-full shadow-lg",
            positionClasses[position],
            sizeClasses[size],
            isDark
              ? "bg-background border border-primary/20 shadow-primary/10"
              : "bg-background border border-border shadow-foreground/5",
            className,
          )}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Circular progress background */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className={cn(
                  "fill-none stroke-current transition-all duration-300 ease-in-out",
                  isDark ? "stroke-muted/30" : "stroke-muted",
                )}
                strokeWidth="6%"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className={cn(
                  "fill-none stroke-current transition-all duration-300 ease-in-out",
                  isDark ? "stroke-primary/80" : "stroke-primary",
                )}
                strokeWidth="6%"
                strokeDasharray={`${currentReadPercentage * 2.83} 283`}
                strokeLinecap="round"
              />
            </svg>

            {/* Percentage or time remaining */}
            <div className="flex flex-col items-center justify-center">
              <span className="font-medium">{Math.round(currentReadPercentage)}%</span>
              {showTimeRemaining && remainingTime !== null && remainingTime > 0 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-2.5 w-2.5 mr-0.5" />
                  <span>{remainingTime}m</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
