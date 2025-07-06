import { getProjects } from "@/lib/projects-data"
import { ProjectCard } from "@/components/project-card"
import { SectionTitle } from "@/components/section-title"

export default async function ProjectsContent() {
  const projects = await getProjects()

  return (
    <div className="container py-12 space-y-8">
      <SectionTitle>Projects</SectionTitle>
      <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
        A selection of software and development projects I've built. From AI-powered tools to algorithmic solvers, these
        projects showcase my passion for building innovative and practical solutions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
