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
const blogPosts: BlogPost[] = [
  /* … your existing post objects … */
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
interface Series {
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
