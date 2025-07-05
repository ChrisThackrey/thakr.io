"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SeriesToc } from "@/components/series-toc"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import type { BlogPost } from "@/lib/blog"

interface FloatingTocButtonProps {
  series: {
    posts: BlogPost[]
    name: string
  }
  currentPostSlug: string
  className?: string
}

export function FloatingTocButton({ series, currentPostSlug, className }: FloatingTocButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 mb-2 rounded-lg shadow-lg overflow-hidden">
          <SeriesToc
            posts={series.posts}
            currentPostSlug={currentPostSlug}
            expanded={true}
            className={cn(
              theme === "dark"
                ? "border-2 border-primary/30 bg-card/95 shadow-primary/10"
                : "border border-primary/20 bg-card shadow-md",
            )}
          />
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "rounded-full h-12 w-12 shadow-md flex items-center justify-center p-0 transition-all",
          isOpen
            ? theme === "dark"
              ? "bg-primary/30 hover:bg-primary/40 text-primary"
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
            : theme === "dark"
              ? "bg-primary/20 hover:bg-primary/30 text-primary"
              : "bg-primary/90 hover:bg-primary text-primary-foreground",
        )}
        aria-label={isOpen ? "Close table of contents" : "Open table of contents"}
      >
        {isOpen ? <Icons.close className="h-5 w-5" /> : <Icons.listTree className="h-5 w-5" />}
      </Button>
    </div>
  )
}
