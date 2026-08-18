"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { skillDescriptions } from "@/lib/experience-data"
import { cn } from "@/lib/utils"

/* Category → badge color, legible in both light and dark themes */
export const skillCategoryClasses: Record<string, string> = {
  "Front End": "border-sky-500/40 bg-sky-500/10 text-sky-700 hover:bg-sky-500/20 dark:text-sky-300",
  "Back End": "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300",
  Deployment: "border-amber-500/40 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 dark:text-amber-300",
  DevOps: "border-violet-500/40 bg-violet-500/10 text-violet-700 hover:bg-violet-500/20 dark:text-violet-300",
}

interface SkillBadgeProps {
  skill: string
  category: string
}

export function SkillBadge({ skill, category }: SkillBadgeProps) {
  const description = skillDescriptions[skill]

  const badge = (
    <Badge
      variant="outline"
      tabIndex={description ? 0 : undefined}
      className={cn("cursor-default", skillCategoryClasses[category])}
    >
      {skill}
    </Badge>
  )

  if (!description) return badge

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-pretty">
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
