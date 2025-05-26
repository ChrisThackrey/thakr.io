"use client"

import { SkeletonBase } from "./skeleton-base"

export function BookingPageSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-4 mb-8">
        <SkeletonBase section="booking" className="h-10 w-48 rounded-md" />
        <SkeletonBase section="booking" className="h-5 w-96 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Calendar section */}
        <div className="space-y-4">
          <SkeletonBase section="booking" className="h-8 w-48 rounded-md" />
          <SkeletonBase section="booking" className="h-64 w-full rounded-lg" />

          {/* Time slots */}
          <div className="mt-6">
            <SkeletonBase section="booking" className="h-6 w-32 mb-3 rounded-md" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBase key={i} section="booking" className="h-10 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="space-y-6">
          <SkeletonBase section="booking" className="h-8 w-48 rounded-md" />

          {/* Form fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <SkeletonBase section="booking" className="h-5 w-24 rounded-md" />
              <SkeletonBase section="booking" className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <SkeletonBase section="booking" className="h-5 w-24 rounded-md" />
              <SkeletonBase section="booking" className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <SkeletonBase section="booking" className="h-5 w-24 rounded-md" />
              <SkeletonBase section="booking" className="h-32 w-full rounded-md" />
            </div>

            <SkeletonBase section="booking" className="h-12 w-full rounded-md mt-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
