"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

export interface BlogImageProps {
  /** Public path in /public or an external URL */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Optional caption shown underneath */
  caption?: string
  /** Extra Tailwind classes */
  className?: string
}

/**
 * Responsive image with an optional caption, used inside blog posts.
 *
 * It is exported **both** as a named and default component so callers can
 * `import { BlogImage }` or `import BlogImage`.
 */
export function BlogImage({ src, alt, caption, className }: BlogImageProps) {
  return (
    <figure className={cn("mx-auto max-w-3xl", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={1280}
        height={720}
        className="h-auto w-full rounded-md border"
        sizes="(min-width: 768px) 768px, 100vw"
      />
      {caption ? <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  )
}

/* Default export for legacy imports */
export default BlogImage
