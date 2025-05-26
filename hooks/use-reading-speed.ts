"use client"

import { useState, useEffect } from "react"

// Define reading speed presets (words per minute)
export const READING_SPEED_PRESETS = {
  slow: 150,
  normal: 225,
  fast: 300,
  veryFast: 375,
}

export type ReadingSpeedPreset = "slow" | "normal" | "fast" | "veryFast" | "custom"

interface UseReadingSpeedReturn {
  wordsPerMinute: number
  setWordsPerMinute: (wpm: number) => void
  preset: ReadingSpeedPreset
  setPreset: (preset: ReadingSpeedPreset) => void
  calculateReadingTime: (wordCount: number) => number
}

/**
 * Custom hook for managing reading speed preferences
 */
export function useReadingSpeed(): UseReadingSpeedReturn {
  const [wordsPerMinute, setWordsPerMinuteState] = useState(READING_SPEED_PRESETS.normal)
  const [preset, setPresetState] = useState<ReadingSpeedPreset>("normal")
  const [isInitialized, setIsInitialized] = useState(false)

  // Load reading speed from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const savedWpm = localStorage.getItem("reading-speed-wpm")
      const savedPreset = localStorage.getItem("reading-speed-preset") as ReadingSpeedPreset

      if (savedWpm) {
        setWordsPerMinuteState(Number.parseInt(savedWpm, 10))
      }

      if (savedPreset) {
        setPresetState(savedPreset)
      }

      setIsInitialized(true)
    } catch (error) {
      console.error("Error loading reading speed from localStorage:", error)
      setIsInitialized(true)
    }
  }, [])

  // Save reading speed to localStorage when it changes
  const setWordsPerMinute = (wpm: number) => {
    if (typeof window === "undefined" || !isInitialized) return

    try {
      const validWpm = Math.max(50, Math.min(800, wpm)) // Limit WPM between 50-800
      localStorage.setItem("reading-speed-wpm", validWpm.toString())
      setWordsPerMinuteState(validWpm)

      // Check if the new WPM matches any preset
      const matchingPreset = Object.entries(READING_SPEED_PRESETS).find(([_, value]) => value === validWpm) as
        | [ReadingSpeedPreset, number]
        | undefined

      const newPreset = matchingPreset ? matchingPreset[0] : "custom"
      setPresetState(newPreset)
      localStorage.setItem("reading-speed-preset", newPreset)
    } catch (error) {
      console.error("Error saving reading speed to localStorage:", error)
    }
  }

  const setPreset = (newPreset: ReadingSpeedPreset) => {
    if (typeof window === "undefined" || !isInitialized) return

    try {
      setPresetState(newPreset)
      localStorage.setItem("reading-speed-preset", newPreset)

      if (newPreset !== "custom") {
        const newWpm = READING_SPEED_PRESETS[newPreset]
        setWordsPerMinuteState(newWpm)
        localStorage.setItem("reading-speed-wpm", newWpm.toString())
      }
    } catch (error) {
      console.error("Error saving reading speed preset to localStorage:", error)
    }
  }

  // Function to calculate reading time based on word count and current WPM
  const calculateReadingTime = (wordCount: number): number => {
    if (wordCount <= 0) return 1
    const minutes = wordCount / wordsPerMinute
    const roundedMinutes = Math.ceil(minutes)
    return roundedMinutes === 0 ? 1 : roundedMinutes
  }

  return {
    wordsPerMinute,
    setWordsPerMinute,
    preset,
    setPreset,
    calculateReadingTime,
  }
}
