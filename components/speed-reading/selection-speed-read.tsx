"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Minimize2, Play, FileText, Clock, Settings } from "lucide-react"
import { SpeedReadingMode } from "@/components/speed-reading/speed-reading-mode"
import { getSelectionInfo } from "@/utils/text-selection"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CustomActionProvider } from "@/contexts/custom-actions-context"
import { CustomActionsMenu } from "@/components/custom-actions/custom-actions-menu"
import Link from "next/link"

interface SelectionSpeedReadProps {
  contentId?: string
  selector?: string
  slug?: string
}

export function SelectionSpeedRead({ contentId, selector = "article .prose", slug }: SelectionSpeedReadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState("")
  const [selectionPosition, setSelectionPosition] = useState<number | null>(null)
  const [startInMiniPlayer, setStartInMiniPlayer] = useState(false)
  const [selectionLength, setSelectionLength] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState("")
  const popupRef = useRef<HTMLDivElement>(null)
  const selectionTimeout = useRef<NodeJS.Timeout | null>(null)
  const hasShownTutorial = useRef(false)
  const lastSelectionRef = useRef<string>("")

  // Check if we've shown the tutorial before
  useEffect(() => {
    try {
      hasShownTutorial.current = localStorage.getItem("speed-reading-tutorial-shown") === "true"
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [])

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()

      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        // Don't hide popup immediately to prevent it from disappearing when clicking buttons
        if (selectionTimeout.current) {
          clearTimeout(selectionTimeout.current)
        }

        selectionTimeout.current = setTimeout(() => {
          if (!popupRef.current?.contains(document.activeElement)) {
            setShowPopup(false)
          }
        }, 300)
        return
      }

      // Get the selected text and its position
      const selectionInfo = getSelectionInfo(selection, contentId || selector)

      if (!selectionInfo) {
        return
      }

      const { text, position, rect } = selectionInfo

      // Only show popup for selections with meaningful length (at least 2 words)
      const words = text.split(/\s+/).filter((word) => word.length > 0)
      if (words.length < 2) {
        return
      }

      // Check if this is the same selection as before
      if (text === lastSelectionRef.current) {
        return
      }

      lastSelectionRef.current = text

      // Count words
      const wordCount = words.length

      // Calculate estimated reading time at 300 WPM
      const minutes = wordCount / 300
      let timeStr = ""
      if (minutes < 1) {
        const seconds = Math.round(minutes * 60)
        timeStr = `${seconds} sec`
      } else {
        timeStr = `${Math.round(minutes)} min`
      }

      // Position the popup above the selection
      const popupX = rect.left + rect.width / 2
      const popupY = rect.top - 10 // Position slightly above the selection

      setSelectedText(text)
      setSelectionPosition(position)
      setSelectionLength(text.length)
      setWordCount(wordCount)
      setEstimatedTime(timeStr)
      setPopupPosition({ x: popupX, y: popupY })
      setShowPopup(true)

      // Show tutorial if this is the first time
      if (!hasShownTutorial.current) {
        try {
          localStorage.setItem("speed-reading-tutorial-shown", "true")
          hasShownTutorial.current = true
        } catch (e) {
          // Ignore localStorage errors
        }
      }
    }

    // Listen for selection changes
    document.addEventListener("selectionchange", handleSelection)

    // Also listen for mouseup to catch selections that don't trigger selectionchange
    document.addEventListener("mouseup", handleSelection)

    return () => {
      document.removeEventListener("selectionchange", handleSelection)
      document.removeEventListener("mouseup", handleSelection)
      if (selectionTimeout.current) {
        clearTimeout(selectionTimeout.current)
      }
    }
  }, [contentId, selector])

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle starting speed reading
  const handleStartSpeedReading = (miniPlayer = false) => {
    setStartInMiniPlayer(miniPlayer)
    setIsOpen(true)
    setShowPopup(false)
  }

  return (
    <CustomActionProvider>
      {showPopup && (
        <div
          ref={popupRef}
          className="selection-popup fixed z-50"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <Card className="p-3 shadow-lg border border-border bg-background/95 backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>{wordCount} words</span>
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3" />
                <span>{estimatedTime}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="default"
                        className="flex items-center gap-1 text-xs w-full"
                        onClick={() => handleStartSpeedReading(false)}
                      >
                        <Play className="h-3 w-3" />
                        <span>Speed Read Selection</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Read selected text in full screen mode</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 text-xs w-full"
                        onClick={() => handleStartSpeedReading(true)}
                      >
                        <Minimize2 className="h-3 w-3" />
                        <span>Mini-player Mode</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Read in a floating mini-player window</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Custom actions section */}
              <div className="mt-1 pt-2 border-t border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Actions</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" asChild>
                          <Link href="/settings/custom-actions">
                            <Settings className="h-3 w-3" />
                            <span className="sr-only">Customize Actions</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Customize text actions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <CustomActionsMenu
                  text={selectedText}
                  title={slug}
                  url={typeof window !== "undefined" ? window.location.href : undefined}
                  maxActions={5}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {isOpen && (
        <SpeedReadingMode
          contentId={contentId}
          selector={selector}
          onClose={() => setIsOpen(false)}
          slug={slug}
          initialContent={selectedText}
          initialPosition={selectionPosition || undefined}
          startInMiniPlayer={startInMiniPlayer}
        />
      )}
    </CustomActionProvider>
  )
}
