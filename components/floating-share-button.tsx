"use client"

import { useState } from "react"
import { Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SocialShare } from "@/components/social-share"
import { useScrollPosition } from "@/hooks/use-scroll-position"

interface FloatingShareButtonProps {
  title: string
  url: string
  description?: string
  threshold?: number
}

export function FloatingShareButton({ title, url, description, threshold = 300 }: FloatingShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const scrollPosition = useScrollPosition()
  const isVisible = scrollPosition > threshold

  const toggleShare = () => {
    setIsOpen(!isOpen)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-20 right-4 z-50 md:hidden">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg p-4 animate-in slide-in-from-right">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Share this article</h3>
            <Button variant="ghost" size="sm" onClick={toggleShare} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <SocialShare title={title} url={url} description={description} compact={true} showLabel={false} />
        </div>
      ) : (
        <Button onClick={toggleShare} size="icon" className="h-12 w-12 rounded-full shadow-lg">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      )}
    </div>
  )
}
