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
      background: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-800",
      hoverBackground: "hover:bg-violet-100",
      hoverBorder: "hover:border-violet-300",
    },
    dark: {
      background: "dark:bg-violet-900",
      border: "dark:border-violet-700",
      text: "dark:text-violet-300",
      hoverBackground: "dark:hover:bg-violet-800",
      hoverBorder: "dark:hover:border-violet-600",
    },
  },
  "Machine Learning": {
    light: {
      background: "bg-fuchsia-50",
      border: "border-fuchsia-200",
      text: "text-fuchsia-800",
      hoverBackground: "hover:bg-fuchsia-100",
      hoverBorder: "hover:border-fuchsia-300",
    },
    dark: {
      background: "dark:bg-fuchsia-900",
      border: "dark:border-fuchsia-700",
      text: "dark:text-fuchsia-300",
      hoverBackground: "dark:hover:bg-fuchsia-800",
      hoverBorder: "dark:hover:border-fuchsia-600",
    },
  },
  LLMs: {
    light: {
      background: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-800",
      hoverBackground: "hover:bg-indigo-100",
      hoverBorder: "hover:border-indigo-300",
    },
    dark: {
      background: "dark:bg-indigo-900",
      border: "dark:border-indigo-700",
      text: "dark:text-indigo-300",
      hoverBackground: "dark:hover:bg-indigo-800",
      hoverBorder: "dark:hover:border-indigo-600",
    },
  },
  GPT: {
    light: {
      background: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      hoverBackground: "hover:bg-emerald-100",
      hoverBorder: "hover:border-emerald-300",
    },
    dark: {
      background: "dark:bg-emerald-900",
      border: "dark:border-emerald-700",
      text: "dark:text-emerald-300",
      hoverBackground: "dark:hover:bg-emerald-800",
      hoverBorder: "dark:hover:border-emerald-600",
    },
  },
  RAG: {
    light: {
      background: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      hoverBackground: "hover:bg-amber-100",
      hoverBorder: "hover:border-amber-300",
    },
    dark: {
      background: "dark:bg-amber-900",
      border: "dark:border-amber-700",
      text: "dark:text-amber-300",
      hoverBackground: "dark:hover:bg-amber-800",
      hoverBorder: "dark:hover:border-amber-600",
    },
  },
  "Prompt Engineering": {
    light: {
      background: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-800",
      hoverBackground: "hover:bg-rose-100",
      hoverBorder: "hover:border-rose-300",
    },
    dark: {
      background: "dark:bg-rose-900",
      border: "dark:border-rose-700",
      text: "dark:text-rose-300",
      hoverBackground: "dark:hover:bg-rose-800",
      hoverBorder: "dark:hover:border-rose-600",
    },
  },

  // Web development related
  "Next.js": {
    light: {
      background: "bg-black",
      border: "border-white",
      text: "text-white",
      hoverBackground: "hover:bg-gray-800",
      hoverBorder: "hover:border-gray-200",
    },
    dark: {
      background: "dark:bg-gray-800",
      border: "dark:border-gray-200",
      text: "dark:text-gray-200",
      hoverBackground: "dark:hover:bg-gray-700",
      hoverBorder: "dark:hover:border-gray-600",
    },
  },
  Vercel: {
    light: {
      background: "bg-black",
      border: "border-white",
      text: "text-white",
      hoverBackground: "hover:bg-gray-800",
      hoverBorder: "hover:border-gray-200",
    },
    dark: {
      background: "dark:bg-gray-800",
      border: "dark:border-gray-200",
      text: "dark:text-gray-200",
      hoverBackground: "dark:hover:bg-gray-700",
      hoverBorder: "dark:hover:border-gray-600",
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
      background: "dark:bg-cyan-900",
      border: "dark:border-cyan-700",
      text: "dark:text-cyan-300",
      hoverBackground: "dark:hover:bg-cyan-800",
      hoverBorder: "dark:hover:border-cyan-600",
    },
  },
  React: {
    light: {
      background: "bg-blue-100",
      border: "border-blue-800",
      text: "text-blue-800",
      hoverBackground: "hover:bg-blue-200",
      hoverBorder: "hover:border-blue-900",
    },
    dark: {
      background: "dark:bg-blue-900",
      border: "dark:border-blue-300",
      text: "dark:text-blue-300",
      hoverBackground: "dark:hover:bg-blue-800",
      hoverBorder: "dark:hover:border-blue-700",
    },
  },
  TypeScript: {
    light: {
      background: "bg-blue-100",
      border: "border-blue-800",
      text: "text-blue-800",
      hoverBackground: "hover:bg-blue-200",
      hoverBorder: "hover:border-blue-900",
    },
    dark: {
      background: "dark:bg-blue-900",
      border: "dark:border-blue-300",
      text: "dark:text-blue-300",
      hoverBackground: "dark:hover:bg-blue-800",
      hoverBorder: "dark:hover:border-blue-700",
    },
  },
  JavaScript: {
    light: {
      background: "bg-yellow-100",
      border: "border-yellow-800",
      text: "text-yellow-800",
      hoverBackground: "hover:bg-yellow-200",
      hoverBorder: "hover:border-yellow-900",
    },
    dark: {
      background: "dark:bg-yellow-900",
      border: "dark:border-yellow-300",
      text: "dark:text-yellow-300",
      hoverBackground: "dark:hover:bg-yellow-800",
      hoverBorder: "dark:hover:border-yellow-700",
    },
  },
  "Node.js": {
    light: {
      background: "bg-green-100",
      border: "border-green-800",
      text: "text-green-800",
      hoverBackground: "hover:bg-green-200",
      hoverBorder: "hover:border-green-900",
    },
    dark: {
      background: "dark:bg-green-900",
      border: "dark:border-green-300",
      text: "dark:text-green-300",
      hoverBackground: "dark:hover:bg-green-800",
      hoverBorder: "dark:hover:border-green-700",
    },
  },
  GraphQL: {
    light: {
      background: "bg-pink-100",
      border: "border-pink-800",
      text: "text-pink-800",
      hoverBackground: "hover:bg-pink-200",
      hoverBorder: "hover:border-pink-900",
    },
    dark: {
      background: "dark:bg-pink-900",
      border: "dark:border-pink-300",
      text: "dark:text-pink-300",
      hoverBackground: "dark:hover:bg-pink-800",
      hoverBorder: "dark:hover:border-pink-700",
    },
  },
  MongoDB: {
    light: {
      background: "bg-green-100",
      border: "border-green-800",
      text: "text-green-800",
      hoverBackground: "hover:bg-green-200",
      hoverBorder: "hover:border-green-900",
    },
    dark: {
      background: "dark:bg-green-900",
      border: "dark:border-green-300",
      text: "dark:text-green-300",
      hoverBackground: "dark:hover:bg-green-800",
      hoverBorder: "dark:hover:border-green-700",
    },
  },
  SQL: {
    light: {
      background: "bg-blue-100",
      border: "border-blue-800",
      text: "text-blue-800",
      hoverBackground: "hover:bg-blue-200",
      hoverBorder: "hover:border-blue-900",
    },
    dark: {
      background: "dark:bg-blue-900",
      border: "dark:border-blue-300",
      text: "dark:text-blue-300",
      hoverBackground: "dark:hover:bg-blue-800",
      hoverBorder: "dark:hover:border-blue-700",
    },
  },
  Prisma: {
    light: {
      background: "bg-indigo-100",
      border: "border-indigo-800",
      text: "text-indigo-800",
      hoverBackground: "hover:bg-indigo-200",
      hoverBorder: "hover:border-indigo-900",
    },
    dark: {
      background: "dark:bg-indigo-900",
      border: "dark:border-indigo-300",
      text: "dark:text-indigo-300",
      hoverBackground: "dark:hover:bg-indigo-800",
      hoverBorder: "dark:hover:border-indigo-700",
    },
  },
  Supabase: {
    light: {
      background: "bg-emerald-100",
      border: "border-emerald-800",
      text: "text-emerald-800",
      hoverBackground: "hover:bg-emerald-200",
      hoverBorder: "hover:border-emerald-900",
    },
    dark: {
      background: "dark:bg-emerald-900",
      border: "dark:border-emerald-300",
      text: "dark:text-emerald-300",
      hoverBackground: "dark:hover:bg-emerald-800",
      hoverBorder: "dark:hover:border-emerald-700",
    },
  },
  Firebase: {
    light: {
      background: "bg-amber-100",
      border: "border-amber-800",
      text: "text-amber-800",
      hoverBackground: "hover:bg-amber-200",
      hoverBorder: "hover:border-amber-900",
    },
    dark: {
      background: "dark:bg-amber-900",
      border: "dark:border-amber-300",
      text: "dark:text-amber-300",
      hoverBackground: "dark:hover:bg-amber-800",
      hoverBorder: "dark:hover:border-amber-700",
    },
  },
  Redis: {
    light: {
      background: "bg-red-100",
      border: "border-red-800",
      text: "text-red-800",
      hoverBackground: "hover:bg-red-200",
      hoverBorder: "hover:border-red-900",
    },
    dark: {
      background: "dark:bg-red-900",
      border: "dark:border-red-300",
      text: "dark:text-red-300",
      hoverBackground: "dark:hover:bg-red-800",
      hoverBorder: "dark:hover:border-red-700",
    },
  },
  Python: {
    light: {
      background: "bg-blue-100",
      border: "border-blue-800",
      text: "text-blue-800",
      hoverBackground: "hover:bg-blue-200",
      hoverBorder: "hover:border-blue-900",
    },
    dark: {
      background: "dark:bg-blue-900",
      border: "dark:border-blue-300",
      text: "dark:text-blue-300",
      hoverBackground: "dark:hover:bg-blue-800",
      hoverBorder: "dark:hover:border-blue-700",
    },
  },
  TailwindCSS: {
    light: {
      background: "bg-cyan-100",
      border: "border-cyan-800",
      text: "text-cyan-800",
      hoverBackground: "hover:bg-cyan-200",
      hoverBorder: "hover:border-cyan-900",
    },
    dark: {
      background: "dark:bg-cyan-900",
      border: "dark:border-cyan-300",
      text: "dark:text-cyan-300",
      hoverBackground: "dark:hover:bg-cyan-800",
      hoverBorder: "dark:hover:border-cyan-700",
    },
  },
  ChakraUI: {
    light: {
      background: "bg-teal-100",
      border: "border-teal-800",
      text: "text-teal-800",
      hoverBackground: "hover:bg-teal-200",
      hoverBorder: "hover:border-teal-900",
    },
    dark: {
      background: "dark:bg-teal-900",
      border: "dark:border-teal-300",
      text: "dark:text-teal-300",
      hoverBackground: "dark:hover:bg-teal-800",
      hoverBorder: "dark:hover:border-teal-700",
    },
  },
  "Shadcn/ui": {
    light: {
      background: "bg-gray-100",
      border: "border-gray-800",
      text: "text-gray-800",
      hoverBackground: "hover:bg-gray-200",
      hoverBorder: "hover:border-gray-900",
    },
    dark: {
      background: "dark:bg-gray-900",
      border: "dark:border-gray-300",
      text: "dark:text-gray-300",
      hoverBackground: "dark:hover:bg-gray-800",
      hoverBorder: "dark:hover:border-gray-700",
    },
  },
  v0: {
    light: {
      background: "bg-purple-100",
      border: "border-purple-800",
      text: "text-purple-800",
      hoverBackground: "hover:bg-purple-200",
      hoverBorder: "hover:border-purple-900",
    },
    dark: {
      background: "dark:bg-purple-900",
      border: "dark:border-purple-300",
      text: "dark:text-purple-300",
      hoverBackground: "dark:hover:bg-purple-800",
      hoverBorder: "dark:hover:border-purple-700",
    },
  },
  D3: {
    light: {
      background: "bg-orange-100",
      border: "border-orange-800",
      text: "text-orange-800",
      hoverBackground: "hover:bg-orange-200",
      hoverBorder: "hover:border-orange-900",
    },
    dark: {
      background: "dark:bg-orange-900",
      border: "dark:border-orange-300",
      text: "dark:text-orange-300",
      hoverBackground: "dark:hover:bg-orange-800",
      hoverBorder: "dark:hover:border-orange-700",
    },
  },
  Astro: {
    light: {
      background: "bg-orange-100",
      border: "border-orange-800",
      text: "text-orange-800",
      hoverBackground: "hover:bg-orange-200",
      hoverBorder: "hover:border-orange-900",
    },
    dark: {
      background: "dark:bg-orange-900",
      border: "dark:border-orange-300",
      text: "dark:text-orange-300",
      hoverBackground: "dark:hover:bg-orange-800",
      hoverBorder: "dark:hover:border-orange-700",
    },
  },
  Svelte: {
    light: {
      background: "bg-red-100",
      border: "border-red-800",
      text: "text-red-800",
      hoverBackground: "hover:bg-red-200",
      hoverBorder: "hover:border-red-900",
    },
    dark: {
      background: "dark:bg-red-900",
      border: "dark:border-red-300",
      text: "dark:text-red-300",
      hoverBackground: "dark:hover:bg-red-800",
      hoverBorder: "dark:hover:border-red-700",
    },
  },
  Redux: {
    light: {
      background: "bg-purple-100",
      border: "border-purple-800",
      text: "text-purple-800",
      hoverBackground: "hover:bg-purple-200",
      hoverBorder: "hover:border-purple-900",
    },
    dark: {
      background: "dark:bg-purple-900",
      border: "dark:border-purple-300",
      text: "dark:text-purple-300",
      hoverBackground: "dark:hover:bg-purple-800",
      hoverBorder: "dark:hover:border-purple-700",
    },
  },
  DeepSeek: {
    light: {
      background: "bg-indigo-100",
      border: "border-indigo-800",
      text: "text-indigo-800",
      hoverBackground: "hover:bg-indigo-200",
      hoverBorder: "hover:border-indigo-900",
    },
    dark: {
      background: "dark:bg-indigo-900",
      border: "dark:border-indigo-300",
      text: "dark:text-indigo-300",
      hoverBackground: "dark:hover:bg-indigo-800",
      hoverBorder: "dark:hover:border-indigo-700",
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
      background: "dark:bg-amber-900",
      border: "dark:border-amber-700",
      text: "dark:text-amber-300",
      hoverBackground: "dark:hover:bg-amber-800",
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
      background: "dark:bg-emerald-900",
      border: "dark:border-emerald-700",
      text: "dark:text-emerald-300",
      hoverBackground: "dark:hover:bg-emerald-800",
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
      background: "dark:bg-teal-900",
      border: "dark:border-teal-700",
      text: "dark:text-teal-300",
      hoverBackground: "dark:hover:bg-teal-800",
      hoverBorder: "dark:hover:border-teal-600",
    },
  },
  Programming: {
    light: {
      background: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-800",
      hoverBackground: "hover:bg-orange-100",
      hoverBorder: "hover:border-orange-300",
    },
    dark: {
      background: "dark:bg-orange-900",
      border: "dark:border-orange-700",
      text: "dark:text-orange-300",
      hoverBackground: "dark:hover:bg-orange-800",
      hoverBorder: "dark:hover:border-orange-600",
    },
  },
  Research: {
    light: {
      background: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      hoverBackground: "hover:bg-red-100",
      hoverBorder: "hover:border-red-300",
    },
    dark: {
      background: "dark:bg-red-900",
      border: "dark:border-red-700",
      text: "dark:text-red-300",
      hoverBackground: "dark:hover:bg-red-800",
      hoverBorder: "dark:hover:border-red-600",
    },
  },
  Tutorial: {
    light: {
      background: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      hoverBackground: "hover:bg-green-100",
      hoverBorder: "hover:border-green-300",
    },
    dark: {
      background: "dark:bg-green-900",
      border: "dark:border-green-700",
      text: "dark:text-green-300",
      hoverBackground: "dark:hover:bg-green-800",
      hoverBorder: "dark:hover:border-green-600",
    },
  },
  Business: {
    light: {
      background: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      hoverBackground: "hover:bg-blue-100",
      hoverBorder: "hover:border-blue-300",
    },
    dark: {
      background: "dark:bg-blue-900",
      border: "dark:border-blue-700",
      text: "dark:text-blue-300",
      hoverBackground: "dark:hover:bg-blue-800",
      hoverBorder: "dark:hover:border-blue-600",
    },
  },
  News: {
    light: {
      background: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      hoverBackground: "hover:bg-red-100",
      hoverBorder: "hover:border-red-300",
    },
    dark: {
      background: "dark:bg-red-900",
      border: "dark:border-red-700",
      text: "dark:text-red-300",
      hoverBackground: "dark:hover:bg-red-800",
      hoverBorder: "dark:hover:border-red-600",
    },
  },
  "Case Study": {
    light: {
      background: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-800",
      hoverBackground: "hover:bg-purple-100",
      hoverBorder: "hover:border-purple-300",
    },
    dark: {
      background: "dark:bg-purple-900",
      border: "dark:border-purple-700",
      text: "dark:text-purple-300",
      hoverBackground: "dark:hover:bg-purple-800",
      hoverBorder: "dark:hover:border-purple-600",
    },
  },
  Technology: {
    light: {
      background: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-800",
      hoverBackground: "hover:bg-cyan-100",
      hoverBorder: "hover:border-cyan-300",
    },
    dark: {
      background: "dark:bg-cyan-900",
      border: "dark:border-cyan-700",
      text: "dark:text-cyan-300",
      hoverBackground: "dark:hover:bg-cyan-800",
      hoverBorder: "dark:hover:border-cyan-600",
    },
  },
  "Market Research": {
    light: {
      background: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      hoverBackground: "hover:bg-blue-100",
      hoverBorder: "hover:border-blue-300",
    },
    dark: {
      background: "dark:bg-blue-900",
      border: "dark:border-blue-700",
      text: "dark:text-blue-300",
      hoverBackground: "dark:hover:bg-blue-800",
      hoverBorder: "dark:hover:border-blue-600",
    },
  },
  "Personal Computing": {
    light: {
      background: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-800",
      hoverBackground: "hover:bg-cyan-100",
      hoverBorder: "hover:border-cyan-300",
    },
    dark: {
      background: "dark:bg-cyan-900",
      border: "dark:border-cyan-700",
      text: "dark:text-cyan-300",
      hoverBackground: "dark:hover:bg-cyan-800",
      hoverBorder: "dark:hover:border-cyan-600",
    },
  },
  Colorado: {
    light: {
      background: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      hoverBackground: "hover:bg-amber-100",
      hoverBorder: "hover:border-amber-300",
    },
    dark: {
      background: "dark:bg-amber-900",
      border: "dark:border-amber-700",
      text: "dark:text-amber-300",
      hoverBackground: "dark:hover:bg-amber-800",
      hoverBorder: "dark:hover:border-amber-600",
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
      background: "dark:bg-violet-900",
      border: "dark:border-violet-700",
      text: "dark:text-violet-300",
      hoverBackground: "dark:hover:bg-violet-800",
      hoverBorder: "dark:hover:border-violet-600",
    },
  },
  Development: {
    light: {
      background: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      hoverBackground: "hover:bg-green-100",
      hoverBorder: "hover:border-green-300",
    },
    dark: {
      background: "dark:bg-green-900",
      border: "dark:border-green-700",
      text: "dark:text-green-300",
      hoverBackground: "dark:hover:bg-green-800",
      hoverBorder: "dark:hover:border-green-600",
    },
  },
  "Causal AI": {
    light: {
      background: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-800",
      hoverBackground: "hover:bg-purple-100",
      hoverBorder: "hover:border-purple-300",
    },
    dark: {
      background: "dark:bg-purple-900",
      border: "dark:border-purple-700",
      text: "dark:text-purple-300",
      hoverBackground: "dark:hover:bg-purple-800",
      hoverBorder: "dark:hover:border-purple-600",
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
    background: "dark:bg-gray-900",
    border: "dark:border-gray-700",
    text: "dark:text-gray-300",
    hoverBackground: "dark:hover:bg-gray-800",
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
 * Alias for getTagColors for backward compatibility
 * @param tag The tag to get colors for
 * @returns Object with light and dark mode color classes
 */
export function getTagColor(tag: string) {
  return getTagColors(tag)
}

export default tagColors

// Map of tag categories to color classes
const tagColorMap: Record<string, string> = {
  // Technologies
  AI: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  "Machine Learning": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  LLM: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  LLMs: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  RAG: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  "Next.js": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  React: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Vercel: "bg-black text-white dark:bg-gray-800 dark:text-gray-100",
  DeepSeek: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",

  // Categories
  "Web Development": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  "Developer Tools": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  Programming: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  Research: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Tutorial: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
  Business: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  News: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
  Technology: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100",
  "Market Research": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  "Personal Computing": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100",
  Colorado: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  "Model Agnostic": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100",
  Development: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  "Causal AI": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",

  // Default
  default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
}

/**
 * Get all available tag colors
 * @returns Record of tag to color classes
 */
export function getAllTagColors(): Record<string, string> {
  return { ...tagColorMap }
}
