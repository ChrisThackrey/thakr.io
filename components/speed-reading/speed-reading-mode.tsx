"use client"
import { useState } from "react"
import { MiniPlayerMode } from "./mini-player-mode"
import { FocusMode } from "./focus-mode"
import { useTheme } from "next-themes"
import "@/styles/glass-morphism.css"

interface SpeedReadingModeProps {
  contentId?: string
  selector?: string
  onClose: () => void
  slug?: string
  initialContent?: string
  content?: string
  initialPosition?: number
  startInMiniPlayer?: boolean
  darkMode?: boolean
  contentType?: string
  initialWpm?: number
  blogSlug?: string
  contentSelector?: string
}

export function SpeedReadingMode({
  contentId,
  selector,
  onClose,
  slug,
  initialContent,
  content,
  initialPosition,
  startInMiniPlayer = false,
  darkMode,
  contentType,
  initialWpm,
  blogSlug,
  contentSelector,
}: SpeedReadingModeProps) {
  const { theme, resolvedTheme } = useTheme()
  const isDarkMode = theme === "dark" || resolvedTheme === "dark"

  const [mode, setMode] = useState<"focus" | "mini">(startInMiniPlayer ? "mini" : "focus")

  const switchToFocusMode = () => {
    setMode("focus")
  }

  const switchToMiniMode = () => {
    setMode("mini")
  }

  // Calculate a more centered position
  const getInitialPosition = () => {
    if (typeof window === "undefined") return { x: 20, y: 20 }

    // Position the mini player away from the header (at least 100px from top)
    const headerHeight = 80 // Estimated header height
    const safeTopMargin = Math.max(100, headerHeight + 20)

    return {
      x: window.innerWidth - 340,
      y: safeTopMargin,
    }
  }

  if (mode === "mini") {
    return (
      <MiniPlayerMode
        contentId={contentId}
        selector={selector}
        onClose={onClose}
        onExpand={switchToFocusMode}
        slug={slug}
        initialContent={initialContent}
        initialPosition={initialPosition}
        position={getInitialPosition()}
      />
    )
  }

  return (
    <FocusMode
      contentId={contentId}
      selector={selector}
      onClose={onClose}
      onMinimize={switchToMiniMode}
      slug={slug}
      initialContent={initialContent}
      initialPosition={initialPosition}
    />
  )
}
