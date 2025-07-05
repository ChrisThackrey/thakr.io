import { PageBackground } from "@/components/page-background"
import { BlogPostCard } from "@/components/blog-post-card"
import { getPostsByTag, getAllTags } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRightLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { RelatedTags } from "@/components/related-tags"

export function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({ tag }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <>
      <PageBackground />
      <div className="container py-16 md:py-24">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/blog/categories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </Button>
          <div className="mb-4">
            <Button variant="outline" asChild>
              <Link href={`/blog/compare?tag1=${encodeURIComponent(params.tag)}`}>
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Compare with another topic
              </Link>
            </Button>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 font-cal">Posts tagged with "{tag}"</h1>
          <p className="text-lg text-muted-foreground">
            Found {posts.length} {posts.length === 1 ? "post" : "posts"} with this tag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} highlightTag={tag} />
          ))}
        </div>

        {/* Add the RelatedTags component */}
        <RelatedTags currentTag={tag} />
      </div>
    </>
  )
}
