"use client"

import { useRef, useEffect, useCallback } from "react"

/**
 * A hook that provides a more efficient way to use requestAnimationFrame
 * with automatic cleanup and performance optimizations.
 *
 * @param callback The function to call on each animation frame
 * @param active Whether the animation should be running
 * @returns A function to manually trigger the callback
 */
export function useAnimationFrame(callback: (deltaTime: number) => void, active = true) {
  // Store the callback function in a ref so we can update it without re-subscribing
  const callbackRef = useRef(callback)
  // Store the last timestamp to calculate delta time
  const timeRef = useRef(0)
  // Store the animation frame ID for cleanup
  const requestRef = useRef<number | null>(null)

  // Update the callback ref when the callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // The animation loop
  const animate = useCallback((time: number) => {
    // If this is the first frame, don't calculate delta time
    if (timeRef.current !== 0) {
      // Calculate delta time in seconds
      const deltaTime = (time - timeRef.current) / 1000
      // Call the callback with delta time
      callbackRef.current(deltaTime)
    }

    // Store the current time for the next frame
    timeRef.current = time
    // Request the next frame
    requestRef.current = requestAnimationFrame(animate)
  }, [])

  // Start or stop the animation based on the active prop
  useEffect(() => {
    if (active) {
      // Start the animation
      requestRef.current = requestAnimationFrame(animate)
    } else if (requestRef.current) {
      // Stop the animation
      cancelAnimationFrame(requestRef.current)
      requestRef.current = null
      // Reset the time ref
      timeRef.current = 0
    }

    // Cleanup on unmount or when active changes
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = null
      }
    }
  }, [active, animate])

  // Return a function to manually trigger the callback
  return useCallback((deltaTime = 0) => {
    callbackRef.current(deltaTime)
  }, [])
}
