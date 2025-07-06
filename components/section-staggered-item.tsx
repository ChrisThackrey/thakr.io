"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { motion, type Variants } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import type { ReactNode } from "react"

interface SectionStaggeredItemProps {
  children: ReactNode
  className?: string
  as?: React.ElementType
}

export function SectionStaggeredItem({ children, className = "", as = "div" }: SectionStaggeredItemProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Determine section-specific item animation
  let itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  if (pathname.startsWith("/blog")) {
    itemVariants = {
      hidden: { opacity: 0, x: 15 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }
  } else if (pathname.startsWith("/projects")) {
    itemVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }
  } else if (pathname.startsWith("/architecture")) {
    itemVariants = {
      hidden: { opacity: 0, y: 25, rotateX: 5 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }
  } else if (pathname.startsWith("/about")) {
    itemVariants = {
      hidden: { opacity: 0, filter: "blur(8px)" },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }
  } else if (pathname.startsWith("/work")) {
    itemVariants = {
      hidden: { opacity: 0, y: 30, rotateX: 10 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }
  }

  const Component = as === 'div' ? motion.div : 
                   as === 'section' ? motion.section :
                   as === 'article' ? motion.article :
                   as === 'span' ? motion.span :
                   motion.div

  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  )
}
