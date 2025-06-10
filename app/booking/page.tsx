import type { Metadata } from "next"
import { BookingPageClient } from "./booking-client"
import { PageTransition } from "@/components/page-transition"
import { SectionTitle } from "@/components/section-title"

export const metadata: Metadata = {
  title: "Book a Meeting - Chris Thackrey",
  description: "Schedule a one-hour meeting with Chris Thackrey to discuss projects, collaborations, or opportunities.",
}

export default function BookingPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>Book a Meeting</SectionTitle>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed mb-12">
            Schedule a one-hour consultation to discuss your project, potential collaboration, or just to chat about
            technology and design. I look forward to connecting with you!
          </p>

          <BookingPageClient />
        </div>
      </div>
    </PageTransition>
  )
}
