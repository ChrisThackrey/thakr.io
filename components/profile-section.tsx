import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Instagram } from "lucide-react"
import { siteConfig } from "@/config/site"

export function ProfileSection() {
  return (
    <section id="profile" className="container py-12 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{siteConfig.name}</h1>
          <h2 className="mt-2 text-xl font-medium text-muted-foreground sm:text-2xl">Full-Stack Software Engineer</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">{siteConfig.description}</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/resume">View Resume</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative aspect-square overflow-hidden rounded-full border-4 border-background">
            <Image
              src="/images/profile-1.jpg"
              alt="Chris Thackrey"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
