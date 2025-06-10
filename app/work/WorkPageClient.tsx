"use client"

import { PageTransition } from "@/components/page-transition"
import { Timeline } from "@/components/timeline"
import { PageBackground } from "@/components/page-background"
import { SectionTitle } from "@/components/section-title"
import { motion } from "framer-motion"
import { BookingCTA } from "@/components/booking-cta"
import { professionalExperience, education, technicalSkills } from "@/lib/experience-data"
import { TechnicalSkills } from "@/components/technical-skills"

export default function WorkPageClient() {
  return (
    <PageTransition>
      <PageBackground />
      <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <SectionTitle as="h1">Work Experience & Projects</SectionTitle>
        </motion.div>

        <Timeline items={professionalExperience} />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 mt-20"
        >
          <SectionTitle as="h1">Education & Certifications</SectionTitle>
        </motion.div>

        <Timeline items={education} />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }} // Adjusted delay for the last section
          className="mt-20" // Added margin top for separation
        >
          {/* SectionTitle for Technical Skills is now inside the TechnicalSkills component */}
          <TechnicalSkills skills={technicalSkills} />
        </motion.div>
      </div>
      <BookingCTA />
    </PageTransition>
  )
}
