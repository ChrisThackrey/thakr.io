"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeForce({ theme = "light" }: { theme?: string }) {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Force the theme to light mode after component mounts
    setTheme(theme)
  }, [setTheme, theme])

  return null
}
