import { Suspense } from "react"
import { getPosts } from "@/lib/blog"
import { BlogPostCard } from "@/components/blog-post-card"

/**
 * A simple server component that renders the six most recent blog posts in a grid.
 * It works whether the data layer is file-based or static because it relies on `getPosts()`.
 */
export async function BlogPreviewSection() {
  const posts = await getPosts()
  const recent = posts.slice(0, 6)

  return (
    <section className="py-16">
      <div className="container space-y-8">
        <h2 className="text-3xl font-bold">Latest Articles</h2>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  )
}

/* Provide a default export so consumers can choose either style */
export default BlogPreviewSection
