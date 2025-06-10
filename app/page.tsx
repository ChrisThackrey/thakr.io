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
import { FeaturedProjects } from "@/components/featured-projects" // Added import

export default function HomePage() {
  const featuredExperience = professionalExperience.slice(0, 3)

  return (
    <PageTransition>
      <PageBackground />
      {/* Profile Section */}
      <div className="container mx-auto max-w-4xl pt-16 md:pt-24 pb-0 px-4">
        <ProfileSection />
      </div>
      {/* End Profile Section */}
      <Hero />
      <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
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
      <FeaturedProjects /> {/* Added new section */}
      <ContactSection />
    </PageTransition>
  )
}
