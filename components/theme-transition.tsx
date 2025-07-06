"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeTransition() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  // Store the theme *before* the current change to correctly set data-from-theme
  const [themeBeforeChange, setThemeBeforeChange] = useState<string | undefined>()

  useEffect(() => {
    setMounted(true)
    // Initialize with the current theme on mount
    setThemeBeforeChange(resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    if (!mounted) return

    // Only trigger transition if resolvedTheme has actually changed from the last known state
    if (resolvedTheme !== themeBeforeChange) {
      setIsTransitioning(true)

      const timer = setTimeout(() => {
        setIsTransitioning(false)
        // After transition animation ends, update themeBeforeChange to the new current theme
        setThemeBeforeChange(resolvedTheme)
      }, 900) // Must match CSS animation duration

      return () => clearTimeout(timer)
    }
  }, [resolvedTheme, mounted, themeBeforeChange])

  if (!mounted || !isTransitioning || !themeBeforeChange) {
    return null // Don't render overlay if not ready or not needed
  }

  return (
    <div
      className="theme-transition-overlay"
      data-from-theme={themeBeforeChange} // Theme we are coming from
      data-to-theme={resolvedTheme} // Theme we are going to
    />
  )
}
