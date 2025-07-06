import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export function ProfileSection() {
  return (
    <section id="profile" className="container py-12 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{siteConfig.name}</h1>
          <h2 className="mt-2 text-xl font-medium text-muted-foreground sm:text-2xl">Full-Stack Software Engineer</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">{siteConfig.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contact">
                <Icons.mail className="mr-2" /> Get in Touch
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resume">
                <Icons.fileText className="mr-2" /> View Resume
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Icons.github className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Icons.linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Icons.twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
          </div>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src="/images/profile-1.jpg"
            width={300}
            height={300}
            alt="Profile picture of Chris Thackrey"
            className="rounded-full border-4 border-primary/20 object-cover shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default ProfileSection
