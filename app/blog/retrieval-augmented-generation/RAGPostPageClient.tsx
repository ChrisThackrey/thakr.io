"use client"

import type React from "react"

import { BlogContentWrapper } from "@/components/blog-content-wrapper"
import Image from "next/image"

export default function RAGPostPageClient({ children }: { children: React.ReactNode }) {
  return (
    <BlogContentWrapper slug="retrieval-augmented-generation">
      <h1>Retrieval Augmented Generation: The Technology Transforming AI Applications</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
          AI
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
          Machine Learning
        </span>
        <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
          RAG
        </span>
        <span className="inline-flex items-center rounded-md bg-amber-50 dark:bg-amber-900/30 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
          Generative AI
        </span>
      </div>

      <p className="lead">
        In the rapidly evolving landscape of artificial intelligence, Retrieval Augmented Generation (RAG) has emerged
        as a game-changer for improving the capabilities of large language models. But what makes it necessary, and how
        can you implement it in your own AI applications? Drawing insights from recent research and practical
        implementations, this blog post explores the fundamentals of RAG and its transformative potential.
      </p>

      <div className="my-8">
        <Image
          src="/images/rag-concept.png"
          alt="Diagram showing RAG architecture with a document store, retriever, and language model"
          width={800}
          height={400}
          className="rounded-lg shadow-md mx-auto"
          priority
        />
      </div>

      <h2>What is Retrieval Augmented Generation?</h2>

      <p>
        At its core, RAG is a technique that enhances a language model's responses by incorporating information from
        external knowledge sources. As one podcast panelist eloquently described it:
      </p>

      <blockquote>
        "If you're just talking to a chat bot or basically an LM, you're really kind of just like talking to a person
        you met off the street... But imagine you're talking with that same person, but you're sitting at a library and
        there's a librarian behind the reference desk. When you ask that person a question now they can actually go and
        check."
      </blockquote>

      {children}
    </BlogContentWrapper>
  )
}
