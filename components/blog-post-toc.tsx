"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks/use-scroll-position"

interface Heading {
  id: string
  text: string
  level: number
}

interface BlogPostTocProps {
  className?: string
}

export function BlogPostToc({ className }: BlogPostTocProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const { y: scrollY } = useScrollPosition()

  // Extract headings from the document
  useEffect(() => {
    const articleContent = document.querySelector("[data-blog-content]")
    if (!articleContent) return

    const headingElements = articleContent.querySelectorAll("h2, h3, h4")
    const extractedHeadings: Heading[] = []

    headingElements.forEach((el) => {
      const id = el.id
      const text = el.textContent || ""
      const level = Number.parseInt(el.tagName.substring(1))

      if (id && text) {
        extractedHeadings.push({ id, text, level })
      }
    })

    setHeadings(extractedHeadings)
  }, [])

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

      if (rect.top <= 100) {
        currentActiveId = element.id
        break
      }
    }

    // If no heading is in view, use the first one
    if (!currentActiveId && headingElements.length > 0) {
      currentActiveId = headingElements[0].id
    }

    setActiveId(currentActiveId)
  }, [scrollY, headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={cn("py-4", className)}>
      <h2 className="text-lg font-semibold mb-4">On this page</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "transition-colors duration-200",
              heading.level === 2 ? "ml-0" : "ml-4",
              heading.level === 4 ? "ml-8" : "",
            )}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 hover:text-primary transition-colors",
                activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Export with alternative casing for compatibility
export { BlogPostToc as BlogPostTOC }
