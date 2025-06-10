"use client"

import { useState, useEffect } from "react"

interface ScrollPosition {
  x: number
  y: number
}

/**
 * A hook that tracks the current scroll position of the page
 * @param throttleMs Optional throttle time in milliseconds
 * @returns The current scroll position {x, y}
 */
export function useScrollPosition(throttleMs = 100): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: typeof window !== "undefined" ? window.scrollX : 0,
    y: typeof window !== "undefined" ? window.scrollY : 0,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    let timeoutId: NodeJS.Timeout | null = null

    const handleScroll = () => {
      if (timeoutId) return

      timeoutId = setTimeout(() => {
        setScrollPosition({
          x: window.scrollX,
          y: window.scrollY,
        })
        timeoutId = null
      }, throttleMs)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [throttleMs])

  return scrollPosition
}
