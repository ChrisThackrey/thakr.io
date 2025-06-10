"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { analyzeContentStructure, type ContentStructure } from "@/utils/content-structure-analyzer"

interface ContentStructureAnalyzerProps {
  children: React.ReactNode
  id?: string
  structure?: ContentStructure
}

/**
 * Component that analyzes and stores the structure of its children
 * This is used to generate more accurate skeletons for future visits
 */
export function ContentStructureAnalyzer({ children, id, structure }: ContentStructureAnalyzerProps) {
  const pathname = usePathname()
  const componentId = id || pathname || "unknown"
  const analyzed = useRef(false)

  useEffect(() => {
    if (!analyzed.current && structure) {
      // Store the structure for future use
      analyzeContentStructure(componentId, structure)
      analyzed.current = true
    }
  }, [componentId, structure])

  return <>{children}</>
}

/**
 * HOC to wrap components with content structure analysis
 */
export function withContentStructureAnalysis<P extends object>(
  Component: React.ComponentType<P>,
  id?: string,
  structure?: ContentStructure,
) {
  return function WrappedComponent(props: P) {
    return (
      <ContentStructureAnalyzer id={id} structure={structure}>
        <Component {...props} />
      </ContentStructureAnalyzer>
    )
  }
}
