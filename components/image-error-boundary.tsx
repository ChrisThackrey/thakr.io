"use client"

import type React from "react"
import { useState } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { ImageOff } from "lucide-react"
import Image from "next/image"

interface ImageErrorBoundaryProps {
  children: React.ReactNode
  fallbackSrc?: string
  alt?: string
  width?: number
  height?: number
}

export function ImageErrorBoundary({
  children,
  fallbackSrc = "/placeholder.svg",
  alt = "Image could not be loaded",
  width = 800,
  height = 450,
}: ImageErrorBoundaryProps) {
  const [imgError, setImgError] = useState(false)

  const handleImgError = () => {
    setImgError(true)
  }

  return (
    <ErrorBoundary
      componentName="image"
      fallback={
        <div className="relative w-full h-auto min-h-[200px] bg-muted/50 rounded-md flex items-center justify-center">
          <div className="text-center p-4">
            <ImageOff className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Image could not be loaded</p>
          </div>
        </div>
      }
    >
      {imgError ? (
        <div className="relative w-full overflow-hidden rounded-md bg-muted/30">
          <Image
            src={fallbackSrc || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto object-cover"
          />
        </div>
      ) : (
        <div onError={handleImgError}>{children}</div>
      )}
    </ErrorBoundary>
  )
}
