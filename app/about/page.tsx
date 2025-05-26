"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download } from "lucide-react"
import { PageBackground } from "@/components/page-background"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { SectionTitle } from "@/components/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { BookingCTA } from "@/components/booking-cta"

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()

  // Base animation variants - simple fade
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4 },
    },
  }

  // Text animation variants - simple fade with slight y movement
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
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

  // Skills animation variants - simple fade with slight x movement
  const skillsVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      x: -5,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  // Education animation variants - simple fade only
  const educationVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  // Button animation variants - simple fade with slight scale
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
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

  // If reduced motion is preferred, use simple fade animations
  if (prefersReducedMotion) {
    return (
      <>
        <PageBackground />
        <motion.div
          className="container py-20 md:py-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle as="h1" className="mb-12">
            About Me
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="md:col-span-2 space-y-6">
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

            <div className="space-y-12">
              <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Skills</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Front End</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        TypeScript, NextJS, Astro, SvelteKit, React Hooks + Context API, Redux, JavaScript, D3,
                        Shadcn/ui, TailwindCSS, Radix UI, ChakraUI, Vercel v0
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Back End</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Vercel Serverless Functions, Edge Functions, GraphQL, MongoDB, MySQL, Prisma, Supabase,
                        Firebase, Redis, Python
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Deployment</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Vercel Platform, Github Actions, Github Apps, Vercel CLI, Deploy Hooks, Vercel REST API, Docker,
                        Heroku, DigitalOcean, Electron, AWS: EC2, AWS Lambda Functions, Google Cloud Functions
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">DevOps</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Turbopack, Turborepo, Azure DevOps Integration, Observability Tools, Trigger.dev, Datadog,
                        Artillery.io, TDD prompt engineering, Critical-CSS, React-Suspense, NGINX
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Education</h2>

                  <div className="space-y-5">
                    <div>
                      <h3 className="font-semibold text-lg">The Rust Developer Bootcamp</h3>
                      <p className="text-base text-muted-foreground mt-1">Certificate of Completion, 2022</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">AlgoExpert.io</h3>
                      <p className="text-base text-muted-foreground mt-1">Certificate of Completion, 2022</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">Hack Reactor</h3>
                      <p className="text-base text-muted-foreground mt-1">Austin, Texas — graduated March 2021</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">Gnomon School of Visual Effects</h3>
                      <p className="text-base text-muted-foreground mt-1">Los Angeles, California — 2017-2018</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">Southern California Institute of Architecture</h3>
                      <p className="text-base text-muted-foreground mt-1">Los Angeles, California — 2016-2017</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">Texas A&M University</h3>
                      <p className="text-base text-muted-foreground mt-1">
                        Bachelor of Science - Environmental Design, Cum Laude — 2015
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
      <div className="container py-20 md:py-28">
        <motion.div className="mb-12" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
          <SectionTitle as="h1">About Me</SectionTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="md:col-span-2 space-y-6">
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

            <motion.div className="pt-6" variants={buttonVariants} initial="hidden" animate="visible" exit="exit">
              <Button asChild size="lg" className="font-medium text-base">
                <Link href="/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Skills</h2>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Front End",
                        skills:
                          "TypeScript, NextJS, Astro, SvelteKit, React Hooks + Context API, Redux, JavaScript, D3, Shadcn/ui, TailwindCSS, Radix UI, ChakraUI, Vercel v0",
                      },
                      {
                        title: "Back End",
                        skills:
                          "Vercel Serverless Functions, Edge Functions, GraphQL, MongoDB, MySQL, Prisma, Supabase, Firebase, Redis, Python",
                      },
                      {
                        title: "Deployment",
                        skills:
                          "Vercel Platform, Github Actions, Github Apps, Vercel CLI, Deploy Hooks, Vercel REST API, Docker, Heroku, DigitalOcean, Electron, AWS: EC2, AWS Lambda Functions, Google Cloud Functions",
                      },
                      {
                        title: "DevOps",
                        skills:
                          "Turbopack, Turborepo, Azure DevOps Integration, Observability Tools, Trigger.dev, Datadog, Artillery.io, TDD prompt engineering, Critical-CSS, React-Suspense, NGINX",
                      },
                    ].map((skill, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={skillsVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <h3 className="font-semibold text-lg mb-3">{skill.title}</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">{skill.skills}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Education</h2>

                  <div className="space-y-5">
                    {[
                      {
                        school: "The Rust Developer Bootcamp",
                        details: "Certificate of Completion, 2022",
                      },
                      {
                        school: "AlgoExpert.io",
                        details: "Certificate of Completion, 2022",
                      },
                      {
                        school: "Hack Reactor",
                        details: "Austin, Texas — graduated March 2021",
                      },
                      {
                        school: "Gnomon School of Visual Effects",
                        details: "Los Angeles, California — 2017-2018",
                      },
                      {
                        school: "Southern California Institute of Architecture",
                        details: "Los Angeles, California — 2016-2017",
                      },
                      {
                        school: "Texas A&M University",
                        details: "Bachelor of Science - Environmental Design, Cum Laude — 2015",
                      },
                    ].map((education, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={educationVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <h3 className="font-semibold text-lg">{education.school}</h3>
                        <p className="text-base text-muted-foreground mt-1">{education.details}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
