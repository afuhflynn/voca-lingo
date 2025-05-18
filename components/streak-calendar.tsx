"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, FlameIcon as Fire } from "lucide-react"

export function StreakCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Sample streak data
  const streakData = {
    "2025-05-01": { completed: true, xp: 45 },
    "2025-05-02": { completed: true, xp: 60 },
    "2025-05-03": { completed: true, xp: 75 },
    "2025-05-04": { completed: false, xp: 0 },
    "2025-05-05": { completed: true, xp: 50 },
    "2025-05-06": { completed: true, xp: 65 },
    "2025-05-07": { completed: true, xp: 80 },
    "2025-05-08": { completed: true, xp: 90 },
    "2025-05-09": { completed: false, xp: 0 },
    "2025-05-10": { completed: true, xp: 70 },
    "2025-05-11": { completed: true, xp: 85 },
    "2025-05-12": { completed: true, xp: 95 },
    "2025-05-13": { completed: true, xp: 60 },
    "2025-05-14": { completed: true, xp: 75 },
    "2025-05-15": { completed: true, xp: 80 },
    "2025-05-16": { completed: false, xp: 0 },
    "2025-05-17": { completed: true, xp: 65 },
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    // Add weekday headers
    weekdays.forEach((day) => {
      days.push(
        <div key={`header-${day}`} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
          {day}
        </div>,
      )
    })

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayData = streakData[date]
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

      days.push(
        <div
          key={`day-${day}`}
          className={`p-1 text-center relative ${isToday ? "border border-indigo-500 rounded-md" : ""}`}
        >
          <div className="text-xs mb-1">{day}</div>
          {dayData ? (
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs
                ${
                  dayData.completed
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
            >
              {dayData.completed ? (
                <>
                  <Fire className="h-3 w-3 mr-0.5" />
                  <span>{dayData.xp}</span>
                </>
              ) : (
                "0"
              )}
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto"></div>
          )}
        </div>,
      )
    }

    return days
  }

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

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <span>Missed</span>
        </div>
      </div>
    </div>
  )
}
