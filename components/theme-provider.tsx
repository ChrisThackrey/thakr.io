"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"
import { ThemeTransition } from "./theme-transition"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Ensure theme is properly initialized
  useEffect(() => {
    // Force a re-render to ensure theme is applied
    const html = document.documentElement
    const currentTheme = localStorage.getItem("theme") || "light"

    if (currentTheme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = html.classList.contains("dark")
          localStorage.setItem("theme", isDark ? "dark" : "light")
        }
      })
    })

    observer.observe(html, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={true} {...props}>
      <ThemeTransition />
      {children}
    </NextThemesProvider>
  )
}

export { useTheme } from "next-themes"
