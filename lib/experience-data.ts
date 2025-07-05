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
    title: "Principal Software Architect",
    date: "2025",
    company: "Silver Bow Technology Group",
    description: [
      'Lead software engineering team and built the core AI functionality for a "version control for reasoning" dev tool providing AI-driven code-generation, prompt enhancement, architecture strategy, as well as project planning and security features.',
    ],
    skills: ["AI", "Code Generation", "Architecture Strategy", "Team Leadership", "Project Planning", "Security"],
    projects: [
      {
        title: "Rivendell - AI Development and Research Tool",
        description: [
          "Implemented a monte-carlo algorithm to run large batches of prompt calls in parallel to various large-language AI models (llms), providing more deterministic outcomes by improving reliable code metrics such as compute and readability.",
          "Configured OpenAI API and Anthropic API models to match relevant files and open a branch with a deployment in Vercel.",
          "Built a monte carlo visualizer with ThreeJS to visualise similar response clusters in 3d space.",
        ],
        skills: [
          "Monte Carlo Algorithm",
          "LLMs",
          "OpenAI API",
          "Anthropic API",
          "Vercel",
          "ThreeJS",
          "Data Visualization",
        ],
      },
    ],
  },
  {
    title: "Software Engineer",
    date: "2024-2025",
    company: "Black Flag Design",
    description: [
      "Contributed code across five projects in simultaneous development, including Lead Developer of an AI codegen application and internal dev tool, subject to a signed NDA.",
      "Led, scripted, and hosted the ‘AI DIY’ podcast series on AI coding trends, Vercel’s ecosystem and events in the tech industry.",
    ],
    skills: ["Full-Stack Development", "AI", "Vercel", "Podcasting", "NDA Projects"],
  },
  {
    title: "Freelance / Contract Software Engineering",
    date: "Various Engagements",
    company: "Various Clients (NDA)",
    description: [
      "Delivered full-stack software solutions for multiple clients, focusing on AI-powered applications, data analysis tools, and CRM systems.",
      "Projects are subject to Non-Disclosure Agreements; details are generalized.",
    ],
    skills: ["Full-Stack Development", "AI Integration", "SaaS", "CRM", "ETL", "Client Management"],
    projects: [
      {
        title: "AI Applications for National Not-for-Profit Education Research Organization*",
        description: [
          "Implemented interactive AI communication tools.",
          "Deployed a bespoke multi-tenant architecture implementation.",
          "Designed and implemented interactive interface templates to facilitate AI context and responses.",
        ],
        skills: ["AI", "Multi-tenancy", "Interactive UI"],
      },
      {
        title: "AI Analysis Tools For International Wildfire Science and Technology Company*",
        description: [
          "Implemented unique systems to improve UI interactivity.",
          "Utilized secured backends to make safe API calls to private data from public sources.",
          "Created AI-driven assessment tools and forecast features to improve event response times for 20,000+ incidents per year.",
        ],
        skills: ["SaaS", "AI", "Data Security", "Forecasting"],
      },
      {
        title: "CRM Management App to Handle Insurance Clients and Potential Leads*",
        description: [
          "Integrated applications to identify potential market opportunities.",
          "Completed Extract, Transform, Load (ETL) process from legacy backend into new database connections.",
        ],
        skills: ["CRM", "ETL", "Data Integration"],
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

export const education: TimelineItemData[] = [
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
