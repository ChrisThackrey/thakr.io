"use client"

import { useState, useCallback } from "react"

/**
 * A hook that manages boolean state for UI components like dialogs, modals, and popovers
 * @param initialState The initial state value
 * @returns Object with isOpen state and functions to open, close, and toggle
 */
export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  }
}
