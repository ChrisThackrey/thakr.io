/**
 * Resume content, transcribed verbatim from public/Chris-Thackrey-Resume.pdf
 * (the authoritative document, also offered as a .docx download).
 *
 * Keep this file in sync with those two files whenever the resume changes.
 */

/**
 * A paragraph of text. Word applies condensed character spacing to a few
 * paragraphs so they fit their lines; those are expressed as objects with the
 * letter-spacing Word uses (in pt).
 *
 * A zero-width space (BREAK) marks a line-break opportunity the PDF uses but
 * browsers don't take on their own (Word breaks after a hyphen inside a word;
 * Chrome keeps the word whole). The renderer turns it into a <wbr>.
 */
export type Para = string | { text: string; letterSpacing: number }

/** Line-break opportunity marker inside a word; rendered as <wbr>. */
export const BREAK = "\u200B"

/** Word's "Condensed by 0.2pt" character spacing. */
const condensed = (text: string, letterSpacing = -0.2): Para => ({ text, letterSpacing })

export interface ContactLink {
  label: string
  href: string
}

export interface SkillGroup {
  label: string
  items: string
}

export interface ExperienceEntry {
  title: string
  dates: string
  company: string
  /** Company site, shown right-aligned on the company line as "Website: <label>". */
  website?: ContactLink
  /** Italic summary shown inside the shaded block under the company line. */
  description?: string
  bullets: Para[]
}

export interface ProjectEntry {
  title: string
  dates: string
  /** Project site, appended to the title as " | <label>". */
  website?: ContactLink
  /** Italic summary shown inside the shaded block under the title. */
  description: Para
  bullets: Para[]
}

export interface EducationEntry {
  institution: string
  detail: string
  /** Word's condensed character spacing for this line, in pt. */
  letterSpacing?: number
}

export const resume = {
  name: "CHRIS THACKREY",

  contact: {
    email: { label: "c.r.thackrey@gmail.com", href: "mailto:c.r.thackrey@gmail.com" },
    location: "San Antonio, TX",
    phone: "(707) 319-3306",
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/chris-thackrey-015/" },
    github: { label: "GitHub", href: "https://github.com/ChrisThackrey" },
    website: { label: "www.thakr.io", href: "/" },
  },

  tagline: "Software Engineer | Full Stack Developer | AI Engineering",

  summary:
    `Software Engineer and technology leader specializing in full-stack development, AI engineering, AI-powered applications, and scalable software architecture. Experienced designing and building production AI applications, intelligent chat systems, developer tools, and data-${BREAK}intensive platforms using TypeScript, React, Next.js, Python, PostgreSQL, cloud infrastructure, and large language model APIs. International professional experience spanning the United States, China, Dubai, and Finland, bringing cross-cultural perspective to technical collaboration and problem-solving.`,

  leadershipHighlights: [
    condensed("AI application development, technical problem-solving, and rapid adoption of emerging technologies; combines an architectural design background with full-stack engineering to create technically sophisticated applications with intuitive, visually polished user experiences."),
    "Translates complex technical requirements into practical software solutions, balancing system architecture, application performance, security, and user needs.",
    "Demonstrated ability to rapidly learn emerging technologies, evaluate new approaches, and apply them to solve complex engineering challenges and accelerate product development.",
    "Experienced leading cross functional teams to design, develop, and deploy innovative software solutions, interacting directly with executives, investors, and clients, translating complex technical challenges into logical concepts for diverse audiences.",
  ] satisfies Para[],

  technicalSkills: [
    { label: "Languages", items: "TypeScript, JavaScript, Python, PHP, Swift, Rust, SQL" },
    {
      label: "Front-End Development",
      items:
        "React, Next.js, React Native, Astro, Svelte, Redux, React Hooks, Context API, D3.js, React Three Fiber, React Flow, Tailwind CSS, Shadcn/ui, Chakra UI, Vuetify",
    },
    {
      label: "Back-End Development",
      items: "Node.js, FastAPI, Express, GraphQL, Vercel Serverless Functions, Edge Functions, REST APIs",
    },
    {
      label: "AI / Machine Learning",
      items:
        "OpenAI API, Anthropic API, GPT-4o, Claude, Amazon Bedrock, Amazon SageMaker, LLM-as-Judge Evaluation, Retrieval-Augmented Generation (RAG), Prompt Engineering, LangSmith, Vector Embeddings, AI Agent Systems",
    },
    {
      label: "Databases / Data Engineering",
      items: "PostgreSQL, Supabase, MySQL, MongoDB, DynamoDB, Amazon RDS, Redis, Prisma, pgvector, PL/pgSQL, JSONB",
    },
    {
      label: "Cloud / DevOps",
      items:
        "AWS EC2, AWS Lambda, Amazon S3, Route53, Vercel, Azure Static Web Apps, Google Cloud Functions, Docker, Heroku, DigitalOcean, GitHub Actions, NGINX, Turborepo, Turbopack",
    },
    {
      label: "Testing / Quality / Observability",
      items:
        "Vitest, Jest, Test-Driven Development (TDD), Zod, Sentry, Datadog, Artillery.io, Vercel Analytics, Harness Engineering",
    },
    {
      label: "Integrations / Tools",
      items:
        "Twilio Voice SDK, Google Calendar API, Google Drive API, Mapbox, Uber H3, WebSockets, Stream.io, Clerk Auth, GitHub Apps",
    },
  ] satisfies SkillGroup[],

  experience: [
    {
      title: "SENIOR SOFTWARE ENGINEER",
      dates: "MAY 2025 to PRESENT",
      company: "CelaHealthcare, Inc., College Station, TX",
      website: { label: "celahealthcare.com", href: "https://www.celahealthcare.com/" },
      description:
        "Hands-on Senior Software Engineer and CTO for healthcare technology startup, directing software strategy and architecture, AI engineering, application development, and technical execution to successfully deploy the HeroID interactive mobile app coordinating efforts of a multi-disciplinary team and the primary contributor to the patented healthcare application technology.",
      bullets: [
        "Manage a multidisciplinary technical team comprising developers, a data engineer, and a project manager, establishing development priorities and guiding complex technical implementations. Translate business objectives into scalable, secure, and user-focused software solutions, balancing product innovation with engineering quality.",
        "Establish and refine software engineering practices encompassing specification-driven development, testing, security, and technical documentation to support reliable product delivery. Drive research and development of proprietary healthcare application capabilities, applying emerging technologies and systems-level thinking to address complex technical challenges.",
      ],
    },
    {
      title: "AI SOFTWARE ENGINEER",
      dates: "MAR 2025 to JULY 2025",
      company: "Silver Bow Technology Group, Dallas, TX",
      website: { label: "silverbow.io", href: "https://silverbow.io/" },
      bullets: [
        "Led a software engineering team and developed core AI functionality for an AI-powered “version control for reasoning” development tool; architected AI-driven code generation, prompt enhancement, project planning, and security features; translated client requirements into technical architecture and software solutions.",
      ],
    },
    {
      title: "SOFTWARE ENGINEER",
      dates: "DEC 2023 to MAR 2025",
      company: "Black Flag Design",
      website: { label: "bfd.studio", href: "https://bfd.studio/" },
      description:
        "Contributed software engineering across five concurrently developed projects involving diverse technology stacks and programming languages. Served as Lead Developer for an AI code-generation application and internal development tools, subject to NDA.",
      bullets: [
        "Collaborated across project teams to deliver features, solve technical challenges, and support software development workflows; organized, scripted, and hosted the “AI DIY” podcast series covering AI coding trends and technology events.",
      ],
    },
  ] satisfies ExperienceEntry[],

  projects: [
    {
      title: "RIVENDELL - AI DEVELOPMENT AND RESEARCH TOOL",
      dates: "MAR 2025",
      description:
        "AI development and research platform functioning as “version control for reasoning,” supporting internal development and external client use. Engineered a Monte Carlo processing system that runs large batches of prompts against multiple large language models, improving the consistency of code evaluation metrics.",
      bullets: [
        `Built an LLM-as-Judge evaluation pipeline scoring solutions across six quality axes, classifying outputs as recommended, viable, or problematic. Developed semantic code search using PostgreSQL pgvector, 1,536-dimensional embeddings, IVFFlat cosine similarity, and language-filtered retrieval. Architected interactive 3D solution-space visualization using React Three Fiber, six-${BREAK}dimensional quality vectors, centroid clustering, and GPT-4o-assisted cluster labeling.`,
        condensed("Designed PostgreSQL schemas with 20+ PL/pgSQL functions and 21 indexes, including GIN, B-tree, and IVFFlat indexes. Implemented multi-stage JSON repair, provider-agnostic LLM abstractions, resumable batch processing, and automated code-file persistence. Established end-to-end type safety with 20+ Zod schemas and generated automated five-phase project roadmaps from ranked reasoning steps. Wrote 69 Vitest test cases covering services, components, and integration flows across embedding, storage, and retrieval."),
      ],
    },
    {
      title: "AI APPLICATION - NATIONAL CENTER ON EDUCATION AND THE ECONOMY (NCEE) | Subject to NDA",
      dates: "JAN 2024",
      description:
        condensed("AI teaching application featuring multiplayer AI chat, deep research, and role-specific user experiences. Engineered an AI chat system routing messages through a classifier to six specialized AI bots, supporting real-time interaction through authenticated WebSocket connections. Built authenticated WebSocket infrastructure, voice transcription workflows, chat-history token budgeting, and PDF transcript exports.", -0.15),
      bullets: [
        "Designed and implemented multi-tenant infrastructure provisioning across 27 idempotent stages, automating dedicated EC2, Supabase, S3, and Route53 resources for each district. Built retrieval-augmented AI workflows using Supabase pgvector, document embeddings, conversational query rephrasing, and source-aware citation handling. Developed AI evaluation workflows using six automated LangSmith evaluators measuring correctness, groundedness, document relevance, schema validity, and processing time.",
        "Implemented role-differentiated chat interfaces for teachers, leaders, and students, with responsive layouts and AI context-aware rendering. Developed deployment safeguards including persisted provisioning state, DNS verification, secret cleanup, failure classification, and resumable deployments.",
      ],
    },
    {
      title: "AI ANALYSIS TOOLS - INTERNATIONAL WILDFIRE SCIENCE & TECHNOLOGY CO. | Subject to NDA",
      dates: "OCT 2024",
      description:
        condensed("Cloud-based SaaS platform providing on-demand wildfire spread prediction and operational response analysis. Engineered specialized spatial visualization using trigonometric regular polygons to maintain uniform hexagon sizing across latitudes despite Mercator projection distortion."),
      bullets: [
        condensed("Implemented Uber H3 spatial indexing across seven zoom tiers, viewport overscan, off-screen culling, and optimized SVG rendering for large geographic datasets. Developed AI-driven assessment and forecast tools supporting response analysis for 20,000+ incidents annually."),
        "Built secured backend integrations for private data access and contributed to a TypeScript fire-weather API unifying federal weather and coordination-center outlooks. Optimized geographic data processing through caching, chunked GeoJSON ingestion, deferred serialization, and responsive interaction handling.",
      ],
    },
    {
      title: "LINEAGE CRM - INSURANCE CLIENT AND LEAD MANAGEMENT PLATFORM",
      website: { label: "lineagecrm.com", href: "https://www.lineagecrm.com/" },
      dates: "JAN 2024",
      description:
        "Full-stack CRM application for insurance clients and leads, deployed with more than 2,000 active users. Completed ETL migration from legacy backend systems into relational database structures, preserving referential integrity and supporting production data migration. Developed a four-stage CSV import wizard, duplicate detection, conflict tracking, and legacy data migration workflows.",
      bullets: [
        condensed("Built high-performance lead search using PostgreSQL materialized views, GIN-indexed full-text search, and multi-dimensional filtering across status, source, and location. Engineered an in-browser softphone using Twilio Voice SDK, including scoped access tokens, call lifecycle management, mute, timers, and reconnection state."),
        condensed("Implemented multi-tenant database security across 36 PostgreSQL tables and 65 row-level security policies. Built virtualized lead tables, WebGL map visualization, bulk editing, responsive analytics dashboards, and Google Calendar synchronization. Implemented production observability with Sentry tracing, session replay, and heatmap analytics."),
      ],
    },
  ] satisfies ProjectEntry[],

  education: [
    {
      institution: "Texas A&M University",
      detail: ", Bachelor of Science, Environmental Design | Cum Laude, GPA 3.5/4.0",
    },
    {
      institution: "Southern CA Institute of Architecture",
      detail: ", Los Angeles, CA | 35 hours toward Master’s Degree in Architecture, GPA 3.5/4.0",
    },
    { institution: "Gnomon School of Visual Effects", detail: " | Computer Programming Studies", letterSpacing: -0.2 },
    {
      institution: "Certificates of Completion:",
      detail: " Hack Reactor Coding Bootcamp | Rust Developer Bootcamp | AlgoExpert.io",
      letterSpacing: -0.2,
    },
  ] satisfies EducationEntry[],
}
