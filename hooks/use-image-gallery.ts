"use client"

import { useState, useEffect, useRef } from "react"
import type { Annotation, ImageWithAnnotations } from "@/components/image-gallery"
import { useImagePriority } from "@/utils/image-priority-manager"
import { exportAnnotatedImage, type ExportOptions } from "@/utils/export-annotations"

export const useImageGallery = (initialImages: ImageWithAnnotations[]) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAnnotating, setIsAnnotating] = useState(false)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [imagesWithAnnotations, setImagesWithAnnotations] = useState<ImageWithAnnotations[]>(() => {
    return initialImages.map((image) => ({
      ...image,
      annotations: image.annotations || [],
    }))
  })
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]))
  const [showExportDialog, setShowExportDialog] = useState(false)
  const annotatedImageRef = useRef<HTMLDivElement>(null)
  const imagePriority = useImagePriority()

  const currentImage = imagesWithAnnotations[currentIndex]
  const hasAnnotations = currentImage.annotations && currentImage.annotations.length > 0

  useEffect(() => {
    const imagesToPreload = [
      currentIndex,
      (currentIndex + 1) % imagesWithAnnotations.length,
      (currentIndex - 1 + imagesWithAnnotations.length) % imagesWithAnnotations.length,
    ]

    setLoadedImages((prev) => new Set([...prev, currentIndex]))

    imagesToPreload.forEach((index) => {
      if (!loadedImages.has(index)) {
        const img = new Image()
        img.src = imagesWithAnnotations[index].url
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, index]))
        }

        if (imagePriority) {
          const priority = index === currentIndex ? "high" : "medium"
          const id = `gallery-${index}-${imagesWithAnnotations[index].url}`
          imagePriority.queueImage(id, imagesWithAnnotations[index].url, priority, () => {})
        }
      }
    })
  }, [currentIndex, imagesWithAnnotations, loadedImages, imagePriority])

  useEffect(() => {
    setIsAnnotating(false)
  }, [currentIndex])

  const goToNext = () => {
    if (!isZoomed && !isAnnotating) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesWithAnnotations.length)
    }
  }

  const goToPrevious = () => {
    if (!isZoomed && !isAnnotating) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesWithAnnotations.length) % imagesWithAnnotations.length)
    }
  }

  const goToImage = (index: number) => {
    if (!isZoomed && !isAnnotating) {
      setCurrentIndex(index)
    }
  }

  const handleZoomChange = (zoomed: boolean) => {
    setIsZoomed(zoomed)
  }

  const toggleFullscreen = () => {
    if (!isAnnotating) {
      setIsFullscreen(!isFullscreen)
    }
  }

  const toggleAnnotationMode = () => {
    setIsAnnotating(!isAnnotating)
    if (isZoomed) {
      setIsZoomed(false)
    }
  }

  const toggleShowAnnotations = () => {
    setShowAnnotations(!showAnnotations)
  }

  const addAnnotation = (annotation: Annotation) => {
    setImagesWithAnnotations((prev) => {
      const newImages = [...prev]
      const currentImageAnnotations = [...(newImages[currentIndex].annotations || [])]
      currentImageAnnotations.push(annotation)
      newImages[currentIndex] = {
        ...newImages[currentIndex],
        annotations: currentImageAnnotations,
      }
      return newImages
    })
  }

  const updateAnnotation = (id: string, text: string) => {
    setImagesWithAnnotations((prev) => {
      const newImages = [...prev]
      const currentImageAnnotations = [...(newImages[currentIndex].annotations || [])]
      const annotationIndex = currentImageAnnotations.findIndex((a) => a.id === id)
      if (annotationIndex !== -1) {
        currentImageAnnotations[annotationIndex] = {
          ...currentImageAnnotations[annotationIndex],
          text,
        }
      }
      newImages[currentIndex] = {
        ...newImages[currentIndex],
        annotations: currentImageAnnotations,
      }
      return newImages
    })
  }

  const deleteAnnotation = (id: string) => {
    setImagesWithAnnotations((prev) => {
      const newImages = [...prev]
      const currentImageAnnotations = [...(newImages[currentIndex].annotations || [])]
      const filteredAnnotations = currentImageAnnotations.filter((a) => a.id !== id)
      newImages[currentIndex] = {
        ...newImages[currentIndex],
        annotations: filteredAnnotations,
      }
      return newImages
    })
  }

  const handleExport = async (options: ExportOptions) => {
    if (annotatedImageRef.current) {
      return await exportAnnotatedImage(
        annotatedImageRef.current,
        currentImage.url,
        currentImage.alt,
        currentImage.annotations || [],
        options,
      )
    }
    return { success: false, error: "No image element found" }
  }

  const handleAnnotationUpdateInFullscreen = (index: number, annotations: Annotation[]) => {
    setImagesWithAnnotations((prev) => {
      const newImages = [...prev]
      newImages[index] = {
        ...newImages[index],
        annotations,
      }
      return newImages
    })
  }

  return {
    currentIndex,
    setCurrentIndex,
    isZoomed,
    handleZoomChange,
    isFullscreen,
    setIsFullscreen,
    toggleFullscreen,
    isAnnotating,
    toggleAnnotationMode,
    showAnnotations,
    toggleShowAnnotations,
    imagesWithAnnotations,
    loadedImages,
    showExportDialog,
    setShowExportDialog,
    annotatedImageRef,
    currentImage,
    hasAnnotations,
    goToNext,
    goToPrevious,
    goToImage,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    handleExport,
    handleAnnotationUpdateInFullscreen,
  }
}
