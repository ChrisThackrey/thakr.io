import { PageBackground } from "@/components/page-background"
import { BlogPostCard } from "@/components/blog-post-card"
import { getSeriesBySlug, getAllSeries } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Layers } from "lucide-react"
import { notFound } from "next/navigation"
import { SeriesProgress } from "@/components/series-progress"
import { SeriesToc } from "@/components/series-toc"

export function generateStaticParams() {
  const series = getAllSeries()
  return series.map((s) => ({ slug: s.slug }))
}

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const series = getSeriesBySlug(params.slug)

  if (!series) {
    notFound()
  }

  return (
    <>
      <PageBackground />
      <div className="container py-16 md:py-24">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/blog/series">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Series
            </Link>
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-6 w-6 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{series.name}</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            {series.description} This series contains {series.posts.length} posts.
          </p>

          {/* Overall series progress bar */}
          <div className="max-w-md">
            <SeriesProgress currentPart={series.posts.length} totalParts={series.posts.length} className="mb-8" />
          </div>

          {/* Series Table of Contents - expanded by default */}
          <div className="mb-12">
            <SeriesToc posts={series.posts} expanded={true} className="max-w-2xl mx-auto" />
          </div>
        </div>

        <div className="space-y-8 mt-8">
          {series.posts.map((post, index) => (
            <div key={post.slug} className="relative">
              {index > 0 && <div className="absolute left-4 -top-4 h-8 w-px bg-border" aria-hidden="true" />}
              <div className="relative">
                <div className="mb-4 ml-4">
                  <SeriesProgress currentPart={index + 1} totalParts={series.posts.length} className="max-w-md" />
                </div>
                <BlogPostCard post={post} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
