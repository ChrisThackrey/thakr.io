"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { BlogContentWrapper } from "@/components/blog-content-wrapper"
import { cn } from "@/lib/utils"

interface BlogContentRendererProps {
  slug: string
  children: React.ReactNode
  className?: string
  withDropCap?: boolean
}

export function BlogContentRenderer({ slug, children, className, withDropCap = true }: BlogContentRendererProps) {
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
    <BlogContentWrapper slug={slug} withDropCap={withDropCap}>
      <div
        ref={contentRef}
        className={cn("prose prose-lg dark:prose-invert blog-content", className)}
        data-blog-content="true"
        data-blog-slug={slug}
      >
        {children}
      </div>
    </BlogContentWrapper>
  )
}
