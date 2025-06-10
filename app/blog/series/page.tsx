import { PageBackground } from "@/components/page-background"
import { SeriesCard } from "@/components/series-card"
import { getAllSeries } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SeriesListPage() {
  const allSeries = getAllSeries()

  return (
    <>
      <PageBackground />
      <div className="container py-16 md:py-24">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Blog Series</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Collections of related posts organized into multi-part series for in-depth exploration of topics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {allSeries.map((series) => (
            <SeriesCard key={series.slug} series={series} />
          ))}
        </div>
      </div>
    </>
  )
}
