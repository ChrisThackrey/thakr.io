import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { getAllBlogPosts, getFeaturedPosts } from "@/lib/blog"
import { FeaturedPostsCarousel } from "@/components/featured-posts-carousel"
import { PageHeader } from "@/components/page-header"
import { AnimatedBlogSkeleton } from "@/components/skeletons/animated-blog-skeleton"
import { BlogErrorBoundary } from "@/components/blog-error-boundary"

// Dynamically import the client component for the main blog list
const BlogPageClient = dynamic(() => import("./BlogPageClient"), {
  ssr: true,
})

export const metadata: Metadata = {
  title: "Blog | Chris Thackrey",
  description: "Articles and thoughts on software development, AI, and design.",
}

export default async function BlogPage() {
  // Fetch all posts and featured posts
  const allPosts = getAllBlogPosts()
  const featuredPosts = await getFeaturedPosts()

  return (
    <BlogErrorBoundary postTitle="Blog">
      <div className="flex flex-col flex-grow">
        <div className="container mx-auto px-4 py-8">
          <PageHeader title="Blog" description="Articles and thoughts on software development, AI, and design." />

          {featuredPosts.length > 0 && (
            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Posts</h2>
              <Suspense fallback={<div className="w-full h-[450px] bg-muted rounded-xl animate-pulse" />}>
                <FeaturedPostsCarousel posts={featuredPosts} />
              </Suspense>
            </section>
          )}

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">All Posts</h2>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <AnimatedBlogSkeleton key={i} delay={i * 0.05} />
                  ))}
                </div>
              }
            >
              <BlogPageClient posts={allPosts} />
            </Suspense>
          </section>
        </div>
      </div>
    </BlogErrorBoundary>
  )
}
