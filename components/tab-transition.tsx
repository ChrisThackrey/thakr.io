"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface TabTransitionProps {
  children: ReactNode
  id: string
}

export function TabTransition({ children, id }: TabTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
