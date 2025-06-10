"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, ArrowLeft, Check } from "lucide-react"
import { format } from "date-fns"

interface BookingFormProps {
  selectedDate: Date | null
  initialData?: {
    name: string
    email: string
    topic: string
  }
  onDataChange?: (data: Partial<{ name: string; email: string; topic: string }>) => void
  onSubmit: (data: { name: string; email: string; topic: string }) => void
  onBack: () => void
}

export function BookingForm({ selectedDate, initialData, onDataChange, onSubmit, onBack }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    topic: initialData?.topic || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSavedField, setLastSavedField] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState<Record<string, boolean>>({})

  // Only sync with initialData on mount or when initialData changes significantly
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        topic: initialData.topic || "",
      })
    }
  }, [initialData])

  // Sync with parent component when form data changes
  useEffect(() => {
    // Only notify parent of changes for fields that are marked as dirty
    const changedFields: Partial<typeof formData> = {}
    let hasChanges = false

    Object.keys(isDirty).forEach((field) => {
      if (isDirty[field]) {
        changedFields[field as keyof typeof formData] = formData[field as keyof typeof formData]
        hasChanges = true
      }
    })

    if (hasChanges && onDataChange) {
      onDataChange(changedFields)

      // Reset dirty flags after notifying parent
      setIsDirty({})
    }
  }, [formData, isDirty, onDataChange])

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Mark this field as dirty (changed)
    setIsDirty((prev) => ({
      ...prev,
      [field]: true,
    }))

    // Show saved indicator
    setLastSavedField(field)

    // Clear the field indicator after 2 seconds
    setTimeout(() => {
      setLastSavedField((current) => (current === field ? null : current))
    }, 2000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSubmit(formData)
    setIsSubmitting(false)
  }

  if (!selectedDate) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Enter Your Details</h2>
        <p className="text-muted-foreground">Please provide your information for the meeting.</p>
      </div>

      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{format(selectedDate, "MMMM d, yyyy")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{format(selectedDate, "h:mm a")}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name *
            {lastSavedField === "name" && (
              <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                <Check className="inline h-3 w-3" /> Saved
              </span>
            )}
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email *
            {lastSavedField === "email" && (
              <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                <Check className="inline h-3 w-3" /> Saved
              </span>
            )}
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">
            What would you like to discuss? *
            {lastSavedField === "topic" && (
              <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                <Check className="inline h-3 w-3" /> Saved
              </span>
            )}
          </Label>
          <Textarea
            id="topic"
            value={formData.topic}
            onChange={(e) => handleInputChange("topic", e.target.value)}
            required
            placeholder="I'd like to discuss..."
            rows={4}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Booking..." : "Book Meeting"}
          </Button>
        </div>
      </form>
    </div>
  )
}
