# Codex 3D Marketing Landing Prompt
You are acting as a senior product strategist, UX designer, 3D web designer, animation designer, and senior full-stack/frontend developer.

Project: Karigar
Repository: grav17y981-dotcom/Karigar

Build a public-facing 3D marketing website only. Do not build the full logged-in web app yet. Do not build production authentication, database, payments, supplier integrations, AI diagnostics, or repair-order management. This website should explain what Karigar is through a cinematic, interactive 3D garage experience.

Use the existing Karigar repository, product docs, prototype direction, and brand assets as the source of truth. Preserve the current product vision: Karigar is a shop-friendly inventory, appointment-parts planning, and restocking helper for independent auto repair shops and body shops.

The website should feel like a serious product demo, portfolio-level presentation, investor/school-project showcase, and early customer landing page.

# 1. What the website does

Create a public landing site that explains Karigar in a visually memorable way.

Karigar helps small auto repair shops and body shops:

* Know what parts are currently in stock
* See which parts are running low
* Know which parts are needed for today’s and upcoming appointments
* Find where each part is stored in the shop
* Detect shortage risks before jobs are delayed
* Generate a practical restock list grouped by supplier

This website should not feel like a normal flat SaaS page. It should use a cinematic 3D garage/workshop experience to explain the product.

The visitor should quickly understand:
“Karigar keeps every lift moving by connecting bay schedules, shelf counts, storage locations, appointment parts, and restocking into one shop-ready command center.”

# 2. Who the website is for

Primary audience:

* Independent auto repair shop owners
* Shop managers
* Parts managers

Secondary audience:

* Service advisors
* Front desk employees
* Technicians
* Parts clerks
* Body shop owners
* School/project evaluators
* Potential investors or early supporters

Primary buyer mindset:
The buyer likely runs or manages a small shop that currently uses memory, paper notes, whiteboards, supplier receipts, spreadsheets, or disconnected systems to track parts.

They care about:

* Saving time
* Avoiding missing parts
* Reducing confusion
* Finding parts quickly
* Preparing appointments before cars arrive
* Knowing what to restock
* Keeping technicians from waiting around

# 3. Main user flow

Landing page visitor flow:

1. Visitor opens the website.
2. The screen starts with a cinematic Karigar logo animation.
3. The word “karigar” appears close-up.
4. The letter “i” is clearly represented by a screwdriver.
5. The camera slowly zooms/pans out.
6. The Karigar wordmark is revealed sitting on or engraved into a mechanic workbench.
7. Other tools appear around it in a tasteful, premium way.
8. The camera continues pulling back or transitions into a semi-realistic 3D top-down garage/shop scene.
9. The visitor sees service bays, shelves, bins, workbench, and restock/supplier area.
10. The visitor is guided to click or hover on different areas:

    * Click a bay to see today’s appointment
    * Click a job to see parts needed
    * Click a shelf/bin to see where the part is stored
    * Click a part to see quantity, minimum stock, and status
    * Click restock area to see supplier queue
11. The visitor scrolls through feature sections explaining Dashboard, Inventory, Appointments, Restock Helper, Storage/Bins, and Activity.
12. The visitor sees trust/privacy notes and MVP/beta positioning.
13. The visitor clicks “Join Waitlist” or “Request Demo.”
14. The lead form validates inputs and shows a polished success message.

Important:
For now, this is a marketing/demo site only. If there is no backend, the form can be a frontend-only demo form with clear TODO comments for future integration, or an environment-configurable action that does not require hardcoded secrets. Do not invent fake backend credentials or API keys.

# 4. Core features for the landing website

## Cinematic opening animation

Create a strong first impression:

* Dark background
* Karigar wordmark appears
* Screwdriver forms or replaces the “i”
* Subtle metallic/workshop lighting
* Camera pulls back
* Logo lands on or is revealed on a workbench
* Tools around the logo should feel intentional, not cluttered
* Transition into 3D garage scene

The logo animation should be premium, smooth, and not childish.

## Interactive 3D garage

Create a semi-realistic 3D top-down garage/workshop scene with:

* 3 service bays
* Parts room shelves
* Labeled bins
* Workbench
* Tool area
* Restock/supplier pickup area
* Subtle lighting
* Industrial materials
* Hotspots for interaction

The garage should be visually impressive but lightweight. Do not create an overly complex game-like scene.

## Guided demo overlay

Add a guided explanation flow:

* Step 1: “Today’s jobs”
* Step 2: “Parts needed”
* Step 3: “Shelf/bin location”
* Step 4: “Shortage risk”
* Step 5: “Restock suggestion”

Each step should show a compact UI card connected to the relevant 3D object.

## Feature sections

Include landing page sections:

* Hero
* Problem
* Interactive 3D Workshop Demo
* How Karigar Works
* Dashboard / Workshop Board
* Inventory Search
* Appointment Parts Planning
* Shelf & Bin Location Tracking
* Restock Helper
* Activity History
* Built for Independent Shops
* Waitlist / Request Demo CTA
* Trust & Privacy
* Footer

## Lead capture

Add two CTAs:

* Join Waitlist
* Request Demo

Lead form fields:

* Name
* Email
* Shop name
* Role
* Shop type
* Message / biggest inventory problem

For now, if no backend exists, validate the form on the frontend and show a success state. Add clear comments explaining where a future form service or backend endpoint should be connected.

# 5. Recommended tech stack

Because this is currently a 3D marketing website only, use a frontend-first stack.

Recommended:

* Vite or Next.js with TypeScript
* React
* React Three Fiber for 3D scene
* @react-three/drei for helpful 3D utilities
* Three.js under the hood
* Tailwind CSS or CSS modules for styling
* Framer Motion or GSAP only if needed for refined UI/logo animation
* Zustand or simple React state for guided demo interactions
* No production database for this version
* No production auth for this version
* No payment stack
* No backend unless absolutely necessary for a form integration

If the existing repo is currently simple/static, prefer a careful migration path:

* Do not delete product docs
* Do not destroy existing prototype work
* Keep current brand assets
* Add modern frontend tooling only if needed for 3D
* Keep setup simple and documented

Suggested scripts:

* `npm run dev`
* `npm run build`
* `npm run preview`
* `npm run lint`
* `npm run typecheck`

# 6. Design direction

Overall feeling:

* Premium
* Practical
* Industrial
* Trustworthy
* Modern repair-shop command center
* Semi-realistic 3D
* Not childish
* Not generic SaaS
* Not neon gaming
* Not overly cartoonish

Visual direction:

* Dark asphalt/charcoal background
* Steel and rubber neutral tones
* Warm terracotta/copper/safety-orange accent
* Subtle workshop lighting
* Clean typography
* High-contrast UI cards
* Realistic workbench/tool surfaces
* Organized shop floor
* Practical dashboard overlays

Brand detail:

* The Karigar wordmark should use a screwdriver as the “i.”
* The screwdriver must still read clearly as the lowercase “i.”
* The dot of the “i” can be represented by the screwdriver handle, tip highlight, screw head, or a small aligned detail.
* Do not make the screwdriver look like an “l.”
* Keep spacing consistent across the wordmark.

Avoid:

* Car silhouettes as the main visual identity
* Generic wrench/gear/spark plug clichés as the logo
* Overly playful cartoon mechanic visuals
* Too much clutter
* Heavy text walls
* Overly futuristic sci-fi
* Unrealistic fake claims like “trusted by thousands”
* Complex login/app flows

Subtle cultural note:
Karigar means maker/craftsman. If adding South Asian craft influence, keep it subtle through geometry, texture, or small design details. Do not make it ornate or decorative-heavy.

# 7. SEO setup

Set up SEO for the public landing page.

Include:

* Page title
* Meta description
* Open Graph metadata
* Twitter/social preview metadata
* Favicon/app icon
* Sitemap
* Robots config
* Semantic headings
* Descriptive alt text
* Clean internal section anchors
* JSON-LD for SoftwareApplication or Organization if appropriate

Target keywords:

* auto repair inventory software
* repair shop inventory management
* auto shop parts tracking
* body shop inventory software
* appointment parts planning
* auto repair shop restocking
* small auto shop management software
* repair shop parts inventory
* mechanic shop inventory software

SEO copy should focus on real shop problems:

* Missing parts
* Low stock
* Searching shelves
* Appointment delays
* Restock confusion
* Disconnected spreadsheets and whiteboards

Do not keyword-stuff. Keep copy natural and useful.

# 8. Monetization plan

Skip active monetization for now.

Do not build:

* Pricing checkout
* Stripe
* Subscription plans
* Payment flow
* Account billing
* Paywalls

For this version, use only:

* Join Waitlist
* Request Demo
* Private beta messaging

Optional future monetization section can be included as informational copy only:

* “Karigar is preparing for early pilot shops.”
* “Request access for private beta.”
* “Pricing will be shaped after pilot feedback.”

Do not add specific prices unless instructed later.

# 9. Trust, privacy, and disclaimer notes

Add a trust/privacy section to the website.

Include these ideas:

* Karigar is currently an early product concept / beta-style system.
* Karigar helps organize inventory and appointment-parts planning.
* Karigar is not a replacement for professional mechanic judgment.
* Karigar does not guarantee part compatibility.
* Shops must verify part numbers, fitment, supplier availability, and quantities.
* Future AI suggestions must require human confirmation.
* Future shop/customer data should be protected with strong access controls.
* The public demo uses sample data only.
* Do not display real customer data in the demo.
* Do not claim production security features that are not implemented yet.

If creating form copy:

* Be clear that submitted interest is for follow-up/demo access.
* Do not request sensitive customer, vehicle, VIN, payment, or private shop data in the marketing form.

# 10. Key edge cases

Handle these website/product-demo edge cases:

## 3D and performance

* WebGL unavailable
* Low-end mobile device
* Slow network
* 3D scene takes too long to load
* User has reduced-motion preference enabled
* User scrolls before animation completes
* User uses keyboard navigation only
* User is on a small phone screen

Required handling:

* Provide a static fallback visual
* Lazy-load heavy 3D assets
* Respect prefers-reduced-motion
* Keep text content accessible without 3D
* Do not block the page on 3D loading
* Provide keyboard-accessible hotspot equivalents

## Form

* Empty required fields
* Invalid email
* Very long input
* Form submission unavailable because no backend exists
* Spam-like repeated submissions

Required handling:

* Frontend validation
* Clear error messages
* Success state
* No hardcoded fake API keys
* No silent failure

## Product storytelling

* Visitor does not understand what Karigar does
* Visitor thinks it is a full repair-order system
* Visitor thinks it is an AI diagnostic product
* Visitor thinks payments/invoicing are included
* Visitor misses the main CTA

Required handling:

* Strong hero copy
* Clear “what it does” section
* Clear “not a full repair-order system yet” wording if needed
* Clear CTA repeated throughout the page

# 11. Step-by-step implementation plan

1. Inspect the existing repository.
2. Read the README and docs:

   * Product Requirements
   * User Workflows
   * Data Model
   * Roadmap
   * Pilot Plan
3. Identify current assets, brand files, CSS variables, prototype files, and scripts.
4. Create or work on a new branch:
   `codex/3d-marketing-landing`
5. Preserve all existing docs.
6. Preserve existing product prototype files unless they must be reorganized.
7. Add a modern frontend setup suitable for 3D if not already present.
8. Create the landing page structure.
9. Build the cinematic opening animation:

   * Karigar wordmark
   * screwdriver as “i”
   * zoom/pan out to workbench
   * transition into garage scene
10. Build the 3D garage scene:

* Service bays
* Parts shelves
* Bins
* Workbench
* Restock area
* Hotspots

11. Add guided demo state:

* Selected bay
* Selected appointment
* Selected parts
* Selected shelf/bin
* Restock suggestion

12. Create reusable UI components:

* Button
* Section
* FeatureCard
* StatusChip
* MetricCard
* DemoCard
* HotspotLabel
* LeadForm
* Navbar
* Footer

13. Add content sections:

* Hero
* Problem
* 3D Demo
* How It Works
* Features
* Role benefits
* Trust/privacy
* CTA

14. Implement responsive design:

* Desktop: full 3D scene
* Tablet: simplified 3D scene
* Mobile: lightweight 3D or static fallback with interactive cards

15. Add accessibility:

* Keyboard navigation
* Focus states
* Skip link
* Accessible labels
* Text alternatives for 3D hotspots
* Reduced-motion support

16. Add SEO:

* Metadata
* Open Graph
* Sitemap
* Robots
* Structured data where appropriate

17. Add form validation and demo success state.
18. Add loading and fallback states.
19. Add performance optimization:

* Lazy-load 3D canvas
* Compress assets
* Avoid huge textures
* Keep polygon count reasonable
* Use suspense/loading placeholders

20. Add tests/checks:

* Build passes
* TypeScript passes
* Lint passes
* Landing page loads
* CTAs work
* Form validation works
* Reduced-motion behavior works
* 3D fallback works

21. Update README:

* Project overview
* Setup instructions
* Scripts
* Routes
* 3D design notes
* Current limitations
* Future backend plan

22. Final polish:

* Remove lorem ipsum
* Remove unfinished TODOs from visible UI
* Check mobile
* Check accessibility
* Check loading
* Check all links/buttons
* Ensure the website clearly explains Karigar

# 12. Launch checklist

Before considering the landing page ready:

## Product clarity

* Visitor understands Karigar within 10 seconds
* Hero copy is clear
* 3D demo supports the product story
* The site does not imply unavailable features
* Waitlist/demo CTA is clear

## Visual quality

* Opening animation feels premium
* Screwdriver “i” reads correctly
* Workbench scene feels realistic and not cluttered
* 3D garage is organized
* UI overlays are readable
* Brand colors are consistent

## Technical quality

* App builds successfully
* No console errors
* No broken images/assets
* No hardcoded secrets
* No fake production backend
* No fake customer data
* 3D is lazy-loaded
* Static fallback works
* Mobile layout works

## Accessibility

* Keyboard navigation works
* Focus states visible
* Reduced motion supported
* Important content available without 3D
* Color contrast acceptable
* Buttons and hotspots have labels

## SEO

* Title and description exist
* Open Graph metadata exists
* Favicon exists
* Sitemap exists
* Robots config exists
* Semantic headings used
* Images/visuals have appropriate alt text

## Trust

* Demo uses sample data only
* No false customer claims
* No fake security claims
* Privacy/trust copy included
* Clear beta/demo positioning
* No diagnostic or fitment guarantee claims

# 13. Important constraints

Do not build:

* Real app authentication
* Real database
* Stripe/payments
* Subscription pricing
* Supplier integrations
* VIN decoding
* AI diagnostics
* Full repair-order system
* Native mobile app
* Invoice system
* Accounting integration

Do build:

* Public marketing landing page
* Cinematic Karigar logo animation
* Screwdriver “i”
* Workbench reveal
* Semi-realistic top-down 3D garage
* Interactive demo hotspots
* Product explanation sections
* Waitlist/demo form UI
* SEO setup
* Accessibility and fallback states
* Clean README update

The final result should feel like a polished 3D product website that makes Karigar memorable and easy to understand, while keeping the actual product scope honest and focused.

