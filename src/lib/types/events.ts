export interface CafeEvent {
  id: string
  title: string
  description: string
  fullDescription: string
  date: string        // ISO date
  time: string        // "7:00 PM - 10:00 PM"
  price?: string      // "Free" or "$65 per person"
  capacity?: number
  rsvpEnabled: boolean
  isPast: boolean
  tags: string[]
  color: string       // placeholder bg color
}
