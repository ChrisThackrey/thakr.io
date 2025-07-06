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
  originalIndex?: number // Index in the original `items` array, for work items
  projectIndex?: number // Index within a work item's projects array
  isFirstInGroup?: boolean // Is this the first project in its group?
  isLastInGroup?: boolean // Is this the last project in its group?
}

const DOT_TOP_OFFSET = 2 // Icons positioned 2px from the top of their card alignment area
const PROJECT_ICON_HEIGHT = 20 // Corresponds to h-5 (20px)
const WORK_ICON_HEIGHT = 24 // Corresponds to h-6 (24px)

export function Timeline({ items }: TimelineProps) {
  const [expandedWorkItems, setExpandedWorkItems] = useState<Record<number, boolean>>(() => {
    const initialState: Record<number, boolean> = {}
    items.forEach((item, index) => {
      if (item.projects && item.projects.length > 0) {
        initialState[index] = true // Default to expanded if projects exist
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
          const itemData = dispItem.data as TimelineItemData // Cast for work items
          const projectData = dispItem.data as Project // Cast for project items

          const currentIconHeight = isWorkItem ? WORK_ICON_HEIGHT : PROJECT_ICON_HEIGHT

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

          let shouldDrawLine = false
          let lineClass = "" // Will be set if shouldDrawLine is true

          const nextItem = displayIndex < displayList.length - 1 ? displayList[displayIndex + 1] : null

          if (nextItem) {
            // A line can only be drawn if there's a subsequent item
            if (isWorkItem) {
              const workData = itemData // Already TimelineItemData
              const isExpanded = expandedWorkItems[dispItem.originalIndex!]
              const hasProjects = workData.projects && workData.projects.length > 0

              if (isExpanded && hasProjects) {
                // Per the rule, if a work item is expanded to show its projects,
                // it should not draw a connecting line downwards itself.
                shouldDrawLine = false
              } else {
                // Work item is collapsed OR has no projects: line connects to the *next work item* if it exists
                if (nextItem.type === "work") {
                  shouldDrawLine = true
                  lineClass = "w-0.5 bg-primary/50"
                }
              }
            } else {
              // Current item is a Project
              // A project item only draws a line if it's NOT the last in its group
              // AND the next item is another project in the same group.
              if (!dispItem.isLastInGroup && nextItem.type === "project") {
                // Ensure originalIndex matches, meaning they belong to the same parent work item
                if (dispItem.originalIndex === nextItem.originalIndex) {
                  shouldDrawLine = true
                  lineClass = "w-0.5 bg-slate-300 dark:bg-slate-700"
                }
              }
              // If dispItem.isLastInGroup is true, shouldDrawLine remains false for projects,
              // fulfilling the rule that the last project in a group does not draw a line.
            }
          }

          const marginBottomPx = 24 // Corresponds to Tailwind's mb-6 (1.5rem * 16px/rem)

          return (
            <motion.div
              key={dispItem.id}
              className={`relative flex ${itemWrapperClass}`}
              {...(isWorkItem ? workItemAnimation : projectItemAnimation)}
            >
              <div className="absolute left-0 top-0 flex h-full w-12 flex-col items-center">
                <motion.div
                  className={`absolute left-0 right-0 mx-auto z-10 flex flex-shrink-0 items-center justify-center rounded-full border-2 bg-background
        ${isWorkItem ? "border-primary h-6 w-6" : "border-slate-400 dark:border-slate-600 h-5 w-5"}`}
                  style={{ top: `${DOT_TOP_OFFSET}px` }}
                >
                  {isWorkItem ? (
                    <BriefcaseIcon className="h-3 w-3 text-primary" />
                  ) : (
                    <FolderKanbanIcon className="h-2.5 w-2.5 text-slate-500 dark:text-slate-400" />
                  )}
                </motion.div>

                {/* Line rendering logic */}
                {shouldDrawLine && (
                  <motion.div
                    key={`line-for-${dispItem.id}`}
                    className={`absolute left-0 right-0 mx-auto ${lineClass}`}
                    style={{
                      transformOrigin: "top",
                      top: `${DOT_TOP_OFFSET + currentIconHeight}px`,
                      height: `calc(100% - ${currentIconHeight}px + ${marginBottomPx}px)`,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1, transition: { duration: 0.2 } }}
                    exit={{ scaleY: 0, transition: { duration: 0.15 } }}
                  />
                )}
              </div>

              <Card
                className={`mb-6 w-full shadow-sm hover:shadow-md transition-shadow duration-300 ${isWorkItem ? "bg-card" : "bg-card/80 dark:bg-card/60"}`}
              >
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
                        {projectData.link ? (
                          <a 
                            href={projectData.link} 
                            target={projectData.link.startsWith('http') ? '_blank' : undefined}
                            rel={projectData.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="hover:text-primary transition-colors duration-200"
                          >
                            {projectData.name}
                          </a>
                        ) : (
                          projectData.name
                        )}
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
