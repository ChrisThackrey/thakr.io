"use client"

import { cn } from "@/lib/utils"
import { formatWordWithORP } from "@/utils/speed-reading"
import { useMemo } from "react"

interface CompactWordDisplayProps {
  word: string
  isPaused?: boolean
  type?: string
  className?: string
}

export function CompactWordDisplay({ word, isPaused, type, className }: CompactWordDisplayProps) {
  // Format the word with Optimal Recognition Point highlighting
  const formattedWord = useMemo(() => {
    return formatWordWithORP(word)
  }, [word])

  // Determine if this is a code element or heading
  const isCode = type === "code"
  const isHeading = type === "heading"

  return (
    <div
      className={cn(
        "px-4 py-3 flex items-center justify-center",
        isCode && "font-mono text-emerald-600 dark:text-emerald-400",
        isHeading && "font-semibold text-primary",
        isPaused && "opacity-70",
        className,
      )}
    >
      <div className="flex items-center justify-center min-h-10 text-lg">
        <span className="text-muted-foreground">{formattedWord.before}</span>
        <span className="text-foreground font-medium">{formattedWord.focus}</span>
        <span className="text-muted-foreground">{formattedWord.after}</span>
      </div>
    </div>
  )
}
