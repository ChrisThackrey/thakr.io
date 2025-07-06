"use client"

import { SkeletonBase } from "./skeleton-base"

interface FeaturedBlogSkeletonProps {
  delay?: number
}

export function FeaturedBlogSkeleton({ delay = 0 }: FeaturedBlogSkeletonProps) {
  return (
    <SkeletonBase
      section="blog"
      delay={delay}
      className="rounded-lg border bg-card overflow-hidden md:flex"
    >
      {/* Featured image */}
      <SkeletonBase
        section="blog"
        stagger={1}
        delay={delay}
        className="aspect-video md:w-2/5 md:aspect-auto md:h-auto"
      />

      <div className="p-6 space-y-4 md:w-3/5">
        {/* Featured badge */}
        <SkeletonBase section="blog" stagger={1} delay={delay} className="h-6 w-28 rounded-full" />

        {/* Title skeleton */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={2} delay={delay} className="h-8 rounded-md" />
          <SkeletonBase section="blog" stagger={2} delay={delay} className="h-8 rounded-md w-3/4" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="blog" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="blog" stagger={3} delay={delay} className="h-4 rounded-md w-2/3" />
        </div>

        {/* Meta info skeleton */}
        <div className="flex items-center gap-4 pt-2">
          <SkeletonBase section="blog" stagger={4} delay={delay} className="h-4 w-24 rounded-md" />
          <SkeletonBase section="blog" stagger={4} delay={delay} className="h-4 w-20 rounded-md" />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2">
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-6 w-16 rounded-full" />
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-6 w-20 rounded-full" />
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-6 w-18 rounded-full" />
        </div>
      </div>
    </SkeletonBase>
  )
}
