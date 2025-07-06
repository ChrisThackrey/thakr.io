# Changelog: Project Reorganization in Experience Data

## Date: 2025-01-06

## Summary
Reorganized projects in the experience data structure by moving the Rivendell project from Black Flag Design to Silver Bow Technology Group (Principal Software Architect role) and added the new Collegiate Pathways Application project under the Principal Software Architect role.

## Changes Made

### 1. Moved Rivendell Project
- **File**: `lib/experience-data.ts`
- **Change**: Relocated "Rivendell - AI Development and Research Tool" from Black Flag Design projects array to Silver Bow Technology Group projects array
- **Details**: Project now appears under the Principal Software Architect role as requested

### 2. Added Collegiate Pathways Application
- **File**: `lib/experience-data.ts`
- **Details**: Added new project under Principal Software Architect with:
  - Title: "Collegiate Pathways Application"
  - Full description with three detailed bullet points about AI-driven college planning
  - Technology stack: TypeScript, Astro, Svelte, OpenAI API, Anthropic SDK, Shadcn-UI

### 3. Updated Resume Content
- **File**: `components/resume-content.tsx`
- **Change**: Reordered Software Engineering Work section to display Collegiate Pathways Application first, followed by Rivendell
- **Details**: Maintains consistency with the updated experience data structure

## Technical Implementation

1. **Data Structure**:
   - Created new projects array under Silver Bow Technology Group entry
   - Maintained all existing project details and descriptions
   - Preserved all skill tags and project links

2. **Project Order**:
   - Collegiate Pathways Application appears first in the Principal Software Architect projects
   - Rivendell follows as the second project
   - Other Black Flag Design projects remain unchanged

3. **Timeline Integration**:
   - Projects will automatically display under their respective work experiences
   - Timeline component reads from the updated experience-data.ts structure
   - No changes required to Timeline component logic

## Impact

1. **Homepage**: Recent Work & Experience timeline now shows both projects under Principal Software Architect
2. **Work Page**: Work Experience & Projects timeline reflects the same reorganization
3. **Resume Page**: Software Engineering Work section updated to match new order
4. **Print Resume**: Projects appear in correct order under their respective roles

## Verification
- Experience data structure maintains TypeScript type safety
- All project details preserved during move
- New project includes all required fields per the Project interface
- Timeline components automatically reflect the changes through data binding