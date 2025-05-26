"use client"

import { useState } from "react"
import { List, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AutoTOC } from "@/components/auto-toc"
import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks/use-scroll-position"

interface FloatingAutoTocButtonProps {
  contentSelector: string
  className?: string
}

export function FloatingAutoTocButton({ contentSelector, className }: FloatingAutoTocButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { y: scrollY } = useScrollPosition()

  // Only show after scrolling down a bit
  const shouldShow = scrollY > 300

  return (
    <>
      {/* Floating button */}
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "fixed bottom-24 right-4 z-50 shadow-md rounded-full transition-opacity duration-300",
          shouldShow ? "opacity-100" : "opacity-0 pointer-events-none",
          className,
        )}
        onClick={() => setIsOpen(true)}
      >
        <List className="h-5 w-5" />
        <span className="sr-only">Table of Contents</span>
      </Button>

      {/* Mobile TOC overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Table of Contents</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <AutoTOC
              contentSelector={contentSelector}
              defaultOpen={true}
              maxDepth={3}
              className="border-none shadow-none p-0"
            />
          </div>
        </div>
      )}
    </>
  )
}
