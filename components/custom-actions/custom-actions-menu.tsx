"use client"

import { useCustomActions, getIconByName } from "@/contexts/custom-actions-context"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { CustomActionExecutionContext } from "@/types/custom-actions"

interface CustomActionsMenuProps {
  text: string
  title?: string
  url?: string
  maxActions?: number
  className?: string
}

export function CustomActionsMenu({ text, title, url, maxActions = 5, className = "" }: CustomActionsMenuProps) {
  const { actions, executeAction } = useCustomActions()

  // Filter enabled actions and sort by position
  const enabledActions = actions
    .filter((action) => action.enabled)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .slice(0, maxActions)

  const handleActionClick = (actionId: string) => {
    const context: CustomActionExecutionContext = {
      text,
      title,
      url,
    }

    executeAction(actionId, context)
  }

  if (enabledActions.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {enabledActions.map((action) => {
        const Icon = getIconByName(action.icon)

        return (
          <TooltipProvider key={action.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-8 w-8"
                  onClick={() => handleActionClick(action.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{action.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.name}</p>
                {action.description && <p className="text-xs text-muted-foreground">{action.description}</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </div>
  )
}
