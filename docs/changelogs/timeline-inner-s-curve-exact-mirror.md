# Timeline Inner S-Curve Exact Mirror Implementation

## Date: 2025-01-23

## Summary
Successfully fixed S-shaped connections from inner timeline connectors by exactly mirroring the working outer timeline implementation with appropriate SVG positioning adjustments.

## Changes Made

### 1. SVG Positioning for Inner Timeline (`components/timeline.tsx`)
- Changed SVG left position for inner timeline connectors: `-40px`
- This matches the 40px indentation difference between timelines
- Allows the S-curve to be drawn in the correct coordinate space

### 2. Exact Mirror of Working S-Curve
- Outer timeline (working): `startX = 24, endX = 64` (right-going curve)
- Inner timeline (fixed): `startX = 64, endX = 24` (left-going curve)
- Uses exact same 40px horizontal span, just reversed

### 3. Implementation Details
```typescript
// SVG positioning
style={{
  left: isAfterProject ? "-40px" : "0px", // Shift left for inner timeline
  width: "300px",
  height: "1000px",
  pointerEvents: "none",
}}

// S-curve coordinates
} else if (isAfterProject) {
  // Connector at inner level (after project) going to outer work item (left S-curve)
  // SVG is shifted left by -40px for inner timeline
  // This mirrors the working outer timeline S-curve exactly
  
  const startX = 64 // 24 (icon) + 40 (to compensate for SVG shift)
  const endX = 24 // Target position on outer timeline
  const endY = calculateConnectorEndY()
  // Create left-going S-curve (exact mirror of working right S-curve)
  return generateSCurvePath(startY, endY, startX, endX)
}
```

## Technical Rationale
- The working outer S-curve draws from position 24 to 64
- For inner timeline, we need the reverse: 64 to 24
- SVG shift of -40px aligns the coordinate systems properly
- This creates an exact mirror of the proven working implementation

## Result
- Inner timeline S-curves now render as perfect mirrors of outer timeline curves
- Clean left-bending curves from project level back to work level
- Consistent visual appearance across all timeline connections