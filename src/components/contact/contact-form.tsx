import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact-schema'

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'booking', label: 'Booking Question' },
  { value: 'events', label: 'Events' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
] as const

export function ContactForm() {
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const messageValue = watch('message') ?? ''

  async function onSubmit(data: ContactFormData) {
    // Silently reject honeypot-filled submissions
    if (honeypot) return

    setIsSubmitting(true)
    try {
      // Simulate async send (replace with real integration)
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.log('Contact form submitted:', data)
      toast("Message sent! We'll respond within 24 hours.")
      reset()
    } catch {
      toast('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users */}
      <input
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          placeholder="Your name"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-subject">Subject</Label>
        <Select
          onValueChange={(val) =>
            setValue('subject', val as ContactFormData['subject'], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger
            id="contact-subject"
            className="w-full"
            aria-invalid={!!errors.subject}
          >
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subject && (
          <p className="text-xs text-destructive">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="contact-message">Message</Label>
          <span className="text-xs text-muted-foreground">
            {messageValue.length}/1000
          </span>
        </div>
        <Textarea
          id="contact-message"
          placeholder="How can we help you?"
          rows={5}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
