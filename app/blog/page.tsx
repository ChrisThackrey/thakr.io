import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { AnimatedBlogSkeleton } from "@/components/skeletons/animated-blog-skeleton"
import { getAllBlogPosts } from "@/lib/blog"

// Dynamically import the client component
const BlogPageClient = dynamic(() => import("./BlogPageClient"), {
  ssr: true,
})

export const metadata: Metadata = {
  title: "Blog | Chris Thackrey",
  description: "Articles and thoughts on software development, AI, and design.",
}

export default function BlogPage() {
  // Get blog posts from the blog library
  const posts = getAllBlogPosts()

  return (
    <Suspense
      fallback={
        <div className="container py-8 space-y-6">
          <h1 className="text-4xl font-bold">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <AnimatedBlogSkeleton key={i} delay={i * 0.05} />
            ))}
          </div>
        </div>
      }
    >
      <BlogPageClient posts={posts} />
    </Suspense>
  )
}
