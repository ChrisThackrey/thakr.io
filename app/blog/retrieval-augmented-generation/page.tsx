import type { Metadata } from "next"
import { RAGBlogContent } from "./RAGBlogContent"

export const metadata: Metadata = {
  title: "Retrieval Augmented Generation: The Technology Transforming AI Applications",
  description:
    "Explore how Retrieval Augmented Generation (RAG) enhances language models by incorporating external knowledge sources. Learn implementation strategies and best practices.",
}

export default function RAGPostPage() {
  return <RAGBlogContent />
}
