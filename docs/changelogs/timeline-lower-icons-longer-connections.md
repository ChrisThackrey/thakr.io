# Timeline Lower Icons and Longer Connection Lines

## Date: 2025-01-23

## Summary
Moved both Job and Project timeline icons lower within their cards and extended all connection lines for improved visual flow and spacing.

## Changes Made

### 1. Lowered Timeline Icons (`components/timeline.tsx`)
- Changed `DOT_TOP_OFFSET` from 2px to 12px
- Both work (Job) and project icons now appear 10px lower
- Creates more breathing room at the top of cards
- Better visual balance with card content

### 2. Extended Work Connection Lines
- **Work-to-connector**: Increased from 250px to 280px
- **Work-to-work**: Increased from 250px to 280px
- Creates stronger vertical connections
- Better visual continuity between work items

### 3. Extended Project Connection Lines
- **Project-to-project**: Increased from 140px to 160px
- **Project-to-connector**: Increased from 120px to 150px
- Improved flow between project items
- Better connection to transition nodes

### 4. Increased SVG Container Heights
- Work items: Increased from 400px to 450px
- Project items: Increased from 250px to 300px
- Ensures all extended lines are fully visible
- Prevents clipping of longer connections

## Visual Improvements
- More spacious timeline layout
- Icons appear more integrated with card content
- Longer lines create stronger visual connections
- Better overall timeline flow and readability

## Technical Details
- Simple constant and value adjustments
- All functionality preserved
- Animations and transitions unchanged
- No breaking changes to component behavior