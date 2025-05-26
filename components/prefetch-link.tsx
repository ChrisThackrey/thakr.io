"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

interface PrefetchLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  priority?: boolean
  prefetch?: boolean
  [key: string]: any
}

export function PrefetchLink({
  href,
  children,
  className,
  onClick,
  priority = false,
  prefetch = true,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter()
  const [isPrefetched, setIsPrefetched] = useState(false)

  const handlePrefetch = useCallback(() => {
    if (!isPrefetched && prefetch) {
      try {
        // Use Next.js router to prefetch the page
        router.prefetch(href)
        setIsPrefetched(true)
      } catch (error) {
        console.error("Error prefetching page:", error)
      }
    }
  }, [href, isPrefetched, prefetch, router])

  useEffect(() => {
    // For priority links, prefetch immediately
    if (priority && prefetch && !isPrefetched) {
      handlePrefetch()
    }
  }, [handlePrefetch, isPrefetched, prefetch, priority])

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (onClick) onClick()
      }}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      {...props}
    >
      {children}
    </Link>
  )
}
