# Apple-Style Product Page — Flow & Build Plan

## Status

Built and live at `localhost:3000` (Next.js dev server). Homepage (`/`) plus
three additional pages (`/specs`, `/about`, `/store`) and a floating,
theme-adaptive nav bar are implemented, reviewed (typecheck/lint/build all
clean), and pushed to `main`. Still open: mobile/responsive pass,
`prefers-reduced-motion` handling, real product imagery.

## 1. Concept
A single-product landing page (product: "Aura") where scrolling drives the narrative: hero → feature highlights with pinned/animated visuals → spec comparison → close with CTA. The "immersive" feel comes from scroll-linked animation (not just fade-ins), tight timing, and restrained motion (no gimmicks, every animation reinforces a message). Expanded beyond the original single-page concept into a small multi-page site once a nav bar was added.

## 2. Section-by-Section Flow (Homepage)

1. **Hero + Intro** (`app/components/sections/HeroIntro.tsx`)
   - Dark hero: eyebrow + headline + subhead, radial accent glow, fade/scale load-in (not scroll-triggered), looping scroll-down cue.
   - Light intro statement directly after: single line, scales up as user scrolls (scrub-based, no pin).

2. **Feature block 1 — Design** (`FeatureDesign.tsx`)
   - Rotating SVG shape, scroll-scrubbed rotation, 3 copy blocks cross-fading at thresholds across the scroll range.
   - Implemented as a tall (`h-[250vh]`) section with a `position: sticky` inner wrapper — not GSAP `pin: true` (see Lessons Learned).

3. **Feature block 2 — Performance** (`FeaturePerformance.tsx`)
   - Dark stat grid, 3 numbers count up on intersection, staggered.

4. **Feature block 3 — Camera & Display** (`FeatureCamera.tsx`)
   - Canvas redrawn each scroll tick based on progress (hue-shifting gradient + concentric circles) standing in for a real frame-sequence scrub.
   - Also `h-[200vh]` + sticky inner wrapper, same reasoning as the Design section.

5. **Specs + Color picker** (`SpecsAndColor.tsx`)
   - Calm, static comparison table (5 rows × Base/Pro/Pro Max) with a one-shot fade-in — intentional rest beat after the motion-heavy sections.
   - Interactive color swatches below, real-time selection state.

6. **Closing CTA** (`ClosingCTA.tsx`)
   - Price, "Buy" button, calm fade-in only — motion settles down entirely here.

## 3. Additional Pages (added after the homepage)

- **`/specs`** — expanded version of the homepage's condensed table: Display, Chip, Battery, Camera, Durability sections plus a fuller Base/Pro/Pro Max comparison table. Plain fade-ins only, no pin/scrub.
- **`/about`** — design-story narrative (philosophy, craftsmanship), one scroll-scrubbed statement moment (scrub without pin, same technique as the homepage intro statement).
- **`/store`** — interactive configurator: color + tier pickers, live-updating price, non-functional "Buy" CTA.
- **Nav bar** (`app/components/NavBar.tsx`) — fixed, blurred pill at the top of every page, auto-switches light/dark styling via an `IntersectionObserver` watching `data-theme="dark"|"light"` attributes on each section.

## 4. Core Interaction Techniques (as actually built)

| Effect | Technique |
|---|---|
| "Pinned" visual while scrolling | `position: sticky` inner wrapper inside a tall outer section — **not** GSAP `pin: true` (see Lessons Learned) |
| Scroll-scrubbed animation (rotation, canvas redraw) | ScrollTrigger `scrub: true`, no pin, driving a GSAP timeline or an `onUpdate` callback off `self.progress` |
| Smooth/inertia scrolling | Lenis, driven manually through `gsap.ticker` (`autoRaf: false`), `ScrollTrigger.update` wired to Lenis's `scroll` event |
| Count-up numbers | `ScrollTrigger.create({ once: true })` on enter, tweening a plain object's value, written into React state |
| Frame-sequence "video" | Canvas redrawn procedurally per scroll tick (placeholder for `drawImage()` on preloaded frames — no real image sequence in this demo) |
| Section theme (light/dark) | `theme-dark` / `theme-light` utility classes setting CSS vars (`--section-bg`, `--section-fg`, `--section-muted`, `--section-accent`), consumed via Tailwind `bg-section-bg` etc. |
| Nav bar theme adaptation | `data-theme` attribute per section + `IntersectionObserver` in `NavBar.tsx` |

## 5. Stack (as actually used)

- **Framework:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.
- **Scroll engine:** GSAP + ScrollTrigger.
- **Smooth scroll:** Lenis.
- **Canvas:** plain 2D canvas context, no image assets (procedural drawing stands in for a real frame sequence).
- Not used (considered in the original plan but not needed): Three.js/React Three Fiber — the "Design" section's rotating visual is a 2D SVG, not a 3D model.

## 6. Build Order — what's done vs. still open

Done:
1. Scaffold page structure.
2. Base content/copy in place (placeholder product "Aura").
3. Lenis wired globally.
4. GSAP ScrollTrigger wired section by section.
5. First pass at timing/easing.
6. Nav bar + 3 additional pages.

Still open:
7. Responsive pass — current sections assume desktop; no mobile-specific simplification yet.
8. Accessibility pass — `prefers-reduced-motion` not yet respected anywhere.
9. Performance pass — not yet profiled for scroll jank.
10. Real product imagery, if this moves beyond a technique demo.

## 7. Notes
- Every scroll effect should map to a *meaning* (rotation reveals a new angle of the product, numbers count up to emphasize a spec) — avoid motion for motion's sake.
- Pacing matters as much as individual effects: alternate high-motion sections with calm/static ones so nothing feels exhausting.

## 8. Lessons Learned

- **GSAP `pin: true` vs. `position: sticky`:** the Design and Camera sections originally used ScrollTrigger's `pin: true`. This caused a real, repeatedly-reproduced bug where the pinned section's fixed content stayed on screen past its reserved scroll distance and visually overlapped the section after it. Root cause likely: `pin: true` inserts/removes a "pin-spacer" via direct DOM mutation, which is fragile under React dev-mode's double-effect-invocation (mount → cleanup → mount again) if the cleanup doesn't fully revert it. Fix: replaced `pin: true` with a tall outer section + `position: sticky` inner wrapper, with ScrollTrigger only used (no pin) to drive scrub progress. No DOM mutation involved, so nothing to get out of sync.
- **Verify fixes live, not just by reasoning about the code.** A first attempted fix (`ScrollTrigger.refresh()` after mount) looked plausible but didn't actually work — this was only caught by screenshotting the running page in a real browser (Playwright + system Chrome), not by re-reading the code.
- **WSL file-watching across `/mnt/c` is unreliable.** The dev server can silently keep serving stale code after file edits because `inotify` doesn't reliably propagate across the Windows-drive boundary. If a fix doesn't seem to take effect, fully kill and restart the dev server (and clear `.next/`) before assuming the code is wrong.
