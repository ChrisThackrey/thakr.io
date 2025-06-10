"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, Github, Linkedin, Instagram, Mail } from "lucide-react"
import { PageBackground } from "@/components/page-background"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { SectionTitle } from "@/components/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingCTA } from "@/components/booking-cta"
import { ColoredTag } from "@/components/colored-tag"
import { technicalSkills } from "@/lib/experience-data"

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()

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

  const titleFadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4 },
    },
  }

  const avatarSocialVariants = {
    // For ProfileSection
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  // This will now be used for EducationCard (first card after profile)
  const firstCardVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1, // Earlier delay for the first card
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -5,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  // This will now be used for SkillsCard (second card after profile)
  const secondCardVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3, // Later delay for the second card
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -5,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  const resumeButtonVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  const ProfileSection = () => (
    <div className="flex flex-col items-center">
      <Avatar className="w-56 h-56 md:w-64 md:h-64 border-4 border-primary/20 shadow-lg mb-8 md:mb-6">
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

  const SkillsCard = () => (
    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Skills</h2>
        <div className="space-y-6">
          {Object.entries(technicalSkills).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <ColoredTag key={`${category}-${skill}`} tag={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const EducationCard = () => (
    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Education</h2>
        <div className="space-y-5">
          {[
            { school: "The Rust Developer Bootcamp", details: "Certificate of Completion, 2022" },
            { school: "AlgoExpert.io", details: "Certificate of Completion, 2022" },
            { school: "Hack Reactor", details: "Austin, Texas — graduated March 2021" },
            { school: "Gnomon School of Visual Effects", details: "Los Angeles, California — 2017-2018" },
            {
              school: "Southern California Institute of Architecture",
              details: "Los Angeles, California — 2016-2017",
            },
            {
              school: "Texas A&M University",
              details: "Bachelor of Science - Environmental Design, Cum Laude — 2015",
            },
          ].map((education, i) => (
            <div key={i}>
              <h3 className="font-semibold text-lg">{education.school}</h3>
              <p className="text-base text-muted-foreground mt-1">{education.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  if (prefersReducedMotion) {
    return (
      <>
        <PageBackground />
        <motion.div
          className="container py-12 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Changed to md:grid-cols-5 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column (About Me text) - Changed to md:col-span-3 */}
            <div className="md:col-span-3 space-y-6 order-2 md:order-1">
              <SectionTitle as="h1" className="mb-12">
                About Me
              </SectionTitle>
              <p className="text-lg leading-relaxed">
                I'm Chris Thackrey, a Full-Stack Software Engineer with expertise in modern web technologies. I
                specialize in building performant, accessible, and beautiful web applications using Next.js, React,
                TypeScript, and other cutting-edge tools.
              </p>
              <p className="text-lg leading-relaxed">
                With a background in both software engineering and design, I bring a unique perspective to development
                projects. My experience spans from leading software architecture to designing complex systems, allowing
                me to approach problems holistically.
              </p>
              <p className="text-lg leading-relaxed">
                I'm passionate about AI-driven development, creating intuitive user experiences, and building tools that
                make developers' lives easier. When I'm not coding, I enjoy researching emerging technologies and
                sharing knowledge through podcasts and articles.
              </p>
              <div className="pt-6">
                <Button asChild size="lg" className="font-medium text-base">
                  <Link href="/resume.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column Wrapper - Changed to md:col-span-2 md:col-start-4 */}
            <div className="order-1 md:order-2 md:col-span-2 md:col-start-4 flex flex-col space-y-12 md:space-y-6">
              {/* Profile + First Card Group (Education) */}
              <div className="flex flex-col space-y-6 md:space-y-8">
                <ProfileSection />
                <EducationCard /> {/* EducationCard is now first */}
              </div>
              {/* Second Card (Skills) */}
              <SkillsCard /> {/* SkillsCard is now second */}
            </div>
          </div>

          <div className="mt-20">
            <BookingCTA />
          </div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <PageBackground />
      <div className="container py-12 md:py-16">
        {/* Changed to md:grid-cols-5 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column (About Me text) - Changed to md:col-span-3 */}
          <div className="md:col-span-3 space-y-6 order-2 md:order-1">
            <motion.div className="mb-12" variants={titleFadeIn} initial="hidden" animate="visible" exit="exit">
              <SectionTitle as="h1">About Me</SectionTitle>
            </motion.div>
            {[
              "I'm Chris Thackrey, a Full-Stack Software Engineer with expertise in modern web technologies. I specialize in building performant, accessible, and beautiful web applications using Next.js, React, TypeScript, and other cutting-edge tools.",
              "With a background in both software engineering and design, I bring a unique perspective to development projects. My experience spans from leading software architecture to designing complex systems, allowing me to approach problems holistically.",
              "I'm passionate about AI-driven development, creating intuitive user experiences, and building tools that make developers' lives easier. When I'm not coding, I enjoy researching emerging technologies and sharing knowledge through podcasts and articles.",
            ].map((paragraph, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.div className="pt-6" variants={resumeButtonVariants} initial="hidden" animate="visible" exit="exit">
              <Button asChild size="lg" className="font-medium text-base">
                <Link href="/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column Wrapper - Changed to md:col-span-2 md:col-start-4 */}
          <div className="order-1 md:order-2 md:col-span-2 md:col-start-4 flex flex-col space-y-12 md:space-y-6">
            {/* Profile + First Card Group (Education) */}
            <div className="flex flex-col space-y-6 md:space-y-8">
              <motion.div variants={avatarSocialVariants} initial="hidden" animate="visible" exit="exit">
                <ProfileSection />
              </motion.div>
              <motion.div variants={firstCardVariants} initial="hidden" animate="visible" exit="exit">
                {" "}
                {/* EducationCard uses firstCardVariants */}
                <EducationCard />
              </motion.div>
            </div>
            {/* Second Card (Skills) */}
            <motion.div variants={secondCardVariants} initial="hidden" animate="visible" exit="exit">
              {" "}
              {/* SkillsCard uses secondCardVariants */}
              <SkillsCard />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <BookingCTA />
        </motion.div>
      </div>
    </>
  )
}
