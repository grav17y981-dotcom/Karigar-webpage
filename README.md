# Karigar marketing landing page

Karigar is an early product concept for independent auto repair shops and body shops. It connects inventory counts, appointment-parts planning, shelf/bin locations, shortage risk, and supplier-grouped restock suggestions in one shop-friendly story.

This repository currently contains the public marketing experience only. It deliberately does **not** implement production authentication, a database, payments, AI diagnostics, VIN decoding, supplier integrations, repair orders, invoicing, or a logged-in application.

## What is included

- Black-and-red workshop identity with a concise “Parts ready. Bays moving.” hero and the screwdriver `i` wordmark
- A contrasting sample workshop board in the hero that makes the software and shortage-to-restock connection visible immediately
- Readable supporting copy, 16px mobile body text, and 13–14px action labels
- A 1.2-second first-visit opening sequence, a normally scrolling hero, a shorter scroll-linked feature story, and a normally scrolling roadmap
- Four keyboard-accessible workflow tabs with sample appointment, inventory, restock, and readiness screens
- Responsive local WebP hero images and a lightweight wordmark image
- Independent-shop audience and honest concept/pilot boundaries
- Clearly labeled signup demonstration with accessible validation and a local confirmation; no registration or follow-up email
- SEO metadata, JSON-LD, sitemap, robots configuration, social preview metadata, and favicon
- Reduced-motion, responsive, focus, and skip-link support

The product brief is preserved at [`docs/CODEX_3D_MARKETING_LANDING_PROMPT.md`](docs/CODEX_3D_MARKETING_LANDING_PROMPT.md).

## Setup

Requirements:

- Node.js 20.19+ or 22.12+
- npm 10+

Install and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks without emitting files |

## Routes and anchors

The current experience is available at `/` and `/demo-redesign` (the latter is marked noindex), with section anchors:

- `#problem` — four-stage feature story
- `#how-it-works` — interactive sample product screens
- `#for-shops` — independent-shop audience
- `#roadmap` — concept, pilot, and integration phases
- `#early-access` — planned pilot offer and signup demonstration

## Motion and performance notes

- The hero and feature story update CSS variables with passive, animation-frame-coordinated scroll listeners rather than re-rendering React on every frame.
- The feature story changes React state only when the active narrative step changes. Workflow tabs respond to click, tap, Up/Down, Home, and End.
- `prefers-reduced-motion` disables cinematic motion and moving camera cues.
- All editorial imagery is project-local; page text, callouts, progress, product screens, and controls remain code-native.
- The earlier React Three Fiber scene source is preserved in `src/components/GarageScene.tsx`, but it is not loaded by the current landing page.
- To regenerate the optimized presentation assets, run `python scripts/optimize-presentation-assets.py` in a Python environment with Pillow. Originals remain available for the earlier page and social previews.

## Lead form behavior

The current form lives in `src/demo/DemoRedesign.tsx`. It validates in the browser and intentionally does not submit or persist data. The offer, submit label, and confirmation all describe a concept demonstration. Pilot registration is not open yet.

A future implementation should use an environment-configured endpoint or trusted form provider, add server-side validation and abuse protection, and publish appropriate privacy/retention terms. Never place API keys or private credentials in client code.

## Current limitations

- All workshop, inventory, appointment, activity, and supplier information is sample data.
- The illustrated workshop is a focused product story, not a digital twin or operational repair-order system.
- The waitlist/demo success state is local to the page.
- Canonical, sitemap, robots, and social URLs use the current production domain, `https://karigar-workshop.vercel.app/`.
- Karigar does not guarantee part compatibility, fitment, availability, or quantity accuracy. Human verification is required.

## Future application boundary

The next product phase may connect the marketing site to a secure lead endpoint and build the logged-in product separately. Authentication, shop data, integrations, payments, AI features, and operational workflows should not be added to this public landing bundle without their own product, security, and privacy design.
