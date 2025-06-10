"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { TimelineItemData } from "@/lib/experience-data"
import { Badge } from "@/components/ui/badge"

interface EducationTimelineProps {
  items: TimelineItemData[]
}

export function EducationTimeline({ items }: EducationTimelineProps) {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    if (index < items.length - 1) {
      setIndex(index + 1)
    }
  }

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  const variants = {
    enter: {
      x: 100,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: -100,
      opacity: 0,
    },
  }

  return (
    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Education</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-6 pt-0">
        <div className="relative flex-grow overflow-hidden">
          <AnimatePresence initial={false} custom={index}>
            <motion.div
              key={index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full h-full"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-foreground">{items[index].title}</h3>
                <p className="text-sm text-muted-foreground">{items[index].company}</p>
                <p className="text-xs text-muted-foreground/80">{items[index].date}</p>
                <ul className="list-disc pl-5 pt-2 space-y-1.5">
                  {items[index].description.map((desc, i) => (
                    <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </li>
                  ))}
                </ul>
                {items[index].skills && (
                  <div className="flex flex-wrap gap-2 pt-3">
                    {items[index].skills?.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between pt-4 mt-4 border-t">
          <Button onClick={handlePrev} disabled={index === 0} variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>
          <div className="flex space-x-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === index ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <Button onClick={handleNext} disabled={index === items.length - 1} variant="ghost" size="icon">
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
