import type { Metadata } from "next"
import { blogPosts } from "@/lib/blog"
import ClientWrapper from "./ClientWrapper"

// Find the post data from our central blog data
const post = blogPosts.find((p) => p.slug === "future-of-web-development-with-vercel")

export const metadata: Metadata = {
  title: post?.title || "The Future of Web Development with Vercel",
  description: post?.description || "Exploring the latest features and tools in the Vercel ecosystem.",
}

export default function VercelFuturePostPageWrapper() {
  return <ClientWrapper />
}
