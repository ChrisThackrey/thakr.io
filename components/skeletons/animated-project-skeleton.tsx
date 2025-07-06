"use client"

import { SkeletonBase } from "./skeleton-base"

interface AnimatedProjectSkeletonProps {
  delay?: number
}

export function AnimatedProjectSkeleton({ delay = 0 }: AnimatedProjectSkeletonProps) {
  return (
    <SkeletonBase
      section="projects"
      delay={delay}
      className="rounded-lg border bg-card overflow-hidden"
    >
      {/* Image skeleton */}
      <SkeletonBase section="projects" stagger={1} delay={delay} className="aspect-video" />

      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <SkeletonBase section="projects" stagger={2} delay={delay} className="h-6 rounded-md" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <SkeletonBase section="projects" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="projects" stagger={3} delay={delay} className="h-4 rounded-md w-4/5" />
        </div>

        {/* Tech stack skeleton */}
        <div className="flex gap-2">
          <SkeletonBase section="projects" stagger={4} delay={delay} className="h-6 w-16 rounded-full" />
          <SkeletonBase section="projects" stagger={4} delay={delay} className="h-6 w-20 rounded-full" />
          <SkeletonBase section="projects" stagger={4} delay={delay} className="h-6 w-18 rounded-full" />
        </div>

        {/* Links skeleton */}
        <div className="flex gap-4">
          <SkeletonBase section="projects" stagger={5} delay={delay} className="h-8 w-24 rounded-md" />
          <SkeletonBase section="projects" stagger={5} delay={delay} className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </SkeletonBase>
  )
}
