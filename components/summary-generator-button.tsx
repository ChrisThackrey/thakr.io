"use client";

import type * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { type BlogSummary, generateSummary } from "@/utils/summary-generator";
import { PrintableSummary } from "@/components/printable-summary";
import { cn } from "@/lib/utils";

interface SummaryGeneratorButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  /** ID of the element that contains the blog post’s HTML (used later). */
  contentId: string;
  /** Title of the post – passed to the eventual summary routine. */
  title: string;
}

/* -------------------------------------------------------------------------- */
/*                            Internal click handler                          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export function SummaryGeneratorButton(
  { contentId, title }: SummaryGeneratorButtonProps,
) {
  const [summary, setSummary] = useState<BlogSummary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Find the content element
      let contentElement: HTMLElement | null = null;

      if (contentId) {
        contentElement = document.getElementById(contentId);
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
        ];

        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element instanceof HTMLElement) {
            contentElement = element;
            break;
          }
        }
      }

      if (!contentElement) {
        throw new Error("Could not find blog content to summarize");
      }

      // Generate the summary
      const generatedSummary = await generateSummary(contentElement, title);
      setSummary(generatedSummary);
    } catch (err) {
      console.error("Error generating summary:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate summary",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseSummary = () => {
    setSummary(null);
  };

  return (
    <div>
      <Button
        variant="outline"
        className={cn("flex items-center gap-2", contentId)}
        onClick={handleGenerateSummary}
        disabled={isGenerating}
      >
        {isGenerating
          ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          : <Icons.generator className="mr-2 h-4 w-4" />}
        <span>{isGenerating ? "Generating..." : "Generate Summary"}</span>
      </Button>

      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}

      {summary && (
        <PrintableSummary summary={summary} onClose={handleCloseSummary} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                      Named export for convenience (optional)               */
/* -------------------------------------------------------------------------- */

// If some other part of the codebase still imports { GENERATOR } from this
// module by mistake, re-export the correct icon to avoid runtime failures.
export { Icons as GENERATOR };

// ‼️ add this at the very end of the file
