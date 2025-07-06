"use client"

import { useState, useEffect } from "react"
import { ColoredTag } from "./colored-tag"
import { getAllTags, getTagCount } from "@/lib/blog"
import { SectionTitle } from "./section-title"

interface TagCloudProps {
  limit?: number
  showCount?: boolean
  title?: string
}

export function TagCloud({ limit, showCount = false, title = "Explore Tags" }: TagCloudProps) {
  const [tags, setTags] = useState<string[]>([])
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true)
      try {
        const allTags = getAllTags()
        const counts = getTagCount()

        const sortedTags = [...new Set(allTags)].sort((a, b) => (counts[b] || 0) - (counts[a] || 0))
        const limitedTags = limit ? sortedTags.slice(0, limit) : sortedTags

        setTags(limitedTags)
        setTagCounts(counts)
      } catch (error) {
        console.error("Error fetching tags:", error)
        setTags([])
        setTagCounts({})
      } finally {
        setIsLoading(false)
      }
    }

    fetchTags()
  }, [limit])

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-6 text-card-foreground">
        <SectionTitle as="h3" className="mb-4 text-xl">
          {title}
        </SectionTitle>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    )
  }

  if (tags.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-card-foreground">
        <SectionTitle as="h3" className="mb-4 text-xl">
          {title}
        </SectionTitle>
        <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground">
      <SectionTitle as="h3" className="mb-4 text-xl">
        {title}
      </SectionTitle>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag}>
            <ColoredTag tag={showCount ? `${tag} (${tagCounts[tag] || 0})` : tag} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagCloud
