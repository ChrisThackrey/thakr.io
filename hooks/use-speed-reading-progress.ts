"use client"

import { useState, useEffect } from "react"

interface ReadingProgress {
  slug: string
  progress: number
  lastRead: number // Timestamp
}

export function useSpeedReadingProgress(slug: string) {
  const [progress, setProgress] = useState<number>(0)
  const storageKey = "speed-reading-progress"

  // Load initial progress
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const savedProgressStr = localStorage.getItem(storageKey)
      if (savedProgressStr) {
        const savedProgress: ReadingProgress[] = JSON.parse(savedProgressStr)
        const postProgress = savedProgress.find((p) => p.slug === slug)

        if (postProgress) {
          setProgress(postProgress.progress)
        }
      }
    } catch (error) {
      console.error("Error loading reading progress:", error)
    }
  }, [slug])

  // Save progress
  const saveProgress = (newProgress: number) => {
    if (typeof window === "undefined") return

    try {
      setProgress(newProgress)

      const savedProgressStr = localStorage.getItem(storageKey)
      let savedProgress: ReadingProgress[] = []

      if (savedProgressStr) {
        savedProgress = JSON.parse(savedProgressStr)
      }

      // Find existing progress or create new entry
      const existingIndex = savedProgress.findIndex((p) => p.slug === slug)
      const updatedProgress: ReadingProgress = {
        slug,
        progress: newProgress,
        lastRead: Date.now(),
      }

      if (existingIndex >= 0) {
        savedProgress[existingIndex] = updatedProgress
      } else {
        savedProgress.push(updatedProgress)
      }

      // Keep only the 20 most recent entries
      savedProgress.sort((a, b) => b.lastRead - a.lastRead)
      savedProgress = savedProgress.slice(0, 20)

      localStorage.setItem(storageKey, JSON.stringify(savedProgress))
    } catch (error) {
      console.error("Error saving reading progress:", error)
    }
  }

  return { progress, saveProgress }
}
