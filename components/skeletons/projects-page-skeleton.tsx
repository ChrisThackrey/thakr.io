"use client"

import { AnimatedProjectSkeleton } from "./animated-project-skeleton"
import { SkeletonBase } from "./skeleton-base"

export function ProjectsPageSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-4 mb-8">
        <SkeletonBase section="projects" className="h-10 w-32 rounded-md" />
        <SkeletonBase section="projects" className="h-5 w-96 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatedProjectSkeleton delay={0.1} />
        <AnimatedProjectSkeleton delay={0.2} />
        <AnimatedProjectSkeleton delay={0.3} />
        <AnimatedProjectSkeleton delay={0.4} />
        <AnimatedProjectSkeleton delay={0.5} />
        <AnimatedProjectSkeleton delay={0.6} />
      </div>
    </div>
  )
}
