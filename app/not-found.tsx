"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchX, Home, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.2,
        }}
        className="relative flex h-48 w-48 items-center justify-center"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <SearchX className="h-32 w-32 text-primary/70" />
        </motion.div>
        <motion.div
          className="absolute text-5xl font-bold text-muted-foreground/50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ top: "10%", left: "15%" }}
        >
          ?
        </motion.div>
        <motion.div
          className="absolute text-3xl font-bold text-muted-foreground/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ bottom: "20%", right: "10%" }}
        >
          !
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 max-w-md"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Page Not Found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Oops! It seems the page you&apos;re looking for has drifted off into the digital void.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 flex gap-4"
      >
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Home Base
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog">
            <BookOpen className="mr-2 h-4 w-4" />
            Explore the Blog
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
