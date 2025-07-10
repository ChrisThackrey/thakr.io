"use client"

import { useState, useEffect } from "react"

interface UseOptimizedImageOptions {
  src: string
  lowQualitySrc?: string
  placeholder?: string
  eager?: boolean
}

export function useOptimizedImage({
  src,
  lowQualitySrc,
  placeholder = "/placeholder.svg?height=400&width=600&query=placeholder%20image",
  eager = false,
}: UseOptimizedImageOptions) {
  const [currentSrc, setCurrentSrc] = useState<string>(placeholder)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isLowQualityLoaded, setIsLowQualityLoaded] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    let lowQualityImg: HTMLImageElement | null = null
    // Reset state when src changes
    setIsLoaded(false)
    setHasError(false)

    // Safety check for SSR
    if (typeof window === "undefined") return

    // Check if we should use data saver mode
    const prefersReducedData = window.matchMedia?.("(prefers-reduced-data: reduce)")?.matches || false

    if (prefersReducedData) {
      // In reduced data mode, just use the placeholder or low quality version
      setCurrentSrc(lowQualitySrc || placeholder)
      setIsLoaded(true)
      return
    }

    // Load low quality version first if available
    if (lowQualitySrc && !isLowQualityLoaded) {
      lowQualityImg = new Image()

      // Set crossOrigin to avoid CORS issues
      lowQualityImg.crossOrigin = "anonymous"

      lowQualityImg.onload = () => {
        setCurrentSrc(lowQualitySrc)
        setIsLowQualityLoaded(true)
      }

      lowQualityImg.onerror = () => {
        console.warn(`Failed to load low quality image: ${lowQualitySrc}`)
        // Continue with high quality version attempt
      }

      lowQualityImg.src = lowQualitySrc
    }

    // Then load high quality version
    const img = new Image()

    // Set crossOrigin to avoid CORS issues
    img.crossOrigin = "anonymous"

    img.onload = () => {
      setCurrentSrc(src)
      setIsLoaded(true)
    }

    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`)
      setHasError(true)
      // Keep using the current src (either placeholder or low quality)
    }

    if (eager) {
      // fetchPriority is a valid HTML attribute for resource prioritization
      ;(img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high"
      img.loading = "eager"
    }

    img.src = src

    // Cleanup function
    return () => {
      img.onload = null
      img.onerror = null
      if (lowQualityImg) {
        lowQualityImg.onload = null
        lowQualityImg.onerror = null
      }
    }
  }, [src, lowQualitySrc, placeholder, eager])

  return { src: currentSrc, isLoaded, hasError }
}
