"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TOCProps {
  children: ReactNode
  className?: string
  defaultOpen?: boolean
}

export function TOC({ children, className, defaultOpen = true }: TOCProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("mb-8 rounded-lg border bg-card p-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Table of Contents</h2>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="h-8 w-8 p-0">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="sr-only">{isOpen ? "Collapse" : "Expand"}</span>
        </Button>
      </div>

      <div className={cn("transition-all duration-300 overflow-hidden", isOpen ? "max-h-96" : "max-h-0")}>
        <div className="prose prose-sm dark:prose-invert">{children}</div>
      </div>
    </div>
  )
}
