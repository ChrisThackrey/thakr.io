"use client"

import { cn } from "@/lib/utils"

type ColoredTagProps = {
  tag: string
  className?: string
}

/**
 * A very small pill-shaped tag.
 * All tag colours were removed from the code-base, so we render a neutral pill.
 */
export function ColoredTag({ tag, className }: ColoredTagProps) {
  return (
    <span
      className={cn("inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground/80", className)}
    >
      {tag}
    </span>
  )
}

/* Legacy default export so `<ColoredTag />` and `{ ColoredTag }` both work. */
export default ColoredTag
