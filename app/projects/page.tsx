import type { Metadata } from "next"
import { BookingCTA } from "@/components/booking-cta"
import { PageBackground } from "@/components/page-background"
import ProjectsContent from "@/components/projects-content"

export const metadata: Metadata = {
  title: "Projects | Chris Thackrey",
  description: "Software and development projects by Chris Thackrey.",
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col flex-grow">
      <PageBackground /> {/* Added PageBackground component */}
      <div className="flex-grow">
        {/* @ts-expect-error - ProjectsContent is an async component which is valid in Next.js 15 */}
        <ProjectsContent />
      </div>
      <BookingCTA />
    </div>
  )
}
