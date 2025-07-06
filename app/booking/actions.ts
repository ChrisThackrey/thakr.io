"use server"

// This would be a real implementation in production
import { cookies } from "next/headers"

/**
 * Data we persist between steps of the booking flow.
 * - `selectedDate` is stored as an ISO string for easy (de)serialization.
 */
export interface BookingSession {
  name?: string
  email?: string
  topic?: string
  selectedDate?: string
  isConfirmed?: boolean
}

const COOKIE_KEY = "booking-session"
const ONE_DAY_IN_SECONDS = 60 * 60 * 24

/* ------------------------------------------------------------ */
/*  Helpers                                                     */
/* ------------------------------------------------------------ */

async function readCookie(): Promise<BookingSession | null> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(COOKIE_KEY)?.value
  if (!raw) return null
  try {
    return JSON.parse(raw) as BookingSession
  } catch {
    return null
  }
}

async function writeCookie(data: BookingSession) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_KEY, JSON.stringify(data), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: ONE_DAY_IN_SECONDS,
  })
}

/* ------------------------------------------------------------ */
/*  Public server actions                                       */
/* ------------------------------------------------------------ */

/**
 * Merge partial data into the current session and persist.
 * Returns the updated session object.
 */
export async function saveBooking(partial: Partial<BookingSession>): Promise<BookingSession> {
  const current = await readCookie() ?? {}
  const updated = { ...current, ...partial }
  await writeCookie(updated)
  return updated
}

/**
 * Retrieve the currently-saved booking session, if any.
 */
export async function getBooking(): Promise<BookingSession | null> {
  return await readCookie()
}

/**
 * Example stub for creating an event in Google Calendar.
 * In production you’d swap this out for an authenticated API call.
 */
export async function createGoogleCalendarEvent(data: {
  name: string
  email: string
  topic: string
  date: string
}) {
  try {
    // TODO: Use the data parameter when implementing the actual calendar integration
    console.log("Creating calendar event for:", data.email)
    
    // In production, you would:
    // 1. Use proper authentication with Google OAuth
    // 2. Create a calendar event with the Google Calendar API
    // 3. Add a Google Meet link to the event
    // 4. Send invitations to the attendees

    // For now, we'll just return a mock response
    return {
      success: true,
      meetingLink: `https://meet.google.com/abc-defg-hij`,
      eventId: "mock-event-id-123",
    }
  } catch (error) {
    console.error("Error creating calendar event:", error)
    throw new Error("Failed to create calendar event")
  }
}
