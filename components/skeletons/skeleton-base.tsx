"use client"

import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SkeletonBaseProps {
  children: ReactNode
  className?: string
  shimmer?: boolean
  section?: "blog" | "projects" | "architecture"
  delay?: number
  stagger?: 1 | 2 | 3 | 4 | 5
  animate?: "fade" | "scale" | "slide" | "none"
}

export function SkeletonBase({
  children,
  className,
  shimmer = true,
  section = "blog",
  delay = 0,
  stagger = 0,
  animate = "fade",
}: SkeletonBaseProps) {
  const prefersReducedMotion = useReducedMotion()

  // Section-specific classes
  const sectionClasses = {
    blog: "blog-skeleton-pulse skeleton-gradient-blog",
    projects: "projects-skeleton-wave skeleton-gradient-projects",
    architecture: "architecture-skeleton-reveal skeleton-gradient-architecture",
  }

  // Animation variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    none: {
      initial: {},
      animate: {},
    },
  }

  // Calculate total delay
  const totalDelay = delay + stagger * 0.1

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : variants[animate].initial}
      animate={prefersReducedMotion ? {} : variants[animate].animate}
      transition={{
        duration: 0.4,
        delay: totalDelay,
        ease: "easeOut",
      }}
      className={cn(
        "bg-muted",
        shimmer && "skeleton-shimmer",
        sectionClasses[section],
        stagger > 0 && `stagger-${stagger}`,
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
