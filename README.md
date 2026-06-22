# Karigar 3D marketing landing page

Karigar is an early product concept for independent auto repair shops and body shops. It connects inventory counts, appointment-parts planning, shelf/bin locations, shortage risk, and supplier-grouped restock suggestions in one shop-friendly story.

This repository currently contains the public marketing experience only. It deliberately does **not** implement production authentication, a database, payments, AI diagnostics, VIN decoding, supplier integrations, repair orders, invoicing, or a logged-in application.

## What is included

- Airy editorial hero with a floating, illustrated Karigar garage and the screwdriver `i` wordmark
- Reference-inspired white, ink-black, and copper visual system with oversized serif storytelling
- Scroll-linked hero camera move that recenters the workbench, moves the copy into the upper-left, and reveals five feature callouts
- Inertial section reveals, subtle image parallax, hover feedback, and a page-progress indicator
- Five-stage illustrated workshop that automatically pans, zooms in, zooms out, and advances with page scroll
- Distinct project-local imagery for the interactive workshop and final parts-counter CTA
- Product explanation sections for the workshop board, inventory search, appointment parts, storage location, restocking, and activity
- Independent-shop role benefits and honest beta/trust boundaries
- Frontend-only waitlist/demo form with accessible validation and a local success state
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

The site is a single public route (`/`) with section anchors:

- `#workshop` — scroll-driven illustrated workshop demo
- `#how-it-works` — problem and workflow story
- `#features` — product feature narrative
- `#for-shops` — role benefits
- `#trust` — beta, sample-data, and human-verification notes
- `#contact` — waitlist/request-demo form

## Motion and performance notes

- The hero and workshop cameras update CSS variables with passive, animation-frame-coordinated scroll listeners rather than re-rendering React on every frame.
- The workshop changes React state only when the active narrative step changes.
- `prefers-reduced-motion` disables cinematic motion and moving camera cues.
- All editorial imagery is project-local; page text, callouts, progress, product screens, and controls remain code-native.
- The earlier React Three Fiber scene source is preserved in `src/components/GarageScene.tsx`, but it is not loaded by the current landing page.

## Lead form behavior

The form validates in the browser and intentionally does not submit or persist data. The integration point is documented in `src/components/LeadForm.tsx`.

A future implementation should use an environment-configured endpoint or trusted form provider, add server-side validation and abuse protection, and publish appropriate privacy/retention terms. Never place API keys or private credentials in client code.

## Current limitations

- All workshop, inventory, appointment, activity, and supplier information is sample data.
- The illustrated workshop is a focused product story, not a digital twin or operational repair-order system.
- The waitlist/demo success state is local to the page.
- Canonical, sitemap, robots, and social URLs use the current production domain, `https://karigar-gravity98.vercel.app/`.
- Karigar does not guarantee part compatibility, fitment, availability, or quantity accuracy. Human verification is required.

## Future application boundary

The next product phase may connect the marketing site to a secure lead endpoint and build the logged-in product separately. Authentication, shop data, integrations, payments, AI features, and operational workflows should not be added to this public landing bundle without their own product, security, and privacy design.
