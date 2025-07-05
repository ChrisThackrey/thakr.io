/*  BLOG DATA + HELPERS
  -------------------------------------------------------------
  All tag-handling now uses optional-chaining so a post without
  tags will no longer break builds or runtime pages.
*/

export type BlogPost = {
  id: string
  title: string
  slug: string
  date: string
  author: string
  /*  <-- made optional again  */
  tags?: string[]
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

/* ----------------------------------------------------------------
 DATA  (add / edit posts here)
------------------------------------------------------------------*/
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

/* ----------------------------------------------------------------
 SERIES INITIALISATION
------------------------------------------------------------------*/
export const seriesData: Series[] = [
  {
    name: "AI Technologies Series",
    slug: "ai-technologies",
    description: "A deep dive into emerging AI technologies and their applications across industries.",
    posts: [],
  },
]

seriesData.forEach((series) => {
  series.posts = blogPosts
    .filter((p) => p.series?.slug === series.slug)
    .sort((a, b) => (a.series!.part || 0) - (b.series!.part || 0))
})

/* ----------------------------------------------------------------
 READING-TIME HELPERS
------------------------------------------------------------------*/
export const calculateReadingTime = (text: string): number => {
  const WPM = 225
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / WPM))
}

export const formatReadingTime = (min: number) => `${min} min${min === 1 ? "" : "s"} read`

export const calculateReadingTimeFromElement = (el: HTMLElement | null): number =>
  calculateReadingTime(el?.textContent ?? "")

/* ----------------------------------------------------------------
 BLOG QUERY HELPERS  (all now null-safe)
------------------------------------------------------------------*/
export const getAllBlogPosts = (): BlogPost[] => blogPosts

export const getFeaturedBlogPosts = (): BlogPost[] => blogPosts.filter((p) => p.isFeatured)

export const getBlogPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug)

export const getBlogPostsByTag = (tag: string): BlogPost[] => blogPosts.filter((p) => p.tags?.includes(tag))

export const getPostsByTag = getBlogPostsByTag

export const getBlogPostsBySeries = (slug: string): BlogPost[] =>
  blogPosts.filter((p) => p.series?.slug === slug).sort((a, b) => (a.series!.part || 0) - (b.series!.part || 0))

export const getAllTags = (): string[] => {
  const set = new Set<string>()
  blogPosts.forEach((p) => p.tags?.forEach((t) => set.add(t)))
  return [...set].sort()
}

export const getTagCount = (): Record<string, number> => {
  const out: Record<string, number> = {}
  blogPosts.forEach((p) =>
    p.tags?.forEach((t) => {
      out[t] = (out[t] || 0) + 1
    }),
  )
  return out
}

export const getAllSeries = (): Series[] => {
  // ensure posts array always up-to-date
  seriesData.forEach((s) => {
    s.posts = getBlogPostsBySeries(s.slug)
  })
  return seriesData
}

export const getSeriesBySlug = (slug: string) => seriesData.find((s) => s.slug === slug)

/* ----------------------------------------------------------------
 RELATED / NAV HELPERS  (safe tags access)
------------------------------------------------------------------*/
export const getRelatedPosts = (currentSlug: string, max = 3): BlogPost[] => {
  const current = getBlogPostBySlug(currentSlug)
  if (!current) return []

  const similarity = new Map<string, number>()

  blogPosts
    .filter((p) => p.slug !== currentSlug)
    .forEach((p) => {
      let score = 0

      p.tags?.forEach((t) => {
        if (current.tags?.includes(t)) score += 1
      })

      if (current.series && p.series && current.series.slug === p.series.slug) {
        score += 2
      }
      similarity.set(p.slug, score)
    })

  return [...blogPosts]
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (similarity.get(b.slug) ?? 0) - (similarity.get(a.slug) ?? 0))
    .slice(0, max)
}

export const getNextPostInSeries = (slug: string) => {
  const current = getBlogPostBySlug(slug)
  if (!current?.series) return undefined

  const posts = getBlogPostsBySeries(current.series.slug)
  const idx = posts.findIndex((p) => p.slug === slug)
  return idx === -1 || idx === posts.length - 1 ? undefined : posts[idx + 1]
}

export const getPreviousPostInSeries = (slug: string) => {
  const current = getBlogPostBySlug(slug)
  if (!current?.series) return undefined

  const posts = getBlogPostsBySeries(current.series.slug)
  const idx = posts.findIndex((p) => p.slug === slug)
  return idx <= 0 ? undefined : posts[idx - 1]
}

/* ----------------------------------------------------------------
 LEGACY ALIASES
------------------------------------------------------------------*/
export const getPost = getBlogPostBySlug
export const getPosts = getAllBlogPosts
