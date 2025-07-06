import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  console.log("API Route: /api/get-cv - Initiating resume download...")

  try {
    // Attempt to create admin client early. If env vars are missing, this will throw.
    const supabase = createAdminClient()

    const bucketName = "resumes"
    const resumePathInBucket = "Resume Chris Thackrey.pdf" // Exact name in bucket
    const downloadFilename = "Chris_Thackrey_Resume.pdf" // User-friendly download name

    console.log(`Attempting to download from Supabase Storage. Bucket: '${bucketName}', Path: '${resumePathInBucket}'`)

    const { data, error: downloadError } = await supabase.storage.from(bucketName).download(resumePathInBucket)

    if (downloadError) {
      console.error("Supabase storage download error:", downloadError)
      let status = 500
      // Supabase storage errors might have a 'status' or 'statusCode' property
      const supabaseErrorStatus = (downloadError as { status?: number; statusCode?: number }).status || (downloadError as { status?: number; statusCode?: number }).statusCode
      if (supabaseErrorStatus === 404 || downloadError.message.toLowerCase().includes("not found")) {
        status = 404
      } else if (supabaseErrorStatus === 401 || supabaseErrorStatus === 403) {
        status = 403 // Unauthorized or Forbidden
      }
      return NextResponse.json(
        {
          error: "Failed to download resume from storage.",
          details: downloadError.message,
        },
        { status },
      )
    }

    if (!data) {
      console.error("No data returned from Supabase storage for the resume. The file might be missing or empty.")
      return NextResponse.json({ error: "Resume file not found in storage or the file is empty." }, { status: 404 })
    }

    console.log(`Successfully fetched resume data. Blob size: ${data.size} bytes, Blob type: ${data.type}`)

    const headers = new Headers()
    headers.set("Content-Type", data.type || "application/pdf")
    headers.set("Content-Disposition", `inline; filename="${downloadFilename}"`)
    // headers.set("Cache-Control", "public, max-age=3600"); // Example

    return new NextResponse(data, {
      status: 200,
      headers,
    })
  } catch (e: unknown) {
    // This catches errors from createAdminClient() or any other unexpected issues.
    const error = e as Error
    console.error("Error in /api/get-cv GET handler:", error.message, error.stack) // Log stack for more details

    let errorMessage = "An unexpected error occurred while processing the resume download."
    let errorStatus = 500

    if (error.message.includes("Server configuration error: Supabase admin credentials missing.")) {
      errorMessage =
        "Server configuration error: Supabase admin credentials missing. Please check environment variables."
      errorStatus = 503 // Service Unavailable (due to misconfiguration)
    } else if (error.message.includes("Failed to initialize Supabase admin client.")) {
      errorMessage = "Failed to initialize Supabase admin client. Check server logs for details."
      errorStatus = 503
    }
    // Add more specific error message handling if needed

    return NextResponse.json({ error: errorMessage, details: error.message }, { status: errorStatus })
  }
}
