export interface SummarySection {
  title: string
  level: number
  keyPoints: string[]
  id?: string
}

export interface BlogSummary {
  title: string
  sections: SummarySection[]
  wordCount: number
  readingTime: number
  date?: string
  author?: string
  tags?: string[]
}

/**
 * Extracts headings and key points from HTML content to generate a summary
 */
export function generateSummary(element: HTMLElement, title: string): BlogSummary {
  // Extract all headings
  const headings = Array.from(element.querySelectorAll("h1, h2, h3, h4, h5, h6"))

  const sections: SummarySection[] = []
  let wordCount = 0

  // Process each heading and extract key points from the following content
  headings.forEach((heading, index) => {
    const headingText = heading.textContent?.trim() || ""
    const headingLevel = Number.parseInt(heading.tagName.substring(1))
    const headingId = heading.id || `heading-${index}`

    // Find content between this heading and the next
    const keyPoints: string[] = []
    const nextHeading = headings[index + 1]
    let currentElement = heading.nextElementSibling

    while (currentElement && currentElement !== nextHeading) {
      // Skip non-text elements
      if (
        currentElement.tagName !== "P" &&
        currentElement.tagName !== "LI" &&
        currentElement.tagName !== "BLOCKQUOTE"
      ) {
        currentElement = currentElement.nextElementSibling
        continue
      }

      const text = currentElement.textContent?.trim()
      if (text) {
        // Count words
        wordCount += text.split(/\s+/).length

        // Check if this paragraph is a key point
        if (isKeyPoint(text, currentElement)) {
          keyPoints.push(text)
        }
      }

      currentElement = currentElement.nextElementSibling
    }

    // If no key points were found, try to extract the first paragraph
    if (keyPoints.length === 0) {
      currentElement = heading.nextElementSibling
      while (currentElement && currentElement !== nextHeading) {
        if (currentElement.tagName === "P") {
          const text = currentElement.textContent?.trim()
          if (text) {
            keyPoints.push(text)
            break
          }
        }
        currentElement = currentElement.nextElementSibling
      }
    }

    sections.push({
      title: headingText,
      level: headingLevel,
      keyPoints,
      id: headingId,
    })
  })

  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200)

  return {
    title,
    sections,
    wordCount,
    readingTime,
  }
}

/**
 * Determines if a paragraph is likely a key point
 */
function isKeyPoint(text: string, element: Element): boolean {
  // Check for bullet points or numbered lists
  if (element.tagName === "LI") {
    return true
  }

  // Check for blockquotes
  if (element.tagName === "BLOCKQUOTE") {
    return true
  }

  // Check for paragraphs with strong/bold text
  if (element.querySelector("strong, b")) {
    return true
  }

  // Check for paragraphs that start with key phrases
  const keyPhrases = [
    "importantly",
    "notably",
    "significantly",
    "key",
    "essential",
    "critical",
    "fundamental",
    "crucial",
    "central",
    "core",
    "vital",
    "important",
    "in summary",
    "to summarize",
    "in conclusion",
    "to conclude",
    "finally",
    "in essence",
    "in short",
    "to put it briefly",
    "in other words",
  ]

  const lowerText = text.toLowerCase()
  return keyPhrases.some((phrase) => lowerText.includes(phrase))
}
