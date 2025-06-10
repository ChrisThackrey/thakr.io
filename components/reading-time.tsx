import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReadingTimeProps {
  minutes: number
  showSpeedIndicator?: boolean
  className?: string
}

export function ReadingTime({ minutes, showSpeedIndicator = true, className }: ReadingTimeProps) {
  // Determine reading length category
  let speedIndicator = ""
  if (showSpeedIndicator) {
    if (minutes <= 3) speedIndicator = "Quick read"
    else if (minutes <= 7) speedIndicator = "Short read"
    else if (minutes <= 12) speedIndicator = "Medium read"
    else speedIndicator = "Long read"
  }

  return (
    <div className={cn("flex items-center text-sm text-muted-foreground", className)}>
      <Clock className="h-3 w-3 mr-1" />
      <span>
        {minutes} min{minutes === 1 ? "" : "s"} read
      </span>
      {showSpeedIndicator && speedIndicator && <span className="ml-1 text-xs">({speedIndicator})</span>}
    </div>
  )
}
