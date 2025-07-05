import { MarkdownRenderer } from "@/components/markdown-renderer"
import { resumeContent } from "@/content/resume"
import type { Metadata } from "next"
import { PrintButton } from "@/components/print-button"
import { SectionTitle } from "@/components/section-title"

export const metadata: Metadata = {
  title: "Resume | Chris Thackrey",
  description: "The resume of Chris Thackrey, a Full-Stack Software Engineer.",
}

export default function ResumePage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4 no-print">
        <SectionTitle as="h1" className="text-center sm:text-left mb-0">
          Chris Thackrey – Resume
        </SectionTitle>
        <PrintButton />
      </div>
      <div className="bg-card p-6 sm:p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto resume-container">
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <MarkdownRenderer content={resumeContent} />
        </article>
      </div>
    </main>
  )
}
