import { AboutPageSkeleton } from "@/components/skeletons/about-page-skeleton"

export default function AboutLoading() {
  // Add a key to ensure React treats this as a new component
  return <AboutPageSkeleton key="about-skeleton" />
}
