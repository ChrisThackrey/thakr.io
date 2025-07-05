"use client"

import { SectionTitle } from "@/components/section-title"
import { ProjectCard } from "@/components/project-card"
import { projectsData } from "@/lib/projects-data"
import { motion } from "framer-motion"

export function FeaturedProjectsSection() {
  const featuredProjects = projectsData.slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionTitle>Featured Projects</SectionTitle>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto text-center">
          A selection of my recent work. See all my projects on the dedicated projects page.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
