"use client"

import { useState } from "react"
import { useCustomActions } from "@/contexts/custom-actions-context"
import type { CustomAction } from "@/types/custom-actions"
import { CustomActionsHeader } from "./custom-actions-header"
import { CustomActionsList } from "./custom-actions-list"
import { EditActionDialog } from "./edit-action-dialog"
import type { ActionFormData } from "./action-form"

export function CustomActionsManager() {
  const { actions, updateAction, removeAction, moveAction } = useCustomActions()
  const [editingAction, setEditingAction] = useState<CustomAction | null>(null)

  // Sort actions by position for consistent display
  const sortedActions = [...actions].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

  const handleEdit = (action: CustomAction) => {
    setEditingAction(action)
  }

  const handleSaveEdit = (id: string, data: ActionFormData) => {
    updateAction(id, data)
    setEditingAction(null)
  }

  const handleToggle = (id: string, enabled: boolean) => {
    updateAction(id, { enabled })
  }

  return (
    <div className="space-y-6">
      <CustomActionsHeader />

      <CustomActionsList
        actions={sortedActions}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onRemove={removeAction}
        onMove={moveAction}
      />

      <EditActionDialog
        action={editingAction}
        isOpen={!!editingAction}
        onOpenChange={(isOpen) => !isOpen && setEditingAction(null)}
        onSave={handleSaveEdit}
      />
    </div>
  )
}
