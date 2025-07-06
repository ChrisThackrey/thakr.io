import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Instagram } from "lucide-react"
import { siteConfig } from "@/config/site"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileCard() {
  return (
    <Card className="bg-background/80 backdrop-blur-sm border border-border/30 shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative aspect-square w-48 overflow-hidden rounded-full border-4 border-background mb-4">
            <Image
              src="/images/profile-1.jpg"
              alt="Chris Thackrey"
              fill
              sizes="200px"
              className="object-cover"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold">{siteConfig.name}</h2>
          <p className="text-muted-foreground mt-1">Full-Stack Software Engineer</p>
          <div className="mt-4 flex items-center gap-4">
            <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}