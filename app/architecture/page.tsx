import type { Metadata } from "next"
import Link from "next/link"
import { DraftingCompass, Sparkles, ArrowRight } from "lucide-react"
import { VideoBackground } from "@/components/video-background"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Architecture | Chris Thackrey",
  description:
    "A career spanning design and architecture. Previews of Chris Thackrey's architectural work are coming soon.",
}

const upcomingWorks = [
  "Tallinn Architecture Biennale Featured Work (Estonia)",
  "Royal Museum of Yangzhou (China)",
  "Student Workshops (Asia and Europe)",
  "Master Architecture Thesis (Sci-Arc)",
  "GRD Masterplan (Dubai)",
  "Undergraduate Integrated Thesis (Texas A&M)",
  "Synapse Dress Design for Anouk Wipprecht (Netherlands)",
  "Xuberance Essence Lighting Series (Shanghai, China)",
  "Evolo Competition Plexus Tower (Published Winner)",
  "LOT22 - International Design Competition Winning Entry",
]

export default function ArchitecturePage() {
  return (
    <div className="flex min-h-dvh flex-grow flex-col justify-center">
      <VideoBackground src="/videos/arch-bg.mp4" poster="/videos/arch-bg-poster.jpg" />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/60 shadow-sm backdrop-blur-sm">
            <DraftingCompass className="h-8 w-8 text-primary" />
          </div>

          <Badge variant="outline" className="mb-6 gap-1.5 bg-background/40 px-3 py-1 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Coming Soon
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Architecture, In the Works
          </h1>

          <p className="mx-auto mt-6 max-w-xl rounded-2xl bg-background/40 p-4 text-lg text-foreground/80 backdrop-blur-sm sm:text-xl">
            My architectural works span a career in design and architecture &mdash; from concept sketches to
            built spaces, shaped by a lasting belief that thoughtful design changes how people live, work, and
            gather. With a background in design at the foundation of everything I build, this page will soon
            preview that body of work.
          </p>

          <div className="mt-10">
            <p className="mb-4 inline-block rounded-full bg-background/40 px-3 py-1 text-sm font-medium uppercase tracking-wider text-foreground/80 backdrop-blur-sm">
              Selected works in preparation
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {upcomingWorks.map((work) => (
                <Badge key={work} variant="secondary" className="px-3 py-1 text-sm font-normal">
                  {work}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/projects" className="group">
                Explore My Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
