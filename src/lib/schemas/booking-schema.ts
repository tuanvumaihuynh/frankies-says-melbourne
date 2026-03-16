import { z } from 'zod'

export const step1Schema = z.object({
  date: z
    .date({ error: 'Please select a date' })
    .refine((d) => d > new Date(), { error: 'Date must be in the future' }),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  partySize: z
    .number({ error: 'Please select party size' })
    .int()
    .min(1, 'Minimum 1 guest')
    .max(12, 'Maximum 12 guests'),
})

export const step2Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string()
    .min(8, 'Phone must be at least 8 characters')
    .max(15, 'Phone must be at most 15 characters'),
  specialRequests: z
    .string()
    .max(500, 'Special requests must be at most 500 characters')
    .optional(),
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>

export type BookingFormData = Step1Data & Step2Data
