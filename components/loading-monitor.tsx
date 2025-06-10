"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getStuckRoutes, logLoadingStart, logLoadingEnd } from "@/utils/loading-debugger"

export function LoadingMonitor() {
  const pathname = usePathname()
  const [stuckRoutes, setStuckRoutes] = useState<string[]>([])

  useEffect(() => {
    // Log loading start when pathname changes
    logLoadingStart(pathname || "/")

    // Set up interval to check for stuck routes
    const checkInterval = setInterval(() => {
      const stuck = getStuckRoutes()
      setStuckRoutes(stuck)

      // If current route is stuck, try to force a refresh
      if (stuck.includes(pathname || "/")) {
        console.warn(`Route ${pathname} appears to be stuck loading`)
      }
    }, 5000)

    // Log loading end when component unmounts
    return () => {
      logLoadingEnd(pathname || "/")
      clearInterval(checkInterval)
    }
  }, [pathname])

  // Don't render anything visible
  return null
}
