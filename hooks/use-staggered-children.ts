"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function useStaggeredChildren(
  totalChildren: number,
  options = {
    staggerDelay: 50, // ms between each child animation
    initialDelay: 100, // ms before the first child animates
  },
) {
  const [visibleChildren, setVisibleChildren] = useState<boolean[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // If user prefers reduced motion, show all children immediately
    if (prefersReducedMotion) {
      setVisibleChildren(new Array(totalChildren).fill(true))
      return
    }

    // Reset visibility when total children changes
    setVisibleChildren(new Array(totalChildren).fill(false))

    // Stagger the appearance of children
    const timeouts: NodeJS.Timeout[] = []

    for (let i = 0; i < totalChildren; i++) {
      const timeout = setTimeout(
        () => {
          setVisibleChildren((prev) => {
            const newState = [...prev]
            newState[i] = true
            return newState
          })
        },
        options.initialDelay + i * options.staggerDelay,
      )

      timeouts.push(timeout)
    }

    // Clean up timeouts
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [totalChildren, options.staggerDelay, options.initialDelay, prefersReducedMotion])

  return visibleChildren
}
