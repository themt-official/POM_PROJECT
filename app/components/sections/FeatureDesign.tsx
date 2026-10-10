"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COPY_BLOCKS = [
  {
    title: "Aerospace-grade aluminum.",
    body: "Milled from a single billet, then anodized for a finish that resists scratches and the everyday wear of life in your pocket.",
  },
  {
    title: "Precision-milled in one piece.",
    body: "No seams, no fasteners. Just one continuous surface, shaped to fractions of a millimeter by five-axis machines.",
  },
  {
    title: "Balanced down to the gram.",
    body: "Every internal component is placed for weight distribution, so the form feels as considered in the hand as it looks on a shelf.",
  },
];

export default function FeatureDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const shape = shapeRef.current;
    if (!section || !shape) return;

    const ctx = gsap.context(() => {
      const copyEls = copyRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );

      // Initial state: only the first copy block visible.
      gsap.set(copyEls, { autoAlpha: 0, y: 24 });
      if (copyEls[0]) gsap.set(copyEls[0], { autoAlpha: 1, y: 0 });

      const steps = copyEls.length;

      // Driven by position: sticky in the markup below rather than GSAP's
      // pin: true — a pin-spacer insertion that didn't fully revert on a
      // dev-mode double-effect-invocation remount was causing a sibling
      // pinned section elsewhere on the page to overlap the content after
      // it. Sticky has no DOM mutation to get out of sync, so this
      // ScrollTrigger only drives the timeline's scrub progress now.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: true,
        },
      });

      // Continuous rotation tied directly to scroll progress.
      tl.to(shape, { rotate: 360, ease: "none" }, 0);

      // Cross-fade copy blocks at even thresholds across the pinned duration.
      copyEls.forEach((el, i) => {
        const segment = 1 / steps;
        const start = i * segment;

        if (i > 0) {
          tl.to(
            copyEls[i - 1],
            { autoAlpha: 0, y: -24, ease: "none", duration: segment * 0.3 },
            start - segment * 0.15,
          );
          tl.to(
            el,
            { autoAlpha: 1, y: 0, ease: "none", duration: segment * 0.3 },
            start - segment * 0.15,
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="theme-light bg-section-bg text-section-fg relative h-[250vh]"
    >
      <div className="sticky top-0 mx-auto flex h-screen max-w-6xl flex-col items-center justify-center gap-12 overflow-hidden px-6 md:flex-row md:gap-20">
        <div className="relative flex h-72 w-72 flex-shrink-0 items-center justify-center md:h-96 md:w-96">
          <div
            className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-section-accent) 35%, transparent), transparent 70%)",
            }}
            aria-hidden
          />
          <div
            ref={shapeRef}
            className="relative flex h-full w-full items-center justify-center"
            style={{ willChange: "transform" }}
          >
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full drop-shadow-2xl"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="design-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-section-accent, #6366f1)" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <rect
                x="30"
                y="30"
                width="140"
                height="140"
                rx="32"
                fill="url(#design-gradient)"
                opacity="0.9"
              />
              <rect
                x="60"
                y="60"
                width="80"
                height="80"
                rx="18"
                fill="none"
                stroke="white"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <circle cx="100" cy="100" r="10" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
        </div>

        <div className="relative w-full max-w-md md:w-96">
          {COPY_BLOCKS.map((block, i) => (
            <div
              key={block.title}
              ref={(el) => {
                copyRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center gap-3"
            >
              <p className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase">
                Design
              </p>
              <h3 className="text-section-fg text-3xl font-semibold tracking-tight md:text-4xl">
                {block.title}
              </h3>
              <p className="text-section-muted text-base leading-relaxed md:text-lg">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
