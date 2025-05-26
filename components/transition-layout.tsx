"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { getTransitionVariant } from "@/utils/transition-variants"
import { ScrollRestoration } from "@/components/scroll-restoration"
import { BlogPageSkeleton } from "@/components/skeletons/blog-page-skeleton"
import { ProjectsPageSkeleton } from "@/components/skeletons/projects-page-skeleton"
import { ArchitecturePageSkeleton } from "@/components/skeletons/architecture-page-skeleton"
import { WorkPageSkeleton } from "@/components/skeletons/work-page-skeleton"
import { AboutPageSkeleton } from "@/components/skeletons/about-page-skeleton"
import { HomePageSkeleton } from "@/components/skeletons/home-page-skeleton"
import { BookingPageSkeleton } from "@/components/skeletons/booking-page-skeleton"
import type { ReactNode } from "react"

export function TransitionLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPathname, setPrevPathname] = useState<string | null>(null)
  const [displayChildren, setDisplayChildren] = useState(children)

  // Track route changes to manage loading states
  useEffect(() => {
    if (prevPathname !== pathname) {
      // Start loading state
      setIsLoading(true)

      // Store the previous path
      setPrevPathname(pathname)

      // Update children after a short delay to ensure smooth transition
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setIsLoading(false)
      }, 300) // Match this with your transition duration

      return () => clearTimeout(timer)
    }
  }, [pathname, children, prevPathname])

  // Get the appropriate transition variant based on the current path
  const transitionVariant = getTransitionVariant(pathname)

  // Determine which skeleton to show based on the current path
  const getSkeletonForPath = () => {
    if (pathname === "/") return <HomePageSkeleton />
    if (pathname.startsWith("/blog")) return <BlogPageSkeleton />
    if (pathname.startsWith("/projects")) return <ProjectsPageSkeleton />
    if (pathname.startsWith("/architecture")) return <ArchitecturePageSkeleton />
    if (pathname.startsWith("/work")) return <WorkPageSkeleton />
    if (pathname.startsWith("/about")) return <AboutPageSkeleton />
    if (pathname.startsWith("/booking")) return <BookingPageSkeleton />

    // Default skeleton for other pages
    return <HomePageSkeleton />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={transitionVariant.initial}
          animate={transitionVariant.animate}
          exit={transitionVariant.exit}
          transition={transitionVariant.transition}
          className="min-h-screen w-full"
        >
          {isLoading ? getSkeletonForPath() : displayChildren}
        </motion.div>
      </AnimatePresence>
      <ScrollRestoration />
    </>
  )
}
