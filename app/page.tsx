import { Hero } from "@/components/hero"
import { Timeline } from "@/components/timeline"
import { ProjectCard } from "@/components/project-card"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionTitle } from "@/components/section-title"
import { BookingCTA } from "@/components/booking-cta"

export default function HomePage() {
  const experienceItems = [
    {
      title: "Principal Software Architect",
      company: "Silver Bow Technology Group",
      date: "2025",
      description: [
        'Lead software engineering team and built the core AI functionality for a "version control for reasoning" dev tool - providing AI-driven code-generation, prompt enhancement, architecture strategy, as well as project planning and security features.',
      ],
      skills: ["AI", "Code Generation", "Architecture", "Team Leadership"],
    },
    {
      title: "Software Engineer",
      company: "Black Flag Design",
      date: "2024-2025",
      description: [
        "Contributed full feature code across all five projects in development, including leading the development of Unbound, a meeting to feature codegen application and internal dev tool that wrote AI-generated feature Pull Requests.",
        "Researched, scripted, and hosted a podcast series on AI coding trends, Vercelʼs development ecosystem and tech trends.",
      ],
      skills: ["AI", "Next.js", "Vercel", "Full-Stack Development"],
    },
    {
      title: "Lead Designer",
      company: "Gianni Ranaulo Design",
      date: "2016",
      description: ["Lead designer for architectural projects in Dubai, UAE."],
      skills: ["Design", "Architecture", "Project Management"],
    },
    {
      title: "Lead Designer",
      company: "Xuberance Design",
      date: "2013-2015",
      description: ["Lead designer for architectural projects in Shanghai, China."],
      skills: ["Design", "Architecture", "Project Management"],
    },
  ]

  const projects = [
    {
      title: "AI Teaching Application",
      description: "Multiplayer AI chat application for education with meeting rooms and deep research capabilities.",
      tags: ["Next.js", "Stream Chat API", "OpenAI SDK", "Langgraph"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Unbound",
      description: "AI Repository Code Generation Application that creates pull requests from meeting transcripts.",
      tags: ["Octokit API", "Supabase", "OpenAI API", "Anthropic API"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Wildfire Risk Analyst",
      description: "Cloud-based SaaS for wildfire spread prediction with geo-spatial visualization.",
      tags: ["Uber H3", "D3", "Azure", "OpenAI"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Lineage CRM",
      description: "Final expense CRM management app with geo-spatial clustering and analytics.",
      tags: ["Google Maps", "Nivo Charts", "Supabase", "ETL"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <>
      <Hero />

      <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
        <section className="mb-24 md:mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <SectionTitle>Experience</SectionTitle>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                My professional journey and work history in software engineering and design.
              </p>
            </div>
            <Button variant="ghost" asChild className="mt-6 md:mt-0 font-medium">
              <Link href="/work" className="group">
                View Full History
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <Timeline items={experienceItems} />
        </section>

        <section className="py-16 md:py-20 px-6 md:px-10 bg-muted/50 dark:bg-muted/10 rounded-xl shadow-sm mb-24 md:mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <SectionTitle>Featured Projects</SectionTitle>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                A selection of my recent work and notable projects.
              </p>
            </div>
            <Button variant="ghost" asChild className="mt-6 md:mt-0 font-medium">
              <Link href="/projects" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>

        <ContactSection />
        <BookingCTA />
      </div>
    </>
  )
}
