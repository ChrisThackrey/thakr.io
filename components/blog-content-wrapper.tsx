"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface BlogContentWrapperProps {
  children: React.ReactNode
  slug: string
  withDropCap?: boolean
  className?: string
}

export function BlogContentWrapper({ children, slug, withDropCap = false, className }: BlogContentWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add an ID to make it easier to find for speed reading
    if (contentRef.current && !contentRef.current.id) {
      contentRef.current.id = `blog-post-${slug}`

      // Add data attributes to help with detection
      contentRef.current.setAttribute("data-blog-content", "true")
      contentRef.current.setAttribute("data-blog-slug", slug)
    }

    // Add observer for dynamic content changes
    if (contentRef.current) {
      // Set up mutation observer to detect content changes
      const observer = new MutationObserver((mutations) => {
        // When content changes, dispatch a custom event
        window.dispatchEvent(
          new CustomEvent("blog-content-updated", {
            detail: { slug, element: contentRef.current },
          }),
        )
      })

      // Start observing
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      })

      // Clean up
      return () => observer.disconnect()
    }
  }, [slug])

  // Listen for word highlighting events
  useEffect(() => {
    const handleWordHighlighted = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail && customEvent.detail.word) {
        // You can add additional logic here to react to word highlighting
        console.log("Word highlighted in blog content:", customEvent.detail.word)
      }
    }

    window.addEventListener("word-highlighted", handleWordHighlighted)
    return () => window.removeEventListener("word-highlighted", handleWordHighlighted)
  }, [])

  return (
    <div
      ref={contentRef}
      className={cn("blog-content", withDropCap && "with-drop-cap", className)}
      id={`blog-post-${slug}`}
      data-blog-content="true"
      data-blog-slug={slug}
    >
      {children}
    </div>
  )
}
