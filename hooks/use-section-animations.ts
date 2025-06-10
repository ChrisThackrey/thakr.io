"use client"

import { usePathname } from "next/navigation"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function useSectionAnimations() {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  // Base animation settings
  const baseSettings = {
    staggerDelay: 0.1,
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  }

  // Section-specific animation settings
  let sectionSettings = { ...baseSettings }

  if (pathname.startsWith("/blog")) {
    sectionSettings = {
      staggerDelay: 0.08,
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1],
    }
  } else if (pathname.startsWith("/projects")) {
    sectionSettings = {
      staggerDelay: 0.12,
      duration: 0.45,
      ease: [0.34, 1.56, 0.64, 1],
    }
  } else if (pathname.startsWith("/architecture")) {
    sectionSettings = {
      staggerDelay: 0.15,
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    }
  } else if (pathname.startsWith("/about")) {
    sectionSettings = {
      staggerDelay: 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }
  } else if (pathname.startsWith("/work")) {
    sectionSettings = {
      staggerDelay: 0.13,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    }
  }

  return {
    ...sectionSettings,
    shouldAnimate: !prefersReducedMotion,
    section: pathname.split("/")[1] || "home",
  }
}
