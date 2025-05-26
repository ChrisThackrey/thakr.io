"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function usePageTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevPathname, setPrevPathname] = useState<string | null>(null)

  useEffect(() => {
    if (prevPathname !== null && prevPathname !== pathname) {
      setIsTransitioning(true)

      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 300) // Match this with your transition duration

      return () => clearTimeout(timer)
    }

    setPrevPathname(pathname)
  }, [pathname, prevPathname])

  return { isTransitioning, pathname }
}
