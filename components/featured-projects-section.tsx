"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProjectCard } from "@/components/project-card"

const featuredProjectsData = [
  {
    title: "AI Teaching Application",
    description: "Multiplayer AI chat application for education with meeting rooms and deep research capabilities.",
    tags: ["Next.js", "Stream Chat API", "OpenAI SDK", "Langgraph"],
    demoUrl: "#", // Replace with actual URL
    githubUrl: "#", // Replace with actual URL
  },
  {
    title: "Unbound",
    description: "AI Repository Code Generation Application that creates pull requests from meeting transcripts.",
    tags: ["Octokit API", "Supabase", "OpenAI API", "Anthropic API"],
    demoUrl: "#", // Replace with actual URL
    githubUrl: "#", // Replace with actual URL
  },
  {
    title: "Wildfire Risk Analyst",
    description: "Cloud-based SaaS for wildfire spread prediction with geo-spatial visualization.",
    tags: ["Uber H3", "D3.js", "Azure", "OpenAI"], // D3.js instead of D3 from image for clarity
    demoUrl: "#", // Replace with actual URL
    githubUrl: "#", // Replace with actual URL
  },
]

export function FeaturedProjectsSection() {
  return (
    <div className="pb-16 md:pb-24">
      <section className="container mx-auto max-w-6xl px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-sky-50 to-purple-50 dark:from-slate-900/70 dark:via-sky-900/70 dark:to-purple-900/70 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              Featured Projects
            </h2>
            <div className="mt-3 w-20 h-1.5 bg-gray-800 dark:bg-gray-200 rounded-full"></div>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              A selection of my recent work and notable projects.
            </p>
          </div>
          <Link
            href="/projects"
            className="mt-4 sm:mt-1 inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjectsData.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
