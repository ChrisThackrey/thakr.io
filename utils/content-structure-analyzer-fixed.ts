/**
 * Utility for analyzing content structure to generate adaptive skeletons
 */

import { cache } from "react"

// Types for content structure
export interface ContentStructure {
  type: "page" | "section" | "card" | "list" | "image" | "text" | "heading" | "grid"
  children?: ContentStructure[]
  props?: {
    aspectRatio?: number
    textLength?: number
    columns?: number
    rows?: number
    size?: "small" | "medium" | "large"
    importance?: "primary" | "secondary" | "tertiary"
    imageCount?: number
    itemCount?: number
    layout?: "horizontal" | "vertical" | "grid"
    density?: "sparse" | "normal" | "dense"
  }
  metadata?: {
    path?: string
    component?: string
    estimatedLoadTime?: number
  }
}

// Helper function to create properly typed content structures
function createContentStructure(structure: ContentStructure): ContentStructure {
  return structure
}

// Cache for content structures
const structureCache = new Map<string, ContentStructure>()

/**
 * Analyzes a component's content structure
 */
export const analyzeContentStructure = cache(
  (componentId: string, defaultStructure?: ContentStructure): ContentStructure => {
    // Return from cache if available
    if (structureCache.has(componentId)) {
      return structureCache.get(componentId)!
    }

    // If no default structure is provided, return a basic structure
    if (!defaultStructure) {
      return {
        type: "section" as const,
        children: [
          { type: "heading" as const, props: { textLength: 24, importance: "primary" as const } },
          { type: "text" as const, props: { textLength: 120 } },
        ],
      }
    }

    // Store in cache for future use
    structureCache.set(componentId, defaultStructure)
    return defaultStructure
  },
)

/**
 * Extracts content structure from a URL path
 */
export function getStructureFromPath(path: string): ContentStructure | null {
  // Extract the main section from the path
  const pathSegments = path.split("/").filter(Boolean)
  const mainSection = pathSegments[0] || "home"

  // Return predefined structures based on the main section
  switch (mainSection) {
    case "blog":
      return createContentStructure(BLOG_STRUCTURES[pathSegments[1] ? "post" : "list"])
    case "projects":
      return createContentStructure(PROJECTS_STRUCTURES[pathSegments[1] ? "detail" : "list"])
    case "architecture":
      return createContentStructure(ARCHITECTURE_STRUCTURES[pathSegments[1] ? "detail" : "list"])
    case "work":
      return createContentStructure(WORK_STRUCTURES.timeline)
    case "about":
      return createContentStructure(ABOUT_STRUCTURES.profile)
    case "booking":
      return createContentStructure(BOOKING_STRUCTURES.form)
    default:
      return createContentStructure(HOME_STRUCTURES.default)
  }
}

/**
 * Predefined content structures for different page types
 */
export const HOME_STRUCTURES = {
  default: {
    type: "page" as const,
    children: [
      {
        type: "section" as const,
        props: { importance: "primary" as const },
        children: [
          { type: "heading" as const, props: { textLength: 48, importance: "primary" as const } },
          { type: "text" as const, props: { textLength: 160 } },
          {
            type: "grid" as const,
            props: { columns: 2 },
            children: [
              { type: "image" as const, props: { aspectRatio: 16 / 9 } },
              { type: "text" as const, props: { textLength: 120 } },
            ],
          },
        ],
      },
      {
        type: "section" as const,
        props: { importance: "secondary" as const },
        children: [
          { type: "heading" as const, props: { textLength: 32, importance: "secondary" as const } },
          {
            type: "grid" as const,
            props: { columns: 3 },
            children: Array(3).fill({
              type: "card" as const,
              children: [
                { type: "image" as const, props: { aspectRatio: 16 / 9 } },
                { type: "heading" as const, props: { textLength: 24, importance: "tertiary" as const } },
                { type: "text" as const, props: { textLength: 80 } },
              ],
            }),
          },
        ],
      },
    ],
  },
}

export const BLOG_STRUCTURES = {
  list: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 32, importance: "primary" as const } },
      { type: "text" as const, props: { textLength: 120 } },
      {
        type: "grid" as const,
        props: { columns: 3 },
        children: Array(6).fill({
          type: "card" as const,
          children: [
            { type: "image" as const, props: { aspectRatio: 16 / 9 } },
            { type: "heading" as const, props: { textLength: 24, importance: "tertiary" as const } },
            { type: "text" as const, props: { textLength: 80 } },
          ],
        }),
      },
    ],
  },
  post: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 48, importance: "primary" as const } },
      { type: "text" as const, props: { textLength: 80 } },
      { type: "image" as const, props: { aspectRatio: 21 / 9 } },
      {
        type: "grid" as const,
        props: { columns: 4 },
        children: [
          {
            type: "section" as const,
            props: { columns: 3 },
            children: [
              { type: "heading" as const, props: { textLength: 32, importance: "secondary" as const } },
              { type: "text" as const, props: { textLength: 240 } },
              { type: "heading" as const, props: { textLength: 32, importance: "secondary" as const } },
              { type: "text" as const, props: { textLength: 320 } },
              { type: "image" as const, props: { aspectRatio: 16 / 9 } },
              { type: "text" as const, props: { textLength: 400 } },
            ],
          },
          {
            type: "section" as const,
            props: { columns: 1 },
            children: [
              { type: "heading" as const, props: { textLength: 24, importance: "tertiary" as const } },
              {
                type: "list" as const,
                props: { itemCount: 5 },
                children: Array(5).fill({ type: "text" as const, props: { textLength: 24 } }),
              },
            ],
          },
        ],
      },
    ],
  },
}

export const PROJECTS_STRUCTURES = {
  list: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 32, importance: "primary" as const } },
      { type: "text" as const, props: { textLength: 120 } },
      {
        type: "grid" as const,
        props: { columns: 3 },
        children: Array(6).fill({
          type: "card" as const,
          children: [
            { type: "image" as const, props: { aspectRatio: 16 / 9 } },
            { type: "heading" as const, props: { textLength: 24, importance: "tertiary" as const } },
            { type: "text" as const, props: { textLength: 80 } },
            {
              type: "list" as const,
              props: { layout: "horizontal" as const, itemCount: 3 },
              children: Array(3).fill({ type: "text" as const, props: { textLength: 10 } }),
            },
          ],
        }),
      },
    ],
  },
  detail: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 40, importance: "primary" as const } },
      { type: "text" as const, props: { textLength: 160 } },
      { type: "image" as const, props: { aspectRatio: 16 / 9 } },
      {
        type: "grid" as const,
        props: { columns: 2 },
        children: [
          { type: "heading" as const, props: { textLength: 32, importance: "secondary" as const } },
          { type: "text" as const, props: { textLength: 320 } },
        ],
      },
      {
        type: "section" as const,
        children: [
          { type: "heading" as const, props: { textLength: 32, importance: "secondary" as const } },
          {
            type: "grid" as const,
            props: { columns: 3 },
            children: Array(3).fill({
              type: "card" as const,
              children: [
                { type: "image" as const, props: { aspectRatio: 1 } },
                { type: "heading" as const, props: { textLength: 24, importance: "tertiary" as const } },
                { type: "text" as const, props: { textLength: 60 } },
              ],
            }),
          },
        ],
      },
    ],
  },
}

export const ARCHITECTURE_STRUCTURES = {
  list: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 32, importance: "primary" as const } },
      { type: "text" as const, props: { textLength: 120 } },
      {
        type: "grid" as const,
        props: { columns: 3 },
        children: Array(6).fill({
          type: "card" as const,
          children: [
            { type: "image" as const, props: { aspectRatio: 4 / 3 } },
            { type: "heading" as const, props: { textLength: 24, importance: "tertiary" as const } },
            { type: "text" as const, props: { textLength: 80 } },
          ],
        }),
      },
    ],
  },
  detail: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 40, importance: "primary" as const } },
      { type: "text" as const, props: { textLength: 160 } },
      {
        type: "grid" as const,
        props: { columns: 2 },
        children: [
          { type: "image" as const, props: { aspectRatio: 4 / 3 } },
          {
            type: "section" as const,
            children: [
              { type: "heading" as const, props: { textLength: 32, importance: "secondary" as const } },
              { type: "text" as const, props: { textLength: 240 } },
              {
                type: "list" as const,
                props: { itemCount: 4 },
                children: Array(4).fill({ type: "text" as const, props: { textLength: 20 } }),
              },
            ],
          },
        ],
      },
      {
        type: "section" as const,
        children: [
          { type: "heading" as const, props: { textLength: 32, importance: "secondary" as const } },
          {
            type: "grid" as const,
            props: { columns: 3 },
            children: Array(6).fill({ type: "image" as const, props: { aspectRatio: 1 } }),
          },
        ],
      },
    ],
  },
}

export const WORK_STRUCTURES = {
  timeline: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 32, importance: "primary" as const } },
      { type: "text" as const, props: { textLength: 120 } },
      {
        type: "list" as const,
        props: { itemCount: 5, layout: "vertical" as const },
        children: Array(5).fill({
          type: "section" as const,
          children: [
            { type: "heading" as const, props: { textLength: 28, importance: "secondary" as const } },
            { type: "text" as const, props: { textLength: 20 } },
            { type: "text" as const, props: { textLength: 160 } },
            {
              type: "list" as const,
              props: { itemCount: 3, layout: "horizontal" as const },
              children: Array(3).fill({ type: "text" as const, props: { textLength: 12 } }),
            },
          ],
        }),
      },
    ],
  },
}

export const ABOUT_STRUCTURES = {
  profile: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 32, importance: "primary" as const } },
      {
        type: "grid" as const,
        props: { columns: 3 },
        children: [
          {
            type: "section" as const,
            props: { columns: 2 },
            children: [
              { type: "text" as const, props: { textLength: 240 } },
              { type: "text" as const, props: { textLength: 200 } },
              { type: "text" as const, props: { textLength: 180 } },
            ],
          },
          {
            type: "section" as const,
            props: { columns: 1 },
            children: [
              {
                type: "card" as const,
                children: [
                  { type: "heading" as const, props: { textLength: 24, importance: "tertiary" as const } },
                  {
                    type: "list" as const,
                    props: { itemCount: 4 },
                    children: Array(4).fill({
                      type: "section" as const,
                      children: [
                        { type: "heading" as const, props: { textLength: 20, importance: "tertiary" as const } },
                        { type: "text" as const, props: { textLength: 80 } },
                      ],
                    }),
                  },
                ],
              },
              {
                type: "card" as const,
                children: [
                  { type: "heading" as const, props: { textLength: 24, importance: "tertiary" as const } },
                  {
                    type: "list" as const,
                    props: { itemCount: 5 },
                    children: Array(5).fill({
                      type: "section" as const,
                      children: [
                        { type: "heading" as const, props: { textLength: 20, importance: "tertiary" as const } },
                        { type: "text" as const, props: { textLength: 40 } },
                      ],
                    }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

export const BOOKING_STRUCTURES = {
  form: {
    type: "page" as const,
    children: [
      { type: "heading" as const, props: { textLength: 32, importance: "primary" as const } },
      { type: "text" as const, props: { textLength: 120 } },
      {
        type: "grid" as const,
        props: { columns: 2 },
        children: [
          {
            type: "section" as const,
            children: [
              { type: "heading" as const, props: { textLength: 24, importance: "secondary" as const } },
              { type: "image" as const, props: { aspectRatio: 1 } },
              {
                type: "grid" as const,
                props: { columns: 3 },
                children: Array(6).fill({ type: "text" as const, props: { textLength: 8 } }),
              },
            ],
          },
          {
            type: "section" as const,
            children: [
              { type: "heading" as const, props: { textLength: 24, importance: "secondary" as const } },
              {
                type: "list" as const,
                props: { itemCount: 4, layout: "vertical" as const },
                children: [
                  { type: "text" as const, props: { textLength: 20 } },
                  { type: "text" as const, props: { textLength: 20 } },
                  { type: "text" as const, props: { textLength: 20 } },
                  { type: "text" as const, props: { textLength: 120 } },
                ],
              },
              { type: "text" as const, props: { textLength: 40 } },
            ],
          },
        ],
      },
    ],
  },
}
