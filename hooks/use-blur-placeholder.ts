"use client"

import { useState, useEffect } from "react"

// Function to create a simple blur data URL
export function createBlurPlaceholder(width = 10, height = 10, color = "rgba(200, 200, 200, 0.5)"): string {
  // Create a small canvas
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")

  if (!ctx) return ""

  // Fill with color
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)

  // Add some noise for texture
  for (let i = 0; i < (width * height) / 3; i++) {
    const x = Math.floor(Math.random() * width)
    const y = Math.floor(Math.random() * height)
    const brightness = Math.random() * 0.3 + 0.7 // 0.7-1.0
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.2})`
    ctx.fillRect(x, y, 1, 1)
  }

  // Convert to data URL
  return canvas.toDataURL("image/jpeg", 0.1)
}

// Hook to generate a blur placeholder for an image
export function useBlurPlaceholder(src: string, color?: string): { blurDataURL: string; isGenerating: boolean } {
  const [blurDataURL, setBlurDataURL] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  useEffect(() => {
    if (!src || typeof window === "undefined") return

    setIsGenerating(true)

    // If we have color info, use it for the placeholder
    if (color) {
      setBlurDataURL(createBlurPlaceholder(10, 10, color))
      setIsGenerating(false)
      return
    }

    // Otherwise generate a simple placeholder
    const placeholder = createBlurPlaceholder()
    setBlurDataURL(placeholder)
    setIsGenerating(false)

    // In a real implementation, you might want to analyze the image
    // to determine dominant colors, but that's more complex
  }, [src, color])

  return { blurDataURL, isGenerating }
}
