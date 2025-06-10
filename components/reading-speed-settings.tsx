"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Gauge, Save, BookOpen } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useReadingSpeed, READING_SPEED_PRESETS, type ReadingSpeedPreset } from "@/hooks/use-reading-speed"
import { usePathname } from "next/navigation"
import { SpeedReadingMode } from "./speed-reading/speed-reading-mode"
import { detectCurrentBlogPost } from "@/utils/blog-detection"

interface ReadingSpeedSettingsProps {
  inDialog?: boolean
}

export function ReadingSpeedSettings({ inDialog = false }: ReadingSpeedSettingsProps) {
  const { wordsPerMinute, setWordsPerMinute, preset, setPreset } = useReadingSpeed()
  const [isOpen, setIsOpen] = useState(false)
  const [tempWpm, setTempWpm] = useState(wordsPerMinute)
  const pathname = usePathname()

  // State for speed reader
  const [showSpeedReader, setShowSpeedReader] = useState(false)
  const [blogContentId, setBlogContentId] = useState<string | null>(null)
  const [blogSlug, setBlogSlug] = useState<string | null>(null)
  const [blogNotFound, setBlogNotFound] = useState(false)
  const [blogDetectionMessage, setBlogDetectionMessage] = useState<string | null>(null)

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setTempWpm(value[0])
  }

  // Handle preset button click
  const handlePresetClick = (newPreset: ReadingSpeedPreset) => {
    if (newPreset === "custom") return
    setTempWpm(READING_SPEED_PRESETS[newPreset])
  }

  // Save changes
  const handleSave = () => {
    setWordsPerMinute(tempWpm)
    if (!inDialog) {
      setIsOpen(false)
    }
  }

  // Update tempWpm when wordsPerMinute changes
  useEffect(() => {
    setTempWpm(wordsPerMinute)
  }, [wordsPerMinute])

  // Get description for current reading speed
  const getSpeedDescription = (wpm: number) => {
    if (wpm <= READING_SPEED_PRESETS.slow) return "Slow reading pace"
    if (wpm <= READING_SPEED_PRESETS.normal) return "Average reading speed"
    if (wpm <= READING_SPEED_PRESETS.fast) return "Fast reading pace"
    return "Very fast reading pace"
  }

  // Calculate estimated reading time for an average article (1500 words)
  const estimatedMinutes = Math.ceil(1500 / tempWpm)

  // Function to detect and start reading the current blog post
  const startReadingCurrentBlog = () => {
    setBlogNotFound(false)
    setBlogDetectionMessage(null)

    // Use our enhanced blog detection
    try {
      const blogData = detectCurrentBlogPost()

      if (blogData && blogData.element && blogData.slug) {
        setBlogContentId(blogData.contentId)
        setBlogSlug(blogData.slug)
        setShowSpeedReader(true)
        setIsOpen(false) // Close the settings dialog

        // Make sure the element has enough content to read
        const contentLength = blogData.element.textContent?.length || 0
        if (contentLength < 100) {
          setBlogDetectionMessage("Found blog post but content seems too short. Trying anyway.")
        }
      } else {
        if (pathname && pathname.startsWith("/blog/")) {
          setBlogDetectionMessage(`Found blog URL (${pathname}) but couldn't detect content. Try refreshing the page.`)
        } else {
          setBlogDetectionMessage("No blog post detected. Navigate to a blog post first.")
        }
        setBlogNotFound(true)
      }
    } catch (err) {
      console.error("Error detecting blog post:", err)
      setBlogDetectionMessage("Error detecting blog post. Please try again.")
      setBlogNotFound(true)
    }
  }

  // Close the speed reader
  const handleCloseSpeedReader = () => {
    setShowSpeedReader(false)
  }

  // If we're already in a dialog (from mini-player), just render the content
  if (inDialog) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Words per minute</Label>
            <span className="text-sm font-medium">{tempWpm} WPM</span>
          </div>
          <Slider value={[tempWpm]} min={50} max={600} step={25} onValueChange={handleSliderChange} className="mt-2" />
          <p className="text-sm text-muted-foreground mt-1">
            {getSpeedDescription(tempWpm)}. An average 1500-word article would take you about {estimatedMinutes} minute
            {estimatedMinutes !== 1 ? "s" : ""} to read.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Presets</Label>
          <div className="grid grid-cols-4 gap-2">
            <Button
              size="sm"
              variant={tempWpm === READING_SPEED_PRESETS.slow ? "default" : "outline"}
              onClick={() => handlePresetClick("slow")}
            >
              Slow
            </Button>
            <Button
              size="sm"
              variant={tempWpm === READING_SPEED_PRESETS.normal ? "default" : "outline"}
              onClick={() => handlePresetClick("normal")}
            >
              Normal
            </Button>
            <Button
              size="sm"
              variant={tempWpm === READING_SPEED_PRESETS.fast ? "default" : "outline"}
              onClick={() => handlePresetClick("fast")}
            >
              Fast
            </Button>
            <Button
              size="sm"
              variant={tempWpm === READING_SPEED_PRESETS.veryFast ? "default" : "outline"}
              onClick={() => handlePresetClick("veryFast")}
            >
              Very Fast
            </Button>
          </div>
        </div>

        <Button type="submit" onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Apply Settings
        </Button>
      </div>
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="relative" aria-label="Reading speed settings">
            <Gauge className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reading Speed Settings</DialogTitle>
            <DialogDescription>
              Adjust your reading speed to get personalized reading time estimations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Words per minute</Label>
                <span className="text-sm font-medium">{tempWpm} WPM</span>
              </div>
              <Slider
                value={[tempWpm]}
                min={50}
                max={600}
                step={25}
                onValueChange={handleSliderChange}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {getSpeedDescription(tempWpm)}. An average 1500-word article would take you about {estimatedMinutes}{" "}
                minute{estimatedMinutes !== 1 ? "s" : ""} to read.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Presets</Label>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  size="sm"
                  variant={tempWpm === READING_SPEED_PRESETS.slow ? "default" : "outline"}
                  onClick={() => handlePresetClick("slow")}
                >
                  Slow
                </Button>
                <Button
                  size="sm"
                  variant={tempWpm === READING_SPEED_PRESETS.normal ? "default" : "outline"}
                  onClick={() => handlePresetClick("normal")}
                >
                  Normal
                </Button>
                <Button
                  size="sm"
                  variant={tempWpm === READING_SPEED_PRESETS.fast ? "default" : "outline"}
                  onClick={() => handlePresetClick("fast")}
                >
                  Fast
                </Button>
                <Button
                  size="sm"
                  variant={tempWpm === READING_SPEED_PRESETS.veryFast ? "default" : "outline"}
                  onClick={() => handlePresetClick("veryFast")}
                >
                  Very Fast
                </Button>
              </div>
            </div>

            {/* New section for reading current blog */}
            <div className="space-y-2 pt-2 border-t">
              <Label>Quick Actions</Label>
              <div className="flex flex-col gap-2">
                <Button onClick={startReadingCurrentBlog} className="w-full flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Read Current Blog
                </Button>

                {blogNotFound && blogDetectionMessage && (
                  <div className="text-sm text-red-500">{blogDetectionMessage}</div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Speed reader component */}
      {showSpeedReader && blogContentId && blogSlug && (
        <SpeedReadingMode contentId={blogContentId} slug={blogSlug} onClose={handleCloseSpeedReader} />
      )}
    </>
  )
}
