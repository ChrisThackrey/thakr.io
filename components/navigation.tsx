"use client" // This is crucial if using client-side hooks like usePathname

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet" // Added SheetClose
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const mainNavItems = [
  { name: "Home", href: "/", icon: Icons.home },
  { name: "About", href: "/about", icon: Icons.user },
  { name: "Work", href: "/work", icon: Icons.briefcase },
  { name: "Projects", href: "/projects", icon: Icons.palette },
  { name: "Architecture", href: "/architecture", icon: Icons.architecture },
  { name: "Blog", href: "/blog", icon: Icons.blog },
  { name: "Contact Me", href: "/contact", icon: Icons.contact },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block text-lg">Chris Thackrey</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <item.icon className={cn("mr-3 h-4 w-4")} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icons.menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6">
              <Link href="/" className="mb-6 flex items-center space-x-2">
                <span className="font-bold text-lg">Chris Thackrey</span>
              </Link>
              <nav className="flex flex-col space-y-2">
                {mainNavItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      <item.icon className={"mr-3 h-5 w-5"} />
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

// Add the lowercase export that's being referenced elsewhere
export const navigation = Navigation
