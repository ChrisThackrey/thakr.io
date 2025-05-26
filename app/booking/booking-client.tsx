"use client"

import { useState, useCallback, useMemo } from "react"
import { BookingCalendar } from "@/components/booking-calendar"
import { BookingForm } from "@/components/booking-form"
import { BookingConfirmation } from "@/components/booking-confirmation"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { contentAnimationVariants } from "@/utils/content-animation-variants"
import { usePersistentForm } from "@/hooks/use-persistent-form"
import { AutosaveIndicator } from "@/components/autosave-indicator"

type BookingStep = "calendar" | "form" | "confirmation"

interface FormData {
  name: string
  email: string
  topic: string
}

interface BookingState {
  step: BookingStep
  selectedDate: string | null // Store as ISO string for localStorage
  formData: FormData
}

const initialState: BookingState = {
  step: "calendar",
  selectedDate: null,
  formData: {
    name: "",
    email: "",
    topic: "",
  },
}

export function BookingPageClient() {
  // Use our persistent form hook with save status
  const [bookingState, setBookingState, clearBookingState, saveStatus, forceSave] = usePersistentForm<BookingState>(
    "booking-form-state",
    initialState,
  )

  // Separate state for booking details after submission
  const [bookingDetails, setBookingDetails] = useState<{
    name: string
    email: string
    topic: string
    date: Date | null
    meetingLink?: string
  } | null>(null)

  // Convert ISO string date back to Date object when needed
  const selectedDate = useMemo(
    () => (bookingState.selectedDate ? new Date(bookingState.selectedDate) : null),
    [bookingState.selectedDate],
  )

  const handleDateSelect = useCallback(
    (date: Date) => {
      setBookingState((prev) => ({
        ...prev,
        selectedDate: date.toISOString(),
        step: "form",
      }))
    },
    [setBookingState],
  )

  const handleFormChange = useCallback(
    (data: Partial<FormData>) => {
      setBookingState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          ...data,
        },
      }))
    },
    [setBookingState],
  )

  const handleFormSubmit = useCallback(
    async (data: FormData) => {
      try {
        // Update form data one last time and force an immediate save
        setBookingState((prev) => ({
          ...prev,
          formData: data,
        }))

        // Force save before submission
        forceSave()

        // In a real implementation, this would call a server action to create the calendar event
        const response = await createCalendarEvent({
          name: data.name,
          email: data.email,
          topic: data.topic,
          date: selectedDate as Date,
        })

        setBookingDetails({
          name: data.name,
          email: data.email,
          topic: data.topic,
          date: selectedDate,
          meetingLink: response.meetingLink,
        })

        // Move to confirmation step
        setBookingState((prev) => ({
          ...prev,
          step: "confirmation",
        }))
      } catch (error) {
        console.error("Failed to create booking:", error)
        // Would handle error state here
      }
    },
    [setBookingState, forceSave, selectedDate],
  )

  const handleBack = useCallback(() => {
    setBookingState((prev) => {
      if (prev.step === "form") {
        return { ...prev, step: "calendar" }
      } else if (prev.step === "confirmation") {
        return { ...prev, step: "form" }
      }
      return prev
    })
  }, [setBookingState])

  // Clear form data after successful booking completion
  const handleDone = useCallback(() => {
    clearBookingState()
    // Redirect to home or another page if needed
  }, [clearBookingState])

  return (
    <Card className="p-6 md:p-8 bg-background/80 backdrop-blur-sm relative">
      {/* Autosave indicator - positioned in the top right corner */}
      <div className="absolute top-4 right-4 z-10">
        <AutosaveIndicator status={saveStatus} />
      </div>

      <motion.div
        key={bookingState.step}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={contentAnimationVariants.home}
      >
        {bookingState.step === "calendar" && (
          <BookingCalendar onDateSelect={handleDateSelect} initialDate={selectedDate} />
        )}

        {bookingState.step === "form" && (
          <BookingForm
            selectedDate={selectedDate}
            initialData={bookingState.formData}
            onDataChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onBack={handleBack}
          />
        )}

        {bookingState.step === "confirmation" && bookingDetails && (
          <BookingConfirmation bookingDetails={bookingDetails} onBack={handleBack} onDone={handleDone} />
        )}
      </motion.div>
    </Card>
  )
}

// This would be a server action in a real implementation
async function createCalendarEvent(data: {
  name: string
  email: string
  topic: string
  date: Date
}) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In production, this would call the Google Calendar API
  return {
    success: true,
    meetingLink: `https://meet.google.com/abc-defg-hij?authuser=${data.email}`,
  }
}
