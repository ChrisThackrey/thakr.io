/**
 * Centralised career & education data used by multiple pages
 * (About, Resume, Timelines, etc.).
 */

export interface Project {
  name: string
  description: string[] // bullet-point list
  skills: string[]
  link?: string
}

export interface TimelineItemData {
  title: string
  company: string
  location?: string
  date: string // e.g. "2025" or "2013-2015"
  description: string[] // bullet-point list
  skills: string[]
  projects?: Project[]
}

/* ---------- Professional Experience ---------- */
export const professionalExperience: TimelineItemData[] = [
  {
    title: "Principal Software Architect",
    company: "Silver Bow Technology Group",
    location: "San Antonio, TX",
    date: "2025",
    description: [
      "Led an engineering team building a “version-control for reasoning” AI platform.",
      "Owned technical vision, security strategy and project planning across AI initiatives.",
    ],
    skills: ["TypeScript", "Next.js", "React", "AI", "LLMs", "Prompt Engineering"],
  },
  {
    title: "Software Engineer",
    company: "Black Flag Design",
    location: "San Antonio, TX",
    date: "2024-2025",
    description: [
      "Delivered features across five concurrent products, including an internal AI code-gen tool.",
      "Hosted the “AI DIY” podcast on AI coding trends and the Vercel ecosystem.",
    ],
    skills: ["TypeScript", "Next.js", "React", "AI", "LLMs", "TailwindCSS"],
    projects: [
      {
        name: "Rivendell – AI Development & Research Tool",
        description: ["Multi-tenant platform acting as version control for AI reasoning and prompt experiments."],
        skills: ["TypeScript", "Next.js", "LLMs", "ThreeJS"],
        link: "/projects/rivendell",
      },
      {
        name: "AI Teaching Application",
        description: ["Realtime multiplayer AI chat for a national not-for-profit education research organisation."],
        skills: ["TypeScript", "Next.js", "LLMs"],
      },
      {
        name: "Wildfire Prediction SaaS",
        description: ["On-demand wildfire-spread forecasting with geospatial visualisation."],
        skills: ["TypeScript", "React", "Data Visualisation"],
      },
      {
        name: "LineageCRM",
        description: ["CRM for insurance agencies – 200+ active users, ETL migration from a legacy backend."],
        skills: ["TypeScript", "Next.js", "Database"],
        link: "https://lineagecrm.com",
      },
    ],
  },
  {
    title: "Lead Designer",
    company: "Gianni Ranaulo Design",
    location: "Dubai, UAE",
    date: "2016",
    description: [
      "Led architectural projects for high-profile clients in the UAE.",
      "Collaborated with international teams on innovative building concepts.",
    ],
    skills: ["Architecture", "3D Modelling", "Design", "Project Management"],
  },
  {
    title: "Lead Designer",
    company: "Xuberance Design",
    location: "Shanghai, China",
    date: "2013-2015",
    description: [
      "Directed design teams for architectural projects across China.",
      "Implemented cutting-edge methodologies such as large-scale 3D printing.",
    ],
    skills: ["Architecture", "3D Modelling", "Design", "Team Leadership"],
  },
]

/* ---------- Education ---------- */
export const education: TimelineItemData[] = [
  {
    title: "Rust Developer Bootcamp",
    company: "Independent Study",
    date: "2022",
    location: "",
    description: ["Completed bootcamp focused on memory-safe systems programming."],
    skills: ["Rust", "Concurrency", "Systems Programming"],
  },
  {
    title: "AlgoExpert.io",
    company: "Online",
    date: "2022",
    location: "",
    description: ["Solved 100+ data-structure & algorithm interview questions."],
    skills: ["Algorithms", "Data Structures", "Problem Solving"],
  },
  {
    title: "Hack Reactor – Software Engineering Immersive",
    company: "Austin, TX",
    date: "2021",
    location: "",
    description: ["Full-stack JavaScript program covering React, Node and databases."],
    skills: ["JavaScript", "React", "Node.js", "SQL", "MongoDB"],
  },
  {
    title: "Gnomon School of Visual Effects",
    company: "Los Angeles, CA",
    date: "2017-2018",
    location: "",
    description: ["Studied computer animation, VFX and graphics programming."],
    skills: ["3D Modelling", "Animation", "Visual Effects"],
  },
  {
    title: "SCI-Arc – M.Arch (partial)",
    company: "Los Angeles, CA",
    date: "2016-2017",
    location: "",
    description: ["Completed 35 graduate credits toward a Master of Architecture."],
    skills: ["Architectural Design", "Urban Planning"],
  },
  {
    title: "Texas A&M University – B.Sc. Environmental Design",
    company: "College Station, TX",
    date: "2015",
    location: "",
    description: ["Graduated Cum Laude (GPA 3.5/4.0)."],
    skills: ["Sustainable Design", "Environmental Design"],
  },
]

/* ---------- Technical Skills (used on About page) ---------- */
export const technicalSkills: Record<string, string[]> = {
  "Front End": [
    "TypeScript",
    "Next.js",
    "Astro",
    "Svelte",
    "React Hooks & Context API",
    "Redux",
    "JavaScript",
    "D3",
    "shadcn/ui",
    "Tailwind CSS",
    "Chakra UI",
    "v0",
  ],
  "Back End": [
    "Vercel Serverless Functions",
    "Edge Functions",
    "GraphQL",
    "MongoDB",
    "MySQL",
    "Prisma",
    "Supabase",
    "Firebase",
    "Redis",
    "Python",
  ],
  Deployment: [
    "Vercel Platform",
    "GitHub Actions",
    "GitHub Apps",
    "Vercel CLI",
    "Deploy Hooks",
    "Vercel REST API",
    "Docker",
    "Heroku",
    "DigitalOcean",
    "Electron",
    "AWS EC2",
    "AWS Lambda",
    "Google Cloud Functions",
  ],
  DevOps: [
    "Turbopack",
    "Turborepo",
    "Azure DevOps",
    "Observability Tools",
    "Trigger.dev",
    "Datadog",
    "Artillery.io",
    "TDD Prompt Engineering",
    "Critical-CSS",
    "React Suspense",
    "NGINX",
  ],
}

/* ---------- Default export for convenience ---------- */
export default {
  professionalExperience,
  education,
  technicalSkills,
}
