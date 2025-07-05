import { AddActionDialog } from "./add-action-dialog"
import { ResetActionsDialog } from "./reset-actions-dialog"

export function CustomActionsHeader() {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Custom Text Actions</h2>
      <div className="flex gap-2">
        <AddActionDialog />
        <ResetActionsDialog />
      </div>
    </div>
  )
}
