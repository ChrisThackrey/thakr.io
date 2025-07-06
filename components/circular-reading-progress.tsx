"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Clock } from "lucide-react"
import { useReadingPosition } from "@/hooks/use-reading-position"
import { motion } from "framer-motion"

interface CircularReadingProgressProps {
  contentSelector?: string
  className?: string
  showTimeRemaining?: boolean
  readingTime?: string
  size?: "small" | "medium" | "large"
  showBackground?: boolean
}

export function CircularReadingProgress({
  contentSelector = "article",
  className,
  showTimeRemaining = true,
  readingTime = "5 min",
  size = "medium",
  showBackground = true,
}: CircularReadingProgressProps) {
  const { currentReadPercentage } = useReadingPosition()
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    if (readingTime) {
      // Extract the number from the reading time string (e.g., "5 min" -> 5)
      const totalMinutes = Number.parseInt(readingTime.split(" ")[0], 10) || 5
      const timeRemaining = Math.ceil((totalMinutes * (100 - currentReadPercentage)) / 100)
      setRemainingTime(timeRemaining)
    }
  }, [readingTime, currentReadPercentage])

  // Size classes
  const sizeClasses = {
    small: "h-10 w-10 text-xs",
    medium: "h-14 w-14 text-sm",
    large: "h-16 w-16 text-base",
  }

  // Don't show if we're almost done
  if (currentReadPercentage > 98) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center justify-center rounded-full shadow-lg",
        sizeClasses[size],
        showBackground
          ? isDark
            ? "bg-background/90 backdrop-blur-sm border border-primary/20"
            : "bg-background/90 backdrop-blur-sm border border-border"
          : "",
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
            strokeWidth="8%"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className={cn(
              "fill-none stroke-current transition-all duration-300 ease-in-out",
              isDark ? "stroke-primary/80" : "stroke-primary",
            )}
            strokeWidth="8%"
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
  )
}
