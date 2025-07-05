"use client"

interface ImageGalleryInfoProps {
  currentIndex: number
  totalImages: number
  caption?: string
}

export function ImageGalleryInfo({ currentIndex, totalImages, caption }: ImageGalleryInfoProps) {
  return (
    <>
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow-md">
        {currentIndex + 1} / {totalImages}
      </div>
      {caption && (
        <div className="absolute bottom-4 left-20 right-4 bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 text-sm shadow-md">
          {caption}
        </div>
      )}
    </>
  )
}
