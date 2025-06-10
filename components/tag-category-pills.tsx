"use client"
import { motion } from "framer-motion"
import { Cpu, Lightbulb, Briefcase, MapPin, Users, Shield } from "lucide-react"
import { tagCategories } from "@/lib/tag-categories"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TagCategoryPillsProps {
  selectedCategory?: string
  onSelectCategory: (categoryId: string | null) => void
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

export function TagCategoryPills({ selectedCategory, onSelectCategory, className }: TagCategoryPillsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge
        variant={!selectedCategory ? "default" : "outline"}
        className="cursor-pointer transition-all hover:scale-105"
        onClick={() => onSelectCategory(null)}
      >
        All Topics
      </Badge>

      {tagCategories.map((category) => {
        const Icon = category.icon ? iconMap[category.icon as keyof typeof iconMap] : null
        const isSelected = selectedCategory === category.id

        return (
          <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Badge
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer transition-all flex items-center gap-1"
              onClick={() => onSelectCategory(isSelected ? null : category.id)}
            >
              {Icon && <Icon className="w-3 h-3" />}
              {category.name}
            </Badge>
          </motion.div>
        )
      })}
    </div>
  )
}
