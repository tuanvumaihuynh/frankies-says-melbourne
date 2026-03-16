---
title: "Frankie Says Melbourne - Better Website"
description: "Build improved version of frankiesaysmelbourne.com with real booking, searchable menus, events, SEO"
status: pending
priority: P1
effort: 40h
branch: main
tags: [frontend, react, website, restaurant, vite, tailwind]
created: 2026-03-16
---

# Frankie Says Melbourne - Better Website

## Vision

Rebuild frankiesaysmelbourne.com as a modern, feature-rich React SPA that addresses all identified gaps: real booking with availability, searchable text menus with dietary filters, event calendar, Google Maps, customer reviews, newsletter, PWA support, and Lighthouse 90+ scores.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18+ with TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui (Radix UI primitives) |
| Routing | React Router v7 |
| Data | TanStack Query v5 |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Dates | date-fns |
| Email | EmailJS / Resend |
| Icons | Lucide React |
| Fonts | Playfair Display + Inter |

## Architecture Overview

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives
│   ├── layout/          # Header, Footer, Navigation
│   ├── menu/            # Menu cards, filters, search
│   ├── booking/         # Calendar, time picker, form
│   ├── gallery/         # Masonry grid, lightbox
│   └── common/          # Toast, skeleton, SEO helmet
├── pages/               # Route-level page components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities, constants, types
├── data/                # Static JSON data (menus, events, hours)
├── assets/              # Images, fonts, icons
└── styles/              # Global CSS, Tailwind config
```

## Phases

| # | Phase | Effort | Status | Dependencies |
|---|-------|--------|--------|-------------|
| 01 | [Project Setup](./phase-01-project-setup.md) | 2h | pending | None |
| 02 | [Core Layout](./phase-02-core-layout.md) | 4h | pending | Phase 01 |
| 03 | [Home Page](./phase-03-home-page.md) | 4h | pending | Phase 02 |
| 04 | [Menu System](./phase-04-menu-system.md) | 5h | pending | Phase 02 |
| 05 | [Booking System](./phase-05-booking-system.md) | 5h | pending | Phase 02 |
| 06 | [Gallery & Events](./phase-06-gallery-events.md) | 4h | pending | Phase 02 |
| 07 | [Location & Contact](./phase-07-location-contact.md) | 4h | pending | Phase 02 |
| 08 | [Integrations](./phase-08-integrations.md) | 4h | pending | Phases 03-07 |
| 09 | [Performance & PWA](./phase-09-performance-pwa.md) | 4h | pending | Phase 08 |
| 10 | [Testing & Deployment](./phase-10-testing-deployment.md) | 4h | pending | Phase 09 |

## Dependency Graph

```
Phase 01 (Setup)
    └── Phase 02 (Layout)
        ├── Phase 03 (Home)
        ├── Phase 04 (Menu)      ──┐
        ├── Phase 05 (Booking)   ──┤
        ├── Phase 06 (Gallery)   ──┼── Phase 08 (Integrations)
        └── Phase 07 (Contact)   ──┘       └── Phase 09 (Perf/PWA)
                                                   └── Phase 10 (Test/Deploy)
```

## Key Design Decisions

1. **No backend** - All data is static JSON files; booking uses EmailJS with client-side availability simulation
2. **shadcn/ui over Radix** - Pre-styled accessible components, consistent design system, copy-paste ownership
3. **Static menu data** - JSON-based menus enable text search, filtering, and SEO without CMS complexity
4. **Framer Motion** - Lightweight page transitions and micro-interactions that match cafe aesthetic
5. **PWA** - Offline menu access is valuable for patrons with poor signal in the venue

## Color Palette (Derived from Original)

| Role | Color | Usage |
|------|-------|-------|
| Primary | `#1a1a1a` | Text, headings |
| Secondary | `#6b7280` | Muted text |
| Accent | `#c8a97e` | Gold/warm - CTAs, highlights |
| Background | `#faf9f7` | Warm off-white |
| Card | `#ffffff` | Cards, elevated surfaces |
| Dark | `#0f0f0f` | Night mode sections |

## Non-Functional Targets

- Lighthouse: 90+ all categories
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Bundle < 300KB gzipped
- WCAG 2.1 AA
- Schema.org structured data (LocalBusiness, Restaurant, Menu)
