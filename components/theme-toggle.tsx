"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EnhancedButton } from "@/components/micro-interactions/enhanced-button"
import { EnhancedIcon } from "@/components/micro-interactions/enhanced-icon"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Only render the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update the handleThemeChange function to ensure it properly triggers the theme change
  const handleThemeChange = (newTheme: string) => {
    setIsAnimating(true)
    // Force theme change by updating localStorage first
    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  if (!mounted) {
    return <Button variant="outline" size="icon" className="w-9 h-9 relative" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EnhancedButton
          variant="outline"
          size="icon"
          className={`relative overflow-hidden ${isAnimating ? "theme-toggle-animating" : ""}`}
          rippleEffect={false}
        >
          <EnhancedIcon scale={false}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </EnhancedIcon>
          <span className="sr-only">Toggle theme</span>
        </EnhancedButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="micro-dropdown">
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className={`micro-btn ${theme === "light" ? "bg-accent" : ""}`}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className={`micro-btn ${theme === "dark" ? "bg-accent" : ""}`}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className={`micro-btn ${theme === "system" ? "bg-accent" : ""}`}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
