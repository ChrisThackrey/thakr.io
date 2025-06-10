import { Hero } from "@/components/hero"
import { PageBackground } from "@/components/page-background"
import { SectionTitle } from "@/components/section-title"
import { Timeline } from "@/components/timeline"
import { professionalExperience } from "@/lib/experience-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ContactSection } from "@/components/contact-section"
import { PageTransition } from "@/components/page-transition"
import { ProfileSection } from "@/components/profile-section"

export default function HomePage() {
  const featuredExperience = professionalExperience.slice(0, 3)

  return (
    <PageTransition>
      <PageBackground />
      <Hero />
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-16 flex justify-center md:mb-24">
            <ProfileSection />
          </div>

          <SectionTitle as="h2" className="mb-12">
            Recent Work & Experience
          </SectionTitle>
          <Timeline items={featuredExperience} />
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/work">View Full Resume</Link>
            </Button>
          </div>
        </div>
      </section>
      <ContactSection />
    </PageTransition>
  )
}
