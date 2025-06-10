"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function PageBackground() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render a basic background without any dynamic elements initially
  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  // Once mounted, render the appropriate background
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      {/* Base layer */}
      <div className="absolute inset-0 bg-white dark:bg-black opacity-90 transition-opacity duration-700" />

      {/* Background image layer with subtle animation */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          prefersReducedMotion ? "" : "animate-subtle-shift"
        }`}
        style={{
          backgroundImage: `url('/images/light-background-01.jpg')`,
          opacity: isDark ? 0.6 : 0.75,
        }}
      />

      {/* Backdrop blur layer */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          backdropFilter: `blur(${isDark ? 50 : 60}px)`,
          WebkitBackdropFilter: `blur(${isDark ? 50 : 60}px)`,
        }}
      />
    </div>
  )
}
