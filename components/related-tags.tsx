import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getRelatedTags } from "@/lib/related-tags"
import type { BlogPost } from "@/lib/blog"

type RelatedTagsProps = {
  post: BlogPost
  maxTags?: number
}

export function RelatedTags({ post, maxTags = 5 }: RelatedTagsProps) {
  if (!post.tags) {
    return null
  }
  const relatedTags = getRelatedTags(post.tags, maxTags)

  if (!relatedTags || relatedTags.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Related Topics</h3>
      <div className="flex flex-wrap gap-2">
        {relatedTags.map((tag) => (
          <Link href={`/blog/categories/${tag.toLowerCase()}`} key={tag}>
            <Badge variant="secondary">{tag}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
