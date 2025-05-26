"use client"

import type React from "react"
import type { Annotation } from "./image-gallery"
import { AnnotationMarker } from "./annotation-marker"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ZoomIn, ZoomOut, Move } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: "square" | "video" | "wide" | "auto"
  height?: string
  onZoomChange?: (isZoomed: boolean) => void
  annotations?: Annotation[]
  isAnnotatable?: boolean
}

export function ZoomableImage({
  src,
  alt,
  className,
  aspectRatio = "video",
  height = "500px",
  onZoomChange,
  annotations = [],
  isAnnotatable = true,
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Map aspect ratio to className
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    auto: "",
  }

  const handleZoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel((prev) => Math.min(prev + 0.5, 3))
      if (!isZoomed) {
        setIsZoomed(true)
        onZoomChange?.(true)
      }
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel((prev) => Math.max(prev - 0.5, 1))
      if (zoomLevel <= 1.5) {
        setIsZoomed(false)
        setPosition({ x: 0, y: 0 })
        onZoomChange?.(false)
      }
    }
  }

  const handleZoomToggle = () => {
    if (isZoomed) {
      setZoomLevel(1)
      setIsZoomed(false)
      setPosition({ x: 0, y: 0 })
      onZoomChange?.(false)
    } else {
      setZoomLevel(2)
      setIsZoomed(true)
      onZoomChange?.(true)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed && e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && isZoomed) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      // Calculate boundaries
      const container = containerRef.current
      if (container) {
        const containerWidth = container.offsetWidth
        const containerHeight = container.offsetHeight
        const imageWidth = containerWidth * zoomLevel
        const imageHeight = containerHeight * zoomLevel

        const maxX = Math.max(0, (imageWidth - containerWidth) / 2)
        const maxY = Math.max(0, (imageHeight - containerHeight) / 2)

        // Constrain position within boundaries
        const constrainedX = Math.max(-maxX, Math.min(maxX, newX))
        const constrainedY = Math.max(-maxY, Math.min(maxY, newY))

        setPosition({ x: constrainedX, y: constrainedY })
      }
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && isZoomed && e.touches.length === 1) {
      const newX = e.touches[0].clientX - dragStart.x
      const newY = e.touches[0].clientY - dragStart.y

      // Calculate boundaries
      const container = containerRef.current
      if (container) {
        const containerWidth = container.offsetWidth
        const containerHeight = container.offsetHeight
        const imageWidth = containerWidth * zoomLevel
        const imageHeight = containerHeight * zoomLevel

        const maxX = Math.max(0, (imageWidth - containerWidth) / 2)
        const maxY = Math.max(0, (imageHeight - containerHeight) / 2)

        // Constrain position within boundaries
        const constrainedX = Math.max(-maxX, Math.min(maxX, newX))
        const constrainedY = Math.max(-maxY, Math.min(maxY, newY))

        setPosition({ x: constrainedX, y: constrainedY })
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isZoomed, isDragging, dragStart])

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/50 shadow-md bg-muted",
        aspectRatio !== "auto" ? aspectRatioClasses[aspectRatio] : "",
        isZoomed ? "cursor-move" : "cursor-zoom-in",
        className,
      )}
      style={aspectRatio === "auto" ? { height } : {}}
      ref={containerRef}
    >
      <div
        className="relative w-full h-full transition-transform duration-200"
        style={{
          transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
        }}
        onClick={handleZoomToggle}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Display annotations */}
      {annotations.map((annotation) => (
        <AnnotationMarker key={annotation.id} annotation={annotation} isEditable={false} />
      ))}

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
          onClick={(e) => {
            e.stopPropagation()
            handleZoomOut()
          }}
          disabled={zoomLevel <= 1}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
          onClick={(e) => {
            e.stopPropagation()
            handleZoomIn()
          }}
          disabled={zoomLevel >= 3}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Zoom indicator */}
      {isZoomed && (
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium shadow-md flex items-center space-x-1">
          <Move className="h-3 w-3" />
          <span>{Math.round(zoomLevel * 100)}%</span>
        </div>
      )}
    </div>
  )
}
