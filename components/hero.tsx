"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="pt-16 md:pt-20 pb-28 md:pb-36">
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
            className="flex flex-col sm:flex-row items-center gap-5 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button asChild size="lg" className="font-medium text-base">
              <Link href="/projects" className="group">
                View Projects
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
