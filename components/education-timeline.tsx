"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, animate } from "framer-motion"
import type { TimelineItemData } from "@/lib/experience-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Briefcase } from "lucide-react"

interface EducationTimelineProps {
  items: TimelineItemData[]
}

// Define card widths and gap for consistent calculations
const CARD_WIDTH_SM = 320 // Fallback for very small screens if calc() is not precise enough for activeIndex
const CARD_WIDTH_MD = 350 // Used for md breakpoint and up for activeIndex
const CARD_GAP = 16 // Corresponds to Tailwind's space-x-4 (1rem)

export function EducationTimeline({ items }: EducationTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null) // The viewport for the draggable content
  const draggableRef = useRef<HTMLDivElement>(null) // The draggable content itself
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  const x = useMotionValue(0) // The current x offset of the draggable content
  const [activeIndex, setActiveIndex] = useState(0) // For the step indicator

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && draggableRef.current && containerRef.current.clientWidth > 0) {
        const containerWidth = containerRef.current.clientWidth // Width of the visible area
        const draggableWidth = draggableRef.current.scrollWidth // Total width of all cards + gaps

        // Calculate the leftmost position the timeline can be dragged to.
        // If draggableWidth <= containerWidth, content fits, so newLeftConstraint will be 0 (no drag to left).
        // Otherwise, it's a negative value representing (containerWidth - draggableWidth).
        // This ensures the right edge of the last card aligns with the right edge of the container.
        const newLeftConstraint = Math.min(0, containerWidth - draggableWidth)

        setDragConstraints({ left: newLeftConstraint, right: 0 })
      } else {
        // Default to no dragging if dimensions aren't available or content doesn't overflow
        setDragConstraints({ left: 0, right: 0 })
      }
    }

    calculateConstraints() // Initial calculation on mount

    // Recalculate constraints if the window is resized or the number of items changes
    window.addEventListener("resize", calculateConstraints)
    return () => window.removeEventListener("resize", calculateConstraints)
  }, [items]) // Dependency: `items` array, as its length affects `draggableWidth`

  // Effect to update the active step indicator based on scroll position
  useEffect(() => {
    const unsubscribeX = x.onChange((latestX) => {
      let currentCardWidthForIndicator = CARD_WIDTH_SM
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 768) {
          // md breakpoint
          currentCardWidthForIndicator = CARD_WIDTH_MD
        }
        // Note: For more precise activeIndex with dynamic card widths like `calc(100vw-5rem)`,
        // you might need to get actual card widths from DOM if CARD_WIDTH_SM/MD aren't representative.
        // However, scrollWidth of draggableRef is the source of truth for drag physics.
      }
      const cardWidthWithGap = currentCardWidthForIndicator + CARD_GAP
      const newActiveIndex = Math.min(items.length - 1, Math.max(0, Math.round(Math.abs(latestX) / cardWidthWithGap)))
      setActiveIndex(newActiveIndex)
    })
    return () => unsubscribeX()
  }, [x, items.length])

  // Handler for clicking on a step indicator dot
  const handleStepClick = (index: number) => {
    if (!draggableRef.current || !containerRef.current) return

    let cardWidthForStep = CARD_WIDTH_SM
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 768) {
        // md breakpoint
        cardWidthForStep = CARD_WIDTH_MD
      }
    }
    const cardWidthWithGap = cardWidthForStep + CARD_GAP
    const targetX = -index * cardWidthWithGap

    // Ensure the targetX is within the calculated drag constraints
    const clampedX = Math.max(dragConstraints.left, Math.min(dragConstraints.right, targetX))

    animate(x, clampedX, {
      type: "spring",
      stiffness: 400,
      damping: 40,
    })
  }

  return (
    <div className="relative py-4">
      {/* Header and View Work Button */}
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-3xl font-bold tracking-tight">Education</h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/work">
            <Briefcase className="mr-2 h-4 w-4" />
            View Work Experience
          </Link>
        </Button>
      </div>

      {/* Step Indicator */}
      <div className="mb-8 flex items-center justify-center px-2">
        <div className="flex items-center">
          {items.map((_, i) => (
            <React.Fragment key={`step-${i}`}>
              <button
                onClick={() => handleStepClick(i)}
                aria-label={`Go to education item ${i + 1}`}
                className={cn(
                  "w-3 h-3 rounded-full border-2 transition-all duration-300 flex-shrink-0",
                  i === activeIndex
                    ? "bg-primary border-primary scale-125"
                    : "border-muted-foreground/50 bg-background hover:border-primary",
                )}
              />
              {i < items.length - 1 && (
                <div
                  className={cn(
                    "w-10 h-0.5 transition-all duration-300",
                    i < activeIndex ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Draggable Timeline Container (Viewport) */}
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing mx-auto max-w-xl px-1">
        {/* Draggable Content */}
        <motion.div
          ref={draggableRef}
          drag="x" // Enable horizontal dragging
          dragConstraints={dragConstraints} // Apply calculated boundaries
          dragElasticity={0} // Crucial: No elastic bounce beyond constraints
          dragMomentum={false} // Crucial: Stop immediately on release, no sliding
          className="flex space-x-4 pb-4" // space-x-4 for gaps, pb-4 for shadow visibility
          style={{ x }} // Bind the motion value to the element's x transform
        >
          {items.map((item) => (
            <motion.div
              key={item.id || item.title} // Ensure unique key
              className="flex-shrink-0 w-[calc(100vw-5rem)] sm:w-[320px] md:w-[350px]"
            >
              <Card className="bg-background/80 backdrop-blur-sm h-full shadow-lg border border-border/30 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground pt-1">{item.company}</p>
                  <p className="text-xs text-muted-foreground/80">{item.date}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground flex-grow">
                    {item.description.map((desc, i) => (
                      <li key={i} className="leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-border/50">
                      {item.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
