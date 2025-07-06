/* -------------------------------------------------------------------------- */
/*                       STATIC PROJECT-DATA SOURCE                           */
/* -------------------------------------------------------------------------- */

export interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

const projectsData: Project[] = [
  {
    slug: "rivendell",
    title: "Rivendell",
    description:
      "An AI development and research tool that functions as 'version control for reasoning', enabling parallel prompt testing and 3-D visualisation of response clusters.",
    image: "/images/projects/rivendell.png",
    tags: ["Next.js", "TypeScript", "Vercel", "OpenAI API", "Three.js", "AI"],
    liveUrl: "https://rivendell-ai.vercel.app/",
    repoUrl: "https://github.com/ChrisThackrey/rivendell",
    featured: true,
  },
  {
    slug: "speed-reader",
    title: "Speed Reader",
    description:
      "A productivity tool that helps users read faster by flashing words on the screen at a configurable speed.",
    image: "/images/projects/speed-reader.png",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveUrl: "https://speed-reader-tool.vercel.app/",
    repoUrl: "https://github.com/ChrisThackrey/speed-reader",
    featured: true,
  },
  {
    slug: "killer-sudoku-solver",
    title: "Killer Sudoku Solver",
    description: "A web-based solver that can crack any valid Killer Sudoku puzzle with a backtracking algorithm.",
    image: "/images/projects/killer-sudoku.png",
    tags: ["JavaScript", "Algorithm"],
    liveUrl: "https://killer-sudoku-solver.vercel.app/",
    repoUrl: "https://github.com/ChrisThackrey/killer-sudoku-solver",
  },
]

/* -------------------------------------------------------------------------- */
/*                               DATA HELPERS                                 */
/* -------------------------------------------------------------------------- */

export async function getProjects(): Promise<Project[]> {
  return projectsData.slice()
}

/** Legacy alias kept for backward compatibility. */
export { projectsData }

export async function getFeaturedProjects(): Promise<Project[]> {
  return projectsData.filter((p) => p.featured)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projectsData.find((p) => p.slug === slug) ?? null
}
