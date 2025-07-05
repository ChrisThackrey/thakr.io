import type React from "react"
import type { BlogPost } from "@/lib/blog"
import { RelatedTags } from "./related-tags"
import { BlogContentWrapper } from "./blog-content-wrapper"
import { BlogShareSection } from "./blog-share-section"
import { ReadingProgressIndicator } from "./reading-progress-indicator"
import { BlogPostTOC } from "./blog-post-toc"
import { DynamicReadingTime } from "./dynamic-reading-time"
import { BlogPostTracker } from "./blog-post-tracker"
import { SeriesBanner } from "./series-banner"
import type { Tag } from "@/lib/blog"
import { ColoredTag } from "./colored-tag"

interface BlogPostLayoutProps {
  post: BlogPost
  content: React.ReactNode
  tags?: string[]
  estimatedReadingTime?: number
}

export function BlogPostLayout({ post, content, tags, estimatedReadingTime }: BlogPostLayoutProps) {
  return (
    <div className="relative">
      <ReadingProgressIndicator />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <article className="prose dark:prose-invert lg:prose-lg mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            <span className="mr-4">{post.date}</span>
            {estimatedReadingTime && <DynamicReadingTime initialTime={estimatedReadingTime} className="mr-4" />}
            {post.author && <span>By {post.author}</span>}
          </div>

          {post.series && <SeriesBanner series={post.series} currentPost={post} />}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag: string) => (
                <ColoredTag key={tag} tag={tag as Tag} />
              ))}
            </div>
          )}

          <div className="relative">
            <div className="lg:flex lg:gap-8">
              <div className="lg:w-3/4">
                <BlogContentWrapper>
                  <BlogPostTracker postId={post.slug}>{content}</BlogPostTracker>
                </BlogContentWrapper>

                {tags && tags.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-4">Related Topics</h3>
                    <RelatedTags post={post} />
                  </div>
                )}

                <BlogShareSection post={post} />
              </div>

              <div className="hidden lg:block lg:w-1/4">
                <div className="sticky top-24">
                  <BlogPostTOC />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
