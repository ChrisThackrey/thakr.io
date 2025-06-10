"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useScrollPosition } from "@/hooks/use-scroll-position"

interface Heading {
  id: string
  text: string
  level: number
}

interface AutoTOCProps {
  contentSelector: string
  className?: string
  defaultOpen?: boolean
  maxDepth?: number
  scrollOffset?: number
}

export function AutoTOC({
  contentSelector,
  className,
  defaultOpen = true,
  maxDepth = 3,
  scrollOffset = 100,
}: AutoTOCProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const { y: scrollY } = useScrollPosition()

  // Extract headings from the document
  useEffect(() => {
    const extractHeadings = () => {
      const contentElement = document.querySelector(contentSelector)
      if (!contentElement) return []

      const headingElements = contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6")
      const extractedHeadings: Heading[] = []

      headingElements.forEach((el) => {
        const level = Number.parseInt(el.tagName.substring(1))

        // Skip headings deeper than maxDepth
        if (level > maxDepth) return

        // Skip h1 if it's the title (usually the first h1)
        if (level === 1 && extractedHeadings.length === 0) return

        // Generate an ID if none exists
        if (!el.id) {
          el.id =
            el.textContent
              ?.trim()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "") || `heading-${extractedHeadings.length}`
        }

        const id = el.id
        const text = el.textContent || ""

        if (id && text) {
          extractedHeadings.push({ id, text, level })
        }
      })

      return extractedHeadings
    }

    // Initial extraction
    setHeadings(extractHeadings())

    // Re-extract on content changes
    const observer = new MutationObserver(() => {
      setHeadings(extractHeadings())
    })

    const contentElement = document.querySelector(contentSelector)
    if (contentElement) {
      observer.observe(contentElement, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  }, [contentSelector, maxDepth])

  // Update active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[]

    let currentActiveId = ""

    // Find the heading that's currently in view
    for (let i = headingElements.length - 1; i >= 0; i--) {
      const element = headingElements[i]
      const rect = element.getBoundingClientRect()

      if (rect.top <= scrollOffset) {
        currentActiveId = element.id
        break
      }
    }

    // If no heading is in view, use the first one
    if (!currentActiveId && headingElements.length > 0) {
      currentActiveId = headingElements[0].id
    }

    setActiveId(currentActiveId)
  }, [scrollY, headings, scrollOffset])

  // Smooth scroll to heading when clicking a TOC link
  const scrollToHeading = useCallback(
    (id: string) => {
      const element = document.getElementById(id)
      if (!element) return

      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - scrollOffset

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    },
    [scrollOffset],
  )

  if (headings.length === 0) {
    return null
  }

  return (
    <div className={cn("mb-8 rounded-lg border bg-card p-4 sticky top-24", className)}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Table of Contents</h2>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="h-8 w-8 p-0">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="sr-only">{isOpen ? "Collapse" : "Expand"}</span>
        </Button>
      </div>

      <div
        className={cn("transition-all duration-300 overflow-hidden", isOpen ? "max-h-[calc(100vh-200px)]" : "max-h-0")}
      >
        <nav className="overflow-y-auto pr-2 max-h-[calc(100vh-200px)]">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(
                  "transition-colors duration-200",
                  heading.level === 2 ? "ml-0" : "ml-3",
                  heading.level === 4 ? "ml-6" : "",
                )}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHeading(heading.id)
                  }}
                  className={cn(
                    "block py-1 hover:text-primary transition-colors text-sm",
                    activeId === heading.id
                      ? "text-primary font-medium border-l-2 border-primary pl-2"
                      : "text-muted-foreground pl-2 border-l-2 border-transparent",
                  )}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
