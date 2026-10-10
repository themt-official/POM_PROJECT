# Apple-Style Product Page — Flow & Build Plan

## 1. Concept
A single-product landing page where scrolling drives the narrative: hero → feature highlights with pinned/animated visuals → spec comparison → close with CTA. The "immersive" feel comes from scroll-linked animation (not just fade-ins), tight timing, and restrained motion (no gimmicks, every animation reinforces a message).

## 2. Section-by-Section Flow

1. **Hero**
   - Full-viewport product shot or 3D render, centered.
   - Headline + subhead fade/scale in on load (not scroll-triggered — first impression should be instant).
   - Scroll-cue indicator (small arrow/text) at bottom.

2. **Intro statement**
   - Large single-line statement (e.g. "Thinner. Faster. Still iPhone.") — pinned briefly, text scales up as user scrolls.

3. **Feature block 1 — Design**
   - Product image/3D model **pinned** in viewport while user scrolls.
   - Model rotates or camera orbits tied to scroll progress (0–100% of section = rotation angle).
   - Supporting copy slides in from the side, synced to rotation stage.

4. **Feature block 2 — Performance**
   - Swap to a stat-driven layout: big numbers count up as they enter view (e.g. chip speed, battery hours).
   - Background color/theme shift (light → dark) as a section transition beat.

5. **Feature block 3 — Camera/Display/etc.**
   - Image crossfade sequence (like a canvas-based "video scrub") — scroll position maps to frame index, giving the illusion of a video playing under scroll control.

6. **Comparison / Specs table**
   - Static, clean table — intentionally calm after the motion-heavy sections (pacing contrast).

7. **Color/configuration picker**
   - Interactive swatch selector that swaps product image/material in real time.

8. **Closing CTA**
   - Price, buy button, final hero-style shot. Motion settles down entirely here.

## 3. Core Interaction Techniques

| Effect | Technique |
|---|---|
| Pin section while scrolling | `position: sticky` or GSAP ScrollTrigger `pin: true` |
| Scroll-scrubbed animation (rotation, frame sequence) | Map scroll progress (0→1) to animation timeline/frame index |
| Smooth/inertia scrolling | Lenis (or `scroll-behavior` + custom easing) |
| Count-up numbers | Trigger on intersection, animate value with easing |
| Frame-sequence "video" | Canvas + preloaded image sequence, draw frame based on scroll % |
| Section transitions (color/theme) | CSS variable interpolation tied to scroll progress |

## 4. Recommended Stack

- **Framework:** plain HTML/CSS/JS, or React/Next.js if you want componentized sections.
- **Scroll engine:** GSAP + ScrollTrigger (industry standard for this exact effect) — or Framer Motion's `useScroll`/`useTransform` if in React.
- **Smooth scroll:** Lenis (pairs natively with GSAP ScrollTrigger).
- **3D (optional, for true rotating models):** Three.js / React Three Fiber, camera driven by scroll progress instead of orbit controls.
- **Image sequence:** preload frames into an array, draw to `<canvas>`, no video file needed (matches Apple's actual technique).

## 5. Build Order (Implementation Steps)

1. Scaffold page structure — one `<section>` per flow step above, no animation yet.
2. Get base content/assets in: images or placeholder renders, copy, numbers.
3. Add Lenis for smooth scroll globally.
4. Wire GSAP ScrollTrigger section by section, starting with the simplest (count-up stats) before the hardest (pinned rotation/frame-scrub).
5. Tune timing/easing — this is most of the actual "feel" work; expect iteration.
6. Add responsive behavior — most of these effects need a simplified fallback on mobile (reduced motion, no pinning, or swap to simple fade-ins).
7. Performance pass — preload/compress image sequences, lazy-load below-fold assets, check scroll jank.
8. Accessibility pass — respect `prefers-reduced-motion`, ensure content is readable without JS/animation.

## 6. Notes
- Every scroll effect should map to a *meaning* (rotation reveals a new angle of the product, numbers count up to emphasize a spec) — avoid motion for motion's sake.
- Pacing matters as much as individual effects: alternate high-motion sections with calm/static ones (see comparison table above) so nothing feels exhausting.
