import { ArchitecturePageSkeleton } from "@/components/skeletons/architecture-page-skeleton"

export default function ArchitectureLoading() {
  // Add a key to ensure React treats this as a new component
  return <ArchitecturePageSkeleton key="architecture-skeleton" />
}
