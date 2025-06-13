import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server" // We'll create this utility

export async function GET() {
  const supabaseAdmin = createAdminClient()
  const bucketName = "resumes" // Or your chosen bucket name
  const resumePath = "Chris_Thackrey_Resume.pdf" // The name of your resume file in the bucket

  try {
    const { data, error } = await supabaseAdmin.storage.from(bucketName).download(resumePath)

    if (error) {
      console.error("Error downloading resume from Supabase:", error)
      return NextResponse.json({ error: "Error downloading resume: " + error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Resume file not found." }, { status: 404 })
    }

    // Ensure headers allow the browser to download the file
    const headers = new Headers()
    headers.set("Content-Type", "application/pdf")
    headers.set("Content-Disposition", `attachment; filename="${resumePath}"`)
    headers.set("Cache-Control", "public, max-age=3600") // Cache for 1 hour

    return new NextResponse(data, { status: 200, headers })
  } catch (e: any) {
    console.error("Unexpected error in download-resume route:", e)
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 })
  }
}
