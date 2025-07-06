/* -------------------------------------------------------------------------- */
/*                             BLOG DATA & HELPERS                            */
/* -------------------------------------------------------------------------- */

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author: string
  tags: string[]
  readingTime: number
  image?: string
  series?: { name: string; order: number }
  featured?: boolean
}

/* ------------------------------ In-memory data ----------------------------- */
export const blogPosts: BlogPost[] = [
  {
    slug: "ai-version-control-for-reasoning",
    title: "Building AI-Powered Developer Tools: A Version Control for Reasoning",
    date: "2025-07-05",
    excerpt:
      "Discover how we built a revolutionary version control system that tracks not just code changes, but the reasoning behind them. Learn about AI-powered developer tools that preserve context and decision-making.",
    content: "Full content of the blog post...",
    author: "Chris Thackrey",
    tags: ["AI", "Developer Tools", "Version Control", "Software Engineering", "Machine Learning"],
    readingTime: 9,
    image: "/images/ai-version-control-architecture.png",
    featured: true,
  },
  {
    /* --- renamed from “Deep Sea” → “DeepSeek” ----------------------------- */
    slug: "the-rise-of-deepseek-ai",
    title: "The Rise of DeepSeek AI: Geopolitics, Open Source Models, and the Future of AI Development",
    date: "2025-06-01",
    excerpt:
      "How DeepSeek AI, open-source models, and geopolitics are shaping the next chapter of artificial-intelligence research and deployment.",
    content: "Full content of the blog post…",
    author: "Chris Thackrey",
    tags: ["AI", "DeepSeek", "Geopolitics", "Open Source", "Machine Learning"],
    readingTime: 8,
    image: "/images/blog/deepseek-ai-model.png",
    series: { name: "AI Technologies Series", order: 1 },
    featured: true,
  },
  {
    slug: "retrieval-augmented-generation",
    title: "Retrieval-Augmented Generation: Enhancing LLMs with External Knowledge",
    date: "2025-05-15",
    excerpt: "How RAG systems improve accuracy and utility of large language models.",
    content: "Full content of the blog post…",
    author: "Chris Thackrey",
    tags: ["AI", "RAG", "LLMs", "Research"],
    readingTime: 12,
    image: "/images/rag-concept.png",
    series: { name: "AI Technologies Series", order: 2 },
  },
  {
    slug: "causal-ai-market-research",
    title: "Causal AI in Market Research: Beyond Correlation to Causation",
    date: "2025-04-20",
    excerpt: "How causal AI identifies true cause-and-effect relationships.",
    content: "Full content of the blog post…",
    author: "Chris Thackrey",
    tags: ["AI", "Research", "Machine Learning", "Business"],
    readingTime: 10,
    image: "/images/blog/causal-ai-hero.png",
  },
]

/* ----------------------- utility: newest-first copy ------------------------ */
function sortNewestFirst(posts: BlogPost[]) {
  return posts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/* -------------------------------------------------------------------------- */
/*                              PUBLIC HELPERS                                */
/* -------------------------------------------------------------------------- */

export async function getPosts(): Promise<BlogPost[]> {
  return sortNewestFirst(blogPosts)
}

export function getAllBlogPosts(): BlogPost[] {
  return sortNewestFirst(blogPosts)
}

/*  back-compat aliases  */
export const getAllPosts = getAllBlogPosts
export const getAllBlogposts = getAllBlogPosts

/* ------------------------- individual post helpers ------------------------ */
export async function getPost(slug: string): Promise<BlogPost | null> {
  return blogPosts.find((p) => p.slug === slug) ?? null
}

/* ------------------------------ tag helpers -------------------------------- */
export function getAllTags(): string[] {
  const set = new Set<string>()
  blogPosts.forEach((p) => p.tags.forEach((t) => set.add(t)))
  return Array.from(set).sort()
}
export async function getTags() {
  return getAllTags()
}
export function getTagCount(tag: string) {
  return blogPosts.filter((p) => p.tags.includes(tag)).length
}
export function getTagCounts() {
  const counts: Record<string, number> = {}
  blogPosts.forEach((p) =>
    p.tags.forEach((t) => {
      counts[t] = (counts[t] ?? 0) + 1
    }),
  )
  return counts
}
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((p) => p.tags.includes(tag))
}
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return getBlogPostsByTag(tag)
}

/* ----------------------------- featured posts ----------------------------- */
export async function getFeaturedPosts(limit?: number) {
  const featured = sortNewestFirst(blogPosts).filter((p) => p.featured)
  return typeof limit === "number" ? featured.slice(0, limit) : featured
}
export const getFeaturedBlogPosts = getFeaturedPosts

/* ------------------------------ series helpers ---------------------------- */
export interface Series {
  name: string
  slug: string
  posts: BlogPost[]
}
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
export function getAllSeries(): Series[] {
  const map = new Map<string, BlogPost[]>()
  blogPosts.forEach((p) => {
    if (!p.series) return
    const { name } = p.series
    if (!map.has(name)) map.set(name, [])
    map.get(name)!.push(p)
  })
  return Array.from(map.entries()).map(([name, posts]) => ({
    name,
    slug: slugify(name),
    posts: posts.sort((a, b) => a.series!.order - b.series!.order),
  }))
}
export async function getSeries(): Promise<Series[]> {
  return getAllSeries()
}
export function getSeriesBySlug(slug: string): Series | null {
  return getAllSeries().find((s) => s.slug === slug) ?? null
}

/* ---------------------------- related posts -------------------------------- */
export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post)
}
