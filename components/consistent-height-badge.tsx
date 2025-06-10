import type React from "react"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ConsistentHeightBadgeProps extends BadgeProps {
  children: React.ReactNode
}

export function ConsistentHeightBadge({ children, className, ...props }: ConsistentHeightBadgeProps) {
  return (
    <Badge className={cn("h-7 inline-flex items-center justify-center px-3", className)} {...props}>
      {children}
    </Badge>
  )
}
