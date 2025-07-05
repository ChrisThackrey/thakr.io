export type BlogPost = {
  id: string
  title: string
  slug: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  estimatedReadingTime: number
  coverImage: string
  isFeatured?: boolean
  series?: {
    name: string
    slug: string
    part: number
  }
}

export type Series = {
  name: string
  slug: string
  description: string
  posts: BlogPost[]
}

export const blogPosts: BlogPost[] = [
  {
    id: "colorado-ai",
    title: "From Mainframes to Microapplications: Colorado's AI Community Leads the Shift to Personal AI",
    slug: "colorado-ai-personal-computing",
    date: "2025-05-10",
    author: "Tech Insights Blog",
    tags: ["AI", "DeepSeek", "Colorado", "Rocky Mountain High Interest Group", "LM Studio", "Personal AI"],
    excerpt:
      "Colorado has quietly become a powerhouse of AI innovation, particularly in practical, accessible applications that are shifting AI from centralized cloud services to personal devices and custom microapplications.",
    estimatedReadingTime: 9,
    coverImage: "/images/blog/colorado-ai-community.png",
    isFeatured: true,
  },
  {
    id: "deepseek-ai",
    title: "DeepSeek AI: Innovation, Geopolitics, and the Future of Model-Agnostic Development",
    slug: "deepseek-ai-model-agnostic-development",
    date: "2025-05-10",
    author: "Tech Insider",
    tags: ["AI", "DeepSeek", "LLM", "China", "model-agnostic", "export controls"],
    excerpt:
      "The AI landscape is experiencing another seismic shift with the release of DeepSeek, a powerful Chinese-developed large language model that's generating buzz—and concern—throughout the tech world.",
    estimatedReadingTime: 10,
    coverImage: "/images/blog/deepseek-ai-model.png",
    isFeatured: true,
    series: {
      name: "AI Technologies Series",
      slug: "ai-technologies",
      part: 1,
    },
  },
  {
    id: "causal-ai",
    title: "The 'Why' Behind the Buy: How Causal AI is Revolutionizing Market Research",
    slug: "causal-ai-market-research",
    date: "2025-05-10",
    author: "Tech Insights Team",
    tags: ["artificial intelligence", "market research", "synthetic data", "causal modeling", "AI ethics"],
    excerpt:
      "Understanding why consumers make the decisions they do has been the holy grail of market research for decades. Enter synthetic data—AI-generated responses that simulate human behavior and decision-making.",
    estimatedReadingTime: 12,
    coverImage: "/images/blog/causal-ai-hero.png",
    isFeatured: true,
    series: {
      name: "AI Technologies Series",
      slug: "ai-technologies",
      part: 2,
    },
  },
  {
    id: "retrieval-augmented-generation",
    title: "From Hallucination to Precision: How Retrieval Augmented Generation (RAG) Enhances AI Applications",
    slug: "retrieval-augmented-generation",
    date: "2025-05-15",
    author: "Tech Insights Team",
    tags: ["AI", "RAG", "LLM", "vector databases", "embeddings"],
    excerpt:
      "An exploration of Retrieval Augmented Generation (RAG), the technique that enhances AI systems by grounding them in factual information, reducing hallucinations and improving accuracy for practical applications.",
    estimatedReadingTime: 14,
    coverImage: "/images/blog/rag-concept.png",
    series: {
      name: "AI Technologies Series",
      slug: "ai-technologies",
      part: 3,
    },
  },
]

// Sample series data
export const seriesData: Series[] = [
  {
    name: "AI Technologies Series",
    slug: "ai-technologies",
    description: "A deep dive into emerging AI technologies and their applications across industries.",
    posts: [],
  },
]

// Initialize series posts
seriesData.forEach((series) => {
  series.posts = blogPosts
    .filter((post) => post.series?.slug === series.slug)
    .sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0))
})

// Calculate reading time for text content
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225 // Average reading speed
  const wordCount = text.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime === 0 ? 1 : readingTime // Minimum 1 minute
}

// Format reading time with proper pluralization
export function formatReadingTime(minutes: number): string {
  return `${minutes} min${minutes === 1 ? "" : "s"} read`
}

// Add a new function to calculate reading time from HTML/JSX content
export function calculateReadingTimeFromElement(element: HTMLElement | null): number {
  if (!element) return 1

  // Get the text content of the element
  const text = element.textContent || ""

  // Calculate reading time
  return calculateReadingTime(text)
}

export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts
}

export const getFeaturedBlogPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.isFeatured)
}

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug)
}

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

// Add the missing export
export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

export const getBlogPostsBySeries = (series: string): BlogPost[] => {
  return blogPosts
    .filter((post) => post.series && post.series.slug === series)
    .sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0))
}

export const getAllTags = (): string[] => {
  const allTags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => allTags.add(tag))
  })
  return Array.from(allTags).sort()
}

export const getTagCount = (): Record<string, number> => {
  const tagCount: Record<string, number> = {}
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  return tagCount
}

// Make sure getAllSeries returns the correct data type
export const getAllSeries = (): Series[] => {
  // Ensure seriesData is properly initialized
  seriesData.forEach((series) => {
    series.posts = blogPosts
      .filter((post) => post.series?.slug === series.slug)
      .sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0))
  })

  // Return the array of series objects
  return seriesData
}

// Add the missing export
export const getSeriesBySlug = (slug: string): Series | undefined => {
  return seriesData.find((series) => series.slug === slug)
}

export const getRelatedPosts = (currentSlug: string, maxPosts = 3): BlogPost[] => {
  const currentPost = getBlogPostBySlug(currentSlug)
  if (!currentPost) return []

  const postSimilarityScore = new Map<string, number>()

  // Get all posts except the current one
  const otherPosts = blogPosts.filter((post) => post.slug !== currentSlug)

  // Calculate similarity scores based on tags
  otherPosts.forEach((post) => {
    let score = 0
    // Count matching tags
    post.tags.forEach((tag) => {
      if (currentPost.tags.includes(tag)) {
        score += 1
      }
    })
    // Give bonus if in the same series
    if (currentPost.series && post.series && currentPost.series.slug === post.series.slug) {
      score += 2
    }
    postSimilarityScore.set(post.slug, score)
  })

  // Sort by similarity score (descending)
  return otherPosts
    .sort((a, b) => {
      const scoreA = postSimilarityScore.get(a.slug) || 0
      const scoreB = postSimilarityScore.get(b.slug) || 0
      return scoreB - scoreA
    })
    .slice(0, maxPosts)
}

// Add the missing exports for series navigation
export const getNextPostInSeries = (currentSlug: string): BlogPost | undefined => {
  const currentPost = getBlogPostBySlug(currentSlug)
  if (!currentPost || !currentPost.series) return undefined

  const seriesPosts = getBlogPostsBySeries(currentPost.series.slug)
  const currentIndex = seriesPosts.findIndex((post) => post.slug === currentSlug)

  if (currentIndex === -1 || currentIndex === seriesPosts.length - 1) return undefined
  return seriesPosts[currentIndex + 1]
}

export const getPreviousPostInSeries = (currentSlug: string): BlogPost | undefined => {
  const currentPost = getBlogPostBySlug(currentSlug)
  if (!currentPost || !currentPost.series) return undefined

  const seriesPosts = getBlogPostsBySeries(currentPost.series.slug)
  const currentIndex = seriesPosts.findIndex((post) => post.slug === currentSlug)

  if (currentIndex <= 0) return undefined
  return seriesPosts[currentIndex - 1]
}

// --- helper aliases for legacy imports -------------------
export const getPost = getBlogPostBySlug
export const getPosts = getAllBlogPosts
