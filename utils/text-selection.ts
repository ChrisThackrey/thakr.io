/**
 * Gets information about the current text selection
 */
export function getSelectionInfo(
  selection: Selection,
  containerSelector: string,
): { text: string; position: number; rect: DOMRect } | null {
  if (!selection || selection.isCollapsed || !selection.toString().trim()) {
    return null
  }

  // Get the container element
  let container: Element | null = null

  // Try to find by ID first
  if (containerSelector.startsWith("#")) {
    container = document.getElementById(containerSelector.substring(1))
  }

  // If not found by ID, try as a selector
  if (!container) {
    container = document.querySelector(containerSelector)
  }

  // Try common fallbacks if still not found
  if (!container) {
    const fallbacks = [
      "article",
      ".prose",
      "main",
      ".blog-content",
      ".mdx-content",
      "[data-mdx-content]",
      ".markdown-body",
    ]

    for (const fallback of fallbacks) {
      container = document.querySelector(fallback)
      if (container) break
    }
  }

  if (!container) return null

  // Check if the selection is within our container
  const range = selection.getRangeAt(0)
  if (!container.contains(range.commonAncestorContainer)) return null

  // Get the selected text
  const text = selection.toString().trim()

  // Get the position of the selection within the container's text content
  const containerText = container.textContent || ""
  const preSelectionRange = range.cloneRange()
  preSelectionRange.selectNodeContents(container)
  preSelectionRange.setEnd(range.startContainer, range.startOffset)
  const position = preSelectionRange.toString().length

  // Get the bounding rectangle of the selection
  const rect = range.getBoundingClientRect()

  return { text, position, rect }
}

/**
 * Finds the closest word index in a text string based on a position
 */
export function findClosestWordIndex(text: string, position: number): number {
  if (!text || position < 0 || position >= text.length) {
    return 0
  }

  // Split the text into words
  const words = text.split(/\s+/)
  let currentPosition = 0

  // Find the word that contains the position
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const wordEnd = currentPosition + word.length

    // If the position is within this word or the space after it
    if (position >= currentPosition && position <= wordEnd + 1) {
      return i
    }

    // Move to the next word (add 1 for the space)
    currentPosition = wordEnd + 1
  }

  // If we couldn't find a match, return the first word
  return 0
}

/**
 * Creates a selection-friendly range from a text node and offsets
 */
export function createTextNodeRange(textNode: Node, startOffset: number, endOffset: number): Range | null {
  try {
    const range = document.createRange()
    range.setStart(textNode, startOffset)
    range.setEnd(textNode, endOffset)
    return range
  } catch (e) {
    console.error("Error creating range:", e)
    return null
  }
}

/**
 * Highlights the selected text in the document
 */
export function highlightSelection(className = "text-selected"): void {
  const selection = window.getSelection()
  if (!selection || selection.isCollapsed) return

  const range = selection.getRangeAt(0)

  // Create a span element to wrap the selection
  const highlightSpan = document.createElement("span")
  highlightSpan.className = className

  try {
    // Wrap the selection with the span
    range.surroundContents(highlightSpan)

    // Clear the selection to prevent issues with the UI
    selection.removeAllRanges()
  } catch (e) {
    console.error("Failed to highlight selection:", e)
  }
}

/**
 * Gets the word count of the selected text
 */
export function getSelectionWordCount(selection: Selection): number {
  if (!selection) return 0

  const text = selection.toString().trim()
  if (!text) return 0

  // Split by whitespace and filter out empty strings
  return text.split(/\s+/).filter((word) => word.length > 0).length
}

/**
 * Extracts the selected text and its context
 */
export function getSelectionContext(
  selection: Selection,
  contextSize = 50,
): { before: string; selected: string; after: string } | null {
  if (!selection || selection.isCollapsed) return null

  const range = selection.getRangeAt(0)
  const selectedText = selection.toString().trim()

  // Get the containing element
  const container =
    range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : (range.commonAncestorContainer as Element)

  if (!container) return null

  const fullText = container.textContent || ""
  const selectionStart = fullText.indexOf(selectedText)

  if (selectionStart === -1) return null

  const selectionEnd = selectionStart + selectedText.length

  // Get text before and after the selection
  const beforeStart = Math.max(0, selectionStart - contextSize)
  const afterEnd = Math.min(fullText.length, selectionEnd + contextSize)

  return {
    before: fullText.substring(beforeStart, selectionStart),
    selected: selectedText,
    after: fullText.substring(selectionEnd, afterEnd),
  }
}

/**
 * Scrolls to and highlights a specific text in an element
 */
export function scrollToAndHighlightText(
  container: HTMLElement,
  searchText: string,
  highlightClass = "text-highlight",
): boolean {
  if (!container || !searchText) return false

  // Normalize whitespace in both the container and search text
  const containerText = container.textContent?.replace(/\s+/g, " ") || ""
  const normalizedSearch = searchText.replace(/\s+/g, " ")

  // Simple attempt to find the text directly
  const index = containerText.indexOf(normalizedSearch)
  if (index === -1) return false

  // Search through the text nodes to find the matching content
  const textNodes: Node[] = []
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)

  let currentNode: Node | null
  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode)
  }

  let currentPosition = 0
  let foundNode: Node | null = null
  let startOffset = 0

  // Find the node containing the search text
  for (const node of textNodes) {
    const nodeText = node.textContent || ""
    const nodeEndPosition = currentPosition + nodeText.length

    if (index >= currentPosition && index < nodeEndPosition) {
      foundNode = node
      startOffset = index - currentPosition
      break
    }

    currentPosition = nodeEndPosition
  }

  if (!foundNode) return false

  // Create a range for the found text
  try {
    const range = document.createRange()
    range.setStart(foundNode, startOffset)
    range.setEnd(foundNode, startOffset + normalizedSearch.length)

    // Highlight the text
    const span = document.createElement("span")
    span.className = highlightClass

    range.surroundContents(span)

    // Scroll to the highlighted text
    span.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })

    return true
  } catch (e) {
    console.error("Error highlighting text:", e)
    return false
  }
}

/**
 * Gets the currently selected text from the document
 */
export function getSelectedText(): string {
  const selection = window.getSelection()
  if (!selection) return ""

  return selection.toString().trim()
}

/**
 * Gets all text from a specified element
 */
export function getElementText(selector: string): string {
  const element = document.querySelector(selector)
  if (!element) return ""

  return element.textContent || ""
}

/**
 * Dispatches a custom event to trigger speed reading
 */
export function triggerSpeedReading(text?: string): void {
  console.log("Triggering speed reading event")
  window.dispatchEvent(
    new CustomEvent("custom-blog-action", {
      detail: {
        action: "speed-read-current",
        text: text || "",
      },
    }),
  )
}
