"use client"

import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ReadingTime } from "@/components/reading-time"
import type { BlogPost } from "@/lib/blog"
import { cn } from "@/lib/utils"
import { ColoredTag } from "@/components/colored-tag"
import { EnhancedCard } from "@/components/micro-interactions/enhanced-card"
import { EnhancedLink } from "@/components/micro-interactions/enhanced-link"
import { EnhancedIcon } from "@/components/micro-interactions/enhanced-icon"
import Image from "next/image"
import { Icons } from "./icons"

interface BlogPostCardProps {
  post: BlogPost
  highlightTag?: string
}

export function BlogPostCard({ post, highlightTag }: BlogPostCardProps) {
  // Ensure we have a valid cover image or use a placeholder
  const coverImage = post.coverImage || `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(post.title)}`

  return (
    <EnhancedCard className="flex flex-col h-full backdrop-blur-sm bg-background/80 dark:bg-background/80 border-border overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
      </div>
      <CardHeader className="pb-2">
        {post.series && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <EnhancedIcon pulse>
                <Icons.layers className="h-4 w-4 text-primary" />
              </EnhancedIcon>
              <EnhancedLink
                href={`/blog/series/${post.series.slug}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {post.series.name} (Part {post.series.part})
              </EnhancedLink>
            </div>

            {/* Mini progress indicator */}
            <div className="flex h-0.5 gap-0.5 w-24">
              {Array.from({ length: 5 }).map((_, i) => {
                // If we don't know the total parts, show 5 segments with the current one highlighted
                const isActive = i < (post.series.part || 0)
                return (
                  <div
                    key={i}
                    className={cn("h-full flex-1 rounded-full", isActive ? "bg-primary" : "bg-muted")}
                    aria-hidden="true"
                  />
                )
              })}
            </div>
          </div>
        )}
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags &&
            post.tags
              .slice(0, 3)
              .map((tag) => (
                <ColoredTag
                  key={tag}
                  tag={tag}
                  href={`/blog/categories/${encodeURIComponent(tag)}`}
                  highlightTag={tag === highlightTag}
                />
              ))}
          {post.tags && post.tags.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-1">+{post.tags.length - 3} more</span>
          )}
        </div>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {post.excerpt || "Read this article to learn more about " + post.title}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.calendar className="h-3 w-3 mr-1" />
            <span>{post.date}</span>
          </div>
          {post.estimatedReadingTime && <ReadingTime minutes={post.estimatedReadingTime} showSpeedIndicator={false} />}
        </div>
        <EnhancedLink href="/blog" className="text-sm font-medium flex items-center group">
          Read More
          <EnhancedIcon className="ml-1 inline-block">
            <Icons.arrowRight className="h-4 w-4" />
          </EnhancedIcon>
        </EnhancedLink>
      </CardFooter>
    </EnhancedCard>
  )
}
