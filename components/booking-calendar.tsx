"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock, ArrowRight, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  format,
  setHours,
  setMinutes,
  isBefore,
  isToday,
  isSameDay,
  getDay,
  startOfMonth,
  isSameMonth,
} from "date-fns"
import { cn } from "@/lib/utils"

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void
  initialDate?: Date | null
}

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
}

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour < 17; hour++) {
    slots.push({
      display: format(setHours(new Date(), hour), "h:mm a"),
      value: `${hour}:00`,
    })
  }
  return slots
}

const timeSlots = generateTimeSlots()
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function BookingCalendar({ onDateSelect, initialDate }: BookingCalendarProps) {
  const [currentMonthDate, setCurrentMonthDate] = useState(initialDate || new Date())
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(initialDate || undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    initialDate ? format(initialDate, "H:mm") : undefined,
  )

  const isDayDisabled = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (isBefore(date, today)) return true
    const dayOfWeek = getDay(date)
    return dayOfWeek === 0 || dayOfWeek === 6 // Disable weekends
  }

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const firstDayOfMonth = startOfMonth(date)
    const startDayOfWeek = getDay(firstDayOfMonth)

    const days: CalendarDay[] = []
    const startDate = new Date(firstDayOfMonth)
    startDate.setDate(startDate.getDate() - startDayOfWeek)

    const today = new Date()

    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push({
        date: day,
        isCurrentMonth: isSameMonth(day, date),
        isToday: isSameDay(day, today),
        isSelected: selectedDay ? isSameDay(day, selectedDay) : false,
        isDisabled: isDayDisabled(day),
      })
    }
    return days
  }

  const calendarDays = getDaysInMonth(currentMonthDate)

  const nextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1))
  }

  const handleDayChange = (day: Date) => {
    if (isDayDisabled(day)) return
    setSelectedDay(day)
    setSelectedTime(undefined)
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
          <motion.div
            key={currentMonthDate.getMonth()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={prevMonth} aria-label="Previous month">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h3 className="text-lg font-semibold text-center">
                {monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
              </h3>
              <Button variant="ghost" size="icon" onClick={nextMonth} aria-label="Next month">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm text-muted-foreground">
              {dayNames.map((day) => (
                <div key={day} className="py-2 font-medium">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              <AnimatePresence>
                {calendarDays.map((day, index) => (
                  <motion.div
                    key={day.date.toISOString()}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01, duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleDayChange(day.date)}
                      disabled={day.isDisabled}
                      className={cn(
                        "w-full h-10 p-0 rounded-md transition-colors duration-200",
                        !day.isCurrentMonth && "text-muted-foreground/50",
                        day.isDisabled && "text-muted-foreground/30 cursor-not-allowed",
                        !day.isDisabled && day.isCurrentMonth && "hover:bg-accent hover:text-accent-foreground",
                        day.isToday && !day.isSelected && "bg-accent/50 text-accent-foreground",
                        day.isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                    >
                      {day.date.getDate()}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

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
