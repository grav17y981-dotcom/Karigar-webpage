---
name: performance-optimizer
description: Use this skill when improving website speed, bundle size, loading behavior, Core Web Vitals, image optimization, asset loading, animation performance, and build output.
---

When optimizing performance:

1. Inspect dependencies and bundle-heavy code.
2. Avoid adding unnecessary packages.
3. Lazy-load heavy components where appropriate.
4. Optimize images and media.
5. Optimize 3D assets, textures, and animations.
6. Avoid blocking the main thread.
7. Respect reduced-motion preferences.
8. Check mobile performance.
9. Run build checks.
10. Report measurable improvements where possible.

For 3D or animation-heavy sites:

- lazy-load 3D scenes
- provide loading states
- use compressed assets where possible
- avoid excessive lights, shadows, geometry, and huge textures
- avoid autoplay effects that hurt usability
- keep the page usable before the 3D scene fully loads
