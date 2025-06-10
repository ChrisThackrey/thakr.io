/**
 * Utility for debugging loading issues
 */

// Store loading timestamps for different routes
const loadingTimestamps: Record<string, { start: number; end?: number }> = {}

// Track loading states
let isDebuggingEnabled = false

/**
 * Enable or disable loading debugging
 */
export function enableLoadingDebug(enable = true) {
  isDebuggingEnabled = enable
  if (enable) {
    console.log("Loading debugging enabled")
  }
}

/**
 * Log the start of a loading operation
 */
export function logLoadingStart(route: string) {
  if (!isDebuggingEnabled) return

  loadingTimestamps[route] = { start: Date.now() }
  console.log(`[Loading] Started loading for route: ${route}`)
}

/**
 * Log the end of a loading operation
 */
export function logLoadingEnd(route: string) {
  if (!isDebuggingEnabled) return

  const timestamp = loadingTimestamps[route]
  if (timestamp) {
    timestamp.end = Date.now()
    const duration = timestamp.end - timestamp.start
    console.log(`[Loading] Finished loading for route: ${route} (took ${duration}ms)`)
  } else {
    console.log(`[Loading] Finished loading for route: ${route} (no start timestamp found)`)
  }
}

/**
 * Check if a route has been loading for too long
 */
export function isLoadingTooLong(route: string, threshold = 5000): boolean {
  const timestamp = loadingTimestamps[route]
  if (timestamp && !timestamp.end) {
    const duration = Date.now() - timestamp.start
    return duration > threshold
  }
  return false
}

/**
 * Get all routes that have been loading for too long
 */
export function getStuckRoutes(threshold = 5000): string[] {
  return Object.entries(loadingTimestamps)
    .filter(([_, timestamp]) => !timestamp.end && Date.now() - timestamp.start > threshold)
    .map(([route]) => route)
}

/**
 * Reset loading state for a route
 */
export function resetLoadingState(route: string) {
  if (loadingTimestamps[route]) {
    delete loadingTimestamps[route]
    console.log(`[Loading] Reset loading state for route: ${route}`)
  }
}

// Initialize debugging if in development
if (process.env.NODE_ENV === "development") {
  enableLoadingDebug(true)
}
