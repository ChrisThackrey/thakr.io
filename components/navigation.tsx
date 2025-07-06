"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = siteConfig.navLinks.map((link) => ({
    ...link,
    active: link.href === "/blog" ? pathname === "/blog" || pathname?.startsWith("/blog/") : undefined,
  }))

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {routes.map(({ href, label, icon, active }) => {
            const Icon = Icons[icon as keyof typeof Icons]
            if (!Icon) {
              return null
            }
            const isActive = typeof active !== "undefined" ? active : pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80 ${
                  isActive ? "text-foreground" : "text-foreground/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent" aria-label="Toggle menu">
                <Icons.menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <nav className="grid gap-4">
                {routes.map(({ href, label, icon, active }) => {
                  const Icon = Icons[icon as keyof typeof Icons]
                  if (!Icon) {
                    console.warn(`Icon "${icon}" not found in Icons object`)
                    return null
                  }
                  const isActive = typeof active !== "undefined" ? active : pathname === href
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                        isActive ? "bg-accent text-accent-foreground" : "text-foreground/60 hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
