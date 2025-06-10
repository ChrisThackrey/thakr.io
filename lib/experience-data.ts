// Define a type for nested projects
export interface Project {
  title: string
  description: string[]
  skills?: string[]
}

// Update TimelineItem to include projects
export interface TimelineItemData {
  title: string
  date: string
  company: string
  description: string[]
  skills?: string[]
  projects?: Project[]
}

export const professionalExperience: TimelineItemData[] = [
  {
    title: "Freelance / Contract Software Engineering",
    date: "Various Engagements", // Or a suitable date range
    company: "Self-Employed / Various Clients",
    description: [
      "Provided full-stack development services for various clients, focusing on AI integration, web application development, and data solutions.",
    ],
    skills: ["Full-Stack Development", "AI Integration", "Project Management", "Client Communication"],
    projects: [
      {
        title: "AI Teaching Application (NCEE)",
        description: [
          "Implemented a multiplayer AI chat that responds to all participants with Stream Chat API, OpenAI SDK, and Langgraph.",
          "Developed a multi-tenant architecture deployed to multiple school districts with a custom automated AWS and Docker admin tool.",
          "Implemented a templating system to provide custom user prompts and room variables for better AI context and responses.",
        ],
        skills: [
          "AI",
          "Multiplayer Chat",
          "Stream Chat API",
          "OpenAI SDK",
          "Langgraph",
          "Multi-tenancy",
          "AWS",
          "Docker",
        ],
      },
      {
        title: "Technosylva Wildfire Risk Analyst",
        description: [
          "Implemented a hexagon geo-spatial system with Uber H3 and a custom H3-to-D3 transition layer algorithm for UI interactivity.",
          "Self-hosted OpenAI models on a secure Azure backend to make safe API calls to private data.",
          "Created a forecast funnel feature that generated AI-driven risk assessment reports responding to a timeline of mapped events.",
        ],
        skills: ["Geo-spatial", "Uber H3", "D3.js", "OpenAI", "Azure", "SaaS"],
      },
      {
        title: "Lineage Final Expense Insurance CRM",
        description: [
          "Integrated Google Maps to view leads by geo-spatial clusters and an advanced analytics screen with reactive Nivo Charts.",
          "Completed an Extract, Transform, Load (ETL) process from a legacy SQL backend into new Supabase DB connections.",
        ],
        skills: ["CRM", "Google Maps API", "Nivo Charts", "ETL", "Supabase", "SQL"],
      },
    ],
  },
  {
    title: "Principal Software Architect",
    date: "2025",
    company: "Silver Bow Technology Group",
    description: [
      'Led software engineering team and built the core AI functionality for a "version control for reasoning" dev tool - providing AI-driven code-generation, prompt enhancement, architecture strategy, as well as project planning and security features.',
    ],
    skills: ["AI", "Code Generation", "Architecture Strategy", "Project Planning", "Security", "Team Leadership"],
  },
  {
    title: "Software Engineer",
    date: "2024-2025",
    company: "Black Flag Design",
    description: [
      "Contributed full feature code across all five projects in development.",
      "Researched, scripted, and hosted a podcast series on AI coding trends, Vercel’s development ecosystem and tech trends.",
    ],
    skills: ["Full-Stack Development", "AI", "Vercel", "Podcasting"],
    projects: [
      {
        title: "Unbound - AI Repository Code Generation Application",
        description: [
          "Led the development of Unbound, a meeting-to-feature codegen application and internal dev tool that wrote AI-generated feature Pull Requests.",
          "Connects to repositories using Octokit API and vectorizes the codebase to a Supabase DB for performing similarity searches on the embedded file contents.",
          "Ingests meeting transcripts into a prompt call to OpenAI or Anthropic APIs to find relevant files and implement code changes on a new PR branch.",
          "Implemented a client-side diff view and a custom node graph of the repository history using React Flow.",
        ],
        skills: [
          "AI",
          "Code Generation",
          "Vector DB",
          "Supabase",
          "OpenAI API",
          "Anthropic API",
          "Octokit API",
          "React Flow",
        ],
      },
    ],
  },
  {
    title: "Lead Designer",
    date: "2016",
    company: "Gianni Ranaulo Design, Dubai, UAE",
    description: ["Lead designer for architectural projects in Dubai, UAE."],
    skills: ["Architectural Design", "Project Leadership"],
  },
  {
    title: "Lead Designer",
    date: "2013-2015",
    company: "Xuberance Design, Shanghai, China",
    description: ["Lead designer for architectural projects in Shanghai, China."],
    skills: ["Architectural Design", "Computational Design"],
  },
]

export const education = [
  {
    title: "The Rust Developer Bootcamp",
    date: "2022",
    company: "Self-study (Certificate of Completion)",
    description: ["Learned Rust independently to build high-performance, reliable software."],
    skills: ["Rust", "Systems Programming"],
  },
  {
    title: "AlgoExpert.io",
    date: "2022",
    company: "Certificate of Completion",
    description: ["Completed 100 technical interview questions, mastering various data structures and algorithms."],
    skills: ["Algorithms", "Data Structures", "Problem Solving"],
  },
  {
    title: "Software Engineering Immersive",
    date: "Graduated March 2021",
    company: "Hack Reactor, Austin, TX",
    description: [
      "Completed an advanced, immersive software engineering program focused on full-stack JavaScript development and computer science fundamentals.",
    ],
    skills: ["Full-Stack Development", "JavaScript", "React", "Node.js"],
  },
  {
    title: "Computer Animation & Programming",
    date: "2017-2018",
    company: "Gnomon School of Visual Effects, Los Angeles, CA",
    description: ["Studied computer animation, visual effects, and computer programming."],
    skills: ["3D Animation", "VFX", "Programming"],
  },
  {
    title: "Master of Architecture (studies)",
    date: "2016-2017",
    company: "Southern California Institute of Architecture, Los Angeles, CA",
    description: ["Completed 35 hours towards a Master of Architecture degree with a 3.5/4.0 GPA."],
    skills: ["Architectural Theory", "Advanced Design"],
  },
  {
    title: "Bachelor of Science, Environmental Design",
    date: "2015",
    company: "Texas A&M University",
    description: ["Graduated Cum Laude with a 3.5/4.0 GPA, focusing on architectural design."],
    skills: ["Environmental Design", "Architecture", "Urban Planning"],
  },
]

export const technicalSkills = {
  "Front End": [
    "TypeScript",
    "NextJS",
    "Astro",
    "SvelteKit",
    "React Hooks + Context API",
    "Redux",
    "JavaScript",
    "D3",
    "Shadcn/ui",
    "TailwindCSS",
    "Radix UI",
    "ChakraUI",
    "Vercel v0",
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
    "Github Actions",
    "Github Apps",
    "Vercel CLI",
    "Deploy Hooks",
    "Vercel REST API",
    "Docker",
    "Heroku",
    "DigitalOcean",
    "Electron",
    "AWS: EC2",
    "AWS Lambda Functions",
    "Google Cloud Functions",
  ],
  DevOps: [
    "Turbopack",
    "Turborepo",
    "Azure DevOps Integration",
    "Observability Tools",
    "Trigger.dev",
    "Datadog",
    "Artillery.io",
    "TDD prompt engineering",
    "Critical-CSS",
    "React-Suspense",
    "NGINX",
  ],
}
