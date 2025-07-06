"use client"

import { useState, useCallback } from "react"

export interface ReadingPosition {
  slug: string
  position: number
  timestamp: number
  title: string
  readPercentage: number
  readingTime?: number
}

interface ReadingPositionHookReturn {
  savePosition: (slug: string, title: string) => void
  restorePosition: (slug: string) => void
  getReadingHistory: () => ReadingPosition[]
  clearHistory: () => void
  clearArticleHistory: (slug: string) => void
  currentReadPercentage: number
}

export function useReadingPosition(): ReadingPositionHookReturn {
  const [currentReadPercentage, setCurrentReadPercentage] = useState(0)

  // Get all reading positions from localStorage
  const getReadingHistory = useCallback((): ReadingPosition[] => {
    if (typeof window === "undefined") return []

    try {
      const history = localStorage.getItem("reading-positions")
      return history ? JSON.parse(history) : []
    } catch (error) {
      console.error("Error retrieving reading history:", error)
      return []
    }
  }, [])

  // Save current position for an article
  const savePosition = useCallback(
    (slug: string, title: string) => {
      if (typeof window === "undefined") return

      try {
        // Don't save if we're at the very top or bottom of the page
        const scrollPosition = window.scrollY
        if (scrollPosition <= 10) return

        const article = document.querySelector("article")
        if (!article) return

        const articleHeight = article.getBoundingClientRect().height
        const windowHeight = window.innerHeight
        const maxScroll = articleHeight - windowHeight
        const readPercentage = Math.min(100, Math.max(0, (scrollPosition / maxScroll) * 100))

        // If we're at the bottom, set to 100%
        const isBottom = scrollPosition >= maxScroll - 50
        const adjustedPercentage = isBottom ? 100 : readPercentage

        // Don't save if we're at the very bottom
        if (isBottom) return

        // Update current read percentage
        setCurrentReadPercentage(adjustedPercentage)

        // Get existing history
        const history = getReadingHistory()

        // Try to get reading time from the DOM
        let readingTime
        const readingTimeElement = document.querySelector(".reading-time")
        if (readingTimeElement) {
          const text = readingTimeElement.textContent || ""
          const match = text.match(/(\d+)\s*min/)
          if (match && match[1]) {
            readingTime = Number.parseInt(match[1], 10)
          }
        }

        // Create new position entry
        const newPosition: ReadingPosition = {
          slug,
          position: scrollPosition,
          timestamp: Date.now(),
          title,
          readPercentage: adjustedPercentage,
          readingTime,
        }

        // Update history (remove old entry for this slug if exists)
        const updatedHistory = [newPosition, ...history.filter((item) => item.slug !== slug)].slice(0, 50) // Limit to 50 entries

        localStorage.setItem("reading-positions", JSON.stringify(updatedHistory))
      } catch (error) {
        console.error("Error saving reading position:", error)
      }
    },
    [getReadingHistory],
  )

  // Restore position for an article
  const restorePosition = useCallback(
    (slug: string) => {
      if (typeof window === "undefined") return

      try {
        const history = getReadingHistory()
        const savedPosition = history.find((item) => item.slug === slug)

        if (savedPosition && savedPosition.position > 0) {
          // Use a small delay to ensure the page has fully loaded
          setTimeout(() => {
            window.scrollTo({
              top: savedPosition.position,
              behavior: "smooth",
            })
            setCurrentReadPercentage(savedPosition.readPercentage)
          }, 300)
        }
      } catch (error) {
        console.error("Error restoring reading position:", error)
      }
    },
    [getReadingHistory],
  )

  // Clear all reading history
  const clearHistory = useCallback(() => {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem("reading-positions")
      setCurrentReadPercentage(0)
    } catch (error) {
      console.error("Error clearing reading history:", error)
    }
  }, [])

  // Clear history for a specific article
  const clearArticleHistory = useCallback(
    (slug: string) => {
      if (typeof window === "undefined") return

      try {
        const history = getReadingHistory()
        const updatedHistory = history.filter((item) => item.slug !== slug)
        localStorage.setItem("reading-positions", JSON.stringify(updatedHistory))

        if (window.location.pathname.includes(slug)) {
          setCurrentReadPercentage(0)
        }
      } catch (error) {
        console.error("Error clearing article history:", error)
      }
    },
    [getReadingHistory],
  )

  return {
    savePosition,
    restorePosition,
    getReadingHistory,
    clearHistory,
    clearArticleHistory,
    currentReadPercentage,
  }
}
