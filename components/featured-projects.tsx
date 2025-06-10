"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { motion } from "framer-motion"

const featuredProjectsData = [
  {
    title: "AI Teaching Application",
    description: "Multiplayer AI chat application for education with meeting rooms and deep research capabilities.",
    tags: ["Next.js", "Stream Chat API", "OpenAI SDK", "Langgraph"],
    demoUrl: "#", // Replace with actual demo URL
    githubUrl: "#", // Replace with actual GitHub URL
  },
  {
    title: "Unbound",
    description: "AI Repository Code Generation Application that creates pull requests from meeting transcripts.",
    tags: ["Octokit API", "Supabase", "OpenAI API", "Anthropic API"],
    demoUrl: "#", // Replace with actual demo URL
    githubUrl: "#", // Replace with actual GitHub URL
  },
  {
    title: "Wildfire Risk Analyst",
    description: "Cloud-based SaaS for wildfire spread prediction with geo-spatial visualization.",
    tags: ["Uber H3", "D3", "Azure", "OpenAI"],
    demoUrl: "#", // Replace with actual demo URL
    githubUrl: "#", // Replace with actual GitHub URL
  },
]

export function FeaturedProjects() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.section
      className="py-16 md:py-24 bg-gradient-to-br from-sky-50 via-rose-50 to-violet-50 dark:from-sky-900/20 dark:via-rose-900/10 dark:to-violet-900/20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="bg-background/60 dark:bg-background/40 backdrop-blur-lg rounded-xl shadow-lg p-8 md:p-12"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 md:mb-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Featured Projects</h2>
              <div className="mt-2.5 h-1.5 w-20 bg-primary rounded-full" />
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
                A selection of my recent work and notable projects.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-6 sm:mt-0">
              <Link
                href="/projects"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center group whitespace-nowrap"
              >
                View All Projects
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProjectsData.map((project, index) => (
              // ProjectCard already has its own motion.div, so no need to wrap here with itemVariants
              // if ProjectCard's motion is whileInView. If it's a simple initial/animate, then
              // staggering from parent (this component) would be better.
              // Assuming ProjectCard handles its own entry animation triggered by whileInView.
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                demoUrl={project.demoUrl}
                githubUrl={project.githubUrl}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
