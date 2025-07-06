export type BlogPost = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-rise-of-deep-sea-ai",
    title: "The Rise of Deep Sea AI: Geopolitics, Open Source Models, and the Future of AI Development",
    date: "2024-01-26",
    description: "A look at the geopolitical implications of Deep Sea AI and the open source movement.",
    tags: ["AI", "Geopolitics", "Open Source", "Deep Sea"],
    content: "This is a placeholder for the content of the blog post.",
  },
  {
    slug: "the-future-of-work",
    title: "The Future of Work: AI and Automation",
    date: "2024-02-15",
    description: "Exploring how AI and automation are changing the landscape of work.",
    tags: ["AI", "Automation", "Future of Work"],
    content: "This is a placeholder for the content of the blog post.",
  },
  {
    slug: "sustainable-living",
    title: "Sustainable Living: A Guide to Eco-Friendly Practices",
    date: "2024-03-01",
    description: "Practical tips and advice for adopting a more sustainable lifestyle.",
    tags: ["Sustainability", "Eco-Friendly", "Lifestyle"],
    content: "This is a placeholder for the content of the blog post.",
  },
]

const updatedBlogPosts = blogPosts.map((post) => {
  if (post.slug === "the-rise-of-deep-sea-ai") {
    return {
      ...post,
      slug: "the-rise-of-deepseek-ai",
      title: "The Rise of DeepSeek AI: Geopolitics, Open Source Models, and the Future of AI Development",
      tags: post.tags.map((tag) => (tag === "Deep Sea" ? "DeepSeek" : tag)),
    }
  }
  return post
})

export { updatedBlogPosts as blogPostsUpdated }
