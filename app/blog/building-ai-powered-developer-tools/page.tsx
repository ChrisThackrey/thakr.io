import type { Metadata } from "next"
import { blogPosts } from "@/lib/blog"
import AIDevToolsPostPageClient from "./AIDevToolsPostPageClient"

// Find the post data from our central blog data
const post = blogPosts.find((p) => p.slug === "building-ai-powered-developer-tools")

export const metadata: Metadata = {
  title: post?.title || "Building AI-Powered Developer Tools",
  description: post?.description || "How we built a version control system for reasoning with AI at its core.",
}

export default function AIDevToolsPostPage() {
  return <AIDevToolsPostPageClient />
}
