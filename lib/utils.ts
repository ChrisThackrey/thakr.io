import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/* -------------------------------------------------------------------------- */
/*                               Class helpers                                */
/* -------------------------------------------------------------------------- */

/**
 * Conditionally join class names (Tailwind-merge aware).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* -------------------------------------------------------------------------- */
/*                               Date helpers                                 */
/* -------------------------------------------------------------------------- */

/**
 * Format a date string (ISO, RFC 2822, etc.) into a human-readable form.
 *
 * @example
 *   formatDate("2025-07-05")           // "July 5, 2025"
 *   formatDate("2025-07-05", { month: "short" }) // "Jul 5, 2025"
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString))
}

/* -------------------------------------------------------------------------- */
/*                                Text helpers                                */
/* -------------------------------------------------------------------------- */

/**
 * Truncate text to a maximum length, appending an ellipsis when needed.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "…"
}

/**
 * Capitalise the first letter of a string.
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert text to kebab-case (lower-case dash-separated).
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()
}

/**
 * Slugify arbitrary text for use in URLs.
 *
 *   "Hello World!" → "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumerics with “-”
    .replace(/(^-|-$)/g, "") // trim leading/trailing “-”
}

/* -------------------------------------------------------------------------- */
/*                               Misc helpers                                 */
/* -------------------------------------------------------------------------- */

/**
 * Generate a random alphanumeric ID.
 */
export function generateId(len = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + len)
}

/**
 * Classic debounce.
 */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, wait = 250) {
  let timeout: NodeJS.Timeout | undefined
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}

/**
 * Estimate reading time (in minutes) for plain text.
 */
export function calculateReadingTime(text: string, wordsPerMinute = 225): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

/**
 * Safely parse JSON, returning a fallback on error.
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}
