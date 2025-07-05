import type React from "react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function SectionTitle({ children, className, as = "h2" }: SectionTitleProps) {
  const Component = as

  return (
    <Component
      className={cn(
        "text-3xl md:text-4xl font-bold tracking-tight relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-primary after:rounded-full font-cal",
        className,
      )}
    >
      {children}
    </Component>
  )
}
