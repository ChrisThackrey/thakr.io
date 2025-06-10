"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

export function ReliableNavigationLink({
  href,
  children,
  className,
  activeClassName = "text-primary font-medium",
  onClick,
}: NavigationLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      onClick={(e) => {
        // If it's the current page, prevent navigation
        if (isActive) {
          e.preventDefault()
        }

        if (onClick) {
          onClick()
        }
      }}
    >
      {children}
    </Link>
  )
}

interface ReliableNavigationProps {
  links: Array<{
    href: string
    label: string
  }>
  className?: string
  linkClassName?: string
  activeLinkClassName?: string
}

export function ReliableNavigation({ links, className, linkClassName, activeLinkClassName }: ReliableNavigationProps) {
  return (
    <nav className={className}>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.href}>
            <ReliableNavigationLink href={link.href} className={linkClassName} activeClassName={activeLinkClassName}>
              {link.label}
            </ReliableNavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
