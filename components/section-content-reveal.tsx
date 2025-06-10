"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { getContentAnimationVariant } from "@/utils/content-animation-variants"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface SectionContentRevealProps {
  children: ReactNode
  index?: number
  className?: string
  as?: React.ElementType
  delay?: number
  threshold?: number
}

export function SectionContentReveal({
  children,
  index = 0,
  className = "",
  as = "div",
  delay = 0,
  threshold = 0.2,
}: SectionContentRevealProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  // Get the appropriate animation variant based on the current section
  const variant = getContentAnimationVariant(pathname)

  // Apply additional delay if specified
  const customIndex = index + delay / 0.1

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const Component = motion[as as keyof typeof motion] || motion.div

  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      custom={customIndex}
    >
      {children}
    </Component>
  )
}
