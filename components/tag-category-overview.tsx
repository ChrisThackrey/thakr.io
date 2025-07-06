interface TagCategoryOverviewProps {
  /** Title for this group of tags (e.g. “Frontend”, “Databases”) */
  category: string
  /** List of plain tag strings to display */
  tags: string[]
}

/**
 * Simple read-only tag list grouped under a heading.
 * No links or color helpers are used.
 */
export function TagCategoryOverview({ category, tags }: TagCategoryOverviewProps) {
  if (!tags?.length) return null

  return (
    <section className="mb-8">
      <h3 className="mb-2 text-lg font-semibold">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
