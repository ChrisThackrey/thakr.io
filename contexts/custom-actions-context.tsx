"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Search, Globe, BookOpen, Share2, Copy, MessageSquareText, ExternalLink } from "lucide-react"
import type { CustomAction, CustomActionExecutionContext, CustomActionProviderState } from "@/types/custom-actions"
import { toast } from "@/hooks/use-toast"

// Default actions that will be available to all users
const defaultActions: CustomAction[] = [
  {
    id: "search-google",
    name: "Search Google",
    description: "Search for the selected text on Google",
    icon: "Search",
    type: "search",
    url: "https://www.google.com/search?q={text}",
    position: 0,
    enabled: true,
  },
  {
    id: "translate-google",
    name: "Translate",
    description: "Translate the selected text with Google Translate",
    icon: "Globe",
    type: "translate",
    url: "https://translate.google.com/?text={text}",
    position: 1,
    enabled: true,
  },
  {
    id: "define-dictionary",
    name: "Define",
    description: "Look up the definition of the selected text",
    icon: "BookOpen",
    type: "define",
    url: "https://www.merriam-webster.com/dictionary/{text}",
    position: 2,
    enabled: true,
  },
  {
    id: "copy-to-clipboard",
    name: "Copy",
    description: "Copy the selected text to clipboard",
    icon: "Copy",
    type: "copy",
    position: 3,
    enabled: true,
  },
  {
    id: "share-twitter",
    name: "Share on Twitter",
    description: "Share the selected text on Twitter",
    icon: "Share2",
    type: "share",
    url: "https://twitter.com/intent/tweet?text={text}&url={url}",
    position: 4,
    enabled: true,
  },
]

// Create the context
const CustomActionContext = createContext<CustomActionProviderState | undefined>(undefined)

// Storage key for persisting actions
const STORAGE_KEY = "custom-text-actions"

// Helper to get icon component by name
export function getIconByName(name: string) {
  const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    Search,
    Globe,
    BookOpen,
    Share2,
    Copy,
    MessageSquareText,
    ExternalLink,
  }

  return icons[name] || ExternalLink
}

export const CustomActionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actions, setActions] = useState<CustomAction[]>(defaultActions)

  // Load saved actions from localStorage on mount
  useEffect(() => {
    try {
      const savedActions = localStorage.getItem(STORAGE_KEY)
      if (savedActions) {
        setActions(JSON.parse(savedActions))
      }
    } catch (error) {
      console.error("Failed to load custom actions:", error)
    }
  }, [])

  // Save actions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actions))
    } catch (error) {
      console.error("Failed to save custom actions:", error)
    }
  }, [actions])

  // Add a new custom action
  const addAction = (action: Omit<CustomAction, "id">) => {
    const newAction: CustomAction = {
      ...action,
      id: uuidv4(),
      position: actions.length,
      enabled: true,
    }

    setActions((prev) => [...prev, newAction])
    toast({
      title: "Action added",
      description: `"${action.name}" has been added to your custom actions.`,
    })
  }

  // Update an existing action
  const updateAction = (id: string, updates: Partial<CustomAction>) => {
    setActions((prev) => prev.map((action) => (action.id === id ? { ...action, ...updates } : action)))
  }

  // Remove an action
  const removeAction = (id: string) => {
    const actionToRemove = actions.find((a) => a.id === id)
    setActions((prev) => prev.filter((action) => action.id !== id))

    if (actionToRemove) {
      toast({
        title: "Action removed",
        description: `"${actionToRemove.name}" has been removed from your custom actions.`,
      })
    }
  }

  // Move an action up or down in the list
  const moveAction = (id: string, direction: "up" | "down") => {
    const currentIndex = actions.findIndex((a) => a.id === id)
    if (currentIndex === -1) return

    const newActions = [...actions]
    const newIndex = direction === "up" ? Math.max(0, currentIndex - 1) : Math.min(actions.length - 1, currentIndex + 1)

    if (newIndex === currentIndex) return

    // Swap the actions
    const temp = newActions[currentIndex]
    newActions[currentIndex] = newActions[newIndex]
    newActions[newIndex] = temp

    // Update positions
    newActions.forEach((action, index) => {
      action.position = index
    })

    setActions(newActions)
  }

  // Reset to default actions
  const resetToDefaults = () => {
    setActions(defaultActions)
    toast({
      title: "Actions reset",
      description: "Your custom actions have been reset to defaults.",
    })
  }

  // Execute an action based on its type
  const executeAction = async (id: string, context: CustomActionExecutionContext) => {
    const action = actions.find((a) => a.id === id)
    if (!action) return

    const { text, url: pageUrl, title } = context

    try {
      switch (action.type) {
        case "search":
        case "translate":
        case "define":
        case "share":
        case "custom":
          if (action.url) {
            const processedUrl = action.url
              .replace("{text}", encodeURIComponent(text))
              .replace("{url}", encodeURIComponent(pageUrl || window.location.href))
              .replace("{title}", encodeURIComponent(title || document.title))

            window.open(processedUrl, "_blank")
          }
          break

        case "copy":
          await navigator.clipboard.writeText(text)
          toast({
            title: "Copied to clipboard",
            description: "The selected text has been copied to your clipboard.",
          })
          break

        case "summarize":
          // This would be implemented with an AI service
          toast({
            title: "Summarize",
            description: "This feature requires an AI integration.",
          })
          break

        default:
          console.warn("Unknown action type:", action.type)
      }
    } catch (error) {
      console.error("Failed to execute action:", error)
      toast({
        title: "Action failed",
        description: "Failed to execute the action. Please try again.",
        variant: "destructive",
      })
    }
  }

  const value: CustomActionProviderState = {
    actions,
    addAction,
    updateAction,
    removeAction,
    executeAction,
    moveAction,
    resetToDefaults,
  }

  return <CustomActionContext.Provider value={value}>{children}</CustomActionContext.Provider>
}

export const useCustomActions = () => {
  const context = useContext(CustomActionContext)
  if (context === undefined) {
    throw new Error("useCustomActions must be used within a CustomActionProvider")
  }
  return context
}

// Alias so both singular and plural names work
export { CustomActionProvider as CustomActionsProvider }
