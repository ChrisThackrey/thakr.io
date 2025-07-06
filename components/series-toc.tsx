"use client"

import { useState } from "react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import type { BlogPost } from "@/lib/blog"

interface SeriesTocProps {
  posts: BlogPost[]
  currentPostSlug?: string
  showProgress?: boolean
  expanded?: boolean
  className?: string
}

export function SeriesToc({
  posts,
  currentPostSlug,
  showProgress = true,
  expanded = false,
  className,
}: SeriesTocProps) {
  const [isOpen, setIsOpen] = useState(expanded)
  const { theme } = useTheme()
  const sortedPosts = [...posts].sort((a, b) => {
    if (!a.series || !b.series) return 0
    return a.series.order - b.series.order
  })

  const currentPostIndex = currentPostSlug ? sortedPosts.findIndex((post) => post.slug === currentPostSlug) : -1

  return (
    <div
      className={cn(
        "rounded-lg border shadow-sm",
        theme === "dark"
          ? "bg-card/95 border-primary/20 shadow-primary/5"
          : "bg-card text-card-foreground border-border",
        className,
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("font-medium", theme === "dark" ? "text-primary" : "text-foreground")}>
            Table of Contents
          </span>
          <Badge
            variant={theme === "dark" ? "outline" : "secondary"}
            className={theme === "dark" ? "border-primary/30 text-primary-foreground" : ""}
          >
            {posts.length} posts
          </Badge>
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="sr-only">{isOpen ? "Close" : "Open"} table of contents</span>
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      <Collapsible open={isOpen} className="w-full">
        <CollapsibleContent>
          <div className="px-4 pb-4">
            <ol className="space-y-3 relative">
              {showProgress && sortedPosts.length > 1 && (
                <div
                  className={cn(
                    "absolute left-[11px] top-[22px] bottom-[22px] w-0.5 z-0",
                    theme === "dark" ? "bg-primary/20" : "bg-muted-foreground/20",
                  )}
                  aria-hidden="true"
                />
              )}

              {sortedPosts.map((post, index) => {
                const isCurrentPost = post.slug === currentPostSlug
                const isCompleted = currentPostIndex > -1 && index < currentPostIndex

                return (
                  <li key={post.slug} className="relative z-10">
                    <div className="flex items-start gap-3">
                      {showProgress ? (
                        <div className="mt-0.5 relative z-10">
                          {isCompleted ? (
                            <CheckCircle2
                              className={cn("h-5 w-5", theme === "dark" ? "text-primary/80" : "text-primary")}
                              aria-label="Completed"
                            />
                          ) : isCurrentPost ? (
                            <div
                              className={cn(
                                "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                                theme === "dark"
                                  ? "border-primary/80 bg-background/50"
                                  : "border-primary bg-background",
                              )}
                            >
                              <div
                                className={cn(
                                  "h-2 w-2 rounded-full",
                                  theme === "dark" ? "bg-primary/80" : "bg-primary",
                                )}
                                aria-hidden="true"
                              />
                            </div>
                          ) : (
                            <Circle
                              className={cn(
                                "h-5 w-5",
                                theme === "dark" ? "text-muted-foreground/50" : "text-muted-foreground/70",
                              )}
                              aria-label="Not started"
                            />
                          )}
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground">
                          {post.series?.order || index + 1}.
                        </span>
                      )}

                      <div className="space-y-1">
                        <Link
                          href={`/blog/${post.slug}`}
                          className={cn(
                            "text-sm font-medium hover:text-primary transition-colors line-clamp-2",
                            isCurrentPost
                              ? theme === "dark"
                                ? "text-primary/90"
                                : "text-primary"
                              : theme === "dark"
                                ? "text-foreground/90"
                                : "text-foreground",
                          )}
                        >
                          {post.title}
                        </Link>

                        {post.readingTime && (
                          <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
