"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function ComingSoonBanner() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-2xl font-bold">
              <Icons.construction className="mr-3 h-7 w-7 text-primary" />
              Coming Soon!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              This feature is currently under construction. We're working hard to bring it to you. Please check back
              later!
            </p>
            <Button asChild>
              <Link href="/" className="flex items-center">
                <Icons.home className="mr-2 h-4 w-4" />
                Go back to Homepage
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
