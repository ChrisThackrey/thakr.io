import type { Metadata } from "next"
import { CausalAIBlogContent } from "./CausalAIBlogContent"

export const metadata: Metadata = {
  title: "The 'Why' Behind the Buy: How Causal AI is Revolutionizing Market Research",
  description:
    "Discover how causal AI and synthetic data are transforming market research by revealing the causal relationships behind consumer decisions.",
  // Additional metadata can be added here
}

export default function CausalAIMarketResearchPage() {
  return <CausalAIBlogContent />
}
