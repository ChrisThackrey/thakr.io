import { getTagColors } from "@/lib/tag-colors"
import type React from "react"

/**
 * Minimal replacement for the original `<ColoredTag>` that was removed.
 * - Renders a coloured <span>.
 * - Accepts any extra span props.
 *
 * NOTE: We no longer generate links to /blog/categories,
 * so the only required prop is the tag label itself.
 */
export interface ColoredTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tag: string
}

export function ColoredTag({ tag, className = "", ...rest }: ColoredTagProps) {
  return (
    <span
      {...rest}
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getTagColors(tag)} ${className}`}
    >
      {tag}
    </span>
  )
}
