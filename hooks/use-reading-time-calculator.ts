"use client"

import { useState, useEffect } from "react"
import { useReadingSpeed } from "@/hooks/use-reading-speed"

export function useReadingTimeCalculator(selector = "article .prose"): {
  readingTime: number
  wordCount: number
  actualReadingTime: number
} {
  const [readingTime, setReadingTime] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const { calculateReadingTime, wordsPerMinute } = useReadingSpeed()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Function to calculate reading time
    const calculateTime = () => {
      // Find the article content element
      const contentElement = document.querySelector(selector) as HTMLElement

      if (contentElement) {
        // Get the text content
        const text = contentElement.textContent || ""

        // Count words
        const words = text.trim().split(/\s+/).length
        setWordCount(words)

        // Calculate reading time using the custom reading speed
        setReadingTime(calculateReadingTime(words))
      }
    }

    // Calculate on mount with a small delay to ensure content is loaded
    const timer = setTimeout(calculateTime, 100)

    return () => clearTimeout(timer)
  }, [selector, calculateReadingTime, wordsPerMinute])

  // Calculate the "actual" reading time based on the standard 225 WPM
  const actualReadingTime = Math.ceil(wordCount / 225) || 1

  return {
    readingTime: isClient ? readingTime : 0,
    wordCount,
    actualReadingTime,
  }
}
