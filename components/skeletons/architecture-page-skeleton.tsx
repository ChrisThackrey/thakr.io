"use client"

import { AnimatedArchitectureSkeleton } from "./animated-architecture-skeleton"
import { Architecture3DSkeleton } from "./architecture-3d-skeleton"
import { SkeletonBase } from "./skeleton-base"

export function ArchitecturePageSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-4 mb-8">
        <SkeletonBase section="architecture" className="h-10 w-48 rounded-md" />
        <SkeletonBase section="architecture" className="h-5 w-96 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Architecture3DSkeleton delay={0.1} />
        <AnimatedArchitectureSkeleton delay={0.2} />
        <AnimatedArchitectureSkeleton delay={0.3} />
        <AnimatedArchitectureSkeleton delay={0.4} />
        <Architecture3DSkeleton delay={0.5} />
        <AnimatedArchitectureSkeleton delay={0.6} />
      </div>
    </div>
  )
}
