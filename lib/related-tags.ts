import { blogPosts } from "./blog"

export function getRelatedTags(currentTags: string[], maxTags = 5): string[] {
  if (!currentTags || currentTags.length === 0) {
    return []
  }

  // Build the tag graph on the fly to avoid module-level state issues
  const allTags = new Set<string>()
  blogPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => allTags.add(tag))
    }
  })

  const tagGraph: Record<string, Record<string, number>> = {}
  allTags.forEach((tag) => {
    tagGraph[tag] = {}
  })

  blogPosts.forEach((post) => {
    if (post.tags) {
      for (let i = 0; i < post.tags.length; i++) {
        for (let j = i + 1; j < post.tags.length; j++) {
          const tag1 = post.tags[i]
          const tag2 = post.tags[j]
          if (tagGraph[tag1] && tagGraph[tag2]) {
            tagGraph[tag1][tag2] = (tagGraph[tag1][tag2] || 0) + 1
            tagGraph[tag2][tag1] = (tagGraph[tag2][tag1] || 0) + 1
          }
        }
      }
    }
  })

  const scores: Record<string, number> = {}
  currentTags.forEach((currentTag) => {
    if (tagGraph[currentTag]) {
      Object.entries(tagGraph[currentTag]).forEach(([relatedTag, weight]) => {
        if (!currentTags.includes(relatedTag)) {
          scores[relatedTag] = (scores[relatedTag] || 0) + weight
        }
      })
    }
  })

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])
    .slice(0, maxTags)
}
