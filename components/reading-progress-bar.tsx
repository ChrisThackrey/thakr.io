"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { cva } from "class-variance-authority"

interface ReadingProgressBarProps {
  target?: string // CSS selector for the target element to track
  className?: string
  barClassName?: string
  position?: "top" | "bottom"
  showPercentage?: boolean
  thickness?: "thin" | "medium" | "thick"
  animation?: "smooth" | "pulse" | "glow" | "none"
  color?: "primary" | "secondary" | "accent" | "rainbow"
}

const progressBarVariants = cva("h-full transition-all duration-150", {
  variants: {
    thickness: {
      thin: "h-1",
      medium: "h-1.5",
      thick: "h-2",
    },
    animation: {
      smooth: "ease-out",
      pulse: "ease-out animate-pulse",
      glow: "ease-out animate-glow",
      none: "",
    },
    color: {
      primary: "",
      secondary: "",
      accent: "",
      rainbow: "",
    },
  },
  defaultVariants: {
    thickness: "medium",
    animation: "smooth",
    color: "primary",
  },
})

export function ReadingProgressBar({
  target = "article",
  className,
  barClassName,
  position = "top",
  showPercentage = false,
  thickness = "medium",
  animation = "smooth",
  color = "primary",
}: ReadingProgressBarProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const article = document.querySelector(target)
    if (!article) return

    const calculateReadingProgress = () => {
      const articleBox = article.getBoundingClientRect()
      const articleHeight = articleBox.height
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY

      // Calculate how far we've scrolled into the article
      const scrollY = Math.max(0, scrollTop - articleBox.top + window.scrollY)

      // Calculate the total scrollable distance (article height minus viewport height)
      const totalScrollDistance = articleHeight - windowHeight

      // Calculate progress as a percentage
      let progress = (scrollY / totalScrollDistance) * 100

      // Clamp progress between 0 and 100
      progress = Math.min(100, Math.max(0, progress))

      setReadingProgress(progress)
    }

    // Calculate initial reading progress
    calculateReadingProgress()

    // Add scroll event listener
    window.addEventListener("scroll", calculateReadingProgress, { passive: true })

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", calculateReadingProgress)
    }
  }, [target])

  // Get the appropriate color based on theme and color prop
  const getBarColor = () => {
    if (color === "rainbow") {
      return "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
    }

    switch (color) {
      case "primary":
        return isDark
          ? "bg-gradient-to-r from-primary/70 via-primary/80 to-primary/70"
          : "bg-gradient-to-r from-primary/80 via-primary to-primary/80"
      case "secondary":
        return isDark
          ? "bg-gradient-to-r from-secondary/70 via-secondary/80 to-secondary/70"
          : "bg-gradient-to-r from-secondary/80 via-secondary to-secondary/80"
      case "accent":
        return isDark
          ? "bg-gradient-to-r from-accent/70 via-accent/80 to-accent/70"
          : "bg-gradient-to-r from-accent/80 via-accent to-accent/80"
      default:
        return isDark
          ? "bg-gradient-to-r from-primary/70 via-primary/80 to-primary/70"
          : "bg-gradient-to-r from-primary/80 via-primary to-primary/80"
    }
  }

  // Add glow animation if needed
  useEffect(() => {
    if (animation === "glow") {
      const style = document.createElement("style")
      style.innerHTML = `
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.5); }
          50% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.8); }
          100% { box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.5); }
        }
        .animate-glow {
          animation: glow 2s infinite;
        }
      `
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
    return undefined
  }, [animation])

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 bg-transparent reading-progress-container",
        position === "top" ? "top-0" : "bottom-0",
        progressBarVariants({ thickness }),
        className,
      )}
      role="progressbar"
      aria-valuenow={readingProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className={cn(
          "h-full transition-all progress-fill",
          progressBarVariants({ animation }),
          getBarColor(),
          barClassName,
        )}
        style={{ width: `${readingProgress}%` }}
      />

      {showPercentage && (
        <div className="absolute right-4 top-0 transform translate-y-full bg-background text-foreground px-2 py-1 rounded text-xs font-medium">
          {Math.round(readingProgress)}%
        </div>
      )}
    </div>
  )
}
