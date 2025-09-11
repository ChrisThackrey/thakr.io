# Timeline Connector Lines Color Update

## Date: 2025-01-23

## Summary
Changed all connection lines drawn from and after connector nodes to light grey, matching the color of project-to-project vertical lines for visual consistency.

## Changes Made

### 1. Updated Connector Line Colors (`components/timeline.tsx`)
Changed stroke color from `stroke-primary/50` to `stroke-slate-300 dark:stroke-slate-700` for:
- **Work-to-connector lines**: Vertical lines from work items to connector nodes
- **Connector-to-project lines**: Lines from connector nodes to first project (including S-curves)
- **Connector-to-work lines**: Lines from connector nodes to next work item (including S-curves)
- **Project-to-connector lines**: Vertical lines from last project to connector nodes

### 2. Visual Consistency
- All connector-related lines now use the same light grey as project-to-project connections
- Creates a more subtle visual hierarchy
- De-emphasizes transition lines while maintaining clarity
- Work-to-work direct connections retain primary color for main timeline flow

## Color Specifications
- Light mode: `stroke-slate-300` (light grey)
- Dark mode: `stroke-slate-700` (medium grey)
- Matches existing project line styling

## Visual Improvements
- More cohesive color scheme throughout timeline
- Connector transitions appear less prominent
- Better focus on main timeline content
- Improved visual hierarchy between primary and secondary connections

## Technical Details
- Simple color class updates
- No changes to line paths or animations
- Maintains all existing functionality
- No breaking changes to component behavior