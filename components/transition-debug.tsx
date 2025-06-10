"use client"

import { usePathname } from "next/navigation"
import { getTransitionVariant } from "@/utils/transition-variants"
import { useState } from "react"

export function TransitionDebug() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const variant = getTransitionVariant(pathname)

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  const sectionName = pathname.split("/")[1] || "home"

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-black/80 text-white px-3 py-1 rounded-full text-xs"
      >
        {isVisible ? "Hide Transition" : "Show Transition"}
      </button>

      {isVisible && (
        <div className="mt-2 bg-black/80 text-white p-3 rounded-lg text-xs max-w-xs">
          <p className="font-bold">Current Section: {sectionName}</p>
          <p className="mt-1">Transition Type:</p>
          <pre className="mt-1 overflow-auto max-h-32">{JSON.stringify(variant, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
