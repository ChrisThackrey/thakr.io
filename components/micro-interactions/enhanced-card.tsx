"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { forwardRef } from "react"
import type { CardProps } from "@/components/ui/card"

interface EnhancedCardProps extends CardProps {
  hoverEffect?: boolean
  pressEffect?: boolean
  hoverScale?: number
}

export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, hoverEffect = true, pressEffect = true, hoverScale = 1.02, ...props }, ref) => {
    const cardVariants = {
      hover: hoverEffect ? { y: -5, scale: hoverScale } : {},
      tap: pressEffect ? { y: -2, scale: 1 } : {},
    }

    return (
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card
          ref={ref}
          className={cn(hoverEffect ? "shadow-sm hover:shadow-md transition-shadow" : "", className)}
          {...props}
        />
      </motion.div>
    )
  },
)

EnhancedCard.displayName = "EnhancedCard"
