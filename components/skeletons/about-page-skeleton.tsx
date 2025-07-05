"use client"

import { SkeletonBase } from "./skeleton-base"

export function AboutPageSkeleton() {
  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
        <div className="md:w-2/3 order-2 md:order-1 space-y-6">
          <SkeletonBase section="about" className="h-12 w-48 rounded-lg mb-6" />
          <div className="space-y-4">
            <SkeletonBase section="about" className="h-5 w-full rounded-md" />
            <SkeletonBase section="about" className="h-5 w-full rounded-md" />
            <SkeletonBase section="about" className="h-5 w-11/12 rounded-md" />
          </div>
          <div className="space-y-4 pt-2">
            <SkeletonBase section="about" className="h-5 w-full rounded-md" />
            <SkeletonBase section="about" className="h-5 w-10/12 rounded-md" />
          </div>
          <div className="space-y-4 pt-2">
            <SkeletonBase section="about" className="h-5 w-full rounded-md" />
            <SkeletonBase section="about" className="h-5 w-full rounded-md" />
            <SkeletonBase section="about" className="h-5 w-3/4 rounded-md" />
          </div>
        </div>
        <div className="md:w-1/3 order-1 md:order-2 flex flex-col space-y-8 items-center md:items-stretch">
          <div className="flex flex-col items-center">
            <SkeletonBase section="about" className="w-52 h-52 md:w-60 md:h-60 rounded-full mb-8" />
            <div className="flex space-x-6">
              <SkeletonBase section="about" className="h-14 w-14 rounded-full" />
              <SkeletonBase section="about" className="h-14 w-14 rounded-full" />
              <SkeletonBase section="about" className="h-14 w-14 rounded-full" />
              <SkeletonBase section="about" className="h-14 w-14 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col space-y-4 w-full items-center md:items-stretch pt-8">
            <SkeletonBase section="about" className="h-12 w-full rounded-lg" />
            <SkeletonBase section="about" className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <SkeletonBase section="about" className="h-96 w-full rounded-lg" />
        <SkeletonBase section="about" className="h-96 w-full rounded-lg" />
      </div>
    </div>
  )
}
