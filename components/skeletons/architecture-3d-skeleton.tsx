"use client"

import { SkeletonBase } from "./skeleton-base"

interface Architecture3DSkeletonProps {
  delay?: number
}

export function Architecture3DSkeleton({ delay = 0 }: Architecture3DSkeletonProps) {
  return (
    <SkeletonBase
      section="architecture"
      animate="fade"
      delay={delay}
      className="rounded-lg border bg-card overflow-hidden"
    >
      {/* 3D viewer placeholder */}
      <SkeletonBase section="architecture" stagger={1} delay={delay} className="aspect-[16/9] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-muted/80 architecture-skeleton-rotate" />
          </div>
        </div>
      </SkeletonBase>

      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <SkeletonBase section="architecture" stagger={2} delay={delay} className="h-7 rounded-md" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <SkeletonBase section="architecture" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="architecture" stagger={3} delay={delay} className="h-4 rounded-md" />
          <SkeletonBase section="architecture" stagger={3} delay={delay} className="h-4 rounded-md w-3/4" />
        </div>

        {/* Controls skeleton */}
        <div className="flex gap-2">
          <SkeletonBase section="architecture" stagger={4} delay={delay} className="h-8 w-8 rounded-md" />
          <SkeletonBase section="architecture" stagger={4} delay={delay} className="h-8 w-8 rounded-md" />
          <SkeletonBase section="architecture" stagger={4} delay={delay} className="h-8 w-8 rounded-md" />
          <div className="flex-1" />
          <SkeletonBase section="architecture" stagger={4} delay={delay} className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </SkeletonBase>
  )
}
