import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would serve a real PDF file
  // For this example, we'll just redirect to a placeholder
  return NextResponse.redirect("https://placeholder.com/resume.pdf")
}
