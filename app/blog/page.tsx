import type { Metadata } from "next"
import Link from "next/link"
import { PenLine, Sparkles, ArrowRight } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog"
import { PageBackground } from "@/components/page-background"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Blog | Chris Thackrey",
  description:
    "The blog is getting a fresh coat of paint. Articles on software development, AI, and design are coming soon.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const topics = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 8)

  return (
    <div className="flex flex-col flex-grow">
      <PageBackground />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/60 shadow-sm backdrop-blur-sm">
            <PenLine className="h-8 w-8 text-primary" />
          </div>

          <Badge variant="outline" className="mb-6 gap-1.5 px-3 py-1 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Coming Soon
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The Blog Is Almost Here
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            I&apos;m putting the finishing touches on this space. Articles I&apos;ve written on software
            development, AI, and design will soon be detailed here &mdash; deep dives, practical guides, and
            notes from projects I&apos;m building.
          </p>

          {topics.length > 0 && (
            <div className="mt-10">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Topics in the works
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {topics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="px-3 py-1 text-sm font-normal">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

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
