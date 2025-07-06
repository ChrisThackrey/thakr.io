import { getTagColors } from "@/lib/tag-colors"

interface RelatedTagsProps {
  tags: string[]
}

export function RelatedTags({ tags }: RelatedTagsProps) {
  if (!tags?.length) return null

  return (
    <div className="mt-8">
      <h3 className="mb-2 text-lg font-semibold">Related Topics</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getTagColors(tag)}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
