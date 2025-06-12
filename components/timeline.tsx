"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, BriefcaseIcon, FolderKanbanIcon } from "lucide-react"
import type { TimelineItemData, Project } from "@/lib/experience-data"

interface TimelineProps {
  items: TimelineItemData[]
}

interface DisplayListItem {
  id: string
  type: "work" | "project"
  data: TimelineItemData | Project
  originalIndex?: number
  projectIndex?: number
  isFirstInGroup?: boolean
  isLastInGroup?: boolean
}

const DOT_TOP_OFFSET = 2 // Icons positioned 2px from the top
const PROJECT_ICON_HEIGHT = 20 // Corresponds to h-5 (20px)
const WORK_ICON_HEIGHT = 24 // Corresponds to h-6 (24px)

const SPACE_BELOW_ICON = 0 // Line starts exactly at the bottom of the icon

export function Timeline({ items }: TimelineProps) {
  const [expandedWorkItems, setExpandedWorkItems] = useState<Record<number, boolean>>(() => {
    const initialState: Record<number, boolean> = {}
    items.forEach((item, index) => {
      if (item.projects && item.projects.length > 0) {
        initialState[index] = true
      }
    })
    return initialState
  })

  const toggleWorkItemExpansion = (index: number) => {
    setExpandedWorkItems((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const displayList = useMemo((): DisplayListItem[] => {
    const list: DisplayListItem[] = []
    items.forEach((item, workIndex) => {
      list.push({
        id: `work-${workIndex}`,
        type: "work",
        data: item,
        originalIndex: workIndex,
      })
      if (expandedWorkItems[workIndex] && item.projects) {
        item.projects.forEach((project, projectIndex) => {
          list.push({
            id: `project-${workIndex}-${projectIndex}`,
            type: "project",
            data: project,
            originalIndex: workIndex,
            projectIndex: projectIndex,
            isFirstInGroup: projectIndex === 0,
            isLastInGroup: projectIndex === item.projects!.length - 1,
          })
        })
      }
    })
    return list
  }, [items, expandedWorkItems])

  return (
    <div className="relative">
      <AnimatePresence initial={false} mode="popLayout">
        {displayList.map((dispItem, displayIndex) => {
          const isWorkItem = dispItem.type === "work"
          const itemData = dispItem.data as TimelineItemData
          const projectData = dispItem.data as Project
          const isParentWorkItemExpanded =
            dispItem.originalIndex !== undefined ? expandedWorkItems[dispItem.originalIndex] : false

          const currentIconHeight = isWorkItem ? WORK_ICON_HEIGHT : PROJECT_ICON_HEIGHT
          // lineStartY is now the exact vertical position of the bottom of the current icon
          const lineStartY = DOT_TOP_OFFSET + currentIconHeight + SPACE_BELOW_ICON

          const projectItemAnimation = {
            layout: "position" as const,
            initial: { opacity: 0, height: 0, y: 10 },
            animate: {
              opacity: 1,
              height: "auto",
              y: 0,
              transition: { opacity: { duration: 0.2, delay: 0.1 }, height: { duration: 0.25 }, y: { duration: 0.25 } },
            },
            exit: {
              opacity: 0,
              height: 0,
              y: 5,
              transition: { opacity: { duration: 0.15 }, height: { duration: 0.2 }, y: { duration: 0.2 } },
            },
          }

          const workItemAnimation = { layout: "position" as const }
          const itemWrapperClass = isWorkItem ? "pl-12" : "pl-12 ml-6 md:ml-10 overflow-hidden"

          const shouldDrawLine =
            displayIndex < displayList.length - 1 &&
            ((isWorkItem && !isParentWorkItemExpanded) || (!isWorkItem && !dispItem.isLastInGroup))

          // Line extends to reach the TOP of the next icon.
          // The extension needed is exactly DOT_TOP_OFFSET.
          const lineExtensionValuePx = DOT_TOP_OFFSET // Now 2px
          const lineExtensionRem = `${lineExtensionValuePx / 16}rem` // 0.125rem

          const currentIconCenterY = DOT_TOP_OFFSET + currentIconHeight / 2
          const marginBottomPx = 24 // Corresponds to Tailwind's mb-6 (1.5rem * 16px/rem)
          let nextIconCenterYOffsetPx = 0

          if (displayIndex < displayList.length - 1) {
            const nextDispItem = displayList[displayIndex + 1]
            const nextIconHeight = nextDispItem.type === "work" ? WORK_ICON_HEIGHT : PROJECT_ICON_HEIGHT
            nextIconCenterYOffsetPx = DOT_TOP_OFFSET + nextIconHeight / 2
          }

          return (
            <motion.div
              key={dispItem.id}
              className={`relative flex ${itemWrapperClass}`}
              {...(isWorkItem ? workItemAnimation : projectItemAnimation)}
            >
              <div className="absolute left-0 top-0 flex h-full w-12 flex-col items-center">
                <motion.div
                  layout
                  className={`absolute left-[calc(theme(spacing.12)/2)] transform -translate-x-1/2 z-10 flex flex-shrink-0 items-center justify-center rounded-full border-2 bg-background
                ${isWorkItem ? "border-primary h-6 w-6" : "border-slate-400 dark:border-slate-600 h-5 w-5"}`}
                  style={{ top: `${DOT_TOP_OFFSET}px` }} // Icon positioned 2px from top
                >
                  {isWorkItem ? (
                    <BriefcaseIcon className="h-3 w-3 text-primary" />
                  ) : (
                    <FolderKanbanIcon className="h-2.5 w-2.5 text-slate-500 dark:text-slate-400" />
                  )}
                </motion.div>
                {shouldDrawLine && (
                  <motion.div
                    layout
                    className={`absolute left-[calc(theme(spacing.12)/2-1px)] ${isWorkItem ? "w-0.5 bg-primary/50" : "w-0.5 bg-slate-300 dark:bg-slate-700"}`}
                    style={{
                      transformOrigin: "top",
                      top: `${currentIconCenterY}px`,
                      height: `calc(100% - ${currentIconCenterY}px + ${marginBottomPx}px + ${nextIconCenterYOffsetPx}px)`,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                  />
                )}
              </div>

              <Card className={`mb-6 w-full shadow-sm ...`}>
                {isWorkItem ? (
                  <>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <CardTitle className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                            {itemData.title}
                          </CardTitle>
                          <time className="block text-xs font-normal leading-none text-muted-foreground mt-1">
                            {itemData.date}
                          </time>
                          <CardDescription className="text-sm md:text-base font-medium text-muted-foreground mt-0.5">
                            {itemData.company}
                          </CardDescription>
                        </div>
                        {itemData.projects && itemData.projects.length > 0 && dispItem.originalIndex !== undefined && (
                          <Button
                            onClick={() => toggleWorkItemExpansion(dispItem.originalIndex!)}
                            variant="ghost"
                            size="sm"
                            className="px-2 py-1 h-auto text-xs shrink-0"
                            aria-expanded={expandedWorkItems[dispItem.originalIndex!]}
                            aria-controls={`projects-for-${dispItem.id}`}
                          >
                            {expandedWorkItems[dispItem.originalIndex!] ? "Hide" : "Show"} Projects
                            <ChevronDownIcon
                              className={`ml-1.5 h-4 w-4 transition-transform duration-300 ${expandedWorkItems[dispItem.originalIndex!] ? "rotate-180" : ""}`}
                            />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="list-disc pl-5 space-y-1.5 mt-1">
                        {itemData.description.map((desc, i) => (
                          <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                            {desc}
                          </li>
                        ))}
                      </ul>
                      {itemData.skills && itemData.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {itemData.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="font-medium">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="text-md md:text-lg font-semibold text-foreground/90">
                        {projectData.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="list-disc pl-5 space-y-1 mb-3">
                        {projectData.description.map((desc, i) => (
                          <li key={i} className="text-xs md:text-sm leading-relaxed text-muted-foreground">
                            {desc}
                          </li>
                        ))}
                      </ul>
                      {projectData.skills && projectData.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {projectData.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="font-normal text-xs h-auto px-1.5 py-0.5 border-primary/30 text-muted-foreground"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </>
                )}
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
