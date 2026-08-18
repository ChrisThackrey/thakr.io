import { getProjects } from "@/lib/projects-data"
import { ProjectCard } from "@/components/project-card"
import { SectionTitle } from "@/components/section-title"

export default async function ProjectsContent() {
  const projects = await getProjects()

  return (
    <div className="container py-12 space-y-8">
      <SectionTitle>Projects</SectionTitle>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          A selection of software and development projects I&apos;ve built. From AI-powered tools to algorithmic solvers,
          these projects showcase my passion for building innovative and practical solutions.
        </p>
        <div className="flex flex-col items-center text-center shrink-0 md:pr-8">
          <span className="text-7xl font-extrabold tracking-tight text-primary">11+</span>
          <span className="text-4xl font-bold tracking-tight">Projects</span>
          <span className="text-4xl font-bold tracking-tight">Built</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        <div className="flex flex-col items-center justify-center text-center p-6">
          <span className="text-7xl font-extrabold tracking-tight text-primary">11+</span>
          <span className="text-4xl font-bold tracking-tight">Projects</span>
          <span className="text-4xl font-bold tracking-tight">Built</span>
        </div>
      </div>
    </div>
  )
}
