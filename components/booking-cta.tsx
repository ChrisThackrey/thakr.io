import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function BookingCTA() {
  return (
    <section className="py-16 md:py-24 bg-muted/50 dark:bg-muted/10 rounded-xl shadow-sm">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Let's Connect</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Interested in working together or discussing a project? Book a one-hour consultation to explore how we can
          collaborate.
        </p>
        <Button asChild size="lg" className="group">
          <Link href="/booking">
            <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Book a Meeting
          </Link>
        </Button>
      </div>
    </section>
  )
}
