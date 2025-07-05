"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SimpleSpeedReadingModal } from "./simple-speed-reading-modal"

export function SimpleSpeedReadButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="bg-primary/10 hover:bg-primary/20 border-primary/20"
      >
        <Icons.rocket className="h-4 w-4 mr-2" />
        Speed Read
      </Button>

      {isOpen && <SimpleSpeedReadingModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
