import { Phone, Clock, Users } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BookingProgress } from '@/components/booking/booking-progress'
import { BookingForm } from '@/components/booking/booking-form'
import { BookingConfirmation } from '@/components/booking/booking-confirmation'
import { useBookingForm } from '@/hooks/use-booking-form'
import { SITE_CONFIG } from '@/lib/constants'
import type { BookingFormData } from '@/lib/schemas/booking-schema'

function Sidebar() {
  return (
    <aside className="space-y-4">
      <Card>
        <CardContent className="pt-5 pb-5 space-y-4">
          <h3 className="font-serif font-semibold text-base">Need Help?</h3>

          <div className="flex items-start gap-3">
            <Phone className="size-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Call us directly</p>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="text-sm font-medium hover:underline"
              >
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <Users className="size-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Walk-ins</p>
              <p className="text-sm font-medium">Always welcome</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Subject to availability
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <Clock className="size-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Hours</p>
              <div className="space-y-0.5 text-xs">
                <p>
                  <span className="text-muted-foreground">Mon–Wed</span>{' '}
                  <span className="font-medium">7:00am – 4:00pm</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Thu</span>{' '}
                  <span className="font-medium">7:00am – 10:00pm</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Fri</span>{' '}
                  <span className="font-medium">7:00am – 11:00pm</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Sat</span>{' '}
                  <span className="font-medium">8:00am – 11:00pm</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Sun</span>{' '}
                  <span className="font-medium">8:00am – 4:00pm</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="pt-4 pb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Group of 7+?</span>{' '}
            For large parties or private events, please call us directly and
            we'll arrange something special.
          </p>
        </CardContent>
      </Card>
    </aside>
  )
}

export function BookingPage() {
  const booking = useBookingForm()
  const { step, bookingRef, formData, reset } = booking

  const isConfirmation = step === 'confirmation'
  const numericStep = typeof step === 'number' ? step : 3

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading
          title="Book a Table"
          subtitle="Reserve your spot at Frankie Says Melbourne. We'll confirm within 2 hours."
        />

        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
          {/* Main form area */}
          <Card>
            <CardContent className="pt-6 pb-6">
              {isConfirmation ? (
                <BookingConfirmation
                  formData={formData as BookingFormData}
                  reference={bookingRef!}
                  onReset={reset}
                />
              ) : (
                <>
                  <BookingProgress currentStep={numericStep as 1 | 2 | 3} />
                  <BookingForm booking={booking} />
                </>
              )}
            </CardContent>
          </Card>

          {/* Sidebar */}
          {!isConfirmation && <Sidebar />}
        </div>
      </div>
    </div>
  )
}
