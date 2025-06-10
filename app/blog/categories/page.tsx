import { PageBackground } from "@/components/page-background"
import { getAllTags, getTagCount } from "@/lib/blog"
import Link from "next/link"
import { TagCloud } from "@/components/tag-cloud"
import { ColoredTag } from "@/components/colored-tag"
import { Button } from "@/components/ui/button"
import { ArrowRightLeft } from "lucide-react"
import { ConsistentHeightBadge } from "@/components/consistent-height-badge"

export const metadata = {
  title: "Blog Categories",
  description: "Browse blog posts by category",
}

export default function CategoriesPage() {
  const tags = getAllTags()
  const tagCount = getTagCount()

  return (
    <>
      <PageBackground />
      <div className="container py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Categories</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse blog posts by topic or explore the tag cloud to discover content.
          </p>
        </div>

        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/blog/compare">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Compare Topics
            </Link>
          </Button>
        </div>

        {/* Add the tag cloud */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Popular Topics</h2>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-4">
            <TagCloud />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">All Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/categories/${encodeURIComponent(tag)}`}
                className="group flex items-center justify-between p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <ColoredTag tag={tag} className="flex-shrink-0" />
                  <span className="font-medium truncate">{tag}</span>
                </div>
                <ConsistentHeightBadge variant="secondary" className="bg-background/80 ml-2 flex-shrink-0">
                  {tagCount[tag]} {tagCount[tag] === 1 ? "post" : "posts"}
                </ConsistentHeightBadge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
