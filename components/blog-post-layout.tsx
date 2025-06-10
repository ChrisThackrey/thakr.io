"use client"

import type { ReactNode } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { PageBackground } from "@/components/page-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { FloatingSpeedReadButton } from "@/components/floating-speed-read-button"
import { BlogPostToc } from "@/components/blog-post-toc"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { BlogShareSection } from "@/components/blog-share-section"
import { FloatingShareButton } from "@/components/floating-share-button"
import { BlogErrorBoundary } from "@/components/blog-error-boundary"
import { ErrorBoundary } from "@/components/error-boundary"
import { RelatedPosts } from "@/components/related-posts"

interface BlogPostLayoutProps {
  content: string
  title: string
  date: string
  author: string
  tags: string[]
  readingTime: string
  slug: string
  children?: ReactNode
  withDropCap?: boolean
}

export function BlogPostLayout({
  content,
  title,
  date,
  author,
  tags,
  readingTime,
  slug,
  children,
  withDropCap = true,
}: BlogPostLayoutProps) {
  const { theme } = useTheme()
  const url = typeof window !== "undefined" ? window.location.href : `https://yourdomain.com/blog/${slug}`

  return (
    <>
      <PageBackground />
      <article className="container py-16 md:py-24">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-9 lg:col-span-8 xl:col-span-9">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{readingTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/categories/${tag.toLowerCase()}`}
                  className="bg-muted hover:bg-muted/80 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Render markdown content with error boundary */}
            <BlogErrorBoundary postTitle={title}>
              <MarkdownRenderer content={content} blogSlug={slug} className="mt-8" withDropCap={withDropCap} />
            </BlogErrorBoundary>

            {/* Related Posts Section */}
            <ErrorBoundary componentName="Related Posts">
              <RelatedPosts currentSlug={slug} tags={tags} maxPosts={3} />
            </ErrorBoundary>

            {/* Share section */}
            <ErrorBoundary componentName="Share Section">
              <BlogShareSection
                title={title}
                url={url}
                description={`Check out this article: ${title}`}
                className="mt-12"
              />
            </ErrorBoundary>

            {/* Optional children for additional content */}
            {children}
          </div>

          <aside
            className={cn(
              "md:col-span-3 lg:col-span-4 xl:col-span-3",
              theme === "dark" ? "toc-container-dark" : "toc-container-light",
            )}
          >
            <div className="sticky top-24">
              <ErrorBoundary componentName="Table of Contents">
                <BlogPostToc className={cn("toc-container", theme === "dark" ? "dark-theme-toc" : "light-theme-toc")} />
              </ErrorBoundary>
            </div>
          </aside>
        </div>

        <ErrorBoundary componentName="Reading Tools">
          <FloatingSpeedReadButton slug={slug} />
          <FloatingShareButton title={title} url={url} description={`Check out this article: ${title}`} />
        </ErrorBoundary>
      </article>
    </>
  )
}
