"use client"

import type { MDXComponents } from "mdx/types"
import { Callout } from "@/components/ui/callout"
import { Steps } from "@/components/ui/steps"
import { Table } from "@/components/ui/table"

/**
 * Registers custom components for MDX content.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // short-hand tags used inside MDX:
    Callout,
    callout: Callout,
    Steps,
    steps: Steps,
    Table,
    table: Table,
    // spread any components passed in manually
    ...components,
  }
}
