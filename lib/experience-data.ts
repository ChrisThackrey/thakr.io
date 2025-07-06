/**
 * Centralised career & education data used by multiple pages
 * (About, Resume, Timelines, etc.).
 */

export interface Project {
  name: string
  description: string[] // bullet-point list
  skills: string[]
  link?: string
  ndaNotice?: string // Optional NDA notice
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
      "Lead software engineering team and built the core AI functionality for a \"version control for reasoning\" dev tool providing AI-driven code-generation, prompt enhancement, architecture strategy, as well as project planning and security features.",
    ],
    skills: ["TypeScript", "Next.js", "React", "AI", "LLMs", "Prompt Engineering", "Security", "Architecture"],
    projects: [
      {
        name: "Rivendell - AI Development and Research Tool",
        description: [
          "AI development tool that functions both internally for the company and externally for clients as \"version control for reasoning\".",
          "Implemented a monte-carlo algorithm to run large batches of prompt calls in parallel to various large-language AI models (llms), providing more deterministic outcomes by improving reliable code metrics such as compute and readability.",
          "Configured OpenAI API and Anthropic API models to match relevant files and open a branch with a deployment in Vercel.",
          "Built a monte carlo visualizer with ThreeJS to visualise similar response clusters in 3d space."
        ],
        skills: ["TypeScript", "Next.js", "OpenAI API", "Anthropic API", "ThreeJS", "Monte Carlo Algorithm", "Vercel"],
        link: "/projects/rivendell",
      },
    ],
  },
  {
    title: "Freelance / Contract Software Engineering",
    company: "Self-Employed / Various Clients",
    location: "Various Engagements",
    date: "2024-2025",
    description: [
      "Provided full-stack development services for various clients, focusing on AI integration, web application development, and data solutions.",
    ],
    skills: ["Full-Stack Development", "AI Integration", "Project Management", "Client Communication"],
    projects: [
      {
        name: "AI Repository Code Generation Application",
        description: [
          "Led the development of a meeting-to-feature codegen application",
          "Developed enhanced search capabilities on embedded file content in connected data repositories",
          "Facilitated automation of code changes as new inputs are identified",
          "Implemented detailed documentation capabilities for repository history"
        ],
        skills: ["AI", "Codegen", "Context Engineering", "Vector DB", "Supabase", "OpenAI API", "Anthropic API", "Octokit API", "Github Actions", "React Flow"],
        ndaNotice: "Subject to NDA. No further details are available.",
      },
      {
        name: "Collegiate Pathways Application",
        description: [
          "AI-driven college planning application with chatbot assistance to combine together course-catalogue offerings from multiple higher-level learning institutions, including major college curriculums, into a full degree plan that satisfies the requirements for any field of study",
          "Features fully dynamic components generated using custom API calls to AI in real-time",
          "Implemented a chatbot using OpenAI with a unique persona of an academic counselor",
          "The fully-generated degree plan outline leveraged AI prompted to accomodate remote learning, schedule planning around any on-site learning at multiple locations, and account for pre-requisites that must be taken in sequential order"
        ],
        skills: ["TypeScript", "Astro", "Svelte", "OpenAI API", "Anthropic SDK", "Shadcn-UI"],
      },
    ],
  },
  {
    title: "Software Engineer",
    company: "Black Flag Design",
    location: "San Antonio, TX",
    date: "2024-2025",
    description: [
      "Contributed code across five projects in simultaneous development, including Lead Developer of an AI codegen application and internal dev tool, subject to a signed NDA.",
      "Led, scripted, and hosted the 'AI DIY' podcast series on AI coding trends, Vercel's ecosystem and events in the tech industry.",
    ],
    skills: ["TypeScript", "Next.js", "React", "AI", "LLMs", "TailwindCSS", "Vercel", "Podcast Production"],
    projects: [
      {
        name: "AI Applications for National Not-for-Profit Education Research Organization",
        description: [
          "AI teaching application featuring a multiplayer AI chat and advanced deep research enabled.",
          "Implemented interactive AI communication tools.",
          "Deployed a bespoke multi-tenant architecture implementation.",
          "Designed and implemented interactive interface templates to facilitate AI context and responses."
        ],
        skills: ["TypeScript", "Next.js", "AI/LLMs", "Multi-tenant Architecture", "Real-time Communication"],
      },
      {
        name: "AI Analysis Tools For International Wildfire Science and Technology Company",
        description: [
          "Cloud-based SaaS offering on-demand wildfire spread prediction capabilities to support operational response.",
          "Implemented unique systems to improve UI interactivity.",
          "Utilized secured backends to make safe API calls to private data from public sources.",
          "Created AI-driven assessment tools and forecast features to improve event response times for 20,000+ incidents per year."
        ],
        skills: ["TypeScript", "React", "Data Visualization", "AI/ML", "Geospatial Analysis", "SaaS"],
      },
      {
        name: "CRM Management App to Handle Insurance Clients and Potential Leads",
        description: [
          "Final expense CRM management app and tool for handling clients and leads, currently deployed with more than 200 active users.",
          "Integrated applications to identify potential market opportunities.",
          "Completed Extract, Transform, Load (ETL) process from legacy backend into new database connections."
        ],
        skills: ["TypeScript", "Next.js", "Database", "ETL", "CRM"],
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
    description: ["Learned Rust independently with Certificate of Completion"],
    skills: ["Rust", "Memory-Safe Programming", "Systems Programming"],
  },
  {
    title: "AlgoExpert.io",
    company: "Certificate Program",
    date: "2022",
    location: "",
    description: ["Certificate of Completion for solving 100 technical interview questions"],
    skills: ["Algorithms", "Data Structures", "Problem Solving", "Technical Interviews"],
  },
  {
    title: "Hack Reactor",
    company: "Austin, Texas",
    date: "Graduated March 2021",
    location: "",
    description: ["Intensive software engineering immersive program focusing on full-stack JavaScript development"],
    skills: ["JavaScript", "React", "Node.js", "SQL", "MongoDB", "Full-Stack Development"],
  },
  {
    title: "Gnomon School of Visual Effects",
    company: "Los Angeles, California",
    date: "2017-2018",
    location: "",
    description: ["Studied computer animation, computer programming"],
    skills: ["3D Animation", "Computer Graphics", "Visual Effects", "Programming"],
  },
  {
    title: "Southern California Institute of Architecture",
    company: "Los Angeles, California",
    date: "2016-2017",
    location: "",
    description: ["Completed 35 hours towards Masters degree in Architecture, 3.5/4.0 GPA"],
    skills: ["Architectural Design", "Urban Planning", "Digital Fabrication"],
  },
  {
    title: "Texas A&M University",
    company: "Bachelor of Science - Environmental Design",
    date: "Graduated 2015",
    location: "",
    description: ["Graduated Cum Laude 3.5/4.0 GPA"],
    skills: ["Environmental Design", "Sustainable Design", "Architecture"],
  },
]

/* ---------- Technical Skills (used on About page) ---------- */
export const technicalSkills: Record<string, string[]> = {
  "Front End": [
    "TypeScript",
    "NextJS",
    "Astro",
    "Svelte",
    "React Hooks + Context API",
    "Redux",
    "JavaScript",
    "D3",
    "Shadcn/ui",
    "TailwindCSS",
    "ChakraUI",
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

/* ---------- Default export for convenience ---------- */
const experienceData = {
  professionalExperience,
  education,
  technicalSkills,
}

export default experienceData