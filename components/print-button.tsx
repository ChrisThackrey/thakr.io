"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Button variant="outline" onClick={handlePrint} className="print:hidden bg-transparent">
      <Printer className="mr-2 h-4 w-4" />
      Print
    </Button>
  )
}
