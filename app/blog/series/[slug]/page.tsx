import { notFound } from "next/navigation"
import { getAllSeries, getSeriesBySlug } from "@/lib/blog"
import { BlogPostCard } from "@/components/blog-post-card"
import { PageBackground } from "@/components/page-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { BlogErrorBoundary } from "@/components/blog-error-boundary"

export function generateStaticParams() {
  const allSeries = getAllSeries()
  return allSeries.map((series) => ({
    slug: series.slug,
  }))
}

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const series = getSeriesBySlug(params.slug)

  if (!series) {
    notFound()
  }

  return (
    <BlogErrorBoundary>
      <PageBackground />
      <div className="container py-16 md:py-24">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/blog/series">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Series
            </Link>
          </Button>
          <PageHeader title={series.name} description={`A collection of ${series.posts.length} posts.`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {series.posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </BlogErrorBoundary>
  )
}
