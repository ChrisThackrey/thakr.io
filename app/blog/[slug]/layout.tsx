import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type React from "react"
import { blogPosts, getSeriesBySlug } from "@/lib/blog"
import { notFound } from "next/navigation"
import { RelatedPosts } from "@/components/related-posts"
import { SeriesBanner } from "@/components/series-banner"
import { FloatingTocButton } from "@/components/floating-toc-button"
import { PageBackground } from "@/components/page-background"
import { Button } from "@/components/ui/button"
import { BlogLayout } from "@/components/blog-layout"
import { ReadingProgressBar } from "@/components/reading-progress-bar"
import { MobileReadingIndicator } from "@/components/mobile-reading-indicator"
import { CircularReadingProgress } from "@/components/circular-reading-progress"
import { ReadingTimeRemaining } from "@/components/remaining-reading-time"
import Link from "next/link"
import { ArrowLeft, Rocket } from "lucide-react"
import { ReadingProgressIndicator } from "@/components/reading-progress-indicator"
import { SpeedReadingButton } from "@/components/speed-reading/speed-reading-button"
import { FloatingSpeedReadButton } from "@/components/floating-speed-read-button"
import { SelectionSpeedRead } from "@/components/speed-reading/selection-speed-read"
import { SummaryGeneratorButton } from "@/components/summary-generator-button"
import { AutoTOC } from "@/components/auto-toc"
import { FloatingAutoTocButton } from "@/components/floating-auto-toc-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { BlogSelectionSpeedRead } from "@/components/blog-selection-speed-read"
import { FloatingBubbleProgress } from "@/components/floating-bubble-progress"
import { HeaderReadingProgress } from "@/components/header-reading-progress"
import { FloatingSpeedReadLauncher } from "@/components/speed-reading/floating-speed-read-launcher"

interface BlogPostLayoutProps {
  children: React.ReactNode
  params: {
    slug: string
  }
}

export default function BlogPostLayout({ children, params }: BlogPostLayoutProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const series = post.series ? getSeriesBySlug(post.series.slug) : null

  // Create a consistent content ID for the blog post
  const contentId = `blog-post-${params.slug}`

  return (
    <>
      <PageBackground />
      {/* Enhanced reading progress indicators */}
      <ReadingProgressBar position="top" thickness="medium" animation="smooth" color="primary" showPercentage={false} />
      <HeaderReadingProgress height="thin" className="hidden md:block" />
      <MobileReadingIndicator showScrollToTop={true} />

      <article className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
              </Link>
            </Button>

            {/* Reading options dropdown with speed read and summary */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  <span>Reading Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <SpeedReadingButton
                    contentId={contentId}
                    slug={params.slug}
                    className="w-full justify-start"
                    startInMiniPlayer={false}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SpeedReadingButton
                    contentId={contentId}
                    slug={params.slug}
                    className="w-full justify-start"
                    startInMiniPlayer={true}
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SummaryGeneratorButton contentId={contentId} title={post.title} className="w-full justify-start" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {post.series && series && <SeriesBanner post={post} />}

        <BlogLayout slug={params.slug}>
          <main className="px-0 sm:px-4">
            <article
              className="prose prose-lg dark:prose-invert mt-4 blog-content max-w-none"
              data-blog-content="true"
              data-blog-slug={params.slug}
              id={contentId}
            >
              {children}
            </article>

            {/* Add the selection speed read component */}
            <BlogSelectionSpeedRead contentSelector="article[data-blog-content='true']" slug={params.slug} />
          </main>
          <aside className="px-0 sm:px-2">
            {/* Add the reading time remaining indicator */}
            <ReadingTimeRemaining slug={params.slug} className="mb-6 hidden md:block" variant="detailed" />

            {/* Add the automatic table of contents */}
            <AutoTOC
              contentSelector="article[data-blog-content]"
              className="hidden md:block mb-8"
              defaultOpen={true}
              maxDepth={3}
            />
            <RelatedPosts currentSlug={params.slug} tags={post.tags} />
          </aside>
        </BlogLayout>

        {/* Show floating TOC button only for posts that are part of a series */}
        {series && <FloatingTocButton series={series} currentPostSlug={post.slug} className="md:hidden" />}

        {/* Add the reading progress indicator */}
        <ReadingProgressIndicator slug={params.slug} title={post.title} />

        {/* Add circular reading progress for mobile */}
        <CircularReadingProgress
          contentSelector="article[data-blog-content]"
          className="md:hidden fixed bottom-24 right-4 z-50"
          showTimeRemaining={true}
          readingTime={post.readingTime || "5 min"}
          size="medium"
        />

        {/* Add floating bubble progress for desktop */}
        <FloatingBubbleProgress
          className="hidden md:flex"
          showTimeRemaining={true}
          readingTime={post.readingTime || "5 min"}
          position="bottom-right"
          size="medium"
          showOnlyOnScroll={true}
        />

        {/* Add floating TOC button for mobile */}
        <FloatingAutoTocButton contentSelector="article[data-blog-content]" className="md:hidden" />

        {/* Replace the old floating speed button with our new launcher */}
        <FloatingSpeedReadLauncher
          contentId={contentId}
          selector="article[data-blog-content='true']"
          slug={params.slug}
          className="hidden md:block"
          position="bottom-right"
        />

        {/* Keep the old button for mobile for now */}
        <FloatingSpeedReadButton contentSelector="article[data-blog-content='true']" className="md:hidden" />

        {/* Add selection-based speed reading */}
        <SelectionSpeedRead contentId={contentId} slug={params.slug} />
      </article>
    </>
  )
}
