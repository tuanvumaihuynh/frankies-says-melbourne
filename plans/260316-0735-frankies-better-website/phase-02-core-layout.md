# Phase 02 - Core Layout

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical |
| Status | Pending |
| Effort | 4h |
| Dependencies | Phase 01 |

Build the layout shell: responsive header with navigation, mobile hamburger menu, sticky header on scroll, footer with newsletter/social/hours, and React Router page routing with animated transitions.

## Key Insights

- Original has 5 routes (Home, Day, Night, Contact, 404) - we expand to 8 (add Events, Gallery, About/Location)
- Mobile navigation is critical - cafe sites get 60-70% mobile traffic
- Header should show "Open Now" / "Closed" status based on business hours
- Footer is content-rich: newsletter signup, hours summary, social links, quick nav
- Page transitions (Framer Motion) create the polished SPA feel of the original

## Requirements

### Functional
- Responsive header: logo, nav links, "Book a Table" CTA button, mobile sheet menu
- Sticky header that shrinks/blurs on scroll
- Open/Closed status indicator using current time + business hours data
- Footer with 4 columns: About blurb, Quick Links, Hours, Social + Newsletter
- React Router with 8 routes + 404
- Animated page transitions (fade/slide)
- Scroll-to-top on route change
- Active route highlighting in nav

### Non-Functional
- Header renders < 50ms
- Mobile menu opens/closes in < 200ms
- No layout shift when header becomes sticky
- Keyboard navigable (Tab, Escape to close mobile menu)

## Architecture

### Component Tree
```
App
├── QueryClientProvider
│   └── RouterProvider
│       └── RootLayout
│           ├── Header
│           │   ├── Logo
│           │   ├── DesktopNav
│           │   │   └── NavLink[] (active state)
│           │   ├── OpenStatus
│           │   ├── BookTableButton (CTA)
│           │   └── MobileMenuSheet
│           │       ├── NavLink[]
│           │       └── BookTableButton
│           ├── <Outlet /> (animated)
│           │   └── AnimatePresence
│           │       └── PageTransition wrapper
│           ├── Footer
│           │   ├── FooterAbout
│           │   ├── FooterLinks
│           │   ├── FooterHours
│           │   ├── FooterSocial
│           │   └── NewsletterSignup
│           └── Toaster
```

### Route Map
```
/               → HomePage
/menu           → MenuPage (with day/night/special tabs)
/booking        → BookingPage
/events         → EventsPage
/gallery        → GalleryPage
/about          → AboutPage (location, hours, story)
/contact        → ContactPage
/*              → NotFoundPage
```

### Data Flow
- Business hours from `data/hours.json` → `useOpenStatus()` hook → Header badge
- Current route from React Router → active nav link styling
- Scroll position from `useScroll()` hook → header shrink/blur effect

## Related Code Files

### Files to Create
- `/src/components/layout/header.tsx` - Main header with nav, CTA, mobile menu
- `/src/components/layout/footer.tsx` - Footer with columns
- `/src/components/layout/root-layout.tsx` - Layout wrapper with header + footer + outlet
- `/src/components/layout/mobile-menu.tsx` - Sheet-based mobile nav
- `/src/components/layout/nav-link.tsx` - Navigation link with active state
- `/src/components/layout/open-status.tsx` - Open/closed badge
- `/src/components/layout/newsletter-signup.tsx` - Email input + submit
- `/src/components/layout/page-transition.tsx` - Framer Motion wrapper
- `/src/components/layout/scroll-to-top.tsx` - Scroll restoration on navigation
- `/src/hooks/use-open-status.ts` - Computes open/closed from hours data
- `/src/hooks/use-scroll.ts` - Scroll position tracking
- `/src/data/hours.json` - Business hours per day
- `/src/data/navigation.ts` - Route definitions and labels
- `/src/pages/not-found-page.tsx` - 404 page

### Files to Modify
- `/src/App.tsx` - Add RouterProvider + QueryClientProvider
- `/src/main.tsx` - Minimal, just renders App

## Implementation Steps

1. **Create route definitions** in `data/navigation.ts`:
   ```ts
   export const routes = [
     { path: '/', label: 'Home' },
     { path: '/menu', label: 'Menu' },
     { path: '/booking', label: 'Book a Table' },
     { path: '/events', label: 'Events' },
     { path: '/gallery', label: 'Gallery' },
     { path: '/about', label: 'About' },
     { path: '/contact', label: 'Contact' },
   ]
   ```

2. **Create hours data** in `data/hours.json` with Melbourne timezone:
   ```json
   {
     "timezone": "Australia/Melbourne",
     "schedule": {
       "monday": { "open": "07:00", "close": "16:00" },
       "tuesday": { "open": "07:00", "close": "16:00" },
       ...
       "friday": { "open": "07:00", "close": "23:00" },
       "saturday": { "open": "07:00", "close": "23:00" },
       "sunday": { "open": "08:00", "close": "16:00" }
     }
   }
   ```

3. **Build `useOpenStatus` hook** - Compare current Melbourne time against today's hours, return `{ isOpen, opensAt, closesAt, todayHours }`

4. **Build `useScroll` hook** - `useState` + `useEffect` with scroll listener (throttled), returns `scrollY` and `isScrolled` (boolean for >50px)

5. **Build Header component**:
   - Desktop: Logo (left), nav links (center), OpenStatus badge + Book CTA (right)
   - Mobile: Logo (left), hamburger (right) → Sheet overlay with full nav
   - On scroll: `backdrop-blur-md bg-white/80` + reduced padding
   - "Book a Table" links to `/booking`

6. **Build MobileMenu** using shadcn Sheet:
   - Slide from right
   - Full nav links with large touch targets (48px min)
   - Close on navigation (useEffect on location change)

7. **Build NavLink** component:
   - Uses React Router `NavLink` with active class
   - Active: `text-accent font-semibold border-b-2 border-accent`
   - Hover: `text-accent transition-colors`

8. **Build OpenStatus badge**:
   - Green dot + "Open" or Red dot + "Closed"
   - Shows next open/close time: "Closes at 4pm" / "Opens at 7am"

9. **Build Footer**:
   - 4-column grid (responsive: 1 col mobile, 2 col tablet, 4 col desktop)
   - Col 1: Logo, tagline, brief about
   - Col 2: Quick links (same as nav)
   - Col 3: Hours table (Mon-Sun, highlight today)
   - Col 4: Social icons (Instagram, TikTok, Facebook) + newsletter input
   - Bottom bar: copyright, privacy link

10. **Build NewsletterSignup** - Email input + submit button with Zod validation, toast on success (stores locally for now, integrated with email service in Phase 08)

11. **Build PageTransition** wrapper - Framer Motion `motion.div` with `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -20 }}`

12. **Build ScrollToTop** - `useEffect` on `location.pathname` change → `window.scrollTo(0, 0)`

13. **Build RootLayout** - `Header` + `AnimatePresence><Outlet /></AnimatePresence>` + `Footer` + `ScrollToTop` + `Toaster`

14. **Configure App.tsx router** with `createBrowserRouter`:
    - RootLayout as layout route
    - All page routes as children (use placeholder divs until pages are built)
    - 404 catch-all route

15. **Build NotFoundPage** - Simple 404 with illustration, "Go Home" button

## Todo List

- [ ] Create navigation route definitions
- [ ] Create hours.json data file
- [ ] Build useOpenStatus hook
- [ ] Build useScroll hook
- [ ] Build Header with desktop nav
- [ ] Build MobileMenu with Sheet
- [ ] Build NavLink with active state
- [ ] Build OpenStatus badge
- [ ] Build Footer with 4 columns
- [ ] Build NewsletterSignup component
- [ ] Build PageTransition wrapper
- [ ] Build ScrollToTop component
- [ ] Build RootLayout component
- [ ] Configure App.tsx with router
- [ ] Build NotFoundPage
- [ ] Verify all routes render placeholder content

## Success Criteria

- All 8 routes navigate correctly with animated transitions
- Header is sticky, shrinks on scroll, shows open/closed status
- Mobile menu opens/closes via Sheet, closes on nav
- Footer renders all 4 columns responsively
- Active nav link is visually highlighted
- 404 page renders for unknown routes
- No console errors, no layout shifts

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| AnimatePresence not firing exit | Medium | Low | Use `mode="wait"` and key routes by pathname |
| Melbourne timezone calculation errors | Medium | Medium | Use `Intl.DateTimeFormat` with `timeZone: 'Australia/Melbourne'` |
| Mobile menu z-index conflicts | Low | Low | shadcn Sheet handles z-index via portal |
| Scroll listener perf on mobile | Medium | Low | Throttle with requestAnimationFrame |
