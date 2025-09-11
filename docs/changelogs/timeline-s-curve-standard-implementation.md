# Timeline S-Curve Standard Implementation

## Date: 2025-01-23

## Summary
Implemented standard S-curve connections for inner timeline connectors using the same pattern as the working outer timeline curves, with proper SVG viewport positioning.

## Changes Made

### 1. SVG Viewport Configuration (`components/timeline.tsx`)
- SVG shifts left by -40px for inner timeline connectors
- Maintains 100px width for standard S-curves
- Keeps consistent height for long connections

```typescript
style={{
  left: isAfterProject ? "-40px" : "0px", // Shift left for inner timeline S-curves
  width: "100px", // Standard width for S-curves
  height: "1000px", // Much extended height for longer connector lines
  pointerEvents: "none",
}}
```

### 2. S-Curve Coordinate System
- **Outer timeline (working)**: `startX = 24, endX = 64` (40px right curve)
- **Inner timeline (fixed)**: `startX = 64, endX = 24` (40px left curve)
- Both use the same S-curve generator function

### 3. Implementation for Inner Timeline
```typescript
} else if (isAfterProject) {
  // Connector at inner level (after project) going to outer work item (left S-curve)
  // SVG is shifted -40px, so we compensate in our coordinates
  
  // Start at the connector icon position (accounting for SVG shift)
  const startX = 64 // 24 (icon) + 40 (SVG shift compensation)
  // End at the outer timeline position
  const endX = 24 // Outer timeline icon position
  const endY = calculateConnectorEndY()
  
  // Use standard S-curve generator
  return generateSCurvePath(startY, endY, startX, endX)
}
```

## Technical Details
- Uses the existing `generateSCurvePath` function with pipe-like bends
- 4px corner radius for smooth transitions
- Consistent 40px horizontal span for both directions
- SVG viewport shift allows proper rendering of left-going curves

## Result
- S-curves from inner timeline connectors match the size and shape of outer timeline curves
- Clean, consistent visual appearance across all timeline connections
- Proper left-bending curves from project level to work level