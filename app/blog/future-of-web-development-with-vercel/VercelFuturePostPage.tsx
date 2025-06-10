"use client"

import { blogPosts } from "@/lib/blog"
import { ReadingTime } from "@/components/reading-time"
import { BlogPostTracker } from "@/components/blog-post-tracker"
import { useReadingTimeCalculator } from "@/hooks/use-reading-time-calculator"
import { useState, useEffect } from "react"
import { ColoredTag } from "@/components/colored-tag"

const post = blogPosts.find((p) => p.slug === "future-of-web-development-with-vercel")

function DynamicReadingTime({
  slug,
  fallbackTime,
  className,
}: { slug: string; fallbackTime?: number; className?: string }) {
  const { readingTime } = useReadingTimeCalculator()
  const [isClient, setIsClient] = useState(false)

  // Add useEffect to set isClient to true after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use the calculated time if available and we're client-side, otherwise fall back to the static time
  const displayTime = isClient && readingTime > 0 ? readingTime : fallbackTime || 1

  return <ReadingTime minutes={displayTime} className={className} />
}

export default function VercelFuturePostPage() {
  if (!post) {
    return null
  }

  return (
    <BlogPostTracker slug="future-of-web-development-with-vercel" title={post.title}>
      <div>
        <div className="mb-8 mt-8">
          <h1 className="text-4xl font-bold tracking-tight mb-6">{post.title}</h1>
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <ColoredTag key={tag} tag={tag} href={`/blog/categories/${encodeURIComponent(tag)}`} />
              ))}
            </div>
            <time className="text-foreground/80 font-medium text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {post.date}
            </time>
          </div>
          <DynamicReadingTime slug={post.slug} fallbackTime={post.readingTime} className="mb-8" />
        </div>

        <div className="h-px bg-border/60 w-full my-8" aria-hidden="true" />

        <div className="blog-content with-drop-cap">
          <h2>The Vercel Ecosystem in 2025</h2>
          <p className="mb-4">
            Over the past few years, Vercel has transformed from a deployment platform into a comprehensive ecosystem
            for building modern web applications. With the release of Next.js 15 and several new platform features,
            Vercel has solidified its position as a leader in the web development space.
          </p>

          <p className="mb-4">
            In this post, we'll explore the latest features and tools in the Vercel ecosystem and how they're shaping
            the future of web development.
          </p>

          <h2>Next.js 15: Performance Reimagined</h2>
          <p className="mb-4">Next.js 15 brings significant performance improvements, particularly in the areas of:</p>

          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Enhanced server components with improved streaming</li>
            <li className="mb-2">Further Turbopack optimizations for lightning-fast HMR</li>
            <li className="mb-2">Built-in image optimization using WebAssembly</li>
            <li className="mb-2">New rendering patterns for optimal user experiences</li>
          </ul>

          <p className="mb-4">
            These improvements enable developers to build faster, more responsive web applications with less effort.
          </p>

          <h2>AI-Driven Development</h2>
          <p className="mb-4">
            Perhaps the most exciting developments in the Vercel ecosystem are in the area of AI-driven development
            tools:
          </p>

          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">v0 has evolved into a comprehensive AI pair programmer</li>
            <li className="mb-2">New AI-powered debugging tools help identify and fix issues faster</li>
            <li className="mb-2">Smart analytics provide insights into application performance and user behavior</li>
            <li className="mb-2">
              AI-assisted accessibility improvements ensure web applications are usable by everyone
            </li>
          </ul>

          <p>
            The full details of these new features and how to implement them in your projects will be covered in
            upcoming articles. Stay tuned as we dive deeper into each aspect of the Vercel ecosystem.
          </p>
        </div>
      </div>
    </BlogPostTracker>
  )
}
