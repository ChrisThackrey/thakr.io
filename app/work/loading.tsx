import { WorkPageSkeleton } from "@/components/skeletons/work-page-skeleton"

export default function WorkLoading() {
  // Add a key to ensure React treats this as a new component
  return <WorkPageSkeleton key="work-skeleton" />
}
