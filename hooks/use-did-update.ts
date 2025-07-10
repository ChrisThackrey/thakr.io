"use client"

import { useEffect, useRef, type DependencyList } from "react"

/**
 * Execute a function when the component is updated, but not when it is mounted
 * @param callback The function to execute on update
 * @param dependencies The dependencies array
 */
export function useDidUpdate(callback: () => void, dependencies: DependencyList) {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    callback()
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}
