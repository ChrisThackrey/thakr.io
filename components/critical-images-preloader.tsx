"use client"

import { useEffect } from "react"
import { useImagePriority } from "@/utils/image-priority-manager"

interface CriticalImagesPreloaderProps {
  images: string[]
}

export function CriticalImagesPreloader({ images }: CriticalImagesPreloaderProps) {
  const imagePriority = useImagePriority()

  useEffect(() => {
    if (!imagePriority) return

    // Register all critical images with the priority manager
    images.forEach((src, index) => {
      const id = `critical-${index}-${src}`
      imagePriority.queueImage(id, src, "critical", () => {
        // Preload the image
        const img = new Image()
        img.src = src
        // fetchPriority is a valid HTML attribute for resource prioritization
        ;(img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high"
        img.onload = () => {
          imagePriority.imageLoaded(id)
        }
      })
    })
  }, [images, imagePriority])

  // This component doesn't render anything visible
  return null
}
