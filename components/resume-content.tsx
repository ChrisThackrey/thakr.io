"use client"

import type React from "react"
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function ResumeContent() {
  const { toast } = useToast()
  const router = useRouter()

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    const email = "c.r.thackrey@gmail.com"

    try {
      await navigator.clipboard.writeText(email)
      toast({
        title: `My Email: '${email}' Copied to Clipboard!`,
        duration: 3000,
      })

      // Redirect to contact page after a short delay
      setTimeout(() => {
        router.push("/contact")
      }, 500)
    } catch (err) {
      console.error("Failed to copy email:", err)
      toast({
        title: "Failed to copy email",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }
  return (
    <div className="resume-content">
      {/* Header Section */}
      <div className="text-center mb-6 print:mb-2">
        <h1 className="text-3xl font-bold mb-2 print:text-2xl print:mb-1">Chris Thackrey</h1>
        <h2 className="text-xl font-semibold text-muted-foreground mb-3 print:text-lg print:mb-2">
          Senior Software Engineer
        </h2>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm print:gap-2 print:text-xs">
          <a
            href="tel:+17073193306"
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 print:hidden" />
            (707) 319-3306
          </a>
          <span className="print:hidden">|</span>
          <button
            onClick={handleEmailClick}
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <Mail className="h-4 w-4 print:hidden" />
            c.r.thackrey@gmail.com
          </button>
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

      {/* Summary Section */}
      <section className="mb-8 print:mb-4">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2 print:text-lg print:mb-2 print:border-black">
          Summary
        </h2>
        <p className="text-sm leading-relaxed print:text-xs">
          Accomplished Full-Stack Software Engineer and CTO with a unique multidisciplinary background that bridges
          high-level design sensibilities with robust technical architecture. Expert in building scalable, AI-driven
          applications by leveraging deep systems thinking to translate complex business requirements into performant,
          elegant code. Proven leader with a track record of directing engineering teams through challenging
          implementations, applying innovative technical strategies to deliver reliable, user-centric solutions. Adept
          at navigating intricate infrastructure, from automated multi-tenant systems to sophisticated spatial data
          visualizations, with a relentless focus on quality, security, and strategic project execution.
        </p>
      </section>

      {/* Technical Skills Section */}
      <section className="mb-8 print:mb-4">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2 print:text-lg print:mb-2 print:border-black">
          Technical Skills
        </h2>
        <div className="space-y-2 print:space-y-1">
          <div className="flex flex-col sm:flex-row print:flex-row">
            <span className="font-semibold min-w-[100px] print:min-w-[80px]">Front End:</span>
            <span className="text-sm print:text-xs">TypeScript, NextJS, Astro, Svelte, React Hooks + Context API, Redux, JavaScript, D3, Shadcn/ui, TailwindCSS, ChakraUI, v0, HeyGen, Google Maps Platform, React Native, Swift</span>
          </div>
          <div className="flex flex-col sm:flex-row print:flex-row">
            <span className="font-semibold min-w-[100px] print:min-w-[80px]">Back End:</span>
            <span className="text-sm print:text-xs">Vercel Serverless Functions, Edge Functions, GraphQL, MongoDB, MySQL, Prisma, Supabase, Firebase, Redis, Python, FastAPI, DynamoDB, Amazon RDS</span>
          </div>
          <div className="flex flex-col sm:flex-row print:flex-row">
            <span className="font-semibold min-w-[100px] print:min-w-[80px]">Deploy:</span>
            <span className="text-sm print:text-xs">Vercel Platform, Github Actions, Github Apps, Vercel CLI, Deploy Hooks, Vercel REST API, Docker, Heroku, DigitalOcean, Electron, AWS: EC2, AWS Lambda Functions, Google Cloud Functions, Amazon Bedrock, Amazon Sagemaker, Clerk Auth</span>
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
              <span className="text-sm font-normal text-muted-foreground ml-2 print:text-xs print:text-black">March 2025</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              AI development tool that functions both internally for the company and externally for clients as &quot;version control for reasoning&quot;.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Implemented a monte-carlo algorithm to run large batches of prompt calls in parallel to various large-language AI models (llms), providing more deterministic outcomes by improving reliable code metrics such as compute and readability.</li>
              <li>Engineered LLM-as-judge evaluation pipeline scoring every solution across six quality axes and classifying outputs recommended, viable, or problematic.</li>
              <li>Generated project roadmaps automatically by ranking highest-scoring reasoning steps into five-phase Gantt timelines with milestone markers.</li>
            </ul>
          </div>

          {/* AI Applications */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              AI Applications for National Education Research Organization*
              <span className="text-sm font-normal text-muted-foreground ml-2 print:text-xs print:text-black">January 2024</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              AI teaching application featuring a multiplayer AI chat and advanced deep research enabled.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Engineered a multiplayer AI chat system to route messages across multiple specialized bot variants over authenticated connections, ensuring real-time interactivity while maintaining participant anonymization.</li>
              <li>Created a multi-tenant architecture solution for project deployments by automating tenant provisioning across 27 idempotent stages with persisted state, ensuring safe, resumable infrastructure deployments of dedicated EC2, Supabase, and S3 resources per district.</li>
              <li>Designed and implemented interactive interface templates to facilitate AI context and responses.</li>
              <li>Scored AI outputs across multiple LangSmith evaluators spanning correctness, groundedness, document relevance, schema validity, and processing time.</li>
            </ul>
          </div>

          {/* Wildfire Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              AI Analysis Tools For International Wildfire Science and Technology Company*
              <span className="text-sm font-normal text-muted-foreground ml-2 print:text-xs print:text-black">October 2024</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              Cloud-based SaaS offering on-demand wildfire spread prediction capabilities to support operational response.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Scaled Uber&apos;s H3 hex resolution across seven zoom tiers, over-generating twenty-five percent beyond the viewport to effectively erase edge-of-screen rendering gaps.</li>
              <li>Utilized secured Azure backends to make safe API calls to private data from public sources.</li>
              <li>Created AI-driven assessment tools and forecast features to improve event response times for 20,000+ incidents per year.</li>
            </ul>
          </div>

          {/* CRM App */}
          <div>
            <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">
              CRM Management App to Handle Insurance Clients and Leads -
              <a href="https://lineagecrm.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1 print:text-black">lineagecrm.com</a>
              <span className="text-sm font-normal text-muted-foreground ml-2 print:text-xs print:text-black">January 2024</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-2 print:text-xs print:text-black">
              Final expense CRM management app and tool for handling clients and leads, currently deployed with more than 200 active users.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
              <li>Powered lead search with a materialized view denormalizing four joined tables, enabling high-performance multi-dimensional filtering across status, source, and location.</li>
              <li>Handled Twilio call lifecycle events with matching teardown, driving mute, timers, and reconnection state in a draggable dialer.</li>
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
              Chief Technology Officer, CelaHealthcare Inc. — May 2025 - Present
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2 print:text-xs print:mt-1">
              <li>Senior Software Engineer and primary inventor of patented healthcare application technology.</li>
              <li>Administrative leader for technical team including 3 developers, data engineer, and project manager.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Principal Software Architect, Silver Bow Technology Group — March 2025 - July 2025
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2 print:text-xs print:mt-1">
              <li>Lead software engineering team and built the core AI functionality for a &quot;version control for reasoning&quot; dev tool providing AI-driven code-generation, prompt enhancement, architecture strategy, as well as project planning and security features.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Software Engineer, Black Flag Design — January 2024 - March 2025
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2 print:text-xs print:mt-1">
              <li>Contributed code across five projects in simultaneous development, including Lead Developer of an AI codegen application and internal dev tool, subject to a signed NDA.</li>
              <li>Organized, scripted, and hosted the &apos;AI DIY&apos; podcast series on AI coding trends and events in the tech industry.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Lead Designer, Gianni Ranaulo Design, Dubai, UAE — April 2015 - February 2016
            </h3>
          </div>

          <div>
            <h3 className="text-lg font-semibold print:text-base">
              Lead Designer, Xuberance Design, Shanghai, China — August 2013 - April 2015
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
          <div><strong>Rust Developer Bootcamp</strong> — Learned Rust independently with Certificate of Completion — November 2022</div>
          <div><strong>AlgoExpert.io</strong> — Certificate of Completion for solving 100 technical interview questions — May 2025</div>
          <div><strong>Hack Reactor, Austin, Texas</strong> — Graduated March 2021</div>
          <div><strong>Gnomon School of Visual Effects, Los Angeles, California</strong> — Studied computer programming — April 2017 - February 2018</div>
          <div><strong>Southern California Institute of Architecture, Los Angeles, California</strong> — Completed 35 hours towards Masters degree in Architecture, 3.5/4.0 GPA — January 2015 - April 2017</div>
          <div><strong>Texas A&M University, Bachelor of Science - Environmental Design</strong> — Graduated Cum Laude 3.5/4.0 GPA — May 2015</div>
        </div>
      </section>
    </div>
  )
}
