"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import { defaultMarkdownOptions, createMarkdownComponents } from "@/lib/markdown-config"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
  blogSlug?: string
  enableHighlighting?: boolean
  withDropCap?: boolean
}

export function MarkdownRenderer({
  content,
  className,
  blogSlug,
  enableHighlighting = true,
  withDropCap = false,
}: MarkdownRendererProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same structure to avoid layout shift
    return (
      <div
        className={cn(
          "prose prose-lg dark:prose-invert blog-content max-w-none",
          withDropCap && "with-drop-cap",
          enableHighlighting && "speed-reading-content",
          className,
        )}
      >
        <div className="animate-pulse">
          <div className="h-7 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-muted rounded w-4/5 mb-6"></div>
          <div className="h-6 bg-muted rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "prose prose-lg dark:prose-invert blog-content max-w-none",
        withDropCap && "with-drop-cap",
        enableHighlighting && "speed-reading-content",
        className,
      )}
      data-blog-slug={blogSlug}
      data-blog-content
    >
      <ReactMarkdown
        {...defaultMarkdownOptions}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={createMarkdownComponents()}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
