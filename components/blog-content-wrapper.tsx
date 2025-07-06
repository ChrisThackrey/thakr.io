import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import { getPost, getSeries, getRelatedPosts, type BlogPost, type Series } from "@/lib/blog"

/**
 * Wraps blog-post content with common header / series / related-posts UI.
 * Works entirely on the server so children can be Client or Server components.
 */
export default async function BlogContentWrapper({
  slug,
  children,
}: {
  slug: string
  children: ReactNode
}) {
  /* --------------------------- primary post data --------------------------- */
  const post = await getPost(slug)
  if (!post) notFound()

  /* ------------------------------ series data ------------------------------ */
  let series: Series | null = null
  if (post.series) {
    const allSeries = await getSeries()
    series = allSeries.find((s) => s.name === post.series!.name) ?? null
  }

  /* ----------------------------- related posts ---------------------------- */
  const related = await getRelatedPosts(post.slug, post.tags)

  /* ---------------------------------- UI ---------------------------------- */
  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto">
      {/* -------- hero / meta -------- */}
      <header>
        <h1>{post.title}</h1>
        <p className="text-sm text-muted-foreground">{post.date}</p>

        {post.image && (
          <div className="my-6">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg mx-auto"
              priority
            />
          </div>
        )}
      </header>

      {/* -------- main markdown/MDX content -------- */}
      {children}

      {/* -------- series nav -------- */}
      {series && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">{series.name}</h2>
          <ul>
            {series.posts.map((p: BlogPost) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className={p.slug === post.slug ? "font-bold" : ""}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* -------- related reading -------- */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Related reading</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
