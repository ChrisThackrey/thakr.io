import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarCheck2, ArrowRight } from "lucide-react"

export function BookingCTA() {
  return (
    <div className="text-center py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Let&apos;s Connect!</h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Have a project in mind or just want to discuss technology and development? I&apos;m always open to new opportunities
        and collaborations.
      </p>
      <Button variant="default" size="lg" asChild className="text-lg font-semibold group">
        <Link href="/booking" className="flex items-center justify-center">
          <CalendarCheck2 className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          Book a Consultation
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  )
}
