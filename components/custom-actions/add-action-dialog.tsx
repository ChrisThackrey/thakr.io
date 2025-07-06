"use client"

import type React from "react"
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
import { ActionForm, type ActionFormData } from "./action-form"
import type { CustomActionType } from "@/types/custom-actions"
import { Plus } from "lucide-react"

const initialFormData: ActionFormData = {
  name: "",
  description: "",
  icon: "ExternalLink",
  type: "custom" as CustomActionType,
  url: "",
}

export function AddActionDialog() {
  const { addAction } = useCustomActions()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<ActionFormData>(initialFormData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof ActionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    addAction({ ...formData, enabled: true })
    setFormData(initialFormData)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Add Action
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Custom Action</DialogTitle>
          <DialogDescription>Create a new action for selected text.</DialogDescription>
        </DialogHeader>
        <ActionForm formData={formData} onFormChange={handleInputChange} onSelectChange={handleSelectChange} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.name}>
            Add Action
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
