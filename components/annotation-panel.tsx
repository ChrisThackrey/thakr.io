"use client"

import { useState } from "react"
import { Edit2, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Annotation } from "./image-gallery"

interface AnnotationPanelProps {
  annotations: Annotation[]
  onUpdateAnnotation: (id: string, text: string) => void
  onDeleteAnnotation: (id: string) => void
}

export function AnnotationPanel({ annotations, onUpdateAnnotation, onDeleteAnnotation }: AnnotationPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const handleEdit = (annotation: Annotation) => {
    setEditingId(annotation.id)
    setEditText(annotation.text)
  }

  const handleSave = (id: string) => {
    if (editText.trim()) {
      onUpdateAnnotation(id, editText)
      setEditingId(null)
      setEditText("")
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditText("")
  }

  if (annotations.length === 0) {
    return null
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Annotations ({annotations.length})</h3>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="p-4 space-y-3">
          {annotations.map((annotation, index) => (
            <div key={annotation.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
              <div
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: annotation.color }}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                {editingId === annotation.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSave(annotation.id)
                        } else if (e.key === "Escape") {
                          handleCancel()
                        }
                      }}
                      className="flex-1"
                      autoFocus
                    />
                    <Button size="icon" variant="ghost" onClick={() => handleSave(annotation.id)}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <p className="text-sm">{annotation.text}</p>
                    <div className="flex items-center space-x-1 ml-2">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleEdit(annotation)}>
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => onDeleteAnnotation(annotation.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
