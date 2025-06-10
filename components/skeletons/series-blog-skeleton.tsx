"use client"

import { SkeletonBase } from "./skeleton-base"

interface SeriesBlogSkeletonProps {
  delay?: number
}

export function SeriesBlogSkeleton({ delay = 0 }: SeriesBlogSkeletonProps) {
  return (
    <SkeletonBase section="blog" animate="slide" delay={delay} className="rounded-lg border bg-card overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Series badge */}
        <div className="flex items-center gap-2">
          <SkeletonBase section="blog" stagger={1} delay={delay} className="h-5 w-24 rounded-full" />
          <SkeletonBase section="blog" stagger={1} delay={delay} className="h-5 w-8 rounded-full" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={2} delay={delay} className="h-7 rounded-md" />
          <SkeletonBase section="blog" stagger={2} delay={delay} className="h-7 rounded-md w-3/4" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="blog" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="blog" stagger={3} delay={delay} className="h-4 rounded-md w-2/3" />
        </div>

        {/* Progress bar */}
        <SkeletonBase section="blog" stagger={4} delay={delay} className="h-2 w-full rounded-full" />

        {/* Meta info skeleton */}
        <div className="flex items-center gap-4 pt-2">
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-4 w-24 rounded-md" />
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-4 w-20 rounded-md" />
        </div>
      </div>
    </SkeletonBase>
  )
}
