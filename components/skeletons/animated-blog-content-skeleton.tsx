"use client"

import { SkeletonBase } from "./skeleton-base"

interface AnimatedBlogContentSkeletonProps {
  delay?: number
}

export function AnimatedBlogContentSkeleton({ delay = 0 }: AnimatedBlogContentSkeletonProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <SkeletonBase section="blog" stagger={1} delay={delay} className="h-8 w-32 rounded-full" />

        <SkeletonBase section="blog" stagger={2} delay={delay} className="h-10 rounded-md" />

        <SkeletonBase section="blog" stagger={2} delay={delay} className="h-10 rounded-md w-5/6" />

        <div className="flex items-center gap-4">
          <SkeletonBase section="blog" stagger={3} delay={delay} className="h-5 w-24 rounded-md" />
          <SkeletonBase section="blog" stagger={3} delay={delay} className="h-5 w-32 rounded-md" />
        </div>
      </div>

      {/* Featured image */}
      <SkeletonBase section="blog" stagger={4} delay={delay} className="aspect-video rounded-lg" />

      {/* Content paragraphs */}
      <div className="space-y-6">
        {/* Paragraph 1 */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-5 rounded-md w-4/5" />
        </div>

        {/* Heading */}
        <SkeletonBase section="blog" stagger={1} delay={delay + 0.2} className="h-8 rounded-md w-1/2" />

        {/* Paragraph 2 */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={2} delay={delay + 0.2} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={2} delay={delay + 0.2} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={2} delay={delay + 0.2} className="h-5 rounded-md w-3/4" />
        </div>

        {/* Code block */}
        <SkeletonBase section="blog" stagger={3} delay={delay + 0.2} className="h-32 rounded-md" />

        {/* Paragraph 3 */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={4} delay={delay + 0.2} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={4} delay={delay + 0.2} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={4} delay={delay + 0.2} className="h-5 rounded-md w-2/3" />
        </div>
      </div>
    </div>
  )
}
