"use client"

import BlogImage from "@/components/blog-image"
import { RelatedPosts } from "@/components/related-posts"
import { ReadingTime } from "@/components/reading-time"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, List } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type TOCEntry = {
  id: string
  text: string
  level: number
  element?: HTMLElement | null
}

function FloatingTOC() {
  const [activeId, setActiveId] = useState<string>("")
  const [toc, setToc] = useState<TOCEntry[]>([])
  const observer = useRef<IntersectionObserver | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const article = document.querySelector(".blog-content")
    if (!article) return

    const headings = article.querySelectorAll("h2, h3")
    const tocEntries: TOCEntry[] = []

    headings.forEach((heading) => {
      const id =
        heading.textContent
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || ""
      if (!heading.id) {
        heading.id = id
      }
      tocEntries.push({
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
        element: heading as HTMLElement,
      })
    })
    setToc(tocEntries)
  }, [])

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -80% 0px",
      threshold: 0.1,
    })
    toc.forEach((entry) => {
      if (entry.element) {
        observer.current?.observe(entry.element)
      }
    })
    return () => {
      observer.current?.disconnect()
    }
  }, [toc])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  if (toc.length === 0) return null

  return (
    <div className="fixed right-4 top-1/4 z-20 hidden xl:block">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 max-w-[240px] border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <List className="h-4 w-4 mr-1" />
            Contents
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 text-xs"
          >
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>
        {isOpen && (
          <nav className="toc-nav">
            <ul className="space-y-1 text-sm">
              {toc.map((entry) => (
                <li
                  key={entry.id}
                  className={cn(
                    "transition-colors duration-200",
                    entry.level === 3 ? "ml-3" : "",
                    activeId === entry.id
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
                  )}
                >
                  <button onClick={() => scrollToSection(entry.id)} className="block py-1 text-left w-full truncate">
                    {entry.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}

export function RAGBlogContent() {
  const wordCount = 950
  const readingTimeMinutes = Math.ceil(wordCount / 200)

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 relative">
      <FloatingTOC />

      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-50">
        Retrieval Augmented Generation: The Technology Transforming AI Applications
      </h1>

      <div className="flex items-center mb-6">
        <ReadingTime
          minutes={readingTimeMinutes}
          wordCount={wordCount}
          showWordCount={true}
          className="text-gray-600 dark:text-gray-400"
        />
      </div>

      <BlogImage
        src="/images/rag-concept.png"
        alt="Diagram showing RAG architecture with a document store, retriever, and language model"
        caption="RAG enhances language models by grounding them in external, verifiable knowledge."
        className="my-8 rounded-xl shadow-lg"
        width={1200}
        height={630}
      />

      <Card className="my-8 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-400">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                RAG enhances LLMs by grounding them in external, up-to-date knowledge sources, reducing hallucinations
                and improving accuracy.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                The process involves indexing documents, retrieving relevant context for a query, and generating a
                response based on that context.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                RAG overcomes key LLM limitations like knowledge cutoffs and lack of domain-specific expertise.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>It provides transparency by allowing for source citation, which builds user trust.</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Implementing RAG is crucial for building reliable, factual, and trustworthy AI applications.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-6 text-lg blog-content">
        <p className="lead">
          In the rapidly evolving landscape of artificial intelligence, Retrieval Augmented Generation (RAG) has emerged
          as a game-changer for improving the capabilities of large language models. But what makes it necessary, and
          how can you implement it in your own AI applications? Drawing insights from recent research and practical
          implementations, this blog post explores the fundamentals of RAG and its transformative potential.
        </p>

        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            {
              "If you're just talking to a chat bot or basically an LM, you're really kind of just like talking to a person you met off the street... But imagine you're talking with that same person, but you're sitting at a library and there's a librarian behind the reference desk. When you ask that person a question now they can actually go and check."
            }
          </p>
        </blockquote>

        <h2 id="how-rag-works">How RAG Works</h2>
        <p>
          RAG operates through a multi-step process that combines the strengths of both retrieval-based and generative
          approaches:
        </p>
        <ol className="list-decimal pl-6 my-4 space-y-2">
          <li>
            <strong>Document Indexing:</strong> Relevant documents are processed and indexed into a vector database,
            which stores semantic representations of the content.
          </li>
          <li>
            <strong>Query Processing:</strong> When a user asks a question, the system converts it into a query vector.
          </li>
          <li>
            <strong>Retrieval:</strong> The system compares the query vector against the document vectors to find the
            most relevant information.
          </li>
          <li>
            <strong>Context Integration:</strong> The retrieved information is provided as context to the language
            model.
          </li>
          <li>
            <strong>Response Generation:</strong> The language model generates a response based on both its pre-trained
            knowledge and the retrieved context.
          </li>
        </ol>

        <h2 id="why-rag-matters">Why RAG Matters</h2>
        <p>Traditional language models face several limitations that RAG helps address:</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>
            <strong>Knowledge Cutoff:</strong> Language models only have knowledge up to their training cutoff date,
            while RAG can access up-to-date information.
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

        <h2 id="conclusion">Conclusion: Building Trustworthy AI</h2>
        <p>
          Retrieval Augmented Generation is more than just a technical enhancement; it's a foundational shift toward
          creating more reliable, accurate, and transparent AI systems. By grounding generative models in factual,
          retrievable data, RAG addresses some of the most significant challenges facing AI today. For any developer or
          organization looking to build applications that users can trust, understanding and implementing RAG is no
          longer optional—it's essential.
        </p>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <RelatedPosts
            currentSlug="retrieval-augmented-generation"
            tags={["AI", "Machine Learning", "RAG", "Generative AI"]}
            maxPosts={3}
          />
        </div>
      </div>
    </div>
  )
}
