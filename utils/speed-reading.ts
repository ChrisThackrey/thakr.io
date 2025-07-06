/**
 * Splits text into words or chunks for speed reading
 */
export function processTextForSpeedReading(text: string, chunkSize = 1): string[] {
  // Remove extra whitespace and split by spaces
  const words = text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((word) => word.length > 0)

  if (chunkSize <= 1) {
    return words
  }

  // Group words into chunks
  const chunks: string[] = []
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "))
  }

  return chunks
}

/**
 * Identifies if a text segment is likely a code block
 */
export function isCodeBlock(text: string): boolean {
  // Check for common code indicators
  const codeIndicators = [
    // Common syntax elements
    "function",
    "const",
    "let",
    "var",
    "return",
    "import",
    "export",
    "class",
    "interface",
    "type",
    "enum",
    "=>",
    "async",
    "await",
    "try",
    "catch",
    // Common symbols that appear frequently in code
    "{",
    "}",
    "(",
    ")",
    "[",
    "]",
    ";",
    "&&",
    "||",
    "===",
    "!==",
    "++",
    "--",
    // Common code patterns
    "if (",
    "for (",
    "while (",
    "switch (",
    ".map(",
    ".filter(",
    ".reduce(",
    // HTML/JSX indicators
    "<div",
    "<span",
    "<p",
    "<a",
    "<button",
    "<input",
    "<form",
    "<component",
    // CSS indicators
    "margin:",
    "padding:",
    "color:",
    "background:",
    "display:",
    "flex",
    "grid",
  ]

  // Check if the text contains multiple code indicators
  let indicatorCount = 0
  for (const indicator of codeIndicators) {
    if (text.includes(indicator)) {
      indicatorCount++
      if (indicatorCount >= 2) return true
    }
  }

  // Check for indentation patterns common in code
  const lines = text.split("\n")
  let indentedLines = 0
  for (const line of lines) {
    if (line.startsWith("  ") || line.startsWith("\t")) {
      indentedLines++
    }
  }

  // If more than 30% of lines are indented, likely code
  if (lines.length > 3 && indentedLines / lines.length > 0.3) return true

  return false
}

/**
 * Processes code blocks for speed reading
 */
export function processCodeBlockForSpeedReading(codeText: string): string[] {
  // Split by lines first to preserve line structure
  const lines = codeText.split("\n").filter((line) => line.trim().length > 0)
  const chunks: string[] = []

  for (const line of lines) {
    // For short lines, keep them as is
    if (line.length < 50) {
      chunks.push(line.trim())
    } else {
      // For longer lines, split by logical segments
      const segments = splitCodeLine(line)
      chunks.push(...segments)
    }

    // Add a visual indicator for line breaks in code
    chunks.push("↵")
  }

  return chunks
}

/**
 * Splits a long code line into logical segments
 */
function splitCodeLine(line: string): string[] {
  const segments: string[] = []

  // Split by common code delimiters
  const delimiters = [";", "{", "}", "(", ")", ",", "=>"]
  let currentSegment = ""

  for (let i = 0; i < line.length; i++) {
    currentSegment += line[i]

    // Check if we've hit a delimiter
    if (delimiters.includes(line[i]) || currentSegment.length > 40) {
      segments.push(currentSegment.trim())
      currentSegment = ""
    }
  }

  // Add any remaining text
  if (currentSegment.trim().length > 0) {
    segments.push(currentSegment.trim())
  }

  return segments
}

/**
 * Extracts readable text content from an HTML element with special handling for code blocks
 */
export function extractTextFromElement(element: HTMLElement | null): {
  text: string
  codeBlocks: { text: string; index: number }[]
} {
  if (!element) return { text: "", codeBlocks: [] }

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement

  // Remove script and style elements
  const scripts = clone.querySelectorAll("script, style, noscript")
  scripts.forEach((script) => script.remove())

  // Find all code blocks
  // const codeElements = clone.querySelectorAll("pre, code, .code-block, .hljs")
  const codeBlocks: { text: string; index: number }[] = []
  let fullText = ""
  let currentIndex = 0

  // Process the element's content, handling code blocks specially
  const processNode = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || ""
      fullText += text
      currentIndex += text.length
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement

      // Check if this is a code block
      if (
        element.tagName === "PRE" ||
        element.tagName === "CODE" ||
        element.classList.contains("code-block") ||
        element.classList.contains("hljs")
      ) {
        const codeText = element.textContent || ""

        // Store the code block with its position in the full text
        codeBlocks.push({
          text: codeText,
          index: currentIndex,
        })

        // Add a placeholder in the full text
        const placeholder = `[CODE_BLOCK_${codeBlocks.length - 1}]`
        fullText += placeholder
        currentIndex += placeholder.length
      } else {
        // Process child nodes recursively
        for (const child of Array.from(node.childNodes)) {
          processNode(child)
        }
      }
    }
  }

  // Start processing from the root
  for (const child of Array.from(clone.childNodes)) {
    processNode(child)
  }

  return { text: fullText, codeBlocks }
}

/**
 * Finds the optimal reading position (ORP) for a word
 * This helps position the word so the eye focuses on the right spot
 */
export function findOptimalReadingPosition(word: string): number {
  if (word.length <= 1) return 0
  if (word.length <= 4) return 1
  if (word.length <= 9) return 2
  if (word.length <= 13) return 3
  return Math.floor(word.length / 4)
}

/**
 * Formats a word with ORP highlighting
 */
export function formatWordWithORP(word: string): { before: string; focus: string; after: string } {
  const orpPosition = findOptimalReadingPosition(word)

  return {
    before: word.substring(0, orpPosition),
    focus: word.charAt(orpPosition),
    after: word.substring(orpPosition + 1),
  }
}

/**
 * Determines if a chunk is a code block placeholder
 */
export function isCodeBlockPlaceholder(chunk: string): { isPlaceholder: boolean; index: number } {
  const match = chunk.match(/\[CODE_BLOCK_(\d+)\]/)
  if (match) {
    return { isPlaceholder: true, index: Number.parseInt(match[1], 10) }
  }
  return { isPlaceholder: false, index: -1 }
}

/**
 * Determines if a chunk is likely code
 */
export function isLikelyCode(chunk: string): boolean {
  // Check for common code patterns
  return (
    /[{}[\]()<>]/.test(chunk) &&
    /[=:;]/.test(chunk) &&
    (chunk.includes("function") ||
      chunk.includes("const") ||
      chunk.includes("let") ||
      chunk.includes("var") ||
      chunk.includes("return") ||
      chunk.includes("import") ||
      chunk.includes("export"))
  )
}

// Update the parseTextToWords function to better handle MDX content

export function parseTextToWords(text: string): string[] {
  if (!text) return []

  // Strip HTML/MDX tags (basic approach, not a full parser)
  const strippedText = text
    .replace(/<[^>]*>/g, " ") // Replace HTML tags with spaces
    .replace(/```[\s\S]*?```/g, " ") // Replace code blocks with spaces
    .replace(/`[^`]*`/g, " ") // Replace inline code with spaces

  // Split text into words, maintaining punctuation
  const words = strippedText
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word.trim())

  return words
}

// Add a new function for extracting readable content from MDX
export function extractReadableContent(element: HTMLElement): string {
  if (!element) return ""

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement

  // Remove code blocks, pre tags and other non-readable elements
  const nonReadableSelectors = ["pre", "code", "table", "svg", ".non-readable", ".code-block", ".syntax-highlighter"]

  nonReadableSelectors.forEach((selector) => {
    const elements = clone.querySelectorAll(selector)
    elements.forEach((el) => el.parentNode?.removeChild(el))
  })

  // Get the text content
  let content = clone.textContent || ""

  // Clean up whitespace
  content = content.replace(/\s+/g, " ").trim()

  return content
}

/**
 * Calculates the Optimal Recognition Point (ORP) for a word
 */
export function getOptimalRecognitionPoint(word: string): number {
  if (word.length <= 1) return 0
  if (word.length <= 5) return Math.floor(word.length / 2)
  return Math.floor(word.length / 3)
}

/**
 * Formats a word with its Optimal Recognition Point (ORP) highlighted
 */
export function formatWordWithORP2(word: string): { before: string; orp: string; after: string } {
  const orpIndex = getOptimalRecognitionPoint(word)

  return {
    before: word.substring(0, orpIndex),
    orp: word.charAt(orpIndex),
    after: word.substring(orpIndex + 1),
  }
}

/**
 * Estimates reading time in minutes based on word count and reading speed
 */
export function estimateReadingTime(wordCount: number, wordsPerMinute = 200): number {
  return wordCount / wordsPerMinute
}

/**
 * Formats reading time in minutes and seconds
 */
export function formatReadingTime(minutes: number): string {
  const mins = Math.floor(minutes)
  const secs = Math.round((minutes - mins) * 60)

  if (mins === 0) {
    return `${secs} sec`
  }

  if (secs === 0) {
    return `${mins} min`
  }

  return `${mins} min ${secs} sec`
}
