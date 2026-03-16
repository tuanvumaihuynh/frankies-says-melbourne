import { Controller, type UseFormReturn } from 'react-hook-form'
import { addDays, startOfToday } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TimeSlotGrid } from './time-slot-grid'
import { PartySizeSelector } from './party-size-selector'
import { useAvailability } from '@/hooks/use-availability'
import type { Step1Data } from '@/lib/schemas/booking-schema'
import config from '@/data/availability-config.json'

interface DateTimeStepProps {
  form: UseFormReturn<Step1Data>
  onNext: () => void
}

export function DateTimeStep({ form, onNext }: DateTimeStepProps) {
  const { control, watch, setValue, formState: { errors } } = form
  const selectedDate = watch('date')
  const selectedTime = watch('timeSlot')
  const partySize = watch('partySize')

  const slots = useAvailability(selectedDate)

  const today = startOfToday()
  const maxDate = addDays(today, 30)

  const isBlackout = (date: Date) => {
    const str = date.toISOString().slice(0, 10)
    return config.blackoutDates.includes(str)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Select Date</Label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (date) {
                    field.onChange(date)
                    setValue('timeSlot', '')
                  }
                }}
                disabled={(date) =>
                  date < today || date > maxDate || isBlackout(date)
                }
                className="rounded-lg border p-3 w-full"
              />
            )}
          />
          {errors.date && (
            <p className="text-sm text-destructive">{errors.date.message}</p>
          )}
        </div>

        {/* Time slots */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Select Time</Label>
          {!selectedDate ? (
            <p className="text-sm text-muted-foreground py-4">
              Please select a date first.
            </p>
          ) : (
            <Controller
              control={control}
              name="timeSlot"
              render={({ field }) => (
                <TimeSlotGrid
                  slots={slots}
                  selected={field.value}
                  onSelect={(time) => field.onChange(time)}
                />
              )}
            />
          )}
          {errors.timeSlot && (
            <p className="text-sm text-destructive">{errors.timeSlot.message}</p>
          )}
        </div>
      </div>

      {/* Party size */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Party Size</Label>
        <Controller
          control={control}
          name="partySize"
          render={({ field }) => (
            <PartySizeSelector
              value={field.value ?? 2}
              onChange={field.onChange}
            />
          )}
        />
        {errors.partySize && (
          <p className="text-sm text-destructive">{errors.partySize.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onNext}
          disabled={!selectedDate || !selectedTime || !partySize}
          className="min-w-28"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
