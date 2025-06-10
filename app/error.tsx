"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center">
            <div className="rounded-lg border border-red-200 dark:border-red-900 overflow-hidden">
              <div className="bg-red-50 dark:bg-red-900/20 p-6">
                <h1 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Something went wrong</h1>
                <p className="text-red-600/80 dark:text-red-300/80">
                  We encountered an unexpected error while loading this page.
                </p>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6">
                  We apologize for the inconvenience. You can try refreshing the page or returning to the homepage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={reset} className="flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button asChild>
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Go to Homepage
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">If this problem persists, please contact support.</p>
          </div>
        </div>
      </body>
    </html>
  )
}
