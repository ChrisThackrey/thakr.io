import type React from "react"
import { Callout } from "@v0/components/callout"
import { Steps } from "@v0/components/steps"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@v0/components/table"

const components = {
  Callout,
  Steps,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tfoot: TableFooter,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  caption: TableCaption,
}

export function useMDXComponents(componentsProp: Record<string, React.ComponentType<any>>) {
  return {
    ...components,
    ...componentsProp,
  }
}
