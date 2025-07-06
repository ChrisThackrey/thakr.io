import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import type { BlogPost, Series } from "@/types/blog"

interface SeriesBannerProps {
  post: BlogPost
  series: Series
}

export function SeriesBanner({ post, series }: SeriesBannerProps) {
  const currentIndex = series.posts.findIndex((p) => p.slug === post.slug)
  const totalPosts = series.posts.length

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-sm text-blue-800 dark:text-blue-200">
      <div className="flex items-start">
        <Info className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold">
            This post is part {currentIndex + 1} of {totalPosts} in the "{series.name}" series.
          </p>
          <Button variant="link" asChild className="px-0 h-auto mt-1">
            <Link href={`/blog/series/${series.slug}`}>View all posts in this series</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
