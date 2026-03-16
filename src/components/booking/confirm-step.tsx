import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookingSummary } from './booking-summary'
import type { BookingFormData } from '@/lib/schemas/booking-schema'

interface ConfirmStepProps {
  formData: Partial<BookingFormData>
  onConfirm: () => void
  onBack: () => void
  onEditStep1: () => void
  onEditStep2: () => void
  isSubmitting: boolean
}

export function ConfirmStep({
  formData,
  onConfirm,
  onBack,
  onEditStep1,
  onEditStep2,
  isSubmitting,
}: ConfirmStepProps) {
  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Booking Details</h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onEditStep1}
                className="text-xs text-accent hover:underline"
              >
                Edit date/time
              </button>
              <button
                type="button"
                onClick={onEditStep2}
                className="text-xs text-accent hover:underline"
              >
                Edit details
              </button>
            </div>
          </div>
          <BookingSummary data={formData} />
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground text-center">
        By confirming, you agree to our cancellation policy. We'll send a
        confirmation to your email within 2 hours.
      </p>

      <div className="flex justify-between pt-1">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="min-w-40"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Confirming…
            </>
          ) : (
            'Confirm Booking'
          )}
        </Button>
      </div>
    </div>
  )
}
