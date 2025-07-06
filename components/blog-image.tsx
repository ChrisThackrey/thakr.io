"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

/** All props previously used across your MDX / TSX posts */
export interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  className?: string

  /* Optional fine-tuning props used in some posts */
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  blurDataURL?: string
  isHero?: boolean
}

/**
 * Responsive blog image with progressive loading and an optional
 * caption.  Exported both as a **named** export (`BlogImage`) and a
 * **default** export for legacy imports.
 */
export function BlogImage({
  src,
  alt,
  caption,
  className,
  width = 1200,
  height = 630,
  priority = false,
  quality = 85,
  blurDataURL,
  isHero = false,
}: BlogImageProps) {
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Only load once the figure is near the viewport
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  })

  // Treat hero / banner images as high priority
  const shouldPrioritize = priority || isHero || src.match(/hero|banner|cover|thumbnail/gi) !== null

  const placeholder = blurDataURL ? "blur" : "empty"
  const sizes = isHero
    ? "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

  // Normalise path so "/images/foo.png" and "images/foo.png" both work
  const normalisedSrc = src.startsWith("/") ? src : `/${src}`

  if (error) {
    return (
      <figure
        className={cn("my-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800", className)}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <span className="p-4 text-center text-sm text-muted-foreground">Image failed to load</span>
      </figure>
    )
  }

  return (
    <figure className={cn("my-8", className)} ref={ref}>
      <div
        className={cn("relative overflow-hidden rounded-lg", !isLoaded && "bg-gray-100 dark:bg-gray-800 animate-pulse")}
      >
        {(inView || shouldPrioritize) && (
          <Image
            src={normalisedSrc || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={cn("h-auto w-full transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}
            onError={() => setError(true)}
            onLoad={() => setIsLoaded(true)}
            priority={shouldPrioritize}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            sizes={sizes}
            fetchPriority={shouldPrioritize ? "high" : "auto"}
            loading={shouldPrioritize ? "eager" : "lazy"}
          />
        )}
      </div>

      {caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

/* Default export for default-import callers */
export default BlogImage
