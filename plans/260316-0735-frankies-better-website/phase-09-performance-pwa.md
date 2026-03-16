# Phase 09 - Performance & PWA

## Overview

| Field | Value |
|-------|-------|
| Priority | P2 - Medium |
| Status | Pending |
| Effort | 4h |
| Dependencies | Phase 08 |

Optimize performance for Lighthouse 90+ scores across all categories. Add PWA support with service worker for offline menu access. Implement image optimization, code splitting, bundle analysis, and accessibility audit.

## Key Insights

- Original has 402KB JS bundle - our target is < 300KB gzipped
- Image optimization (WebP + srcset) is the single biggest perf win for image-heavy restaurant site
- Code splitting per route prevents loading booking logic when viewing menu
- Service worker with offline menu cache is genuinely useful - patrons often have poor signal inside venues
- Accessibility audit catches issues before they become complaints
- Skeleton screens improve perceived performance even when actual load time is similar

## Requirements

### Functional
- PWA: installable on mobile home screen
- Offline mode: menu page accessible without network
- Service worker caches static assets + menu data
- App manifest with icons, theme color, display mode
- Skeleton loading states on all pages
- Error boundaries with graceful fallback UI

### Non-Functional
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- Lighthouse Best Practices: 90+
- Lighthouse SEO: 90+
- LCP < 2.5s (hero image)
- FID / INP < 100ms
- CLS < 0.1
- Bundle size: < 300KB gzipped (JS)
- Total page weight: < 1MB on initial load (excluding lazy images)
- WCAG 2.1 AA compliance

## Architecture

### Code Splitting Strategy
```
Route-based splits (React.lazy):
├── home-page.tsx      → chunk: home (~30KB)
├── menu-page.tsx      → chunk: menu (~25KB)
├── booking-page.tsx   → chunk: booking (~35KB)
├── events-page.tsx    → chunk: events (~20KB)
├── gallery-page.tsx   → chunk: gallery (~20KB)
├── about-page.tsx     → chunk: about (~15KB)
├── contact-page.tsx   → chunk: contact (~20KB)
└── not-found-page.tsx → chunk: 404 (~5KB)

Shared vendor chunks (Vite automatic):
├── react + react-dom  → chunk: vendor-react (~45KB gzipped)
├── framer-motion      → chunk: vendor-motion (~30KB gzipped)
├── radix-ui           → chunk: vendor-radix (~20KB gzipped)
└── date-fns           → chunk: vendor-dates (~10KB gzipped)
```

### Service Worker Cache Strategy
```
Cache-first (static assets):
├── CSS, JS bundles (versioned)
├── Font files (WOFF2)
├── Logo, icons

Stale-while-revalidate (content):
├── menu-data.json
├── events-data.json
├── gallery-data.json
├── hours.json

Network-first (dynamic):
├── EmailJS API calls
├── Google Analytics
```

### Image Optimization Pipeline
```
Source images (PNG/JPG)
  → Convert to WebP (Vite plugin)
  → Generate srcset sizes: 400w, 800w, 1200w
  → Generate blur placeholder (10x10 base64)
  → <picture> tag with WebP + fallback
```

## Related Code Files

### Files to Create
- `/public/manifest.json` - PWA web app manifest
- `/public/sw.js` - Service worker (or use vite-plugin-pwa)
- `/public/icons/` - PWA icons (192x192, 512x512)
- `/src/components/common/skeleton-card.tsx` - Reusable skeleton loader
- `/src/components/common/skeleton-page.tsx` - Full page skeleton
- `/src/components/common/error-boundary.tsx` - React error boundary
- `/src/components/common/offline-banner.tsx` - Offline status indicator
- `/src/hooks/use-online-status.ts` - Network status detection
- `/src/lib/image-utils.ts` - Image srcset/sizes helper

### Files to Modify
- `/vite.config.ts` - Add PWA plugin, image optimization, code splitting config
- `/src/App.tsx` - Add React.lazy imports, Suspense boundaries, ErrorBoundary
- `/src/main.tsx` - Register service worker
- `/index.html` - Add manifest link, theme-color meta, apple-touch-icon
- All page components - Add Suspense fallback skeletons
- `/src/components/common/lazy-image.tsx` - Add srcset, WebP, blur placeholder

### Dependencies to Install
- `vite-plugin-pwa` - PWA support for Vite
- `workbox-*` (bundled with vite-plugin-pwa) - Service worker toolkit

## Implementation Steps

1. **Install PWA plugin**:
   ```bash
   npm install -D vite-plugin-pwa
   ```

2. **Configure Vite for performance** in `vite.config.ts`:
   ```typescript
   import { VitePWA } from 'vite-plugin-pwa'

   export default defineConfig({
     plugins: [
       react(),
       tailwindcss(),
       VitePWA({
         registerType: 'autoUpdate',
         workbox: {
           globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
           runtimeCaching: [
             { urlPattern: /\.json$/, handler: 'StaleWhileRevalidate' },
             { urlPattern: /\.(png|jpg|webp)$/, handler: 'CacheFirst', options: { cacheName: 'images', expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 } } },
           ],
         },
         manifest: { /* inline or reference file */ },
       }),
     ],
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             'vendor-react': ['react', 'react-dom'],
             'vendor-router': ['react-router-dom'],
             'vendor-motion': ['framer-motion'],
           },
         },
       },
     },
   })
   ```

3. **Create PWA manifest** (`public/manifest.json`):
   ```json
   {
     "name": "Frankie Says Melbourne",
     "short_name": "Frankie Says",
     "description": "Brunch cafe & evening dining in Melbourne",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#faf9f7",
     "theme_color": "#c8a97e",
     "icons": [
       { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
       { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
     ]
   }
   ```

4. **Add code splitting** to App.tsx:
   ```typescript
   const HomePage = lazy(() => import('./pages/home-page'))
   const MenuPage = lazy(() => import('./pages/menu-page'))
   // ... all pages
   ```
   Wrap routes with `<Suspense fallback={<SkeletonPage />}>`.

5. **Build SkeletonCard** - Animated pulse placeholder:
   - Configurable: image area + text lines
   - Uses Tailwind `animate-pulse` + `bg-muted`

6. **Build SkeletonPage** - Full page skeleton matching each page's layout:
   - Generic: header skeleton + content area skeleton
   - Used as Suspense fallback

7. **Build ErrorBoundary**:
   - Catches render errors
   - Displays friendly message: "Something went wrong"
   - "Try Again" button (resets error state)
   - Reports error to console (future: Sentry)

8. **Build useOnlineStatus hook**:
   - Listens to `online`/`offline` events
   - Returns `isOnline` boolean

9. **Build OfflineBanner**:
   - Appears when offline: "You're offline. Some features may be limited."
   - Amber warning bar at top
   - Auto-dismisses when back online

10. **Optimize images**:
    - Convert all assets to WebP format
    - Create responsive srcset versions (400w, 800w, 1200w)
    - Update LazyImage component with `<picture>` tag and srcset
    - Add width/height attributes to prevent CLS
    - Preload hero image with `<link rel="preload" as="image">`

11. **Add font optimization**:
    - `font-display: swap` in @font-face (already via Google Fonts)
    - Preload critical font files in index.html
    - Subset fonts to Latin characters only

12. **Run accessibility audit**:
    - Check all images have alt text
    - Verify color contrast ratios (4.5:1 minimum)
    - Test keyboard navigation through all interactive elements
    - Ensure focus indicators are visible
    - Test with screen reader (VoiceOver on Mac)
    - Verify all form inputs have labels
    - Check heading hierarchy (h1 → h2 → h3, no skips)

13. **Bundle analysis**:
    ```bash
    npx vite-bundle-visualizer
    ```
    Identify and address any unexpected large chunks.

14. **Register service worker** in main.tsx (handled by vite-plugin-pwa)

15. **Test offline mode**:
    - Load site → go offline → navigate to menu page
    - Menu data should load from cache
    - Booking form shows offline banner
    - Gallery images from cache display

## Todo List

- [ ] Install vite-plugin-pwa
- [ ] Configure Vite build optimization + manual chunks
- [ ] Create PWA manifest.json
- [ ] Create PWA icons (192, 512)
- [ ] Add code splitting (React.lazy) for all pages
- [ ] Build SkeletonCard component
- [ ] Build SkeletonPage component
- [ ] Build ErrorBoundary component
- [ ] Build useOnlineStatus hook
- [ ] Build OfflineBanner component
- [ ] Optimize images (WebP, srcset)
- [ ] Optimize font loading
- [ ] Run accessibility audit and fix issues
- [ ] Run bundle analysis
- [ ] Test offline mode
- [ ] Run Lighthouse audit and achieve 90+ scores

## Success Criteria

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- Lighthouse Best Practices: 90+
- Lighthouse SEO: 90+
- LCP < 2.5s
- CLS < 0.1
- Total JS bundle < 300KB gzipped
- PWA installable on mobile
- Menu page works offline
- All images have alt text
- Keyboard navigation works throughout
- No contrast ratio failures
- Error boundary catches and displays errors gracefully

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Service worker caching stale data | Medium | Medium | StaleWhileRevalidate for content, version-based for assets |
| Code splitting creates too many requests | Low | Low | Prefetch next likely route on hover |
| Image optimization increases build time | Medium | Low | Only run in production build |
| PWA install prompt not showing | Medium | Low | Meets criteria if manifest + SW + HTTPS all present |
| Accessibility issues missed in audit | Medium | Medium | Use axe-core automated testing + manual keyboard test |
