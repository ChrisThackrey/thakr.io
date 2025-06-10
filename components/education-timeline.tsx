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

const CARD_WIDTH_SM = 320
const CARD_WIDTH_MD = 350
const CARD_GAP = 16 // Corresponds to space-x-4

export function EducationTimeline({ items }: EducationTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const draggableRef = useRef<HTMLDivElement>(null)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  const x = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && draggableRef.current) {
        const containerWidth = containerRef.current.clientWidth // Use clientWidth
        const draggableWidth = draggableRef.current.scrollWidth

        // Calculate left constraint: Math.min(0, containerWidth - draggableWidth)
        // This ensures that you can't drag beyond the start (x=0)
        // and you can't drag beyond the end (content fully visible)
        const newLeftConstraint = Math.min(0, containerWidth - draggableWidth)
        setDragConstraints({ left: newLeftConstraint, right: 0 })
      }
    }

    calculateConstraints()
    window.addEventListener("resize", calculateConstraints)
    return () => window.removeEventListener("resize", calculateConstraints)
  }, [items])

  useEffect(() => {
    const unsubscribeX = x.onChange((latestX) => {
      let currentCardWidth = CARD_WIDTH_SM
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

  const handleStepClick = (index: number) => {
    if (!draggableRef.current || !containerRef.current) return

    let currentCardWidth = CARD_WIDTH_SM
    if (window.innerWidth >= 768) {
      // md breakpoint
      currentCardWidth = CARD_WIDTH_MD
    }
    const cardWidthWithGap = currentCardWidth + CARD_GAP
    const newX = -index * cardWidthWithGap

    // Ensure newX is within calculated drag constraints
    const clampedX = Math.max(dragConstraints.left, Math.min(dragConstraints.right, newX))

    animate(x, clampedX, {
      type: "spring",
      stiffness: 400,
      damping: 40,
    })
  }

  return (
    <div className="relative py-4">
      {" "}
      {/* This outer div still takes full grid cell width */}
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-3xl font-bold tracking-tight">Education</h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/work">
            <Briefcase className="mr-2 h-4 w-4" />
            View Work Experience
          </Link>
        </Button>
      </div>
      <div className="mb-8 flex items-center justify-center px-2">
        <div className="flex items-center">
          {items.map((_, i) => (
            <React.Fragment key={`step-${i}`}>
              <button
                onClick={() => handleStepClick(i)}
                aria-label={`Go to item ${i + 1}`}
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
      {/* This div is now narrower and centered within the grid cell */}
      <div
        ref={containerRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing mx-auto max-w-xl px-1" // Reduced width and centered
      >
        <motion.div
          ref={draggableRef}
          drag="x"
          dragConstraints={dragConstraints}
          className="flex space-x-4 pb-4"
          style={{ x }}
        >
          {items.map((item, index) => (
            <motion.div key={index} className="flex-shrink-0 w-[calc(100vw-5rem)] sm:w-[320px] md:w-[350px]">
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
