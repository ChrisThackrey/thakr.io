"use client"

import type React from "react"

import { cn } from "@/lib/utils"

type StepsProps = React.HTMLAttributes<HTMLOListElement>
type StepProps = React.LiHTMLAttributes<HTMLLIElement>

/**
 * Parent ordered list for a multi-step explanation.
 */
export function Steps({ children, className, ...props }: StepsProps) {
  return (
    <ol className={cn("my-6 space-y-4 pl-5", className)} {...props}>
      {children}
    </ol>
  )
}

/**
 * An individual step – exported as `Steps.Step` for MDX ergonomics.
 */
function Step({ children, className, ...props }: StepProps) {
  return (
    <li
      className={cn(
        "relative ml-2 border-l-2 border-border pl-4",
        "before:absolute before:-left-[11px] before:top-1 before:h-3 before:w-3 before:rounded-full before:border-2 before:border-primary",
        className,
      )}
      {...props}
    >
      {children}
    </li>
  )
}

Steps.Step = Step
