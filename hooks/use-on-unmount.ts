"use client"

import { useEffect } from "react"

/**
 * Execute a function only once when the component is unmounted
 * @param callback The function to execute on unmount
 */
export function useOnUnmount(callback: () => void) {
  useEffect(() => {
    return callback
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
