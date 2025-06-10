"use client"

import { SkeletonBase } from "./skeleton-base"

interface CodeBlogContentSkeletonProps {
  delay?: number
}

export function CodeBlogContentSkeleton({ delay = 0 }: CodeBlogContentSkeletonProps) {
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

      {/* Content with code blocks */}
      <div className="space-y-6">
        {/* Paragraph 1 */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={4} delay={delay} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={4} delay={delay} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={4} delay={delay} className="h-5 rounded-md w-4/5" />
        </div>

        {/* Code block 1 */}
        <div className="space-y-1">
          <SkeletonBase section="blog" stagger={5} delay={delay} className="h-6 rounded-md w-1/3" />
          <SkeletonBase
            section="blog"
            stagger={5}
            delay={delay}
            className="h-48 rounded-md bg-muted/80 dark:bg-muted/50"
          />
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={1} delay={delay + 0.2} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={1} delay={delay + 0.2} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={1} delay={delay + 0.2} className="h-5 rounded-md w-3/4" />
        </div>

        {/* Code block 2 */}
        <div className="space-y-1">
          <SkeletonBase section="blog" stagger={2} delay={delay + 0.2} className="h-6 rounded-md w-1/4" />
          <SkeletonBase
            section="blog"
            stagger={2}
            delay={delay + 0.2}
            className="h-32 rounded-md bg-muted/80 dark:bg-muted/50"
          />
        </div>

        {/* Paragraph 3 */}
        <div className="space-y-2">
          <SkeletonBase section="blog" stagger={3} delay={delay + 0.2} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={3} delay={delay + 0.2} className="h-5 rounded-md" />
          <SkeletonBase section="blog" stagger={3} delay={delay + 0.2} className="h-5 rounded-md w-2/3" />
        </div>
      </div>
    </div>
  )
}
