import * as React from "react"
import { ArrowUpRightIcon, GlobeIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface LinkBadgeProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Destination; external URLs open in a new tab. */
  href: string
  /** Visible label, typically a bare domain such as "example.com". */
  label: string
}

/**
 * A pill-shaped hyperlink badge for pointing at an external site, e.g. a
 * company's homepage on a timeline card. Styled to sit alongside the site's
 * other badges (same radius and type scale) but reads as a link: primary tint,
 * globe icon, and an arrow that nudges outward on hover.
 */
export function LinkBadge({ href, label, className, ...props }: LinkBadgeProps) {
  const isExternal = /^https?:\/\//.test(href)

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${label} (opens in a new tab)`}
      className={cn(
        "group inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "text-xs font-medium tracking-tight whitespace-nowrap",
        "border-primary/25 bg-primary/5 text-primary",
        "shadow-sm transition-all duration-200 ease-out",
        "hover:-translate-y-px hover:border-primary/50 hover:bg-primary/10 hover:shadow",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "dark:border-primary/30 dark:bg-primary/10 dark:hover:border-primary/60 dark:hover:bg-primary/15",
        className,
      )}
      {...props}
    >
      <GlobeIcon className="h-3 w-3 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      <span className="truncate">{label}</span>
      <ArrowUpRightIcon
        className="h-3 w-3 shrink-0 opacity-60 transition-all duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:opacity-100"
        aria-hidden="true"
      />
    </a>
  )
}
