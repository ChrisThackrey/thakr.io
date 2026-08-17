import { SectionTitle } from "@/components/section-title"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export async function BlogPreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-sm">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <SectionTitle>From the Blog</SectionTitle>
          <Button asChild variant="outline">
            <Link href="/blog" className="group">
              Visit the Blog
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-background/60 p-8 text-center backdrop-blur-sm md:p-12">
          <Badge variant="outline" className="mb-4 gap-1.5 px-3 py-1 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Coming Soon
          </Badge>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Articles on software development, AI, and design are on the way. Check back soon for deep dives,
            practical guides, and notes from projects I&apos;m building.
          </p>
        </div>
      </div>
    </section>
  )
}
