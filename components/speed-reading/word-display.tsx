"use client"

import { cn } from "@/lib/utils"
import type { SpeedReadingOptions } from "@/hooks/use-speed-reading"

interface WordDisplayProps {
  word: string
  options: SpeedReadingOptions
  isPaused?: boolean
  type?: "heading" | "paragraph" | "list" | "code"
  size?: "normal" | "compact"
}

export function WordDisplay({ word, options, isPaused, type, size = "normal" }: WordDisplayProps) {
  const fontSize = size === "compact" ? "text-2xl" : "text-5xl"
  const padding = size === "compact" ? "p-4" : "p-8"

  return (
    <div
      className={cn(
        "font-bold text-center transition-all duration-200",
        fontSize,
        padding,
        isPaused && "opacity-70",
        type === "heading" && "text-primary",
        type === "code" && "font-mono bg-muted/50 rounded",
      )}
      style={{
        fontSize: size === "normal" ? `${3 * options.fontScale}rem` : `${1.5 * options.fontScale}rem`,
      }}
    >
      {word}
    </div>
  )
}
