# Phase 06 - Gallery & Events

## Overview

| Field | Value |
|-------|-------|
| Priority | P2 - Medium |
| Status | Pending |
| Effort | 4h |
| Dependencies | Phase 02 |

Build the gallery page with masonry layout, category filtering, and lightbox viewer. Build the events page with upcoming/past events, event detail cards, and RSVP capability.

## Key Insights

- Original has masonry gallery but no lightbox or filtering
- Category filtering (Food, Ambiance, Events) helps users find what they want
- Lightbox is essential - users expect to click and zoom on food/venue photos
- Events page is net-new - original has none. Melbourne cafe culture thrives on special events
- Events data is static JSON - no CMS needed for initial launch
- RSVP via EmailJS reuses existing email infrastructure

## Requirements

### Functional - Gallery
- Masonry grid layout with responsive columns (1/2/3 cols by breakpoint)
- Category filter tabs: All, Food, Ambiance, Events
- Lightbox on image click: full-screen overlay, prev/next arrows, close button, caption
- Image count badge per category
- Lazy loading with blur-up placeholder
- Smooth entrance animations (stagger on scroll)

### Functional - Events
- Upcoming events list (card layout, chronological)
- Past events section (collapsed by default, smaller cards)
- Event card: image, title, date/time, short description, "Learn More" / "RSVP" button
- Event detail: expanded view with full description, image gallery, RSVP form
- RSVP form: name, email, number of guests, submit via EmailJS
- "No upcoming events" empty state with "follow us on Instagram" CTA

### Non-Functional
- Gallery images lazy loaded (IntersectionObserver)
- Lightbox keyboard accessible (arrow keys, Escape)
- Images optimized as WebP with fallback
- Events page SEO: Schema.org Event structured data

## Architecture

### Gallery Component Tree
```
GalleryPage
├── SectionHeading ("Gallery")
├── GalleryFilterTabs
│   └── FilterTab[] (All, Food, Ambiance, Events) + count badges
├── MasonryGallery
│   └── GalleryImage[]
│       ├── LazyImage (blur-up)
│       └── ImageOverlay (caption on hover)
└── GalleryLightbox (dialog)
    ├── LightboxImage
    ├── LightboxCaption
    ├── PrevButton
    ├── NextButton
    ├── CloseButton
    └── ImageCounter ("3 of 24")
```

### Events Component Tree
```
EventsPage
├── SectionHeading ("Events")
├── UpcomingEventsSection
│   └── EventCard[] (or EmptyState)
│       ├── EventImage
│       ├── EventDate (formatted badge)
│       ├── EventTitle
│       ├── EventDescription (truncated)
│       └── EventActions (Details / RSVP)
├── PastEventsSection (collapsible)
│   └── PastEventCard[] (compact)
└── EventDetailDialog
    ├── EventImage (large)
    ├── EventTitle + DateTime
    ├── EventFullDescription
    ├── EventImageGallery (if multiple images)
    └── RSVPForm
        ├── NameInput
        ├── EmailInput
        ├── GuestCountSelect
        └── SubmitButton
```

### Data Models
```typescript
interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
  category: 'food' | 'ambiance' | 'events'
  width: number
  height: number
}

interface CafeEvent {
  id: string
  title: string
  description: string
  fullDescription: string
  date: string              // ISO date
  time: string              // "7:00 PM - 10:00 PM"
  image: string
  images?: string[]         // additional gallery
  price?: string            // "Free" or "$65 per person"
  capacity?: number
  rsvpEnabled: boolean
  isPast: boolean
  tags: string[]            // ["wine", "tasting", "dinner"]
}
```

## Related Code Files

### Files to Create
- `/src/pages/gallery-page.tsx` - Gallery page composition
- `/src/pages/events-page.tsx` - Events page composition
- `/src/components/gallery/masonry-gallery.tsx` - Masonry grid layout
- `/src/components/gallery/gallery-image.tsx` - Individual image with lazy loading
- `/src/components/gallery/gallery-filter-tabs.tsx` - Category filter tabs
- `/src/components/gallery/gallery-lightbox.tsx` - Fullscreen image viewer
- `/src/components/events/event-card.tsx` - Event preview card
- `/src/components/events/past-event-card.tsx` - Compact past event card
- `/src/components/events/event-detail-dialog.tsx` - Expanded event view
- `/src/components/events/rsvp-form.tsx` - RSVP email form
- `/src/components/events/events-empty-state.tsx` - No events fallback
- `/src/components/common/lazy-image.tsx` - Image with blur-up loading
- `/src/hooks/use-gallery-filter.ts` - Gallery category filtering
- `/src/hooks/use-lightbox.ts` - Lightbox open/close/navigation state
- `/src/data/gallery-data.json` - Gallery image entries
- `/src/data/events-data.json` - Events entries
- `/src/lib/types/gallery.ts` - Gallery types
- `/src/lib/types/events.ts` - Event types
- `/src/lib/schemas/rsvp-schema.ts` - RSVP Zod schema

### Files to Modify
- `/src/App.tsx` - Register /gallery and /events routes

## Implementation Steps

1. **Create data files**:
   - `gallery-data.json`: 20-30 images across categories with dimensions
   - `events-data.json`: 3-4 upcoming events + 2-3 past events

2. **Build LazyImage component**:
   - IntersectionObserver to trigger load when near viewport
   - Blur placeholder: tiny base64 thumbnail or CSS blur
   - Fade-in transition on load
   - Props: `src`, `alt`, `width`, `height`, `className`

3. **Build `useGalleryFilter` hook**:
   - State: `activeCategory` (default: 'all')
   - Filtered images memoized
   - Category counts computed

4. **Build `useLightbox` hook**:
   - State: `isOpen`, `currentIndex`
   - Methods: `open(index)`, `close()`, `next()`, `prev()`
   - Keyboard listener: ArrowLeft, ArrowRight, Escape
   - Disable body scroll when open

5. **Build GalleryFilterTabs**:
   - Tab buttons: All (24), Food (12), Ambiance (8), Events (4)
   - Active tab: accent underline
   - Framer Motion layout animation on filter change

6. **Build MasonryGallery**:
   - CSS columns approach: `columns: 3` desktop, `columns: 2` tablet, `columns: 1` mobile
   - `break-inside: avoid` on items
   - Stagger entrance animation

7. **Build GalleryImage**:
   - LazyImage with rounded corners
   - Hover overlay: dark gradient + caption text + zoom icon
   - Click: opens lightbox at this index

8. **Build GalleryLightbox** using shadcn Dialog:
   - Full screen overlay (`max-w-screen max-h-screen`)
   - Image centered with object-contain
   - Prev/Next arrow buttons on sides
   - Close button (X) top-right
   - Caption below image
   - Counter: "3 of 24"
   - Swipe gestures on mobile (Framer Motion drag)
   - Preload adjacent images

9. **Build GalleryPage** - Heading + FilterTabs + MasonryGallery + Lightbox

10. **Build EventCard**:
    - Image (aspect 16:9), date badge overlay (styled calendar icon)
    - Title (serif), time, short description (3-line clamp)
    - Price badge if applicable
    - "View Details" and "RSVP" buttons
    - Framer Motion hover lift

11. **Build EventDetailDialog**:
    - Large hero image
    - Full description (markdown or plain text)
    - Date, time, price, capacity info
    - Image gallery (horizontal scroll) if multiple images
    - RSVP form at bottom

12. **Build RSVPForm**:
    - Fields: Name, Email, Number of Guests (1-10)
    - Zod validation
    - Submit via EmailJS (same service as booking)
    - Success toast: "RSVP confirmed!"

13. **Build EventsEmptyState**:
    - Illustration/icon
    - "No upcoming events right now"
    - "Follow us on Instagram for announcements"
    - Social links

14. **Build EventsPage**:
    - Upcoming events (grid, 1-2 col)
    - Collapsible "Past Events" section
    - Empty state when no upcoming events

15. **Add Schema.org Event structured data** for each event

## Todo List

- [ ] Create gallery-data.json
- [ ] Create events-data.json
- [ ] Build LazyImage component
- [ ] Build useGalleryFilter hook
- [ ] Build useLightbox hook
- [ ] Build GalleryFilterTabs
- [ ] Build MasonryGallery
- [ ] Build GalleryImage
- [ ] Build GalleryLightbox
- [ ] Build GalleryPage
- [ ] Build EventCard
- [ ] Build PastEventCard
- [ ] Build EventDetailDialog
- [ ] Build RSVPForm
- [ ] Build EventsEmptyState
- [ ] Build EventsPage
- [ ] Add Schema.org Event data

## Success Criteria

- Gallery renders masonry layout with 20+ images
- Category filters update gallery instantly
- Lightbox opens, navigates with keyboard/swipe, closes properly
- Lazy loading: images load only when near viewport
- Events page shows upcoming and past events
- Event detail dialog opens with full info
- RSVP form validates and submits
- Empty state renders when no upcoming events
- Mobile: gallery is 1-column, lightbox is fullscreen swipeable

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Masonry layout breaks with varied image heights | Medium | Medium | Use CSS columns (native masonry) not JS-based |
| Lightbox accessibility gaps | Medium | Medium | Ensure focus trap, keyboard nav, screen reader labels |
| Large image gallery slow to load | Medium | High | Lazy load + WebP + srcset for responsive sizes |
| Events page empty at launch | High | Low | Seed with 3-4 sample events, good empty state |
