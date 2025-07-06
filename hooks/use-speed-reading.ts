"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { parseContent, type ContentChunk } from "@/utils/content-parser"
import { highlightWord, clearHighlights } from "@/utils/text-highlighter"

export interface SpeedReadingOptions {
  wordsPerMinute: number
  chunkSize: number
  fontScale: number
  highlightText: boolean
  skipCodeBlocks: boolean
  pauseOnHeadings: boolean
  slowDownOnComplexity: boolean
}

const DEFAULT_OPTIONS: SpeedReadingOptions = {
  wordsPerMinute: 300,
  chunkSize: 1,
  fontScale: 1,
  highlightText: true,
  skipCodeBlocks: false,
  pauseOnHeadings: true,
  slowDownOnComplexity: true,
}

export function useSpeedReading(contentSelector?: string, slug?: string) {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [content, setContent] = useState<ContentChunk[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [options, setOptions] = useState<SpeedReadingOptions>(DEFAULT_OPTIONS)
  const [progress, setProgress] = useState(0)
  const [currentChunk, setCurrentChunk] = useState<ContentChunk | string>("")

  const contentRef = useRef<ContentChunk[]>([])
  const currentIndexRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const optionsRef = useRef(options)
  const isPausedRef = useRef(true)
  const isActiveRef = useRef(false)
  const lastHighlightRef = useRef<HTMLElement | null>(null)
  const contentSelectorRef = useRef(contentSelector)
  const slugRef = useRef(slug)
  const continuousPlaybackRef = useRef<NodeJS.Timeout | null>(null)
  const playbackMonitorRef = useRef<NodeJS.Timeout | null>(null)
  // const lastPlayAttemptRef = useRef(0) // Currently unused but may be needed later
  const playbackStateRef = useRef({
    isPlaying: false,
    lastWordIndex: -1,
    stuckCounter: 0,
    lastUpdateTime: 0,
  })

  // Update refs when state changes
  useEffect(() => {
    optionsRef.current = options
    isPausedRef.current = isPaused
    isActiveRef.current = isActive
    contentRef.current = content
    currentIndexRef.current = currentIndex
    contentSelectorRef.current = contentSelector
    slugRef.current = slug
  }, [options, isPaused, isActive, content, currentIndex, contentSelector, slug])

  // Calculate the delay between words based on WPM
  const calculateDelay = useCallback((chunk: ContentChunk): number => {
    const { wordsPerMinute, slowDownOnComplexity, pauseOnHeadings } = optionsRef.current

    // Base delay calculation (60,000 ms / WPM)
    let delay = 60000 / wordsPerMinute

    // Adjust delay based on content type
    if (chunk.type) {
      switch (chunk.type) {
        case "heading":
          // Pause longer on headings if enabled
          if (pauseOnHeadings) {
            delay *= 2.5
          }
          break
        case "code":
          // Slow down for code blocks
          delay *= 1.5
          break
        case "list":
          // Slight pause for list items
          delay *= 1.2
          break
      }
    }

    // Adjust for word complexity if enabled
    if (slowDownOnComplexity) {
      const content = typeof chunk === "string" ? chunk : chunk.content

      // Slow down for longer words
      if (content.length > 8) {
        delay *= 1.2
      }

      // Slow down for words with punctuation
      if (/[,.;:!?]/.test(content)) {
        delay *= 1.3
      }
    }

    return delay
  }, [])

  // Function to highlight the current word in the original content
  const highlightCurrentWord = useCallback((chunk: ContentChunk) => {
    if (!optionsRef.current.highlightText) {
      // Clear any existing highlights if highlighting is disabled
      if (lastHighlightRef.current) {
        clearHighlights()
        lastHighlightRef.current = null
      }
      return
    }

    try {
      // Find the content container
      let container: HTMLElement | null = null

      // Try to find by data attribute first (most reliable)
      if (slugRef.current) {
        container = document.querySelector(`[data-blog-slug="${slugRef.current}"]`) as HTMLElement
      }

      // If not found, try the selector
      if (!container && contentSelectorRef.current) {
        container = document.querySelector(contentSelectorRef.current) as HTMLElement
      }

      // If still not found, try some common fallbacks
      if (!container) {
        const fallbacks = [
          ".prose",
          "article .prose",
          "article .mdx",
          ".mdx-content",
          "article",
          "main",
          ".blog-content",
          "#blog-content",
          "[data-mdx-content]",
          ".markdown-body",
          "[data-blog-content]",
        ]

        for (const fallback of fallbacks) {
          container = document.querySelector(fallback) as HTMLElement
          if (container) break
        }
      }

      if (!container) return

      // Clear previous highlight
      clearHighlights()

      // Get the word to highlight
      const wordToHighlight = typeof chunk === "string" ? chunk : chunk.content

      // Highlight the word
      const highlightedElement = highlightWord(container, wordToHighlight)
      lastHighlightRef.current = highlightedElement

      // Dispatch a custom event for other components to react to
      window.dispatchEvent(
        new CustomEvent("speed-reading-highlight", {
          detail: {
            word: wordToHighlight,
            element: highlightedElement,
            index: currentIndexRef.current,
            total: contentRef.current.length,
          },
        }),
      )
    } catch (error) {
      console.error("Error highlighting word:", error)
    }
  }, [])

  // Function to advance to the next word
  const advanceToNextWord = useCallback(() => {
    if (!isActiveRef.current || isPausedRef.current || contentRef.current.length === 0) {
      return
    }

    // Update playback state
    playbackStateRef.current.lastUpdateTime = Date.now()

    // Get the current chunk
    const nextIndex = currentIndexRef.current + 1

    // Check if we've reached the end
    if (nextIndex >= contentRef.current.length) {
      // We've reached the end of the content
      setIsPaused(true)
      isPausedRef.current = true
      setProgress(1) // 100% progress

      // Clear any timers
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }

      // Dispatch completion event
      window.dispatchEvent(
        new CustomEvent("speed-reading-complete", {
          detail: {
            totalWords: contentRef.current.length,
          },
        }),
      )

      return
    }

    // Get the next chunk
    const nextChunk = contentRef.current[nextIndex]

    // Skip code blocks if option is enabled
    if (optionsRef.current.skipCodeBlocks && nextChunk.type === "code" && nextIndex + 1 < contentRef.current.length) {
      // Skip to the next non-code chunk
      currentIndexRef.current = nextIndex + 1
      setCurrentIndex(nextIndex + 1)

      // Update progress
      const newProgress = (nextIndex + 1) / contentRef.current.length
      setProgress(newProgress)

      // Continue to the next word
      advanceToNextWord()
      return
    }

    // Update the current index
    currentIndexRef.current = nextIndex
    setCurrentIndex(nextIndex)

    // Update the current chunk
    setCurrentChunk(nextChunk)

    // Update progress
    const newProgress = nextIndex / contentRef.current.length
    setProgress(newProgress)

    // Highlight the current word in the original content
    highlightCurrentWord(nextChunk)

    // Track for playback monitoring
    playbackStateRef.current.lastWordIndex = nextIndex

    // Calculate the delay for the next word
    const delay = calculateDelay(nextChunk)

    // Schedule the next word
    timerRef.current = setTimeout(() => {
      advanceToNextWord()
    }, delay)
  }, [calculateDelay, highlightCurrentWord])

  // Function to force an advance to the next word
  const forceAdvance = useCallback(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // Advance to the next word immediately
    advanceToNextWord()
  }, [advanceToNextWord])

  // Function to ensure playback is continuing
  const ensurePlaying = useCallback(() => {
    const now = Date.now()
    const { lastUpdateTime, lastWordIndex, stuckCounter } = playbackStateRef.current

    // If we're not active or we're paused, do nothing
    if (!isActiveRef.current || isPausedRef.current) {
      return
    }

    // Check if we're stuck (no progress for more than 2 seconds)
    if (now - lastUpdateTime > 2000 && currentIndexRef.current === lastWordIndex) {
      console.log("Playback appears stuck, attempting to resume...", {
        currentIndex: currentIndexRef.current,
        lastWordIndex,
        timeSinceUpdate: now - lastUpdateTime,
        stuckCounter: stuckCounter + 1,
      })

      // Increment stuck counter
      playbackStateRef.current.stuckCounter = stuckCounter + 1

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }

      // If we've been stuck multiple times, try more aggressive recovery
      if (stuckCounter > 2) {
        console.log("Multiple stuck instances detected, skipping ahead...")

        // Skip ahead by a few words
        const skipToIndex = Math.min(currentIndexRef.current + 3, contentRef.current.length - 1)
        currentIndexRef.current = skipToIndex
        setCurrentIndex(skipToIndex)

        // Reset stuck counter
        playbackStateRef.current.stuckCounter = 0
      }

      // Force an advance to the next word
      forceAdvance()

      // Update last update time
      playbackStateRef.current.lastUpdateTime = now
    }
  }, [forceAdvance])

  // Set up continuous playback monitoring
  useEffect(() => {
    // Only monitor if active and not paused
    if (isActive && !isPaused) {
      // Clear any existing monitor
      if (playbackMonitorRef.current) {
        clearInterval(playbackMonitorRef.current)
      }

      // Set up new monitor
      playbackMonitorRef.current = setInterval(() => {
        ensurePlaying()
      }, 1000) // Check every second

      // Clean up on unmount
      return () => {
        if (playbackMonitorRef.current) {
          clearInterval(playbackMonitorRef.current)
          playbackMonitorRef.current = null
        }
      }
    }

    // Clean up if not active or paused
    return () => {
      if (playbackMonitorRef.current) {
        clearInterval(playbackMonitorRef.current)
        playbackMonitorRef.current = null
      }
    }
  }, [isActive, isPaused, ensurePlaying])

  // Function to start speed reading
  const start = useCallback(() => {
    try {
      // Find the content element
      let contentElement: Element | null = null

      if (contentSelectorRef.current) {
        contentElement = document.querySelector(contentSelectorRef.current)
      }

      if (!contentElement) {
        throw new Error("Could not find content element")
      }

      // Parse the content
      const parsedContent = parseContent(contentElement.innerHTML)

      // Set the content
      setContent(parsedContent)
      contentRef.current = parsedContent

      // Reset the current index
      setCurrentIndex(0)
      currentIndexRef.current = 0

      // Set the current chunk
      if (parsedContent.length > 0) {
        setCurrentChunk(parsedContent[0])
      }

      // Reset progress
      setProgress(0)

      // Set active and paused
      setIsActive(true)
      isActiveRef.current = true
      setIsPaused(true)
      isPausedRef.current = true

      // Reset playback state
      playbackStateRef.current = {
        isPlaying: false,
        lastWordIndex: -1,
        stuckCounter: 0,
        lastUpdateTime: Date.now(),
      }

      // Clear any existing timers
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }

      // Highlight the first word
      if (parsedContent.length > 0) {
        highlightCurrentWord(parsedContent[0])
      }
    } catch (error) {
      console.error("Error starting speed reading:", error)
      throw error
    }
  }, [highlightCurrentWord])

  // Function to start with provided content
  const startWithContent = useCallback(
    (contentText: string, startIndex = 0) => {
      try {
        // Parse the content
        const parsedContent = parseContent(contentText)

        // Set the content
        setContent(parsedContent)
        contentRef.current = parsedContent

        // Set the starting index
        const validStartIndex = Math.min(Math.max(0, startIndex), parsedContent.length - 1)
        setCurrentIndex(validStartIndex)
        currentIndexRef.current = validStartIndex

        // Set the current chunk
        if (parsedContent.length > 0) {
          setCurrentChunk(parsedContent[validStartIndex])
        }

        // Set progress
        const initialProgress = validStartIndex / parsedContent.length
        setProgress(initialProgress)

        // Set active and paused
        setIsActive(true)
        isActiveRef.current = true
        setIsPaused(true)
        isPausedRef.current = true

        // Reset playback state
        playbackStateRef.current = {
          isPlaying: false,
          lastWordIndex: -1,
          stuckCounter: 0,
          lastUpdateTime: Date.now(),
        }

        // Clear any existing timers
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }

        // Highlight the first word
        if (parsedContent.length > 0) {
          highlightCurrentWord(parsedContent[validStartIndex])
        }
      } catch (error) {
        console.error("Error starting speed reading with content:", error)
        throw error
      }
    },
    [highlightCurrentWord],
  )

  // Function to start from a specific index
  const startFromIndex = useCallback(
    (index: number) => {
      if (!isActiveRef.current || contentRef.current.length === 0) {
        return
      }

      // Validate the index
      const validIndex = Math.min(Math.max(0, index), contentRef.current.length - 1)

      // Update the current index
      setCurrentIndex(validIndex)
      currentIndexRef.current = validIndex

      // Update the current chunk
      setCurrentChunk(contentRef.current[validIndex])

      // Update progress
      const newProgress = validIndex / contentRef.current.length
      setProgress(newProgress)

      // Highlight the current word
      highlightCurrentWord(contentRef.current[validIndex])

      // Reset playback state
      playbackStateRef.current = {
        isPlaying: !isPausedRef.current,
        lastWordIndex: validIndex,
        stuckCounter: 0,
        lastUpdateTime: Date.now(),
      }
    },
    [highlightCurrentWord],
  )

  // Function to resume speed reading
  const resume = useCallback(() => {
    if (!isActiveRef.current) {
      return
    }

    // Set paused to false
    setIsPaused(false)
    isPausedRef.current = false

    // Update playback state
    playbackStateRef.current.isPlaying = true
    playbackStateRef.current.lastUpdateTime = Date.now()

    // Start the timer for the next word
    const currentChunk = contentRef.current[currentIndexRef.current]
    const delay = calculateDelay(currentChunk)

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // Schedule the next word
    timerRef.current = setTimeout(() => {
      advanceToNextWord()
    }, delay)

    // Set up continuous playback to ensure we don't get stuck
    if (continuousPlaybackRef.current) {
      clearInterval(continuousPlaybackRef.current)
    }

    continuousPlaybackRef.current = setInterval(() => {
      // If we're still playing but haven't advanced in a while, force an advance
      if (!isPausedRef.current && Date.now() - playbackStateRef.current.lastUpdateTime > 3000) {
        console.log("Continuous playback check: forcing advance")
        forceAdvance()
      }
    }, 3000) // Check every 3 seconds
  }, [advanceToNextWord, calculateDelay, forceAdvance])

  // Function to pause speed reading
  const pause = useCallback(() => {
    if (!isActiveRef.current) {
      return
    }

    // Set paused to true
    setIsPaused(true)
    isPausedRef.current = true

    // Update playback state
    playbackStateRef.current.isPlaying = false

    // Clear the timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // Clear continuous playback
    if (continuousPlaybackRef.current) {
      clearInterval(continuousPlaybackRef.current)
      continuousPlaybackRef.current = null
    }
  }, [])

  // Function to stop speed reading
  const stop = useCallback(() => {
    // Set active to false
    setIsActive(false)
    isActiveRef.current = false

    // Set paused to true
    setIsPaused(true)
    isPausedRef.current = true

    // Clear the timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // Clear continuous playback
    if (continuousPlaybackRef.current) {
      clearInterval(continuousPlaybackRef.current)
      continuousPlaybackRef.current = null
    }

    // Clear playback monitor
    if (playbackMonitorRef.current) {
      clearInterval(playbackMonitorRef.current)
      playbackMonitorRef.current = null
    }

    // Clear highlights
    clearHighlights()
    lastHighlightRef.current = null

    // Reset state
    setContent([])
    contentRef.current = []
    setCurrentIndex(0)
    currentIndexRef.current = 0
    setCurrentChunk("")
    setProgress(0)
  }, [])

  // Function to update options
  const updateOptions = useCallback((newOptions: Partial<SpeedReadingOptions>) => {
    setOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions, ...newOptions }
      optionsRef.current = updatedOptions
      return updatedOptions
    })
  }, [])

  // Function to jump to a specific position
  const jumpTo = useCallback(
    (position: number) => {
      if (!isActiveRef.current || contentRef.current.length === 0) {
        return
      }

      // Calculate the index based on position (0-1)
      const index = Math.floor(position * contentRef.current.length)

      // Start from that index
      startFromIndex(index)

      // If we're not paused, resume playback
      if (!isPausedRef.current) {
        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }

        // Schedule the next word
        const currentChunk = contentRef.current[currentIndexRef.current]
        const delay = calculateDelay(currentChunk)

        timerRef.current = setTimeout(() => {
          advanceToNextWord()
        }, delay)
      }
    },
    [startFromIndex, advanceToNextWord, calculateDelay],
  )

  // Function to skip forward or backward
  const skip = useCallback(
    (amount: number) => {
      if (!isActiveRef.current || contentRef.current.length === 0) {
        return
      }

      // Calculate the new index
      const newIndex = Math.min(Math.max(0, currentIndexRef.current + amount), contentRef.current.length - 1)

      // Jump to the new index
      startFromIndex(newIndex)

      // If we're not paused, resume playback
      if (!isPausedRef.current) {
        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }

        // Schedule the next word
        const currentChunk = contentRef.current[currentIndexRef.current]
        const delay = calculateDelay(currentChunk)

        timerRef.current = setTimeout(() => {
          advanceToNextWord()
        }, delay)
      }
    },
    [startFromIndex, advanceToNextWord, calculateDelay],
  )

  // Function to update the display (refresh highlighting)
  const updateDisplay = useCallback(() => {
    if (!isActiveRef.current || contentRef.current.length === 0) {
      return
    }

    // Get the current chunk
    const currentChunk = contentRef.current[currentIndexRef.current]

    // Update the current chunk state
    setCurrentChunk(currentChunk)

    // Refresh the highlight
    highlightCurrentWord(currentChunk)
  }, [highlightCurrentWord])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Clear any timers
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      // Clear continuous playback
      if (continuousPlaybackRef.current) {
        clearInterval(continuousPlaybackRef.current)
      }

      // Clear playback monitor
      if (playbackMonitorRef.current) {
        clearInterval(playbackMonitorRef.current)
      }

      // Clear highlights
      clearHighlights()
    }
  }, [])

  // Listen for blog content updates
  useEffect(() => {
    const handleContentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent

      // Only update if we're active and the update is for our slug
      if (isActiveRef.current && customEvent.detail && customEvent.detail.slug === slugRef.current) {
        console.log("Blog content updated, refreshing highlight")
        updateDisplay()
      }
    }

    // Listen for content updates
    window.addEventListener("blog-content-updated", handleContentUpdate)

    // Clean up
    return () => {
      window.removeEventListener("blog-content-updated", handleContentUpdate)
    }
  }, [updateDisplay])

  return {
    isActive,
    isPaused,
    content,
    currentIndex,
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
    startFromIndex,
    updateDisplay,
    forceAdvance,
    ensurePlaying,
  }
}
