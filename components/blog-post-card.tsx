import Image from "next/image"
import Link from "next/link"
import { formatDate } from "../lib/utils"
import { getTagColors } from "../lib/tag-colors"
import type { BlogPost } from "../lib/blog"

interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
}

/**
 * BlogPostCard
 *
 * NOTE: To avoid the HTML validation/hydration error
 * “In HTML, &lt;a&gt; cannot be a descendant of &lt;a&gt;”,
 * the clickable card (outer &lt;Link&gt;) now wraps only the
 * image, title, meta and excerpt.
 * The tag pills are rendered **outside** that link so each
 * remains a valid standalone &lt;Link&gt; element.
 */
export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const { title, date, excerpt, slug, tags, readingTime, image } = post

  return (
    <article
      className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl ${
        featured
          ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      {/* Main clickable area */}
      <Link href={`/blog/${slug}`} className="block group">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=400&width=600&query=blog post"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />

          {featured && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        <div className="p-5">
          <h3
            className={`font-bold mb-2 line-clamp-2 ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            } group-hover:underline`}
          >
            {title}
          </h3>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span>{formatDate(date)}</span>
            <span className="mx-2">•</span>
            <span>{readingTime} min read</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
        </div>
      </Link>

      {/* Tag links rendered outside the main link to avoid nesting */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-5 pb-5 pt-0">
          {tags.map((tag) => (
            <Link
              href={`/blog/categories/${tag}`}
              key={tag}
              className={`text-xs px-2 py-1 rounded-full ${getTagColors(tag)} hover:opacity-80 transition-opacity`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}

export default BlogPostCard
