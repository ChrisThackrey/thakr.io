import { useEffect, useLayoutEffect } from "react"

/**
 * A React hook that uses useLayoutEffect on the client and falls back to useEffect on the server
 * to avoid SSR warnings
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
