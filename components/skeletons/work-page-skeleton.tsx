"use client"

import { SkeletonBase } from "./skeleton-base"

export function WorkPageSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-4 mb-8">
        <SkeletonBase section="work" className="h-10 w-48 rounded-md" />
        <SkeletonBase section="work" className="h-5 w-96 rounded-md" />
      </div>

      {/* Timeline skeleton */}
      <div className="mt-12 space-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="relative">
              <SkeletonBase section="work" className="h-12 w-12 rounded-full" />
              {i < 4 && (
                <div className="absolute top-12 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-800" />
              )}
            </div>
            <div className="flex-1 space-y-3 pb-8">
              <SkeletonBase section="work" className="h-6 w-3/4 rounded-md" />
              <SkeletonBase section="work" className="h-4 w-1/4 rounded-md" />
              <div className="space-y-2 mt-4">
                <SkeletonBase section="work" className="h-4 w-full rounded-md" />
                <SkeletonBase section="work" className="h-4 w-full rounded-md" />
                <SkeletonBase section="work" className="h-4 w-3/4 rounded-md" />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <SkeletonBase section="work" className="h-6 w-20 rounded-full" />
                <SkeletonBase section="work" className="h-6 w-24 rounded-full" />
                <SkeletonBase section="work" className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
