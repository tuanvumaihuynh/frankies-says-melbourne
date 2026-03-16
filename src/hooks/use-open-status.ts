import { useState, useEffect } from 'react'
import hoursData from '@/data/hours.json'

interface OpenStatus {
  isOpen: boolean
  todayHours: { open: string; close: string } | null
  label: string
}

const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

function getMelbourneTime(): Date {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: hoursData.timezone })
  )
}

function getStatus(): OpenStatus {
  const now = getMelbourneTime()
  const dayName = DAYS[now.getDay()]
  const todayHours =
    hoursData.schedule[dayName as keyof typeof hoursData.schedule]

  if (!todayHours) {
    return { isOpen: false, todayHours: null, label: 'Closed today' }
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const [openH, openM] = todayHours.open.split(':').map(Number)
  const [closeH, closeM] = todayHours.close.split(':').map(Number)
  const openMinutes = openH * 60 + openM
  const closeMinutes = closeH * 60 + closeM

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes

  const label = isOpen
    ? `Open · Closes at ${todayHours.close.replace(/^0/, '')}`
    : currentMinutes < openMinutes
      ? `Closed · Opens at ${todayHours.open.replace(/^0/, '')}`
      : 'Closed for today'

  return { isOpen, todayHours, label }
}

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(getStatus)

  useEffect(() => {
    const interval = setInterval(() => setStatus(getStatus()), 60_000)
    return () => clearInterval(interval)
  }, [])

  return status
}
