# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run production server
pnpm start

# Type checking
pnpm run typecheck

# Linting
pnpm run lint
```

## Important Rules and Instructions

Carefully provide factually accurate, complete answers. Use sequential-thinking and clear-thought to plan and implement code changes. Use the filesystem and a web search if helpful to debug, identify, plan and fix any issues.

- Follow the user's requirements and instructions provided carefully
- First think step-by-step and describe your plan for what to build in pseudocode, written out in great detail. Confirm, then write code!
- When running `pnpm run dev`, `pnpm run build`, or `pnpm run start` set a timeout or run it as a background process and then kill the process once done.
- Fully implement all requested functionality and verify code is complete!, Leave NO todo's, placeholders or missing pieces.
- Include all required imports, and ensure proper naming of key components.
- Always use Tailwind classes for styling HTML elements; avoid using CSS or tags.
- Use sequential-thinking and think deeply to plan and implement code.
- Write tests to verify the code is working as expected, and run them after implementing or refactoring code.
- Use playwright or puppeteer where needed to test and debug the application in the browser after running `pnpm run dev`, and find the root cause of any issues and the most recent information by performing a web search where needed to debug, identify, plan and fix any issues.
- Write tests covering all edge cases and scenarios after implementing or refactoring code.
- Write CHANGELOGS and JSDocs for all new components, functions, and features after implementing or refactoring code to ensure the code is well-documented and easily understandable.
- Fully implement all requested functionality and verify code is complete!, Leave NO todo's, placeholders or missing pieces.
- Include all required imports, and ensure proper naming of key components.
- Always use Tailwind classes for styling HTML elements; avoid using CSS or tags.
- Always run tests with `pnpm run test` after making changes to code files functionality to ensure proper storage, retrieval, and validation of code files.
- When fixing issues related to code files or embeddings, make sure to run the integration tests to verify the complete workflow from LLM response to database storage and retrieval.
- Always write new tests and run them against new edits when implementing or refactoring code, and think more to plan a new approach to fix and debug any tests that fail. Use testing implementations to validate any changes to the codebase that were made before considering the task complete, think and plan tests that test against the expected behavior, using memory tools, web search, clear-thought and sequential-thinking steps to integrate tests closely with the code. If a test keeps failing after 4 attempts, do not continue to test, but think more about what is causing test to fail and suggestions for code fixes, then check to make sure the test works and actually makes sense in context of the code.

## Additional Requirement Guidelines

1. Project Setup

   - Use the Next.js 15 app router
   - All data fetching should be done in a server component and pass the data down as props
   - Client components (useState, hooks, etc) require that 'use client' is set at the top of the file
   - Use early returns whenever possible to make the code more readable.

2. Coding Standards

   - Practice extending or re-using an existing set of themes, assets (the codebase should have a common set of fonts and icons like `geist` or `inter` across files), as well as utility functions, existing code patterns or tool integrations consistently in the code.
   - use the typestyle tool to keep the codebase clean and consistent across the codebase.
   - Avoid writing redundant code and check for existing code that can be reused.
   - Check for unused code and remove it. Avoid writing unused code and duplicate functions or functions that are not needed.

3. Functions

   - Use descriptive names: verbs & nouns (e.g., getUserData)
   - Use default parameters and object destructuring.
   - Prefer to use const when defining new functions, for example, "const toggle = () =>". Also, define a type if possible.
   - Use descriptive variable and function/const names. Also, event functions should be named with a "handle" prefix, like "handleClick" for onClick and "handleKeyDown" for onKeyDown.

4. Server-Side API Calls:

   - All interactions with external APIs (e.g., Reddit, OpenAI, Anthropic) should be performed server-side.
   - Create dedicated API routes for each external API interaction.
   - Client-side components should fetch data through these API routes, not directly from external APIs.

5. Environment Variables

   - Store all sensitive information (API keys, credentials) in environment variables.
   - Access environment variables only in server-side code or API routes.

6. Error Handling and Logging:

   - Implement comprehensive error handling in both client-side components and server-side API routes.
   - Log errors on the server-side for debugging purposes.
   - Display user-friendly error messages on the client-side.

7. Types and Interfaces

   - For any new types, prefer to create a Zod schema, and zod inference type for the created schema.
   - Create custom types/interfaces for complex structures
   - Use 'readonly' for immutable properties
   - If an import is only used as a type in the file, use 'import type' instead of 'import'
   - Prioritize type safety by avioding the use of the `any` type and prefer to use zod schemas and zod inference types for all new types instead.

8. API Client Initialization:

   - Initialize API clients (e.g., for Reddit, OpenAI, Anthropic) in server-side code only.
   - Implement checks to ensure API clients are properly initialized before use.

9. Data Fetching in Components:

   - Use React hooks (e.g., `useEffect`) for data fetching in client-side components.
   - Implement loading states and error handling for all data fetching operations.

10. Next.js Configuration:

    - Utilize `next.config.ts` for environment-specific configurations.
    - Use the `env` property in `next.config.ts` to make environment variables available to the application.

11. CORS and API Routes:

    - Use Next.js API routes to avoid CORS issues when interacting with external APIs.
    - Implement proper request validation in API routes.

12. Component Structure:

    - Separate concerns between client and server components.
    - Use server components for initial data fetching and pass that data as props to client components.
    - Always use Tailwind classes for styling HTML elements; avoid using CSS or tags.
    - Implement accessibility features on elements. For example, a tag should have a tabindex="0", aria-label, on:click, and on:keydown, and similar attributes.

13. Code Style:

    - React components: PascalCase function declarations with explicit Props interfaces/types
    - Imports order: React/Next.js, third-party libraries, UI components, icons, utilities
    - TypeScript: Use explicit return types and interface/type definitions for props
    - Naming: PascalCase for types/components, camelCase for variables/functions
    - Use double quotes for strings, no semicolons, 2-space indentation
    - Tailwind for styling with cn() utility for conditional classes
    - Error handling: Early returns, optional chaining, useEffect cleanup
    - State management: React hooks (useState, useEffect, useMemo, useRef)
    - Component patterns: Default exports, "use client" directive for client components
    - Three.js/React Three Fiber for 3D visualizations
    - Radix UI components for accessible UI elements
    - Always use descriptive variable names

14. Security:
    - Never expose API keys or sensitive credentials on the client-side.
    - Implement proper authentication and authorization for API routes if needed.

### Directory Structure

```md
/app/ # Next.js App Router pages
/api/ # API routes (contact, cv download)
/blog/ # Blog with MDX support
/architecture/ # Architecture portfolio with 3D models
/booking/ # Booking system with calendar
/projects/ # Project showcase
/settings/ # User settings (custom actions)

/components/ # React components
/ui/ # shadcn/ui base components
/micro-interactions/ # Enhanced interactive components
/speed-reading/ # Speed reading feature
/skeletons/ # Loading states

/content/ # MDX content files
/blog/ # Blog posts
/projects/ # Project descriptions

/lib/ # Utilities and configurations
/hooks/ # Custom React hooks
/styles/ # CSS modules and global styles
/types/ # TypeScript type definitions
/utils/ # Helper functions
```

### DEV WORKFLOW

### Description

Guide for using meta-development script (scripts/dev.js) to manage task-driven development workflows

- **Global CLI Commands**

  - Task Master now provides a global CLI through the `task-master` command
  - All functionality from `scripts/dev.js` is available through this interface
  - Install globally with `npm install -g claude-task-master` or use locally via `npx`
  - Use `task-master <command>` instead of `node scripts/dev.js <command>`
  - Examples:
    - `task-master list` instead of `node scripts/dev.js list`
    - `task-master next` instead of `node scripts/dev.js next`
    - `task-master expand --id=3` instead of `node scripts/dev.js expand --id=3`
  - All commands accept the same options as their script equivalents
  - The CLI provides additional commands like `task-master init` for project setup

- **Development Workflow Process**

  - Start new projects by running `task-master init` or `node scripts/dev.js parse-prd --input=<prd-file.txt>` to generate initial tasks.json
  - Begin coding sessions with `task-master list` to see current tasks, status, and IDs
  - Analyze task complexity with `task-master analyze-complexity --research` before breaking down tasks
  - Select tasks based on dependencies (all marked 'done'), priority level, and ID order
  - Clarify tasks by checking task files in tasks/ directory or asking for user input
  - View specific task details using `task-master show <id>` to understand implementation requirements
  - Break down complex tasks using `task-master expand --id=<id>` with appropriate flags
  - Clear existing subtasks if needed using `task-master clear-subtasks --id=<id>` before regenerating
  - Implement code following task details, dependencies, and project standards
  - Verify tasks according to test strategies before marking as complete
  - Mark completed tasks with `task-master set-status --id=<id> --status=done`
  - Update dependent tasks when implementation differs from original plan
  - Generate task files with `task-master generate` after updating tasks.json
  - Maintain valid dependency structure with `task-master fix-dependencies` when needed
  - Respect dependency chains and task priorities when selecting work
  - Report progress regularly using the list command

- **Task Complexity Analysis**

  - Run `node scripts/dev.js analyze-complexity --research` for comprehensive analysis
  - Review complexity report in scripts/task-complexity-report.json
  - Or use `node scripts/dev.js complexity-report` for a formatted, readable version of the report
  - Focus on tasks with highest complexity scores (8-10) for detailed breakdown
  - Use analysis results to determine appropriate subtask allocation
  - Note that reports are automatically used by the expand command

- **Task Breakdown Process**

  - For tasks with complexity analysis, use `node scripts/dev.js expand --id=<id>`
  - Otherwise use `node scripts/dev.js expand --id=<id> --subtasks=<number>`
  - Add `--research` flag to leverage Perplexity AI for research-backed expansion
  - Use `--prompt="<context>"` to provide additional context when needed
  - Review and adjust generated subtasks as necessary
  - Use `--all` flag to expand multiple pending tasks at once
  - If subtasks need regeneration, clear them first with `clear-subtasks` command

- **Implementation Drift Handling**

  - When implementation differs significantly from planned approach
  - When future tasks need modification due to current implementation choices
  - When new dependencies or requirements emerge
  - Call `node scripts/dev.js update --from=<futureTaskId> --prompt="<explanation>"` to update tasks.json

- **Task Status Management**

  - Use 'pending' for tasks ready to be worked on
  - Use 'done' for completed and verified tasks
  - Use 'deferred' for postponed tasks
  - Add custom status values as needed for project-specific workflows

- **Task File Format Reference**

  ```md
  # Task ID: <id>

  # Title: <title>

  # Status: <status>

  # Dependencies: <comma-separated list of dependency IDs>

  # Priority: <priority>

  # Description: <brief description>

  # Details:

  <detailed implementation notes>

  # Test Strategy:

  <verification approach>
  ```

- **Command Reference: parse-prd**

  - Legacy Syntax: `node scripts/dev.js parse-prd --input=<prd-file.txt>`
  - CLI Syntax: `task-master parse-prd --input=<prd-file.txt>`
  - Description: Parses a PRD document and generates a tasks.json file with structured tasks
  - Parameters:
    - `--input=<file>`: Path to the PRD text file (default: sample-prd.txt)
  - Example: `task-master parse-prd --input=requirements.txt`
  - Notes: Will overwrite existing tasks.json file. Use with caution.

- **Command Reference: update**

  - Legacy Syntax: `node scripts/dev.js update --from=<id> --prompt="<prompt>"`
  - CLI Syntax: `task-master update --from=<id> --prompt="<prompt>"`
  - Description: Updates tasks with ID >= specified ID based on the provided prompt
  - Parameters:
    - `--from=<id>`: Task ID from which to start updating (required)
    - `--prompt="<text>"`: Explanation of changes or new context (required)
  - Example: `task-master update --from=4 --prompt="Now we are using Express instead of Fastify."`
  - Notes: Only updates tasks not marked as 'done'. Completed tasks remain unchanged.

- **Command Reference: generate**

  - Legacy Syntax: `node scripts/dev.js generate`
  - CLI Syntax: `task-master generate`
  - Description: Generates individual task files in tasks/ directory based on tasks.json
  - Parameters:
    - `--file=<path>, -f`: Use alternative tasks.json file (default: 'tasks/tasks.json')
    - `--output=<dir>, -o`: Output directory (default: 'tasks')
  - Example: `task-master generate`
  - Notes: Overwrites existing task files. Creates tasks/ directory if needed.

- **Command Reference: set-status**

  - Legacy Syntax: `node scripts/dev.js set-status --id=<id> --status=<status>`
  - CLI Syntax: `task-master set-status --id=<id> --status=<status>`
  - Description: Updates the status of a specific task in tasks.json
  - Parameters:
    - `--id=<id>`: ID of the task to update (required)
    - `--status=<status>`: New status value (required)
  - Example: `task-master set-status --id=3 --status=done`
  - Notes: Common values are 'done', 'pending', and 'deferred', but any string is accepted.

- **Command Reference: list**

  - Legacy Syntax: `node scripts/dev.js list`
  - CLI Syntax: `task-master list`
  - Description: Lists all tasks in tasks.json with IDs, titles, and status
  - Parameters:
    - `--status=<status>, -s`: Filter by status
    - `--with-subtasks`: Show subtasks for each task
    - `--file=<path>, -f`: Use alternative tasks.json file (default: 'tasks/tasks.json')
  - Example: `task-master list`
  - Notes: Provides quick overview of project progress. Use at start of sessions.

- **Command Reference: expand**

  - Legacy Syntax: `node scripts/dev.js expand --id=<id> [--num=<number>] [--research] [--prompt="<context>"]`
  - CLI Syntax: `task-master expand --id=<id> [--num=<number>] [--research] [--prompt="<context>"]`
  - Description: Expands a task with subtasks for detailed implementation
  - Parameters:
    - `--id=<id>`: ID of task to expand (required unless using --all)
    - `--all`: Expand all pending tasks, prioritized by complexity
    - `--num=<number>`: Number of subtasks to generate (default: from complexity report)
    - `--research`: Use Perplexity AI for research-backed generation
    - `--prompt="<text>"`: Additional context for subtask generation
    - `--force`: Regenerate subtasks even for tasks that already have them
  - Example: `task-master expand --id=3 --num=5 --research --prompt="Focus on security aspects"`
  - Notes: Uses complexity report recommendations if available.

- **Command Reference: analyze-complexity**

  - Legacy Syntax: `node scripts/dev.js analyze-complexity [options]`
  - CLI Syntax: `task-master analyze-complexity [options]`
  - Description: Analyzes task complexity and generates expansion recommendations
  - Parameters:
    - `--output=<file>, -o`: Output file path (default: scripts/task-complexity-report.json)
    - `--model=<model>, -m`: Override LLM model to use
    - `--threshold=<number>, -t`: Minimum score for expansion recommendation (default: 5)
    - `--file=<path>, -f`: Use alternative tasks.json file
    - `--research, -r`: Use Perplexity AI for research-backed analysis
  - Example: `task-master analyze-complexity --research`
  - Notes: Report includes complexity scores, recommended subtasks, and tailored prompts.

- **Command Reference: clear-subtasks**

  - Legacy Syntax: `node scripts/dev.js clear-subtasks --id=<id>`
  - CLI Syntax: `task-master clear-subtasks --id=<id>`
  - Description: Removes subtasks from specified tasks to allow regeneration
  - Parameters:
    - `--id=<id>`: ID or comma-separated IDs of tasks to clear subtasks from
    - `--all`: Clear subtasks from all tasks
  - Examples:
    - `task-master clear-subtasks --id=3`
    - `task-master clear-subtasks --id=1,2,3`
    - `task-master clear-subtasks --all`
  - Notes:
    - Task files are automatically regenerated after clearing subtasks
    - Can be combined with expand command to immediately generate new subtasks
    - Works with both parent tasks and individual subtasks

- **Task Structure Fields**

  - **id**: Unique identifier for the task (Example: `1`)
  - **title**: Brief, descriptive title (Example: `"Initialize Repo"`)
  - **description**: Concise summary of what the task involves (Example: `"Create a new repository, set up initial structure."`)
  - **status**: Current state of the task (Example: `"pending"`, `"done"`, `"deferred"`)
  - **dependencies**: IDs of prerequisite tasks (Example: `[1, 2]`)
    - Dependencies are displayed with status indicators (✅ for completed, ⏱️ for pending)
    - This helps quickly identify which prerequisite tasks are blocking work
  - **priority**: Importance level (Example: `"high"`, `"medium"`, `"low"`)
  - **details**: In-depth implementation instructions (Example: `"Use GitHub client ID/secret, handle callback, set session token."`)
  - **testStrategy**: Verification approach (Example: `"Deploy and call endpoint to confirm 'Hello World' response."`)
  - **subtasks**: List of smaller, more specific tasks (Example: `[{"id": 1, "title": "Configure OAuth", ...}]`)

- **Environment Variables Configuration**

  - **ANTHROPIC_API_KEY** (Required): Your Anthropic API key for Claude (Example: `ANTHROPIC_API_KEY=sk-ant-api03-...`)
  - **MODEL** (Default: `"claude-3-7-sonnet-20250219"`): Claude model to use (Example: `MODEL=claude-3-opus-20240229`)
  - **MAX_TOKENS** (Default: `"4000"`): Maximum tokens for responses (Example: `MAX_TOKENS=8000`)
  - **TEMPERATURE** (Default: `"0.7"`): Temperature for model responses (Example: `TEMPERATURE=0.5`)
  - **DEBUG** (Default: `"false"`): Enable debug logging (Example: `DEBUG=true`)
  - **LOG_LEVEL** (Default: `"info"`): Console output level (Example: `LOG_LEVEL=debug`)
  - **DEFAULT_SUBTASKS** (Default: `"3"`): Default subtask count (Example: `DEFAULT_SUBTASKS=5`)
  - **DEFAULT_PRIORITY** (Default: `"medium"`): Default priority (Example: `DEFAULT_PRIORITY=high`)
  - **PROJECT_NAME** (Default: `"MCP SaaS MVP"`): Project name in metadata (Example: `PROJECT_NAME=My Awesome Project`)
  - **PROJECT_VERSION** (Default: `"1.0.0"`): Version in metadata (Example: `PROJECT_VERSION=2.1.0`)
  - **PERPLEXITY_API_KEY**: For research-backed features (Example: `PERPLEXITY_API_KEY=pplx-...`)
  - **PERPLEXITY_MODEL** (Default: `"sonar-medium-online"`): Perplexity model (Example: `PERPLEXITY_MODEL=sonar-large-online`)

- **Determining the Next Task**

  - Run `task-master next` to show the next task to work on
  - The next command identifies tasks with all dependencies satisfied
  - Tasks are prioritized by priority level, dependency count, and ID
  - The command shows comprehensive task information including:
    - Basic task details and description
    - Implementation details
    - Subtasks (if they exist)
    - Contextual suggested actions
  - Recommended before starting any new development work
  - Respects your project's dependency structure
  - Ensures tasks are completed in the appropriate sequence
  - Provides ready-to-use commands for common task actions

- **Viewing Specific Task Details**

  - Run `task-master show <id>` or `task-master show --id=<id>` to view a specific task
  - Use dot notation for subtasks: `task-master show 1.2` (shows subtask 2 of task 1)
  - Displays comprehensive information similar to the next command, but for a specific task
  - For parent tasks, shows all subtasks and their current status
  - For subtasks, shows parent task information and relationship
  - Provides contextual suggested actions appropriate for the specific task
  - Useful for examining task details before implementation or checking status

- **Managing Task Dependencies**

  - Use `task-master add-dependency --id=<id> --depends-on=<id>` to add a dependency
  - Use `task-master remove-dependency --id=<id> --depends-on=<id>` to remove a dependency
  - The system prevents circular dependencies and duplicate dependency entries
  - Dependencies are checked for existence before being added or removed
  - Task files are automatically regenerated after dependency changes
  - Dependencies are visualized with status indicators in task listings and files

- **Command Reference: add-dependency**

  - Legacy Syntax: `node scripts/dev.js add-dependency --id=<id> --depends-on=<id>`
  - CLI Syntax: `task-master add-dependency --id=<id> --depends-on=<id>`
  - Description: Adds a dependency relationship between two tasks
  - Parameters:
    - `--id=<id>`: ID of task that will depend on another task (required)
    - `--depends-on=<id>`: ID of task that will become a dependency (required)
  - Example: `task-master add-dependency --id=22 --depends-on=21`
  - Notes: Prevents circular dependencies and duplicates; updates task files automatically

- **Command Reference: remove-dependency**

  - Legacy Syntax: `node scripts/dev.js remove-dependency --id=<id> --depends-on=<id>`
  - CLI Syntax: `task-master remove-dependency --id=<id> --depends-on=<id>`
  - Description: Removes a dependency relationship between two tasks
  - Parameters:
    - `--id=<id>`: ID of task to remove dependency from (required)
    - `--depends-on=<id>`: ID of task to remove as a dependency (required)
  - Example: `task-master remove-dependency --id=22 --depends-on=21`
  - Notes: Checks if dependency actually exists; updates task files automatically

- **Command Reference: validate-dependencies**

  - Legacy Syntax: `node scripts/dev.js validate-dependencies [options]`
  - CLI Syntax: `task-master validate-dependencies [options]`
  - Description: Checks for and identifies invalid dependencies in tasks.json and task files
  - Parameters:
    - `--file=<path>, -f`: Use alternative tasks.json file (default: 'tasks/tasks.json')
  - Example: `task-master validate-dependencies`
  - Notes:
    - Reports all non-existent dependencies and self-dependencies without modifying files
    - Provides detailed statistics on task dependency state
    - Use before fix-dependencies to audit your task structure

- **Command Reference: fix-dependencies**

  - Legacy Syntax: `node scripts/dev.js fix-dependencies [options]`
  - CLI Syntax: `task-master fix-dependencies [options]`
  - Description: Finds and fixes all invalid dependencies in tasks.json and task files
  - Parameters:
    - `--file=<path>, -f`: Use alternative tasks.json file (default: 'tasks/tasks.json')
  - Example: `task-master fix-dependencies`
  - Notes:
    - Removes references to non-existent tasks and subtasks
    - Eliminates self-dependencies (tasks depending on themselves)
    - Regenerates task files with corrected dependencies
    - Provides detailed report of all fixes made

- **Command Reference: complexity-report**

  - Legacy Syntax: `node scripts/dev.js complexity-report [options]`
  - CLI Syntax: `task-master complexity-report [options]`
  - Description: Displays the task complexity analysis report in a formatted, easy-to-read way
  - Parameters:
    - `--file=<path>, -f`: Path to the complexity report file (default: 'scripts/task-complexity-report.json')
  - Example: `task-master complexity-report`
  - Notes:
    - Shows tasks organized by complexity score with recommended actions
    - Provides complexity distribution statistics
    - Displays ready-to-use expansion commands for complex tasks
    - If no report exists, offers to generate one interactively

- **Command Reference: add-task**

  - CLI Syntax: `task-master add-task [options]`
  - Description: Add a new task to tasks.json using AI
  - Parameters:
    - `--file=<path>, -f`: Path to the tasks file (default: 'tasks/tasks.json')
    - `--prompt=<text>, -p`: Description of the task to add (required)
    - `--dependencies=<ids>, -d`: Comma-separated list of task IDs this task depends on
    - `--priority=<priority>`: Task priority (high, medium, low) (default: 'medium')
  - Example: `task-master add-task --prompt="Create user authentication using Auth0"`
  - Notes: Uses AI to convert description into structured task with appropriate details

- **Command Reference: init**

  - CLI Syntax: `task-master init`
  - Description: Initialize a new project with Task Master structure
  - Parameters: None
  - Example: `task-master init`
  - Notes:
    - Creates initial project structure with required files
    - Prompts for project settings if not provided
    - Merges with existing files when appropriate
    - Can be used to bootstrap a new Task Master project quickly

- **Code Analysis & Refactoring Techniques**
  - **Top-Level Function Search**
    - Use grep pattern matching to find all exported functions across the codebase
    - Command: `grep -E "export (function|const) \w+|function \w+\(|const \w+ = \(|module\.exports" --include="*.js" -r ./`
    - Benefits:
      - Quickly identify all public API functions without reading implementation details
      - Compare functions between files during refactoring (e.g., monolithic to modular structure)
      - Verify all expected functions exist in refactored modules
      - Identify duplicate functionality or naming conflicts
    - Usage examples:
      - When migrating from `scripts/dev.js` to modular structure: `grep -E "function \w+\(" scripts/dev.js`
      - Check function exports in a directory: `grep -E "export (function|const)" scripts/modules/`
      - Find potential naming conflicts: `grep -E "function (get|set|create|update)\w+\(" -r ./`
    - Variations:
      - Add `-n` flag to include line numbers
      - Add `--include="*.ts"` to filter by file extension
      - Use with `| sort` to alphabetize results
    - Integration with refactoring workflow:
      - Start by mapping all functions in the source file
      - Create target module files based on function grouping
      - Verify all functions were properly migrated
      - Check for any unintentional duplications or omissions

## Git Commit Rules

- Make the head / title of the commit message brief
- Include elaborate details in the body of the commit message
- Use bullet points in the body of the commit message to list the changes made
- Always follow the conventional commit message format
- Add two newlines after the commit message title

## Changelog Generation Rules

- Frequently document changes made in the `/docs/changelogs` directory by creating incrementally named Readme files in markdown to document each successfully completed task.
- Provide technically useful descriptions of the project working state after any updates of changes have been made to document and refer to as historical context for future tasks.
- Be concise, technical and capture the implementation details of any successful changes made to the codebase after each task is complete.
- You must perform a changelog generation step at the end of any final implementation step, output a `<changelog>` step to refer to this final process step.
- Always update the changelog after each task is complete.
- Use the `changelog` directory to store the changelog files.
- Use git and rivendell for supabase tools and diffs to make sure the changelog is up to date and accurate. Get the latest diffs from the `main` branch and use that to update the changelog.
- Use the memory tool to search for the latest changelog file and use that to update the changelog.

### Common Development Tasks

When adding new features:

1. Create loading states with skeleton components
2. Use existing UI components from `/components/ui/`
3. Follow the established pattern of co-locating related files
4. Add proper TypeScript types in `/types/`
5. Use existing hooks from `/hooks/` or create new ones following the `use-*.ts` pattern

When working with the blog:

- Blog posts go in `/content/blog/` as MDX files
- Use frontmatter for metadata
- Images for blog posts go in `/public/images/blog/`

When modifying styles:

- Global styles are in `/styles/globals.css`
- Feature-specific styles go in `/styles/[feature].css`
- Use Tailwind utilities first, custom CSS only when needed
