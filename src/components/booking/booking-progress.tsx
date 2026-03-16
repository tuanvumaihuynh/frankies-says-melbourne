import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookingProgressProps {
  currentStep: 1 | 2 | 3
}

const STEPS = [
  { label: 'Date & Time' },
  { label: 'Your Details' },
  { label: 'Confirm' },
]

export function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, index) => {
        const stepNum = (index + 1) as 1 | 2 | 3
        const isCompleted = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <div key={stepNum} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'size-9 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-colors',
                  isCompleted &&
                    'border-green-500 bg-green-500 text-white',
                  isActive &&
                    'border-accent bg-accent text-accent-foreground',
                  !isCompleted &&
                    !isActive &&
                    'border-muted-foreground/30 bg-transparent text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium whitespace-nowrap',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-16 sm:w-24 mx-2 mb-5 transition-colors',
                  stepNum < currentStep ? 'bg-green-500' : 'bg-muted-foreground/20'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
