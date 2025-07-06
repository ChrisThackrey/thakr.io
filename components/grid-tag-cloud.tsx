"use client"

import { getAllTags, getTagCounts } from "@/lib/blog"
import { ColoredTag } from "@/components/colored-tag"

interface GridTagCloudProps {
  onSelectTag?: (tag: string) => void
}

export function GridTagCloud({ onSelectTag }: GridTagCloudProps) {
  const tags = getAllTags()
  const tagCounts = getTagCounts()

  // Sort tags by count (most posts first)
  const sortedTags = [...tags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3">Popular Topics</h3>
      <div className="grid grid-cols-2 gap-2">
        {sortedTags.map((tag) => (
          <button
            key={tag}
            className="text-left hover:bg-accent rounded p-1 transition-colors overflow-hidden"
            onClick={() => onSelectTag?.(tag)}
          >
            <ColoredTag tag={tag} className="w-full max-w-full" />
          </button>
        ))}
      </div>
    </div>
  )
}
