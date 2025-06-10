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
import { FeaturedProjectsSection } from "@/components/featured-projects-section"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { BlogPreviewSection } from "@/components/blog-preview-section"

export default function HomePage() {
  const featuredExperience = professionalExperience.slice(0, 3)

  return (
    <PageTransition className="flex flex-col flex-grow">
      <div className="flex-grow">
        <PageBackground />
        {/* Profile Section */}
        <div className="container mx-auto max-w-4xl pt-16 md:pt-24 pb-0 px-4">
          <ProfileSection />
        </div>
        {/* End Profile Section */}
        <Hero />
        {/* Recent Work & Experience Section */}
        <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
          <div className="flex justify-between items-center mb-12">
            <SectionTitle as="h2" className="mb-0">
              Recent Work & Experience
            </SectionTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/work" className="group hidden sm:flex">
                Full Work Experience
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <Timeline items={featuredExperience} />
          {/* Updated "View Full Resume" button container */}
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/work">View Full Resume</Link>
            </Button>
          </div>
        </div>

        {/* Featured Projects Section */}
        <FeaturedProjectsSection />

        {/* Blog Preview Section */}
        <BlogPreviewSection />

        {/* Let's Connect Section */}
        <ContactSection />
      </div>
      <Footer />
    </PageTransition>
  )
}
