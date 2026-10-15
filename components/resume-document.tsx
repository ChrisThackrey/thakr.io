import React from "react"
import {
  BREAK,
  resume,
  type ContactLink,
  type EducationEntry,
  type ExperienceEntry,
  type Para,
  type ProjectEntry,
  type SkillGroup,
} from "@/content/resume"

/**
 * Renders the resume as two US-Letter pages that reproduce
 * public/Chris-Thackrey-Resume.pdf: same typography, colors, spacing,
 * page breaks, "Continued…" footer, and page-2 running header.
 *
 * Layout rules live in styles/resume-document.css.
 */

const paraText = (para: Para) => (typeof para === "string" ? para : para.text)

/** Text with each BREAK marker replaced by a <wbr> line-break opportunity. */
const paraNodes = (para: Para): React.ReactNode => {
  const parts = paraText(para).split(BREAK)
  if (parts.length === 1) return parts[0]
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </React.Fragment>
  ))
}

const paraStyle = (para: Para): React.CSSProperties | undefined =>
  typeof para === "string" ? undefined : { letterSpacing: `${para.letterSpacing}pt` }

function SectionHeading({
  children,
  variant,
}: {
  children: React.ReactNode
  /**
   * "plain": black text, 3pt margins. "heading1": Word's Heading 1 style, no
   * space-after. "heading1-leaded": the same with the style's 1.08x line height.
   */
  variant?: "plain" | "heading1" | "heading1-leaded"
}) {
  const className = variant ? `rd-section-heading rd-section-heading--${variant}` : "rd-section-heading"
  return <h2 className={className}>{children}</h2>
}

function Bullet({ glyph, para, children }: { glyph: "check" | "square"; para?: Para; children?: React.ReactNode }) {
  return (
    <div className={`rd-bullet rd-bullet--${glyph}`} style={para ? paraStyle(para) : undefined}>
      <span className="rd-bullet-glyph" aria-hidden="true">
        {glyph === "check" ? "✓" : "▪"}
      </span>
      <span className="rd-bullet-text">{para ? paraNodes(para) : children}</span>
    </div>
  )
}

function SkillRow({ group }: { group: SkillGroup }) {
  return (
    <Bullet glyph="square">
      <strong>{group.label}:</strong> {group.items}
    </Bullet>
  )
}

function ExternalLink({ link }: { link: ContactLink }) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  )
}

function TitleRow({ title, dates, website }: { title: string; dates: string; website?: ContactLink }) {
  return (
    <div className="rd-entry-title-row">
      <span className="rd-entry-title">
        {title}
        {website && (
          <>
            {" | "}
            <ExternalLink link={website} />
          </>
        )}
      </span>
      <span className="rd-entry-dates">{dates}</span>
    </div>
  )
}

function Description({ para }: { para: Para }) {
  return (
    <p className="rd-entry-description" style={paraStyle(para)}>
      {paraNodes(para)}
    </p>
  )
}

/**
 * An experience entry. `part` renders only the title row ("title") or
 * everything after it ("rest"), for an entry Word splits across a page break.
 */
function Experience({ entry, part = "all" }: { entry: ExperienceEntry; part?: "all" | "title" | "rest" }) {
  if (part === "title") {
    return (
      <div className="rd-entry">
        <div className="rd-shaded">
          <TitleRow title={entry.title} dates={entry.dates} />
        </div>
      </div>
    )
  }
  return (
    <div className={part === "rest" ? "rd-entry rd-entry--continued" : "rd-entry"}>
      <div className="rd-shaded">
        {part === "all" && <TitleRow title={entry.title} dates={entry.dates} />}
        <div className="rd-entry-company-row">
          <span className="rd-entry-company">{entry.company}</span>
          {entry.website && (
            <span className="rd-entry-website">
              Website: <ExternalLink link={entry.website} />
            </span>
          )}
        </div>
        {entry.description && <Description para={entry.description} />}
      </div>
      {entry.bullets.map((para) => (
        <Bullet key={paraText(para).slice(0, 40)} glyph="square" para={para} />
      ))}
    </div>
  )
}

function Project({ entry }: { entry: ProjectEntry }) {
  return (
    <div className="rd-entry rd-entry--project">
      <div className="rd-shaded">
        <TitleRow title={entry.title} dates={entry.dates} website={entry.website} />
        <Description para={entry.description} />
      </div>
      {entry.bullets.map((para) => (
        <Bullet key={paraText(para).slice(0, 40)} glyph="square" para={para} />
      ))}
    </div>
  )
}

function Education({ entry }: { entry: EducationEntry }) {
  return (
    <p
      className="rd-education"
      style={entry.letterSpacing !== undefined ? { letterSpacing: `${entry.letterSpacing}pt` } : undefined}
    >
      <strong>{entry.institution}</strong>
      {entry.detail}
    </p>
  )
}

const c = resume.contact

export function ResumeDocument() {
  const [senior, aiEngineer, engineer] = resume.experience

  return (
    <div className="rd-document">
      {/* ------------------------------ Page 1 ------------------------------ */}
      <section className="rd-sheet rd-sheet--first" aria-label="Resume, page 1">
        <div className="rd-sheet-body">
          <h1 className="rd-name">{resume.name}</h1>
          <p className="rd-contact">
            <a href={c.email.href}>{c.email.label}</a>
            {" | "}
            {c.location}
            {" | "}
            {c.phone}
            {" | "}
            <a href={c.linkedin.href} target="_blank" rel="noopener noreferrer">
              {c.linkedin.label}
            </a>
            <span className="rd-contact-sep"> | </span>
            <a href={c.github.href} target="_blank" rel="noopener noreferrer">
              {c.github.label}
            </a>
            <span className="rd-contact-sep"> | </span>
            <a href={c.website.href}>{c.website.label}</a>
          </p>
          <p className="rd-tagline">{resume.tagline}</p>
          <p className="rd-summary">{paraNodes(resume.summary)}</p>

          <SectionHeading>Leadership Highlights</SectionHeading>
          {resume.leadershipHighlights.map((para) => (
            <Bullet key={paraText(para).slice(0, 40)} glyph="check" para={para} />
          ))}

          <SectionHeading variant="heading1-leaded">Technical Skills</SectionHeading>
          {resume.technicalSkills.map((group) => (
            <SkillRow key={group.label} group={group} />
          ))}

          <SectionHeading>Professional Experience</SectionHeading>
          <Experience entry={senior} />
          <Experience entry={aiEngineer} />
          {/* Word keeps this entry's title row on page 1 and breaks before the company line. */}
          <Experience entry={engineer} part="title" />
        </div>
        <p className="rd-footer">Continued…</p>
      </section>

      {/* ------------------------------ Page 2 ------------------------------ */}
      <section className="rd-sheet rd-sheet--second" aria-label="Resume, page 2">
        <header className="rd-running-header">
          <span>
            Chris Thackrey | <a href={c.email.href}>{c.email.label}</a> | {c.phone} |{" "}
            <a href={c.linkedin.href} target="_blank" rel="noopener noreferrer">
              {c.linkedin.label}
            </a>
            <span className="rd-contact-sep"> | </span>
            <a href={c.github.href} target="_blank" rel="noopener noreferrer">
              {c.github.label}
            </a>{" "}
            | <a href={c.website.href}>{c.website.label}</a>
          </span>
          <span className="rd-running-header-page">Page 2</span>
        </header>
        <div className="rd-sheet-body">
          <Experience entry={engineer} part="rest" />

          <SectionHeading variant="plain">Software Engineering Projects</SectionHeading>
          {resume.projects.map((project) => (
            <Project key={project.title} entry={project} />
          ))}

          <SectionHeading variant="heading1">Education | Professional Development</SectionHeading>
          {resume.education.map((entry) => (
            <Education key={entry.institution} entry={entry} />
          ))}
        </div>
      </section>
    </div>
  )
}
