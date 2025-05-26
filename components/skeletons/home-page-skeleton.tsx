"use client"

import { SkeletonBase } from "./skeleton-base"

export function HomePageSkeleton() {
  return (
    <div>
      {/* Hero section */}
      <div className="container py-12 md:py-24">
        <div className="max-w-3xl space-y-6">
          <SkeletonBase section="home" className="h-12 w-3/4 rounded-md" />
          <SkeletonBase section="home" className="h-6 w-full rounded-md" />
          <SkeletonBase section="home" className="h-6 w-5/6 rounded-md" />
          <div className="flex gap-4 pt-4">
            <SkeletonBase section="home" className="h-10 w-32 rounded-md" />
            <SkeletonBase section="home" className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>

      {/* Featured work section */}
      <div className="container py-12">
        <SkeletonBase section="home" className="h-8 w-48 mb-8 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <SkeletonBase section="home" className="h-48 w-full rounded-lg" />
              <SkeletonBase section="home" className="h-6 w-3/4 rounded-md" />
              <SkeletonBase section="home" className="h-4 w-full rounded-md" />
              <div className="flex gap-2">
                <SkeletonBase section="home" className="h-6 w-16 rounded-full" />
                <SkeletonBase section="home" className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured blog section */}
      <div className="container py-12">
        <SkeletonBase section="home" className="h-8 w-48 mb-8 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <SkeletonBase section="home" className="h-48 w-full rounded-lg" />
              <SkeletonBase section="home" className="h-6 w-3/4 rounded-md" />
              <SkeletonBase section="home" className="h-4 w-full rounded-md" />
              <div className="flex gap-2">
                <SkeletonBase section="home" className="h-6 w-16 rounded-full" />
                <SkeletonBase section="home" className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
