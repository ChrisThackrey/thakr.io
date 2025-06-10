"use client"

import React from "react"

import { useState } from "react"
import { useCustomActions, getIconByName } from "@/contexts/custom-actions-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import type { CustomAction, CustomActionType } from "@/types/custom-actions"
import { Plus, Trash2, Edit, MoveUp, MoveDown, RefreshCw } from "lucide-react"

interface ActionFormData {
  name: string
  description: string
  icon: string
  type: CustomActionType
  url: string
}

const initialFormData: ActionFormData = {
  name: "",
  description: "",
  icon: "ExternalLink",
  type: "custom",
  url: "",
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

const iconOptions = [
  { value: "Search", label: "Search" },
  { value: "Globe", label: "Globe" },
  { value: "BookOpen", label: "Book" },
  { value: "Share2", label: "Share" },
  { value: "Copy", label: "Copy" },
  { value: "MessageSquareText", label: "Message" },
  { value: "ExternalLink", label: "External Link" },
]

export function CustomActionsManager() {
  const { actions, addAction, updateAction, removeAction, moveAction, resetToDefaults } = useCustomActions()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState<ActionFormData>(initialFormData)
  const [currentEditId, setCurrentEditId] = useState<string | null>(null)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)

  // Sort actions by position
  const sortedActions = [...actions].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAction = () => {
    addAction(formData)
    setFormData(initialFormData)
    setIsAddDialogOpen(false)
  }

  const handleEditAction = () => {
    if (currentEditId) {
      updateAction(currentEditId, formData)
      setCurrentEditId(null)
      setFormData(initialFormData)
      setIsEditDialogOpen(false)
    }
  }

  const openEditDialog = (action: CustomAction) => {
    setCurrentEditId(action.id)
    setFormData({
      name: action.name,
      description: action.description || "",
      icon: action.icon,
      type: action.type,
      url: action.url || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleToggleAction = (id: string, enabled: boolean) => {
    updateAction(id, { enabled })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Custom Text Actions</h2>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Action name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what this action does"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            {React.createElement(getIconByName(option.value), { className: "mr-2 h-4 w-4" })}
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Action Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value as CustomActionType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                    <SelectContent>
                      {actionTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.type !== "copy" && formData.type !== "summarize" && (
                  <div className="grid gap-2">
                    <Label htmlFor="url">URL Template</Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="https://example.com/search?q={text}"
                    />
                    <p className="text-sm text-muted-foreground">
                      Use {"{text}"} for selected text, {"{url}"} for current page URL, and {"{title}"} for page title.
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAction} disabled={!formData.name}>
                  Add Action
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
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
                <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    resetToDefaults()
                    setIsResetDialogOpen(false)
                  }}
                >
                  Reset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {sortedActions.length === 0 ? (
          <div className="text-center p-8 border rounded-lg">
            <p className="text-muted-foreground">No custom actions defined yet.</p>
          </div>
        ) : (
          sortedActions.map((action) => (
            <Card key={action.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {React.createElement(getIconByName(action.icon), { className: "h-5 w-5" })}
                    <CardTitle>{action.name}</CardTitle>
                  </div>
                  <Switch
                    checked={action.enabled}
                    onCheckedChange={(checked) => handleToggleAction(action.id, checked)}
                  />
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
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(action)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => removeAction(action.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveAction(action.id, "up")}
                    disabled={action.position === 0}
                  >
                    <MoveUp className="h-4 w-4" />
                    <span className="sr-only">Move Up</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveAction(action.id, "down")}
                    disabled={action.position === sortedActions.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                    <span className="sr-only">Move Down</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Custom Action</DialogTitle>
            <DialogDescription>Modify this custom action for selected text.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Action name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this action does"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-icon">Icon</Label>
              <Select value={formData.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        {React.createElement(getIconByName(option.value), { className: "mr-2 h-4 w-4" })}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Action Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value as CustomActionType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  {actionTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.type !== "copy" && formData.type !== "summarize" && (
              <div className="grid gap-2">
                <Label htmlFor="edit-url">URL Template</Label>
                <Input
                  id="edit-url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/search?q={text}"
                />
                <p className="text-sm text-muted-foreground">
                  Use {"{text}"} for selected text, {"{url}"} for current page URL, and {"{title}"} for page title.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAction} disabled={!formData.name}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
