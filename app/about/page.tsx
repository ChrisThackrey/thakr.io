"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { PageBackground } from "@/components/page-background"
import { motion, Variants } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { SectionTitle } from "@/components/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { BookingCTA } from "@/components/booking-cta"
import { Badge } from "@/components/ui/badge"
import { technicalSkills, education } from "@/lib/experience-data"
import { EducationTimeline } from "@/components/education-timeline"
import { ProfileSection } from "@/components/profile-section"

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()

  const titleFadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  }
  const avatarSocialVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] } },
  }
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] } },
  }
  const resumeButtonRightVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] } },
  }
  const projectsButtonRightVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] } },
  }
  const bottomSectionVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] } },
  }

  const SkillsCard = () => (
    <Card className="bg-background/80 backdrop-blur-sm border border-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Skills</h2>
        <div className="space-y-6">
          {Object.entries(technicalSkills).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <Badge variant="secondary" key={`${category}-${skill}`}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const ViewResumeButton = () => (
    <Button asChild size="lg" className="font-medium text-base w-full sm:w-auto md:w-full">
      <Link href="/resume">
        <Icons.fileText className="mr-2 h-5 w-5" />
        View Resume
      </Link>
    </Button>
  )

  const ViewProjectsButton = () => (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="font-medium text-base w-full sm:w-auto md:w-full bg-transparent"
    >
      <Link href="/projects">
        <Icons.briefcase className="mr-2 h-5 w-5" />
        View Projects
      </Link>
    </Button>
  )

  if (prefersReducedMotion) {
    return (
      <>
        <PageBackground />
        <motion.div
          className="container py-12 md:py-16 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            <div className="md:w-2/3 order-2 md:order-1 space-y-6">
              <SectionTitle as="h1" className="mb-12">
                About Me
              </SectionTitle>
              <p className="text-lg leading-relaxed">
                I&apos;m Chris Thackrey, a Full-Stack Software Engineer with expertise in modern web technologies. I
                specialize in building performant, accessible, and beautiful web applications using Next.js, React,
                TypeScript, and other cutting-edge tools.
              </p>
              <p className="text-lg leading-relaxed">
                With a background in both software engineering and design, I bring a unique perspective to development
                projects. My experience spans from leading software architecture to designing complex systems, allowing
                me to approach problems holistically.
              </p>
              <p className="text-lg leading-relaxed">
                I&apos;m passionate about AI-driven development, creating intuitive user experiences, and building tools
                that make developers&apos; lives easier. When I&apos;m not coding, I enjoy researching emerging
                technologies and sharing knowledge through podcasts and articles.
              </p>
            </div>
            <div className="md:w-1/3 order-1 md:order-2 flex flex-col space-y-8 items-center md:items-stretch">
              <ProfileSection />
              <div className="flex flex-col space-y-4 w-full items-center md:items-stretch">
                <ViewResumeButton />
                <ViewProjectsButton />
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 order-3">
            <SkillsCard />
            <div className="flex flex-col space-y-8 md:space-y-2">
              <EducationTimeline items={education} />
              <BookingCTA />
            </div>
          </div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <PageBackground />
      <div className="container py-12 md:py-16 flex-grow">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          <div className="md:w-2/3 order-2 md:order-1 space-y-6">
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
          </div>
          <div className="md:w-1/3 order-1 md:order-2 flex flex-col space-y-8 items-center md:items-stretch">
            <motion.div variants={avatarSocialVariants} initial="hidden" animate="visible" exit="exit">
              <ProfileSection />
            </motion.div>
            <div className="flex flex-col space-y-4 w-full items-center md:items-stretch">
              <motion.div
                variants={resumeButtonRightVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <ViewResumeButton />
              </motion.div>
              <motion.div
                variants={projectsButtonRightVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <ViewProjectsButton />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 order-3">
          <motion.div custom={0} variants={bottomSectionVariant} initial="hidden" animate="visible" exit="exit">
            <SkillsCard />
          </motion.div>
          <div className="flex flex-col space-y-8 md:space-y-2">
            <motion.div custom={1} variants={bottomSectionVariant} initial="hidden" animate="visible" exit="exit">
              <EducationTimeline items={education} />
            </motion.div>
            <motion.div custom={2} variants={bottomSectionVariant} initial="hidden" animate="visible" exit="exit">
              <BookingCTA />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
