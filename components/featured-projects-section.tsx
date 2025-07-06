import { getProjects } from "@/lib/projects-data"
import { SectionTitle } from "@/components/section-title"
import { FeaturedProjectsGrid } from "@/components/featured-projects-grid"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function FeaturedProjectsSection() {
  const allProjects = await getProjects()
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3)

  // Fallback to show the first 3 projects if none are explicitly featured
  if (featuredProjects.length === 0 && allProjects.length > 0) {
    featuredProjects.push(...allProjects.slice(0, 3))
  }

  if (featuredProjects.length === 0) {
    return null // Don't render the section if there are no projects
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionTitle>Featured Projects</SectionTitle>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto text-center">
          A selection of my recent work. See all my projects on the dedicated projects page.
        </p>
        <FeaturedProjectsGrid projects={featuredProjects} />
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
