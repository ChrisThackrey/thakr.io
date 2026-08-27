import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function Footer() {
  const socialLinks = [
    { name: "GitHub", href: siteConfig.links.github, icon: "github" },
    { name: "LinkedIn", href: siteConfig.links.linkedin, icon: "linkedin" },
    { name: "Instagram", href: siteConfig.links.instagram, icon: "instagram" },
    { name: "Contact", href: "/contact", icon: "mail" },
  ]

  return (
    <footer className="border-t border-border/50 bg-background/60 backdrop-blur-md">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div>
            <p className="text-sm text-foreground/80">
              &copy; {new Date().getFullYear()} {siteConfig.author?.name || siteConfig.name}. All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = Icons[link.icon as keyof typeof Icons]
              if (!Icon) {
                return null
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.name}
                  className="text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
