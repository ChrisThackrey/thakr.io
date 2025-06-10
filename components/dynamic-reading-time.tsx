"use client"

import { useReadingTimeCalculator } from "@/hooks/use-reading-time-calculator"
import { ReadingTime } from "@/components/reading-time"
import { useState, useEffect } from "react"

interface DynamicReadingTimeProps {
  fallbackTime?: number
  className?: string
  showWordCount?: boolean
  showSpeedIndicator?: boolean
}

export function DynamicReadingTime({
  fallbackTime,
  className,
  showWordCount = true,
  showSpeedIndicator = true,
}: DynamicReadingTimeProps) {
  const { readingTime, wordCount, actualReadingTime } = useReadingTimeCalculator()
  const [isClient, setIsClient] = useState(false)

  // Add useEffect to set isClient to true after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use the calculated time if available and we're client-side, otherwise fall back to the static time
  const displayTime = isClient && readingTime > 0 ? readingTime : fallbackTime || 1

  return (
    <ReadingTime
      minutes={displayTime}
      wordCount={wordCount}
      actualMinutes={actualReadingTime}
      className={className}
      showWordCount={showWordCount}
      showSpeedIndicator={showSpeedIndicator}
    />
  )
}
