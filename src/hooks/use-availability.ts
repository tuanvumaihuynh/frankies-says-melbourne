import { useMemo } from 'react'
import { format, getDay } from 'date-fns'
import config from '@/data/availability-config.json'
import { hashSlotAvailability } from '@/lib/booking-utils'

export type SlotStatus = 'available' | 'limited' | 'unavailable'

export interface TimeSlot {
  time: string
  label: string
  status: SlotStatus
}

function parseTime(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function formatTimeLabel(timeStr: string): string {
  const [h, m] = timeStr.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
  const min = m === 0 ? '' : `:${String(m).padStart(2, '0')}`
  return `${hour}${min} ${period}`
}

function generateSlots(start: string, end: string): string[] {
  const slots: string[] = []
  let current = parseTime(start)
  const endMin = parseTime(end)
  while (current <= endMin) {
    const h = Math.floor(current / 60)
    const m = current % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    current += config.slotIntervalMinutes
  }
  return slots
}

function getPeakFillRate(timeStr: string, dayOfWeek: number): number | null {
  const timeMin = parseTime(timeStr)
  const peak = config.peakHours

  // Friday (5) or Saturday (6) night
  if (
    (dayOfWeek === 5 || dayOfWeek === 6) &&
    timeMin >= parseTime(peak.fridaySatNight.start) &&
    timeMin < parseTime(peak.fridaySatNight.end)
  ) {
    return peak.fridaySatNight.fillRate
  }

  // Weekend (0=Sun, 6=Sat) brunch
  if (
    (dayOfWeek === 0 || dayOfWeek === 6) &&
    timeMin >= parseTime(peak.weekendBrunch.start) &&
    timeMin < parseTime(peak.weekendBrunch.end)
  ) {
    return peak.weekendBrunch.fillRate
  }

  // Weekday lunch (Mon-Fri)
  if (
    dayOfWeek >= 1 &&
    dayOfWeek <= 5 &&
    timeMin >= parseTime(peak.weekdayLunch.start) &&
    timeMin < parseTime(peak.weekdayLunch.end)
  ) {
    return peak.weekdayLunch.fillRate
  }

  return null
}

function getSlotStatus(
  dateStr: string,
  timeStr: string,
  dayOfWeek: number
): SlotStatus {
  const hash = hashSlotAvailability(dateStr, timeStr) // 0-100
  const peakFill = getPeakFillRate(timeStr, dayOfWeek)

  // Blend hash with peak fill rate: peak hours shift threshold down (more full)
  const threshold = peakFill !== null ? (1 - peakFill) * 100 : 70

  if (hash > threshold + 15) return 'unavailable'
  if (hash > threshold - 10) return 'limited'
  return 'available'
}

export function useAvailability(selectedDate: Date | undefined): TimeSlot[] {
  return useMemo(() => {
    if (!selectedDate) return []

    const dateStr = format(selectedDate, 'yyyy-MM-dd')

    if (config.blackoutDates.includes(dateStr)) {
      return []
    }

    const dayOfWeek = getDay(selectedDate) // 0=Sun, 6=Sat

    // Thu/Fri/Sat get both day and night service
    const hasNightService = dayOfWeek >= 4 && dayOfWeek <= 6

    const daySlots = generateSlots(config.dayService.start, config.dayService.end)
    const nightSlots = hasNightService
      ? generateSlots(config.nightService.start, config.nightService.end)
      : []

    const allSlots = [...daySlots, ...nightSlots]

    return allSlots.map((time) => ({
      time,
      label: formatTimeLabel(time),
      status: getSlotStatus(dateStr, time, dayOfWeek),
    }))
  }, [selectedDate])
}
