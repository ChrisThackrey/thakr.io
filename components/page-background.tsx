"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Renders a subtle, decorative background that adapts to the current theme.
 * This component is self-contained and does not rely on importing `/app/layout`.
 */
export function PageBackground() {
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // We need to wait for the component to mount to know the theme.
  // This prevents a hydration mismatch between server and client.
  if (!isMounted) {
    return null
  }

  const backgroundStyle =
    theme === "dark"
      ? {
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03), transparent 40%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03), transparent 40%)",
          backgroundColor: "#020617",
        }
      : {
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.02), transparent 40%), radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.02), transparent 40%)",
          backgroundColor: "#f8fafc",
        }

  return (
    <div className="fixed inset-0 -z-50 transition-colors duration-500" style={backgroundStyle} aria-hidden="true" />
  )
}
