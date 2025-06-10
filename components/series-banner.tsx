import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Layers } from "lucide-react"
import { type BlogPost, getNextPostInSeries, getPreviousPostInSeries, getSeriesBySlug } from "@/lib/blog"
import { SeriesProgress } from "@/components/series-progress"
import { SeriesToc } from "@/components/series-toc"

interface SeriesBannerProps {
  post: BlogPost
}

export function SeriesBanner({ post }: SeriesBannerProps) {
  if (!post.series) return null

  const series = getSeriesBySlug(post.series.slug)
  if (!series) return null

  const previousPost = getPreviousPostInSeries(post)
  const nextPost = getNextPostInSeries(post)
  const totalParts = series.posts.length

  return (
    <Card className="mb-8 bg-muted/30 border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">
            <Link href={`/blog/series/${series.slug}`} className="text-primary hover:underline">
              {series.name}
            </Link>
          </CardTitle>
        </div>
        <CardDescription>{series.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SeriesProgress currentPart={post.series.part} totalParts={totalParts} />

        <SeriesToc posts={series.posts} currentPostSlug={post.slug} className="mt-4 border-primary/20" />

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
          {previousPost ? (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="flex items-center text-sm hover:text-primary transition-colors group"
            >
              <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-0.5" />
              <span className="line-clamp-1">Previous: {previousPost.title}</span>
            </Link>
          ) : (
            <div></div>
          )}

          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="flex items-center text-sm hover:text-primary transition-colors sm:text-right group"
            >
              <span className="line-clamp-1">Next: {nextPost.title}</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
