import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ReadingTime } from "@/components/reading-time"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog"
import { ColoredTag } from "./colored-tag"
import Image from "next/image"

interface RelatedPostsProps {
  currentSlug: string
  tags: string[]
  maxPosts?: number
}

export function RelatedPosts({ currentSlug, tags, maxPosts = 3 }: RelatedPostsProps) {
  // Find posts that share tags with the current post, excluding the current post itself
  const relatedPosts = blogPosts
    .filter((post) => {
      // Skip the current post
      if (post.slug === currentSlug) return false

      // Check if this post shares any tags with the current post
      return post.tags.some((tag) => tags.includes(tag))
    })
    // Sort by the number of matching tags (most relevant first)
    .sort((a, b) => {
      const aMatchCount = a.tags.filter((tag) => tags.includes(tag)).length
      const bMatchCount = b.tags.filter((tag) => tags.includes(tag)).length
      return bMatchCount - aMatchCount
    })
    // Limit to the specified number of posts
    .slice(0, maxPosts)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card
            key={post.slug}
            className="flex flex-col h-full backdrop-blur-sm bg-background/80 dark:bg-background/80 border-border hover:shadow-md transition-all duration-200"
          >
            <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
              <Image
                src={post.coverImage || `/placeholder.svg?height=300&width=500&query=Blog post about ${post.title}`}
                alt={post.title}
                className="object-cover transition-transform duration-300 hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow pb-3">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <ColoredTag
                    key={tag}
                    tag={tag}
                    highlight={tags.includes(tag)}
                    href={`/blog/categories/${encodeURIComponent(tag)}`}
                  />
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-0">
              <div className="flex items-center">
                {post.estimatedReadingTime && <ReadingTime minutes={post.estimatedReadingTime} />}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium flex items-center hover:underline text-primary"
              >
                Read More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
