/**
 * Content parser utility for speed reading
 * Breaks down HTML content into chunks for speed reading
 */

export type ContentType = "text" | "heading" | "code" | "list" | "quote" | "image" | "table" | "math"

export interface ContentChunk {
  content: string
  type?: ContentType
  level?: number
  metadata?: Record<string, any>
}

/**
 * Parse HTML content into chunks for speed reading
 */
export function parseContent(htmlContent: string): ContentChunk[] {
  // Create a temporary element to parse the HTML
  const tempElement = document.createElement("div")
  tempElement.innerHTML = htmlContent

  // Remove script and style tags
  const scripts = tempElement.querySelectorAll("script, style")
  scripts.forEach((script) => script.remove())

  // Extract text content
  const chunks: ContentChunk[] = []

  // Process the DOM tree
  processNode(tempElement, chunks)

  // Post-process chunks to handle line breaks and ensure continuous reading
  return postProcessChunks(chunks)
}

/**
 * Process a DOM node and extract content chunks
 */
function processNode(node: Node, chunks: ContentChunk[]): void {
  // Skip comments and empty text nodes
  if (node.nodeType === Node.COMMENT_NODE) {
    return
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim() || ""
    if (text) {
      // Split text by words and add each word as a chunk
      const words = text.split(/\s+/)
      words.forEach((word) => {
        if (word) {
          chunks.push({ content: word })
        }
      })
    }
    return
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement

    // Skip hidden elements
    if (
      element.style.display === "none" ||
      element.style.visibility === "hidden" ||
      element.getAttribute("aria-hidden") === "true"
    ) {
      return
    }

    // Handle different element types
    switch (element.tagName.toLowerCase()) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        // Process heading
        processHeading(element, chunks)
        break

      case "pre":
      case "code":
        // Process code block
        processCodeBlock(element, chunks)
        break

      case "ul":
      case "ol":
      case "li":
        // Process list
        processList(element, chunks)
        break

      case "blockquote":
        // Process quote
        processQuote(element, chunks)
        break

      case "img":
        // Process image
        processImage(element, chunks)
        break

      case "table":
        // Process table
        processTable(element, chunks)
        break

      case "br":
        // Add a space for line breaks to ensure continuous reading
        chunks.push({ content: " " })
        break

      default:
        // Process children for other elements
        for (let i = 0; i < element.childNodes.length; i++) {
          processNode(element.childNodes[i], chunks)
        }
        break
    }
  }
}

/**
 * Process a heading element
 */
function processHeading(element: HTMLElement, chunks: ContentChunk[]): void {
  // Get heading level
  const level = Number.parseInt(element.tagName.substring(1), 10)

  // Process text content
  const text = element.textContent?.trim() || ""
  if (text) {
    // Split by words
    const words = text.split(/\s+/)
    words.forEach((word, index) => {
      if (word) {
        chunks.push({
          content: word,
          type: "heading",
          level,
          metadata: {
            isFirst: index === 0,
            isLast: index === words.length - 1,
          },
        })
      }
    })

    // Add a space after the heading to ensure continuous reading
    chunks.push({ content: " " })
  }
}

/**
 * Process a code block
 */
function processCodeBlock(element: HTMLElement, chunks: ContentChunk[]): void {
  // Get the text content
  const text = element.textContent?.trim() || ""
  if (text) {
    // Split by words and preserve line breaks
    const lines = text.split(/\n/)
    lines.forEach((line, lineIndex) => {
      const words = line.split(/\s+/)
      words.forEach((word, wordIndex) => {
        if (word) {
          chunks.push({
            content: word,
            type: "code",
            metadata: {
              isFirst: lineIndex === 0 && wordIndex === 0,
              isLast: lineIndex === lines.length - 1 && wordIndex === words.length - 1,
              lineNumber: lineIndex + 1,
            },
          })
        }
      })

      // Add a space at the end of each line to ensure continuous reading
      if (lineIndex < lines.length - 1) {
        chunks.push({ content: " ", type: "code" })
      }
    })

    // Add a space after the code block to ensure continuous reading
    chunks.push({ content: " " })
  }
}

/**
 * Process a list element
 */
function processList(element: HTMLElement, chunks: ContentChunk[]): void {
  if (element.tagName.toLowerCase() === "li") {
    // Process list item
    const text = element.textContent?.trim() || ""
    if (text) {
      // Split by words
      const words = text.split(/\s+/)
      words.forEach((word, index) => {
        if (word) {
          chunks.push({
            content: word,
            type: "list",
            metadata: {
              isFirst: index === 0,
              isLast: index === words.length - 1,
            },
          })
        }
      })

      // Add a space after the list item to ensure continuous reading
      chunks.push({ content: " " })
    }
  } else {
    // Process children for ul/ol
    for (let i = 0; i < element.childNodes.length; i++) {
      processNode(element.childNodes[i], chunks)
    }
  }
}

/**
 * Process a quote element
 */
function processQuote(element: HTMLElement, chunks: ContentChunk[]): void {
  // Process text content
  const text = element.textContent?.trim() || ""
  if (text) {
    // Split by words
    const words = text.split(/\s+/)
    words.forEach((word, index) => {
      if (word) {
        chunks.push({
          content: word,
          type: "quote",
          metadata: {
            isFirst: index === 0,
            isLast: index === words.length - 1,
          },
        })
      }
    })

    // Add a space after the quote to ensure continuous reading
    chunks.push({ content: " " })
  }
}

/**
 * Process an image element
 */
function processImage(element: HTMLElement, chunks: ContentChunk[]): void {
  // Get alt text
  const altText = element.getAttribute("alt") || "Image"

  // Add image description
  chunks.push({
    content: `[${altText}]`,
    type: "image",
    metadata: {
      src: element.getAttribute("src"),
      alt: altText,
    },
  })

  // Add a space after the image to ensure continuous reading
  chunks.push({ content: " " })
}

/**
 * Process a table element
 */
function processTable(element: HTMLElement, chunks: ContentChunk[]): void {
  // Add table indicator
  chunks.push({
    content: "[Table]",
    type: "table",
  })

  // Process table content
  for (let i = 0; i < element.childNodes.length; i++) {
    processNode(element.childNodes[i], chunks)
  }

  // Add a space after the table to ensure continuous reading
  chunks.push({ content: " " })
}

/**
 * Post-process chunks to ensure continuous reading
 */
function postProcessChunks(chunks: ContentChunk[]): ContentChunk[] {
  // Filter out empty chunks
  const filteredChunks = chunks.filter((chunk) => chunk.content.trim().length > 0)

  // Ensure there are no consecutive spaces
  const processedChunks: ContentChunk[] = []
  let lastWasSpace = false

  filteredChunks.forEach((chunk) => {
    const isSpace = chunk.content === " " && !chunk.type

    // Skip consecutive spaces
    if (isSpace && lastWasSpace) {
      return
    }

    processedChunks.push(chunk)
    lastWasSpace = isSpace
  })

  return processedChunks
}
