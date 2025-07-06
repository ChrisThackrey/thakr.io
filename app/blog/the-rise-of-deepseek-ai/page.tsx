import type { Metadata } from "next"
import { DeepSeekAIBlogContent } from "./DeepSeekAIBlogContent"

export const metadata: Metadata = {
  title: "The Rise of DeepSeek AI: Geopolitics, Open Source Models, and the Future of AI Development",
  description:
    "Exploring the emergence of DeepSeek AI, its implications for the AI ecosystem, and what it means for developers and organizations.",
}

export default function DeepSeekAIPostPage() {
  return <DeepSeekAIBlogContent />
}
