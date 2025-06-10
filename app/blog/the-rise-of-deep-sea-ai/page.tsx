import type { Metadata } from "next"
import { BlogPostLayout } from "@/components/blog-post-layout"
import fs from "fs"
import path from "path"

export const metadata: Metadata = {
  title: "The Rise of Deep Sea AI: Geopolitics, Open Source Models, and the Future of AI Development",
  description:
    "Exploring the emergence of Deep Sea AI, its implications for the AI ecosystem, and what it means for developers and organizations.",
}

export default function DeepSeaAIPost() {
  // Read the markdown content from the file
  const markdownContent = fs.readFileSync(
    path.join(process.cwd(), "app/blog/the-rise-of-deep-sea-ai/content.md"),
    "utf8",
  )

  return (
    <BlogPostLayout
      content={markdownContent}
      title="The Rise of Deep Sea AI: Geopolitics, Open Source Models, and the Future of AI Development"
      date="May 9, 2025"
      author="Chris Thackrey"
      tags={["AI", "Deep Sea", "Geopolitics", "Open Source", "Model Agnostic"]}
      readingTime="12 mins read"
      slug="the-rise-of-deep-sea-ai"
    />
  )
}
