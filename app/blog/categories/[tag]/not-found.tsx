import { PageBackground } from "@/components/page-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TagNotFound() {
  return (
    <>
      <PageBackground />
      <div className="container py-16 md:py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Category Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">Sorry, we couldn't find any posts with this category.</p>
        <Button asChild>
          <Link href="/blog/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse All Categories
          </Link>
        </Button>
      </div>
    </>
  )
}
