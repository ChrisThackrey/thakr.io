"use client"

import { useEffect, useState } from "react"
import { SpeedReadingButton } from "./speed-reading/speed-reading-button"
import { FloatingSpeedReadButton } from "./floating-speed-read-button"
import { cn } from "@/lib/utils"

interface MDXSpeedReadingProps {
  contentId?: string
  className?: string
}

export function MDXSpeedReading({ contentId, className }: MDXSpeedReadingProps) {
  const [mdxSelector, setMdxSelector] = useState<string | undefined>(undefined)

  // Find the MDX content element
  useEffect(() => {
    // First try to find by the content ID
    if (contentId && document.getElementById(contentId)) {
      setMdxSelector(`#${contentId}`)
      return
    }

    // Try common MDX content selectors
    const selectors = ["article .prose", ".mdx-content", "[data-mdx-content]", ".markdown-body", "article > div > div"]

    for (const selector of selectors) {
      if (document.querySelector(selector)) {
        setMdxSelector(selector)
        break
      }
    }
  }, [contentId])

  if (!mdxSelector) {
    return null
  }

  return (
    <>
      <SpeedReadingButton selector={mdxSelector} contentId={contentId} className={cn("relative", className)} />
      <FloatingSpeedReadButton selector={mdxSelector} contentId={contentId} className="md:hidden" />
    </>
  )
}
