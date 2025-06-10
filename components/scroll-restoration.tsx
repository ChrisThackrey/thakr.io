"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
