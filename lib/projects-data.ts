/* -------------------------------------------------------------------------- */
/*                       STATIC PROJECT-DATA SOURCE                           */
/* -------------------------------------------------------------------------- */

export interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  bullets?: string[]
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
  content?: string
}

const projectsData: Project[] = [
  {
    slug: "rivendell",
    title: "Rivendell",
    description:
      "An AI development and research tool that functions as 'version control for reasoning', enabling parallel prompt testing and 3-D visualisation of response clusters.",
    image: "/images/projects/rivendell.png",
    tags: ["Next.js", "TypeScript", "Vercel", "OpenAI API", "Three.js", "AI"],
    featured: true,
  },
  {
    slug: "ai-teaching-application",
    title: "AI Applications for National Education Research Organization",
    description:
      "AI teaching application featuring a multiplayer AI chat and advanced deep research enabled. (Subject to NDA)",
    image: "/images/projects/ai-teaching-project.png",
    tags: [
      "JavaScript",
      "TypeScript",
      "TailwindCSS",
      "PostgreSQL",
      "AWS CLI",
      "AWS",
      "AWS Lambda Functions",
      "LangSmith",
      "LangChain",
      "LangGraph",
    ],
  },
  {
    slug: "lineage-crm",
    title: "CRM Management App to Handle Insurance Clients and Leads",
    description:
      "Final expense CRM management app and tool for handling clients and leads, currently deployed with more than 200 active users. lineagecrm.com",
    image: "/images/projects/lineage.svg",
    tags: [
      "TypeScript",
      "React Hooks + Context API",
      "TailwindCSS",
      "Google Maps Platform",
      "Next.js",
      "Supabase",
      "Vercel",
      "TDD",
      "Twilio",
      "Nivo Charts",
    ],
  },
  {
    slug: "wildfire-analysis-tools",
    title: "AI Analysis Tools For International Wildfire Science and Technology Company",
    description:
      "Cloud-based SaaS offering on-demand wildfire spread prediction capabilities to support operational response. (Subject to NDA)",
    image: "/images/projects/wildfire.png",
    tags: [
      "TypeScript",
      "Vue",
      "Vuetify",
      "Mapbox",
      "Google Maps Platform",
      "Github Actions",
      "Deploy Hooks",
      "Azure DevOps Integration",
      "D3",
      "Uber H3",
    ],
  },
  {
    slug: "collegiate-pathways",
    title: "Collegiate Pathways",
    description:
      "AI-driven college planning application with chatbot assistance to combine together course-catalogue offerings from multiple higher-level learning institutions, including major college curriculums, into a full degree plan that satisfies the requirements for any field of study.",
    bullets: [
      "Features fully dynamic components generated using custom API calls to AI in real-time.",
      "The fully-generated degree plan outline leveraged AI prompted to accommodate remote learning, schedule planning around any on-site learning at multiple locations, and account for pre-requisites that must be taken in sequential order.",
    ],
    image: "/images/projects/teaching-project.jpg",
    tags: ["TypeScript", "Astro", "Svelte", "OpenAI API", "Anthropic SDK", "Shadcn-UI"],
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
    featured: true,
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
