"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import { SimpleSpeedReadingModal } from "./simple-speed-reading-modal"
import { cn } from "@/lib/utils"

export function FloatingSpeedButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 z-40 h-12 w-12 rounded-full shadow-lg transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          className,
        )}
        aria-label="Speed read this article"
      >
        <Rocket className="h-5 w-5" />
      </Button>

      {isOpen && <SimpleSpeedReadingModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
