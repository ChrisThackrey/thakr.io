export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  bullets?: string[]
  image?: string
  liveUrl?: string
  repoUrl?: string
  /** Project homepage, shown as a hyperlink badge after the description. */
  website?: { label: string; href: string }
  featured?: boolean
  content?: string
}
