"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

/**
 * A very small, self-contained error boundary for all blog pages.
 *   – Does **not** import anything from `/app/layout` or other special files
 *   – Logs the error in development
 *   – Shows a friendly message to the reader in production
 */
export class BlogErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("Blog page crashed:", error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive" role="alert" className="mx-auto my-24 max-w-xl prose text-center">
          <Terminal className="mb-2 inline-block h-6 w-6" />
          <AlertTitle className="text-lg font-semibold">Something went wrong.</AlertTitle>
          <AlertDescription>
            Sorry — the blog content failed to load. Please refresh the page or try again later.
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
}
