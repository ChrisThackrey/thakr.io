import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, ListTree } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Series } from "@/lib/blog"
import { cn } from "@/lib/utils"

interface SeriesCardProps {
  series: Series
}

export function SeriesCard({ series }: SeriesCardProps) {
  return (
    <Card className="flex flex-col h-full backdrop-blur-sm bg-background/80 dark:bg-background/80 border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <CardTitle>{series.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          {series.posts.slice(0, 3).map((post, index) => (
            <div key={post.slug} className="space-y-1">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5 shrink-0">
                  Part {index + 1}
                </Badge>
                <Link href={`/blog/${post.slug}`} className="text-sm hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </div>

              {/* Progress indicator for each post */}
              <div className="flex h-0.5 gap-0.5 ml-12">
                {Array.from({ length: series.posts.length }).map((_, i) => (
                  <div
                    key={i}
                    className={cn("h-full flex-1 rounded-full", i <= index ? "bg-primary" : "bg-muted")}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          ))}

          {series.posts.length > 3 && (
            <div className="pt-2">
              <Badge variant="secondary">+{series.posts.length - 3} more posts</Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/blog/series/${series.slug}`} className="text-sm font-medium text-primary hover:underline">
          View Series
        </Link>

        <Button variant="ghost" size="sm" asChild className="h-8 px-2">
          <Link href={`/blog/series/${series.slug}`}>
            <ListTree className="h-4 w-4 mr-1" />
            Table of Contents
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
