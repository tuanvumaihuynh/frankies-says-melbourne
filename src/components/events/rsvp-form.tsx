import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { rsvpSchema, type RsvpFormData } from '@/lib/schemas/rsvp-schema'
import type { CafeEvent } from '@/lib/types/events'

interface RsvpFormProps {
  event: CafeEvent
  onSuccess?: () => void
}

export function RsvpForm({ event, onSuccess }: RsvpFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpSchema),
  })

  const onSubmit = async (data: RsvpFormData) => {
    // Simulate async submission (replace with EmailJS when configured)
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.info('RSVP submitted:', { event: event.title, ...data })
    toast.success('RSVP confirmed!', {
      description: `We'll see you at ${event.title}. Check your email for details.`,
    })
    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="rsvp-name">Name</Label>
        <Input
          id="rsvp-name"
          placeholder="Your full name"
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="rsvp-email">Email</Label>
        <Input
          id="rsvp-email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="rsvp-guests">Number of guests</Label>
        <Controller
          name="guestCount"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ? String(field.value) : ''}
              onValueChange={(val) => field.onChange(Number(val))}
            >
              <SelectTrigger id="rsvp-guests" className="w-full" aria-invalid={!!errors.guestCount}>
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.guestCount && (
          <p className="text-xs text-destructive">{errors.guestCount.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Sending RSVP…
          </>
        ) : (
          'Confirm RSVP'
        )}
      </Button>
    </form>
  )
}
