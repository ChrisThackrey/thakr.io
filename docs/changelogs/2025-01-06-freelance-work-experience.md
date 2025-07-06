# Changelog: Added Freelance Work Experience and Enhanced Timeline Display

## Date: 2025-01-06

## Summary
Added a new Freelance/Contract Software Engineering work experience between Principal Software Architect and Software Engineer roles, moved the Collegiate Pathways Application project to this new role, and implemented conditional expansion behavior for timeline items on different pages.

## Changes Made

### 1. Added Freelance Work Experience
- **File**: `lib/experience-data.ts`
- **Details**: 
  - Title: "Freelance / Contract Software Engineering"
  - Company: "Self-Employed / Various Clients"
  - Location: "Various Engagements"
  - Date: "2024-2025"
  - Description: "Provided full-stack development services for various clients, focusing on AI integration, web application development, and data solutions."
  - Skills: Full-Stack Development, AI Integration, Project Management, Client Communication

### 2. Moved Collegiate Pathways Application
- **File**: `lib/experience-data.ts`
- **Change**: Relocated Collegiate Pathways Application from Silver Bow Technology Group to the new Freelance work experience
- **Details**: Project now appears under the Freelance role while Rivendell remains with Principal Software Architect

### 3. Enhanced Timeline Component
- **File**: `components/timeline.tsx`
- **Changes**:
  - Added `defaultExpandedOverrides` prop to control default expansion state per item
  - Added location field display below company name for work experiences
  - Location appears as smaller, muted text when present

### 4. Configured Page-Specific Behavior
- **File**: `app/page.tsx`
- **Change**: Homepage Timeline now passes `defaultExpandedOverrides={{ 1: false }}` to collapse the Freelance item by default
- **Details**: Since the homepage shows only the first 3 items, index 1 corresponds to the Freelance role

### 5. Updated Resume Content
- **File**: `components/resume-content.tsx`
- **Changes**:
  - Added Freelance work experience to Professional Experience section
  - Included "Various Engagements" as a subheading
  - Reordered Software Engineering Work section to show Rivendell first, then Collegiate Pathways

## Technical Implementation

1. **Timeline Expansion Logic**:
   \`\`\`typescript
   defaultExpandedOverrides?: Record<number, boolean>
   \`\`\`
   - Allows specific items to override default expansion behavior
   - Homepage: Freelance item (index 1) defaults to collapsed
   - Work page: All items default to expanded (no override needed)

2. **Location Display**:
   - Added conditional rendering for location field
   - Displays as small, muted text below company name
   - Only shows when location field is present

3. **Data Structure**:
   - Maintained all TypeScript interfaces
   - Projects array properly migrated to new work experience
   - All skill tags and descriptions preserved

## User Experience

1. **Homepage**: 
   - Shows top 3 work experiences
   - Freelance role appears collapsed by default ("Show Projects" button visible)
   - Other roles with projects appear expanded

2. **Work Page**:
   - All work experiences appear expanded by default
   - Full project details visible immediately

3. **Resume Page**:
   - Reflects new work order and project assignments
   - Print layout includes all roles in correct sequence

## Impact
- Timeline sections now display location information for enhanced clarity
- Freelance work is properly categorized with its associated project
- Different default states on different pages provide optimal user experience
- Resume maintains professional appearance with all recent updates
