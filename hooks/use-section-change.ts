"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function useSectionChange(callback: (prevSection: string, newSection: string) => void) {
  const pathname = usePathname()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    const currentSection = pathname.split("/")[1] || "home"
    const prevSection = prevPathnameRef.current.split("/")[1] || "home"

    if (currentSection !== prevSection) {
      callback(prevSection, currentSection)
    }

    prevPathnameRef.current = pathname
  }, [pathname, callback])
}
