"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { ErrorBoundary } from "@/components/error-boundary"
import { ImageErrorBoundary } from "@/components/image-error-boundary"

interface FeaturedPostsCarouselProps {
  posts: BlogPost[]
  autoPlayInterval?: number
}

export function FeaturedPostsCarousel({ posts, autoPlayInterval = 5000 }: FeaturedPostsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
  }, [posts.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length)
  }, [posts.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Handle autoplay
  useEffect(() => {
    if (!isAutoPlaying || isHovering || prefersReducedMotion) return

    const interval = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovering, goToNext, autoPlayInterval, prefersReducedMotion])

  if (!posts.length) return null

  return (
    <ErrorBoundary componentName="Featured Posts Carousel">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-border shadow-md"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-roledescription="carousel"
        aria-label="Featured blog posts"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out h-[400px] md:h-[450px]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {posts.map((post, index) => (
            <div
              key={post.id || index}
              className="w-full flex-shrink-0 relative"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${posts.length}: ${post.title}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />

              <div className="relative h-full w-full">
                <ImageErrorBoundary>
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </ImageErrorBoundary>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/80 hover:bg-primary text-white border-none"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{post.title}</h2>

                <p className="text-sm md:text-base text-white/90 mb-4 line-clamp-2 md:line-clamp-3">
                  {post.excerpt || post.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/80">
                    {post.date} · {post.readingTime || post.estimatedReadingTime || "5"} min read
                  </div>

                  <Button asChild variant="secondary" className="bg-white text-black hover:bg-white/90">
                    <Link href={`/blog/${post.slug}`}>Read Article</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-30">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-30">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {posts.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                currentIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70",
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>

        {/* Autoplay control */}
        <div className="absolute top-4 right-4 z-30">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs bg-black/30 text-white hover:bg-black/50"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlaying ? "Pause" : "Play"}
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  )
}
