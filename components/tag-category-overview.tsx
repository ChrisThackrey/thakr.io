"use client"

import { motion } from "framer-motion"
import { Cpu, Lightbulb, Briefcase, MapPin, Users, Shield } from "lucide-react"
import { tagCategories } from "@/lib/tag-categories"
import { getAllTags, getTagCount } from "@/lib/blog"
import { cn } from "@/lib/utils"

interface TagCategoryOverviewProps {
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

export function TagCategoryOverview({ className }: TagCategoryOverviewProps) {
  const allTags = getAllTags()
  const tagCounts = getTagCount()

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {tagCategories.map((category, index) => {
        const Icon = category.icon ? iconMap[category.icon as keyof typeof iconMap] : null
        const categoryTags = category.tags.filter((tag) => allTags.includes(tag))
        const totalPosts = categoryTags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0)

        if (categoryTags.length === 0) return null

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="border rounded-lg p-4 h-full">
              <div className="flex items-start gap-3">
                {Icon && (
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1">{category.name}</h4>
                  {category.description && <p className="text-xs text-muted-foreground mb-2">{category.description}</p>}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{categoryTags.length} tags</span>
                    <span>•</span>
                    <span>{totalPosts} posts</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
