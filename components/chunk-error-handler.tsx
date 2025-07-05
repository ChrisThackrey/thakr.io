"use client"

/**
 * Listens for the common dynamic-import “chunk failed” error.
 * When it happens we trigger a full page reload once, which
 * pulls the newest build’s chunks from the server/CDN.
 */
import { useEffect } from "react"

export function ChunkErrorHandler() {
  useEffect(() => {
    const alreadyTriedReload = sessionStorage.getItem("__chunk_error_reload")

    function handleError(event: ErrorEvent | PromiseRejectionEvent) {
      // Normalise to string message
      const message =
        event instanceof PromiseRejectionEvent ? String(event.reason?.message || "") : String(event.message || "")

      const chunkFailedRegexp = /Loading chunk [\d]+ failed/i

      if (chunkFailedRegexp.test(message)) {
        // Only try to reload once per tab to avoid an infinite loop
        if (!alreadyTriedReload) {
          sessionStorage.setItem("__chunk_error_reload", "1")
          window.location.reload()
        }
      }
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleError)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
