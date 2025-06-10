"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ReadingHistory } from "@/components/reading-history"
import { ReadingSpeedSettings } from "@/components/reading-speed-settings"
import { motion } from "framer-motion"
import { EnhancedButton } from "@/components/micro-interactions/enhanced-button"
import { EnhancedIcon } from "@/components/micro-interactions/enhanced-icon"
import { PrefetchLink } from "@/components/prefetch-link"

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Work",
    path: "/work",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Architecture",
    path: "/architecture",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Book a Meeting",
    path: "/booking",
  },
]

export function Navigation() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  // Determine if we should show reading-related controls
  const showReadingControls = pathname?.includes("/blog/") || false

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <PrefetchLink href="/" className="font-bold text-xl" priority>
          Chris Thackrey
        </PrefetchLink>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6">
            {routes.map((route) => (
              <PrefetchLink
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  pathname === route.path ? "text-foreground" : "text-muted-foreground",
                )}
                priority={route.path === "/blog" || route.path === "/projects"}
              >
                {route.name}
                {pathname === route.path && (
                  <motion.div
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                    layoutId="navigation-underline"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </PrefetchLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ReadingHistory />
            {showReadingControls && <ReadingSpeedSettings />}
            <ThemeToggle />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <EnhancedButton variant="outline" size="icon">
                <EnhancedIcon>
                  <Menu className="h-5 w-5" />
                </EnhancedIcon>
                <span className="sr-only">Toggle menu</span>
              </EnhancedButton>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <PrefetchLink
                    key={route.path}
                    href={route.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.path ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {route.name}
                  </PrefetchLink>
                ))}
                <div className="flex items-center gap-2 pt-4">
                  <span className="text-sm font-medium">Theme:</span>
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
