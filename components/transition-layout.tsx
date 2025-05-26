"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { getTransitionVariant } from "@/utils/transition-variants"
import { ScrollRestoration } from "@/components/scroll-restoration"

export function TransitionLayout({ children }: { children: React.ReactNode }) {
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
          {isLoading ? (
            <div className="flex min-h-[50vh] w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          ) : (
            displayChildren
          )}
        </motion.div>
      </AnimatePresence>
      <ScrollRestoration />
    </>
  )
}
