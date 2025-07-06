"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import BlogContentContainer from "@/components/blog-content-container"
import { cn } from "@/lib/utils"

interface BlogContentRendererProps {
  slug: string
  children: React.ReactNode
  className?: string
}

export function BlogContentRenderer({ slug, children, className }: BlogContentRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register the content for speed reading and other functionality
    const element = contentRef.current
    if (element) {
      window.dispatchEvent(
        new CustomEvent("blog-content-loaded", {
          detail: { slug, element },
        }),
      )
    }

    return () => {
      window.dispatchEvent(
        new CustomEvent("blog-content-unloaded", {
          detail: { slug },
        }),
      )
    }
  }, [slug])

  return (
    <BlogContentContainer slug={slug}>
      <div
        ref={contentRef}
        className={cn("prose prose-lg dark:prose-invert blog-content", className)}
        data-blog-content="true"
        data-blog-slug={slug}
      >
        {children}
      </div>
    </BlogContentContainer>
  )
}
