"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface VideoBackgroundProps {
  src: string
  poster?: string
}

/**
 * Renders a full-viewport, continuously looping video background behind the
 * page content, with a subtle theme-aware tint overlay for readability.
 */
export function VideoBackground({ src, poster }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  // Avoid hydration mismatch: only branch on theme after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Browsers only autoplay muted video, and React can omit the `muted`
    // attribute from server-rendered HTML, so set it imperatively. Retry
    // playback once data arrives and when the tab becomes visible again.
    video.muted = true
    video.defaultMuted = true

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {})
      }
    }

    tryPlay()
    video.addEventListener("loadeddata", tryPlay)
    document.addEventListener("visibilitychange", tryPlay)
    return () => {
      video.removeEventListener("loadeddata", tryPlay)
      document.removeEventListener("visibilitychange", tryPlay)
    }
  }, [])

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
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
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
