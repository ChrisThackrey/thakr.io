import { Suspense } from "react"
import BlogContentWrapper from "@/components/blog-content-wrapper"

interface BlogContentContainerProps {
  slug: string
  children: React.ReactNode
}

export default async function BlogContentContainer({ slug, children }: BlogContentContainerProps) {
  return (
    <BlogContentWrapper slug={slug}>
      {children}
    </BlogContentWrapper>
  )
}
