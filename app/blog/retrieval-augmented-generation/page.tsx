import RAGPostPageClient from "./RAGPostPageClient"

export const metadata = {
  title: "Retrieval Augmented Generation: The Technology Transforming AI Applications",
  description:
    "Explore how Retrieval Augmented Generation (RAG) enhances language models by incorporating external knowledge sources. Learn implementation strategies and best practices.",
}

export default function RAGPostPage() {
  return (
    <RAGPostPageClient>
      <h2>How RAG Works</h2>

      <p>
        RAG operates through a multi-step process that combines the strengths of both retrieval-based and generative
        approaches:
      </p>

      <ol>
        <li>
          <strong>Document Indexing:</strong> Relevant documents are processed and indexed into a vector database, which
          stores semantic representations of the content.
        </li>
        <li>
          <strong>Query Processing:</strong> When a user asks a question, the system converts it into a query vector.
        </li>
        <li>
          <strong>Retrieval:</strong> The system compares the query vector against the document vectors to find the most
          relevant information.
        </li>
        <li>
          <strong>Context Integration:</strong> The retrieved information is provided as context to the language model.
        </li>
        <li>
          <strong>Response Generation:</strong> The language model generates a response based on both its pre-trained
          knowledge and the retrieved context.
        </li>
      </ol>

      <h2>Why RAG Matters</h2>

      <p>Traditional language models face several limitations that RAG helps address:</p>

      <ul>
        <li>
          <strong>Knowledge Cutoff:</strong> Language models only have knowledge up to their training cutoff date, while
          RAG can access up-to-date information.
        </li>
        <li>
          <strong>Hallucinations:</strong> Without grounding in factual information, models may generate plausible but
          incorrect responses. RAG reduces this risk by providing authoritative sources.
        </li>
        <li>
          <strong>Domain Specificity:</strong> RAG allows models to become experts in niche domains by connecting them
          to specialized knowledge bases.
        </li>
        <li>
          <strong>Transparency:</strong> Retrieved documents provide citation sources that users can verify, enhancing
          trust in the system.
        </li>
      </ul>
    </RAGPostPageClient>
  )
}
