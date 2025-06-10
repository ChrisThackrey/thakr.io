"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Annotation } from "./image-gallery"
import { AnnotationMarker } from "./annotation-marker"

interface ImageAnnotationToolProps {
  src: string
  alt: string
  aspectRatio?: "square" | "video" | "wide" | "auto"
  height?: string
  onAddAnnotation: (annotation: Annotation) => void
  existingAnnotations: Annotation[]
}

const ANNOTATION_COLORS = [
  { value: "#ef4444", label: "Red" },
  { value: "#f59e0b", label: "Orange" },
  { value: "#10b981", label: "Green" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#8b5cf6", label: "Purple" },
  { value: "#ec4899", label: "Pink" },
]

export function ImageAnnotationTool({
  src,
  alt,
  aspectRatio = "video",
  height = "500px",
  onAddAnnotation,
  existingAnnotations,
}: ImageAnnotationToolProps) {
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false)
  const [annotationPosition, setAnnotationPosition] = useState({ x: 0, y: 0 })
  const [annotationText, setAnnotationText] = useState("")
  const [annotationColor, setAnnotationColor] = useState(ANNOTATION_COLORS[0].value)
  const containerRef = useRef<HTMLDivElement>(null)

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    auto: "",
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setAnnotationPosition({ x, y })
    setIsAddingAnnotation(true)
  }

  const handleAddAnnotation = () => {
    if (annotationText.trim()) {
      const newAnnotation: Annotation = {
        id: `annotation-${Date.now()}`,
        x: annotationPosition.x,
        y: annotationPosition.y,
        text: annotationText,
        color: annotationColor,
      }

      onAddAnnotation(newAnnotation)
      setAnnotationText("")
      setIsAddingAnnotation(false)
    }
  }

  const handleCancel = () => {
    setAnnotationText("")
    setIsAddingAnnotation(false)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/50 shadow-md bg-muted cursor-crosshair",
        aspectRatio !== "auto" ? aspectRatioClasses[aspectRatio] : "",
      )}
      style={aspectRatio === "auto" ? { height } : {}}
      onClick={handleImageClick}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover pointer-events-none"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />

      {/* Existing annotations */}
      {existingAnnotations.map((annotation) => (
        <AnnotationMarker key={annotation.id} annotation={annotation} isEditable={false} />
      ))}

      {/* New annotation popover */}
      {isAddingAnnotation && (
        <Popover open={isAddingAnnotation} onOpenChange={setIsAddingAnnotation}>
          <PopoverTrigger asChild>
            <div
              className="absolute"
              style={{
                left: `${annotationPosition.x}%`,
                top: `${annotationPosition.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse"
                style={{ backgroundColor: annotationColor }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add Annotation</h4>
                <p className="text-sm text-muted-foreground">Add a note about this specific area.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annotation-text">Note</Label>
                <Input
                  id="annotation-text"
                  placeholder="Enter your annotation..."
                  value={annotationText}
                  onChange={(e) => setAnnotationText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleAddAnnotation()
                    }
                  }}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <RadioGroup value={annotationColor} onValueChange={setAnnotationColor}>
                  <div className="grid grid-cols-3 gap-2">
                    {ANNOTATION_COLORS.map((color) => (
                      <div key={color.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={color.value} id={color.value} />
                        <Label htmlFor={color.value} className="flex items-center cursor-pointer">
                          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.value }} />
                          {color.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddAnnotation}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
