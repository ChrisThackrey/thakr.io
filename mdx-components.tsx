import type React from "react"
import { Callout } from "@/components/ui/callout"
import { Steps } from "@/components/ui/steps"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
