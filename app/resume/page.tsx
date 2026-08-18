import type { Metadata } from "next"
import { PrintButton } from "@/components/print-button"
import { SectionTitle } from "@/components/section-title"
import { DownloadCvMenu } from "@/components/download-cv-menu"
import { ResumeContent } from "@/components/resume-content"
import { PageBackground } from "@/components/page-background"
import "@/styles/resume-print.css"

export const metadata: Metadata = {
  title: "Resume | Chris Thackrey",
  description: "The resume of Chris Thackrey, a Full-Stack Software Engineer.",
}

export default function ResumePage() {
  return (
    <>
      <PageBackground />
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4 no-print">
          <SectionTitle as="h1" className="text-center sm:text-left mb-0">
            Chris Thackrey – Resume
          </SectionTitle>
          <div className="flex gap-2">
            <DownloadCvMenu />
            <PrintButton />
          </div>
        </div>
        <div className="bg-white/[0.85] dark:bg-black/[0.85] backdrop-blur-md border border-white/[0.08] p-6 sm:p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto resume-container">
          <ResumeContent />
        </div>
      </main>
    </>
  )
}
