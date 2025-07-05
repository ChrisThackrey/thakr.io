"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ImageWithAnnotations } from "@/components/image-gallery"
import { useImagePriority } from "@/utils/image-priority-manager"

interface ImageGalleryThumbnailsProps {
  images: ImageWithAnnotations[]
  currentIndex: number
  onThumbnailClick: (index: number) => void
  loadedImages: Set<number>
}

export function ImageGalleryThumbnails({
  images,
  currentIndex,
  onThumbnailClick,
  loadedImages,
}: ImageGalleryThumbnailsProps) {
  const imagePriority = useImagePriority()

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onThumbnailClick(index)}
          className={cn(
            "relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
            currentIndex === index ? "border-primary" : "border-transparent hover:border-primary/50",
          )}
          aria-label={`View image ${index + 1}`}
          onMouseEnter={() => {
            if (imagePriority && !loadedImages.has(index)) {
              const id = `gallery-thumb-${index}-${image.url}`
              imagePriority.queueImage(id, image.url, "medium", () => {})
            }
          }}
        >
          <Image
            src={image.url || "/placeholder.svg"}
            alt={`Thumbnail ${index + 1}`}
            fill
            className="object-cover"
            sizes="96px"
            loading="lazy"
            priority={false}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
          />
          {image.annotations && image.annotations.length > 0 && (
            <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {image.annotations.length}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
