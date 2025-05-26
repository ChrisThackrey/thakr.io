"use client"

import { SkeletonBase } from "./skeleton-base"

export function AboutPageSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-4 mb-8">
        <SkeletonBase section="about" className="h-10 w-32 rounded-md" />
        <SkeletonBase section="about" className="h-5 w-96 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <SkeletonBase section="about" className="h-64 w-full rounded-lg" />
          <div className="space-y-2">
            <SkeletonBase section="about" className="h-4 w-full rounded-md" />
            <SkeletonBase section="about" className="h-4 w-full rounded-md" />
            <SkeletonBase section="about" className="h-4 w-3/4 rounded-md" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <SkeletonBase section="about" className="h-6 w-1/3 rounded-md" />
            <SkeletonBase section="about" className="h-4 w-full rounded-md" />
            <SkeletonBase section="about" className="h-4 w-full rounded-md" />
            <SkeletonBase section="about" className="h-4 w-5/6 rounded-md" />
          </div>

          <div className="space-y-2">
            <SkeletonBase section="about" className="h-6 w-1/3 rounded-md" />
            <SkeletonBase section="about" className="h-4 w-full rounded-md" />
            <SkeletonBase section="about" className="h-4 w-full rounded-md" />
            <SkeletonBase section="about" className="h-4 w-5/6 rounded-md" />
          </div>

          <div className="space-y-2">
            <SkeletonBase section="about" className="h-6 w-1/3 rounded-md" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonBase key={i} section="about" className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
