"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ColoredTag } from "./colored-tag"
import { getAllTags, getTagCount } from "@/lib/blog"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface TagCloudProps {
  className?: string
  maxTags?: number
}

export function TagCloud({ className = "", maxTags = 9 }: TagCloudProps) {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Get tags data once when component mounts
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    // Get all tags and their counts
    const allTags = getAllTags()
    const tagCounts = getTagCount()

    // Sort tags by count (descending)
    const sortedTags = [...allTags].sort((a, b) => tagCounts[b] - tagCounts[a])

    // Limit to maxTags
    setTags(sortedTags.slice(0, maxTags))
    setMounted(true)
  }, [maxTags])

  if (!mounted) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading topics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {tags.map((tag, index) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="flex justify-center overflow-hidden"
          >
            <ColoredTag
              tag={tag}
              href={`/blog/categories/${encodeURIComponent(tag)}`}
              className="whitespace-nowrap text-sm max-w-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
