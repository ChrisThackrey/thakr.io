"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPathname, setPrevPathname] = useState<string | null>(null)
  const [displayChildren, setDisplayChildren] = useState(children)

  // Use refs to track mount status and timeouts
  const isMounted = useRef(true)
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null)
  const maxLoadingTimeout = useRef<NodeJS.Timeout | null>(null)

  // Clear any existing timeouts to prevent memory leaks
  const clearTimeouts = () => {
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current)
      loadingTimeout.current = null
    }
    if (maxLoadingTimeout.current) {
      clearTimeout(maxLoadingTimeout.current)
      maxLoadingTimeout.current = null
    }
  }

  // Track route changes to manage loading states
  useEffect(() => {
    // Set mounted ref
    isMounted.current = true

    // Handle route change
    if (prevPathname !== pathname) {
      // Clear any existing timeouts
      clearTimeouts()

      // Start loading state
      setIsLoading(true)

      // Store the previous path
      setPrevPathname(pathname)

      // Update children after a short delay to ensure smooth transition
      loadingTimeout.current = setTimeout(() => {
        if (isMounted.current) {
          setDisplayChildren(children)
          setIsLoading(false)
        }
      }, 600) // Slightly longer delay for smoother transition

      // Set a maximum loading time to prevent infinite loading
      maxLoadingTimeout.current = setTimeout(() => {
        if (isMounted.current && isLoading) {
          console.log("Force ending loading state after timeout")
          setDisplayChildren(children)
          setIsLoading(false)
        }
      }, 3000) // Force end loading after 3 seconds max
    } else {
      // If pathname hasn't changed but children have, update without loading state
      setDisplayChildren(children)
    }

    // Cleanup function
    return () => {
      isMounted.current = false
      clearTimeouts()
    }
  }, [pathname, children, prevPathname, isLoading])

  // Add a direct effect to handle children updates without path changes
  useEffect(() => {
    if (!isLoading && prevPathname === pathname) {
      setDisplayChildren(children)
    }
  }, [children, isLoading, pathname, prevPathname])

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

  // Add a manual retry button that appears if loading takes too long
  const renderRetryButton = () => {
    if (!isLoading) return null

    return (
      <div className="fixed bottom-4 right-4 z-50 opacity-0 animate-fadeIn" style={{ animationDelay: "5s" }}>
        <button
          onClick={() => {
            setIsLoading(false)
            setDisplayChildren(children)
            router.refresh()
          }}
          className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary/90 transition-colors"
        >
          Content taking too long? Click to retry
        </button>
      </div>
    )
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
      {renderRetryButton()}
      <ScrollRestoration />
    </>
  )
}
