"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ActionForm, type ActionFormData } from "./action-form"
import type { CustomAction, CustomActionType } from "@/types/custom-actions"

interface EditActionDialogProps {
  action: CustomAction | null
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSave: (id: string, data: ActionFormData) => void
}

const initialFormData: ActionFormData = {
  name: "",
  description: "",
  icon: "ExternalLink",
  type: "custom" as CustomActionType,
  url: "",
}

export function EditActionDialog({ action, isOpen, onOpenChange, onSave }: EditActionDialogProps) {
  const [formData, setFormData] = useState<ActionFormData>(initialFormData)

  useEffect(() => {
    if (action) {
      setFormData({
        name: action.name,
        description: action.description || "",
        icon: action.icon,
        type: action.type,
        url: action.url || "",
      })
    } else {
      setFormData(initialFormData)
    }
  }, [action])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof ActionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (action) {
      onSave(action.id, formData)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Custom Action</DialogTitle>
          <DialogDescription>Modify this custom action for selected text.</DialogDescription>
        </DialogHeader>
        <ActionForm
          formData={formData}
          onFormChange={handleInputChange}
          onSelectChange={handleSelectChange}
          idPrefix="edit-"
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.name}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
