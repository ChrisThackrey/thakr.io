import type { Metadata } from "next"
import { DeepSeaAIBlogContent } from "./DeepSeaAIBlogContent"

export const metadata: Metadata = {
  title: "The Rise of Deep Sea AI: Geopolitics, Open Source Models, and the Future of AI Development",
  description:
    "Exploring the emergence of Deep Sea AI, its implications for the AI ecosystem, and what it means for developers and organizations.",
}

export default function DeepSeaAIPostPage() {
  return <DeepSeaAIBlogContent />
}
