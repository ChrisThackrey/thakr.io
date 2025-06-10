"use client"

import { useState, useCallback } from "react"

/**
 * A hook that manages a boolean state with a toggle function
 * @param initialState The initial state value
 * @returns [state, toggle] - Current state and toggle function
 */
export function useToggle(initialState = false): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialState)

  const toggle = useCallback(() => {
    setState((prevState) => !prevState)
  }, [])

  return [state, toggle]
}
