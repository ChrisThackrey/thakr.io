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
    slug: "the-rise-of-deep-sea-ai",
    title: "The Rise of Deep Sea AI: Exploring Ocean Depths with Artificial Intelligence",
    date: "2025-06-01",
    excerpt: "How AI is revolutionizing deep-sea exploration and marine biology research.",
    content: "Full content of the blog post…",
    author: "Chris Thackrey",
    tags: ["AI", "Research", "Machine Learning"],
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
  {
    slug: "building-ai-powered-developer-tools",
    title: "Building AI-Powered Developer Tools: A Version Control for Reasoning",
    date: "2025-03-10",
    excerpt: "Our journey in creating a tool that tracks not just what changed, but why.",
    content: "Full content of the blog post...",
    author: "Chris Thackrey",
    tags: ["AI", "Development", "Vercel", "Next.js"],
    readingTime: 9,
    image: "/images/projects/rivendell.png",
    featured: true,
  },
  {
    slug: "future-of-web-development-with-vercel",
    title: "The Future of Web Development with Vercel in 2025",
    date: "2025-02-22",
    excerpt: "Exploring the latest features and tools in the Vercel ecosystem.",
    content: "Full content of the blog post...",
    author: "Chris Thackrey",
    tags: ["Vercel", "Next.js", "Web Development", "AI"],
    readingTime: 7,
    image: "/images/placeholder.svg?width=1200&height=630&query=Vercel+and+Next.js+logos",
  },
]

/* Utility: newest-first copy */
function sortNewestFirst(posts: BlogPost[]) {
  return posts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/* -------------------------------------------------------------------------- */
/*                              PUBLIC HELPERS                                */
/* -------------------------------------------------------------------------- */

/* 1.  Modern async helper (preferred in new server components) */
export async function getPosts(): Promise<BlogPost[]> {
  return sortNewestFirst(blogPosts)
}

/* 2.  **Synchronous** helper for legacy code that does NOT `await`           */
/*     (e.g. BlogPage, TagCloud, etc.).                                       */
export function getAllBlogPosts(): BlogPost[] {
  return sortNewestFirst(blogPosts)
}

/* 3.  Back-compat aliases so no old import breaks                            */
export const getAllPosts = getAllBlogPosts // sync
export const getAllBlogposts = getAllBlogPosts // common typo

/* ------------------------------ Other helpers ----------------------------- */

export async function getPost(slug: string): Promise<BlogPost | null> {
  return blogPosts.find((p) => p.slug === slug) ?? null
}

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

export async function getPostsByTag(tag: string) {
  return blogPosts.filter((p) => p.tags.includes(tag))
}

/* -- featured posts -------------------------------------------------------- */
export async function getFeaturedPosts(limit?: number) {
  const featured = sortNewestFirst(blogPosts).filter((p) => p.featured)
  return typeof limit === "number" ? featured.slice(0, limit) : featured
}
export const getFeaturedBlogPosts = getFeaturedPosts

/* ------------------------- series helpers (unchanged) --------------------- */
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

export async function getSeries(): Promise<Series[]> {
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

export async function getSeriesBySlug(slug: string) {
  const all = await getSeries()
  return all.find((s) => s.slug === slug) ?? null
}

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
