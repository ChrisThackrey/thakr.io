"use client"

import { useState } from "react"
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
}: {
  reference: Reference
  onReadMore: (reference: Reference) => void
  ariaHidden?: boolean
}) {
  return (
    <Card
      aria-hidden={ariaHidden}
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

export function RecommendationsCarousel({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const [selected, setSelected] = useState<Reference | null>(null)

  const dialogOpen = selected !== null

  return (
    <section className={cn("w-full", className)} aria-label="Recommendations">
      <SectionTitle as="h2" className="mb-10">
        Recommendations
      </SectionTitle>
      <div
        className={cn(
          "group relative w-full",
          prefersReducedMotion
            ? "overflow-x-auto pb-4"
            : "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
        )}
      >
        <div
          className={cn("flex w-max gap-5 py-1", !prefersReducedMotion && "animate-marquee")}
          style={dialogOpen ? { animationPlayState: "paused" } : undefined}
        >
          {references.map((reference) => (
            <ReferenceCard key={reference.name} reference={reference} onReadMore={setSelected} />
          ))}
          {/* Second copy makes the marquee loop seamless; hidden from assistive tech */}
          {!prefersReducedMotion &&
            references.map((reference) => (
              <ReferenceCard
                key={`${reference.name}-clone`}
                reference={reference}
                onReadMore={setSelected}
                ariaHidden
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
