"use client"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { PageTransition } from "@/components/page-transition"
import { TransitionDebug } from "@/components/transition-debug"
import type { ReactNode } from "react"

interface TransitionLayoutProps {
  children: ReactNode
}

export function TransitionLayout({ children }: TransitionLayoutProps) {
  const prefersReducedMotion = useReducedMotion()

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <>
      <PageTransition>{children}</PageTransition>
      <TransitionDebug />
    </>
  )
}
