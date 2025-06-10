import { cn } from "@/lib/utils"

interface SeriesProgressProps {
  currentPart: number
  totalParts: number
  className?: string
}

export function SeriesProgress({ currentPart, totalParts, className }: SeriesProgressProps) {
  // Calculate progress percentage
  const progressPercentage = Math.round((currentPart / totalParts) * 100)

  // Generate labels for screen readers
  const ariaLabel = `Part ${currentPart} of ${totalParts} (${progressPercentage}% complete)`

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          Part {currentPart} of {totalParts}
        </span>
        <span>{progressPercentage}% complete</span>
      </div>
      <div
        className="h-1.5 w-full bg-muted rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Visual indicator of parts */}
      <div className="flex w-full mt-1.5">
        {Array.from({ length: totalParts }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 h-0.5 mx-0.5 first:ml-0 last:mr-0 rounded-full transition-colors duration-300",
              index < currentPart ? "bg-primary" : "bg-muted-foreground/30",
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}
