import { blogPosts, getBlogPostsByTag } from "./blog"

// This function is for post pages. It finds tags related to the current post's tags.
export function getRelatedTags(currentTags: string[] | undefined, maxTags = 5): string[] {
  if (!currentTags || currentTags.length === 0) {
    return []
  }

  const tagScores: Record<string, number> = {}

  // Find all posts that share at least one tag with the current post
  const relatedPosts = blogPosts.filter((post) => post.tags?.some((tag) => currentTags.includes(tag)))

  // Score other tags from these related posts
  relatedPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (!currentTags.includes(tag)) {
        tagScores[tag] = (tagScores[tag] || 0) + 1
      }
    })
  })

  // Sort tags by score and return the top ones
  return Object.entries(tagScores)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag)
    .slice(0, maxTags)
}

// This function is for category pages. It finds other tags from posts within the current category.
export function getRelatedTagsForCategory(currentTag: string | undefined, maxTags = 5): string[] {
  if (!currentTag) {
    return []
  }
  const postsInCategory = getBlogPostsByTag(currentTag)
  const allTagsInCategory = new Set<string>()

  postsInCategory.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (tag !== currentTag) {
        allTagsInCategory.add(tag)
      }
    })
  })

  return Array.from(allTagsInCategory).slice(0, maxTags)
}
