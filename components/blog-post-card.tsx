"use client"

import Link from "next/link"
import Image from "next/image"
import { CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types/blog"

interface BlogPostCardProps {
  post: BlogPost
  /** Optional tag we want to visually highlight on the card (e.g. the current category) */
  highlightTag?: string
}

/**
 * A compact preview card shown in blog overviews and tag pages.
 * – Displays cover image, title, date, short excerpt and tags
 * – Self-contained: **does not import anything from `/app/layout`**
 */
export function BlogPostCard({ post, highlightTag }: BlogPostCardProps) {
  const { title, slug, excerpt, coverImage, date, tags = [] } = post

  return (
    <Card className="group transition hover:shadow-lg">
      <Link href={`/blog/${slug}`} className="block">
        {coverImage && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-md">
            <Image
              src={coverImage || "/placeholder.svg"}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="space-y-3 p-4">
          <h3 className="text-xl font-semibold leading-snug">{title}</h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">{excerpt}</p>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-2 p-4 pt-0">
          <div className="inline-flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1 h-3 w-3" />
            <time dateTime={date}>
              {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(date))}
            </time>
          </div>

          {/* tags */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className={cn(
                  "rounded-sm px-1.5 py-0.5 text-[10px] font-medium",
                  highlightTag === tag && "border-foreground",
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
