# Phase 03 - Home Page

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical |
| Status | Pending |
| Effort | 4h |
| Dependencies | Phase 02 |

Build the home page: hero section with parallax background, seasonal promotion banner, menu preview cards linking to full menu, booking CTA section, gallery preview, testimonials carousel, and about/location preview.

## Key Insights

- Home page is the primary conversion funnel: Hero → Menu Preview → Book CTA → Gallery tease
- Original site has strong visual storytelling - maintain with high-quality hero imagery
- Parallax creates depth without heavy animation cost
- Seasonal promotions (e.g., Winter Series) should be configurable via data file
- Multiple "Book a Table" CTAs at strategic scroll points increase conversion

## Requirements

### Functional
- Full-viewport hero with background image, overlay, headline, tagline, 2 CTA buttons (Menu / Book)
- Parallax scroll effect on hero background
- Seasonal promotion banner (configurable via data)
- Menu preview: 3 cards (Day / Night / Special) with image, description, "View Menu" link
- Booking CTA section: dark background, compelling copy, "Reserve Your Table" button
- Gallery preview: 6 images in masonry, "View Gallery" link
- Testimonials carousel: 3-5 customer quotes with star ratings
- About preview: short brand story + "Learn More" link
- Location teaser: address + mini map preview + "Get Directions" link

### Non-Functional
- Hero image loads within LCP budget (< 2.5s) - use optimized WebP, preload
- Smooth parallax at 60fps on desktop, disabled on mobile (performance)
- Lazy load all below-fold images
- Skeleton screens while images load

## Architecture

### Component Tree
```
HomePage
├── HeroSection
│   ├── ParallaxBackground (optimized WebP hero image)
│   ├── HeroOverlay (gradient)
│   ├── HeroContent
│   │   ├── h1 (Frankie Says)
│   │   ├── p (tagline)
│   │   ├── CTAButton → /menu
│   │   └── CTAButton → /booking
│   └── ScrollIndicator (animated chevron)
├── PromotionBanner (seasonal, configurable)
├── MenuPreviewSection
│   ├── SectionHeading
│   └── MenuPreviewCard[] (x3: Day, Night, Special)
│       ├── Image
│       ├── Title + Description
│       └── ViewMenuLink
├── BookingCTASection
│   ├── BackgroundPattern
│   ├── Heading + Description
│   └── CTAButton → /booking
├── GalleryPreviewSection
│   ├── SectionHeading
│   ├── MasonryGrid (6 images)
│   └── ViewGalleryLink
├── TestimonialsSection
│   ├── SectionHeading
│   └── TestimonialCarousel
│       └── TestimonialCard[] (quote, name, stars)
└── AboutPreviewSection
    ├── Image (cafe interior)
    ├── StoryText
    ├── LearnMoreLink → /about
    └── LocationTeaser (address + mini map)
```

### Data Dependencies
- `data/promotions.json` - Current seasonal promotions
- `data/testimonials.json` - Customer testimonials
- `data/gallery.json` - Image paths + alt text
- Hero image in `assets/images/hero/`

## Related Code Files

### Files to Create
- `/src/pages/home-page.tsx` - Home page composition
- `/src/components/home/hero-section.tsx` - Full viewport hero with parallax
- `/src/components/home/promotion-banner.tsx` - Seasonal promo strip
- `/src/components/home/menu-preview-section.tsx` - 3 menu cards
- `/src/components/home/menu-preview-card.tsx` - Individual menu card
- `/src/components/home/booking-cta-section.tsx` - Dark CTA band
- `/src/components/home/gallery-preview-section.tsx` - 6-image teaser
- `/src/components/home/testimonials-section.tsx` - Carousel with quotes
- `/src/components/home/about-preview-section.tsx` - Brand story teaser
- `/src/components/common/section-heading.tsx` - Reusable section title + subtitle
- `/src/components/common/scroll-indicator.tsx` - Animated down arrow
- `/src/hooks/use-parallax.ts` - Scroll-based transform offset
- `/src/data/promotions.json` - Seasonal promotion data
- `/src/data/testimonials.json` - Customer reviews
- `/src/data/gallery-images.json` - Gallery image metadata

## Implementation Steps

1. **Create data files**:
   - `promotions.json`: Array of `{ id, title, description, badge, active, startDate, endDate }`
   - `testimonials.json`: Array of `{ id, name, quote, rating, date, source }`
   - `gallery-images.json`: Array of `{ id, src, alt, category, width, height }`

2. **Build `useParallax` hook**:
   - Track scroll position, compute offset as `scrollY * speed` (speed = 0.3-0.5)
   - Use `transform: translateY()` for GPU acceleration
   - Disable on mobile via `window.matchMedia('(prefers-reduced-motion: reduce)')` and `(max-width: 768px)`

3. **Build SectionHeading component** (reused across all pages):
   - Props: `title`, `subtitle`, `align` (left/center)
   - Serif font (Playfair) for title, sans for subtitle
   - Decorative divider line below

4. **Build HeroSection**:
   - Full viewport height (`h-screen`)
   - Background: WebP image with `object-cover`, parallax transform
   - Gradient overlay: `bg-gradient-to-b from-black/50 via-black/30 to-black/60`
   - Content centered: Large serif heading "Frankie Says", tagline, 2 buttons
   - Primary CTA: "Explore Our Menu" (filled button)
   - Secondary CTA: "Book a Table" (outline button)
   - ScrollIndicator at bottom: animated bouncing chevron-down

5. **Build PromotionBanner**:
   - Read active promotion from `promotions.json`
   - Warm accent background (`bg-accent/10`)
   - Badge + title + description + optional CTA
   - Dismissible (X button, stored in sessionStorage)
   - Framer Motion entrance animation (slide down)

6. **Build MenuPreviewSection**:
   - 3-column grid (1 col mobile, 3 col desktop)
   - Each `MenuPreviewCard`: image (aspect-4/3, rounded), overlay on hover, title, short description, "View Menu →" link
   - Cards: Day Menu, Night Menu, Special/Seasonal
   - Framer Motion stagger animation on scroll into view

7. **Build BookingCTASection**:
   - Dark background (`bg-stone-900`) with subtle pattern/texture
   - White text: "Reserve Your Experience"
   - Subtext about the dining experience
   - Large "Book a Table" button with accent color
   - Framer Motion scale-up on scroll into view

8. **Build GalleryPreviewSection**:
   - Masonry grid: 3 columns, 6 images
   - Images: rounded, hover zoom effect (`scale-105` on hover)
   - "View Full Gallery →" link at bottom
   - Lazy loaded with IntersectionObserver

9. **Build TestimonialsSection**:
   - Horizontal carousel (CSS scroll-snap or Framer Motion drag)
   - Each card: quote icon, text, author name, star rating (Lucide Star icons)
   - Auto-advance every 5s, pause on hover
   - Dot indicators at bottom

10. **Build AboutPreviewSection**:
    - 2-column layout (image left, text right)
    - Cafe interior photo
    - Short brand story (2-3 paragraphs)
    - "Our Story →" link to /about
    - Location teaser: address, "Open Now" badge, "Get Directions" button

11. **Compose HomePage** - Stack all sections with consistent vertical spacing (`space-y-24` or similar)

12. **Add scroll-triggered animations** - Use Framer Motion `useInView` for staggered entrance animations on each section

## Todo List

- [ ] Create promotions.json data file
- [ ] Create testimonials.json data file
- [ ] Create gallery-images.json data file
- [ ] Build useParallax hook
- [ ] Build SectionHeading component
- [ ] Build HeroSection with parallax
- [ ] Build PromotionBanner
- [ ] Build MenuPreviewCard component
- [ ] Build MenuPreviewSection
- [ ] Build BookingCTASection
- [ ] Build GalleryPreviewSection
- [ ] Build TestimonialsSection carousel
- [ ] Build AboutPreviewSection
- [ ] Compose HomePage
- [ ] Add scroll-triggered animations
- [ ] Optimize hero image (WebP, preload)

## Success Criteria

- Hero renders full-viewport with parallax (desktop), static (mobile)
- All sections visible with proper spacing and responsive layout
- Menu cards link to /menu with correct tab selection
- Book CTA links to /booking
- Gallery preview shows 6 images in masonry
- Testimonials auto-rotate
- LCP < 2.5s (hero image optimization)
- No layout shifts during image loading

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Hero image LCP too slow | High | High | Preload WebP, use `fetchpriority="high"`, resize to viewport |
| Parallax jank on low-end devices | Medium | Medium | Disable on mobile, use `will-change: transform` |
| Testimonial carousel accessibility | Medium | Medium | Add aria-roledescription, keyboard nav, pause button |
| Too many images on home page | Medium | Medium | Lazy load everything below fold, use intersection observer |
