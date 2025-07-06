import type { Metadata } from "next"
import { PrintButton } from "@/components/print-button"
import { SectionTitle } from "@/components/section-title"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { ResumeContent } from "@/components/resume-content"
import "@/styles/resume-print.css"

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
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <a href="/chris-thackrey-resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>
          <PrintButton />
        </div>
      </div>
      <div className="bg-white/[0.05] dark:bg-black/[0.05] backdrop-blur-md border border-white/[0.08] p-6 sm:p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto resume-container">
        <ResumeContent />
      </div>
    </main>
  )
}
