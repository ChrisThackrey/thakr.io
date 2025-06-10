// Map of tag categories to color schemes
// Each entry contains light and dark mode color values for consistent theming

type TagColorScheme = {
  background: string
  border: string
  text: string
  hoverBackground: string
  hoverBorder: string
}

type TagColorMap = {
  [key: string]: {
    light: TagColorScheme
    dark: TagColorScheme
  }
}

// Define color schemes for different tag categories
export const tagColors: TagColorMap = {
  // AI and ML related
  AI: {
    light: {
      background: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-800",
      hoverBackground: "hover:bg-purple-100",
      hoverBorder: "hover:border-purple-300",
    },
    dark: {
      background: "dark:bg-purple-900/20",
      border: "dark:border-purple-700/50",
      text: "dark:text-purple-300",
      hoverBackground: "dark:hover:bg-purple-800/30",
      hoverBorder: "dark:hover:border-purple-600",
    },
  },
  "Deep Sea": {
    light: {
      background: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-800",
      hoverBackground: "hover:bg-indigo-100",
      hoverBorder: "hover:border-indigo-300",
    },
    dark: {
      background: "dark:bg-indigo-900/20",
      border: "dark:border-indigo-700/50",
      text: "dark:text-indigo-300",
      hoverBackground: "dark:hover:bg-indigo-800/30",
      hoverBorder: "dark:hover:border-indigo-600",
    },
  },
  "Model Agnostic": {
    light: {
      background: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-800",
      hoverBackground: "hover:bg-violet-100",
      hoverBorder: "hover:border-violet-300",
    },
    dark: {
      background: "dark:bg-violet-900/20",
      border: "dark:border-violet-700/50",
      text: "dark:text-violet-300",
      hoverBackground: "dark:hover:bg-violet-800/30",
      hoverBorder: "dark:hover:border-violet-600",
    },
  },

  // Web development related
  "Next.js": {
    light: {
      background: "bg-sky-50",
      border: "border-sky-200",
      text: "text-sky-800",
      hoverBackground: "hover:bg-sky-100",
      hoverBorder: "hover:border-sky-300",
    },
    dark: {
      background: "dark:bg-sky-900/20",
      border: "dark:border-sky-700/50",
      text: "dark:text-sky-300",
      hoverBackground: "dark:hover:bg-sky-800/30",
      hoverBorder: "dark:hover:border-sky-600",
    },
  },
  Vercel: {
    light: {
      background: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      hoverBackground: "hover:bg-blue-100",
      hoverBorder: "hover:border-blue-300",
    },
    dark: {
      background: "dark:bg-blue-900/20",
      border: "dark:border-blue-700/50",
      text: "dark:text-blue-300",
      hoverBackground: "dark:hover:bg-blue-800/30",
      hoverBorder: "dark:hover:border-blue-600",
    },
  },
  "Web Development": {
    light: {
      background: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-800",
      hoverBackground: "hover:bg-cyan-100",
      hoverBorder: "hover:border-cyan-300",
    },
    dark: {
      background: "dark:bg-cyan-900/20",
      border: "dark:border-cyan-700/50",
      text: "dark:text-cyan-300",
      hoverBackground: "dark:hover:bg-cyan-800/30",
      hoverBorder: "dark:hover:border-cyan-600",
    },
  },

  // Business and strategy related
  Geopolitics: {
    light: {
      background: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      hoverBackground: "hover:bg-amber-100",
      hoverBorder: "hover:border-amber-300",
    },
    dark: {
      background: "dark:bg-amber-900/20",
      border: "dark:border-amber-700/50",
      text: "dark:text-amber-300",
      hoverBackground: "dark:hover:bg-amber-800/30",
      hoverBorder: "dark:hover:border-amber-600",
    },
  },

  // Technical topics
  "Open Source": {
    light: {
      background: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      hoverBackground: "hover:bg-emerald-100",
      hoverBorder: "hover:border-emerald-300",
    },
    dark: {
      background: "dark:bg-emerald-900/20",
      border: "dark:border-emerald-700/50",
      text: "dark:text-emerald-300",
      hoverBackground: "dark:hover:bg-emerald-800/30",
      hoverBorder: "dark:hover:border-emerald-600",
    },
  },
  "Developer Tools": {
    light: {
      background: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-800",
      hoverBackground: "hover:bg-teal-100",
      hoverBorder: "hover:border-teal-300",
    },
    dark: {
      background: "dark:bg-teal-900/20",
      border: "dark:border-teal-700/50",
      text: "dark:text-teal-300",
      hoverBackground: "dark:hover:bg-teal-800/30",
      hoverBorder: "dark:hover:border-teal-600",
    },
  },

  // Ethics and standards
  AIEthics: {
    light: {
      background: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-800",
      hoverBackground: "hover:bg-rose-100",
      hoverBorder: "hover:border-rose-300",
    },
    dark: {
      background: "dark:bg-rose-900/20",
      border: "dark:border-rose-700/50",
      text: "dark:text-rose-300",
      hoverBackground: "dark:hover:bg-rose-800/30",
      hoverBorder: "dark:hover:border-rose-600",
    },
  },

  // Trends and industry
  TechTrends: {
    light: {
      background: "bg-fuchsia-50",
      border: "border-fuchsia-200",
      text: "text-fuchsia-800",
      hoverBackground: "hover:bg-fuchsia-100",
      hoverBorder: "hover:border-fuchsia-300",
    },
    dark: {
      background: "dark:bg-fuchsia-900/20",
      border: "dark:border-fuchsia-700/50",
      text: "dark:text-fuchsia-300",
      hoverBackground: "dark:hover:bg-fuchsia-800/30",
      hoverBorder: "dark:hover:border-fuchsia-600",
    },
  },

  // Personal and career
  Career: {
    light: {
      background: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-800",
      hoverBackground: "hover:bg-orange-100",
      hoverBorder: "hover:border-orange-300",
    },
    dark: {
      background: "dark:bg-orange-900/20",
      border: "dark:border-orange-700/50",
      text: "dark:text-orange-300",
      hoverBackground: "dark:hover:bg-orange-800/30",
      hoverBorder: "dark:hover:border-orange-600",
    },
  },
  Personal: {
    light: {
      background: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-800",
      hoverBackground: "hover:bg-pink-100",
      hoverBorder: "hover:border-pink-300",
    },
    dark: {
      background: "dark:bg-pink-900/20",
      border: "dark:border-pink-700/50",
      text: "dark:text-pink-300",
      hoverBackground: "dark:hover:bg-pink-800/30",
      hoverBorder: "dark:hover:border-pink-600",
    },
  },
}

// Default color scheme for tags that don't have a specific mapping
const defaultColorScheme = {
  light: {
    background: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-800",
    hoverBackground: "hover:bg-gray-100",
    hoverBorder: "hover:border-gray-300",
  },
  dark: {
    background: "dark:bg-gray-800/20",
    border: "dark:border-gray-700/50",
    text: "dark:text-gray-300",
    hoverBackground: "dark:hover:bg-gray-700/30",
    hoverBorder: "dark:hover:border-gray-600",
  },
}

/**
 * Get color classes for a specific tag
 * @param tag The tag to get colors for
 * @returns Object with light and dark mode color classes
 */
export function getTagColors(tag: string) {
  // Check for exact match
  if (tagColors[tag]) {
    return tagColors[tag]
  }

  // Check for partial matches (e.g., if tag contains a key)
  for (const key of Object.keys(tagColors)) {
    if (tag.toLowerCase().includes(key.toLowerCase())) {
      return tagColors[key]
    }
  }

  // Return default colors if no match found
  return defaultColorScheme
}

/**
 * Get combined color classes for a tag (for both light and dark mode)
 * @param tag The tag to get colors for
 * @returns String of combined Tailwind classes
 */
export function getTagColorClasses(tag: string): string {
  // Normalize the tag for comparison
  const normalizedTag = tag.toLowerCase().trim()

  // AI and ML related tags
  if (["ai", "deep sea", "model agnostic", "machine learning", "llm"].includes(normalizedTag)) {
    return "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50"
  }

  // Web development tags
  if (["next.js", "vercel", "web development", "react", "javascript", "typescript"].includes(normalizedTag)) {
    return "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
  }

  // Business/Strategy tags
  if (["geopolitics", "business", "strategy"].includes(normalizedTag)) {
    return "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
  }

  // Technical tags
  if (["open source", "developer tools", "programming", "code", "api"].includes(normalizedTag)) {
    return "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
  }

  // Ethics tags
  if (["ethics", "aiethics", "privacy"].includes(normalizedTag)) {
    return "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50"
  }

  // Trends tags
  if (["trends", "techtrends", "future"].includes(normalizedTag)) {
    return "bg-fuchsia-50 dark:bg-fuchsia-950/40 border-fuchsia-200 dark:border-fuchsia-800 text-fuchsia-700 dark:text-fuchsia-300 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/50"
  }

  // Personal/Career tags
  if (["career", "personal"].includes(normalizedTag)) {
    return "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50"
  }

  // Data visualization tags
  if (["visualization", "geo-spatial", "uber h3", "d3"].includes(normalizedTag)) {
    return "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
  }

  // Default color for any other tags
  return "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
}
