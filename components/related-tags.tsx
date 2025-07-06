import { getTagColors } from "../lib/tag-colors"

interface RelatedTagsProps {
  tags: string[]
}

export function RelatedTags({ tags }: RelatedTagsProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Related Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className={`inline-block rounded-full text-xs px-2 py-1 ${getTagColors(tag)}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
