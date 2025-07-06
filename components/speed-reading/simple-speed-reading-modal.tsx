"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import "@/styles/glass-morphism.css"

interface SimpleSpeedReadingModalProps {
  onClose: () => void
}

export function SimpleSpeedReadingModal({ onClose }: SimpleSpeedReadingModalProps) {
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(300) // words per minute
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [wordChangeAnimation, setWordChangeAnimation] = useState(false)
  const wordDisplayRef = useRef<HTMLDivElement>(null)

  // Extract text from the article when the component mounts
  useEffect(() => {
    const articleElement = document.querySelector("article")

    if (articleElement) {
      // Find text content within the article
      const textContent = articleElement.textContent || ""

      // Process into words
      const processedWords = textContent
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .filter((word) => word.length > 0)

      setWords(processedWords)
      console.log(`Found ${processedWords.length} words to speed read`)
    } else {
      console.error("Could not find article element")
    }
  }, [])

  // Word change animation
  useEffect(() => {
    if (wordDisplayRef.current) {
      setWordChangeAnimation(true)
      const timer = setTimeout(() => {
        setWordChangeAnimation(false)
      }, 200)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [currentWordIndex])

  // Handle play/pause
  useEffect(() => {
    if (isPlaying && words.length > 0) {
      // Calculate delay based on words per minute
      const delay = 60000 / speed

      timerRef.current = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
          // Stop at the end of the text
          if (prevIndex >= words.length - 1) {
            setIsPlaying(false)
            return prevIndex
          }
          return prevIndex + 1
        })
      }, delay)
    }

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, words, speed])

  function togglePlayPause() {
    setIsPlaying(!isPlaying)
  }

  function skipBack() {
    setCurrentWordIndex((prev) => Math.max(0, prev - 10))
  }

  function skipForward() {
    setCurrentWordIndex((prev) => Math.min(words.length - 1, prev + 10))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex glass-backdrop glass-animate-in"
      style={{
        alignItems: "flex-start",
        paddingTop: "30vh",
      }}
    >
      <div className="glass-card w-full max-w-xl mx-auto rounded-xl p-6 relative glass-scale-in glass-animate-breathe">
        {/* Glass highlight effect */}
        <div className="glass-highlight"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Speed Reading</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-background/10 glass-button border-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Word display */}
        <div className="h-32 flex items-center justify-center">
          <p
            ref={wordDisplayRef}
            className={cn("text-4xl font-medium glass-word-display", wordChangeAnimation && "word-change")}
          >
            {words.length > 0 ? words[currentWordIndex] : "Loading..."}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="h-1 w-full glass-slider mb-6">
          <div
            className="h-full glass-slider-progress transition-all"
            style={{ width: `${(currentWordIndex / (words.length || 1)) * 100}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={skipBack} className="rounded-full border-0 glass-button">
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              onClick={togglePlayPause}
              className={cn("w-24 rounded-full glass-button border-0", isPlaying && "glass-animate-pulse")}
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>

            <Button variant="outline" size="icon" onClick={skipForward} className="rounded-full border-0 glass-button">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Speed: {speed} WPM</span>
              <span className="text-sm text-muted-foreground">
                {currentWordIndex}/{words.length} words
              </span>
            </div>
            <Slider
              value={[speed]}
              min={100}
              max={800}
              step={10}
              onValueChange={(value) => setSpeed(value[0])}
              className="glass-slider"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
