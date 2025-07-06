import type { Metadata } from "next"
import { AIVersionControlBlogContent } from "./AIVersionControlBlogContent"

export const metadata: Metadata = {
  title: "Building AI-Powered Developer Tools: A Version Control for Reasoning",
  description:
    "Discover how we built a revolutionary version control system that tracks not just code changes, but the reasoning behind them. Learn about AI-powered developer tools that preserve context and decision-making.",
}

export default function AIVersionControlPostPage() {
  return <AIVersionControlBlogContent />
}
