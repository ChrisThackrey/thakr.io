"use client"

import { useState, useMemo } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addDays, format, setHours, setMinutes, isBefore, isToday } from "date-fns"
import { Clock, ArrowRight, CalendarIcon } from "lucide-react"

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void
  initialDate?: Date | null
}

// Generate available time slots from 9 AM to 5 PM
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour < 17; hour++) {
    // 9 AM to 4 PM slots, meeting is 1 hour
    slots.push({
      display: format(setHours(new Date(), hour), "h:mm a"),
      value: `${hour}:00`,
    })
  }
  return slots
}

const timeSlots = generateTimeSlots()

export function BookingCalendar({ onDateSelect, initialDate }: BookingCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(initialDate || undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    initialDate ? format(initialDate, "H:mm") : undefined,
  )

  const disabledDays = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (isBefore(date, today)) return true
    const day = date.getDay()
    return day === 0 || day === 6 // Disable weekends
  }

  const handleDayChange = (day: Date | undefined) => {
    setSelectedDay(day)
    setSelectedTime(undefined) // Reset time when day changes
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirm = () => {
    if (selectedDay && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const fullDate = setMinutes(setHours(new Date(selectedDay), hours), minutes)
      onDateSelect(fullDate)
    }
  }

  const isTimeDisabled = (time: string) => {
    if (!selectedDay || !isToday(selectedDay)) return false
    const now = new Date()
    const [hours] = time.split(":").map(Number)
    const selectedDateTime = setHours(new Date(selectedDay), hours)
    return isBefore(selectedDateTime, now)
  }

  const selectedDateTime = useMemo(() => {
    if (selectedDay && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number)
      return setMinutes(setHours(new Date(selectedDay), hours), minutes)
    }
    return null
  }, [selectedDay, selectedTime])

  return (
    <Card className="w-full border-0 shadow-none sm:border sm:shadow-sm">
      <CardHeader>
        <CardTitle>Schedule a Meeting</CardTitle>
        <CardDescription>Choose an available date and time for our one-hour meeting.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center md:text-left">Select a Date</h3>
            <div className="flex justify-center p-1 rounded-md sm:border">
              <Calendar
                mode="single"
                selected={selectedDay}
                onSelect={handleDayChange}
                disabled={disabledDays}
                className="p-0"
                fromDate={new Date()}
                toDate={addDays(new Date(), 60)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center md:text-left">Select a Time</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.value}
                  variant={selectedTime === slot.value ? "default" : "outline"}
                  className="w-full"
                  disabled={!selectedDay || isTimeDisabled(slot.value)}
                  onClick={() => handleTimeChange(slot.value)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {slot.display}
                </Button>
              ))}
            </div>
            {!selectedDay && (
              <div className="flex items-center justify-center h-full min-h-[160px] border rounded-md bg-muted/50 text-center p-4">
                <p className="text-muted-foreground">Please select a date to see available times.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 sm:mb-0">
          {selectedDateTime ? (
            <>
              <CalendarIcon className="h-4 w-4" />
              <span>{format(selectedDateTime, "eeee, MMMM d, yyyy 'at' h:mm a")}</span>
            </>
          ) : (
            <span>Please select a date and time.</span>
          )}
        </div>
        <Button onClick={handleConfirm} disabled={!selectedDateTime} size="lg">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
