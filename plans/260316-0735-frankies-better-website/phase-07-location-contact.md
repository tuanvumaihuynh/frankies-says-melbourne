# Phase 07 - Location & Contact

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical |
| Status | Pending |
| Effort | 4h |
| Dependencies | Phase 02 |

Build the About/Location page with brand story, Google Maps embed, operating hours with live status, transport/parking info. Build the Contact page with multi-channel options (form, phone, WhatsApp), FAQ accordion, and social links.

## Key Insights

- Original site lacks prominent hours display and map - top-requested info for any restaurant
- Google Maps embed is free and adds credibility + wayfinding
- Multi-channel contact (not just email form) reduces friction for different user preferences
- FAQ accordion deflects common questions, reducing email volume
- WhatsApp link is increasingly expected in Melbourne's hospitality scene
- About page builds brand connection - important for experiential dining

## Requirements

### Functional - About/Location Page
- Brand story section with 2-3 paragraphs + interior photo
- Team/values section (optional, if content available)
- Google Maps embed (iframe) with venue pin
- Operating hours table with "Open Now" / "Closed" live status
- Today's hours highlighted
- Address with "Copy" button and "Get Directions" link (Google Maps deep link)
- Transport info: nearest tram/train, parking options
- Photo of exterior (helps customers find the venue)

### Functional - Contact Page
- Contact form: name, email, subject dropdown, message, submit via EmailJS
- Phone number: click-to-call link
- WhatsApp: click-to-chat link with pre-filled message
- Email: mailto link
- FAQ accordion (6-8 common questions)
- Social media links with icons
- Business hours summary

### Non-Functional
- Google Maps loads lazily (not on initial page load)
- Contact form has honeypot anti-spam field
- FAQ content indexed by search engines (schema.org FAQ)
- All contact methods accessible via keyboard

## Architecture

### About Page Component Tree
```
AboutPage
├── AboutHero (interior photo + overlay title)
├── BrandStorySection
│   ├── StoryImage
│   └── StoryContent (paragraphs)
├── LocationSection
│   ├── SectionHeading ("Find Us")
│   ├── AddressCard
│   │   ├── AddressText (with copy button)
│   │   ├── GetDirectionsLink
│   │   └── TransportInfo
│   │       ├── TramInfo
│   │       ├── ParkingInfo
│   │       └── ExteriorPhoto
│   └── GoogleMapEmbed (lazy iframe)
├── HoursSection
│   ├── SectionHeading ("Opening Hours")
│   ├── OpenStatusBadge (live)
│   └── HoursTable (Mon-Sun, today highlighted)
└── BookingCTABanner
```

### Contact Page Component Tree
```
ContactPage
├── ContactHeader
│   ├── SectionHeading ("Get in Touch")
│   └── ContactDescription
├── ContactChannels
│   ├── ContactMethodCard (Phone - click to call)
│   ├── ContactMethodCard (WhatsApp - click to chat)
│   ├── ContactMethodCard (Email - mailto)
│   └── ContactMethodCard (Visit - address + link)
├── ContactFormSection
│   ├── ContactForm
│   │   ├── NameInput
│   │   ├── EmailInput
│   │   ├── SubjectSelect (General, Booking, Events, Feedback, Other)
│   │   ├── MessageTextarea
│   │   ├── HoneypotField (hidden)
│   │   └── SubmitButton
│   └── FormSuccessState
├── FAQSection
│   ├── SectionHeading ("Frequently Asked")
│   └── FAQAccordion
│       └── AccordionItem[] (question/answer pairs)
├── SocialSection
│   └── SocialIconLink[] (Instagram, TikTok, Facebook)
└── LocationPreview (mini hours + map)
```

### Data Models
```typescript
interface ContactMethod {
  id: string
  icon: LucideIcon
  label: string
  value: string
  href: string
  description: string
}

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface LocationInfo {
  address: string
  suburb: string
  state: string
  postcode: string
  country: string
  lat: number
  lng: number
  googleMapsUrl: string
  transport: {
    tram: string
    train: string
    parking: string
  }
}
```

## Related Code Files

### Files to Create
- `/src/pages/about-page.tsx` - About/location page
- `/src/pages/contact-page.tsx` - Contact page
- `/src/components/about/brand-story-section.tsx` - Story content
- `/src/components/about/location-section.tsx` - Map + address
- `/src/components/about/google-map-embed.tsx` - Lazy Maps iframe
- `/src/components/about/address-card.tsx` - Address with copy + directions
- `/src/components/about/hours-section.tsx` - Hours table with live status
- `/src/components/about/hours-table.tsx` - Mon-Sun hours display
- `/src/components/about/transport-info.tsx` - Tram/train/parking
- `/src/components/contact/contact-channels.tsx` - Multi-channel cards
- `/src/components/contact/contact-method-card.tsx` - Individual channel card
- `/src/components/contact/contact-form.tsx` - Form with validation
- `/src/components/contact/faq-section.tsx` - FAQ accordion
- `/src/data/faq-data.json` - FAQ questions and answers
- `/src/data/location-data.json` - Address, coords, transport info
- `/src/lib/schemas/contact-schema.ts` - Contact form Zod schema

### Files to Modify
- `/src/App.tsx` - Register /about and /contact routes

## Implementation Steps

1. **Create data files**:
   - `location-data.json`: Address (use realistic Melbourne CBD area), lat/lng, transport info
   - `faq-data.json`: 8 common questions (hours, parking, reservations, dietary, private events, BYO, kids, accessibility)

2. **Build GoogleMapEmbed**:
   - Lazy-loaded iframe using IntersectionObserver
   - Google Maps embed URL with venue coordinates
   - Placeholder: static map image or skeleton until loaded
   - Responsive: full width, 400px height
   - Loading state with map icon + "Loading map..."

3. **Build AddressCard**:
   - Full address displayed
   - "Copy Address" button (Clipboard API + toast confirmation)
   - "Get Directions" link → opens Google Maps with destination
   - Styled card with location pin icon

4. **Build TransportInfo**:
   - Icon + text pairs: Tram, Train, Parking
   - E.g., "Tram: Routes 1, 6 - Stop 12 (1 min walk)"
   - "Parking: 2-hour street parking on Smith St"

5. **Build HoursTable**:
   - 7-row table: Day | Hours
   - Today's row highlighted with accent background
   - Closed days: "Closed" in muted text
   - Uses hours.json from Phase 02
   - Live "Open Now" / "Closed" badge at top (reuse useOpenStatus hook)

6. **Build BrandStorySection**:
   - 2-column: image (left) + text (right), stacks on mobile
   - 2-3 paragraphs about the cafe's origin, philosophy, community focus
   - Serif heading, sans body text
   - Warm, inviting tone

7. **Build AboutPage** - Hero + Story + Location + Hours + CTA

8. **Build ContactMethodCard**:
   - Icon, label, value, description
   - Click action varies: tel:, https://wa.me/, mailto:, link
   - Hover: accent border highlight
   - 4 cards in 2x2 grid (1 col mobile)

9. **Build ContactForm**:
   - Fields: Name, Email, Subject (Select), Message (Textarea)
   - Hidden honeypot field (`website` field, hidden via CSS, rejected if filled)
   - Zod validation
   - Submit via EmailJS (same service)
   - Success state: "Message sent! We'll respond within 24 hours."
   - Error state: "Failed to send. Please try calling us."

10. **Build FAQSection** using shadcn Accordion:
    - 8 FAQ items from data file
    - Single-open mode (only one expanded at a time)
    - Schema.org FAQPage structured data

11. **Build ContactPage** - Header + ContactChannels + Form + FAQ + Social + LocationPreview

12. **Add Schema.org structured data**:
    - `LocalBusiness` on About page (name, address, hours, geo, phone)
    - `FAQPage` on Contact page

## Todo List

- [ ] Create location-data.json
- [ ] Create faq-data.json
- [ ] Build GoogleMapEmbed (lazy iframe)
- [ ] Build AddressCard with copy + directions
- [ ] Build TransportInfo
- [ ] Build HoursTable with today highlight
- [ ] Build BrandStorySection
- [ ] Build AboutPage composition
- [ ] Build ContactMethodCard
- [ ] Build ContactChannels
- [ ] Build ContactForm with honeypot
- [ ] Build FAQSection accordion
- [ ] Build ContactPage composition
- [ ] Add Schema.org LocalBusiness data
- [ ] Add Schema.org FAQPage data

## Success Criteria

- About page shows brand story, map, hours, and transport info
- Google Maps loads lazily, shows correct location
- "Copy Address" works with clipboard + toast
- "Get Directions" opens Google Maps externally
- Hours table highlights today, shows open/closed status
- Contact form validates and submits via EmailJS
- Honeypot rejects bot submissions silently
- All 4 contact channels (phone, WhatsApp, email, visit) are functional
- FAQ accordion expands/collapses with smooth animation
- Mobile: all sections stack cleanly

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Google Maps embed blocked by ad blockers | Low | Medium | Static fallback image + address text |
| WhatsApp link format varies by platform | Low | Low | Use standard `https://wa.me/` format |
| FAQ content becomes outdated | Medium | Low | Easy to update JSON file |
| Contact form spam despite honeypot | Medium | Medium | Add rate limiting + consider reCAPTCHA if needed later |
