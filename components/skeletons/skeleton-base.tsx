"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface SkeletonBaseProps {
  className?: string
  section?: "blog" | "projects" | "architecture" | "about" | "work" | "home" | "booking"
  delay?: number
  style?: React.CSSProperties
  stagger?: number
  children?: React.ReactNode
}

export function SkeletonBase({ className, section = "blog", delay = 0, style, stagger, children }: SkeletonBaseProps) {
  const prefersReducedMotion = useReducedMotion()

  // Section-specific colors for the skeleton pulse
  const sectionColors: Record<string, string> = {
    blog: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
    projects:
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
    architecture:
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
    about:
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
    work: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
    home: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
    booking:
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
  }

  if (prefersReducedMotion) {
    return <div className={cn("rounded-md bg-gray-200 dark:bg-gray-700", className)} style={style}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay + (stagger || 0) }}
      className={cn("rounded-md animate-pulse", sectionColors[section], className)}
      style={style}
    >
      {children}
    </motion.div>
  )
}
