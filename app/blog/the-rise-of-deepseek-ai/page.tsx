import type { Metadata } from "next"
import DeepSeekAIBlogContent from "./DeepSeekAIBlogContent"

/**
 * Blog-post metadata used by Next.js for SEO
 */
export const metadata: Metadata = {
  title: "The Rise of DeepSeek AI: Geopolitics, Open-Source Models, and the Future of AI Development",
  description:
    "An in-depth look at DeepSeek AI, its geopolitical context, open-source approach, and what it means for the future of model-agnostic development.",
}

export default function DeepSeekAIPostPage() {
  return <DeepSeekAIBlogContent />
}
