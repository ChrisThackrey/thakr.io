"use client"

import { useState, useEffect } from "react"
import { useReadingPosition } from "@/hooks/use-reading-position"
import { useReadingTimeCalculator } from "@/hooks/use-reading-time-calculator"
import { Clock, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useReadingSpeed } from "@/hooks/use-reading-speed"
import { motion } from "framer-motion"
import { getPost } from "@/lib/blog"

interface RemainingReadingTimeProps {
  slug: string
  className?: string
  variant?: "minimal" | "standard" | "detailed" | "animated" | "simple"
}

// Add the missing export as an alias to the existing component
export const ReadingTimeRemaining = RemainingReadingTime

export function RemainingReadingTime({ slug, className, variant = "standard" }: RemainingReadingTimeProps) {
  const { currentReadPercentage } = useReadingPosition()
  const { readingTime } = useReadingTimeCalculator()
  const { wordsPerMinute } = useReadingSpeed()
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const { theme } = useTheme()
  const [time, setTime] = useState<number | null>(null)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    ;(async () => {
      const post = await getPost(slug)
      if (!post?.readingTime) return
      // crude estimate – could hook into scroll position for accuracy
      setTime(post.readingTime)
    })()
  }, [slug])

  useEffect(() => {
    if (readingTime > 0 && currentReadPercentage >= 0) {
      // Calculate remaining time based on percentage read and total time
      const timeRemaining = Math.ceil((readingTime * (100 - currentReadPercentage)) / 100)
      setRemainingTime(timeRemaining)
    }
  }, [readingTime, currentReadPercentage, wordsPerMinute])

  if (!isHydrated || (remainingTime === null && time === null)) return null

  // Don't show if we're almost done
  if (currentReadPercentage > 95) return null

  if (variant === "minimal") {
    return (
      <div className={cn("text-sm text-muted-foreground flex items-center", className)}>
        <Clock className="mr-1 h-3.5 w-3.5" />
        <span>{remainingTime ?? time} min left</span>
      </div>
    )
  }

  if (variant === "animated") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex flex-col gap-2 p-3 rounded-lg border",
          theme === "dark" ? "bg-background/50 border-primary/20" : "bg-background/80 border-border",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">{remainingTime ?? time} min left</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {Math.round(currentReadPercentage)}% read
          </Badge>
        </div>

        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${currentReadPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("h-full rounded-full", theme === "dark" ? "bg-primary/80" : "bg-primary")}
          />
        </div>
      </motion.div>
    )
  }

  if (variant === "detailed") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1 py-1 transition-colors",
                theme === "dark" ? "hover:border-primary/50" : "hover:border-primary",
                className,
              )}
            >
              <Clock className="h-3 w-3" />
              <span>{remainingTime ?? time} min left to read</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium">{Math.round(currentReadPercentage)}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${currentReadPercentage}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span>Total: {time} min</span>
                <span>
                  <Flag className="h-3 w-3 inline mr-0.5" />
                  {remainingTime ?? time} min left
                </span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (variant === "simple") {
    return <div className={cn("text-sm text-muted-foreground", className)}>{time !== null ? `${time} min` : null}</div>
  }

  // Standard variant (default)
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm",
        theme === "dark" ? "text-muted-foreground" : "text-foreground/80",
        className,
      )}
    >
      <div className="flex items-center">
        <Clock className="mr-1 h-3.5 w-3.5" />
        <span>{remainingTime ?? time} min left</span>
      </div>
      <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${currentReadPercentage}%` }} />
      </div>
    </div>
  )
}
