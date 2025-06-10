"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue } from "framer-motion"
import type { TimelineItemData } from "@/lib/experience-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Briefcase } from "lucide-react"

interface EducationTimelineProps {
  items: TimelineItemData[]
}

const CARD_WIDTH_SM = 320
const CARD_WIDTH_MD = 350
const CARD_GAP = 16 // space-x-4

export function EducationTimeline({ items }: EducationTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const draggableRef = useRef<HTMLDivElement>(null)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  // For timeline step indicator
  const x = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && draggableRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const draggableWidth = draggableRef.current.scrollWidth
        const newLeftConstraint = Math.min(0, containerWidth - draggableWidth - CARD_GAP) // CARD_GAP for potential end padding
        setDragConstraints({ left: newLeftConstraint, right: 0 })
      }
    }

    calculateConstraints()
    window.addEventListener("resize", calculateConstraints)
    return () => window.removeEventListener("resize", calculateConstraints)
  }, [items])

  useEffect(() => {
    // Update activeIndex based on scroll position (x value of draggable container)
    const unsubscribeX = x.onChange((latestX) => {
      // Determine card width based on screen size for accurate index calculation
      let currentCardWidth = CARD_WIDTH_SM // Default to small
      if (window.innerWidth >= 768) {
        // md breakpoint
        currentCardWidth = CARD_WIDTH_MD
      }

      const cardWidthWithGap = currentCardWidth + CARD_GAP
      const newActiveIndex = Math.min(items.length - 1, Math.max(0, Math.round(Math.abs(latestX) / cardWidthWithGap)))
      setActiveIndex(newActiveIndex)
    })
    return () => unsubscribeX()
  }, [x, items.length])

  return (
    <div className="relative py-4">
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-3xl font-bold tracking-tight">Education</h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/work">
            <Briefcase className="mr-2 h-4 w-4" />
            View Work Experience
          </Link>
        </Button>
      </div>

      {/* Timeline Steps UI */}
      <div className="mb-8 flex items-center justify-center px-2">
        <div className="flex items-center">
          {items.map((_, i) => (
            <React.Fragment key={`step-${i}`}>
              <div
                className={cn(
                  "w-3 h-3 rounded-full border-2 transition-all duration-300",
                  i === activeIndex
                    ? "bg-primary border-primary scale-125"
                    : "border-muted-foreground/50 bg-background",
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

      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          ref={draggableRef}
          drag="x"
          dragConstraints={dragConstraints}
          className="flex space-x-4 pb-4 px-1" // pb-4 for shadow visibility, px-1 for start/end card visibility
          style={{ x }} // Bind motion value
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[calc(100vw-5rem)] sm:w-[320px] md:w-[350px]" // Responsive card width
            >
              <Card className="h-full shadow-lg border border-border/80 hover:shadow-xl transition-shadow duration-300 flex flex-col">
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
