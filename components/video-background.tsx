"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface VideoBackgroundProps {
  src: string
  poster?: string
}

/**
 * Renders a full-viewport, continuously looping video background behind the
 * page content, with a theme-aware tint overlay for readability. Visitors who
 * prefer reduced motion see the static poster frame instead.
 */
export function VideoBackground({ src, poster }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  // Avoid hydration mismatch: only branch on theme after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (prefersReducedMotion) {
      video.pause()
      return
    }

    // React may omit the `muted` attribute from server-rendered HTML, which
    // blocks autoplay; set it imperatively before playing.
    video.muted = true
    video.play().catch(() => {
      // Autoplay can be rejected by browser policy; the poster remains visible.
    })
  }, [prefersReducedMotion])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <div className="page-background fixed inset-0 -z-50 overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="metadata"
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
      {/* tint overlay for text readability */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-1000",
          isDark ? "bg-black/25" : "bg-white/10",
        )}
      />
    </div>
  )
}
