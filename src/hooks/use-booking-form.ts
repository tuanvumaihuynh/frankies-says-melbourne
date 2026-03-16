import { useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  step1Schema,
  step2Schema,
  type Step1Data,
  type Step2Data,
  type BookingFormData,
} from '@/lib/schemas/booking-schema'
import { generateReference } from '@/lib/booking-utils'

export type BookingStep = 1 | 2 | 3 | 'confirmation'

export interface UseBookingFormReturn {
  step: BookingStep
  form1: UseFormReturn<Step1Data>
  form2: UseFormReturn<Step2Data>
  nextStep: () => Promise<void>
  prevStep: () => void
  goToStep: (s: 1 | 2 | 3) => void
  submit: () => Promise<void>
  isSubmitting: boolean
  bookingRef: string | null
  formData: Partial<BookingFormData>
  reset: () => void
}

export function useBookingForm(): UseBookingFormReturn {
  const [step, setStep] = useState<BookingStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingRef, setBookingRef] = useState<string | null>(null)
  const [savedStep1, setSavedStep1] = useState<Step1Data | null>(null)

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      partySize: 2,
      timeSlot: '',
    },
  })

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
  })

  const nextStep = async () => {
    if (step === 1) {
      const valid = await form1.trigger()
      if (!valid) return
      setSavedStep1(form1.getValues())
      setStep(2)
    } else if (step === 2) {
      const valid = await form2.trigger()
      if (!valid) return
      setStep(3)
    }
  }

  const prevStep = () => {
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
  }

  const goToStep = (s: 1 | 2 | 3) => setStep(s)

  const submit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const ref = generateReference()
      setBookingRef(ref)
      setStep('confirmation')
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    form1.reset()
    form2.reset()
    setSavedStep1(null)
    setBookingRef(null)
    setStep(1)
  }

  const step1Values = form1.getValues()
  const step2Values = form2.getValues()

  const formData: Partial<BookingFormData> = {
    ...(savedStep1 ?? step1Values),
    ...step2Values,
  }

  return {
    step,
    form1,
    form2,
    nextStep,
    prevStep,
    goToStep,
    submit,
    isSubmitting,
    bookingRef,
    formData,
    reset,
  }
}
