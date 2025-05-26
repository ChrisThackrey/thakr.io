"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { generateSummary, type BlogSummary } from "@/utils/summary-generator"
import { PrintableSummary } from "@/components/printable-summary"
import { cn } from "@/lib/utils"

interface SummaryGeneratorButtonProps {
  contentId?: string
  title: string
  className?: string
}

export function SummaryGeneratorButton({ contentId, title, className }: SummaryGeneratorButtonProps) {
  const [summary, setSummary] = useState<BlogSummary | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateSummary = () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Find the content element
      let contentElement: HTMLElement | null = null

      if (contentId) {
        contentElement = document.getElementById(contentId)
      }

      if (!contentElement) {
        // Try common selectors
        const selectors = [
          ".prose",
          "article .prose",
          "article .mdx",
          ".mdx-content",
          "article",
          "main",
          ".blog-content",
          "#blog-content",
          "[data-mdx-content]",
          ".markdown-body",
          "[data-blog-content]",
        ]

        for (const selector of selectors) {
          const element = document.querySelector(selector)
          if (element instanceof HTMLElement) {
            contentElement = element
            break
          }
        }
      }

      if (!contentElement) {
        throw new Error("Could not find blog content to summarize")
      }

      // Generate the summary
      const generatedSummary = generateSummary(contentElement, title)
      setSummary(generatedSummary)
    } catch (err) {
      console.error("Error generating summary:", err)
      setError(err instanceof Error ? err.message : "Failed to generate summary")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCloseSummary = () => {
    setSummary(null)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleGenerateSummary}
        disabled={isGenerating}
        className={cn("flex items-center gap-2", className)}
      >
        <FileText className="h-4 w-4" />
        <span>{isGenerating ? "Generating..." : "Generate Summary"}</span>
      </Button>

      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}

      {summary && <PrintableSummary summary={summary} onClose={handleCloseSummary} />}
    </>
  )
}
