import Link from "next/link"
import { Icons } from "@/components/icons"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Chris Thackrey. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/ChrisThackrey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/chris-thackrey-015"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icons.linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            <Icons.mail className="h-5 w-5" />
            <span className="sr-only">Contact</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
