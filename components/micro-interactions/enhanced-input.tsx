"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { forwardRef, useState } from "react"
import type { InputProps } from "@/components/ui/input"

interface EnhancedInputProps extends InputProps {
  focusEffect?: boolean
  labelText?: string
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, focusEffect = true, labelText, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className="relative">
        {labelText && (
          <motion.label
            animate={isFocused ? { y: -20, scale: 0.8 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="absolute left-3 top-2 text-muted-foreground transition-all pointer-events-none"
          >
            {labelText}
          </motion.label>
        )}
        <Input
          ref={ref}
          className={cn(focusEffect ? "micro-input transition-all" : "", isFocused ? "border-primary" : "", className)}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value ? true : false)}
          {...props}
        />
      </div>
    )
  },
)

EnhancedInput.displayName = "EnhancedInput"
