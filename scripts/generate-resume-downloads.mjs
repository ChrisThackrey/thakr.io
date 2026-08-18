/**
 * Generates the two downloadable resume files in /public from the live
 * /resume page and its content:
 *
 *   - Chris-Thackrey-Resume.pdf  — a screen-media snapshot of the resume
 *     preview card, so the PDF looks exactly like the on-page preview.
 *   - Chris-Thackrey-Resume.docx — a Word document mirroring the preview's
 *     structure, typography, and colors as closely as .docx allows.
 *
 * Usage: pnpm resume:assets   (dev server must be running on :3000,
 *        or pass RESUME_URL=https://... to point elsewhere)
 */

import { chromium } from "playwright-core"
import { writeFileSync } from "node:fs"
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Packer,
  Paragraph,
  TextRun,
} from "docx"

const RESUME_URL = process.env.RESUME_URL ?? "http://localhost:3000/resume"
const PDF_PATH = "public/Chris-Thackrey-Resume.pdf"
const DOCX_PATH = "public/Chris-Thackrey-Resume.docx"

/* ------------------------------ PDF ------------------------------ */

async function generatePdf() {
  const browser = await chromium.launch({ channel: "chrome" })
  try {
    const page = await browser.newPage({
      viewport: { width: 816, height: 1056 },
      colorScheme: "light",
    })
    await page.goto(RESUME_URL, { waitUntil: "networkidle" })
    // Render with SCREEN styles (not print styles) so the PDF matches the
    // on-page preview exactly, then strip the site chrome around the card.
    await page.emulateMedia({ media: "screen" })
    await page.addStyleTag({
      content: `
        header, footer, nav, .no-print, .page-background, nextjs-portal { display: none !important; }
        html, body { background: #ffffff !important; }
        main { padding: 0 !important; max-width: 100% !important; }
        .resume-container {
          box-shadow: none !important;
          border: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
          max-width: 100% !important;
        }
        * { animation: none !important; transition: none !important; }
      `,
    })
    await page.waitForTimeout(300)
    await page.pdf({
      path: PDF_PATH,
      format: "Letter",
      printBackground: true,
      margin: { top: "0.35in", bottom: "0.35in", left: "0.3in", right: "0.3in" },
    })
    console.log(`wrote ${PDF_PATH}`)
  } finally {
    await browser.close()
  }
}

/* ------------------------------ DOCX ------------------------------ */

// Palette / type scale mirroring the preview (px -> pt at 0.75, docx uses half-points)
const FONT = "Arial"
const PRIMARY = "171717" // --primary as computed on the live resume page (hsl(0 0% 9%))
const MUTED = "737373" // muted-foreground as computed on the live resume page
const SZ = { name: 45, subtitle: 30, h2: 36, h3: 27, body: 21, small: 18 } // half-points

const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: SZ.body, ...opts })

const link = (text, url) =>
  new ExternalHyperlink({
    link: url,
    children: [run(text, { color: PRIMARY })],
  })

const sectionHeading = (text) =>
  new Paragraph({
    spacing: { before: 280, after: 160 },
    border: {
      bottom: { color: PRIMARY, style: BorderStyle.SINGLE, size: 16, space: 4 },
    },
    children: [run(text, { bold: true, size: SZ.h2 })],
  })

const skillRow = (label, items) =>
  new Paragraph({
    spacing: { after: 80 },
    children: [run(`${label}: `, { bold: true }), run(items)],
  })

const projectHeading = (title, date, siteText, siteUrl) => {
  const children = [run(title, { bold: true, size: SZ.h3 })]
  if (siteText) {
    children.push(run(" - ", { bold: true, size: SZ.h3 }))
    children.push(
      new ExternalHyperlink({
        link: siteUrl,
        children: [run(siteText, { color: PRIMARY, size: SZ.h3 })],
      }),
    )
  }
  children.push(run(`  ${date}`, { color: MUTED, size: SZ.body }))
  return new Paragraph({ spacing: { before: 200, after: 60 }, children })
}

const mutedPara = (text) =>
  new Paragraph({ spacing: { after: 80 }, children: [run(text, { color: MUTED })] })

const bullet = (text) =>
  new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: [run(text)] })

const roleHeading = (text) =>
  new Paragraph({ spacing: { before: 160, after: 40 }, children: [run(text, { bold: true, size: SZ.h3 })] })

const educationLine = (school, rest) =>
  new Paragraph({ spacing: { after: 60 }, children: [run(school, { bold: true }), run(` ${rest}`)] })

async function generateDocx() {
  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: SZ.body } } } },
    sections: [
      {
        properties: {
          page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } }, // 0.5in
        },
        children: [
          // Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [run("Chris Thackrey", { bold: true, size: SZ.name })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [run("Senior Software Engineer", { bold: true, size: SZ.subtitle, color: MUTED })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 },
            children: [run("(707) 319-3306  |  c.r.thackrey@gmail.com  |  San Antonio, TX")],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              link("thakr.io", "http://thakr.io"),
              run("  |  "),
              link("github.com/ChrisThackrey", "http://github.com/ChrisThackrey"),
              run("  |  "),
              link("linkedin.com/in/chris-thackrey-015", "http://linkedin.com/in/chris-thackrey-015"),
            ],
          }),

          // Summary
          sectionHeading("Summary"),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              run(
                "Accomplished Full-Stack Software Engineer and CTO with a unique multidisciplinary background that bridges high-level design sensibilities with robust technical architecture. Expert in building scalable, AI-driven applications by leveraging deep systems thinking to translate complex business requirements into performant, elegant code. Proven leader with a track record of directing engineering teams through challenging implementations, applying innovative technical strategies to deliver reliable, user-centric solutions. Adept at navigating intricate infrastructure, from automated multi-tenant systems to sophisticated spatial data visualizations, with a relentless focus on quality, security, and strategic project execution.",
              ),
            ],
          }),

          // Technical Skills
          sectionHeading("Technical Skills"),
          skillRow(
            "Front End",
            "TypeScript, NextJS, Astro, Svelte, React Hooks + Context API, Redux, JavaScript, D3, Shadcn/ui, TailwindCSS, ChakraUI, v0, HeyGen, Google Maps Platform, React Native, Swift",
          ),
          skillRow(
            "Back End",
            "Vercel Serverless Functions, Edge Functions, GraphQL, MongoDB, MySQL, Prisma, Supabase, Firebase, Redis, Python, FastAPI, DynamoDB, Amazon RDS",
          ),
          skillRow(
            "Deploy",
            "Vercel Platform, Github Actions, Github Apps, Vercel CLI, Deploy Hooks, Vercel REST API, Docker, Heroku, DigitalOcean, Electron, AWS: EC2, AWS Lambda Functions, Google Cloud Functions, Amazon Bedrock, Amazon Sagemaker, Clerk Auth",
          ),
          skillRow(
            "DevOps",
            "Turbopack, Turborepo, Azure DevOps Integration, Observability Tools, Trigger.dev, Datadog, Artillery.io, TDD prompt engineering, Critical-CSS, React-Suspense, NGINX",
          ),

          // Software Engineering Work
          sectionHeading("Software Engineering Work"),
          projectHeading("Rivendell - AI Development and Research Tool", "March 2025"),
          mutedPara(
            'AI development tool that functions both internally for the company and externally for clients as "version control for reasoning".',
          ),
          bullet(
            "Implemented a monte-carlo algorithm to run large batches of prompt calls in parallel to various large-language AI models (llms), providing more deterministic outcomes by improving reliable code metrics such as compute and readability.",
          ),
          bullet(
            "Engineered LLM-as-judge evaluation pipeline scoring every solution across six quality axes and classifying outputs recommended, viable, or problematic.",
          ),
          bullet(
            "Generated project roadmaps automatically by ranking highest-scoring reasoning steps into five-phase Gantt timelines with milestone markers.",
          ),

          projectHeading("AI Applications for National Education Research Organization*", "January 2024"),
          mutedPara("AI teaching application featuring a multiplayer AI chat and advanced deep research enabled."),
          bullet(
            "Engineered a multiplayer AI chat system to route messages across multiple specialized bot variants over authenticated connections, ensuring real-time interactivity while maintaining participant anonymization.",
          ),
          bullet(
            "Created a multi-tenant architecture solution for project deployments by automating tenant provisioning across 27 idempotent stages with persisted state, ensuring safe, resumable infrastructure deployments of dedicated EC2, Supabase, and S3 resources per district.",
          ),
          bullet("Designed and implemented interactive interface templates to facilitate AI context and responses."),
          bullet(
            "Scored AI outputs across multiple LangSmith evaluators spanning correctness, groundedness, document relevance, schema validity, and processing time.",
          ),

          projectHeading(
            "AI Analysis Tools For International Wildfire Science and Technology Company*",
            "October 2024",
          ),
          mutedPara(
            "Cloud-based SaaS offering on-demand wildfire spread prediction capabilities to support operational response.",
          ),
          bullet(
            "Scaled Uber's H3 hex resolution across seven zoom tiers, over-generating twenty-five percent beyond the viewport to effectively erase edge-of-screen rendering gaps.",
          ),
          bullet("Utilized secured Azure backends to make safe API calls to private data from public sources."),
          bullet(
            "Created AI-driven assessment tools and forecast features to improve event response times for 20,000+ incidents per year.",
          ),

          projectHeading(
            "CRM Management App to Handle Insurance Clients and Leads",
            "January 2024",
            "lineagecrm.com",
            "https://lineagecrm.com",
          ),
          mutedPara(
            "Final expense CRM management app and tool for handling clients and leads, currently deployed with more than 200 active users.",
          ),
          bullet(
            "Powered lead search with a materialized view denormalizing four joined tables, enabling high-performance multi-dimensional filtering across status, source, and location.",
          ),
          bullet(
            "Handled Twilio call lifecycle events with matching teardown, driving mute, timers, and reconnection state in a draggable dialer.",
          ),
          bullet("Completed Extract, Transform, Load (ETL) process from legacy backend into new database connections."),

          new Paragraph({
            spacing: { before: 120, after: 120 },
            children: [run("*Subject to NDA. No further details are available.", { italics: true, size: SZ.small, color: MUTED })],
          }),

          // Professional Experience
          sectionHeading("Professional Experience"),
          roleHeading("Chief Technology Officer, CelaHealthcare Inc. — May 2025 - Present"),
          bullet("Senior Software Engineer and primary inventor of patented healthcare application technology."),
          bullet("Administrative leader for technical team including 3 developers, data engineer, and project manager."),

          roleHeading("Principal Software Architect, Silver Bow Technology Group — March 2025 - July 2025"),
          bullet(
            'Lead software engineering team and built the core AI functionality for a "version control for reasoning" dev tool providing AI-driven code-generation, prompt enhancement, architecture strategy, as well as project planning and security features.',
          ),

          roleHeading("Software Engineer, Black Flag Design — January 2024 - March 2025"),
          bullet(
            "Contributed code across five projects in simultaneous development, including Lead Developer of an AI codegen application and internal dev tool, subject to a signed NDA.",
          ),
          bullet(
            "Organized, scripted, and hosted the 'AI DIY' podcast series on AI coding trends and events in the tech industry.",
          ),

          roleHeading("Lead Designer, Gianni Ranaulo Design, Dubai, UAE — April 2015 - February 2016"),
          roleHeading("Lead Designer, Xuberance Design, Shanghai, China — August 2013 - April 2015"),

          // Education
          sectionHeading("Education"),
          educationLine("Rust Developer Bootcamp", "— Learned Rust independently with Certificate of Completion — November 2022"),
          educationLine("AlgoExpert.io", "— Certificate of Completion for solving 100 technical interview questions — May 2025"),
          educationLine("Hack Reactor, Austin, Texas", "— Graduated March 2021"),
          educationLine(
            "Gnomon School of Visual Effects, Los Angeles, California",
            "— Studied computer programming — April 2017 - February 2018",
          ),
          educationLine(
            "Southern California Institute of Architecture, Los Angeles, California",
            "— Completed 35 hours towards Masters degree in Architecture, 3.5/4.0 GPA — January 2015 - April 2017",
          ),
          educationLine(
            "Texas A&M University, Bachelor of Science - Environmental Design",
            "— Graduated Cum Laude 3.5/4.0 GPA — May 2015",
          ),
        ],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  writeFileSync(DOCX_PATH, buffer)
  console.log(`wrote ${DOCX_PATH}`)
}

await generatePdf()
await generateDocx()
