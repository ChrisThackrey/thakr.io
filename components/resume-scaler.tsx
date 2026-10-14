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
 *
 * The scale is measured on the client, so the server-rendered markup carries
 * no inline transform. Until the first measurement lands (and when JavaScript
 * never runs) the `.rd-scaler:not([data-ready])` rules in resume-document.css
 * keep the unscaled page from overflowing the viewport.
 */
export function ResumeScaler({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<{ scale: number; height: number } | null>(null)

  useIsomorphicLayoutEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const update = () => {
      const scale = Math.min(1, outer.clientWidth / PAGE_WIDTH_PX)
      setLayout({ scale, height: inner.offsetHeight * scale })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(outer)
    observer.observe(inner)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={outerRef} className="rd-scaler" data-ready={layout ? "" : undefined} style={{ height: layout?.height }}>
      <div
        ref={innerRef}
        className="rd-scaler-inner"
        style={{ width: PAGE_WIDTH_PX, transform: layout ? `scale(${layout.scale})` : undefined }}
      >
        {children}
      </div>
    </div>
  )
}
