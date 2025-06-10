"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { SkeletonBase } from "./skeleton-base"
import { type ContentStructure, getStructureFromPath } from "@/utils/content-structure-analyzer"
import { cn } from "@/lib/utils"

interface AdaptiveSkeletonProps {
  structure?: ContentStructure
  path?: string
  className?: string
  section?: "blog" | "projects" | "architecture" | "about" | "work" | "home" | "booking"
}

export function AdaptiveSkeleton({ structure, path, className, section }: AdaptiveSkeletonProps) {
  const pathname = usePathname()
  const [contentStructure, setContentStructure] = useState<ContentStructure | null>(structure || null)

  // Determine the section from the path if not provided
  const derivedSection = section || (pathname?.split("/")[1] as any) || "home"

  useEffect(() => {
    if (!contentStructure) {
      const pathToAnalyze = path || pathname || "/"
      const derivedStructure = getStructureFromPath(pathToAnalyze)
      setContentStructure(derivedStructure)
    }
  }, [contentStructure, path, pathname])

  if (!contentStructure) {
    return <div className={cn("min-h-screen", className)} />
  }

  return <SkeletonRenderer structure={contentStructure} section={derivedSection} className={className} />
}

interface SkeletonRendererProps {
  structure: ContentStructure
  className?: string
  section: "blog" | "projects" | "architecture" | "about" | "work" | "home" | "booking"
  depth?: number
  index?: number
}

function SkeletonRenderer({ structure, className, section, depth = 0, index = 0 }: SkeletonRendererProps) {
  // Generate a delay based on depth and index for staggered animations
  const delay = 0.05 * depth + 0.02 * index

  switch (structure.type) {
    case "page":
      return (
        <div className={cn("space-y-8", className)}>
          {structure.children?.map((child, i) => (
            <SkeletonRenderer
              key={`${structure.type}-${i}`}
              structure={child}
              section={section}
              depth={depth + 1}
              index={i}
            />
          ))}
        </div>
      )

    case "section":
      return (
        <div className={cn("space-y-4", className)}>
          {structure.children?.map((child, i) => (
            <SkeletonRenderer
              key={`${structure.type}-${i}`}
              structure={child}
              section={section}
              depth={depth + 1}
              index={i}
            />
          ))}
        </div>
      )

    case "grid":
      const columns = structure.props?.columns || 3
      return (
        <div
          className={cn(
            "grid gap-4",
            columns === 2 && "grid-cols-1 md:grid-cols-2",
            columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            className,
          )}
        >
          {structure.children?.map((child, i) => (
            <SkeletonRenderer
              key={`${structure.type}-${i}`}
              structure={child}
              section={section}
              depth={depth + 1}
              index={i}
            />
          ))}
        </div>
      )

    case "card":
      return (
        <div className={cn("space-y-3 p-4 rounded-lg border border-border", className)}>
          {structure.children?.map((child, i) => (
            <SkeletonRenderer
              key={`${structure.type}-${i}`}
              structure={child}
              section={section}
              depth={depth + 1}
              index={i}
            />
          ))}
        </div>
      )

    case "list":
      const isHorizontal = structure.props?.layout === "horizontal"
      const itemCount = structure.props?.itemCount || 3
      const items = structure.children || Array(itemCount).fill({ type: "text", props: { textLength: 20 } })

      return (
        <div
          className={cn(
            isHorizontal ? "flex flex-wrap gap-2" : "space-y-3",
            structure.props?.density === "dense" && "gap-1 space-y-1",
            structure.props?.density === "sparse" && "gap-4 space-y-4",
            className,
          )}
        >
          {items.map((child, i) => (
            <SkeletonRenderer
              key={`${structure.type}-${i}`}
              structure={child}
              section={section}
              depth={depth + 1}
              index={i}
            />
          ))}
        </div>
      )

    case "heading":
      const importance = structure.props?.importance || "secondary"
      const textLength = structure.props?.textLength || 24
      const width = textLength * 8 // Approximate width based on text length

      return (
        <SkeletonBase
          section={section}
          delay={delay}
          className={cn(
            "rounded-md",
            importance === "primary" && "h-10 w-full max-w-md",
            importance === "secondary" && "h-8 w-full max-w-sm",
            importance === "tertiary" && "h-6 w-full max-w-xs",
            className,
          )}
          style={{ maxWidth: width }}
        />
      )

    case "text":
      const textLen = structure.props?.textLength || 80
      const textWidth = Math.min(textLen * 6, 100) // Approximate width based on text length, max 100%

      return (
        <SkeletonBase
          section={section}
          delay={delay}
          className={cn("h-4 rounded-md", className)}
          style={{ width: `${textWidth}%` }}
        />
      )

    case "image":
      const aspectRatio = structure.props?.aspectRatio || 16 / 9
      const paddingBottom = `${(1 / aspectRatio) * 100}%`

      return (
        <div className={cn("relative w-full", className)} style={{ paddingBottom }}>
          <SkeletonBase section={section} delay={delay} className="absolute inset-0 rounded-md" />
        </div>
      )

    default:
      return <SkeletonBase section={section} delay={delay} className={cn("h-4 w-full rounded-md", className)} />
  }
}
