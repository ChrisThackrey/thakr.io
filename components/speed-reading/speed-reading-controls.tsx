"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Settings, Keyboard } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpeedReadingControlsProps {
  isPaused: boolean
  progress: number
  onPause: () => void
  onResume: () => void
  onSeek: (position: number) => void
  onSkipForward: () => void
  onSkipBackward: () => void
  onSettings?: () => void
  onShortcuts?: () => void
  size?: "normal" | "compact"
  showSpeedDisplay?: boolean
  currentSpeed?: number
  onUpdateSpeed?: (speed: number) => void
  variant?: "default" | "mini"
}

export function SpeedReadingControls({
  isPaused,
  progress,
  onPause,
  onResume,
  onSeek,
  onSkipForward,
  onSkipBackward,
  onSettings,
  onShortcuts,
  size = "normal",
  showSpeedDisplay = false,
  currentSpeed = 300,
  onUpdateSpeed,
  variant = "default",
}: SpeedReadingControlsProps) {
  const isCompact = size === "compact" || variant === "mini"
  const buttonSize = isCompact ? "h-8 w-8" : "h-10 w-10"
  const iconSize = isCompact ? "h-3 w-3" : "h-4 w-4"

  return (
    <div className={cn("flex flex-col gap-2", isCompact && "gap-1")}>
      {/* Progress slider */}
      <Slider
        value={[progress]}
        min={0}
        max={100}
        step={0.1}
        onValueChange={(values) => onSeek(values[0] / 100)}
        className="glass-slider"
      />

      {/* Control buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSkipBackward}
            className={cn(buttonSize, "rounded-full glass-button border-0")}
          >
            <SkipBack className={iconSize} />
            <span className="sr-only">Skip backward</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={isPaused ? onResume : onPause}
            className={cn(buttonSize, "rounded-full glass-button border-0", !isPaused && "glass-animate-pulse")}
          >
            {isPaused ? <Play className={iconSize} /> : <Pause className={iconSize} />}
            <span className="sr-only">{isPaused ? "Play" : "Pause"}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onSkipForward}
            className={cn(buttonSize, "rounded-full glass-button border-0")}
          >
            <SkipForward className={iconSize} />
            <span className="sr-only">Skip forward</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          {showSpeedDisplay && currentSpeed && onUpdateSpeed && (
            <div className="flex items-center gap-1 text-xs">
              <span>{currentSpeed} WPM</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateSpeed(Math.max(100, currentSpeed - 50))}
                className="h-6 w-6 p-0 rounded-full glass-button border-0"
              >
                -
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateSpeed(Math.min(1000, currentSpeed + 50))}
                className="h-6 w-6 p-0 rounded-full glass-button border-0"
              >
                +
              </Button>
            </div>
          )}

          {onShortcuts && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onShortcuts}
              className={cn(buttonSize, "rounded-full glass-button border-0")}
            >
              <Keyboard className={iconSize} />
              <span className="sr-only">Keyboard shortcuts</span>
            </Button>
          )}

          {onSettings && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettings}
              className={cn(buttonSize, "rounded-full glass-button border-0")}
            >
              <Settings className={iconSize} />
              <span className="sr-only">Settings</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
