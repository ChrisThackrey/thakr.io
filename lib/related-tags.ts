import { getPostsByTag } from "./blog"

export function getRelatedTagsForCategory(currentTag: string, maxTags = 5): string[] {
  const posts = getPostsByTag(currentTag)
  const tagFrequency: Record<string, number> = {}

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (tag !== currentTag) {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1
      }
    })
  })

  return Object.entries(tagFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxTags)
    .map(([tag]) => tag)
}
