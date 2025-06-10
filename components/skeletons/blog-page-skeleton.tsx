"use client"

import { AnimatedBlogSkeleton } from "./animated-blog-skeleton"
import { FeaturedBlogSkeleton } from "./featured-blog-skeleton"
import { SeriesBlogSkeleton } from "./series-blog-skeleton"
import { SkeletonBase } from "./skeleton-base"

export function BlogPageSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-4 mb-8">
        <SkeletonBase section="blog" className="h-10 w-32 rounded-md" />
        <SkeletonBase section="blog" className="h-5 w-96 rounded-md" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          {/* Filter UI */}
          <div className="mb-6 flex items-center">
            <SkeletonBase section="blog" className="h-10 w-48 rounded-md" />
          </div>

          {/* Featured post */}
          <div className="mb-8">
            <FeaturedBlogSkeleton />
          </div>

          {/* Grid of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SeriesBlogSkeleton delay={0.1} />
            <AnimatedBlogSkeleton delay={0.2} />
            <AnimatedBlogSkeleton delay={0.3} />
            <AnimatedBlogSkeleton delay={0.4} />
            <SeriesBlogSkeleton delay={0.5} />
            <AnimatedBlogSkeleton delay={0.6} />
          </div>
        </div>

        <div className="md:w-1/4">
          {/* Tag cloud */}
          <SkeletonBase section="blog" className="h-64 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
