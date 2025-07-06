import { getFeaturedPosts } from "@/lib/blog"
import { SectionTitle } from "@/components/section-title"
import { BlogPostCard } from "@/components/blog-post-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export async function BlogPreviewSection() {
  const featuredPosts = await getFeaturedPosts()

  if (!featuredPosts.length) {
    return null
  }

  return (
    <section className="py-20 md:py-28 bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-sm">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <SectionTitle>From the Blog</SectionTitle>
          <Button asChild variant="outline">
            <Link href="/blog" className="group">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
