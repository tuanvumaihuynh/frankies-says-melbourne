# Phase 01 - Project Setup

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical |
| Status | Pending |
| Effort | 2h |
| Dependencies | None |

Initialize Vite + React + TypeScript project with Tailwind CSS 4, shadcn/ui, React Router, and all core dependencies. Establish project structure, linting, and dev tooling.

## Key Insights

- Original site uses Vite + React + Tailwind - maintain same foundation for familiarity
- shadcn/ui provides pre-built accessible components that reduce boilerplate vs raw Radix
- Tailwind CSS 4 uses CSS-first config (`@theme` directive) instead of `tailwind.config.js`
- TypeScript strict mode catches errors early; essential for form validation types

## Requirements

### Functional
- Vite dev server with HMR running
- All dependencies installed and importable
- TypeScript compiles without errors
- Tailwind utility classes working
- shadcn/ui CLI configured, at least Button component installed
- ESLint + Prettier configured

### Non-Functional
- TypeScript strict mode enabled
- Path aliases configured (`@/` maps to `src/`)
- Consistent code formatting across all files

## Architecture

```
vibefe/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components land here
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   │   ├── utils.ts      # cn() helper, shared utils
│   │   └── constants.ts  # Site-wide constants
│   ├── data/             # Static JSON data files
│   ├── assets/
│   │   └── images/
│   ├── styles/
│   │   └── globals.css   # Tailwind directives + custom CSS
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
├── components.json        # shadcn/ui config
├── .eslintrc.cjs
├── .prettierrc
└── .gitignore
```

## Related Code Files

### Files to Create
- `/src/main.tsx` - React entry point
- `/src/App.tsx` - Root component with router
- `/src/styles/globals.css` - Tailwind directives, Google Fonts import, CSS custom properties
- `/src/lib/utils.ts` - `cn()` helper (clsx + twMerge)
- `/src/lib/constants.ts` - Site metadata, social links, contact info
- `/src/vite-env.d.ts` - Vite type declarations
- `vite.config.ts` - Vite config with path aliases
- `tsconfig.json` - TS config with strict mode
- `components.json` - shadcn/ui configuration
- `.eslintrc.cjs` - ESLint rules
- `.prettierrc` - Prettier config
- `index.html` - HTML entry with font preloads

## Implementation Steps

1. **Initialize Vite project**
   ```bash
   npm create vite@latest . -- --template react-ts
   ```

2. **Install core dependencies**
   ```bash
   npm install react-router-dom @tanstack/react-query framer-motion react-hook-form @hookform/resolvers zod date-fns lucide-react @emailjs/browser
   ```

3. **Install Tailwind CSS 4**
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```
   Configure in `vite.config.ts` as Vite plugin.

4. **Setup shadcn/ui**
   ```bash
   npx shadcn@latest init
   ```
   Select: TypeScript, default style, CSS variables, `@/` alias.
   Install initial components:
   ```bash
   npx shadcn@latest add button card input label tabs dialog sheet toast accordion select separator badge
   ```

5. **Configure path aliases** in `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": { "@/*": ["./src/*"] }
     }
   }
   ```

6. **Setup globals.css** with:
   - Tailwind `@import "tailwindcss"`
   - Google Fonts import for Playfair Display + Inter
   - CSS custom properties for color palette
   - Base styles (smooth scroll, font-family defaults)

7. **Configure index.html**
   - Font preload links for Playfair Display + Inter
   - Favicon
   - Default meta tags (charset, viewport, description)
   - OG tags template

8. **Setup ESLint + Prettier**
   ```bash
   npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks prettier eslint-config-prettier
   ```

9. **Create .gitignore** - Node modules, dist, .env, IDE files

10. **Verify setup** - `npm run dev` starts without errors, Tailwind classes render, shadcn Button renders

## Todo List

- [ ] Initialize Vite React-TS project
- [ ] Install all npm dependencies
- [ ] Configure Tailwind CSS 4 with Vite plugin
- [ ] Setup shadcn/ui with component library
- [ ] Configure TypeScript path aliases
- [ ] Create globals.css with fonts + custom properties
- [ ] Setup index.html with preloads and meta tags
- [ ] Configure ESLint + Prettier
- [ ] Create lib/utils.ts and lib/constants.ts
- [ ] Verify dev server runs cleanly

## Success Criteria

- `npm run dev` starts Vite dev server without errors
- TypeScript compiles in strict mode with zero errors
- Tailwind utility classes render correctly in browser
- shadcn/ui Button component renders with proper styling
- Path alias `@/` resolves correctly in imports
- ESLint and Prettier run without config errors

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Tailwind 4 breaking changes from v3 docs | Medium | Medium | Use official v4 docs, test `@theme` directive early |
| shadcn/ui + Tailwind 4 compatibility | Low | High | shadcn supports Tailwind 4 as of late 2025 |
| Path alias not resolving | Low | Low | Verify in both tsconfig and vite.config.ts |
