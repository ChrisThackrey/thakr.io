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
  series?: {
    name: string
    order: number
  }
  featured?: boolean
}

export interface Series {
  name: string
  slug: string
  posts: BlogPost[]
}
