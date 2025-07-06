"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Ensure content is visible after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  // Log when content becomes visible (removed for production)

  return (
    <div
      className="transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0.99 }} // Use 0.99 to ensure it's still visible even if state doesn't change
    >
      {children}
    </div>
  )
}
