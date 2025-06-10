"use client"

import { useState, useEffect } from "react"
import { PageBackground } from "@/components/page-background"
import { getAllTags, getPostsByTag } from "@/lib/blog"
import { ColoredTag } from "@/components/colored-tag"
import { ComparisonView } from "@/components/comparison-view"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRightLeft, Info } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function CompareTagsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const allTags = getAllTags()

  // Get tags from URL or use defaults
  const tag1Default = searchParams.get("tag1") || allTags[0]
  const tag2Default = searchParams.get("tag2") || allTags[1]

  const [tag1, setTag1] = useState<string>(tag1Default)
  const [tag2, setTag2] = useState<string>(tag2Default)
  const [isSwapping, setIsSwapping] = useState(false)

  // Update URL when tags change
  useEffect(() => {
    const params = new URLSearchParams()
    params.set("tag1", tag1)
    params.set("tag2", tag2)
    router.replace(`/blog/compare?${params.toString()}`)
  }, [tag1, tag2, router])

  const handleCompare = () => {
    // Already comparing in real-time through state changes
  }

  const handleSwapTags = () => {
    setIsSwapping(true)
    setTimeout(() => {
      setTag1(tag2)
      setTag2(tag1)
      setIsSwapping(false)
    }, 300)
  }

  const tag1Posts = getPostsByTag(tag1)
  const tag2Posts = getPostsByTag(tag2)

  // Find intersection (posts that have both tags)
  const intersectionPosts = tag1Posts.filter((post) => post.tags.includes(tag2))

  const hasIntersection = intersectionPosts.length > 0

  return (
    <>
      <PageBackground />
      <div className="container py-16 md:py-24">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog/categories" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to Categories
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Compare Topics</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore relationships between different topics and see which posts bridge multiple subjects.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
            <div className="space-y-2">
              <label htmlFor="tag1-select" className="text-sm font-medium">
                First Topic
              </label>
              <Select value={tag1} onValueChange={setTag1}>
                <SelectTrigger id="tag1-select" className="w-full">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  {allTags.map((tag) => (
                    <SelectItem key={`tag1-${tag}`} value={tag}>
                      <div className="flex items-center">
                        <ColoredTag tag={tag} className="mr-2" />
                        <span>{tag}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">
                {tag1Posts.length} post{tag1Posts.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapTags}
                className={cn("transition-all duration-300 relative", isSwapping && "rotate-180")}
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span className="sr-only">Swap tags</span>
              </Button>
            </div>

            <div className="space-y-2">
              <label htmlFor="tag2-select" className="text-sm font-medium">
                Second Topic
              </label>
              <Select value={tag2} onValueChange={setTag2}>
                <SelectTrigger id="tag2-select" className="w-full">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  {allTags.map((tag) => (
                    <SelectItem key={`tag2-${tag}`} value={tag}>
                      <div className="flex items-center">
                        <ColoredTag tag={tag} className="mr-2" />
                        <span>{tag}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">
                {tag2Posts.length} post{tag2Posts.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {hasIntersection && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {intersectionPosts.length} shared post{intersectionPosts.length !== 1 ? "s" : ""}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>These posts contain both selected tags</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>

        <ComparisonView tag1={tag1} tag2={tag2} />
      </div>
    </>
  )
}
