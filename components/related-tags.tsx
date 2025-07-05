import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getRelatedTagsForCategory } from "@/lib/related-tags"

type RelatedTagsProps = {
  currentTag: string
  maxTags?: number
}

export function RelatedTags({ currentTag, maxTags = 5 }: RelatedTagsProps) {
  const relatedTags = getRelatedTagsForCategory(currentTag, maxTags)

  if (!relatedTags || relatedTags.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Related Topics</h3>
      <div className="flex flex-wrap gap-2">
        {relatedTags.map((tag) => (
          <Link href={`/blog/categories/${encodeURIComponent(tag)}`} key={tag}>
            <Badge variant="secondary">{tag}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
