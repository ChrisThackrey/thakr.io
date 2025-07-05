import ContactForm from "@/components/contact-form"

/**
 * Server Component
 * Reads the TURNSTILE_SITE_KEY on the server
 * and passes it to the client ContactForm.
 */
export default function ContactFormWrapper() {
  // ⚠️ Use NON-public env var so it isn’t bundled for the client
  const siteKey = process.env.TURNSTILE_SITE_KEY ?? ""

  return <ContactForm siteKey={siteKey} />
}
