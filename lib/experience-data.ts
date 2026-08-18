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
    title: "Chief Technology Officer",
    company: "CelaHealthcare Inc.",
    date: "May 2025 - Present",
    description: [
      "Senior Software Engineer and primary inventor of patented healthcare application technology.",
      "Administrative leader for technical team including 3 developers, data engineer, and project manager.",
    ],
    skills: ["Technical Leadership", "Healthcare Technology", "Software Engineering", "Team Management"],
  },
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

/* ---------- Technical Skills (used on About and Work pages) ---------- */
export const technicalSkills: Record<string, string[]> = {
  "Front End": [
    "TypeScript",
    "Rust",
    "NextJS",
    "Astro",
    "Svelte",
    "React Hooks + Context API",
    "JavaScript",
    "D3",
    "HeyGen",
    "Shadcn/ui",
    "TailwindCSS",
    "ChakraUI",
    "v0",
    "Redux",
    "Google Maps Platform",
    "React Native",
    "Swift",
    "NextAuth",
    "Clerk Auth",
  ],
  "Back End": [
    "PostgreSQL",
    "Vercel Serverless Functions",
    "Edge Functions",
    "MongoDB",
    "MySQL",
    "Prisma",
    "Supabase",
    "GraphQL",
    "Firebase",
    "Redis",
    "Python",
    "FastAPI",
    "DynamoDB",
    "Amazon RDS",
  ],
  Deployment: [
    "Vercel Platform",
    "Github Actions",
    "Github Apps",
    "Vercel CLI",
    "AWS CLI",
    "Deploy Hooks",
    "Vercel REST API",
    "Tauri",
    "Docker",
    "Electron",
    "Heroku",
    "DigitalOcean",
    "AWS: EC2",
    "AWS Lambda Functions",
    "Google Cloud Functions",
    "Amazon Bedrock",
    "Amazon SageMaker",
  ],
  DevOps: [
    "Turbopack",
    "Turborepo",
    "Azure DevOps Integration",
    "Observability Tools",
    "Trigger.dev",
    "Datadog",
    "Artillery.io",
    "TDD Prompt Engineering",
    "Spec-driven Development",
    "Critical-CSS",
    "React Suspense",
    "NGINX",
    "Open-Source LLM Development",
  ],
}

/* ---------- Skill hover descriptions (shown as tooltips on skill badges) ---------- */
export const skillDescriptions: Record<string, string> = {
  // Front End
  TypeScript: "Strongly typed superset of JavaScript that catches errors in the editor before the code runs.",
  Rust: "Memory-safe systems language with C-level performance — powers WASM modules and modern front-end tooling.",
  NextJS: "The React framework for the web — App Router, server rendering, streaming, and API routes in one package.",
  Astro: "Web framework for content-driven sites that ships zero JavaScript by default and hydrates only interactive islands.",
  Svelte: "Compiler-based UI framework that turns declarative components into minimal, fast DOM-updating JavaScript.",
  "React Hooks + Context API": "React's built-in primitives for stateful logic and passing data through the tree without prop drilling.",
  JavaScript: "The scripting language of the web — the baseline for everything browser-side.",
  D3: "The JavaScript library for bespoke, data-driven visualization beyond fixed chart types.",
  HeyGen: "AI video API for avatar-presented video generation and real-time interactive LiveAvatars over WebRTC.",
  "Shadcn/ui": "Accessible, customizable components you copy into your project and own outright, built on Radix and Tailwind.",
  TailwindCSS: "Utility-first CSS framework for composing designs directly in markup from a constrained design scale.",
  ChakraUI: "Accessible React component system with style props and a themeable design-token layer.",
  v0: "Vercel's agentic AI app builder — generates deployable React/Next.js UI from a prompt, screenshot, or sketch.",
  Redux: "Predictable state container with a centralized store, explicit actions, and time-travel debugging.",
  "Google Maps Platform": "Google's mapping, routing, and Places APIs for location-aware features and geospatial overlays.",
  "React Native": "Framework for building genuinely native iOS and Android apps with the React component model.",
  Swift: "Apple's language for iOS and macOS — safe, fast, and expressive, with SwiftUI for declarative interfaces.",
  NextAuth: "Open-source authentication for the web — OAuth providers, passwordless, and session management (now Auth.js).",
  "Clerk Auth": "Drop-in user management platform — sign-in components, sessions, MFA, and B2B multi-tenancy handled for you.",
  // Back End
  PostgreSQL: "The world's most advanced open-source relational database — the default system of record.",
  "Vercel Serverless Functions": "On-demand Node.js compute that scales automatically with no servers to provision.",
  "Edge Functions": "Lightweight V8 functions running at the network edge, close to the user, with near-zero cold starts.",
  MongoDB: "Document database for flexible, evolving schemas with the querying and indexing you need.",
  MySQL: "The world's most popular open-source database — a mature relational engine for high-read web workloads.",
  Prisma: "Next-generation TypeScript ORM — declarative schema, type-safe generated client, and versioned migrations.",
  Supabase: "Open-source Firebase alternative — hosted Postgres with instant APIs, auth, storage, and realtime.",
  GraphQL: "Query language for APIs letting clients request exactly the fields they need from one typed schema.",
  Firebase: "Google's app platform — Firestore, authentication, functions, and push notifications out of the box.",
  Redis: "In-memory data store for caching, sessions, rate limiting, and pub/sub with sub-millisecond responses.",
  Python: "The lingua franca of data and machine learning — pipelines, scripting, and model services.",
  FastAPI: "High-performance Python API framework with automatic OpenAPI docs and Pydantic validation.",
  DynamoDB: "Serverless, fully managed NoSQL database with single-digit millisecond performance at any scale.",
  "Amazon RDS": "Managed relational databases on AWS — automated provisioning, backups, patching, and failover.",
  // Deployment
  "Vercel Platform": "The frontend cloud — Git-connected builds, preview deployments per branch, and a global edge network.",
  "Github Actions": "Event-driven CI/CD workflows that live right in the repository, with a marketplace of reusable actions.",
  "Github Apps": "First-class GitHub integrations with fine-grained permissions, webhooks, and their own identity.",
  "Vercel CLI": "Command-line deploys, environment variable management, and local development against the Vercel platform.",
  "AWS CLI": "Unified command-line tool for managing AWS services and gluing them into scripts and CI pipelines.",
  "Deploy Hooks": "Unique URLs that trigger a new deployment on an HTTP POST — no git push required.",
  "Vercel REST API": "Programmatic access to projects, deployments, domains, environment variables, and logs.",
  Tauri: "Tiny, fast desktop and mobile binaries pairing a Rust backend with the OS's native webview.",
  Docker: "Containers — isolated, portable environments that behave the same everywhere, from local dev to production.",
  Electron: "Cross-platform desktop apps built with web technologies, bundling Chromium and Node.js.",
  Heroku: "Push-to-deploy platform as a service — builds, runs, and scales apps via buildpacks and add-ons.",
  DigitalOcean: "Developer-focused cloud infrastructure — Droplets, managed databases, and flat, predictable pricing.",
  "AWS: EC2": "Secure, resizable virtual machines with full control over OS, networking, and scaling groups.",
  "AWS Lambda Functions": "Event-driven functions that scale automatically and bill per millisecond — zero idle cost.",
  "Google Cloud Functions": "Pay-as-you-go functions-as-a-service connecting GCP services with event-driven code.",
  "Amazon Bedrock": "Managed access to leading foundation models through a single API, with AWS security and governance.",
  "Amazon SageMaker": "Fully managed service to build, train, and deploy machine learning models at scale on AWS.",
  // DevOps
  Turbopack: "Rust-based incremental bundler that never does the same work twice — the default dev bundler in Next.js.",
  Turborepo: "High-performance build system for JS/TS monorepos — task orchestration with local and remote caching.",
  "Azure DevOps Integration": "Microsoft's suite for boards, repos, pipelines, and enterprise CI/CD traceability.",
  "Observability Tools": "Logs, metrics, and traces that let you ask new questions of production behavior without shipping new code.",
  "Trigger.dev": "Open-source background jobs and AI agent framework for TypeScript — durable workflows as plain async code.",
  Datadog: "Unified monitoring for cloud applications — infrastructure metrics, APM traces, logs, and alerting in one place.",
  "Artillery.io": "Load testing for HTTP, GraphQL, WebSocket, and full browser flows, with Web Vitals per virtual user.",
  "TDD Prompt Engineering": "Test-first discipline for AI-assisted development — the failing test, not the reviewer, gates the merge.",
  "Spec-driven Development": "An explicit written specification as the source of truth driving implementation, tests, and AI agents.",
  "Critical-CSS": "Extracting and inlining above-the-fold styles so first paint isn't blocked by the full stylesheet.",
  "React Suspense": "Declarative loading boundaries enabling streaming SSR and coordinated loading states.",
  NGINX: "High-performance HTTP server, reverse proxy, load balancer, and TLS terminator.",
  "Open-Source LLM Development": "Building with open model weights — Llama, Mistral, Qwen — via Ollama, vLLM, and the Hugging Face ecosystem.",
}

/* ---------- Default export for convenience ---------- */
const experienceData = {
  professionalExperience,
  education,
  technicalSkills,
}

export default experienceData
