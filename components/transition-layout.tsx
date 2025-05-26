"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { BlogPageSkeleton } from "@/components/skeletons/blog-page-skeleton"
import { ProjectsPageSkeleton } from "@/components/skeletons/projects-page-skeleton"
import { ArchitecturePageSkeleton } from "@/components/skeletons/architecture-page-skeleton"
import { WorkPageSkeleton } from "@/components/skeletons/work-page-skeleton"
import { AboutPageSkeleton } from "@/components/skeletons/about-page-skeleton"
import { HomePageSkeleton } from "@/components/skeletons/home-page-skeleton"
import { BookingPageSkeleton } from "@/components/skeletons/booking-page-skeleton"

export function TransitionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showSkeleton, setShowSkeleton] = useState(true)

  // Immediately show content on mount
  useEffect(() => {
    // Very short timeout to ensure the skeleton is shown first
    const timer = setTimeout(() => {
      setShowSkeleton(false)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  // Get the appropriate skeleton based on the current path
  const getSkeletonForPath = () => {
    if (pathname === "/") return <HomePageSkeleton />
    if (pathname?.startsWith("/blog")) return <BlogPageSkeleton />
    if (pathname?.startsWith("/projects")) return <ProjectsPageSkeleton />
    if (pathname?.startsWith("/architecture")) return <ArchitecturePageSkeleton />
    if (pathname?.startsWith("/work")) return <WorkPageSkeleton />
    if (pathname?.startsWith("/about")) return <AboutPageSkeleton />
    if (pathname?.startsWith("/booking")) return <BookingPageSkeleton />

    // Default skeleton for other pages
    return <HomePageSkeleton />
  }

  // Simple fade-in animation for content
  return (
    <div className="min-h-screen w-full relative">
      {/* Always render the actual content, but initially hidden */}
      <div
        className="transition-opacity duration-300"
        style={{
          opacity: showSkeleton ? 0 : 1,
          position: showSkeleton ? "absolute" : "relative",
          zIndex: showSkeleton ? 0 : 1,
          width: "100%",
        }}
      >
        {children}
      </div>

      {/* Show skeleton only during loading */}
      {showSkeleton && (
        <div
          className="transition-opacity duration-300"
          style={{
            opacity: showSkeleton ? 1 : 0,
            position: "relative",
            zIndex: showSkeleton ? 1 : 0,
          }}
        >
          {getSkeletonForPath()}
        </div>
      )}
    </div>
  )
}
