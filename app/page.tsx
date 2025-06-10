import { Hero } from "@/components/hero"
import { PageBackground } from "@/components/page-background"
import { SectionTitle } from "@/components/section-title"
import { Timeline } from "@/components/timeline"
import { professionalExperience } from "@/lib/experience-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ContactSection } from "@/components/contact-section"
import { PageTransition } from "@/components/page-transition"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ChrisThackrey",
    icon: <Github className="h-9 w-9" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/chris-thackrey-015/",
    icon: <Linkedin className="h-9 w-9" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/chris_thackrey/",
    icon: <Instagram className="h-9 w-9" />,
  },
  {
    name: "Email",
    href: "mailto:c.r.thackrey@gmail.com",
    icon: <Mail className="h-9 w-9" />,
  },
]

const ProfileSection = () => (
  <div className="flex flex-col items-center py-12 md:py-16">
    {" "}
    {/* Added padding for spacing */}
    <Avatar className="w-52 h-52 md:w-60 md:h-60 border-4 border-primary/20 shadow-lg mb-8 md:mb-6">
      <AvatarImage src="/images/profile-1.jpg" alt="Chris Thackrey" />
      <AvatarFallback>CT</AvatarFallback>
    </Avatar>
    <div className="flex space-x-6">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="lg"
          asChild
          className="rounded-full hover:bg-primary/10 transition-colors"
        >
          <Link
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={link.name}
          >
            {link.icon}
          </Link>
        </Button>
      ))}
    </div>
  </div>
)

export default function HomePage() {
  const featuredExperience = professionalExperience.slice(0, 3)

  return (
    <PageTransition>
      <PageBackground />
      <ProfileSection />
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
      <ContactSection />
    </PageTransition>
  )
}
