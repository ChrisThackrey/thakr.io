"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Annotation } from "./image-gallery"

interface AnnotationMarkerProps {
  annotation: Annotation
  isEditable?: boolean
  onClick?: () => void
}

export function AnnotationMarker({ annotation, isEditable = false, onClick }: AnnotationMarkerProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip open={isHovered}>
        <TooltipTrigger asChild>
          <div
            className="absolute annotation-marker"
            style={{
              left: `${annotation.x}%`,
              top: `${annotation.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
          >
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110 flex items-center justify-center"
              style={{ backgroundColor: annotation.color }}
            >
              <MessageSquare className="h-3 w-3 text-white" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{annotation.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
