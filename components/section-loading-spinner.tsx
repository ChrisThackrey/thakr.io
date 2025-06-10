"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface SectionLoadingSpinnerProps {
  section?: "blog" | "projects" | "architecture" | "about" | "work"
}

export function SectionLoadingSpinner({ section = "blog" }: SectionLoadingSpinnerProps) {
  const prefersReducedMotion = useReducedMotion()

  const sectionColors = {
    blog: "text-blue-500",
    projects: "text-green-500",
    architecture: "text-purple-500",
    about: "text-orange-500",
    work: "text-indigo-500",
  }

  const color = sectionColors[section]

  if (prefersReducedMotion) {
    return (
      <div className={`${color} text-center`}>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
        <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <motion.div
        className={`inline-block ${color}`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-2 text-sm text-muted-foreground"
      >
        Loading {section} content...
      </motion.p>
    </div>
  )
}
