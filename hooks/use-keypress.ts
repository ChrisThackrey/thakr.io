"use client"

import { useEffect, useCallback } from "react"

type KeyHandler = (event: KeyboardEvent) => void

/**
 * A hook that tracks the user's keyboard combinations and key presses
 * @param key The key or keys to listen for
 * @param handler The function to call when the key is pressed
 * @param options Additional options
 */
export function useKeypress(
  key: string | string[],
  handler: KeyHandler,
  { event = "keydown", target = typeof window !== "undefined" ? window : undefined, enabled = true } = {},
) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const keys = Array.isArray(key) ? key : [key]
      if (keys.includes(event.key)) {
        handler(event)
      }
    },
    [key, handler],
  )

  useEffect(() => {
    if (!enabled || !target) return

    target.addEventListener(event, handleKeyPress as EventListener)

    return () => {
      target.removeEventListener(event, handleKeyPress as EventListener)
    }
  }, [event, target, handleKeyPress, enabled])
}
