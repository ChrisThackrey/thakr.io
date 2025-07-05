"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

/**
 * PrintButton – opens the browser’s print dialog.
 * This component is used on the /resume page
 * and must be a NAMED export so that
 *   import { PrintButton } from "@/components/print-button"
 * resolves correctly.
 */
export function PrintButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 bg-transparent"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print()
        }
      }}
      aria-label="Print resume"
    >
      <Icons.printer className="h-4 w-4" />
      Print&nbsp;Resume
    </Button>
  )
}
