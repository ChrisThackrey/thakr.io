import { TAG_CATEGORIES } from "@/lib/tag-categories"
import { getTagColors } from "@/lib/tag-colors"

interface TagCategoryOverviewProps {
  tagCounts: Record<string, number>
}

export function TagCategoryOverview({ tagCounts }: TagCategoryOverviewProps) {
  const categories = Object.keys(TAG_CATEGORIES)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {TAG_CATEGORIES[category].map((tag) =>
              tagCounts[tag] ? (
                <div key={tag} className="flex items-center">
                  <span className={`inline-block rounded-full text-xs px-2 py-1 ${getTagColors(tag)}`}>{tag}</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({tagCounts[tag]})</span>
                </div>
              ) : null,
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
