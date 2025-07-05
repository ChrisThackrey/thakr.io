"use client"

import { useState } from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ImageDownloadButtonProps {
  imageUrl: string
  imageName: string
  className?: string
  variant?: "default" | "fullscreen"
}

export function ImageDownloadButton({ imageUrl, imageName, className, variant = "default" }: ImageDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  // Generate a clean filename from the image name
  const getFileName = () => {
    // Remove any path information and get just the filename
    const baseName = imageName.replace(/\s+/g, "-").toLowerCase()

    // Extract extension from URL if possible
    const urlExtension = imageUrl.split(".").pop()?.split("?")[0]
    const extension = urlExtension && /^(jpg|jpeg|png|gif|webp)$/i.test(urlExtension) ? urlExtension : "jpg"

    return `${baseName}.${extension}`
  }

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      // For cross-origin images, we need to use fetch and blob
      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error("Failed to fetch image")

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      // Create a temporary link and trigger download
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = getFileName()
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100)

      toast({
        title: "Download started",
        description: "Your image is being downloaded.",
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download failed",
        description: "Could not download the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const isFullscreen = variant === "fullscreen"

  return (
    <Button
      variant={isFullscreen ? "ghost" : "outline"}
      size="icon"
      onClick={handleDownload}
      disabled={isDownloading}
      className={cn(
        isFullscreen ? "text-white hover:bg-white/20" : "hover:bg-background/80",
        "transition-all duration-200",
        className,
      )}
      aria-label="Download image"
    >
      <Icons.download className={cn("h-4 w-4", isFullscreen && "h-5 w-5")} />
    </Button>
  )
}
