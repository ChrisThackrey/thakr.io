"use client"

import { SkeletonBase } from "./skeleton-base"

interface AnimatedArchitectureSkeletonProps {
  delay?: number
}

export function AnimatedArchitectureSkeleton({ delay = 0 }: AnimatedArchitectureSkeletonProps) {
  return (
    <SkeletonBase
      section="architecture"
      delay={delay}
      className="rounded-lg border bg-card overflow-hidden"
    >
      {/* Image skeleton */}
      <SkeletonBase section="architecture" stagger={1} delay={delay} className="aspect-[4/3]" />

      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <SkeletonBase section="architecture" stagger={2} delay={delay} className="h-7 rounded-md" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <SkeletonBase section="architecture" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="architecture" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="architecture" stagger={3} delay={delay} className="h-4 rounded-md w-3/4" />
        </div>

        {/* Details skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <SkeletonBase section="architecture" stagger={4} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="architecture" stagger={4} delay={delay} className="h-4 rounded-md" />
        </div>
      </div>
    </SkeletonBase>
  )
}
