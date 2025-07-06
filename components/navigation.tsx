"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Icons.home className="mr-2 h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/work",
      label: "Work",
      icon: <Icons.briefcase className="mr-2 h-4 w-4" />,
      active: pathname === "/work",
    },
    {
      href: "/projects",
      label: "Projects",
      icon: <Icons.code className="mr-2 h-4 w-4" />,
      active: pathname === "/projects",
    },
    {
      href: "/architecture",
      label: "Architecture",
      icon: <Icons.architecture className="mr-2 h-4 w-4" />,
      active: pathname === "/architecture",
    },
    {
      href: "/blog",
      label: "Blog",
      icon: <Icons.fileText className="mr-2 h-4 w-4" />,
      active: pathname === "/blog" || pathname?.startsWith("/blog/"),
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <Icons.mail className="mr-2 h-4 w-4" />,
      active: pathname === "/contact",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                route.active ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                <Icons.menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-4 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center px-2 py-1 text-sm font-medium ${
                      route.active ? "bg-accent text-accent-foreground" : "text-foreground/60"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.icon}
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
