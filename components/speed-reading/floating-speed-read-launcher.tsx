"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Rocket, X } from "lucide-react"
import { SpeedReadingMode } from "./speed-reading-mode"
import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks/use-scroll-position"

interface FloatingSpeedReadLauncherProps {
  contentId?: string
  selector?: string
  className?: string
  slug?: string
  threshold?: number
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

export function FloatingSpeedReadLauncher({
  contentId,
  selector = "article[data-blog-content='true']",
  className,
  slug,
  threshold = 300, // Show after scrolling this many pixels
  position = "bottom-right",
}: FloatingSpeedReadLauncherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const scrollPosition = useScrollPosition()
  const isVisible = scrollPosition.y > threshold && !isDismissed

  // Position classes based on the position prop
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-24 right-6",
    "top-left": "top-24 left-6",
  }

  // Extract the page content for speed reading
  const [extractedContent, setExtractedContent] = useState<string | null>(null)

  // Ensure selector is a string
  const validSelector = typeof selector === "string" ? selector : "article[data-blog-content='true']"

  useEffect(() => {
    const extractContent = () => {
      try {
        let contentElement: Element | null = null

        // Try to find the content using various selectors
        if (contentId) {
          contentElement = document.getElementById(contentId)
        }

        if (!contentElement && validSelector) {
          contentElement = document.querySelector(validSelector)
        }

        if (!contentElement && slug) {
          // Try with specific blog post selectors
          const specificSelectors = [
            `#blog-post-${slug} .prose`,
            `[data-post="${slug}"] .prose`,
            `article[data-blog-content="true"]`,
          ]

          for (const specificSelector of specificSelectors) {
            contentElement = document.querySelector(specificSelector)
            if (contentElement) break
          }
        }

        if (!contentElement) {
          // Try common fallbacks
          const fallbacks = [
            ".prose",
            "article .prose",
            "article[data-blog-content]",
            "article[data-blog-content='true']",
            "article .mdx",
            ".mdx-content",
            "article",
            "main",
            ".blog-content",
            "#blog-content",
            "[data-mdx-content]",
            ".markdown-body",
          ]

          for (const fallback of fallbacks) {
            contentElement = document.querySelector(fallback)
            if (contentElement) break
          }
        }

        if (contentElement) {
          // Extract the HTML content to preserve structure
          const html =
            contentElement instanceof HTMLElement ? contentElement.innerHTML : contentElement.textContent || ""

          setExtractedContent(html)
        }
      } catch (error) {
        console.error("Error extracting content:", error)
      }
    }

    // Only extract content when the launcher is opened
    if (isOpen && !extractedContent) {
      extractContent()
    }
  }, [isOpen, contentId, validSelector, slug, extractedContent])

  // Reset dismissed state when navigating to a new page
  useEffect(() => {
    setIsDismissed(false)
    return () => {
      setIsOpen(false)
    }
  }, [slug])

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
  }

  return (
    <>
      <div
        className={cn(
          "fixed z-50 transition-all duration-500 ease-in-out",
          positionClasses[position],
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none",
          className,
        )}
      >
        <div className="relative group">
          <Button
            size="lg"
            onClick={() => setIsOpen(true)}
            className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 pr-6 pl-5 py-6"
            aria-label="Speed read this article"
          >
            <Rocket className="h-5 w-5" />
            <span className="font-medium">Speed Read</span>
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted/80 text-muted-foreground hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Dismiss speed read button"
          >
            <X className="h-3 w-3" />
          </Button>

          <div className="absolute -bottom-8 left-0 right-0 text-center text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            Press <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Alt</kbd> +{" "}
            <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">S</kbd> to open
          </div>
        </div>
      </div>

      {isOpen && (
        <SpeedReadingMode
          contentId={contentId}
          selector={validSelector}
          onClose={() => setIsOpen(false)}
          slug={slug}
          startInMiniPlayer={true}
          initialContent={extractedContent || undefined}
        />
      )}
    </>
  )
}
