import "server-only"
import { ContactForm } from "@/components/contact-form"

/**
 * Server Component: reads TURNSTILE_SITE_KEY from the environment
 * and passes it to the client contact form.
 *
 * NOTE:  **Never import `process.env` in client code.**
 */
export default function ContactPage() {
  const siteKey = process.env.TURNSTILE_SITE_KEY ?? ""

  return (
    <main className="container py-12">
      <h1 className="mb-6 text-3xl font-bold">Contact</h1>
      <ContactForm siteKey={siteKey} />
      {/* Load the Turnstile script once per page */}
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
    </main>
  )
}
