"use client"

import type React from "react"

import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

export type CalloutProps = React.HTMLAttributes<HTMLDivElement> & {
  /** 'info' | 'warning' | 'error' */
  variant?: "info" | "warning" | "error"
}

const VARIANT_STYLES: Record<NonNullable<CalloutProps["variant"]>, string> = {
  info: "bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-200",
  warning: "bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200",
  error: "bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-200",
}

export function Callout({ children, className, variant = "info", ...props }: CalloutProps) {
  return (
    <div
      role="note"
      className={cn("my-6 flex items-start gap-3 rounded-md px-4 py-3 text-sm", VARIANT_STYLES[variant], className)}
      {...props}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  )
}
