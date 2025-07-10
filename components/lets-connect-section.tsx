"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function LetsConnectSection() {
  return (
    <section className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Let&apos;s Connect</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-3 mb-4 rounded-full" />
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          I&apos;m currently available for freelance work and full-time opportunities. If you&apos;re interested in working
          together, please get in touch.
        </p>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8 md:pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Button asChild size="lg" className="font-medium text-base">
            <Link href="/contact" className="group">
              Contact Me
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="font-medium text-base bg-transparent">
            <Link href="/resume" className="group">
              View Resume
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}