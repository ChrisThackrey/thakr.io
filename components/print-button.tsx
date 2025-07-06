"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Button variant="outline" onClick={handlePrint} className="print:hidden bg-transparent">
      <Icons.printer className="mr-2 h-4 w-4" />
      Print
    </Button>
  )
}
