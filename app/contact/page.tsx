import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"
import { SectionTitle } from "@/components/section-title"

export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  if (!siteKey) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <SectionTitle>Contact Unavailable</SectionTitle>
          <p className="mt-4 text-lg text-destructive">
            The contact form is temporarily unavailable due to a configuration issue.
          </p>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <SectionTitle>Get in Touch</SectionTitle>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-3xl mx-auto">
          Have a project in mind, a question, or just want to connect? I&apos;m always open to discussing new
          opportunities and collaborations. Fill out the form below or use the contact details provided.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <ContactForm siteKey={siteKey} />
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-4">
              <a
                href="mailto:c.r.thackrey@gmail.com"
                className="flex items-center space-x-4 group"
                aria-label="Email Chris Thackrey"
              >
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  c.r.thackrey@gmail.com
                </span>
              </a>
              <a href="tel:+17073193306" className="flex items-center space-x-4 group" aria-label="Call Chris Thackrey">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  (707) 319-3306
                </span>
              </a>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">San Antonio, TX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
