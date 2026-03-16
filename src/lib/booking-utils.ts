import { format } from 'date-fns'
import type { BookingFormData } from '@/lib/schemas/booking-schema'

export function generateReference(): string {
  const dateStr = format(new Date(), 'yyyyMMdd')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const suffix = Array.from({ length: 4 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('')
  return `FS-${dateStr}-${suffix}`
}

export function hashSlotAvailability(dateStr: string, timeStr: string): number {
  const key = `${dateStr}|${timeStr}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return hash % 101
}

export function generateICS(booking: BookingFormData & { reference: string }): string {
  const [hours, minutes] = booking.timeSlot.split(':').map(Number)
  const start = new Date(booking.date)
  start.setHours(hours, minutes, 0, 0)
  const end = new Date(start.getTime() + 90 * 60 * 1000)

  const fmt = (d: Date) =>
    format(d, "yyyyMMdd'T'HHmmss")

  const uid = `${booking.reference}@frankiesaysmelbourne.com`
  const summary = `Booking at Frankie Says Melbourne (${booking.reference})`
  const description = [
    `Party size: ${booking.partySize}`,
    `Name: ${booking.name}`,
    booking.specialRequests ? `Requests: ${booking.specialRequests}` : '',
  ]
    .filter(Boolean)
    .join('\\n')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Frankie Says Melbourne//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    'LOCATION:15 Acacia Pl\\, Abbotsford VIC 3067',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadICS(booking: BookingFormData & { reference: string }): void {
  const content = generateICS(booking)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `frankie-says-${booking.reference}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
