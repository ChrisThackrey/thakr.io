"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center space-y-6 bg-background text-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">404</h1>
        <div className="h-12 border-l border-muted-foreground" />
        <p className="text-lg text-muted-foreground">This page could not be found.</p>
      </div>
      <p className="max-w-md text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for. Maybe you’ve mistyped the URL? Be sure to check your
        spelling.
      </p>
      <Button asChild>
        <Link href="/">
          <Icons.home className="mr-2 h-4 w-4" />
          Go to Homepage
        </Link>
      </Button>
    </div>
  )
}
