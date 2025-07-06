import type { BlogPost } from "@/lib/blog"
import { BlogPostCard } from "./blog-post-card"

interface BlogPreviewSectionProps {
  posts: BlogPost[]
  title?: string
}

export function BlogPreviewSection({ posts, title = "Latest Posts" }: BlogPreviewSectionProps) {
  if (!posts?.length) return null

  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
