/**
 * Utilities for highlighting text in the document
 */

// CSS class for highlighted words
const HIGHLIGHT_CLASS = "speed-reading-highlight"

/**
 * Highlights the current word in the document
 * This is the function imported by speed-reading-mode.tsx
 *
 * @param word The word to highlight
 * @param container Optional container to limit the search scope
 * @returns The highlighted element or null if not found
 */
export function highlightCurrentWord(word: string, container?: HTMLElement): HTMLElement | null {
  // Use document.body as the default container if none provided
  const searchContainer = container || document.body

  if (!word || word.trim() === "") return null

  // Clean up previous highlights
  clearHighlights()

  // Try to find and highlight the word
  const highlightedElement = highlightWord(searchContainer, word)

  // Scroll the highlighted element into view if found
  if (highlightedElement) {
    scrollHighlightIntoView(highlightedElement)
  }

  return highlightedElement
}

/**
 * Highlights a specific word within a container element
 *
 * @param container The container element to search within
 * @param word The word to highlight
 * @returns The highlighted element or null if not found
 */
export function highlightWord(container: HTMLElement, word: string): HTMLElement | null {
  if (!container || !word) return null

  // Normalize the word for comparison
  const normalizedWord = word.trim().toLowerCase()

  // First, try to find in elements with data-blog-content attribute
  const blogContentElements = container.querySelectorAll("[data-blog-content], .speed-reading-content")

  // If we found blog content elements, search within them
  if (blogContentElements.length > 0) {
    for (const contentElement of blogContentElements) {
      const result = findAndHighlightInElement(contentElement as HTMLElement, normalizedWord)
      if (result) return result
    }
  } else {
    // Otherwise, search in the entire container
    return findAndHighlightInElement(container, normalizedWord)
  }

  return null
}

/**
 * Find and highlight a word in a specific element
 */
function findAndHighlightInElement(element: HTMLElement, normalizedWord: string): HTMLElement | null {
  // Find the text node containing the word
  const textNodes = findTextNodes(element)

  for (const node of textNodes) {
    if (!node.textContent) continue

    const text = node.textContent.toLowerCase()

    // Try exact match first
    let index = text.indexOf(normalizedWord)

    // If not found, try with word boundaries
    if (index === -1) {
      const wordPattern = new RegExp(`\\b${escapeRegExp(normalizedWord)}\\b`, "i")
      const match = wordPattern.exec(node.textContent)
      if (match) {
        index = match.index
      }
    }

    if (index !== -1) {
      try {
        // Create a range for the word
        const range = document.createRange()
        range.setStart(node, index)
        range.setEnd(node, index + normalizedWord.length)

        // Create a span element to wrap the word
        const span = document.createElement("span")
        span.className = HIGHLIGHT_CLASS
        span.style.willChange = "opacity, background-color"
        range.surroundContents(span)

        return span
      } catch (e) {
        console.error("Error highlighting word:", e)
        // Continue to next node if this one fails
      }
    }
  }

  return null
}

/**
 * Clears all highlights from the document
 */
export function clearHighlights(): void {
  const highlights = document.querySelectorAll(`.${HIGHLIGHT_CLASS}`)
  highlights.forEach((highlight) => {
    const parent = highlight.parentNode
    if (parent) {
      parent.replaceChild(document.createTextNode(highlight.textContent || ""), highlight)
      parent.normalize()
    }
  })
}

/**
 * Finds all text nodes within a container
 */
function findTextNodes(container: HTMLElement): Text[] {
  const textNodes: Text[] = []
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      // Skip nodes in script, style, and code elements
      const parent = node.parentElement
      if (
        parent?.tagName === "SCRIPT" ||
        parent?.tagName === "STYLE" ||
        parent?.tagName === "CODE" ||
        parent?.classList.contains("speed-reading-player")
      ) {
        return NodeFilter.FILTER_REJECT
      }

      // Accept non-empty text nodes
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    },
  } as any)

  let node
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text)
  }

  return textNodes
}

/**
 * Scrolls a highlighted element into view with a smooth animation
 */
function scrollHighlightIntoView(element: HTMLElement): void {
  if (!element) return

  // Get element's position
  const rect = element.getBoundingClientRect()

  // Check if element is already in viewport
  const isInViewport =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  if (!isInViewport) {
    // Calculate optimal scroll position (center of viewport)
    const scrollOptions = {
      behavior: "smooth" as ScrollBehavior,
      block: "center" as ScrollLogicalPosition,
      inline: "nearest" as ScrollLogicalPosition,
    }

    try {
      // Try the standard scrollIntoView first
      element.scrollIntoView(scrollOptions)
    } catch (e) {
      // Fallback for older browsers
      const elementTop = rect.top + window.pageYOffset
      const middle = elementTop - window.innerHeight / 2
      window.scrollTo({
        top: middle,
        behavior: "smooth",
      })
    }
  }
}

// Helper function to escape regular expression special characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // $& means the whole matched string
}
