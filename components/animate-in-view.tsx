"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { type ReactNode, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type AnimateInViewProps = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  as?: React.ElementType
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "none"
}

export function AnimateInView({
  children,
  delay = 0,
  duration = 0.5,
  className,
  as = "div",
  animation = "fade",
}: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-down": {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    none: {
      hidden: {},
      visible: {},
    },
  }

  const selectedAnimation = prefersReducedMotion ? "none" : animation
  const { hidden, visible } = animations[selectedAnimation]

  const Component = as === 'div' ? motion.div : 
                   as === 'section' ? motion.section :
                   as === 'article' ? motion.article :
                   as === 'span' ? motion.span :
                   motion.div

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden,
        visible: {
          ...visible,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  )
}
