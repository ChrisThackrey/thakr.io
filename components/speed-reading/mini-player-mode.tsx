"use client"

import { useState, useEffect, useRef } from "react"
import { X, Maximize2, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { WordDisplay } from "@/components/speed-reading/word-display"
import { SpeedReadingControls } from "@/components/speed-reading/speed-reading-controls"
import { useDraggable } from "@/hooks/use-draggable"
import { SpeedReadingSettingsModal } from "@/components/speed-reading/speed-reading-settings-modal"
import { useSpeedReading, type SpeedReadingOptions } from "@/hooks/use-speed-reading"
import { Button } from "@/components/ui/button"
import { KeyboardShortcutsInfo } from "@/components/speed-reading/keyboard-shortcuts-info"
import { useKeypress } from "@/hooks/use-keypress"

interface MiniPlayerModeProps {
  contentId?: string
  selector?: string
  initialContent?: string
  initialPosition?: number
  onClose: () => void
  onExpand?: () => void
  slug?: string
  width?: number
  height?: number
  position?: {
    x: number
    y: number
  }
}

export function MiniPlayerMode({
  contentId,
  selector,
  initialContent,
  initialPosition,
  onClose,
  onExpand,
  slug,
  width = 320,
  height = 200,
  position = { x: 20, y: 20 },
}: MiniPlayerModeProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const minimizedHeight = 40 // Height when minimized
  const elementRef = useRef<HTMLDivElement>(null)

  // Initialize draggable behavior
  const { position: currentPosition } = useDraggable({
    initialPosition: position,
    bounds: "window",
  })

  // Initialize speed reading
  const {
    isActive,
    isPaused,
    currentChunk,
    progress,
    options,
    start,
    pause,
    resume,
    stop,
    updateOptions,
    jumpTo,
    skip,
    startWithContent,
  } = useSpeedReading(selector, slug)

  // Handle initialization
  useEffect(() => {
    // If we have initial content, use that directly
    if (initialContent) {
      startWithContent(initialContent, initialPosition || 0)
      return
    }

    // Otherwise try to find the content on the page
    try {
      let contentElement: Element | null = null

      // Try to find by ID first
      if (contentId) {
        contentElement = document.getElementById(contentId)
      }

      // If not found by ID, try selector
      if (!contentElement && selector) {
        contentElement = document.querySelector(selector)
      }

      // If still not found, show an error message
      if (!contentElement) {
        console.error("Could not find content to speed read")
        return
      }

      // Start speed reading with the found content
      start()
    } catch (error) {
      console.error("Error initializing speed reading:", error)
    }
  }, [contentId, selector, initialContent, initialPosition, start, startWithContent])

  // Set up keyboard shortcuts
  useKeypress(" ", () => {
    if (isActive) {
      if (isPaused) {
        resume()
      } else {
        pause()
      }
    }
  })

  useKeypress("ArrowRight", () => {
    if (isActive) {
      skip(10)
    }
  })

  useKeypress("ArrowLeft", () => {
    if (isActive) {
      skip(-10)
    }
  })

  useKeypress("Escape", () => {
    onClose()
  })

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  // Handle option updates
  const handleUpdateOptions = (newOptions: Partial<SpeedReadingOptions>) => {
    updateOptions(newOptions)
  }

  // Handle close
  const handleClose = () => {
    stop()
    onClose()
  }

  // Handle expand
  const handleExpand = () => {
    if (onExpand) {
      onExpand()
    }
  }

  // Toggle minimized state
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      <div
        ref={elementRef}
        className={cn(
          "fixed flex flex-col z-50 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg transition-all duration-300 overflow-hidden",
          isMinimized ? "mini-player-minimized" : "mini-player-expanded",
        )}
        style={{
          width: `${width}px`,
          height: isMinimized ? `${minimizedHeight}px` : `${height}px`,
          left: `${currentPosition.x}px`,
          top: `${currentPosition.y}px`,
        }}
      >
        {/* Header / Drag handle */}
        <div
          className="flex items-center justify-between p-2 bg-muted/80 cursor-move border-b border-border"
          data-drag-handle
        >
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium truncate flex-1">Speed Reader</span>
            {!isMinimized && progress > 0 && (
              <span className="text-xs text-muted-foreground">{Math.round(progress * 100)}%</span>
            )}
          </div>

          <div className="flex items-center space-x-1">
            {/* Toggle minimize */}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={toggleMinimized}
              aria-label={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>

            {/* Expand to full screen */}
            {!isMinimized && onExpand && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleExpand}
                aria-label="Expand to full screen"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            )}

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleClose}
              aria-label="Close speed reader"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Content area (hidden when minimized) */}
        {!isMinimized && (
          <>
            {/* Word display */}
            <div className="flex-1 flex items-center justify-center p-4 bg-muted/30">
              <WordDisplay
                word={typeof currentChunk === "string" ? currentChunk : currentChunk?.content || ""}
                options={options}
                isPaused={isPaused}
                type={typeof currentChunk === "object" && currentChunk.type 
                  ? (["code", "heading", "list", "paragraph"].includes(currentChunk.type) 
                     ? currentChunk.type as "code" | "heading" | "list" | "paragraph"
                     : undefined) 
                  : undefined}
                size="compact"
              />
            </div>

            {/* Controls */}
            <div className="p-2 border-t border-border bg-background">
              <SpeedReadingControls
                isPaused={isPaused}
                progress={progress}
                onPause={pause}
                onResume={resume}
                onSeek={jumpTo}
                onSkipForward={() => skip(10)}
                onSkipBackward={() => skip(-10)}
                onSettings={() => setShowSettings(true)}
                onShortcuts={() => setShowShortcuts(true)}
                size="compact"
                showSpeedDisplay
                currentSpeed={options.wordsPerMinute}
                onUpdateSpeed={(speed) => updateOptions({ wordsPerMinute: speed })}
                variant="mini"
              />
            </div>
          </>
        )}
      </div>

      {/* Settings modal */}
      {showSettings && (
        <SpeedReadingSettingsModal
          options={options}
          onClose={() => setShowSettings(false)}
          onUpdateOptions={handleUpdateOptions}
        />
      )}

      {/* Keyboard shortcuts info */}
      {showShortcuts && <KeyboardShortcutsInfo onClose={() => setShowShortcuts(false)} />}
    </>
  )
}
