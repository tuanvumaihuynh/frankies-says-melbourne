# Phase 08 - Integrations

## Overview

| Field | Value |
|-------|-------|
| Priority | P2 - Medium |
| Status | Pending |
| Effort | 4h |
| Dependencies | Phases 03-07 |

Wire up cross-cutting integrations: newsletter signup (email collection), Google Analytics 4, SEO (meta tags, Schema.org, sitemap, robots.txt), social media embeds, and OpenGraph tags for link sharing.

## Key Insights

- Original site has no analytics - can't measure conversion or popular content
- No structured data = poor Google rich snippet appearance
- Newsletter is low-effort high-value: builds direct customer channel
- OG tags critical for Instagram/Facebook link sharing (cafe audience shares a lot)
- SEO improvements are multiplicative - one-time setup, ongoing benefit
- react-helmet-async handles per-page meta tags in SPA

## Requirements

### Functional
- Newsletter signup: email input in footer + dedicated section on home page
  - Validates email, stores in localStorage (future: connect to Mailchimp/ConvertKit)
  - Success toast, duplicate detection
- Google Analytics 4: page views, booking form starts, booking submissions, menu tab clicks, gallery views
- SEO per page: title, description, canonical URL, OG image
- Schema.org structured data:
  - `Restaurant` / `LocalBusiness` (site-wide)
  - `Menu` + `MenuItem` (menu page)
  - `Event` (events page)
  - `FAQPage` (contact page)
- sitemap.xml (static, generated at build time)
- robots.txt allowing all crawlers
- OG tags: title, description, image, type for every page
- Twitter card meta tags

### Non-Functional
- Analytics script loaded async, non-blocking
- Newsletter signup < 500ms response
- SEO: all pages have unique title + description
- Structured data validates with Google Rich Results Test

## Architecture

### SEO Component
```
SEOHead (react-helmet-async)
├── title
├── meta description
├── canonical link
├── og:title, og:description, og:image, og:url, og:type
├── twitter:card, twitter:title, twitter:description, twitter:image
└── JSON-LD script (structured data per page)
```

### Analytics Events
```
GA4 Events:
├── page_view (automatic via router)
├── booking_start (step 1 entered)
├── booking_submit (form submitted)
├── menu_tab_change (day/night/special)
├── menu_search (search query)
├── menu_filter (dietary filter applied)
├── gallery_lightbox_open (image viewed)
├── event_rsvp (RSVP submitted)
├── newsletter_signup (email submitted)
├── contact_form_submit (form submitted)
└── cta_click (book a table buttons)
```

### Newsletter Flow
```
User enters email → Zod validate → Check localStorage duplicates
→ Store in localStorage (temporary) → Toast "Subscribed!"
→ Future: POST to Mailchimp/ConvertKit API
```

## Related Code Files

### Files to Create
- `/src/components/common/seo-head.tsx` - Per-page meta tags via react-helmet-async
- `/src/lib/analytics.ts` - GA4 event tracking helpers
- `/src/lib/structured-data.ts` - JSON-LD schema generators
- `/src/lib/seo-config.ts` - Per-route SEO configuration (title, description, OG)
- `/src/hooks/use-analytics.ts` - Hook for tracking page views + events
- `/src/hooks/use-newsletter.ts` - Newsletter signup logic
- `/public/sitemap.xml` - Static sitemap
- `/public/robots.txt` - Crawler directives

### Files to Modify
- `/src/main.tsx` - Wrap with HelmetProvider
- `/src/components/layout/root-layout.tsx` - Add analytics page view tracking
- `/src/components/layout/footer.tsx` - Connect newsletter signup
- `/src/components/layout/newsletter-signup.tsx` - Wire to useNewsletter hook
- `/src/pages/home-page.tsx` - Add SEOHead
- `/src/pages/menu-page.tsx` - Add SEOHead + Menu schema
- `/src/pages/booking-page.tsx` - Add SEOHead + analytics events
- `/src/pages/events-page.tsx` - Add SEOHead + Event schema
- `/src/pages/gallery-page.tsx` - Add SEOHead
- `/src/pages/about-page.tsx` - Add SEOHead + LocalBusiness schema
- `/src/pages/contact-page.tsx` - Add SEOHead + FAQ schema
- `/index.html` - Add GA4 script tag

### Dependencies to Install
- `react-helmet-async` - Per-page meta tags in React SPA

## Implementation Steps

1. **Install react-helmet-async**:
   ```bash
   npm install react-helmet-async
   ```

2. **Create seo-config.ts** - Map of route → SEO data:
   ```typescript
   export const seoConfig: Record<string, SEOData> = {
     '/': {
       title: 'Frankie Says Melbourne | Brunch Cafe & Evening Dining',
       description: 'Melbourne\'s favorite brunch cafe. Fresh seasonal menus...',
       ogImage: '/og/home.jpg',
     },
     '/menu': { ... },
     '/booking': { ... },
     // ...
   }
   ```

3. **Build SEOHead component**:
   - Props: `title`, `description`, `ogImage`, `canonicalPath`, `structuredData`
   - Renders `<Helmet>` with all meta tags
   - Appends site name: `${title} | Frankie Says`
   - Default OG image fallback

4. **Build structured-data.ts** - Generator functions:
   - `generateRestaurantSchema()` - LocalBusiness + Restaurant
   - `generateMenuSchema(menuData)` - Menu + MenuSection + MenuItem
   - `generateEventSchema(event)` - Event with date, location, offers
   - `generateFAQSchema(faqItems)` - FAQPage with Question/Answer

5. **Setup Google Analytics 4**:
   - Add gtag.js script to `index.html` (async, defer)
   - Use placeholder measurement ID: `G-XXXXXXXXXX` (configured via env var)
   - Create `lib/analytics.ts` with typed event functions:
     ```typescript
     export function trackEvent(name: string, params?: Record<string, unknown>) {
       if (window.gtag) {
         window.gtag('event', name, params)
       }
     }
     ```

6. **Build useAnalytics hook**:
   - Auto-track page views on route change
   - Expose `trackEvent` function for component use
   - Respect "Do Not Track" browser setting
   - No-op in development mode

7. **Add analytics events** to existing components:
   - BookingForm: `booking_start`, `booking_submit`
   - MenuTabs: `menu_tab_change`
   - SearchInput: `menu_search` (debounced, only on meaningful queries)
   - DietaryFilterGroup: `menu_filter`
   - GalleryLightbox: `gallery_lightbox_open`
   - RSVPForm: `event_rsvp`
   - ContactForm: `contact_form_submit`
   - All "Book a Table" buttons: `cta_click`

8. **Build useNewsletter hook**:
   - `subscribe(email)`: validate → check duplicates → store → toast
   - Uses localStorage key `frankies_newsletter_subscribers`
   - Returns: `{ subscribe, isSubscribed, isLoading }`
   - Future: replace localStorage with API call to email service

9. **Wire newsletter** into footer NewsletterSignup component

10. **Create sitemap.xml**:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://frankiesaysmelbourne.com/</loc><priority>1.0</priority></url>
      <url><loc>https://frankiesaysmelbourne.com/menu</loc><priority>0.9</priority></url>
      ...
    </urlset>
    ```

11. **Create robots.txt**:
    ```
    User-agent: *
    Allow: /
    Sitemap: https://frankiesaysmelbourne.com/sitemap.xml
    ```

12. **Add SEOHead to every page** with route-specific config

13. **Add structured data to relevant pages**:
    - About: Restaurant + LocalBusiness
    - Menu: Menu schema
    - Events: Event schema per event
    - Contact: FAQPage schema

14. **Update index.html** with default OG tags (fallback for crawlers that don't execute JS)

## Todo List

- [ ] Install react-helmet-async
- [ ] Create seo-config.ts with per-route data
- [ ] Build SEOHead component
- [ ] Build structured-data.ts generators
- [ ] Setup GA4 script in index.html
- [ ] Build analytics.ts event helpers
- [ ] Build useAnalytics hook
- [ ] Add analytics events to all interactive components
- [ ] Build useNewsletter hook
- [ ] Wire newsletter to footer
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Add SEOHead to all pages
- [ ] Add structured data to relevant pages
- [ ] Update index.html with fallback OG tags

## Success Criteria

- Every page has unique title + description + OG tags
- Schema.org JSON-LD validates in Google Rich Results Test
- GA4 receives page_view events on navigation
- All interactive events fire correctly in GA4 debug mode
- Newsletter signup stores email and shows success toast
- Duplicate email detection works
- sitemap.xml accessible at /sitemap.xml
- robots.txt accessible at /robots.txt
- Social sharing preview shows correct title/image/description

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| GA4 blocked by ad blockers | High | Medium | Accept - analytics is best-effort, not critical path |
| SPA meta tags not picked up by crawlers | Medium | High | Add static fallback OG tags in index.html, consider prerendering |
| Newsletter localStorage fills up | Low | Low | Cap at 1000 entries, prune oldest |
| Structured data errors | Medium | Medium | Validate with Google Rich Results Test tool |
