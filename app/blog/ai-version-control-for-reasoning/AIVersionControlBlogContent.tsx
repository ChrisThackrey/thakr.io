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

export function AIVersionControlBlogContent() {
  const wordCount = 1800
  const readingTimeMinutes = 9

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 relative">
      <FloatingTOC />

      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-50">
        Building AI-Powered Developer Tools: A Version Control for Reasoning
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
        src="/images/ai-version-control-architecture.png"
        alt="Architecture diagram showing the AI-powered version control system with reasoning chains"
        caption="Our version control system captures not just code changes, but the reasoning and context behind every decision."
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
                Traditional version control tracks what changed, but our AI-powered system captures why decisions were
                made.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                The system uses AI to automatically generate explanations and track reasoning chains across commits.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                IDE integration provides seamless access to reasoning annotations without disrupting developer workflow.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Decision trees and reasoning visualizations help teams understand codebase evolution.</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                This approach dramatically improves onboarding and reduces repeated mistakes in development teams.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-6 text-lg blog-content">
        <h2 id="introduction">Introduction</h2>
        <p>
          In the world of software development, the tools we use shape not only our productivity but also the way we
          think about code. Traditional version control systems like Git have revolutionized how we collaborate on code,
          but they&apos;re fundamentally built around tracking changes to text files. What if we could create a system that
          tracks the reasoning behind our code decisions?
        </p>
        <p>
          That&apos;s exactly what we set out to build: a &quot;version control for reasoning&quot; that leverages AI to capture not
          just what changed, but why it changed. This post details our journey in creating this tool and the technical
          challenges we faced along the way.
        </p>

        <h2 id="the-core-problem">The Core Problem</h2>
        <p>
          Software development is as much about making decisions as it is about writing code. Every line represents a
          choice: why this algorithm? Why this data structure? Why this design pattern? Traditional version control
          captures the what (the code changes) but rarely the why (the reasoning behind them).
        </p>
        <p>
          As codebases grow more complex and teams more distributed, this loss of context becomes increasingly
          problematic. New team members struggle to understand past decisions, leading to repeated mistakes, unnecessary
          refactoring, and slower onboarding.
        </p>

        <h2 id="our-solution">Our Solution</h2>
        <p>
          We built a system that uses AI to analyze code changes and automatically generate explanations of the
          reasoning behind them. But we didn&apos;t stop there. Our tool also:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Tracks reasoning chains across multiple commits and branches</li>
          <li>Provides AI-driven code suggestions based on past reasoning patterns</li>
          <li>Enables developers to explicitly document their reasoning with AI assistance</li>
          <li>Visualizes decision trees to help teams understand the evolution of a codebase</li>
        </ul>
        <p>
          The result is a tool that not only tracks what changes were made but preserves the contextual knowledge that
          typically lives only in developers&apos; heads.
        </p>

        <h2 id="technical-implementation">Technical Implementation</h2>
        <p>
          The full technical details of our implementation would require several more blog posts, but we&apos;ll be sharing
          those in the coming weeks. Stay tuned for deep dives into our architecture, AI integration, and deployment
          strategies.
        </p>

        <h3 id="architecture-overview">Architecture Overview</h3>
        <p>Our system uses a microservices architecture with several key components:</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>A Git integration layer that hooks into pre-commit and post-commit events</li>
          <li>An AI reasoning engine that generates and stores explanations</li>
          <li>A visualization layer for presenting reasoning chains</li>
          <li>A search and query interface for finding past decisions</li>
        </ul>

        <h3 id="ai-models-selection">AI Models Selection</h3>
        <p>We evaluated several LLMs before selecting our final approach. Our criteria included:</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Reasoning capabilities for code understanding</li>
          <li>Cost-effectiveness for continuous usage</li>
          <li>Ability to be fine-tuned on domain-specific data</li>
        </ul>

        <h3 id="data-storage-considerations">Data Storage Considerations</h3>
        <p>Storing reasoning chains efficiently presented several challenges:</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Managing the growth of reasoning data over time</li>
          <li>Creating efficient indexes for quick retrieval</li>
          <li>Maintaining linkage between code changes and explanations</li>
        </ul>

        <h3 id="user-experience-design">User Experience Design</h3>
        <p>We wanted to create a tool that developers would actually use, which meant making it:</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Seamlessly integrated with existing workflows</li>
          <li>Fast enough to not slow down the development process</li>
          <li>Transparent in how it generates explanations</li>
        </ul>

        <h3 id="ide-integration">IDE Integration</h3>
        <p>Our VS Code and JetBrains plugins allow developers to:</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>See reasoning annotations inline with code</li>
          <li>Generate explanations for their own changes</li>
          <li>Query past decisions without leaving their editor</li>
        </ul>

        <h2 id="future-work">Future Work</h2>
        <p>We&apos;re continuing to evolve the system with several exciting features on our roadmap:</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Integration with code review systems to provide reasoning context</li>
          <li>Team-level insights about decision patterns</li>
          <li>Proactive suggestions based on historical reasoning</li>
        </ul>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <RelatedPosts
            currentSlug="ai-version-control-for-reasoning"
            tags={["AI", "Developer Tools", "Version Control", "Software Engineering", "Machine Learning"]}
            maxPosts={3}
          />
        </div>
      </div>
    </div>
  )
}
