import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getRelatedTags, getRelatedTagsForCategory } from "@/lib/related-tags"
import type { BlogPost } from "@/lib/blog"

type RelatedTagsProps = {
  post?: BlogPost
  currentTag?: string
  maxTags?: number
}

export function RelatedTags({ post, currentTag, maxTags = 5 }: RelatedTagsProps) {
  let relatedTags: string[] = []

  if (post) {
    // Use case for blog post pages
    relatedTags = getRelatedTags(post.tags, maxTags)
  } else if (currentTag) {
    // Use case for category pages
    relatedTags = getRelatedTagsForCategory(currentTag, maxTags)
  }

  if (relatedTags.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Related Topics</h3>
      <div className="flex flex-wrap gap-2">
        {relatedTags.map((tag) => (
          <Link href={`/blog/categories/${encodeURIComponent(tag.toLowerCase())}`} key={tag}>
            <Badge variant="secondary">{tag}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
