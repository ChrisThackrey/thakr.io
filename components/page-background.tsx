"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Renders the softly-blurred, gently-moving gradient background that
 * appears on every page.
 */
export function PageBackground() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 -z-50 bg-background" />
  }

  const isDark = resolvedTheme === "dark"
  const imageSrc = "/images/light-background.png" // served from /public

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={"Soft abstract gradient background with pastel blues, yellows and pinks"}
        fill
        priority
        sizes="100vw"
        quality={80}
        className={cn(
          "object-cover transition-opacity duration-1000",
          !prefersReducedMotion && "animate-subtle-shift",
          // slightly dim in dark mode for contrast
          isDark ? "opacity-30" : "opacity-60",
        )}
      />
      {/* extra overlay tint & blur for readability */}
      <div
        className={cn(
          "absolute inset-0 backdrop-blur-3xl transition-colors duration-1000",
          isDark ? "bg-black/60" : "bg-white/40",
        )}
      />
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern" />
    </div>
  )
}
