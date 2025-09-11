# Timeline Inner S-Curve Connection Fix

## Date: 2025-01-23

## Summary
Fixed the S-shaped connection lines drawn from connector nodes in the inner timeline (after Project items) to properly render with correct coordinates accounting for SVG positioning and timeline indentation.

## Issue
S-curves from inner timeline connectors were not rendering correctly due to incorrect coordinate calculations when the SVG was shifted left by -50px.

## Changes Made

### 1. Fixed S-Curve Coordinate Calculation (`components/timeline.tsx`)
- Updated the `connector-to-work` path generation for inner timeline connectors
- Properly accounted for:
  - SVG left shift of -50px for inner timeline
  - Inner timeline margin of 40px (md:ml-10)
  - Correct start and end positions for the S-curve

### 2. Coordinate Calculation Logic
```typescript
} else if (isAfterProject) {
  // Connector at inner level (after project) going to outer work item (left S-curve)
  // The inner connector has ml-6 (24px) or md:ml-10 (40px) margin
  // SVG is shifted left by -50px, so we need to position relative to that
  const innerMargin = 40 // Using the larger md:ml-10 value (40px)
  const startX = 50 + 24 // 50 (compensate for SVG shift) + 24 (icon position)
  const endX = 50 + 24 - innerMargin // Move left by the margin amount to reach outer timeline
  const endY = calculateConnectorEndY()
  // Create left-going S-curve from inner to outer timeline
  return generateSCurvePath(startY, endY, startX, endX)
}
```

## Technical Details
- The S-curve now properly draws from the inner timeline connector position to the outer timeline
- Start position (74px) accounts for SVG shift and icon position
- End position (34px) creates the proper left bend to reach the outer timeline
- Maintains the pipe-like S-curve shape with small rounded corners

## Visual Improvements
- S-curves from inner timeline connectors now render correctly
- Proper visual connection from project-level items back to work-level timeline
- Consistent with the right-bending S-curves from outer timeline
- Maintains visual flow and hierarchy