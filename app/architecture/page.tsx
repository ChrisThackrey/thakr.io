import type { Metadata } from "next"
import Link from "next/link"
import { DraftingCompass, Sparkles, ArrowRight } from "lucide-react"
import { PageBackground } from "@/components/page-background"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Architecture | Chris Thackrey",
  description:
    "A career spanning design and architecture. Previews of Chris Thackrey's architectural work are coming soon.",
}

const upcomingWorks = ["Modern Urban Housing", "Riverside Cultural Complex", "Tech Innovation Center"]

export default function ArchitecturePage() {
  return (
    <div className="flex flex-col flex-grow">
      <PageBackground />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/60 shadow-sm backdrop-blur-sm">
            <DraftingCompass className="h-8 w-8 text-primary" />
          </div>

          <Badge variant="outline" className="mb-6 gap-1.5 px-3 py-1 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Coming Soon
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Architecture, In the Works
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            My architectural works span a career in design and architecture &mdash; from concept sketches to
            built spaces, shaped by a lasting belief that thoughtful design changes how people live, work, and
            gather. With a background in design at the foundation of everything I build, this page will soon
            preview that body of work.
          </p>

          <div className="mt-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
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
