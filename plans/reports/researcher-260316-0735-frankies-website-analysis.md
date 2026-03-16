# Frankie Says Melbourne Website Analysis Report

**Date:** 2026-03-16 | **Analyst:** Researcher | **Domain:** frankiesaysmelbourne.com

---

## Executive Summary

Frankie Says Melbourne is a brunch cafe with an elegantly designed single-page application (SPA) website. The site prioritizes menu discovery, reservations, and social media engagement. Built with modern React architecture and deployed on Vercel, it demonstrates contemporary web design practices with a focus on user experience.

---

## Website Overview

| Property | Value |
|----------|-------|
| **Domain** | frankiesaysmelbourne.com |
| **Business Type** | Brunch Cafe & Events Venue |
| **Primary Function** | Menu showcase, table reservations, contact |
| **Build Type** | Single Page Application (SPA) |
| **Deployment** | Vercel |
| **Last Updated** | March 10, 2026 |
| **Social Media** | Instagram, TikTok, Facebook |

---

## Tech Stack Analysis

### Frontend Framework & Build
- **Framework:** React (Production build)
- **Build Tool:** Vite (evidenced by chunked asset naming: `index-{hash}.js`)
- **Styling:** Tailwind CSS (utility-first framework)
- **Component Library:** Radix UI (accessibility primitives)
- **Icon Library:** Lucide React v0.462.0
- **Fonts:** Google Fonts (Playfair Display, Inter)

### Server & Infrastructure
- **Hosting Platform:** Vercel (indicated by `server: Vercel` header)
- **Protocol:** HTTP/2 with gzip compression
- **Cache Strategy:** `max-age=0, must-revalidate` (fresh on every request)
- **Security:** HSTS enabled (strict-transport-security: max-age=63072000)
- **CDN:** Vercel's global edge network (x-vercel-cache)

### Third-Party Integrations
- **Email Service:** EmailJS (contact form backend)
  - Service endpoint: `https://api.emailjs.com`
  - Handles form submissions for reservations/inquiries
- **Social Media Links:**
  - Instagram: `@frankiesaysmelb`
  - TikTok: `@frankiesayscafe`
  - Facebook: Community group (limited link visible)

---

## Site Structure & Navigation

### Routes/Pages (5 total)
```
/ (Home)
├── /day (Day Menu with booking)
├── /night (Night Menu with reservations)
├── /contact (Contact & Inquiry Form)
└── /* (404 Error Page)
```

### Main Navigation Areas
1. **Home** - Landing/hero section
2. **Menu Full Size** - Access point to explore menus
3. **Open menu** - Mobile menu toggle
4. **Book a Table** - Primary CTA for reservations

---

## Content Sections & Features

### Menu System (Dual Mode)
- **Day Menu** - Seasonal brunch dishes with local sourcing focus
  - Description: "Fresh seasonal brunch menu with locally sourced ingredients, bright flavors, and cosy comforts"
  - Visual: Menu displayed as image asset (`day-menu-CbA6y5BG.png`)

- **Night Menu** - Evening small plates & wine pairings
  - Description: "Sophisticated small plates designed to pair perfectly with extensive wine selection"
  - Visual: Menu displayed as image asset (`night-menu-CgmdjJE_.png`)

- **Special Menu** - Seasonal items (Winter Series prominently featured)
  - Asset: `special-menu-uhQ80eRU.png`
  - Current: Winter Series with 3 comforting new dishes

### Booking/Reservation System
- **Route:** `/day#booking` - Deep linking to booking section
- **Feature:** "Book a Table" / "Book Your Table Today" CTAs
- **Functionality:**
  - Form-based table reservations
  - Booking request submission
  - Toast notifications for success/failure states
  - Status messages: "Booking Request Sent!" & "Booking Failed"

### Contact & Inquiry System
- **Route:** `/contact`
- **Purpose:** Questions about menu, reservations, general inquiries
- **Integration:** EmailJS for form backend
- **Features:**
  - Form validation
  - Toast notification system
  - Error handling with user feedback

### Gallery/Visual Content
- **Gallery Layout:** Masonry grid layout (`gallery-masonry-item`)
- **Styling:** `overflow-hidden rounded-lg` with smooth transitions
- **Intent:** Visual storytelling for venue atmosphere

---

## Design & UX Approach

### Visual Design Philosophy
- **Typography Strategy:**
  - Serif (Playfair Display): Headlines, emphasis
  - Sans-serif (Inter): Body text, interface elements
  - Hierarchy: 400 & 700 weight options

- **Design System:** Utility-first (Tailwind)
  - Consistent spacing, rounded corners
  - Accessible color contrasts
  - Responsive design (mobile-first approach evident)

### User Experience Features
- **Mobile Navigation:** Context menu support with `data-[state=open]` patterns
- **Accessibility:** Radix UI primitives provide WCAG-compliant components
- **Interaction Patterns:**
  - Toast notifications for feedback
  - Loading states on form submission
  - Error recovery messaging
  - Focus management in modals/dialogs

### Visual Assets Strategy
- Menu items displayed as high-quality PNG images (lazy loadable)
- Asset hashing enables aggressive caching
- Consistent sizing: `day-menu`, `night-menu`, `special-menu` pattern

---

## Functionality Breakdown

### 1. Menu Discovery
- **Status:** Active, dual menu system
- **Interaction:** Image-based menus with descriptive text
- **Updates:** Seasonal rotation (currently winter-focused)

### 2. Table Reservations
- **Status:** Implemented, email-backed
- **Integration:** EmailJS API
- **UX:** Inline booking form with validation & feedback
- **Deep Linking:** `/day#booking` enables direct navigation

### 3. Contact/Inquiries
- **Status:** Implemented via dedicated route
- **Integration:** EmailJS form submission
- **Fields:** Standard contact form (name, email, message implied)
- **Feedback:** Toast notifications on success/failure

### 4. Social Media Integration
- **Status:** Link-based (not embedded feeds)
- **Channels:** Instagram (primary), TikTok, Facebook
- **Intent:** Drive off-site engagement

### 5. Gallery Display
- **Status:** Implemented with masonry layout
- **Purpose:** Visual atmosphere/ambiance showcase
- **Layout:** Break-inside-avoid masonry grid

---

## What Works Well

### Strengths
1. **Performance:** Vercel deployment with edge caching (age: 466850s cache hits)
2. **Modern UX:** React SPA provides instant page transitions without full reloads
3. **Mobile-Responsive:** Tailwind utility approach ensures consistent mobile experience
4. **Accessibility:** Radix UI primitives ensure WCAG compliance
5. **Email Integration:** EmailJS provides reliable contact/booking without backend infrastructure
6. **Clear CTA Hierarchy:** Multiple "Book a Table" touchpoints guide user actions
7. **Content Organization:** Logical menu structure (Day/Night/Special) matches cafe operations
8. **Typography:** Serif/sans-serif pairing creates visual sophistication matching cafe brand
9. **Security:** HSTS enabled, proper cache headers, no sensitive data exposure
10. **Visual Storytelling:** Gallery masonry + menu images create immersive experience

---

## Areas for Improvement

### Technical Enhancements
1. **Online Booking Backend:** EmailJS is workaround; dedicated booking system would enable:
   - Automatic availability checking
   - Real-time confirmations instead of "request sent" model
   - Integration with POS or reservation software (e.g., Resy, Yelp Reservations)
   - Automated confirmation/reminder emails

2. **Analytics Gap:** No visible analytics integration (Google Analytics, Mixpanel, etc.)
   - Recommend: Track conversion funnel (view menu → booking click → form submit)
   - Monitor menu interest by season
   - Identify high-engagement content

3. **SEO Optimization:** Limited meta tags visible
   - Add structured data (Schema.org: LocalBusiness, Menu, Event)
   - Dynamic meta tags for menu pages
   - Sitemap and robots.txt

4. **Performance:**
   - Images in gallery: Consider modern formats (WebP) with fallbacks
   - Lazy loading strategy for below-fold content
   - Image optimization for menu PDFs (currently PNG)

### Content & Feature Gaps
5. **Event Calendar:** No visible event listings or special events promotion
   - Recommend: Add `/events` route for special dinners, tastings, private events
   - Integration with calendar embed (Google Calendar, Eventbrite)

6. **Operating Hours:** Not prominently visible in analysis
   - Add sticky header with hours + "currently open/closed" status
   - Integration with Google Business Profile for reliability

7. **Location & Map:** No embedded map for directions/discovery
   - Add Google Maps embed
   - Parking information
   - Public transport directions

8. **Menu Depth:** Menus displayed as images only
   - Consider: Searchable text menu alongside images
   - Dietary restriction filters (vegan, GF, allergies)
   - Price visibility
   - Wine pairing information

9. **Review/Testimonial Section:** Missing customer social proof
   - Embed Google Reviews, Yelp reviews, TripAdvisor ratings
   - Customer testimonials carousel
   - Rating badges

10. **Newsletter/CRM:** No email signup visible
    - Build mailing list for new menu announcements
    - Special promotional offers
    - Event invitations

### UX/Usability Improvements
11. **Booking Confirmation:** Current "request sent" workflow unclear
    - Specify: What happens next? When will customer hear back?
    - Provide order confirmation number
    - Show estimated response time

12. **Multi-Language Support:** Not detected
    - Melbourne's diversity might warrant language options
    - At least consider translations for common tour languages

13. **Accessibility Enhancements:**
    - Menu images need alt text descriptions
    - Keyboard navigation for all interactive elements
    - Color contrast verification (especially on buttons)

14. **Loading States:** Add skeleton screens while page components load
    - Improves perceived performance
    - Reduces layout shift (CLS)

15. **Contact Options:** Only form visible
    - Phone number for quick reservations
    - WhatsApp/Direct Message integration
    - Live chat for urgent inquiries

---

## Technical Debt & Maintenance Notes

### Current Observations
- React production bundle: 402.4KB (moderate size)
- No visible service worker (PWA capabilities limited)
- EmailJS public key exposure risk: Verify API keys are properly scoped in production
- Asset versioning: Hash-based approach is solid for cache invalidation

### Recommendations
1. Implement rate limiting on EmailJS forms to prevent spam
2. Add form CAPTCHA to contact/booking routes
3. Monitor EmailJS quota usage and cost scaling
4. Periodic security audit of external service integrations
5. Set up error tracking (Sentry, LogRocket) to monitor SPA issues

---

## Competitive Positioning

### Benchmarking Against Similar Venues
**What sets this site apart:**
- Clean, minimalist design (trendy for 2026)
- Modern SPA architecture vs. traditional WordPress/Wix sites
- Strong emphasis on menu imagery (Instagram-ready)
- Direct social media integration

**Competitive gaps:**
- Most modern Melbourne venues have online booking (not just email requests)
- Lack of user-generated content (customer photos)
- No visible loyalty/rewards program promotion
- Missing event calendar (increasingly expected for venues)

---

## Third-Party Services Summary

| Service | Purpose | Integration | Risk Level |
|---------|---------|-------------|-----------|
| **EmailJS** | Contact/booking forms | API integration | Medium (quotas, pricing) |
| **Google Fonts** | Typography | CDN link | Low (fallback sans-serif) |
| **Radix UI** | Components | npm package | Low (well-maintained) |
| **Vercel** | Hosting/CDN | Platform | Low (industry standard) |
| **Instagram/TikTok/Facebook** | Social links | Outbound only | Low |

---

## Deployment & Performance Metrics

```
Server:             Vercel (HTTP/2 enabled)
Cache Status:       HIT (CDN cached)
Response Time:      <100ms (HIT from edge)
Last Modified:      2026-03-10 14:56:34 GMT
Expires:            Must revalidate on each request
Content Security:   No CSP header detected
HTTPS:              Yes (HSTS enabled)
```

---

## Recommendations Priority Matrix

### High Priority (Impact + Ease)
1. Add online booking system with availability checking
2. Implement Google Analytics for user behavior tracking
3. Add operating hours prominently
4. Improve menu accessibility (searchable text + images)
5. Add location/map embed

### Medium Priority (Nice to Have)
6. Event calendar integration
7. Customer reviews/testimonials section
8. Newsletter signup
9. Multi-language support
10. WhatsApp/chat integration

### Low Priority (Polish & Future)
11. PWA capabilities (offline mode, install prompt)
12. Advanced analytics (heatmaps, session recording)
13. Personalization (menu recommendations)
14. Loyalty program integration

---

## Unresolved Questions

1. **Booking Workflow:** How are bookings currently managed on the backend? Manual email review?
2. **Current Booking Volume:** How many reservations/inquiries come through monthly?
3. **Analytics:** Is there any tracking of which menu items drive interest?
4. **Mobile App:** Any plans for native iOS/Android app?
5. **Payment Integration:** Can users prepay or deposit for bookings?
6. **Inventory:** Is there stock/availability management for bookings?
7. **Email Response Time:** What's the SLA for responding to booking/contact forms?
8. **Domain Age:** When was the domain registered? Site version history?
9. **Traffic Metrics:** Approximate monthly visitors?
10. **Team:** Who maintains/updates the website? In-house or agency?

---

## Conclusion

Frankie Says Melbourne's website demonstrates solid modern web practices with a clean React-based architecture and thoughtful UX design. The focus on menu imagery and social media integration aligns well with the cafe/venue market. However, the reliance on email-based booking creates friction—upgrading to a proper reservation system (with availability checking) would be the highest-impact improvement.

The site excels at visual storytelling and is mobile-responsive, but lacks the operational features (events, reviews, hours, online booking) increasingly expected by customers. Implementing these features would better compete with other Melbourne venues and reduce manual workload.

**Overall Assessment:** B+ (Strong foundation, good design, but missing operational features)

