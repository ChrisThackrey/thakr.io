"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BookingCalendar } from "@/components/booking-calendar"
import { BookingForm } from "@/components/booking-form"
import { BookingConfirmation } from "@/components/booking-confirmation"
import { usePersistentForm } from "@/hooks/use-persistent-form"
import { saveBooking, getBooking } from "./actions"
import { BookingPageSkeleton } from "@/components/skeletons/booking-page-skeleton"

type Step = "calendar" | "form" | "confirmation"

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

export function BookingPageClient() {
  const [step, setStep] = useState<Step>("calendar")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { formData, setFormData, clearFormData } = usePersistentForm<{
    name: string
    email: string
    topic: string
  }>("bookingFormData")

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getBooking()
      if (data) {
        setFormData(data)
        if (data.selectedDate) {
          setSelectedDate(new Date(data.selectedDate))
        }
      }
      setIsLoading(false)
    }
    fetchInitialData()
  }, [setFormData])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep("form")
    saveBooking({ selectedDate: date.toISOString() })
  }

  const handleFormSubmit = async (data: { name: string; email: string; topic: string }) => {
    // Here you would typically handle the final submission to your backend/API
    // For now, we'll just move to the confirmation step.
    console.log("Booking submitted:", { ...data, selectedDate })
    await saveBooking({ ...data, isConfirmed: true })
    setStep("confirmation")
    clearFormData() // Clear form data after successful submission
  }

  const handleBackToCalendar = () => {
    setStep("calendar")
  }

  const handleDataChange = useCallback(
    (data: Partial<{ name: string; email: string; topic: string }>) => {
      setFormData((prev) => ({ ...prev, ...data }))
      saveBooking(data)
    },
    [setFormData],
  )

  if (isLoading) {
    return <BookingPageSkeleton />
  }

  return (
    <div className="relative min-h-[400px]">
      <AnimatePresence mode="wait">
        {step === "calendar" && (
          <motion.div
            key="calendar"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <BookingCalendar onDateSelect={handleDateSelect} initialDate={selectedDate} />
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <BookingForm
              selectedDate={selectedDate}
              onSubmit={handleFormSubmit}
              onBack={handleBackToCalendar}
              initialData={formData}
              onDataChange={handleDataChange}
            />
          </motion.div>
        )}

        {step === "confirmation" && (
          <motion.div
            key="confirmation"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <BookingConfirmation selectedDate={selectedDate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
