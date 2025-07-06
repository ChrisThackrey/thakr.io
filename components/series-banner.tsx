import Link from "next/link"
import { cn } from "@/lib/utils"
import type { BlogPost, Series } from "@/lib/blog"

interface Props {
  post: BlogPost
  series: Series | null
  className?: string
}

/**
 * Renders a banner that shows a post’s place inside a series.
 * Returns `null` if the series (or its posts array) is missing.
 */
export function SeriesBanner({ post, series, className }: Props) {
  if (!series?.posts?.length) return null

  const current = series.posts.findIndex((p) => p.slug === post.slug) + 1
  const total = series.posts.length

  return (
    <section
      className={cn(
        "rounded-md border bg-muted/50 p-4 mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div>
        <p className="text-sm uppercase tracking-wide text-muted-foreground mb-1">Series</p>
        <h2 className="text-lg font-semibold">{series.name}</h2>
        <p className="text-sm text-muted-foreground">
          Part {current} of {total}
        </p>
      </div>

      <ul className="flex flex-wrap gap-2 text-sm">
        {series.posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className={cn("rounded px-2 py-1 hover:underline", p.slug === post.slug && "font-medium underline")}
            >
              {p.series?.order}. {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
