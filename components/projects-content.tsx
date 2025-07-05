"use client"

import { ProjectCard } from "@/components/project-card"
import { SectionTitle } from "@/components/section-title"
import { projectsData } from "@/lib/projects-data"
import { motion } from "framer-motion"

export default function ProjectsContent() {
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
    <motion.div
      className="container py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle>Projects</SectionTitle>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
        Here's a collection of my work, showcasing my skills in full-stack development, AI integration, and creating
        intuitive user experiences.
      </p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projectsData.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
