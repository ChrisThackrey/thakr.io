"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function BlogImage({
  src,
  alt,
  caption,
  className,
  width = 1200,
  height = 630,
  priority = false,
}: BlogImageProps) {
  const [error, setError] = useState(false)

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
    <figure className={cn("my-8", className)}>
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          onError={() => setError(true)}
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">{caption}</figcaption>
      )}
    </figure>
  )
}
