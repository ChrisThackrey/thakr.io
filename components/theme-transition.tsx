"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeTransition() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [prevTheme, setPrevTheme] = useState<string | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (prevTheme && prevTheme !== resolvedTheme) {
      setTransitioning(true)
      const timer = setTimeout(() => {
        setTransitioning(false)
      }, 800) // Match this with the animation duration

      return () => clearTimeout(timer)
    }

    setPrevTheme(resolvedTheme)
  }, [resolvedTheme, mounted, prevTheme])

  if (!mounted) return null

  return transitioning ? (
    <div className="theme-transition-overlay" data-from-theme={prevTheme} data-to-theme={resolvedTheme} />
  ) : null
}
