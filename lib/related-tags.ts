import { blogPosts } from "./blog"

interface TagRelation {
  tag: string
  count: number
  score: number
}

/**
 * Calculates related tags for a given tag based on co-occurrence in blog posts
 * @param tag The tag to find related tags for
 * @param limit Maximum number of related tags to return
 * @param minScore Minimum relatedness score (0-1) to include a tag
 * @returns Array of related tags with their relatedness scores
 */
export function getRelatedTags(tag: string, limit = 5, minScore = 0.2): TagRelation[] {
  // Get all posts that have this tag
  const postsWithTag = blogPosts.filter((post) => post.tags.includes(tag))

  if (postsWithTag.length === 0) {
    return []
  }

  // Count co-occurrences of other tags
  const tagCounts: Record<string, number> = {}

  postsWithTag.forEach((post) => {
    post.tags.forEach((otherTag) => {
      if (otherTag !== tag) {
        tagCounts[otherTag] = (tagCounts[otherTag] || 0) + 1
      }
    })
  })

  // Calculate relatedness score (normalized co-occurrence)
  const tagRelations: TagRelation[] = Object.entries(tagCounts).map(([relatedTag, count]) => {
    // Score is the percentage of posts with the original tag that also have this related tag
    const score = count / postsWithTag.length

    return {
      tag: relatedTag,
      count,
      score,
    }
  })

  // Filter by minimum score and sort by score (descending)
  return tagRelations
    .filter((relation) => relation.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Gets a descriptive phrase for how related a tag is based on its score
 */
export function getRelationshipDescription(score: number): string {
  if (score >= 0.8) return "Strongly related"
  if (score >= 0.6) return "Closely related"
  if (score >= 0.4) return "Related"
  if (score >= 0.2) return "Somewhat related"
  return "Loosely related"
}
