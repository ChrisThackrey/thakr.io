"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-3">
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Chris Thackrey
            </motion.h1>
            <motion.p
              className="mx-auto max-w-[700px] text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Software Engineer & Designer specializing in AI, web development, and architecture.
            </motion.p>
          </div>

          <motion.div
            className="pt-20 md:pt-24 text-center" // Added some top padding
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }} // Adjusted delay
          >
            <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              I'm currently available for freelance work and full-time opportunities. If you're interested in working
              together, please get in touch.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-5 pt-8 md:pt-10" // Added top padding
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }} // Adjusted delay
          >
            <Button asChild size="lg" className="font-medium text-base">
              <Link href="/#contact" className="group">
                Contact Me
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="font-medium text-base">
              <Link href="/resume.pdf">
                Download Resume
                <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
