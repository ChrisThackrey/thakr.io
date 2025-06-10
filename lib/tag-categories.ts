export type TagCategory = {
  id: string
  name: string
  description?: string
  icon?: string
  tags: string[]
}

export const tagCategories: TagCategory[] = [
  {
    id: "technologies",
    name: "Technologies",
    description: "AI models and tools",
    icon: "cpu",
    tags: ["AI", "LLM", "DeepSeek", "LM Studio", "Personal AI"],
  },
  {
    id: "concepts",
    name: "Concepts",
    description: "Key AI concepts and approaches",
    icon: "lightbulb",
    tags: ["artificial intelligence", "AI ethics", "model-agnostic", "causal modeling"],
  },
  {
    id: "applications",
    name: "Applications",
    description: "Real-world uses",
    icon: "briefcase",
    tags: ["market research", "synthetic data"],
  },
  {
    id: "locations",
    name: "Locations",
    description: "Geographic regions",
    icon: "map-pin",
    tags: ["Colorado", "China"],
  },
  {
    id: "organizations",
    name: "Organizations",
    description: "Groups and communities",
    icon: "users",
    tags: ["Rocky Mountain High Interest Group"],
  },
  {
    id: "policies",
    name: "Policies",
    description: "Regulations and controls",
    icon: "shield",
    tags: ["export controls"],
  },
]

// Helper functions
export function getCategoryForTag(tag: string): TagCategory | undefined {
  return tagCategories.find((category) => category.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

export function getTagsByCategory(categoryId: string): string[] {
  const category = tagCategories.find((c) => c.id === categoryId)
  return category?.tags || []
}

export function getUncategorizedTags(allTags: string[]): string[] {
  const categorizedTags = tagCategories.flatMap((c) => c.tags)
  return allTags.filter((tag) => !categorizedTags.some((ct) => ct.toLowerCase() === tag.toLowerCase()))
}
