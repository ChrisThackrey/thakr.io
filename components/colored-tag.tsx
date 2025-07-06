/**
 * Minimal replacement so existing MDX/blog imports that expect
 * `ColoredTag` continue to work.  Uses a neutral style – adjust as needed.
 */
export interface ColoredTagProps {
  tag: string
  className?: string
}

export function ColoredTag({ tag, className = "" }: ColoredTagProps) {
  return (
    <span className={`inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground ${className}`}>
      {tag}
    </span>
  )
}

/* Support both:
     import { ColoredTag } from "...";
     import ColoredTag from "...";
*/
export default ColoredTag
