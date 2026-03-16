# Phase 05 - Booking System

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical |
| Status | Pending |
| Effort | 5h |
| Dependencies | Phase 02 |

Build a real booking experience with date/time picker, party size selector, availability calendar, multi-step form with validation, confirmation flow with booking reference, and email notification. Biggest UX upgrade over original's email-only booking.

## Key Insights

- Original: simple email form → "request sent" → manual email reply. No availability, no confirmation.
- No backend available → simulate availability client-side using rules-based logic (not random)
- Availability rules: based on time slots, max capacity per slot, day of week, blackout dates
- Multi-step form reduces cognitive load vs one giant form
- Booking reference gives user confidence and enables follow-up
- EmailJS sends confirmation to both cafe and customer

## Requirements

### Functional
- Multi-step booking form (3 steps):
  1. **Date & Time**: Calendar date picker, time slot selector, party size
  2. **Details**: Name, email, phone, special requests/dietary notes
  3. **Confirm**: Summary review + submit
- Calendar shows available dates (next 30 days, no past dates)
- Time slots in 30-min increments, filtered by day/night service hours
- Party size: 1-12 guests (dropdown or stepper)
- Simulated availability: some slots shown as "limited" or "unavailable"
- Form validation with Zod schemas per step
- Progress indicator (step 1/2/3)
- Booking confirmation screen with:
  - Booking reference number (e.g., "FS-20260316-A7K2")
  - Date, time, party size, name summary
  - "Add to Calendar" button (generates .ics file)
  - "We'll confirm within 2 hours" message
- Email notification via EmailJS (to cafe + confirmation to customer)

### Non-Functional
- Form state preserved across steps (no data loss on back)
- Keyboard accessible: date picker, time slots, all inputs
- Mobile-optimized: bottom sheet for date picker, large touch targets
- Form submission < 3s (EmailJS latency)
- Anti-spam: rate limit (1 booking per email per 5 minutes, stored in sessionStorage)

## Architecture

### Component Tree
```
BookingPage
├── BookingHeader
│   ├── SectionHeading
│   └── BookingDescription
├── BookingProgress (Step 1/2/3 indicator)
├── BookingForm
│   ├── Step 1: DateTimeStep
│   │   ├── CalendarDatePicker
│   │   ├── TimeSlotGrid
│   │   │   └── TimeSlot[] (available/limited/unavailable)
│   │   ├── PartySizeSelector
│   │   └── NextButton
│   ├── Step 2: DetailsStep
│   │   ├── NameInput
│   │   ├── EmailInput
│   │   ├── PhoneInput
│   │   ├── SpecialRequestsTextarea
│   │   ├── BackButton
│   │   └── NextButton
│   └── Step 3: ConfirmStep
│       ├── BookingSummary
│       ├── EditButtons (back to step 1/2)
│       ├── TermsCheckbox
│       └── SubmitButton
├── BookingConfirmation (post-submit)
│   ├── SuccessIcon
│   ├── ReferenceNumber
│   ├── BookingSummary
│   ├── AddToCalendarButton
│   ├── NextStepsInfo
│   └── NewBookingButton
└── BookingCTAInfo (sidebar: hours, phone, walk-ins welcome)
```

### Data Model
```typescript
interface BookingFormData {
  // Step 1
  date: Date
  timeSlot: string          // "09:00", "09:30", etc.
  partySize: number

  // Step 2
  name: string
  email: string
  phone: string
  specialRequests?: string

  // Generated
  referenceNumber?: string
}

interface TimeSlotConfig {
  time: string              // "09:00"
  label: string             // "9:00 AM"
  available: boolean
  status: 'available' | 'limited' | 'unavailable'
  remainingCapacity: number
}

interface AvailabilityConfig {
  maxCapacityPerSlot: number     // e.g., 8 tables
  dayServiceStart: string        // "07:00"
  dayServiceEnd: string          // "16:00"
  nightServiceStart: string      // "17:00"
  nightServiceEnd: string        // "23:00"
  slotIntervalMinutes: number    // 30
  blackoutDates: string[]        // ["2026-12-25"]
  reducedDays: string[]          // ["monday"] - fewer slots
}
```

### Availability Simulation Logic
```
1. Generate slots for selected date based on day-of-week service hours
2. Apply deterministic "availability" using hash of (date + slot) → consistent across sessions
3. Rules:
   - Weekday lunch (12-14): 60% full → "limited"
   - Weekend brunch (9-12): 80% full → "limited"
   - Friday/Saturday night (19-21): 70% full → "limited"
   - Some prime slots: "unavailable" (fully booked simulation)
   - Off-peak: always "available"
4. Blackout dates: all slots unavailable
```

### Zod Schemas
```typescript
const step1Schema = z.object({
  date: z.date().min(new Date(), 'Select a future date'),
  timeSlot: z.string().min(1, 'Select a time'),
  partySize: z.number().min(1).max(12),
})

const step2Schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^[\d\s+()-]{8,15}$/, 'Valid phone required'),
  specialRequests: z.string().max(500).optional(),
})
```

## Related Code Files

### Files to Create
- `/src/pages/booking-page.tsx` - Booking page composition
- `/src/components/booking/booking-progress.tsx` - Step indicator
- `/src/components/booking/booking-form.tsx` - Multi-step form container
- `/src/components/booking/date-time-step.tsx` - Step 1: date/time/party
- `/src/components/booking/calendar-date-picker.tsx` - Date calendar
- `/src/components/booking/time-slot-grid.tsx` - Available time slots
- `/src/components/booking/time-slot.tsx` - Individual slot button
- `/src/components/booking/party-size-selector.tsx` - Guest count picker
- `/src/components/booking/details-step.tsx` - Step 2: personal info
- `/src/components/booking/confirm-step.tsx` - Step 3: review + submit
- `/src/components/booking/booking-summary.tsx` - Reusable summary card
- `/src/components/booking/booking-confirmation.tsx` - Success screen
- `/src/components/booking/add-to-calendar-button.tsx` - .ics download
- `/src/hooks/use-booking-form.ts` - Multi-step form state management
- `/src/hooks/use-availability.ts` - Slot availability simulation
- `/src/lib/booking-utils.ts` - Reference number gen, .ics creation, availability hash
- `/src/lib/schemas/booking-schema.ts` - Zod validation schemas
- `/src/lib/email-service.ts` - EmailJS wrapper for booking notification
- `/src/data/availability-config.json` - Capacity + service hours config

### Files to Modify
- `/src/App.tsx` - Register /booking route

## Implementation Steps

1. **Create availability-config.json** with service hours, capacity, blackout dates

2. **Define Zod schemas** in `lib/schemas/booking-schema.ts` for each step

3. **Build `useBookingForm` hook**:
   - Uses React Hook Form with Zod resolver
   - Tracks current step (1-3)
   - `nextStep()` validates current step before advancing
   - `prevStep()` preserves data
   - `submit()` sends email and generates reference
   - Returns: `{ step, form, nextStep, prevStep, submit, isSubmitting }`

4. **Build `useAvailability` hook**:
   - Input: selected date
   - Output: array of `TimeSlotConfig`
   - Uses deterministic hash function: `hashCode(dateString + slotTime) % 100`
   - Maps hash ranges to availability status
   - Memoized per date

5. **Build booking-utils.ts**:
   - `generateReference()`: `FS-${YYYYMMDD}-${random4chars}`
   - `generateICS(booking)`: Creates .ics calendar file content
   - `downloadICS(booking)`: Triggers .ics file download
   - `hashSlotAvailability(date, time)`: Deterministic availability

6. **Build BookingProgress**:
   - 3 circles connected by lines
   - Active step: accent filled, label bold
   - Completed step: check icon, green
   - Future step: gray outline
   - Responsive: show labels on desktop, numbers on mobile

7. **Build CalendarDatePicker**:
   - Use shadcn Calendar component (built on react-day-picker)
   - Disable past dates and blackout dates
   - Highlight today
   - Max 30 days ahead
   - On select: trigger time slot refresh

8. **Build TimeSlotGrid**:
   - Grid of time slot buttons (3-4 columns)
   - Each slot: time label, availability indicator
   - Available: default style, clickable
   - Limited: amber badge "Few left", clickable
   - Unavailable: gray, disabled, strikethrough
   - Selected: accent border + filled
   - Grouped by service: "Morning" / "Afternoon" / "Evening"

9. **Build PartySizeSelector**:
   - Stepper (- / count / +) or Select dropdown
   - Range: 1-12
   - For 7+: show note "For parties of 7+, please call us"
   - Display as icons (person silhouettes) for small counts

10. **Build DateTimeStep** - Compose calendar + time grid + party size, "Next" button

11. **Build DetailsStep**:
    - Form fields: Name, Email, Phone, Special Requests (textarea)
    - Inline validation errors from Zod
    - Phone: optional country code hint for international guests
    - Special requests: character counter (500 max)
    - "Back" and "Next" buttons

12. **Build ConfirmStep**:
    - BookingSummary card showing all details
    - "Edit" links for each section (go to step 1 or 2)
    - Terms checkbox: "I understand this is a booking request"
    - "Confirm Booking" submit button
    - Loading state with spinner on submit

13. **Build email-service.ts**:
    - Wrap EmailJS `send()` with typed interface
    - Template params: name, email, date, time, party size, requests
    - Error handling with retry (1 retry)
    - Returns success/error status

14. **Build BookingConfirmation**:
    - Success checkmark animation (Framer Motion)
    - Reference number (large, copyable)
    - Booking details summary
    - "Add to Calendar" button → .ics download
    - "What's next" info: "We'll confirm via email within 2 hours"
    - "Make Another Booking" button

15. **Build BookingPage** composition:
    - Header + Progress + Form (or Confirmation)
    - Sidebar: booking info (hours, phone for walk-ins, location)
    - Responsive: sidebar below form on mobile

## Todo List

- [ ] Create availability-config.json
- [ ] Define Zod booking schemas
- [ ] Build useBookingForm hook
- [ ] Build useAvailability hook
- [ ] Build booking-utils (reference, ICS, hash)
- [ ] Build BookingProgress indicator
- [ ] Build CalendarDatePicker
- [ ] Build TimeSlotGrid + TimeSlot
- [ ] Build PartySizeSelector
- [ ] Build DateTimeStep
- [ ] Build DetailsStep with validation
- [ ] Build ConfirmStep with summary
- [ ] Build email-service.ts (EmailJS wrapper)
- [ ] Build BookingConfirmation screen
- [ ] Build BookingPage composition
- [ ] Test full booking flow end-to-end

## Success Criteria

- 3-step flow navigates forward/backward without data loss
- Calendar shows next 30 days, disables past/blackout
- Time slots reflect simulated availability consistently
- Party size limited to 1-12 with 7+ note
- All form fields validate per Zod schemas
- Confirmation shows reference number
- "Add to Calendar" downloads valid .ics file
- EmailJS sends notification (or graceful fallback if key not configured)
- Mobile: form is usable with large touch targets
- Full keyboard navigation through all steps

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Users expect real-time availability | High | High | Clear messaging: "booking request" not instant confirm |
| EmailJS rate limits on free tier | Medium | Medium | Implement client-side rate limiting, show fallback phone number |
| .ics file compatibility | Low | Low | Test in Google Calendar, Apple Calendar, Outlook |
| Spam bookings | Medium | Medium | Rate limit per email (sessionStorage), add honeypot field |
| Form abandoned mid-flow | Medium | Low | sessionStorage persistence of form state |

## Security Considerations

- Email validation prevents injection
- Phone regex prevents script injection
- Special requests field: max length, sanitize before email
- Rate limiting per session prevents spam
- EmailJS keys scoped to specific templates only
- No PII stored client-side beyond session
