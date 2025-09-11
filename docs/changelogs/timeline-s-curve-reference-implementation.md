# Timeline S-Curve Reference Implementation

## Date: 2025-01-23

## Summary
Implemented S-curves for inner timeline connectors to match the reference image pattern, using clean coordinate calculations with proper SVG viewport positioning.

## Changes Made

### 1. SVG Viewport Configuration (`components/timeline.tsx`)
- SVG shifts left by -50px for inner timeline connectors
- Uses 150px width (matching main timeline SVGs)
- Overflow visible to ensure full curve rendering

```typescript
style={{
  left: isAfterProject ? "-50px" : "0px", // Shift left for inner timeline to show full curve
  width: "150px", // Match main timeline SVG width
  height: "1000px", // Much extended height for longer connector lines
  pointerEvents: "none",
  overflow: "visible", // Allow drawing outside bounds
}}
```

### 2. S-Curve Coordinate Calculation
- Accounts for -50px SVG shift in coordinate system
- Creates 40px horizontal span matching the timeline indentation
- Uses standard S-curve generator for consistency

```typescript
} else if (isAfterProject) {
  // Connector at inner level (after project) going to outer work item (left S-curve)
  // SVG is shifted -50px, so adjust coordinates accordingly
  
  // With -50px shift, the connector icon appears at 74px in SVG coordinates
  const startX = 74 // 24 + 50 (shift compensation)
  // The outer timeline icon would be at 24px in page coordinates
  // In our shifted SVG, that's 74px - 40px (margin) = 34px
  const endX = 34 // Outer timeline position in shifted coordinates
  const endY = calculateConnectorEndY()
  
  // Use standard S-curve generator for clean curves
  return generateSCurvePath(startY, endY, startX, endX)
}
```

## Technical Details
- Uses existing `generateSCurvePath` function with pipe-like bends
- Creates down → left → down curve pattern as shown in reference
- 4px corner radius for smooth transitions
- 40px horizontal span matches the reference image pattern

## Result
- S-curves from inner timeline connectors match reference image
- Clean, consistent appearance across all timeline connections
- Proper left-bending curves with correct proportions