import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { AnimatedArchitectureSkeleton } from "@/components/skeletons/animated-architecture-skeleton"
import { BookingCTA } from "@/components/booking-cta"
import { ErrorBoundary } from "@/components/error-boundary" // Added import

// Dynamically import the ArchitectureContent component
const ArchitectureContent = dynamic(() => import("@/components/architecture-content"), {
  ssr: true,
})

export const metadata: Metadata = {
  title: "Architecture | Chris Thackrey",
  description: "Architectural projects and designs by Chris Thackrey.",
}

export default function ArchitecturePage() {
  return (
    <Suspense
      fallback={
        <div className="container py-8 space-y-6">
          <h1 className="text-4xl font-bold">Architecture</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <AnimatedArchitectureSkeleton key={i} delay={i * 0.05} />
            ))}
          </div>
        </div>
      }
    >
      <ErrorBoundary componentName="ArchitecturePageContent">
        {" "}
        {/* Added ErrorBoundary */}
        <ArchitectureContent />
        <BookingCTA />
      </ErrorBoundary>
    </Suspense>
  )
}
