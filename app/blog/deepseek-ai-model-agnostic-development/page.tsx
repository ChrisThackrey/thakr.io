import type { Metadata } from "next"
import DeepSeekAIBlogContent from "./DeepSeekAIBlogContent"

export const metadata: Metadata = {
  title: "DeepSeek AI: Innovation, Geopolitics, and the Future of Model-Agnostic Development",
  description:
    "An in-depth analysis of DeepSeek AI, its impact on the AI landscape, and the importance of model-agnostic development approaches.",
}

export default function DeepSeekAIPage() {
  return <DeepSeekAIBlogContent />
}
