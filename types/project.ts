export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  bullets?: string[]
  image?: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
  content?: string
}
