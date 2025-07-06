"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { SpeedReadingMode } from "./speed-reading/speed-reading-mode"

interface BlogSelectionSpeedReadProps {
  contentSelector: string
  slug: string
}

export function BlogSelectionSpeedRead({ contentSelector }: BlogSelectionSpeedReadProps) {
  const [selectedText, setSelectedText] = useState("")
  const [showSpeedReader, setShowSpeedReader] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  // Determine if dark mode is active
  const isDarkMode = theme === "dark" || resolvedTheme === "dark"

  // Listen for custom speed read event
  useEffect(() => {
    const handleSpeedReadEvent = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail && customEvent.detail.action === "speed-read-current") {
        // Get all text from the content area
        const contentElement = document.querySelector(contentSelector)
        if (contentElement) {
          const text = contentElement.textContent || ""
          if (text.trim()) {
            console.log("Starting speed reading with content length:", text.length)
            setSelectedText(text)
            setShowSpeedReader(true)
          } else {
            console.error("No content found to read")
          }
        } else {
          console.error("Content element not found:", contentSelector)
        }
      }
    }

    window.addEventListener("custom-blog-action", handleSpeedReadEvent)

    return () => {
      window.removeEventListener("custom-blog-action", handleSpeedReadEvent)
    }
  }, [contentSelector])

  // Handle close
  const handleClose = useCallback(() => {
    setShowSpeedReader(false)
    setSelectedText("")
  }, [])

  // Only render if there's text to read and the speed reader should be shown
  if (!selectedText || !showSpeedReader) {
    return null
  }

  return (
    <SpeedReadingMode
      content={selectedText}
      onClose={handleClose}
      darkMode={isDarkMode}
      contentType="blog"
      initialWpm={300}
    />
  )
}
