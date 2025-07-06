"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { getTransitionVariant } from "@/utils/transition-variants"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()
  const variant = getTransitionVariant(pathname)
  const prefersReducedMotion = useReducedMotion()

  // If reduced motion is preferred, use simple fade transitions
  const reducedMotionVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? reducedMotionVariant.initial : variant.initial}
        animate={prefersReducedMotion ? reducedMotionVariant.animate : variant.animate}
        exit={prefersReducedMotion ? reducedMotionVariant.exit : variant.exit}
        transition={prefersReducedMotion ? reducedMotionVariant.transition : variant.transition}
        className={className || "w-full"}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
