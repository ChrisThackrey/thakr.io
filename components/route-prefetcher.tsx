"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// List of routes to prefetch
const routesToPrefetch = ["/", "/about", "/projects", "/architecture", "/blog", "/work", "/booking"]

export function RoutePrefetcher() {
  const router = useRouter()

  useEffect(() => {
    // Prefetch all main routes when the app loads
    routesToPrefetch.forEach((route) => {
      router.prefetch(route)
    })

    // Prefetch blog posts and other dynamic routes
    // This could be expanded based on your site structure
    fetch("/api/routes")
      .then((res) => res.json())
      .then((routes) => {
        routes.forEach((route: string) => {
          router.prefetch(route)
        })
      })
      .catch((err) => {
        console.error("Failed to prefetch routes:", err)
      })
  }, [router])

  return null // This component doesn't render anything
}
