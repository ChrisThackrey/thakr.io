"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getIconByName } from "@/contexts/custom-actions-context"
import type { CustomActionType } from "@/types/custom-actions"

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

export interface ActionFormData {
  name: string
  description: string
  icon: string
  type: CustomActionType
  url: string
}

interface ActionFormProps {
  formData: ActionFormData
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSelectChange: (name: keyof ActionFormData, value: string) => void
  idPrefix?: string
}

export function ActionForm({ formData, onFormChange, onSelectChange, idPrefix = "" }: ActionFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}name`}>Name</Label>
        <Input
          id={`${idPrefix}name`}
          name="name"
          value={formData.name}
          onChange={onFormChange}
          placeholder="Action name"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}description`}>Description</Label>
        <Textarea
          id={`${idPrefix}description`}
          name="description"
          value={formData.description}
          onChange={onFormChange}
          placeholder="Describe what this action does"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}icon`}>Icon</Label>
        <Select value={formData.icon} onValueChange={(value) => onSelectChange("icon", value)}>
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
        <Label htmlFor={`${idPrefix}type`}>Action Type</Label>
        <Select value={formData.type} onValueChange={(value) => onSelectChange("type", value as CustomActionType)}>
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
          <Label htmlFor={`${idPrefix}url`}>URL Template</Label>
          <Input
            id={`${idPrefix}url`}
            name="url"
            value={formData.url}
            onChange={onFormChange}
            placeholder="https://example.com/search?q={text}"
          />
          <p className="text-sm text-muted-foreground">
            Use {"{text}"} for selected text, {"{url}"} for current page URL, and {"{title}"} for page title.
          </p>
        </div>
      )}
    </div>
  )
}
