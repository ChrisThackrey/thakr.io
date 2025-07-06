"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { getIconByName } from "@/contexts/custom-actions-context"
import type { CustomAction } from "@/types/custom-actions"
import { Edit, Trash, MoveUp, MoveDown } from "lucide-react"

interface CustomActionCardProps {
  action: CustomAction
  isFirst: boolean
  isLast: boolean
  onToggle: (id: string, enabled: boolean) => void
  onEdit: (action: CustomAction) => void
  onRemove: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
}

const actionTypeOptions = [
  { value: "search", label: "Search" },
  { value: "translate", label: "Translate" },
  { value: "define", label: "Define" },
  { value: "share", label: "Share" },
  { value: "copy", label: "Copy to Clipboard" },
  { value: "summarize", label: "Summarize" },
  { value: "custom", label: "Custom URL" },
]

export function CustomActionCard({
  action,
  isFirst,
  isLast,
  onToggle,
  onEdit,
  onRemove,
  onMove,
}: CustomActionCardProps) {
  const ActionIcon = getIconByName(action.icon)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ActionIcon className="h-5 w-5" />
            <CardTitle>{action.name}</CardTitle>
          </div>
          <Switch checked={action.enabled} onCheckedChange={(checked) => onToggle(action.id, checked)} />
        </div>
        {action.description && <CardDescription>{action.description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm">
          <span className="font-medium">Type:</span>{" "}
          {actionTypeOptions.find((opt) => opt.value === action.type)?.label || action.type}
        </div>
        {action.url && <div className="text-sm mt-1 text-muted-foreground truncate">{action.url}</div>}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(action)}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => onRemove(action.id)}>
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onMove(action.id, "up")} disabled={isFirst}>
            <MoveUp className="h-4 w-4" />
            <span className="sr-only">Move Up</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onMove(action.id, "down")} disabled={isLast}>
            <MoveDown className="h-4 w-4" />
            <span className="sr-only">Move Down</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
