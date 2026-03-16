import { type UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Step2Data } from '@/lib/schemas/booking-schema'

interface DetailsStepProps {
  form: UseFormReturn<Step2Data>
  onNext: () => void
  onBack: () => void
}

export function DetailsStep({ form, onNext, onBack }: DetailsStepProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = form

  const specialRequests = watch('specialRequests') ?? ''
  const charCount = specialRequests.length

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Jane Smith"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="jane@example.com"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+61 4XX XXX XXX"
          aria-invalid={!!errors.phone}
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="specialRequests">
          Special Requests{' '}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="specialRequests"
          placeholder="Dietary requirements, celebrations, seating preferences..."
          rows={3}
          aria-invalid={!!errors.specialRequests}
          {...register('specialRequests')}
        />
        <div className="flex justify-between items-center">
          {errors.specialRequests ? (
            <p className="text-sm text-destructive">
              {errors.specialRequests.message}
            </p>
          ) : (
            <span />
          )}
          <p
            className={`text-xs ${charCount > 450 ? 'text-amber-500' : 'text-muted-foreground'}`}
          >
            {charCount}/500
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} className="min-w-28">
          Next
        </Button>
      </div>
    </div>
  )
}
