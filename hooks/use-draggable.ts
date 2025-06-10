"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect"

interface Position {
  x: number
  y: number
}

interface UseDraggableOptions {
  initialPosition?: Position
  bounds?: "parent" | "window" | { left: number; top: number; right: number; bottom: number }
  disabled?: boolean
}

export function useDraggable({
  initialPosition = { x: 0, y: 0 },
  bounds = "window",
  disabled = false,
}: UseDraggableOptions = {}) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState<Position>(initialPosition)
  const [dragStart, setDragStart] = useState<Position | null>(null)
  const [elementSize, setElementSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [parentSize, setParentSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  // Update element and parent sizes
  const updateSizes = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect()
      setElementSize({ width: rect.width, height: rect.height })

      if (bounds === "parent" && element.parentElement) {
        const parentRect = element.parentElement.getBoundingClientRect()
        setParentSize({ width: parentRect.width, height: parentRect.height })
      } else {
        setParentSize({ width: window.innerWidth, height: window.innerHeight })
      }
    },
    [bounds],
  )

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return

      // Only start dragging on header or non-interactive elements
      const target = e.target as HTMLElement
      if (target.closest("button") || target.closest("input") || target.closest("a")) {
        return
      }

      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
      updateSizes(e.currentTarget)
    },
    [disabled, position, updateSizes],
  )

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragStart) return

      let newX = e.clientX - dragStart.x
      let newY = e.clientY - dragStart.y

      // Apply bounds
      if (bounds === "window" || bounds === "parent") {
        const maxX = parentSize.width - elementSize.width
        const maxY = parentSize.height - elementSize.height
        newX = Math.max(0, Math.min(newX, maxX))
        newY = Math.max(0, Math.min(newY, maxY))
      } else if (typeof bounds === "object") {
        newX = Math.max(bounds.left, Math.min(newX, bounds.right - elementSize.width))
        newY = Math.max(bounds.top, Math.min(newY, bounds.bottom - elementSize.height))
      }

      setPosition({ x: newX, y: newY })
    },
    [isDragging, dragStart, bounds, parentSize, elementSize],
  )

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setDragStart(null)
  }, [])

  // Add and remove event listeners
  useIsomorphicLayoutEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (bounds === "window") {
        setParentSize({ width: window.innerWidth, height: window.innerHeight })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [bounds])

  return {
    isDragging,
    position,
    dragHandleProps: {
      onMouseDown: handleMouseDown,
      style: { cursor: isDragging ? "grabbing" : "grab" },
    },
    setPosition,
  }
}
