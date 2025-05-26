"use client"

import { useState, useRef, useEffect } from "react"
import { Share2, Twitter, Facebook, Linkedin, Mail, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ImageShareMenuProps {
  imageUrl: string
  imageTitle: string
  projectTitle: string
  className?: string
  variant?: "default" | "fullscreen"
}

export function ImageShareMenu({
  imageUrl,
  imageTitle,
  projectTitle,
  className,
  variant = "default",
}: ImageShareMenuProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Generate absolute URL for sharing
  const getShareUrl = () => {
    // Use window.location to get the current URL if we're in the browser
    if (typeof window !== "undefined") {
      // If imageUrl is already absolute, use it directly
      if (imageUrl.startsWith("http")) {
        return imageUrl
      }

      // Otherwise, construct an absolute URL
      const baseUrl = window.location.origin
      return `${baseUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
    }
    return imageUrl
  }

  const shareUrl = getShareUrl()
  const shareText = `Check out this ${imageTitle} from ${projectTitle}`

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(`Architecture Project: ${projectTitle}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: "Link copied",
        description: "Image link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
      })
    }
  }

  // Handle native share API for mobile devices
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: projectTitle,
          text: shareText,
          url: shareUrl,
        })
        toast({
          title: "Shared successfully",
          description: "The image has been shared.",
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast({
            title: "Share failed",
            description: "Could not share the image.",
            variant: "destructive",
          })
        }
      }
    } else {
      setIsOpen(true)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const isFullscreen = variant === "fullscreen"

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      {/* Native share button for mobile */}
      {typeof navigator !== "undefined" && "share" in navigator ? (
        <Button
          variant={isFullscreen ? "ghost" : "outline"}
          size="icon"
          onClick={handleNativeShare}
          className={cn(
            isFullscreen ? "text-white hover:bg-white/20" : "hover:bg-background/80",
            "transition-all duration-200",
          )}
          aria-label="Share image"
        >
          <Share2 className={cn("h-4 w-4", isFullscreen && "h-5 w-5")} />
        </Button>
      ) : (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isFullscreen ? "ghost" : "outline"}
              size="icon"
              className={cn(
                isFullscreen ? "text-white hover:bg-white/20" : "hover:bg-background/80",
                "transition-all duration-200",
              )}
              aria-label="Share image"
            >
              <Share2 className={cn("h-4 w-4", isFullscreen && "h-5 w-5")} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer"
              >
                <Twitter className="mr-2 h-4 w-4" />
                <span>Twitter</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer"
              >
                <Facebook className="mr-2 h-4 w-4" />
                <span>Facebook</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={shareLinks.email} className="flex items-center cursor-pointer">
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink} className="flex items-center cursor-pointer">
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              <span>{copied ? "Copied!" : "Copy link"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
