import { getTagColors } from "../lib/tag-colors"
import { TAG_CATEGORIES } from "../lib/tag-categories"

interface CategorizedTagCloudProps {
  tags: string[]
  currentTag?: string
}

export function CategorizedTagCloud({ tags, currentTag }: CategorizedTagCloudProps) {
  const groupedTags: Record<string, string[]> = {}

  // Initialize groups
  Object.keys(TAG_CATEGORIES).forEach((category) => {
    groupedTags[category] = []
  })
  groupedTags["Other"] = []

  // Group tags into categories
  tags.forEach((tag) => {
    let found = false
    for (const category in TAG_CATEGORIES) {
      if (TAG_CATEGORIES[category].includes(tag)) {
        groupedTags[category].push(tag)
        found = true
        break
      }
    }
    if (!found) {
      groupedTags["Other"].push(tag)
    }
  })

  return (
    <div className="space-y-6">
      {Object.entries(groupedTags)
        .filter(([, tags]) => tags.length > 0)
        .map(([category, tagsInCategory]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {tagsInCategory.map((tag) => (
                <span
                  key={tag}
                  className={`inline-block rounded-full text-xs px-2 py-0.5 ${getTagColors(
                    tag,
                  )} ${currentTag === tag ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400" : ""}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
