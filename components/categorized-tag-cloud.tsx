"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Cpu, Lightbulb, Briefcase, MapPin, Users, Shield } from "lucide-react"
import { ColoredTag } from "./colored-tag"
import { getAllTags, getTagCount } from "@/lib/blog"
import { tagCategories, getUncategorizedTags } from "@/lib/tag-categories"
import { cn } from "@/lib/utils"

interface CategorizedTagCloudProps {
  className?: string
}

const iconMap = {
  cpu: Cpu,
  lightbulb: Lightbulb,
  briefcase: Briefcase,
  "map-pin": MapPin,
  users: Users,
  shield: Shield,
}

export function CategorizedTagCloud({ className }: CategorizedTagCloudProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(tagCategories.map((c) => c.id)))

  const allTags = getAllTags()
  const tagCounts = getTagCount()
  const uncategorizedTags = getUncategorizedTags(allTags)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const renderCategory = (category: (typeof tagCategories)[0]) => {
    const Icon = category.icon ? iconMap[category.icon as keyof typeof iconMap] : null
    const isExpanded = expandedCategories.has(category.id)
    const categoryTags = category.tags.filter((tag) => allTags.includes(tag))

    if (categoryTags.length === 0) return null

    return (
      <div key={category.id} className="mb-4">
        <button
          onClick={() => toggleCategory(category.id)}
          className="flex items-center gap-2 w-full text-left mb-2 hover:bg-accent/50 rounded-md p-2 transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          <span className="font-medium text-sm">{category.name}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {categoryTags.length} tag{categoryTags.length !== 1 ? "s" : ""}
          </span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pl-8 grid grid-cols-2 gap-2 mb-2">
                {categoryTags
                  .sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))
                  .map((tag) => (
                    <div key={tag} className="text-left p-1 overflow-hidden">
                      <ColoredTag tag={tag} count={tagCounts[tag]} className="w-full max-w-full" />
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className={cn("p-4", className)}>
      <div className="space-y-2">
        {tagCategories.map(renderCategory)}

        {uncategorizedTags.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 p-2">
              <span className="font-medium text-sm text-muted-foreground">Other</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {uncategorizedTags.length} tag{uncategorizedTags.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="pl-8 grid grid-cols-2 gap-2">
              {uncategorizedTags
                .sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))
                .map((tag) => (
                  <div key={tag} className="text-left p-1 overflow-hidden">
                    <ColoredTag tag={tag} count={tagCounts[tag]} className="w-full max-w-full" />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
