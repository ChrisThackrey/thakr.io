import type { Metadata } from "next"
import { PrintButton } from "@/components/print-button"
import { SectionTitle } from "@/components/section-title"
import { DownloadCvMenu } from "@/components/download-cv-menu"
import { ResumeDocument } from "@/components/resume-document"
import { ResumeScaler } from "@/components/resume-scaler"
import { PageBackground } from "@/components/page-background"
import "@/styles/resume-document.css"
import "@/styles/resume-print.css"

export const metadata: Metadata = {
  title: "Resume | Chris Thackrey",
  description: "The resume of Chris Thackrey: Software Engineer, Full Stack Developer, and AI Engineer.",
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
        <ResumeScaler>
          <ResumeDocument />
        </ResumeScaler>
      </main>
    </>
  )
}
