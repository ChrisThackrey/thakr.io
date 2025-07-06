"use client"

import { cn } from "@/lib/utils"

export type TagCategoryOverviewProps = {
  /** Record keyed by category name -> list of tags */
  categories: Record<string, string[]>
  className?: string
}

/**
 * Very small replacement component that shows categories with plain tags.
 * Linking & colouring were removed from the code-base.
 */
export function TagCategoryOverview({ categories, className }: TagCategoryOverviewProps) {
  const categoryEntries = Object.entries(categories)

  if (categoryEntries.length === 0) return null

  return (
    <section className={cn("space-y-6", className)}>
      {categoryEntries.map(([category, tags]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/80">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default TagCategoryOverview
