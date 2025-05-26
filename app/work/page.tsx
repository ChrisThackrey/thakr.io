import type { Metadata } from "next"
import WorkPageClient from "./WorkPageClient"

export const metadata: Metadata = {
  title: "Work Experience",
  description: "My professional journey in software engineering, architecture, and design",
}

export default function WorkPage() {
  return <WorkPageClient />
}
