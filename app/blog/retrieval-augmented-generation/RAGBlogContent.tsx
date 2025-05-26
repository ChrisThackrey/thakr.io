"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface RAGBlogContentProps {
  children: React.ReactNode
}

export function RAGBlogContent({ children }: RAGBlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add an ID to make it easier to find for speed reading
    if (contentRef.current) {
      contentRef.current.id = "blog-post-retrieval-augmented-generation"
    }
  }, [])

  return (
    <div ref={contentRef} className="blog-content with-drop-cap mt-4" data-blog-content="true">
      {children}
    </div>
  )
}
