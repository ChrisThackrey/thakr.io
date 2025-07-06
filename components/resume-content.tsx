"use client"

import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react"

export function ResumeContent() {
  return (
    <div className="resume-content">
      {/* Header Section */}
      <div className="text-center mb-6 print:mb-2">
        <h1 className="text-3xl font-bold mb-2 print:text-2xl print:mb-1">Chris Thackrey</h1>
        <h2 className="text-xl font-semibold text-muted-foreground mb-3 print:text-lg print:mb-2">
          Full-Stack Software Engineer
        </h2>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm print:gap-2 print:text-xs">
          <span className="flex items-center gap-1">
            <Phone className="h-4 w-4 print:hidden" />
            (707) 319-3306
          </span>
          <span className="print:hidden">|</span>
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4 print:hidden" />
            c.r.thackrey@gmail.com
          </span>
          <span className="print:hidden">|</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4 print:hidden" />
            San Antonio, TX
          </span>
        </div>
        
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm print:gap-2 print:text-xs">
          <a href="http://thakr.io" className="flex items-center gap-1 text-primary hover:underline print:text-black">
            <Globe className="h-4 w-4 print:hidden" />
            thakr.io
          </a>
          <span className="print:hidden">|</span>
          <a href="http://github.com/ChrisThackrey" className="flex items-center gap-1 text-primary hover:underline print:text-black">
            <Github className="h-4 w-4 print:hidden" />
            github.com/ChrisThackrey
          </a>
          <span className="print:hidden">|</span>
          <a href="http://linkedin.com/in/chris-thackrey-015" className="flex items-center gap-1 text-primary hover:underline print:text-black">
            <Linkedin className="h-4 w-4 print:hidden" />
            linkedin.com/in/chris-thackrey-015
          </a>
        </div>
      </div>

      {/* Technical Skills Section */}
      <section className="mb-8 print:mb-4">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2 print:text-lg print:mb-2 print:border-black">
          Technical Skills
        </h2>
        <div className="space-y-2 print:space-y-1">
          <div className="flex flex-col sm:flex-row print:flex-row">
            <span className="font-semibold min-w-[100px] print:min-w-[80px]">Front End:</span>
            <span className="text-sm print:text-xs">TypeScript, NextJS, Astro, Svelte, React Hooks + Context API, Redux, JavaScript, D3, Shadcn/ui, TailwindCSS, ChakraUI, v0</span>
          </div>
          <div className="flex flex-col sm:flex-row print:flex-row">
            <span className="font-semibold min-w-[100px] print:min-w-[80px]">Back End:</span>
            <span className="text-sm print:text-xs">Vercel Serverless Functions, Edge Functions, GraphQL, MongoDB, MySQL, Prisma, Supabase, Firebase, Redis, Python</span>
          </div>
          <div className="flex flex-col sm:flex-row print:flex-row">
            <span className="font-semibold min-w-[100px] print:min-w-[80px]">Deployment:</span>
            <span className="text-sm print:text-xs">Vercel Platform, Github Actions, Github Apps, Vercel CLI, Deploy Hooks, Vercel REST API, Docker, Heroku, DigitalOcean, Electron, AWS: EC2, AWS Lambda Functions, Google Cloud Functions</span>
          </div>
          <div className="flex flex-col sm:flex-row print:flex-row">
            <span className="font-semibold min-w-[100px] print:min-w-[80px]">DevOps:</span>
            <span className="text-sm print:text-xs">Turbopack, Turborepo, Azure DevOps Integration, Observability Tools, Trigger.dev, Datadog, Artillery.io, TDD prompt engineering, Critical-CSS, React-Suspense, NGINX</span>
          </div>
        </div>
      </section>

      {/* Software Engineering Work Section */}
      <section className="mb-8 print:mb-4">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2 print:text-lg print:mb-2 print:border-black">
          Software Engineering Work
        </h2>
        
        <div className="space-y-6 print:space-y-3">
          {/* Rivendell */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              Rivendell - AI Development and Research Tool
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              AI development tool that functions both internally for the company and externally for clients as &quot;version control for reasoning&quot;.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Implemented a monte-carlo algorithm to run large batches of prompt calls in parallel to various large-language AI models (llms), providing more deterministic outcomes by improving reliable code metrics such as compute and readability.</li>
              <li>Configured OpenAI API and Anthropic API models to match relevant files and open a branch with a deployment in Vercel.</li>
              <li>Built a monte carlo visualizer with ThreeJS to visualise similar response clusters in 3d space.</li>
            </ul>
          </div>

          {/* AI Repository Code Generation */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              AI Repository Code Generation Application
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Led the development of a meeting-to-feature codegen application.</li>
              <li>Developed enhanced search capabilities on embedded file content in connected data repositories.</li>
              <li>Facilitated automation of code changes as new inputs are identified.</li>
              <li>Implemented detailed documentation capabilities for repository history.</li>
            </ul>
            <p className="text-xs text-muted-foreground italic mt-2 print:text-black">
              Subject to NDA. No further details are available.
            </p>
          </div>

          {/* Collegiate Pathways */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              Collegiate Pathways Application
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              AI-driven college planning application with chatbot assistance to combine together course-catalogue offerings from multiple higher-level learning institutions, including major college curriculums, into a full degree plan that satisfies the requirements for any field of study.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Features fully dynamic components generated using custom API calls to AI in real-time.</li>
              <li>Implemented a chatbot using OpenAI with a unique persona of an academic counselor.</li>
              <li>The fully-generated degree plan outline leveraged AI prompted to accomodate remote learning, schedule planning around any on-site learning at multiple locations, and account for pre-requisites that must be taken in sequential order.</li>
            </ul>
          </div>

          {/* AI Applications */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              AI Applications for National Not-for-Profit Education Research Organization*
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              AI teaching application featuring a multiplayer AI chat and advanced deep research enabled.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Implemented interactive AI communication tools.</li>
              <li>Deployed a bespoke multi-tenant architecture implementation.</li>
              <li>Designed and implemented interactive interface templates to facilitate AI context and responses.</li>
            </ul>
          </div>

          {/* Wildfire Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              AI Analysis Tools For International Wildfire Science and Technology Company*
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              Cloud-based SaaS offering on-demand wildfire spread prediction capabilities to support operational response.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Implemented unique systems to improve UI interactivity.</li>
              <li>Utilized secured backends to make safe API calls to private data from public sources.</li>
              <li>Created AI-driven assessment tools and forecast features to improve event response times for 20,000+ incidents per year.</li>
            </ul>
          </div>

          {/* CRM App */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              CRM Management App to Handle Insurance Clients and Potential Leads* - 
              <a href="http://lineagecrm.com" className="text-primary hover:underline ml-1 print:text-black">lineagecrm.com</a>
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              Final expense CRM management app and tool for handling clients and leads, currently deployed with more than 200 active users.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Integrated applications to identify potential market opportunities.</li>
              <li>Completed Extract, Transform, Load (ETL) process from legacy backend into new database connections.</li>
            </ul>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4 italic print:text-black">
          *Subject to NDA. No further details are available.
        </p>
      </section>

      {/* Professional Experience Section */}
      <section className="mb-8 print:mb-4">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2 print:text-lg print:mb-2 print:border-black">
          Professional Experience
        </h2>
        
        <div className="space-y-4 print:space-y-2">
          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Principal Software Architect, Silver Bow Technology Group — 2025
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2 print:text-xs print:mt-1">
              <li>Lead software engineering team and built the core AI functionality for a &quot;version control for reasoning&quot; dev tool providing AI-driven code-generation, prompt enhancement, architecture strategy, as well as project planning and security features.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Freelance / Contract Software Engineering, Self-Employed / Various Clients — 2024-2025
            </h3>
            <p className="text-sm text-muted-foreground mt-1 print:text-xs print:text-black">
              Various Engagements
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2 print:text-xs print:mt-1">
              <li>Provided full-stack development services for various clients, focusing on AI integration, web application development, and data solutions.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Software Engineer, Black Flag Design — 2024-2025
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2 print:text-xs print:mt-1">
              <li>Contributed code across five projects in simultaneous development, including Lead Developer of an AI codegen application and internal dev tool, subject to a signed NDA.</li>
              <li>Led, scripted, and hosted the &apos;AI DIY&apos; podcast series on AI coding trends, Vercel&apos;s ecosystem and events in the tech industry.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Lead Designer, Gianni Ranaulo Design, Dubai, UAE — 2016
            </h3>
          </div>

          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Lead Designer, Xuberance Design, Shanghai, China — 2013-2015
            </h3>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-8 print:mb-4">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2 print:text-lg print:mb-2 print:border-black">
          Education
        </h2>
        
        <div className="space-y-2 print:space-y-1 text-sm print:text-xs">
          <div><strong>Rust Developer Bootcamp</strong> — Learned Rust independently with Certificate of Completion — 2022</div>
          <div><strong>AlgoExpert.io</strong> — Certificate of Completion for solving 100 technical interview questions — 2022</div>
          <div><strong>Hack Reactor, Austin, Texas</strong> — Graduated March 2021</div>
          <div><strong>Gnomon School of Visual Effects, Los Angeles, California</strong> — Studied computer animation, computer programming — 2017-2018</div>
          <div><strong>Southern California Institute of Architecture, Los Angeles, California</strong> — Completed 35 hours towards Masters degree in Architecture, 3.5/4.0 GPA — 2016-2017</div>
          <div><strong>Texas A&M University, Bachelor of Science - Environmental Design</strong> — Graduated Cum Laude 3.5/4.0 GPA — 2015</div>
        </div>
      </section>
    </div>
  )
}
