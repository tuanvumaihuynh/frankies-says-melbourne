import { DateTimeStep } from './date-time-step'
import { DetailsStep } from './details-step'
import { ConfirmStep } from './confirm-step'
import type { UseBookingFormReturn } from '@/hooks/use-booking-form'

interface BookingFormProps {
  booking: UseBookingFormReturn
}

export function BookingForm({ booking }: BookingFormProps) {
  const {
    step,
    form1,
    form2,
    nextStep,
    prevStep,
    goToStep,
    submit,
    isSubmitting,
    formData,
  } = booking

  if (step === 1) {
    return <DateTimeStep form={form1} onNext={nextStep} />
  }

  if (step === 2) {
    return <DetailsStep form={form2} onNext={nextStep} onBack={prevStep} />
  }

  if (step === 3) {
    return (
      <ConfirmStep
        formData={formData}
        onConfirm={submit}
        onBack={prevStep}
        onEditStep1={() => goToStep(1)}
        onEditStep2={() => goToStep(2)}
        isSubmitting={isSubmitting}
      />
    )
  }

  return null
}
