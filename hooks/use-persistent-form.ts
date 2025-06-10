"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export type SaveStatus = "idle" | "saving" | "saved" | "error"

export function usePersistentForm<T>(key: string, initialState: T, debounceMs = 1000) {
  // Initialize state with a function to properly handle localStorage on mount
  const [state, setState] = useState<T>(() => {
    // Only run in the browser
    if (typeof window !== "undefined") {
      try {
        const savedState = localStorage.getItem(key)
        if (savedState) {
          const parsedState = JSON.parse(savedState)
          return parsedState
        }
      } catch (error) {
        console.error("Error retrieving form data from localStorage:", error)
      }
    }
    return initialState
  })

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")

  // Use a ref for the timer instead of state to avoid re-renders
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(true)

  // Clear any existing timers
  const clearSaveTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Function to save to localStorage without creating a dependency cycle
  const saveToLocalStorage = useCallback(() => {
    clearSaveTimer()

    // Set saving status
    setSaveStatus("saving")

    // Set a new timer
    timerRef.current = setTimeout(() => {
      if (!isMountedRef.current) return

      try {
        localStorage.setItem(key, JSON.stringify(state))
        setSaveStatus("saved")

        // Reset to idle after showing "saved" for 2 seconds
        timerRef.current = setTimeout(() => {
          if (!isMountedRef.current) return
          setSaveStatus("idle")
        }, 2000)
      } catch (error) {
        console.error("Error saving form data to localStorage:", error)
        setSaveStatus("error")

        // Reset to idle after showing "error" for 3 seconds
        timerRef.current = setTimeout(() => {
          if (!isMountedRef.current) return
          setSaveStatus("idle")
        }, 3000)
      }
    }, debounceMs)
  }, [key, state, debounceMs, clearSaveTimer])

  // Update localStorage when state changes
  useEffect(() => {
    saveToLocalStorage()

    // Cleanup function
    return () => {
      clearSaveTimer()
    }
  }, [state, saveToLocalStorage, clearSaveTimer])

  // Set isMountedRef to false when component unmounts
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Function to clear the saved state
  const clearPersistedState = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setState(initialState)
      setSaveStatus("idle")
    } catch (error) {
      console.error("Error clearing form data from localStorage:", error)
      setSaveStatus("error")
    }
  }, [key, initialState])

  // Function to force an immediate save
  const forceSave = useCallback(() => {
    clearSaveTimer()

    try {
      localStorage.setItem(key, JSON.stringify(state))
      setSaveStatus("saved")

      // Reset to idle after showing "saved" for 2 seconds
      timerRef.current = setTimeout(() => {
        if (!isMountedRef.current) return
        setSaveStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Error force saving form data to localStorage:", error)
      setSaveStatus("error")
    }
  }, [key, state, clearSaveTimer])

  return [state, setState, clearPersistedState, saveStatus, forceSave] as const
}
