/**
 * Utility functions for detecting and working with blog posts
 */

/**
 * Detects if the current page is a blog post and returns relevant information
 */
export function detectCurrentBlogPost() {
  if (typeof window === "undefined") {
    return null
  }

  // Check if we're on a blog post page based on URL
  const pathname = window.location.pathname

  // Debug log to help troubleshoot
  console.log("Detecting blog post at path:", pathname)

  if (pathname && pathname.startsWith("/blog/")) {
    // Extract the slug from the pathname
    const pathParts = pathname.split("/").filter(Boolean)
    const slug = pathParts.length > 1 ? pathParts[1] : null

    if (!slug) return null

    // Skip category and listing pages
    if (["categories", "series", "compare"].includes(slug)) {
      console.log("Skipping known non-blog page:", slug)
      return null
    }

    console.log("Detected potential blog slug:", slug)

    // Try different content ID patterns
    const contentIdFormats = [`blog-post-${slug}`, slug, `post-${slug}`, `article-${slug}`]

    // First try to find using specific IDs
    for (const contentId of contentIdFormats) {
      const element = document.getElementById(contentId)
      if (element) {
        console.log("Found blog content with ID:", contentId)
        return {
          slug,
          contentId,
          element,
        }
      }
    }

    // If we couldn't find by ID, try common article selectors
    console.log("Trying to find content by selectors")

    const articleSelectors = [
      // Try to get the article content using various selectors
      "article .prose",
      ".prose",
      "article",
      "main article",
      ".blog-content",
      ".mdx-content",
      "[data-mdx-content]",
      ".markdown-body",
      // More aggressive selectors as fallback
      "main",
      ".container .mt-4",
      // Direct parent containers
      "#__next main",
      ".container",
    ]

    // Find the first matching element from our selectors
    for (const selector of articleSelectors) {
      const element = document.querySelector(selector)
      if (element && element.textContent && element.textContent.trim().length > 100) {
        console.log("Found blog content with selector:", selector)

        // Create a dynamic ID if needed
        if (!element.id) {
          const dynamicId = `dynamic-blog-${slug}`
          element.id = dynamicId
          console.log("Assigned dynamic ID:", dynamicId)
        }

        return {
          slug,
          contentId: element.id,
          element: element as HTMLElement,
        }
      }
    }

    console.log("Could not find article content on page")
  }

  return null
}

/**
 * Gets the estimated reading time for a blog post
 */
export function getEstimatedReadingTime(element: HTMLElement, wordsPerMinute = 225): number {
  if (!element) return 0

  // Get text content
  const text = element.textContent || ""

  // Count words (roughly)
  const wordCount = text.split(/\s+/).filter(Boolean).length

  // Calculate reading time in minutes
  return Math.ceil(wordCount / wordsPerMinute)
}
