"use client"

import { useState, useEffect } from "react"
import { getAllTags, getTagCount } from "@/lib/blog"
import { SectionTitle } from "./section-title"
import { getTagColors } from "../lib/tag-colors"

interface TagCloudProps {
  limit?: number
  showCount?: boolean
  title?: string
  tags?: string[]
}

export function TagCloud({ limit, showCount = false, title = "Explore Tags", tags }: TagCloudProps) {
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true)
      try {
        const counts = getTagCount()
        setTagCounts(counts)
      } catch (error) {
        console.error("Error fetching tags:", error)
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

  const tagList = tags || getAllTags()
  if (!tagList || tagList.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-card-foreground">
        <SectionTitle as="h3" className="mb-4 text-xl">
          {title}
        </SectionTitle>
        <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
      </div>
    )
  }

  const sortedTags = [...new Set(tagList)].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))
  const limitedTags = limit ? sortedTags.slice(0, limit) : sortedTags

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground">
      <SectionTitle as="h3" className="mb-4 text-xl">
        {title}
      </SectionTitle>
      <div className="flex flex-wrap gap-2" aria-label="Post tags">
        {limitedTags.map((tag) => (
          <span key={tag} className={`inline-block rounded-full text-sm px-3 py-1 ${getTagColors(tag)}`}>
            {showCount ? `${tag} (${tagCounts[tag] || 0})` : tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TagCloud
