"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useReadingPosition, type ReadingPosition } from "@/hooks/use-reading-position"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollText, Clock, Trash2, X, BookOpen } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export function ReadingHistory() {
  const { getReadingHistory, clearHistory, clearArticleHistory } = useReadingPosition()
  const [history, setHistory] = useState<ReadingPosition[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  // Update history when dialog opens
  useEffect(() => {
    if (isOpen) {
      setHistory(getReadingHistory())
    }
  }, [isOpen, getReadingHistory])

  // Format the timestamp
  const formatTime = (timestamp: number) => {
    try {
      return formatDistanceToNow(timestamp, { addSuffix: true })
    } catch {
      return "recently"
    }
  }

  // Handle clearing a single article
  const handleClearArticle = (slug: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    clearArticleHistory(slug)
    setHistory(getReadingHistory())
  }

  // Handle clearing all history
  const handleClearAll = () => {
    clearHistory()
    setHistory([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="View reading history">
          <BookOpen className="h-5 w-5" />
          {history.length > 0 && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reading History</DialogTitle>
          <DialogDescription>Continue reading where you left off in previous articles.</DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto pr-2 -mr-2">
          {history.length === 0 ? (
            <div className="text-center py-8">
              <ScrollText className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <p className="mt-4 text-muted-foreground">No reading history yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="block">
                  <Card
                    className={cn(
                      "transition-colors hover:border-primary/50",
                      theme === "dark" ? "hover:bg-muted/30" : "hover:bg-muted/50",
                    )}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base line-clamp-1">{item.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mt-1 -mr-1"
                          onClick={(e) => handleClearArticle(item.slug, e)}
                          aria-label="Remove from history"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 pb-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatTime(item.timestamp)}</span>
                        </div>
                        {item.readingTime && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{item.readingTime} min read</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">Reading progress</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs h-5">
                              {Math.round(item.readPercentage)}%
                            </Badge>
                            {item.readingTime && item.readPercentage < 95 && (
                              <span className="text-xs flex items-center text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {Math.ceil((item.readingTime * (100 - item.readPercentage)) / 100)}m left
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.readPercentage}%` }}
                          />
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {history.length} {history.length === 1 ? "article" : "articles"} in history
          </p>
          <Button variant="destructive" size="sm" onClick={handleClearAll} disabled={history.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
