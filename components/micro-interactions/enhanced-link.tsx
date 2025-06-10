"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"
import { forwardRef } from "react"
import type { LinkProps } from "next/link"

interface EnhancedLinkProps extends LinkProps {
  className?: string
  children: React.ReactNode
  underlineEffect?: boolean
  hoverColor?: boolean
}

export const EnhancedLink = forwardRef<HTMLAnchorElement, EnhancedLinkProps & { href: string }>(
  ({ className, children, underlineEffect = true, hoverColor = true, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <Link
          {...props}
          className={cn(
            underlineEffect ? "micro-link" : "",
            hoverColor ? "hover:text-primary transition-colors" : "",
            className,
          )}
          ref={ref}
        >
          {children}
        </Link>
      </motion.div>
    )
  },
)

EnhancedLink.displayName = "EnhancedLink"
