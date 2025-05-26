import { ProjectsPageSkeleton } from "@/components/skeletons/projects-page-skeleton"

export default function ProjectsLoading() {
  // Add a key to ensure React treats this as a new component
  return <ProjectsPageSkeleton key="projects-skeleton" />
}
