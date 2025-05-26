"use client"

import { useState } from "react"
import { Twitter, Linkedin, Facebook, LinkIcon, Mail, Share2, Check } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { EnhancedButton } from "@/components/micro-interactions/enhanced-button"
import { EnhancedIcon } from "@/components/micro-interactions/enhanced-icon"

interface SocialShareProps {
  title: string
  url: string
  description?: string
  className?: string
  compact?: boolean
  showLabel?: boolean
  platforms?: Array<"twitter" | "linkedin" | "facebook" | "email" | "copy">
}

export function SocialShare({
  title,
  url,
  description = "",
  className = "",
  compact = false,
  showLabel = true,
  platforms = ["twitter", "linkedin", "facebook", "email", "copy"],
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard.",
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        })
        toast({
          title: "Shared successfully",
          description: "The content has been shared.",
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast({
            title: "Share failed",
            description: "Could not share the content.",
            variant: "destructive",
          })
        }
      }
    } else {
      handleCopyLink()
    }
  }

  const iconSize = compact ? 16 : 20
  const buttonSize = compact ? "sm" : "default"
  const buttonVariant = compact ? "ghost" : "outline"

  const platformIcons = {
    twitter: <Twitter size={iconSize} />,
    linkedin: <Linkedin size={iconSize} />,
    facebook: <Facebook size={iconSize} />,
    email: <Mail size={iconSize} />,
    copy: copied ? <Check size={iconSize} /> : <LinkIcon size={iconSize} />,
  }

  const platformLabels = {
    twitter: "Twitter",
    linkedin: "LinkedIn",
    facebook: "Facebook",
    email: "Email",
    copy: copied ? "Copied" : "Copy link",
  }

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {/* Native share button for mobile */}
      {typeof navigator !== "undefined" && "share" in navigator && (
        <EnhancedButton
          variant={buttonVariant}
          size={buttonSize}
          onClick={handleShare}
          className="sm:hidden"
          aria-label="Share"
        >
          <EnhancedIcon>
            <Share2 size={iconSize} />
          </EnhancedIcon>
          {showLabel && <span className="ml-2">Share</span>}
        </EnhancedButton>
      )}

      {/* Platform-specific share buttons */}
      <div className={cn("hidden sm:flex flex-wrap gap-2", compact ? "items-center" : "")}>
        {platforms.includes("twitter") && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <EnhancedButton
                  variant={buttonVariant}
                  size={buttonSize}
                  onClick={() => window.open(shareLinks.twitter, "_blank")}
                  aria-label="Share on Twitter"
                >
                  <EnhancedIcon>{platformIcons.twitter}</EnhancedIcon>
                  {showLabel && <span className="ml-2">{platformLabels.twitter}</span>}
                </EnhancedButton>
              </TooltipTrigger>
              <TooltipContent className="micro-tooltip">
                <p>Share on Twitter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {platforms.includes("linkedin") && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <EnhancedButton
                  variant={buttonVariant}
                  size={buttonSize}
                  onClick={() => window.open(shareLinks.linkedin, "_blank")}
                  aria-label="Share on LinkedIn"
                >
                  <EnhancedIcon>{platformIcons.linkedin}</EnhancedIcon>
                  {showLabel && <span className="ml-2">{platformLabels.linkedin}</span>}
                </EnhancedButton>
              </TooltipTrigger>
              <TooltipContent className="micro-tooltip">
                <p>Share on LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {platforms.includes("facebook") && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <EnhancedButton
                  variant={buttonVariant}
                  size={buttonSize}
                  onClick={() => window.open(shareLinks.facebook, "_blank")}
                  aria-label="Share on Facebook"
                >
                  <EnhancedIcon>{platformIcons.facebook}</EnhancedIcon>
                  {showLabel && <span className="ml-2">{platformLabels.facebook}</span>}
                </EnhancedButton>
              </TooltipTrigger>
              <TooltipContent className="micro-tooltip">
                <p>Share on Facebook</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {platforms.includes("email") && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <EnhancedButton
                  variant={buttonVariant}
                  size={buttonSize}
                  onClick={() => window.open(shareLinks.email, "_blank")}
                  aria-label="Share via Email"
                >
                  <EnhancedIcon>{platformIcons.email}</EnhancedIcon>
                  {showLabel && <span className="ml-2">{platformLabels.email}</span>}
                </EnhancedButton>
              </TooltipTrigger>
              <TooltipContent className="micro-tooltip">
                <p>Share via Email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {platforms.includes("copy") && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <EnhancedButton
                  variant={buttonVariant}
                  size={buttonSize}
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                >
                  <EnhancedIcon>{platformIcons.copy}</EnhancedIcon>
                  {showLabel && <span className="ml-2">{platformLabels.copy}</span>}
                </EnhancedButton>
              </TooltipTrigger>
              <TooltipContent className="micro-tooltip">
                <p>Copy link to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
}
