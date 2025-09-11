# Timeline S-Curve Direction and Positioning Fixes

## Date: 2025-01-23

## Summary
Fixed S-curve directions to properly show left-right transitions between inner and outer timeline levels, and adjusted connector node positioning to be moderately elevated rather than too high.

## Changes Made

### 1. Adjusted Connector Node Positioning (`components/timeline.tsx`)
- Reduced vertical offsets for more moderate positioning:
  - After work items: -30px (was -60px)
  - After projects: -20px (was -40px)
- Connector nodes now appear slightly above the next item rather than far above

### 2. Fixed S-Curve Directions
- **Work-to-connector**: Added logic to detect if connector leads to inner level
  - Creates right-going S-curve when transitioning to inner level projects
  - Uses `generateSCurvePath(startY, endY, startX, endX + 24)` for rightward curve
- **Connector-to-work**: Fixed left-going curves from inner to outer level
  - Uses `generateSCurvePath(startY, endY, startX, endX - 24)` for leftward curve
  - Maintains straight lines when both items are at same level

### 3. Updated All Offset Calculations
- Synchronized all connector offset values (30px for work, 20px for projects)
- Updated line length calculations to match new positioning
- Maintained consistent distances throughout the timeline

### 4. Visual Flow Improvements
- S-curves now properly show the transition between timeline levels:
  - Outer → Inner: Right-going S-curve
  - Inner → Outer: Left-going S-curve
- Creates clear visual hierarchy and flow direction
- Connector nodes serve as visual pivot points between levels

## Technical Details
- Added detection logic to determine connector level based on surrounding items
- Maintained pipe-like S-curves with small corner radius
- All animations and transitions preserved
- No breaking changes to component functionality