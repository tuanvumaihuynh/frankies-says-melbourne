import { motion } from 'framer-motion'
import { CheckCircle2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BookingSummary } from './booking-summary'
import { AddToCalendarButton } from './add-to-calendar-button'
import type { BookingFormData } from '@/lib/schemas/booking-schema'

interface BookingConfirmationProps {
  formData: BookingFormData
  reference: string
  onReset: () => void
}

export function BookingConfirmation({
  formData,
  reference,
  onReset,
}: BookingConfirmationProps) {
  return (
    <div className="space-y-6 text-center">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex justify-center"
      >
        <CheckCircle2 className="size-16 text-green-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <h2 className="font-serif text-2xl font-semibold">
          You're all set!
        </h2>
        <p className="text-muted-foreground">
          We'll confirm your booking within 2 hours via email.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card className="text-left">
          <CardContent className="pt-5 pb-5">
            <BookingSummary data={formData} reference={reference} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <AddToCalendarButton booking={{ ...formData, reference }} />

        <Separator />

        <Button
          type="button"
          variant="ghost"
          onClick={onReset}
          className="gap-2 text-muted-foreground"
        >
          <RefreshCw className="size-4" />
          Make Another Booking
        </Button>
      </motion.div>
    </div>
  )
}
