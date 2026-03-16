import { z } from 'zod'

export const rsvpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  guestCount: z
    .number({ invalid_type_error: 'Please select number of guests' })
    .int()
    .min(1, 'At least 1 guest required')
    .max(10, 'Maximum 10 guests per booking'),
})

export type RsvpFormData = z.infer<typeof rsvpSchema>
