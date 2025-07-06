"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useReadingPosition } from "@/hooks/use-reading-position"
import { usePathname } from "next/navigation"
import { useReadingTimeCalculator } from "@/hooks/use-reading-time-calculator"
import { ReadingTime } from "@/components/reading-time"
import { RemainingReadingTime } from "@/components/remaining-reading-time"

interface BlogPostTrackerProps {
  slug: string
  title: string
  children: ReactNode
  showReadingTime?: boolean
}

export function BlogPostTracker({ slug, title, children, showReadingTime = true }: BlogPostTrackerProps) {
  const { savePosition, restorePosition } = useReadingPosition()
  const pathname = usePathname()
  const { readingTime, wordCount } = useReadingTimeCalculator()
  const [isReadingTimeVisible, setIsReadingTimeVisible] = useState(false)

  useEffect(() => {
    // Restore position when component mounts
    restorePosition(slug)

    // Set up scroll event listener to save position
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Only start tracking after scrolling a bit
        savePosition(slug, title)
      }
    }

    // Throttle the scroll event to improve performance
    let scrollTimeout: NodeJS.Timeout | null = null
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll()
          scrollTimeout = null
        }, 1000) // Save position every second during scrolling
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })

    // Save position when user leaves the page
    const handleBeforeUnload = () => {
      savePosition(slug, title)
    }
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Show reading time after a short delay to ensure it's calculated
    const timer = setTimeout(() => {
      setIsReadingTimeVisible(true)
    }, 300)

    return () => {
      window.removeEventListener("scroll", throttledScroll)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      clearTimeout(timer)

      // Save final position when unmounting
      savePosition(slug, title)
    }
  }, [slug, title, savePosition, restorePosition, pathname])

  return (
    <>
      {children}
      {showReadingTime && isReadingTimeVisible && readingTime > 0 && (
        <div className="fixed bottom-6 left-6 z-40 md:hidden">
          <div className="flex flex-col gap-2">
            <ReadingTime
              minutes={readingTime}
              className="bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1 shadow-sm"
            />
            <RemainingReadingTime
              slug={slug}
              variant="minimal"
              className="bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1 shadow-sm"
            />
          </div>
        </div>
      )}
    </>
  )
}
