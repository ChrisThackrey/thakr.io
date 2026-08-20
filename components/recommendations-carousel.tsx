"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SectionTitle } from "@/components/section-title"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"
import {
  references,
  getReferenceExcerpt,
  getReferenceInitials,
  type Reference,
} from "@/lib/references-data"

function ReferenceAvatar({ reference, size = 48 }: { reference: Reference; size?: number }) {
  return (
    <Avatar className="border border-border/50 shadow-sm" style={{ height: size, width: size }}>
      {reference.image ? (
        <Image
          src={reference.image}
          alt={`${reference.name} profile photo`}
          width={size}
          height={size}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {getReferenceInitials(reference.name)}
        </AvatarFallback>
      )}
    </Avatar>
  )
}

function ReferenceCard({
  reference,
  onReadMore,
  ariaHidden = false,
  cloneStart = false,
}: {
  reference: Reference
  onReadMore: (reference: Reference) => void
  ariaHidden?: boolean
  cloneStart?: boolean
}) {
  return (
    <Card
      aria-hidden={ariaHidden}
      data-clone-start={cloneStart ? "" : undefined}
      className="w-[300px] sm:w-[360px] shrink-0 bg-background/80 backdrop-blur-sm border border-border/30 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300"
    >
      <CardContent className="flex h-full flex-col pt-6">
        <div className="flex items-center gap-3">
          <ReferenceAvatar reference={reference} />
          <div className="min-w-0">
            <p className="font-semibold leading-tight truncate">{reference.name}</p>
            <p className="text-sm text-muted-foreground leading-snug line-clamp-2">{reference.title}</p>
          </div>
          <Quote className="ml-auto h-5 w-5 shrink-0 text-primary/40" aria-hidden="true" />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-4">
          {getReferenceExcerpt(reference.text)}
        </p>
        <div className="mt-auto pt-4">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 text-primary hover:text-primary"
            tabIndex={ariaHidden ? -1 : undefined}
            onClick={() => onReadMore(reference)}
          >
            Read full recommendation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const MARQUEE_SPEED = 30 // px per second, matches the pace of the old 70s CSS marquee
const RESUME_DELAY = 1500 // ms of idle after a touch/drag before auto-scroll resumes

export function RecommendationsCarousel({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const [selected, setSelected] = useState<Reference | null>(null)

  const dialogOpen = selected !== null

  const scrollerRef = useRef<HTMLDivElement>(null)
  // Two independent pause reasons: the mouse resting over the carousel, and an
  // active press/drag/touch. Kept separate so a click release while still
  // hovering stays paused, and so touch (whose emulated mouse events never
  // "leave") can't wedge the hover pause on permanently.
  const hoveredRef = useRef(false)
  const interactingRef = useRef(false)
  const dialogOpenRef = useRef(dialogOpen)
  dialogOpenRef.current = dialogOpen

  useEffect(() => {
    const scroller = scrollerRef.current
    if (prefersReducedMotion || !scroller) return

    let raf = 0
    let pos = scroller.scrollLeft
    let last: number | null = null
    let resumeAt = 0

    const beginInteraction = () => {
      interactingRef.current = true
    }
    const endInteraction = () => {
      resumeAt = performance.now() + RESUME_DELAY
      interactingRef.current = false
    }
    // Hover tracking is mouse-only: touch fires pointerenter with
    // pointerType "touch" (and emulated mouse events carry no pointerType),
    // so a tap can never set — or fail to clear — the hover pause.
    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hoveredRef.current = true
    }
    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hoveredRef.current = false
    }

    // Desktop mouse drag-to-scroll (touch drag is handled natively by the scroll
    // container). The drag only engages after a small movement threshold so that
    // plain clicks — e.g. the "Read full recommendation" button — are untouched:
    // capturing the pointer on pointerdown would retarget the click away from the button.
    const DRAG_THRESHOLD = 5
    let mouseDown = false
    let dragging = false
    let dragStartX = 0
    let dragStartScroll = 0
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        mouseDown = true
        dragStartX = e.clientX
        dragStartScroll = scroller.scrollLeft
      }
      beginInteraction()
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!mouseDown) return
      if (!dragging) {
        if (Math.abs(e.clientX - dragStartX) < DRAG_THRESHOLD) return
        dragging = true
        scroller.setPointerCapture(e.pointerId)
      }
      // Wrap within the first copy of the list so dragging right (backwards)
      // works even from scrollLeft 0, where the native position would clamp.
      let next = dragStartScroll - (e.clientX - dragStartX)
      const cloneStart = scroller.querySelector<HTMLElement>("[data-clone-start]")
      const wrapWidth = cloneStart?.offsetLeft ?? 0
      if (wrapWidth > 0) next = ((next % wrapWidth) + wrapWidth) % wrapWidth
      scroller.scrollLeft = next
    }
    // Images are natively draggable; an HTML5 drag starting on an avatar would
    // cancel the pointer events and hijack the scroll drag.
    const onDragStart = (e: DragEvent) => e.preventDefault()
    const onPointerEnd = (e: PointerEvent) => {
      mouseDown = false
      if (dragging) {
        dragging = false
        if (scroller.hasPointerCapture(e.pointerId)) scroller.releasePointerCapture(e.pointerId)
      }
      endInteraction()
    }

    // touchstart/touchend cover the full native touch scroll: pointer events
    // are cancelled as soon as the browser takes over the scroll gesture.
    const onTouchStart = beginInteraction
    const onTouchEnd = endInteraction

    scroller.addEventListener("dragstart", onDragStart)
    scroller.addEventListener("pointerdown", onPointerDown)
    scroller.addEventListener("pointermove", onPointerMove)
    scroller.addEventListener("pointerup", onPointerEnd)
    scroller.addEventListener("pointercancel", onPointerEnd)
    scroller.addEventListener("pointerenter", onPointerEnter)
    scroller.addEventListener("pointerleave", onPointerLeave)
    scroller.addEventListener("touchstart", onTouchStart, { passive: true })
    scroller.addEventListener("touchend", onTouchEnd)
    scroller.addEventListener("touchcancel", onTouchEnd)

    const step = (now: number) => {
      raf = requestAnimationFrame(step)
      const dt = last === null ? 0 : now - last
      last = now

      // Adopt any position change made by native touch scrolling / momentum
      if (Math.abs(scroller.scrollLeft - pos) > 1) pos = scroller.scrollLeft

      const autoScrolling =
        !hoveredRef.current &&
        !interactingRef.current &&
        !dialogOpenRef.current &&
        now >= resumeAt
      if (autoScrolling) pos += (MARQUEE_SPEED * dt) / 1000

      // Seamless infinite loop: wrap within the first copy of the list
      const cloneStart = scroller.querySelector<HTMLElement>("[data-clone-start]")
      const wrapWidth = cloneStart?.offsetLeft ?? 0
      if (wrapWidth > 0) {
        if (pos >= wrapWidth) {
          pos -= wrapWidth
          dragStartScroll -= wrapWidth
        } else if (pos < 0) {
          pos += wrapWidth
          dragStartScroll += wrapWidth
        }
      }

      scroller.scrollLeft = pos
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      scroller.removeEventListener("dragstart", onDragStart)
      scroller.removeEventListener("pointerdown", onPointerDown)
      scroller.removeEventListener("pointermove", onPointerMove)
      scroller.removeEventListener("pointerup", onPointerEnd)
      scroller.removeEventListener("pointercancel", onPointerEnd)
      scroller.removeEventListener("pointerenter", onPointerEnter)
      scroller.removeEventListener("pointerleave", onPointerLeave)
      scroller.removeEventListener("touchstart", onTouchStart)
      scroller.removeEventListener("touchend", onTouchEnd)
      scroller.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [prefersReducedMotion])

  return (
    <section className={cn("w-full", className)} aria-label="Recommendations">
      <SectionTitle as="h2" className="mb-10">
        Recommendations
      </SectionTitle>
      <div
        ref={scrollerRef}
        className={cn(
          "group relative w-full",
          prefersReducedMotion
            ? "overflow-x-auto pb-4"
            : "no-scrollbar cursor-grab select-none overflow-x-auto active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
        )}
      >
        <div className="flex w-max gap-5 py-1">
          {references.map((reference) => (
            <ReferenceCard key={reference.name} reference={reference} onReadMore={setSelected} />
          ))}
          {/* Second copy makes the marquee loop seamless; hidden from assistive tech */}
          {!prefersReducedMotion &&
            references.map((reference, index) => (
              <ReferenceCard
                key={`${reference.name}-clone`}
                reference={reference}
                onReadMore={setSelected}
                ariaHidden
                cloneStart={index === 0}
              />
            ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <ReferenceAvatar reference={selected} size={56} />
                  <div className="text-left">
                    <DialogTitle>{selected.name}</DialogTitle>
                    <DialogDescription className="mt-1">{selected.title}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2 text-sm leading-relaxed text-muted-foreground">
                {selected.text.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
