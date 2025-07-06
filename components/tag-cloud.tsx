/* cleaned up leftover ColoredTag import earlier – make sure it’s not there */

"use client"

import { useEffect, useState } from "react"
import { getAllTags, getTagCount } from "@/lib/blog"
import { getTagColors } from "@/lib/tag-colors"
import { SectionTitle } from "./section-title"

interface TagCloudProps {
  limit?: number
  title?: string
}

export default function TagCloud({ limit, title = "Explore Tags" }: TagCloudProps) {
  const [tags, setTags] = useState<string[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    setTags(getAllTags())
    setCounts(getTagCount())
  }, [])

  const displayed = limit ? tags.slice(0, limit) : tags

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground">
      <SectionTitle as="h3" className="mb-4 text-xl">
        {title}
      </SectionTitle>

      <div className="flex flex-wrap gap-2">
        {displayed.map((tag) => (
          <span key={tag} className={`rounded-full px-3 py-1 text-sm ${getTagColors(tag)}`}>
            {tag} {counts[tag] ? `(${counts[tag]})` : ""}
          </span>
        ))}
      </div>
    </div>
  )
}
