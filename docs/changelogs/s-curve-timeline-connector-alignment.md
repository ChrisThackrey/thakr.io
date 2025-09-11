# S-Curve Timeline Connector Alignment Update

## Date: 2025-01-23

## Summary
Updated the timeline connector node positioning to align inline with preceding timeline items at their icon centers, with horizontal positioning based on their timeline level (outer for work items, inner for projects).

## Changes Made

### 1. Dynamic Connector Node Positioning (`components/timeline.tsx`)
- Added logic to determine if connector follows work item or project
- Calculated vertical offset to align with preceding icon's center:
  - After work items: `DOT_TOP_OFFSET + WORK_ICON_HEIGHT / 2 - 8`
  - After projects: `DOT_TOP_OFFSET + PROJECT_ICON_HEIGHT / 2 - 8`
- Applied dynamic marginTop instead of fixed negative margin

### 2. Horizontal Level Positioning
- Connectors after work items use outer level positioning (no left margin)
- Connectors after projects use inner level positioning (with ml-6/ml-10)
- Classes dynamically set based on preceding item type

### 3. Updated Line Calculations
- Adjusted work-to-connector line calculations for new positioning
- Updated connector-to-project and connector-to-work path calculations
- Simplified distance calculations based on inline positioning

### 4. Visual Improvements
- Connector nodes now appear at the same vertical level as their preceding icon
- Maintains visual hierarchy with proper timeline level alignment
- Creates cleaner connection flow through the timeline
- Preserves all animations and transitions

## Technical Details
- Used conditional logic to determine connector positioning context
- Maintained responsive design with proper margin calculations
- No breaking changes to component functionality
- All existing features and interactions preserved