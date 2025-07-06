"use client"

import { useState, useEffect } from "react"
import { useReadingPosition } from "@/hooks/use-reading-position"
import { Button } from "@/components/ui/button"
import { ArrowDown, X, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface ReadingProgressIndicatorProps {
  slug: string
  title: string
}

export function ReadingProgressIndicator({ slug }: ReadingProgressIndicatorProps) {
  const { getReadingHistory, restorePosition, clearArticleHistory } = useReadingPosition()
  const [savedPosition, setSavedPosition] = useState<any>(null)
  const [isDismissed, setIsDismissed] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Check if we have a saved position for this article
    const history = getReadingHistory()
    const position = history.find((item) => item.slug === slug)

    if (position && position.readPercentage > 5 && position.readPercentage < 95) {
      setSavedPosition(position)
    }
  }, [slug, getReadingHistory])

  // Don't show if no saved position or already dismissed
  if (!savedPosition || isDismissed) return null

  const handleResume = () => {
    restorePosition(slug)
    setIsDismissed(true)
  }

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  const handleClear = () => {
    clearArticleHistory(slug)
    setIsDismissed(true)
    setSavedPosition(null)
  }

  return (
    <div
      className={cn(
        "fixed bottom-24 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg max-w-sm w-[calc(100%-2rem)] animate-in fade-in slide-in-from-bottom-4 duration-300",
        theme === "dark"
          ? "bg-card/95 backdrop-blur-sm border border-primary/20"
          : "bg-card backdrop-blur-sm border border-border",
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-sm">Continue Reading</h4>
        <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1" onClick={handleDismiss}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">
            You were {Math.round(savedPosition.readPercentage)}% through this article
          </span>
          {savedPosition.readingTime && (
            <span className="text-xs flex items-center">
              <Clock className="h-3 w-3 mr-1" />~
              {Math.ceil((savedPosition.readingTime * (100 - savedPosition.readPercentage)) / 100)}m left
            </span>
          )}
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${savedPosition.readPercentage}%` }} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="default" size="sm" className="flex-1" onClick={handleResume}>
          <ArrowDown className="h-4 w-4 mr-2" />
          Resume Reading
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  )
}
