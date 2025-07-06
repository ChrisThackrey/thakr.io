import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Rocket } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getPost, getPosts, getSeries, getRelatedPosts, type Series } from "@/lib/blog"
import { useMDXComponents } from "@/mdx-components"

import { BlogPostLayout } from "@/components/blog-post-layout"
import { RelatedPosts } from "@/components/related-posts"
import { SeriesBanner } from "@/components/series-banner"
import { FloatingTocButton } from "@/components/floating-toc-button"
import { Button } from "@/components/ui/button"
import { ReadingProgressBar } from "@/components/reading-progress-bar"
import { MobileReadingIndicator } from "@/components/mobile-reading-indicator"
import { CircularReadingProgress } from "@/components/circular-reading-progress"
import { ReadingTimeRemaining } from "@/components/remaining-reading-time"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BlogSelectionSpeedRead } from "@/components/blog-selection-speed-read"
import { FloatingBubbleProgress } from "@/components/floating-bubble-progress"
import { HeaderReadingProgress } from "@/components/header-reading-progress"
import { FloatingSpeedReadLauncher } from "@/components/speed-reading/floating-speed-read-launcher"

interface PageProps {
  params: { slug: string }
}

/* ---------------- Build-time static params ---------------- */
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

/* --------------------------- Page -------------------------- */
export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  /* -------- Resolve series safely (by name) -------- */
  let series: Series | null = null
  if (post.series?.name) {
    series = (await getSeries()).find((s) => s.name === post.series!.name) ?? null
  }

  const related = await getRelatedPosts(post.slug, post.tags)
  const mdxComponents = useMDXComponents({})
  const contentId = `blog-post-${params.slug}`

  return (
    <>
      {/* global progress bars */}
      <ReadingProgressBar position="top" thickness="medium" animation="smooth" color="primary" />
      <HeaderReadingProgress height="thin" className="hidden md:block" />
      <MobileReadingIndicator showScrollToTop />

      <article className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Posts
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Rocket className="h-4 w-4" /> <span>Reading&nbsp;Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <SpeedReadingButton contentId={contentId} slug={params.slug} className="w-full justify-start" />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <SpeedReadingButton
                  contentId={contentId}
                  slug={params.slug}
                  className="w-full justify-start"
                  startInMiniPlayer
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <SummaryGeneratorButton contentId={contentId} title={post.title} className="w-full justify-start" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* optional series banner */}
        {series && <SeriesBanner post={post} series={series} />}

        {/* two-column layout */}
        <BlogPostLayout post={post}>
          <main className="px-0 sm:px-4">
            <article
              id={contentId}
              data-blog-content
              data-blog-slug={params.slug}
              className="prose prose-lg dark:prose-invert mt-4 max-w-none"
            >
              <MDXRemote source={post.content} components={mdxComponents} />
            </article>
            <BlogSelectionSpeedRead contentSelector={`#${contentId}`} slug={params.slug} />
          </main>

          <aside className="px-0 sm:px-2">
            <ReadingTimeRemaining slug={params.slug} className="mb-6 hidden md:block" variant="detailed" />
            <AutoTOC contentSelector={`#${contentId}`} className="hidden md:block mb-8" defaultOpen maxDepth={3} />
            <RelatedPosts posts={related} />
          </aside>
        </BlogPostLayout>

        {/* floating helpers */}
        {series && <FloatingTocButton series={series} currentPostSlug={post.slug} className="md:hidden" />}
        <ReadingProgressIndicator slug={params.slug} title={post.title} />
        <CircularReadingProgress
          contentSelector={`#${contentId}`}
          className="fixed bottom-24 right-4 z-50 md:hidden"
          showTimeRemaining
          readingTime={`${post.readingTime} min`}
          size="medium"
        />
        <FloatingBubbleProgress
          className="hidden md:flex"
          showTimeRemaining
          readingTime={`${post.readingTime} min`}
          position="bottom-right"
          size="medium"
          showOnlyOnScroll
        />
        <FloatingAutoTocButton contentSelector={`#${contentId}`} className="md:hidden" />
        <FloatingSpeedReadLauncher
          contentId={contentId}
          selector={`#${contentId}`}
          slug={params.slug}
          className="hidden md:block"
          position="bottom-right"
        />
        <FloatingSpeedReadButton contentSelector={`#${contentId}`} className="md:hidden" />
        <SelectionSpeedRead contentId={contentId} slug={params.slug} />
      </article>
    </>
  )
}
