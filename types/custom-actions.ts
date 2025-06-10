export type CustomActionType = "search" | "translate" | "define" | "share" | "copy" | "summarize" | "custom"

export interface CustomAction {
  id: string
  name: string
  description?: string
  icon: string
  type: CustomActionType
  url?: string
  command?: string
  shortcut?: string
  color?: string
  position?: number
  enabled: boolean
}

export interface CustomActionExecutionContext {
  text: string
  title?: string
  url?: string
}

export interface CustomActionProviderState {
  actions: CustomAction[]
  addAction: (action: Omit<CustomAction, "id">) => void
  updateAction: (id: string, action: Partial<CustomAction>) => void
  removeAction: (id: string) => void
  executeAction: (id: string, context: CustomActionExecutionContext) => Promise<void>
  moveAction: (id: string, direction: "up" | "down") => void
  resetToDefaults: () => void
}
