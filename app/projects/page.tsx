import type { Metadata } from "next"
import { Suspense } from "react"
import { AnimatedProjectSkeleton } from "@/components/skeletons/animated-project-skeleton"
import { SectionTitle } from "@/components/section-title"
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
        <Suspense
          fallback={
            <div className="container py-12 space-y-8">
              <SectionTitle>Projects</SectionTitle>
              <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
                Software and development projects by Chris Thackrey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <AnimatedProjectSkeleton key={i} delay={i * 0.05} />
                ))}
              </div>
            </div>
          }
        >
          <ProjectsContent />
        </Suspense>
      </div>
      <BookingCTA />
    </div>
  )
}
