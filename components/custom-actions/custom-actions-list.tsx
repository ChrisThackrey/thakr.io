"use client"
import { CustomActionCard } from "./custom-action-card"
import type { CustomAction } from "@/types/custom-actions"

interface CustomActionsListProps {
  actions: CustomAction[]
  onToggle: (id: string, enabled: boolean) => void
  onEdit: (action: CustomAction) => void
  onRemove: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
}

export function CustomActionsList({ actions, onToggle, onEdit, onRemove, onMove }: CustomActionsListProps) {
  if (actions.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <p className="text-muted-foreground">No custom actions defined yet.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {actions.map((action, index) => (
        <CustomActionCard
          key={action.id}
          action={action}
          isFirst={index === 0}
          isLast={index === actions.length - 1}
          onToggle={onToggle}
          onEdit={onEdit}
          onRemove={onRemove}
          onMove={onMove}
        />
      ))}
    </div>
  )
}
