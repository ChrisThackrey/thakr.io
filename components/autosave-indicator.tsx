"use client"

import { CheckCircle, AlertCircle, Save } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type SaveStatus = "idle" | "saving" | "saved" | "error"

interface AutosaveIndicatorProps {
  status: SaveStatus
  message?: string
  className?: string
}

export function AutosaveIndicator({ status, message, className }: AutosaveIndicatorProps) {
  const getIcon = () => {
    switch (status) {
      case "saving":
        return <Save className="h-4 w-4 animate-pulse" />
      case "saved":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getMessage = () => {
    if (message) return message

    switch (status) {
      case "saving":
        return "Saving..."
      case "saved":
        return "Saved"
      case "error":
        return "Error saving"
      default:
        return ""
    }
  }

  const getColor = () => {
    switch (status) {
      case "saving":
        return "text-muted-foreground"
      case "saved":
        return "text-green-500"
      case "error":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <AnimatePresence>
      {status !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn("flex items-center gap-2 text-xs font-medium", getColor(), className)}
        >
          {getIcon()}
          <span>{getMessage()}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
