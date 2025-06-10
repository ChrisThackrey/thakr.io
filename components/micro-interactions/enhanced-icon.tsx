"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { forwardRef } from "react"

interface EnhancedIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  rotate?: boolean
  pulse?: boolean
  scale?: boolean
}

export const EnhancedIcon = forwardRef<HTMLDivElement, EnhancedIconProps>(
  ({ className, children, rotate = false, pulse = false, scale = true, ...props }, ref) => {
    const iconVariants = {
      hover: {
        scale: scale ? 1.1 : 1,
        rotate: rotate ? 15 : 0,
      },
    }

    const pulseAnimation = pulse
      ? {
          scale: [1, 1.05, 1],
          transition: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop" as const,
          },
        }
      : {}

    return (
      <motion.div
        ref={ref}
        className={cn("inline-flex", className)}
        whileHover="hover"
        variants={iconVariants}
        animate={pulse ? pulseAnimation : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)

EnhancedIcon.displayName = "EnhancedIcon"
