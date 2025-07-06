import { getSeriesBySlug, getAllSeries } from "@/lib/blog"
import { notFound } from "next/navigation"
import { BlogPostCard } from "@/components/blog-post-card"
import { PageHeader } from "@/components/page-header"
import { slugify } from "@/lib/utils"

export async function generateStaticParams() {
  const series = getAllSeries()
  return series.map((seriesName) => ({
    slug: slugify(seriesName),
  }))
}

export default async function SeriesPage({ params }: { params: { slug: string } }) {
  const series = getSeriesBySlug(params.slug)

  if (!series) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title={series.name} description={`A series of ${series.posts.length} posts.`} />
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {series.posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
