"use client"

import { useParams } from "next/navigation"
import { CodeBlogContentSkeleton } from "@/components/skeletons/code-blog-content-skeleton"
import { ImageBlogContentSkeleton } from "@/components/skeletons/image-blog-content-skeleton"
import { AnimatedBlogContentSkeleton } from "@/components/skeletons/animated-blog-content-skeleton"

export default function BlogPostLoading() {
  const params = useParams()
  const slug = params?.slug as string

  // Determine which skeleton to show based on the slug
  const getSkeletonType = () => {
    if (slug.includes("ai") || slug.includes("development")) {
      return "code"
    } else if (slug.includes("deep-sea") || slug.includes("architecture")) {
      return "image"
    }
    return "default"
  }

  const skeletonType = getSkeletonType()

  return (
    <div className="container max-w-4xl py-10">
      {skeletonType === "code" && <CodeBlogContentSkeleton />}
      {skeletonType === "image" && <ImageBlogContentSkeleton />}
      {skeletonType === "default" && <AnimatedBlogContentSkeleton />}
    </div>
  )
}
