"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { forwardRef } from "react"
import type { ButtonProps } from "@/components/ui/button"

interface EnhancedButtonProps extends ButtonProps {
  rippleEffect?: boolean
  hoverScale?: boolean
  pressEffect?: boolean
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, rippleEffect = true, hoverScale = true, pressEffect = true, ...props }, ref) => {
    const buttonVariants = {
      hover: hoverScale ? { scale: 1.03 } : {},
      tap: pressEffect ? { scale: 0.97 } : {},
    }

    return (
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button ref={ref} className={cn(rippleEffect ? "micro-btn" : "", className)} {...props} />
      </motion.div>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"
