"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, Briefcase } from "lucide-react"
import { PageBackground } from "@/components/page-background"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { SectionTitle } from "@/components/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { BookingCTA } from "@/components/booking-cta"
import { ColoredTag } from "@/components/colored-tag"
import { technicalSkills, education } from "@/lib/experience-data"
import { EducationTimeline } from "@/components/education-timeline"
import { ProfileSection } from "@/components/profile-section"
import { Footer } from "@/components/footer" // Added import

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()

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

  const resumeButtonRightVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  const projectsButtonRightVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  const bottomSectionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      // i will be the custom prop for staggering
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.5, // Base delay of 0.5s, stagger by 0.1s
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
                  <ColoredTag key={`${category}-${skill}`} tag={skill} />
                ))}
              </div>
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
        <motion.div // Main page wrapper with simple fade for reduced motion
          className="container py-12 md:py-16 flex-grow" // Added flex-grow
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Section: About Me & Profile/Buttons */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            {/* Left Column (About Me text) */}
            <div className="md:w-2/3 order-2 md:order-1 space-y-6">
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
            </div>

            {/* Right Column (Profile, Buttons) */}
            <div className="md:w-1/3 order-1 md:order-2 flex flex-col space-y-8 items-center md:items-stretch">
              <ProfileSection />
              <div className="flex flex-col space-y-4 w-full items-center md:items-stretch">
                <Button asChild size="lg" className="font-medium text-base w-full sm:w-auto md:w-full">
                  <Link href="/resume.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-medium text-base w-full sm:w-auto md:w-full"
                >
                  <Link href="/projects">
                    <Briefcase className="mr-2 h-5 w-5" />
                    View Projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Sections: Skills, Education, and CTA */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 order-3">
            {/* Left Column: Skills */}
            <SkillsCard />

            {/* Right Column: Education & Booking CTA */}
            <div className="flex flex-col space-y-8 md:space-y-2">
              <EducationTimeline items={education} />
              <BookingCTA />
            </div>
          </div>
        </motion.div>
        <Footer />
      </>
    )
  }

  // With animations
  return (
    <>
      <PageBackground />
      <div className="container py-12 md:py-16 flex-grow">
        {" "}
        {/* Added flex-grow */}
        {/* Top Section: About Me & Profile/Buttons */}
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
                <Button asChild size="lg" className="font-medium text-base w-full sm:w-auto md:w-full">
                  <Link href="/resume.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                variants={projectsButtonRightVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-medium text-base w-full sm:w-auto md:w-full"
                >
                  <Link href="/projects">
                    <Briefcase className="mr-2 h-5 w-5" />
                    View Projects
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Bottom Sections: Skills, Education, and CTA */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 order-3">
          {/* Left Column: Skills */}
          <motion.div
            custom={0} // For stagger: delay = 0 * 0.1 + 0.5 = 0.5s
            variants={bottomSectionVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SkillsCard />
          </motion.div>

          {/* Right Column: Education & Booking CTA */}
          <div className="flex flex-col space-y-8 md:space-y-2">
            <motion.div
              custom={1} // For stagger: delay = 1 * 0.1 + 0.5 = 0.6s
              variants={bottomSectionVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <EducationTimeline items={education} />
            </motion.div>
            <motion.div
              custom={2} // For stagger: delay = 2 * 0.1 + 0.5 = 0.7s
              variants={bottomSectionVariant} // Re-using the same variant for consistency
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <BookingCTA />
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
