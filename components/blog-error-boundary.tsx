"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface BlogErrorBoundaryProps {
  children: React.ReactNode
  postTitle: string
}

interface BlogErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class BlogErrorBoundary extends React.Component<BlogErrorBoundaryProps, BlogErrorBoundaryState> {
  constructor(props: BlogErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): BlogErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to the console for debugging.
    // Removed the process.env.NODE_ENV check which is not available on the client.
    console.error("Blog page crashed:", {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto my-12 max-w-3xl rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-destructive">Something went wrong</h1>
          <p className="mb-2 text-lg text-destructive/80">
            There was an error rendering the blog post: &quot;{this.props.postTitle}&quot;.
          </p>
          <p className="mb-6 text-sm font-mono text-destructive/70 bg-destructive/10 p-2 rounded">
            {this.state.error?.message}
          </p>
          <Button variant="destructive" onClick={() => this.setState({ hasError: false, error: null })}>
            Try to reload component
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
