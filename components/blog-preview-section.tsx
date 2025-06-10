import { SectionTitle } from "@/components/section-title"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BlogPostCard } from "@/components/blog-post-card"
import { getAllBlogPosts } from "@/lib/blog"
import { ArrowRight } from "lucide-react"

export function BlogPreviewSection() {
  const allPosts = getAllBlogPosts()
  // Sort posts by date, most recent first, and take top 3
  const recentPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)

  if (recentPosts.length === 0) {
    return null // Don't render section if there are no posts
  }

  return (
    <section className="pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
          <SectionTitle as="h2" className="mb-0 text-center sm:text-left">
            Latest From The Blog
          </SectionTitle>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/blog" className="group">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
