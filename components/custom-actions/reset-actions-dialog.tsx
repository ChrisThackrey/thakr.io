"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCustomActions } from "@/contexts/custom-actions-context"
import { Icons } from "@/components/icons"

export function ResetActionsDialog() {
  const { resetToDefaults } = useCustomActions()
  const [isOpen, setIsOpen] = useState(false)

  const handleReset = () => {
    resetToDefaults()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.RefreshCw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Custom Actions</DialogTitle>
          <DialogDescription>
            This will remove all your custom actions and restore the default ones. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleReset}>
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
