export interface Project {
  title: string
  description: string
  tags: string[]
  demoUrl: string
  githubUrl: string
  imageUrl: string
}

export const projectsData: Project[] = [
  {
    title: "Killer Sudoku",
    description: "A Game Variant Spin on the Classic Sudoku Puzzles.",
    tags: ["Next.js", "React", "Vercel", "Supabase", "TypeScript"],
    demoUrl: "https://thakr.io",
    githubUrl: "https://github.com",
    imageUrl: "/images/projects/killer-sudoku.png",
  },
  {
    title: "Speed-Reader",
    description:
      "A Speed-Reading application that improves reading speed, comprehension and efficiency by streaming words one-at-a-time.",
    tags: ["Next.js", "React", "Vercel", "Supabase", "pdf.js", "Markdown", "Typescript"],
    demoUrl: "https://thakr.io",
    githubUrl: "https://github.com",
    imageUrl: "/images/projects/speed-reader.png",
  },
  {
    title: "Rivendell",
    description: "AI Repository Code Generation Application that Improves Upon Traditional CodeGen Strategies",
    tags: [
      "OpenAI API",
      "Anthropic API",
      "Supabase",
      "ThreeJS",
      "React Flow",
      "OpenAI SDK",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Rust",
      "AI",
      "Codegen",
    ],
    demoUrl: "https://thakr.io",
    githubUrl: "https://github.com",
    imageUrl: "/images/projects/rivendell.png",
  },
]
