"use client"

import { useEffect, useRef } from "react"

/**
 * A hook that runs a callback at specified intervals
 * @param callback The function to call on each interval
 * @param delay The delay in milliseconds (null to pause)
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback)

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return undefined
  }, [delay])
}
