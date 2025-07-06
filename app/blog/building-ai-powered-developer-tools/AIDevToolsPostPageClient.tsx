"use client"
import { blogPosts } from "@/lib/blog"
import { ReadingTime } from "@/components/reading-time"
// Add the import for our new component
import { BlogPostTracker } from "@/components/blog-post-tracker"
import { useReadingTimeCalculator } from "@/hooks/use-reading-time-calculator"
import { useState, useEffect } from "react"

// Find the post data from our central blog data
const post = blogPosts.find((p) => p.slug === "building-ai-powered-developer-tools")

function DynamicReadingTime({
  slug,
  fallbackTime,
  className,
}: { slug: string; fallbackTime?: number; className?: string }) {
  const { readingTime } = useReadingTimeCalculator()
  const [isClient, setIsClient] = useState(false)

  // Add useEffect to set isClient to true after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use the calculated time if available and we're client-side, otherwise fall back to the static time
  const displayTime = isClient && readingTime > 0 ? readingTime : fallbackTime || 1

  return <ReadingTime minutes={displayTime} className={className} />
}

// Update the AIDevToolsPostPage component to include the tracker
export default function AIDevToolsPostPageClient() {
  if (!post) {
    return null
  }

  return (
    <BlogPostTracker slug="building-ai-powered-developer-tools" title={post.title}>
      <div>
        <div className="mb-8 mt-8">
          <h1 className="text-4xl font-bold tracking-tight mb-6">{post.title}</h1>
          <div className="flex items-center justify-between mb-3">
            <time className="text-foreground/80 font-medium text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {post.date}
            </time>
          </div>
          <DynamicReadingTime slug={post.slug} fallbackTime={post.readingTime} className="mb-8" />
        </div>

        <div className="h-px bg-border/60 w-full my-8" aria-hidden="true" />

        {/* Rest of the content remains the same */}
        <div className="blog-content with-drop-cap">
          <h2 id="introduction">Introduction</h2>
          <p>
            In the world of software development, the tools we use shape not only our productivity but also the way we
            think about code. Traditional version control systems like Git have revolutionized how we collaborate on
            code, but they're fundamentally built around tracking changes to text files. What if we could create a
            system that tracks the reasoning behind our code decisions?
          </p>

          <p>
            That's exactly what we set out to build: a "version control for reasoning" that leverages AI to capture not
            just what changed, but why it changed. This post details our journey in creating this tool and the technical
            challenges we faced along the way.
          </p>

          <h2 id="core-problem">The Core Problem</h2>
          <p>
            Software development is as much about making decisions as it is about writing code. Every line represents a
            choice: why this algorithm? Why this data structure? Why this design pattern? Traditional version control
            captures the what (the code changes) but rarely the why (the reasoning behind them).
          </p>

          <p>
            As codebases grow more complex and teams more distributed, this loss of context becomes increasingly
            problematic. New team members struggle to understand past decisions, leading to repeated mistakes,
            unnecessary refactoring, and slower onboarding.
          </p>

          <h2 id="our-solution">Our Solution</h2>
          <p>
            We built a system that uses AI to analyze code changes and automatically generate explanations of the
            reasoning behind them. But we didn't stop there. Our tool also:
          </p>

          <ul>
            <li>Tracks reasoning chains across multiple commits and branches</li>
            <li>Provides AI-driven code suggestions based on past reasoning patterns</li>
            <li>Enables developers to explicitly document their reasoning with AI assistance</li>
            <li>Visualizes decision trees to help teams understand the evolution of a codebase</li>
          </ul>

          <p>
            The result is a tool that not only tracks what changes were made but preserves the contextual knowledge that
            typically lives only in developers' heads.
          </p>

          <h2 id="technical-implementation">Technical Implementation</h2>
          <p>
            The full technical details of our implementation would require several more blog posts, but we'll be sharing
            those in the coming weeks. Stay tuned for deep dives into our architecture, AI integration, and deployment
            strategies.
          </p>

          <h3 id="architecture">Architecture Overview</h3>
          <p>Our system uses a microservices architecture with several key components:</p>

          <ul>
            <li>A Git integration layer that hooks into pre-commit and post-commit events</li>
            <li>An AI reasoning engine that generates and stores explanations</li>
            <li>A visualization layer for presenting reasoning chains</li>
            <li>A search and query interface for finding past decisions</li>
          </ul>

          <h3 id="ai-models">AI Models Selection</h3>
          <p>We evaluated several LLMs before selecting our final approach. Our criteria included:</p>

          <ul>
            <li>Reasoning capabilities for code understanding</li>
            <li>Cost-effectiveness for continuous usage</li>
            <li>Ability to be fine-tuned on domain-specific data</li>
          </ul>

          <h3 id="data-storage">Data Storage Considerations</h3>
          <p>Storing reasoning chains efficiently presented several challenges:</p>

          <ul>
            <li>Managing the growth of reasoning data over time</li>
            <li>Creating efficient indexes for quick retrieval</li>
            <li>Maintaining linkage between code changes and explanations</li>
          </ul>

          <h2 id="user-experience">User Experience Design</h2>
          <p>We wanted to create a tool that developers would actually use, which meant making it:</p>

          <ul>
            <li>Seamlessly integrated with existing workflows</li>
            <li>Fast enough to not slow down the development process</li>
            <li>Transparent in how it generates explanations</li>
          </ul>

          <h3 id="ide-integration">IDE Integration</h3>
          <p>Our VS Code and JetBrains plugins allow developers to:</p>

          <ul>
            <li>See reasoning annotations inline with code</li>
            <li>Generate explanations for their own changes</li>
            <li>Query past decisions without leaving their editor</li>
          </ul>

          <h2 id="future-work">Future Work</h2>
          <p>We're continuing to evolve the system with several exciting features on our roadmap:</p>

          <ul>
            <li>Integration with code review systems to provide reasoning context</li>
            <li>Team-level insights about decision patterns</li>
            <li>Proactive suggestions based on historical reasoning</li>
          </ul>
        </div>
      </div>
    </BlogPostTracker>
  )
}
