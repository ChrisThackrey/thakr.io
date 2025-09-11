# S-Curve Timeline Connections Enhancement

## Date: 2025-01-23

## Summary
Enhanced the Work Experience Timeline component to display S-shaped connections with right-angle bends between job timeline cards and their child project cards. Added connector nodes to improve visual hierarchy and connection clarity.

## Changes Made

### 1. Updated Path Generation (`components/timeline.tsx`)
- Modified `generateSCurvePath` function to create right-angle bends instead of smooth bezier curves
- Simplified path generation to use straight lines with 90-degree turns
- Added configurable bend offset parameter for consistent corner positioning

### 2. Added Connector Nodes
- Introduced new `connector` type in `DisplayListItem` interface
- Added empty circle connector nodes between work items and their projects
- Connector nodes only appear when projects are expanded/visible
- Styled with smaller size (h-4 w-4) and neutral border color

### 3. Updated Connection Types
- Changed from direct work-to-project connections to:
  - `work-to-connector`: Straight vertical line from work item to connector node
  - `connector-to-project`: Right-angle S-curve from connector to first project
  - `project-to-project`: Dashed straight lines between projects (unchanged)
  - `work-to-work`: Straight lines when projects are collapsed

### 4. Conditional Rendering
- S-curves only appear when projects are expanded
- Connector nodes are only added to the display list when projects are visible
- Maintains clean timeline when all projects are collapsed

### 5. Visual Improvements
- Right-angle bends create cleaner, more structured appearance
- Connector nodes provide visual anchor points for the hierarchy
- Consistent spacing and alignment between timeline levels
- Animations preserved with path length transitions

## Technical Details
- Uses SVG paths instead of div elements for precise curve control
- Maintains responsive design with proper positioning calculations
- Preserves all existing animations and interactions
- No breaking changes to component API or props