"use client"

import { type FormEvent, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface ContactFormProps {
  /** Cloudflare Turnstile site-key passed from the server component */
  siteKey: string
}

/**
 * Client-side contact form.
 *  – Receives the Turnstile site-key via props (so no env vars are referenced here).
 *  – Sends the form data (and Turnstile token) to a future route-handler or action.
 */
export function ContactForm({ siteKey }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current) return

    setPending(true)
    setMessage(null)

    const formData = new FormData(formRef.current)

    // The Turnstile widget writes its token into "cf-turnstile-response"
    // (added automatically when the user solves the challenge).
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      const data = (await res.json()) as { ok: boolean; message?: string }
      setMessage(data.message ?? (data.ok ? "Message sent!" : "Something went wrong."))
    } catch (err) {
      setMessage("Network error — please try again.")
    } finally {
      setPending(false)
      formRef.current.reset()
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <Input name="name" placeholder="Name" required />
      <Input type="email" name="email" placeholder="Email" inputMode="email" required />
      <Textarea name="message" placeholder="Message" rows={6} required />

      {/* Cloudflare Turnstile widget */}
      <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" />

      <Button type="submit" disabled={pending} className="flex items-center justify-center gap-2">
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Send
      </Button>

      {message && <p className="text-center text-sm text-muted-foreground">{message}</p>}
    </form>
  )
}
