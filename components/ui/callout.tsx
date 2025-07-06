import * as React from "react"
import { cn } from "@/lib/utils"

const Callout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("my-6 items-start rounded-md border border-l-4 p-4", className)} {...props} />
  ),
)
Callout.displayName = "Callout"

export { Callout }
