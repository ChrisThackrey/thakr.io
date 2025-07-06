import Image from "next/image"
import Link from "next/link"
import { getTagColors } from "@/lib/tag-colors"
import type { BlogPost } from "@/lib/blog"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="rounded-xl border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent/40">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {post.cover && (
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={post.cover || "/placeholder.svg"}
              alt={post.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="rounded-t-xl object-cover"
            />
          </div>
        )}

        <div className="flex flex-col flex-grow p-5">
          <h3 className="mb-2 line-clamp-2 text-xl font-semibold leading-snug">{post.title}</h3>
          <p className="mb-4 flex-grow line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>

          {/* --- simple coloured tags (no links) --- */}
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getTagColors(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
