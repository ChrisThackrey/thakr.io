"use client"

import { getPostsByTag } from "@/lib/blog"
import { BlogPostCard } from "@/components/blog-post-card"
import { ColoredTag } from "@/components/colored-tag"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, SortAsc } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SortOption = "date-new" | "date-old" | "title-asc" | "title-desc"

interface ComparisonViewProps {
  tag1: string
  tag2: string
}

export function ComparisonView({ tag1, tag2 }: ComparisonViewProps) {
  const [sortOption, setSortOption] = useState<SortOption>("date-new")
  const [showIntersection, setShowIntersection] = useState(true)

  let tag1Posts = getPostsByTag(tag1)
  let tag2Posts = getPostsByTag(tag2)

  // Find posts that have both tags
  const intersectionPosts = tag1Posts.filter((post) => post.tags.includes(tag2))

  // If showIntersection is false, filter out posts that have both tags
  if (!showIntersection) {
    tag1Posts = tag1Posts.filter((post) => !post.tags.includes(tag2))
    tag2Posts = tag2Posts.filter((post) => !post.tags.includes(tag1))
  }

  // Apply sorting based on selected option
  const sortPosts = (posts: typeof tag1Posts) => {
    const sorted = [...posts]

    switch (sortOption) {
      case "date-new":
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case "date-old":
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return sorted
    }
  }

  tag1Posts = sortPosts(tag1Posts)
  tag2Posts = sortPosts(tag2Posts)
  const sortedIntersection = showIntersection ? sortPosts(intersectionPosts) : []

  const hasIntersection = intersectionPosts.length > 0
  const intersectionIds = new Set(intersectionPosts.map((post) => post.slug))

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <DropdownMenuRadioItem value="date-new">Newest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date-old">Oldest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="title-asc">Title (A-Z)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="title-desc">Title (Z-A)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {hasIntersection && (
            <Button variant="outline" size="sm" onClick={() => setShowIntersection(!showIntersection)}>
              <Filter className="h-4 w-4 mr-2" />
              {showIntersection ? "Hide Shared Posts" : "Show Shared Posts"}
            </Button>
          )}
        </div>
      </div>

      {/* Shared posts section */}
      {showIntersection && hasIntersection && (
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold">Shared Posts</h2>
            <div className="ml-3 flex gap-2">
              <ColoredTag tag={tag1} />
              <span className="text-muted-foreground">+</span>
              <ColoredTag tag={tag2} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedIntersection.map((post) => (
              <BlogPostCard key={`intersection-${post.slug}`} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4 flex items-center">
            <h2 className="text-xl font-semibold mr-3">
              <ColoredTag tag={tag1} highlightTag className="mr-2" />
              <span>Posts</span>
            </h2>
            <span className="text-sm text-muted-foreground">
              {tag1Posts.length} post{tag1Posts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-6">
            {tag1Posts.length > 0 ? (
              tag1Posts.map((post) => <BlogPostCard key={`tag1-${post.slug}`} post={post} highlightTag={tag1} />)
            ) : (
              <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6 text-center">
                <p className="text-muted-foreground">No unique posts with this tag.</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center">
            <h2 className="text-xl font-semibold mr-3">
              <ColoredTag tag={tag2} highlightTag className="mr-2" />
              <span>Posts</span>
            </h2>
            <span className="text-sm text-muted-foreground">
              {tag2Posts.length} post{tag2Posts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-6">
            {tag2Posts.length > 0 ? (
              tag2Posts.map((post) => <BlogPostCard key={`tag2-${post.slug}`} post={post} highlightTag={tag2} />)
            ) : (
              <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6 text-center">
                <p className="text-muted-foreground">No unique posts with this tag.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
