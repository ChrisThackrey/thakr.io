"use client"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface SectionStaggeredContentProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  baseDelay?: number
  threshold?: number
}

export function SectionStaggeredContent({
  children,
  className = "",
  staggerDelay = 0.1,
  baseDelay = 0,
  threshold = 0.2,
}: SectionStaggeredContentProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Determine section-specific stagger settings
  let sectionStaggerDelay = staggerDelay
  if (pathname.startsWith("/blog")) {
    sectionStaggerDelay = 0.08
  } else if (pathname.startsWith("/projects")) {
    sectionStaggerDelay = 0.12
  } else if (pathname.startsWith("/architecture")) {
    sectionStaggerDelay = 0.15
  }

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: sectionStaggerDelay,
        delayChildren: baseDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
}
