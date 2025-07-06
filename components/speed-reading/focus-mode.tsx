"use client"

import { useState, useEffect, useRef } from "react"
import { X, Settings, Minimize2, Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { SpeedReadingSettingsModal } from "./speed-reading-settings-modal"
import { KeyboardShortcutsInfo } from "./keyboard-shortcuts-info"
import { useSpeedReading } from "@/hooks/use-speed-reading"

interface FocusModeProps {
  contentId?: string
  selector?: string
  onClose: () => void
  onMinimize: () => void
  slug?: string
  initialContent?: string
  initialPosition?: number
}

export function FocusMode({
  contentId,
  selector,
  onClose,
  onMinimize,
  slug,
  initialContent,
  initialPosition,
}: FocusModeProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [contentText, setContentText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const contentInitializedRef = useRef(false)

  // Ensure selector is a string
  const validSelector = typeof selector === "string" ? selector : "article[data-blog-content='true']"

  // Extract content from the page
  useEffect(() => {
    if (contentInitializedRef.current) return

    // If we have initial content, use that directly
    if (initialContent) {
      setContentText(initialContent)
      contentInitializedRef.current = true
      return
    }

    // Function to find and extract content
    const extractContent = () => {
      try {
        // Try to find the content in different ways
        let contentElement: Element | null = null

        console.log("Looking for content with:", { contentId, selector: validSelector, slug })

        // 1. Try by specific ID first
        if (contentId) {
          contentElement = document.getElementById(contentId)
          console.log("Content by ID:", contentElement)
        }

        // 2. Try by data attribute with slug
        if (!contentElement && slug) {
          contentElement = document.querySelector(`[data-blog-slug="${slug}"]`)
          console.log("Content by slug attribute:", contentElement)
        }

        // 3. Try by selector
        if (!contentElement && validSelector) {
          contentElement = document.querySelector(validSelector)
          console.log("Content by selector:", contentElement)
        }

        // 4. Try fallbacks as a last resort
        if (!contentElement) {
          const fallbacks = [
            "article[data-blog-content='true']",
            ".prose",
            "article .prose",
            "article",
            "main",
            ".blog-content",
            "#blog-content",
          ]

          for (const fallback of fallbacks) {
            contentElement = document.querySelector(fallback)
            if (contentElement) {
              console.log("Content found with fallback:", fallback)
              break
            }
          }
        }

        // If we found an element, extract its text content
        if (contentElement) {
          let extractedContent = ""

          // For a better experience, try to get the innerHTML if possible
          // This preserves more structure for the parser
          if (contentElement instanceof HTMLElement) {
            extractedContent = contentElement.innerHTML
          } else {
            extractedContent = contentElement.textContent || ""
          }

          console.log("Found content:", extractedContent.substring(0, 100) + "...")
          setContentText(extractedContent)
          contentInitializedRef.current = true
        } else {
          console.error("Could not find any content element")
          setError("Could not find content to speed read. Please try a different page.")
        }
      } catch (error) {
        console.error("Error extracting content:", error)
        setError("Error extracting content. Please try again.")
      }
    }

    // We'll try to extract content with a short delay to ensure DOM is fully loaded
    const timer = setTimeout(extractContent, 300)

    return () => clearTimeout(timer)
  }, [contentId, validSelector, slug, initialContent])

  const {
    isPaused,
    content,
    currentIndex,
    currentChunk,
    progress,
    options,
    pause,
    resume,
    stop,
    updateOptions,
    jumpTo,
    skip,
    startWithContent,
  } = useSpeedReading(undefined, undefined) // Pass undefined to avoid using selector directly

  // Initialize speed reading with extracted content
  useEffect(() => {
    if (!contentText || !contentInitializedRef.current) return

    try {
      console.log("Starting speed reading with extracted content")
      startWithContent(contentText, initialPosition ?? 0)
    } catch (error) {
      console.error("Error starting speed reading with content:", error)
      setError("Error initializing speed reading. Please try again.")
    }
  }, [contentText, initialPosition, startWithContent])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (isPaused) {
      resume()
    } else {
      pause()
    }
  }

  // Navigation functions

  const handleSkipBackward = () => {
    skip(-10)
  }

  const handleSkipForward = () => {
    skip(10)
  }

  // Get current word
  const currentWord = typeof currentChunk === "string" ? currentChunk : currentChunk?.content || ""

  // Calculate stats
  const totalWords = content.length
  const currentPosition = currentIndex + 1

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
      <div
        className="relative w-full max-w-2xl bg-background rounded-lg shadow-lg p-6 mx-4"
        style={{ marginTop: "80px" }}
      >
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Speed Reading</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowKeyboardShortcuts(true)}
              className="h-8 w-8 rounded-full"
            >
              <span className="text-lg font-semibold">?</span>
              <span className="sr-only">Keyboard Shortcuts</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)} className="h-8 w-8 rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onMinimize} className="h-8 w-8 rounded-full">
              <Minimize2 className="h-5 w-5" />
              <span className="sr-only">Minimize</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-muted rounded-full mb-6">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Loading, error, or word display */}
        <div className="flex justify-center mb-8">
          {!contentInitializedRef.current ? (
            <div className="text-2xl p-6 text-center min-h-[120px] flex items-center justify-center">
              Loading content...
            </div>
          ) : error ? (
            <div className="text-2xl p-6 text-center min-h-[120px] flex items-center justify-center text-destructive">
              {error}
            </div>
          ) : (
            <div className="text-5xl font-bold p-6 text-center min-h-[120px] flex items-center justify-center">
              {currentWord || "Ready to start reading"}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleSkipBackward} className="rounded-full">
              <SkipBack className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleTogglePlay} className={cn("rounded-full", !isPaused && "animate-pulse")}>
              {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
              {isPaused ? "Play" : "Pause"}
            </Button>
            <Button variant="outline" onClick={handleSkipForward} className="rounded-full">
              Next
              <SkipForward className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              {currentPosition} / {totalWords} words
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{options.wordsPerMinute} WPM</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateOptions({ wordsPerMinute: Math.max(100, options.wordsPerMinute - 50) })}
                className="h-7 px-2 rounded-full"
              >
                -
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateOptions({ wordsPerMinute: Math.min(1000, options.wordsPerMinute + 50) })}
                className="h-7 px-2 rounded-full"
              >
                +
              </Button>
            </div>
          </div>

          {/* Slider for seeking */}
          <div className="mt-4">
            <Slider
              value={[progress * 100]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={(values) => jumpTo(values[0] / 100)}
              aria-label="Reading progress"
            />
          </div>
        </div>

        {/* Settings modal */}
        {showSettings && (
          <SpeedReadingSettingsModal
            options={options}
            onClose={() => setShowSettings(false)}
            onUpdateOptions={updateOptions}
          />
        )}

        {/* Keyboard shortcuts info */}
        {showKeyboardShortcuts && <KeyboardShortcutsInfo onClose={() => setShowKeyboardShortcuts(false)} />}
      </div>
    </div>
  )
}
