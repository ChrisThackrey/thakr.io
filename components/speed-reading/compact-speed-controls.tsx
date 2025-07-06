"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipForward, SkipBack, Settings } from "lucide-react"
import { useEffect, useState } from "react"

interface CompactSpeedControlsProps {
  isPaused: boolean
  progress: number
  onPause: () => void
  onResume: () => void
  onSeek: (position: number) => void
  onSkipForward: () => void
  onSkipBackward: () => void
  onSettings?: () => void
  className?: string
  currentSpeed?: number
  onUpdateSpeed?: (speed: number) => void
  showSpeedDisplay?: boolean
}

export function CompactSpeedControls({
  isPaused,
  progress,
  onPause,
  onResume,
  onSeek,
  onSkipForward,
  onSkipBackward,
  onSettings,
  className,
  currentSpeed = 300,
  onUpdateSpeed,
  showSpeedDisplay = false,
}: CompactSpeedControlsProps) {
  const [isSliderDragging] = useState(false)
  const [localProgress, setLocalProgress] = useState(progress)

  // Update local progress when the prop changes
  useEffect(() => {
    if (!isSliderDragging) {
      setLocalProgress(progress)
    }
  }, [progress, isSliderDragging])

  // Handle play/pause button click
  const handlePlayPauseClick = () => {
    if (isPaused) {
      onResume()
    } else {
      onPause()
    }
  }

  // Handle progress slider change
  const handleProgressChange = (value: number[]) => {
    setLocalProgress(value[0])
    onSeek(value[0])
  }

  // Handle speed slider change
  const handleSpeedChange = (value: number[]) => {
    if (onUpdateSpeed) {
      onUpdateSpeed(value[0])
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Progress slider */}
      <Slider
        value={[localProgress]}
        min={0}
        max={1}
        step={0.001}
        onValueChange={handleProgressChange}
        onValueCommit={handleProgressChange}
        aria-label="Reading progress"
        className="mb-1"
      />

      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          {/* Skip backward button */}
          <Button variant="ghost" size="icon" onClick={onSkipBackward} className="h-6 w-6" aria-label="Skip backward">
            <SkipBack className="h-3 w-3" />
          </Button>

          {/* Play/Pause button */}
          <Button
            variant={isPaused ? "default" : "secondary"}
            size="sm"
            onClick={handlePlayPauseClick}
            className="h-6 min-w-6 px-2"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </Button>

          {/* Skip forward button */}
          <Button variant="ghost" size="icon" onClick={onSkipForward} className="h-6 w-6" aria-label="Skip forward">
            <SkipForward className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Speed display */}
          {showSpeedDisplay && (
            <div className="text-xs text-muted-foreground whitespace-nowrap">{currentSpeed} WPM</div>
          )}

          {/* Settings button */}
          {onSettings && (
            <Button variant="ghost" size="icon" onClick={onSettings} className="h-6 w-6" aria-label="Settings">
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Speed adjustment slider */}
      {onUpdateSpeed && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Slow</span>
          <Slider
            value={[currentSpeed]}
            min={100}
            max={800}
            step={25}
            onValueChange={handleSpeedChange}
            aria-label="Reading speed"
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground">Fast</span>
        </div>
      )}
    </div>
  )
}
