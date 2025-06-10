"use client"

import { useState, useEffect } from "react"

export function useSafeDataLoading<T>(fetchFunction: () => Promise<T>, initialData: T, dependencies: any[] = []) {
  const [data, setData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    fetchFunction()
      .then((result) => {
        if (isMounted) {
          setData(result)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error loading data:", err)
          setError(err)
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, dependencies)

  return { data, isLoading, error }
}
