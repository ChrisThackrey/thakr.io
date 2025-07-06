import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { SectionTitle } from "@/components/section-title"

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <SectionTitle
          title="Get in Touch"
          description="Have a project in mind, a question, or just want to connect? Feel free to reach out."
        />
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <p className="text-muted-foreground">
              You can reach me via email, phone, or by filling out the contact form. I'm looking forward to hearing from
              you!
            </p>
            <div className="space-y-4">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-4 group">
                <Icons.mail className="h-6 w-6 text-primary" />
                <span className="text-lg group-hover:underline">{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-center gap-4">
                <Icons.phone className="h-6 w-6 text-primary" />
                <span className="text-lg">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <Icons.mapPin className="h-6 w-6 text-primary" />
                <span className="text-lg">{siteConfig.contact.location}</span>
              </div>
            </div>
            <div className="pt-4">
              <Button asChild variant="outline">
                <Link href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Icons.download className="mr-2" />
                  Download CV
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
