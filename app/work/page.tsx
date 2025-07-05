import type { Metadata } from "next"
import WorkPageClient from "./WorkPageClient"

export const metadata: Metadata = {
  title: "Work Experience",
  description: "My professional journey in software engineering, architecture, and design",
}

export default function WorkPage() {
  return (
    <div className="flex flex-col flex-grow">
      {" "}
      {/* Ensures this page structure grows */}
      <div className="flex-grow">
        {" "}
        {/* Main content area that expands */}
        <WorkPageClient />
      </div>
    </div>
  )
}
