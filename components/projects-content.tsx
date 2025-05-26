"use client"

import { ProjectCard } from "@/components/project-card"
import { PageTransition } from "@/components/page-transition"
import { StaggeredChildren } from "@/components/staggered-children"
import { SectionTitle } from "@/components/section-title"
import { motion } from "framer-motion"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Define project categories
const categories = ["All", "Web", "AI", "Mobile", "UI/UX"]

// Define projects with their details
const projects = [
  {
    title: "AI Content Generator",
    description:
      "A tool that uses GPT-4 to generate blog posts, social media content, and more with advanced customization options.",
    tags: ["Next.js", "OpenAI API", "TypeScript", "AI"],
    demoUrl: "https://ai-content-generator.example.com",
    githubUrl: "https://github.com/username/ai-content-generator",
    category: "AI",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with Next.js and Tailwind CSS, featuring animations and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Web"],
    demoUrl: "https://portfolio.example.com",
    githubUrl: "https://github.com/username/portfolio",
    category: "Web",
  },
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, checkout, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Web"],
    demoUrl: "https://ecommerce.example.com",
    githubUrl: "https://github.com/username/ecommerce",
    category: "Web",
  },
  {
    title: "Weather App",
    description:
      "A weather application that shows current conditions and forecasts with beautiful visualizations and animations.",
    tags: ["React", "Weather API", "CSS", "Mobile"],
    demoUrl: "https://weather.example.com",
    githubUrl: "https://github.com/username/weather-app",
    category: "Mobile",
  },
  {
    title: "Task Manager",
    description:
      "A task management application with drag-and-drop functionality, reminders, and collaborative features.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS", "UI/UX"],
    demoUrl: "https://tasks.example.com",
    githubUrl: "https://github.com/username/task-manager",
    category: "UI/UX",
  },
  {
    title: "Recipe Finder",
    description:
      "An application that helps users find recipes based on ingredients they have, with filtering and saving options.",
    tags: ["React", "Recipe API", "CSS", "Mobile"],
    demoUrl: "https://recipes.example.com",
    githubUrl: "https://github.com/username/recipe-finder",
    category: "Mobile",
  },
]

export default function ProjectsContent() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory || project.tags.includes(activeCategory))

  return (
    <PageTransition>
      <div className="container py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 mb-12"
        >
          <SectionTitle>Projects</SectionTitle>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            A collection of software projects I've built, from web applications to AI tools. Each project represents a
            unique challenge and solution.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={cn(
                "px-4 py-2 text-sm cursor-pointer transition-all hover:shadow-sm",
                activeCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50",
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        <StaggeredChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          animation="slide-up"
          staggerDelay={0.05}
          childrenDelay={0.1}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </StaggeredChildren>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-muted-foreground text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
