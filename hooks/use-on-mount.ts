"use client"

import { useEffect } from "react"

/**
 * Execute a function only once when the component is mounted
 * @param callback The function to execute on mount
 */
export function useOnMount(callback: () => void | (() => void)) {
  useEffect(() => {
    return callback()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
