import { BlogPageSkeleton } from "@/components/skeletons/blog-page-skeleton"

export default function BlogLoading() {
  // Add a key to ensure React treats this as a new component
  return <BlogPageSkeleton key="blog-skeleton" />
}
