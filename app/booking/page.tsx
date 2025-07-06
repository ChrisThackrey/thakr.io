import type { Metadata } from "next"
import { BookingPageClient } from "./booking-client"
import { PageTransition } from "@/components/page-transition"
import { PageBackground } from "@/components/page-background"
import { ComingSoonBanner } from "@/components/coming-soon-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Book a Meeting - Chris Thackrey",
  description: "Schedule a one-hour meeting with Chris Thackrey to discuss projects, collaborations, or opportunities.",
}

export default function BookingPage() {
  return (
    <PageTransition className="flex flex-col flex-grow">
      <ComingSoonBanner />
      <PageBackground />
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">Book a Meeting</CardTitle>
              <CardDescription className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Schedule a one-hour consultation to discuss your project, potential collaboration, or just to chat about
                technology and design. I look forward to connecting with you!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <BookingPageClient />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
