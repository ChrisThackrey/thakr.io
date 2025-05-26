"use client"

import { PageTransition } from "@/components/page-transition"
import { Timeline } from "@/components/timeline"
import { PageBackground } from "@/components/page-background"
import { SectionTitle } from "@/components/section-title"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BookingCTA } from "@/components/booking-cta"

export default function WorkPageClient() {
  const workItems = [
    {
      title: "Principal Software Architect",
      company: "Silver Bow Technology Group",
      date: "2025",
      description: [
        'Lead software engineering team and built the core AI functionality for a "version control for reasoning" dev tool - providing AI-driven code-generation, prompt enhancement, architecture strategy, as well as project planning and security features.',
      ],
      skills: ["AI", "Code Generation", "Architecture", "Team Leadership"],
    },
    {
      title: "Software Engineer",
      company: "Black Flag Design",
      date: "2024-2025",
      description: [
        "Contributed full feature code across all five projects in development, including leading the development of Unbound, a meeting to feature codegen application and internal dev tool that wrote AI-generated feature Pull Requests.",
        "Researched, scripted, and hosted a podcast series on AI coding trends, Vercelʼs development ecosystem and tech trends.",
      ],
      skills: ["AI", "Next.js", "Vercel", "Full-Stack Development"],
    },
    {
      title: "National Center for Education and the Economy (NCEE)",
      company: "Project",
      date: "2024",
      description: [
        "AI teaching application to join or host meeting rooms with a multiplayer AI chat and latest deep research enabled.",
        "Implemented a multiplayer AI chat that responds to all participants with Stream Chat API, OpenAI SDK, and Langgraph.",
        "Multi-tenant architecture deployed to multiple school districts with a custom automated AWS and Docker admin tool.",
        "Implemented templating system to provide custom user prompts and room variables for better AI context and responses.",
      ],
      skills: ["Next.js", "Stream Chat API", "OpenAI SDK", "Langgraph", "AWS", "Docker"],
    },
    {
      title: "Unbound - AI Repository Code Generation Application",
      company: "Project",
      date: "2024",
      description: [
        "Generate a pull request for new feature code for any repository and deploy to Vercel from a transcript or meeting.",
        "Connects to repositories using Octokit API and vectorizes the codebase to a Supabase DB for performing similarity searches on the embedded file contents.",
        "Ingests the transcript of a meeting into a prompt call made to either the OpenAI API or Anthropic API to find relevant files and then implement code changes on a new PR branch with a client-side diff view screen to the PR branch to Vercel.",
        "Implemented custom node graph of the entire repository history to visualize every code change made using React Flow.",
      ],
      skills: ["Octokit API", "Supabase", "OpenAI API", "Anthropic API", "React Flow", "Vercel"],
    },
    {
      title: "Technosylva Wildfire Risk Analyst",
      company: "Project",
      date: "2023",
      description: [
        "Wildfire Analyst is a cloud-based SaaS offering that provides on-demand wildfire spread prediction capabilities to support operational response.",
        "Implemented hexagon geo-spatial system with Uber H3 and a custom H3-to-D3 transition layer algorithm for UI interactivity.",
        "Self-hosted OpenAI models on a secure Azure backend to make safe API calls to private data.",
        "Forecast funnel feature that generated AI-driven risk assessment reports that respond to a timeline of mapped events.",
      ],
      skills: ["Uber H3", "D3", "Azure", "OpenAI", "SaaS", "Geo-spatial"],
    },
    {
      title: "Lineage Final Expense Insurance CRM Application",
      company: "Project",
      date: "2023",
      description: [
        "Final expense CRM management app and tool for handling clients and leads, currently deployed with more than 200 active users.",
        "Integrated Google maps to view leads by geo-spatial clusters and advanced analytics screen with reactive Nivo Charts.",
        "Finished Extract, Transform, Load (ETL) process from legacy SQL backend into new Supabase DB connections.",
      ],
      skills: ["Google Maps", "Nivo Charts", "Supabase", "ETL", "CRM"],
    },
    {
      title: "Lead Designer",
      company: "Gianni Ranaulo Design",
      date: "2016",
      description: ["Lead designer for architectural projects in Dubai, UAE."],
      skills: ["Design", "Architecture", "Project Management"],
    },
    {
      title: "Lead Designer",
      company: "Xuberance Design",
      date: "2013-2015",
      description: ["Lead designer for architectural projects in Shanghai, China."],
      skills: ["Design", "Architecture", "Project Management"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <PageTransition>
      <PageBackground />
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <SectionTitle as="h1" className="mb-6">
            Work Experience
          </SectionTitle>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl leading-relaxed">
            My professional journey includes roles in software engineering, architecture, and design. Below is a
            comprehensive timeline of my work experience and notable projects.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-8">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-border/50 shadow-sm bg-background/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <Timeline items={workItems} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <Card className="overflow-hidden border-border/50 shadow-sm bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">Skills & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Frontend Development</h3>
                    <p className="text-sm text-muted-foreground">
                      React, Next.js, TypeScript, Tailwind CSS, Framer Motion
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">AI & Machine Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      OpenAI API, Anthropic API, LangGraph, Vector Databases, RAG
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Backend Development</h3>
                    <p className="text-sm text-muted-foreground">Node.js, Express, Supabase, PostgreSQL, AWS</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Architecture</h3>
                    <p className="text-sm text-muted-foreground">
                      System Design, Microservices, API Design, Multi-tenant Systems
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">DevOps</h3>
                    <p className="text-sm text-muted-foreground">Docker, CI/CD, Vercel, AWS, Azure</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Design</h3>
                    <p className="text-sm text-muted-foreground">UI/UX, Figma, Architecture, 3D Modeling</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      <BookingCTA />
    </PageTransition>
  )
}
