/* removed ColoredTag import – uses spans */

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"
import { getAllTags, getTagCounts } from "@/lib/blog"
import { tagCategories, getUncategorizedTags } from "@/lib/tag-categories"
import { getTagColors } from "@/lib/tag-colors"
import { cn } from "@/lib/utils"

interface CategorizedTagCloudProps {
  className?: string
  onSelectTag?: (tag: string) => void
}

export function CategorizedTagCloud({ className, onSelectTag }: CategorizedTagCloudProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(tagCategories.map((c) => c.id)))
  const allTags = getAllTags()
  const counts = getTagCounts()
  const uncategorized = getUncategorizedTags(allTags)

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className={cn("p-4", className)}>
      {tagCategories.map((cat) => {
        const tagsInCat = cat.tags.filter((t) => allTags.includes(t))
        if (!tagsInCat.length) return null
        const open = expanded.has(cat.id)

        return (
          <div key={cat.id} className="mb-4">
            <button
              onClick={() => toggle(cat.id)}
              className="mb-2 flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-accent/50 transition-colors"
            >
              {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="text-sm font-medium">{cat.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {tagsInCat.length} tag{tagsInCat.length !== 1 && "s"}
              </span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mb-2 grid grid-cols-2 gap-2 pl-8">
                    {tagsInCat
                      .sort((a, b) => (counts[b] || 0) - (counts[a] || 0))
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => onSelectTag?.(tag)}
                          className={`inline-block truncate rounded-full px-2 py-0.5 text-xs hover:opacity-80 transition-opacity ${getTagColors(tag)}`}
                        >
                          {tag} ({counts[tag] || 0})
                        </button>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      {/* uncategorized */}
      {uncategorized.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2 p-2">
            <span className="text-sm font-medium">Other</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {uncategorized.length} tag{uncategorized.length !== 1 && "s"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pl-8">
            {uncategorized
              .sort((a, b) => (counts[b] || 0) - (counts[a] || 0))
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSelectTag?.(tag)}
                  className={`inline-block truncate rounded-full px-2 py-0.5 text-xs hover:opacity-80 transition-opacity ${getTagColors(tag)}`}
                >
                  {tag} ({counts[tag] || 0})
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
