"use client"

import type React from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { FileWarning, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogErrorBoundaryProps {
  children: React.ReactNode
  postTitle?: string
}

export function BlogErrorBoundary({ children, postTitle }: BlogErrorBoundaryProps) {
  return (
    <ErrorBoundary
      componentName={postTitle ? `"${postTitle}" blog post` : "blog post"}
      fallback={
        <div className="w-full py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
              <FileWarning className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Blog Content Error</h2>
              <p className="text-red-600/80 dark:text-red-300/80 mb-6">
                {postTitle
                  ? `We encountered an issue while loading the "${postTitle}" blog post.`
                  : "We encountered an issue while loading this blog post."}
              </p>
              <p className="text-muted-foreground mb-6">
                This could be due to a temporary issue. Please try refreshing the page or come back later.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Refresh Page
                </Button>
                <Button asChild>
                  <Link href="/blog">
                    <Home className="mr-2 h-4 w-4" />
                    Return to Blog
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
