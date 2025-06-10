"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  blurDataURL?: string
  isHero?: boolean
}

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // Load images 200px before they enter viewport
  })

  // Determine if this image should have priority
  const shouldPrioritize =
    priority ||
    isHero ||
    (src && (src.includes("hero") || src.includes("banner") || src.includes("cover") || src.includes("thumbnail")))

  // Generate a blur placeholder if not provided
  const placeholder = blurDataURL ? "blur" : "empty"

  // Determine appropriate sizes based on image context
  const sizes = isHero
    ? "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

  // Normalize image path
  const normalizedSrc = src.startsWith("/") ? src : `/${src}`

  if (error) {
    return (
      <div
        className={cn("bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center", className)}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <div className="text-center p-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Image could not be loaded</p>
        </div>
      </div>
    )
  }

  return (
    <figure className={cn("my-8", className)} ref={ref}>
      <div
        className={cn("relative overflow-hidden rounded-lg", !isLoaded && "bg-gray-100 dark:bg-gray-800 animate-pulse")}
      >
        {(inView || shouldPrioritize) && (
          <Image
            src={normalizedSrc || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={cn("w-full h-auto transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}
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
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">{caption}</figcaption>
      )}
    </figure>
  )
}
