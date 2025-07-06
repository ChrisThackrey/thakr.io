"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  code: string
}

export function CopyButton({ code }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true)
      setTimeout(() => {
        setHasCopied(false)
      }, 2000)
    })
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute right-2 top-2 h-7 w-7 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-50"
      onClick={copyToClipboard}
      aria-label="Copy code to clipboard"
    >
      {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}
