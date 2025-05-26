"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface DirectContentRendererProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function DirectContentRenderer({ children, fallback }: DirectContentRendererProps) {
  const [hasError, setHasError] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle errors
  useEffect(() => {
    const handleError = () => {
      console.error("Error rendering content")
      setHasError(true)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  // Force content to be visible after a timeout
  useEffect(() => {
    const forceContentTimer = setTimeout(() => {
      // Find the main content container and ensure it's visible
      const contentContainer = document.querySelector("main")
      if (contentContainer) {
        contentContainer.style.opacity = "1"
        contentContainer.style.visibility = "visible"
      }
    }, 1000)

    return () => clearTimeout(forceContentTimer)
  }, [])

  if (hasError) {
    return fallback || <div>Something went wrong. Please refresh the page.</div>
  }

  // Always render children, but add a client-side wrapper when hydrated
  return isClient ? <>{children}</> : <div dangerouslySetInnerHTML={{ __html: "" }} />
}
