"use client"

import type React from "react"
import { useRef, useState } from "react"
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect"

/** CSS pixels in one US-Letter page width (8.5in at 96dpi). */
const PAGE_WIDTH_PX = 816

/**
 * Keeps the fixed-width resume pages looking identical on every screen size
 * by scaling them down (never up) to fit the available width, instead of
 * letting the browser re-flow the text. Printing bypasses the scaling.
 */
export function ResumeScaler({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useIsomorphicLayoutEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const update = () => {
      const next = Math.min(1, outer.clientWidth / PAGE_WIDTH_PX)
      setScale(next)
      setHeight(inner.offsetHeight * next)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(outer)
    observer.observe(inner)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={outerRef} className="rd-scaler" style={{ height }}>
      <div
        ref={innerRef}
        className="rd-scaler-inner"
        style={{ width: PAGE_WIDTH_PX, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  )
}
