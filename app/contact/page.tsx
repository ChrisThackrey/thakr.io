import ContactForm from "./ContactForm"

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm siteKey={siteKey} />
    </div>
  )
}
