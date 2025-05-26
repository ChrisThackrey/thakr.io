"use client"

import { useEffect, useCallback } from "react"

type KeyCombination = {
  key: string
  altKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
  metaKey?: boolean
}

export function useKeyboardShortcut(
  keyCombination: KeyCombination | KeyCombination[],
  callback: () => void,
  options: { enabled?: boolean } = {},
) {
  const { enabled = true } = options

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      const combinations = Array.isArray(keyCombination) ? keyCombination : [keyCombination]

      for (const combo of combinations) {
        const keyMatch = event.key.toLowerCase() === combo.key.toLowerCase()
        const altMatch = combo.altKey === undefined || event.altKey === combo.altKey
        const ctrlMatch = combo.ctrlKey === undefined || event.ctrlKey === combo.ctrlKey
        const shiftMatch = combo.shiftKey === undefined || event.shiftKey === combo.shiftKey
        const metaMatch = combo.metaKey === undefined || event.metaKey === combo.metaKey

        if (keyMatch && altMatch && ctrlMatch && shiftMatch && metaMatch) {
          event.preventDefault()
          callback()
          return
        }
      }
    },
    [keyCombination, callback, enabled],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
}
