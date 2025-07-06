import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group relative flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {post.image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-col flex-grow p-5">
          <div className="mb-2 flex items-center gap-x-4 text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.series && (
              <Badge variant="outline" className="font-medium">
                {post.series.name}
              </Badge>
            )}
          </div>
          <h3 className="mb-2 line-clamp-2 text-xl font-semibold leading-snug text-foreground">{post.title}</h3>
          <p className="mb-4 flex-grow line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-end text-sm font-medium text-primary group-hover:underline">
            Read more &rarr;
          </div>
        </div>
      </Link>
    </article>
  )
}
