import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { kv } from "@vercel/kv"

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  senderEmail: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long." })
    .max(100, { message: "Subject must be less than 100 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message must be less than 1000 characters." }),
  inquiryType: z.enum(["Job Opportunity", "Project Proposal", "Collaboration", "General Question"]).optional(),
  website: z.string().max(0, { message: "This field must be empty." }).optional(), // Honeypot field
})

const resend = new Resend(process.env.RESEND_API_KEY)

// Create a new ratelimiter, that allows 5 requests per minute
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, "60s"),
})

const TO_EMAIL = "c.r.thackrey@gmail.com"
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL && process.env.RESEND_FROM_EMAIL.trim() !== ""
    ? process.env.RESEND_FROM_EMAIL
    : "onboarding@resend.dev"

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1"

  try {
    // 1. Rate Limiting
    const { success: rateLimitSuccess, limit, remaining, reset } = await ratelimit.limit(ip)
    if (!rateLimitSuccess) {
      return NextResponse.json(
        { success: false, error: "Too many requests.", limit, remaining, reset },
        { status: 429 },
      )
    }

    // 2. Check for required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("Required environment variables are not set.")
      return NextResponse.json(
        { success: false, error: "Server configuration error: Service not available." },
        { status: 500 },
      )
    }

    // 3. Parse and validate body
    const body = await request.json()
    const parsedData = contactSchema.safeParse(body)

    if (!parsedData.success) {
      // 4. Honeypot check
      const honeypotError = parsedData.error.flatten().fieldErrors.website
      if (honeypotError) {
        console.log("Honeypot field filled, likely a bot. Silently ignoring.")
        return NextResponse.json({ success: true, message: "Message received." }, { status: 200 })
      }
      return NextResponse.json(
        { success: false, error: "Invalid form data.", details: parsedData.error.flatten() },
        { status: 400 },
      )
    }

    const { name, senderEmail, subject, message, inquiryType } = parsedData.data

    // 5. Send email
    const emailHtml = `
      <h1>New Contact Form Submission</h1>
      <p><strong>From:</strong> ${name} (${senderEmail})</p>
      ${inquiryType ? `<p><strong>Inquiry Type:</strong> ${inquiryType}</p>` : ""}
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p><em>This email was sent from the contact form on your website.</em></p>
    `

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `New Contact Form: ${subject}`,
      replyTo: senderEmail,
      html: emailHtml,
    })

    if (error) {
      console.error("Resend API Error:", error)
      return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 })
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "An unknown error occurred."
    console.error("Generic Error in /api/contact:", error)
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 })
  }
}
