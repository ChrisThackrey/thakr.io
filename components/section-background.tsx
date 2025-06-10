"use client"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export function SectionBackground() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [section, setSection] = useState("")

  useEffect(() => {
    setMounted(true)

    // Determine section from pathname
    if (pathname.startsWith("/blog")) {
      setSection("blog")
    } else if (pathname.startsWith("/projects")) {
      setSection("projects")
    } else if (pathname.startsWith("/architecture")) {
      setSection("architecture")
    } else if (pathname.startsWith("/about")) {
      setSection("about")
    } else if (pathname.startsWith("/work")) {
      setSection("work")
    } else {
      setSection("home")
    }
  }, [pathname])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-5 pointer-events-none">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          section === "blog" ? "opacity-25" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(150, 200, 255, 0.05)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          section === "projects" ? "opacity-25" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(180, 255, 200, 0.05)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          section === "architecture" ? "opacity-25" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(255, 200, 150, 0.05)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          section === "about" ? "opacity-25" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(230, 180, 255, 0.05)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          section === "work" ? "opacity-25" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(255, 220, 220, 0.05)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  )
}
