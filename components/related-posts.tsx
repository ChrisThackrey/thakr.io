import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/blog"

interface Props {
  posts?: BlogPost[]
  currentSlug?: string
  tags?: string[]
  maxPosts?: number
}

/**
 * Displays a simple grid of “Related Posts”.
 * Safely handles `undefined` or empty post lists.
 */
export function RelatedPosts({ posts = [], currentSlug, tags, maxPosts }: Props) {
  if (!posts.length) return null

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-semibold">Related reading</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Card key={p.slug} className="hover:ring-2 hover:ring-primary transition">
            <Link href={`/blog/${p.slug}`}>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}
