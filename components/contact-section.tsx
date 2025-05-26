"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, Mail } from "lucide-react"
import { SectionTitle } from "@/components/section-title"
import { motion } from "framer-motion"

export function ContactSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/50 dark:bg-muted/10 rounded-xl shadow-sm">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle as="h2" className="text-center after:left-1/2 after:-translate-x-1/2">
            Let's Work Together
          </SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I'm currently available for freelance work and full-time opportunities. If you're interested in working
            together, please get in touch.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <Button asChild size="lg" className="font-medium text-base">
              <Link href="mailto:c.r.thackrey@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="font-medium text-base">
              <Link href="/resume.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
