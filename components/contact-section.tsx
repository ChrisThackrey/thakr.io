import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, MapPin } from "lucide-react"
import { siteConfig } from "@/config/site"

export function ContactSection() {
  return (
    <section id="contact" className="container py-12 md:py-20">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-muted-foreground">
            Have a project in mind or want to discuss potential collaborations? Feel free to reach out.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <Link href={`mailto:${siteConfig.contact.email}`} className="text-foreground hover:underline">
                {siteConfig.contact.email}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground">{siteConfig.contact.location}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-muted-foreground">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/booking">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
