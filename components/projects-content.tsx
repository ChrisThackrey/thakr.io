import { getProjects } from "@/lib/projects-data"
import { ProjectCard } from "@/components/project-card"
import { SectionTitle } from "@/components/section-title"

const ghostProjects = [
  {
    title: "BeviAI",
    description: "Co-pilot for Commercial Insurance Brokers",
    website: "https://www.bevi.ai/",
  },
  {
    title: "AI Code Factory",
  },
  {
    title: "Chap",
    description: "AI-driven Social Media and Dating Platform",
  },
  {
    title: "CelaHealthcare",
    description: "Patented Healthcare Application backed by investors",
  },
] as const

function GhostCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full min-h-[16rem] flex flex-col items-center justify-center text-center gap-2 p-6 rounded-lg border-2 border-dashed border-border/70 bg-background/40 backdrop-blur-sm transition-colors hover:border-primary/50">
      {children}
    </div>
  )
}

export default async function ProjectsContent() {
  const projects = await getProjects()

  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="space-y-8">
          <SectionTitle>Projects</SectionTitle>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            A selection of software and development projects I&apos;ve built. From AI-powered tools to algorithmic
            solvers, these projects showcase my passion for building innovative and practical solutions.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center text-center shrink-0 md:pr-8">
          <span className="text-7xl font-extrabold tracking-tight text-primary">11+</span>
          <span className="text-4xl font-bold tracking-tight">Projects</span>
          <span className="text-4xl font-bold tracking-tight">Built</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        <GhostCard>
          <span className="text-7xl font-extrabold tracking-tight text-primary">11+</span>
          <span className="text-4xl font-bold tracking-tight leading-tight">
            Projects
            <br />
            Built
          </span>
        </GhostCard>
        {ghostProjects.map((ghost) => (
          <GhostCard key={ghost.title}>
            <span className="text-3xl font-bold tracking-tight">{ghost.title}</span>
            {"description" in ghost && ghost.description && (
              <p className="text-muted-foreground text-sm max-w-[24ch]">{ghost.description}</p>
            )}
            {"website" in ghost && ghost.website && (
              <a
                href={ghost.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {ghost.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
            )}
          </GhostCard>
        ))}
      </div>
    </div>
  )
}
