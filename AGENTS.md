# Project Instructions for Codex

## Project goal

This Vite, React, and TypeScript marketing website should be built, improved, and maintained with a strong focus on:

- clean visual design
- good UX
- responsive layout
- SEO
- accessibility
- performance
- maintainable code
- safe preview-before-production workflow

For the Karigar website, preserve this brand direction:

- clean modern workshop/digital platform feeling
- 65% polished digital platform
- 35% artisan/maker workshop
- premium, minimal, practical, and interactive
- avoid clutter, gimmicks, and overcomplicated animations

## Core working rules

1. Do not push directly to production or main.
2. Use a branch for major changes.
3. Do not deploy live without explicit user approval.
4. Show changes in a demo, local preview, Codex Cloud preview, or Vercel preview before production.
5. Keep code modular, readable, and maintainable.
6. Avoid unnecessary dependencies.
7. Explain every major change clearly.
8. Preserve the current brand direction unless the user asks for a redesign.
9. Prefer small, safe, reviewable changes over large rewrites.
10. Never hide broken builds, failing checks, or unfinished work.

## Before editing

Inspect:

- project structure
- framework
- package manager
- existing scripts
- styling system
- routing structure
- deployment setup
- existing design patterns

## Project setup

This project currently uses:

- Vite
- React
- TypeScript
- npm with `package-lock.json`
- Three.js and React Three Fiber dependencies
- Vercel configuration in `vercel.json`

Available npm scripts:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run typecheck`

There is no `test` script at the time this file was created.

## Quality checks

Before the final response, run the checks that are available in this project.

Use these commands when appropriate:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

Only run commands that exist or are appropriate for the project. If a command is missing, say so clearly.

## Website priorities

For website creation and improvement, prioritize:

1. Clear hero section and value proposition
2. Strong visual hierarchy
3. Mobile-first responsive design
4. Fast loading
5. SEO-friendly metadata and semantic HTML
6. Accessibility
7. Smooth but not distracting animations
8. Clean reusable components
9. Easy future maintenance
10. Preview before deployment

## 3D and animation guidance

If the project uses Three.js, React Three Fiber, Drei, Framer Motion, GSAP, or WebGL:

- keep scenes lightweight
- lazy-load heavy 3D assets
- optimize textures and models
- respect reduced-motion preferences
- make sure the website still works if 3D fails or loads slowly
- test mobile performance
- avoid making the site feel like a game menu unless requested

## Security workflow

- Do not add secrets, API keys, tokens, or private credentials to client code.
- Keep production deployment, environment variables, and security-sensitive changes behind explicit user approval.
- Review `vercel.json` security headers before changing scripts, inline assets, or CSP-sensitive behavior.
- If the Codex Security plugin is available, use it only for this repository or other code the user is authorized to scan.
- Report security findings clearly without hiding uncertainty or unfinished review work.

## Final response format

At the end of each task, report:

- What changed
- Files created or modified
- Commands run
- Which checks passed
- Which checks failed or were unavailable
- How to preview locally
- Whether the project is ready for Codex Cloud/Vercel preview
- Any risks or recommended next steps
