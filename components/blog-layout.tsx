"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface BlogLayoutProps {
  children: React.ReactNode
  aside?: React.ReactNode
  slug: string
}

export function BlogLayout({ children, aside, slug }: BlogLayoutProps) {
  const { theme } = useTheme()

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
      <div className="md:col-span-8 lg:col-span-8">{children}</div>
      {aside ? (
        <aside
          className={cn(
            "md:col-span-4 lg:col-span-4 md:sticky md:top-24 md:self-start",
            theme === "dark" ? "toc-container-dark" : "toc-container-light",
          )}
        >
          <div className="space-y-8">{aside}</div>
        </aside>
      ) : (
        <aside className="md:col-span-4 lg:col-span-4">
          {/* This is where the TOC will be rendered from the parent component */}
        </aside>
      )}
    </div>
  )
}
