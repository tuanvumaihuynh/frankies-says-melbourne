# Phase 10 - Testing & Deployment

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical |
| Status | Pending |
| Effort | 4h |
| Dependencies | Phase 09 |

Write tests (unit + integration), setup CI/CD with GitHub Actions, configure Vercel deployment, and perform final QA across browsers and devices.

## Key Insights

- Vitest is the natural choice for Vite projects - same config, fast, Jest-compatible API
- React Testing Library for component tests - test behavior, not implementation
- Critical paths to test: booking flow, menu filtering, form validation
- Vercel deployment is straightforward for Vite SPA - same hosting as original
- Browser testing: Chrome, Safari, Firefox + iOS Safari, Android Chrome
- E2E with Playwright for critical user journeys (optional but recommended)

## Requirements

### Functional
- Unit tests for: utility functions, hooks, Zod schemas
- Component tests for: menu filtering, booking form steps, contact form
- Integration tests for: full booking flow, menu search + filter
- CI pipeline: lint → typecheck → test → build on every push
- Vercel deployment: auto-deploy main branch, preview deploys for PRs
- Custom domain configuration
- Environment variables for EmailJS keys, GA4 ID

### Non-Functional
- Test coverage > 70% on critical paths (booking, menu, contact)
- CI pipeline < 3 minutes
- Zero accessibility errors in axe-core automated test
- Builds succeed on Node 20 LTS
- Preview deploys for every PR

## Architecture

### Test Structure
```
src/
├── __tests__/                    # Integration tests
│   ├── booking-flow.test.tsx
│   └── menu-filter.test.tsx
├── components/
│   ├── booking/
│   │   ├── booking-form.tsx
│   │   └── booking-form.test.tsx   # Co-located tests
│   ├── menu/
│   │   ├── menu-item-card.tsx
│   │   └── menu-item-card.test.tsx
│   └── ...
├── hooks/
│   ├── use-menu-filter.ts
│   └── use-menu-filter.test.ts
├── lib/
│   ├── booking-utils.ts
│   └── booking-utils.test.ts
└── ...
```

### CI/CD Pipeline
```
GitHub Actions Workflow:

push/PR → Install deps → Parallel:
  ├── Lint (ESLint)
  ├── Typecheck (tsc --noEmit)
  ├── Test (Vitest)
  └── Build (vite build)
→ Deploy preview (Vercel, PR only)
→ Deploy production (Vercel, main branch)
```

### Vercel Configuration
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Related Code Files

### Files to Create
- `/src/lib/__tests__/booking-utils.test.ts` - Booking utility tests
- `/src/lib/__tests__/structured-data.test.ts` - Schema generator tests
- `/src/hooks/__tests__/use-menu-filter.test.ts` - Menu filter hook tests
- `/src/hooks/__tests__/use-open-status.test.ts` - Open status hook tests
- `/src/hooks/__tests__/use-availability.test.ts` - Availability hook tests
- `/src/components/menu/__tests__/menu-item-card.test.tsx` - Menu card tests
- `/src/components/menu/__tests__/menu-toolbar.test.tsx` - Search + filter tests
- `/src/components/booking/__tests__/booking-form.test.tsx` - Booking form tests
- `/src/components/booking/__tests__/date-time-step.test.tsx` - Step 1 tests
- `/src/components/contact/__tests__/contact-form.test.tsx` - Contact form tests
- `/src/__tests__/booking-flow.test.tsx` - Full booking integration test
- `/src/__tests__/menu-filter.test.tsx` - Menu search+filter integration test
- `/src/test/setup.ts` - Test setup (jsdom, cleanup, mocks)
- `/src/test/test-utils.tsx` - Custom render with providers
- `/.github/workflows/ci.yml` - GitHub Actions CI pipeline
- `/vercel.json` - Vercel configuration with SPA rewrites

### Files to Modify
- `/package.json` - Add test scripts
- `/vite.config.ts` - Add Vitest config
- `/tsconfig.json` - Include test files

### Dependencies to Install
- `vitest` - Test runner
- `@testing-library/react` - Component testing
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - Browser environment for tests
- `@axe-core/react` - Accessibility testing (dev only)

## Implementation Steps

1. **Install test dependencies**:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @axe-core/react
   ```

2. **Configure Vitest** in `vite.config.ts`:
   ```typescript
   /// <reference types="vitest/config" />
   export default defineConfig({
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: './src/test/setup.ts',
       css: true,
       coverage: {
         provider: 'v8',
         reporter: ['text', 'lcov'],
         include: ['src/**/*.{ts,tsx}'],
         exclude: ['src/**/*.test.*', 'src/test/**'],
       },
     },
   })
   ```

3. **Create test setup** (`src/test/setup.ts`):
   - Import `@testing-library/jest-dom`
   - Mock `window.matchMedia`
   - Mock `IntersectionObserver`
   - Cleanup after each test

4. **Create test-utils.tsx** - Custom render wrapper:
   ```typescript
   function renderWithProviders(ui: ReactElement) {
     return render(ui, {
       wrapper: ({ children }) => (
         <MemoryRouter>
           <QueryClientProvider client={queryClient}>
             <HelmetProvider>
               {children}
             </HelmetProvider>
           </QueryClientProvider>
         </MemoryRouter>
       ),
     })
   }
   ```

5. **Write unit tests for utilities**:
   - `booking-utils.test.ts`:
     - `generateReference()` returns correct format `FS-XXXXXXXX-XXXX`
     - `generateICS()` produces valid ICS string
     - `hashSlotAvailability()` is deterministic (same input → same output)
   - `structured-data.test.ts`:
     - Schema generators produce valid JSON-LD

6. **Write hook tests**:
   - `use-menu-filter.test.ts`:
     - Filters by search term (case-insensitive)
     - Filters by dietary tags (AND logic)
     - Combined search + filter
     - Empty result when no matches
     - Counts update correctly
   - `use-open-status.test.ts`:
     - Returns open during business hours
     - Returns closed outside hours
     - Handles edge cases (midnight, timezone)
   - `use-availability.test.ts`:
     - Generates correct time slots for day/night
     - Respects blackout dates
     - Deterministic availability per date

7. **Write component tests**:
   - `menu-item-card.test.tsx`:
     - Renders name, description, price
     - Shows dietary badges
     - Shows featured badge when featured
   - `menu-toolbar.test.tsx`:
     - Search input filters items
     - Dietary toggles activate/deactivate
     - Active filters show as removable badges
     - Clear all removes filters
   - `booking-form.test.tsx`:
     - Step navigation (next/back)
     - Validation errors show on empty fields
     - Form data preserved across steps
   - `contact-form.test.tsx`:
     - Validates required fields
     - Honeypot field rejects bots

8. **Write integration tests**:
   - `booking-flow.test.tsx`:
     - Select date → select time → select party size → next
     - Fill details → next
     - Review summary → confirm
     - Confirmation screen shows reference
   - `menu-filter.test.tsx`:
     - Load menu → search "eggs" → see filtered results
     - Apply GF filter → results narrow
     - Clear filters → all items return

9. **Add test scripts** to package.json:
   ```json
   {
     "scripts": {
       "test": "vitest run",
       "test:watch": "vitest",
       "test:coverage": "vitest run --coverage",
       "test:ui": "vitest --ui"
     }
   }
   ```

10. **Create GitHub Actions CI** (`.github/workflows/ci.yml`):
    ```yaml
    name: CI
    on: [push, pull_request]
    jobs:
      ci:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-node@v4
            with: { node-version: 20, cache: npm }
          - run: npm ci
          - run: npm run lint
          - run: npx tsc --noEmit
          - run: npm test
          - run: npm run build
    ```

11. **Create vercel.json** with SPA rewrite rules

12. **Configure environment variables**:
    - `.env.example` documenting required vars:
      ```
      VITE_EMAILJS_SERVICE_ID=
      VITE_EMAILJS_TEMPLATE_ID=
      VITE_EMAILJS_PUBLIC_KEY=
      VITE_GA4_MEASUREMENT_ID=
      ```
    - Add to Vercel project settings

13. **Cross-browser QA checklist**:
    - Chrome (desktop + mobile)
    - Safari (desktop + iOS)
    - Firefox (desktop)
    - Android Chrome
    - Test: navigation, booking flow, menu filters, gallery lightbox, forms

14. **Final QA**:
    - Run Lighthouse audit on deployed preview
    - Verify all SEO tags render
    - Verify OG image in social sharing debugger
    - Test PWA install flow on mobile
    - Test offline mode
    - Verify EmailJS integration (with real keys)

## Todo List

- [ ] Install test dependencies
- [ ] Configure Vitest in vite.config.ts
- [ ] Create test setup and test-utils
- [ ] Write booking-utils unit tests
- [ ] Write structured-data unit tests
- [ ] Write use-menu-filter hook tests
- [ ] Write use-open-status hook tests
- [ ] Write use-availability hook tests
- [ ] Write menu-item-card component tests
- [ ] Write menu-toolbar component tests
- [ ] Write booking-form component tests
- [ ] Write contact-form component tests
- [ ] Write booking flow integration test
- [ ] Write menu filter integration test
- [ ] Add test scripts to package.json
- [ ] Create GitHub Actions CI workflow
- [ ] Create vercel.json
- [ ] Create .env.example
- [ ] Run cross-browser QA
- [ ] Run final Lighthouse audit
- [ ] Deploy to Vercel production

## Success Criteria

- All tests pass: `npm test` exits 0
- Coverage > 70% on hooks/ and lib/ directories
- CI pipeline runs in < 3 minutes
- Vercel preview deploy works on PR
- Vercel production deploy succeeds on main
- SPA routing works on Vercel (no 404 on direct URL access)
- Environment variables configured in Vercel
- Lighthouse 90+ on production URL
- No critical accessibility errors
- Cross-browser: no layout breaks on Chrome, Safari, Firefox

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Test flakiness with async components | Medium | Medium | Use findBy queries (auto-retry), proper act() wrapping |
| CI times out | Low | Low | Parallel jobs, cache node_modules |
| Vercel SPA routing 404s | Medium | High | Verify vercel.json rewrites configuration |
| EmailJS keys leaked in client bundle | Medium | High | Use VITE_ prefix (public by design), scope keys to specific templates only |
| Cross-browser CSS issues | Medium | Medium | Use Tailwind (handles prefixes), test early |

## Security Considerations

- `.env` file in `.gitignore` - never committed
- EmailJS keys are client-side by design but scoped to templates
- GA4 measurement ID is public (by design)
- No server-side secrets in this project
- CSP headers configured in Vercel (recommended)
- HTTPS enforced via Vercel
