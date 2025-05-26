"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageErrorBoundary } from "./image-error-boundary"

interface BlogImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  className?: string
}

export function BlogImage({ src, alt, width = 800, height = 450, caption, className = "" }: BlogImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Fix image paths that might be missing the leading slash
  const imageSrc = src.startsWith("/") ? src : `/${src}`

  // For blog images, ensure they're in the correct path
  const correctedSrc = imageSrc.includes("/images/blog/") ? imageSrc : imageSrc.replace("/images/", "/images/blog/")

  return (
    <figure className="my-8">
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        <ImageErrorBoundary
          fallback={
            <div
              className="flex items-center justify-center bg-gray-100 rounded-lg"
              style={{ width: "100%", height: `${height}px` }}
            >
              <p className="text-gray-500">Image could not be loaded</p>
            </div>
          }
        >
          <Image
            src={correctedSrc || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={`rounded-lg transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setIsLoading(false)}
            priority={true}
            crossOrigin="anonymous"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </ImageErrorBoundary>
      </div>
      {caption && <figcaption className="mt-2 text-sm text-center text-gray-500">{caption}</figcaption>}
    </figure>
  )
}
