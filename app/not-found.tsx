"use client"

import { Button } from "@/components/ui/button"
import { Home, SearchX } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center space-y-8 bg-background px-4 text-center">
      <Image
        src="/placeholder.svg?height=256&width=256"
        alt="A sad robot lost in space"
        width={256}
        height={256}
        className="rounded-full object-cover"
      />
      <div className="space-y-2">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          <SearchX className="h-10 w-10" />
          Oops! Page Not Found
        </h1>
        <p className="max-w-md text-muted-foreground">
          It seems you've ventured into uncharted territory. The page you're looking for doesn't exist or has been
          moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Return to Home Base
        </Link>
      </Button>
    </div>
  )
}
