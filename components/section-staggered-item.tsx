"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
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
  let itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  if (pathname.startsWith("/blog")) {
    itemVariants = {
      hidden: { opacity: 0, x: 15 } as any,
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      } as any,
    }
  } else if (pathname.startsWith("/projects")) {
    itemVariants = {
      hidden: { opacity: 0, scale: 0.95 } as any,
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: "easeOut" },
      } as any,
    }
  } else if (pathname.startsWith("/architecture")) {
    itemVariants = {
      hidden: { opacity: 0, y: 25, rotateX: 5 } as any,
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      } as any,
    }
  } else if (pathname.startsWith("/about")) {
    itemVariants = {
      hidden: { opacity: 0, filter: "blur(8px)" } as any,
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
      } as any,
    }
  } else if (pathname.startsWith("/work")) {
    itemVariants = {
      hidden: { opacity: 0, y: 30, rotateX: 10 } as any,
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.55, ease: "easeOut" },
      } as any,
    }
  }

  const Component = motion[as as keyof typeof motion] || motion.div

  return (
    <Component className={className} variants={itemVariants as any}>
      {children}
    </Component>
  )
}
