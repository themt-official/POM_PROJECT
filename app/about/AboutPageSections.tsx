"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY_POINTS = [
  {
    title: "Subtraction as a discipline.",
    body: "Every version of Aura begins heavier than it ends. We spend most of our time removing — parts, seams, steps — until what remains feels inevitable rather than designed.",
  },
  {
    title: "Material honesty.",
    body: "Aluminum looks like aluminum. Glass looks like glass. We don't dress one material up as another; the surface you touch is the structure that holds it together.",
  },
  {
    title: "Patience over velocity.",
    body: "A single curve on the enclosure took eleven months to finalize. We shipped it anyway, a cycle later than planned, because the alternative was shipping something we didn't believe in.",
  },
];

export default function AboutPageSections() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Opening section refs
  const openEyebrowRef = useRef<HTMLParagraphElement>(null);
  const openHeadlineRef = useRef<HTMLHeadingElement>(null);
  const openSubheadRef = useRef<HTMLParagraphElement>(null);

  // Scrubbed statement section refs
  const statementSectionRef = useRef<HTMLDivElement>(null);
  const statementTextRef = useRef<HTMLHeadingElement>(null);

  // Philosophy section refs
  const philosophySectionRef = useRef<HTMLDivElement>(null);
  const philosophyCardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Craftsmanship section refs
  const craftSectionRef = useRef<HTMLDivElement>(null);
  const craftEyebrowRef = useRef<HTMLParagraphElement>(null);
  const craftHeadlineRef = useRef<HTMLHeadingElement>(null);
  const craftBodyRef = useRef<HTMLParagraphElement>(null);

  // Closing section refs
  const closeSectionRef = useRef<HTMLDivElement>(null);
  const closeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Opening load-in animation (not scroll-triggered) ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        openEyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          openHeadlineRef.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "-=0.35",
        )
        .fromTo(
          openSubheadRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6",
        );

      // --- Scrubbed scale-up statement (the page's one standout moment) ---
      gsap.fromTo(
        statementTextRef.current,
        { scale: 0.85, opacity: 0.6 },
        {
          scale: 1.15,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: statementSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // --- Philosophy cards: scroll-triggered fade/stagger ---
      const cards = philosophyCardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      gsap.set(cards, { opacity: 0, y: 32 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: philosophySectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // --- Craftsmanship: scroll-triggered fade-in ---
      gsap.set(
        [craftEyebrowRef.current, craftHeadlineRef.current, craftBodyRef.current],
        { opacity: 0, y: 24 },
      );
      gsap.to(
        [craftEyebrowRef.current, craftHeadlineRef.current, craftBodyRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: craftSectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );

      // --- Closing: scroll-triggered fade-in ---
      gsap.set(closeContentRef.current, { opacity: 0, y: 24 });
      gsap.to(closeContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: closeSectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Opening statement */}
      <section
        data-theme="dark"
        className="theme-dark bg-section-bg text-section-fg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 text-center"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 35%, color-mix(in srgb, var(--color-section-accent) 18%, transparent), transparent 70%)",
          }}
          aria-hidden
        />
        <p
          ref={openEyebrowRef}
          className="text-section-accent relative text-sm font-medium tracking-[0.2em] uppercase"
        >
          The Story
        </p>
        <h1
          ref={openHeadlineRef}
          className="relative mt-4 text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl"
        >
          Why Aura exists.
        </h1>
        <p
          ref={openSubheadRef}
          className="text-section-muted relative mt-6 max-w-xl text-lg leading-relaxed sm:text-xl"
        >
          Not a feature list. A record of the decisions, the dead ends, and
          the small obsessions that shaped every edge of it.
        </p>
      </section>

      {/* Scrubbed statement moment */}
      <section
        ref={statementSectionRef}
        data-theme="light"
        className="theme-light bg-section-bg text-section-fg flex min-h-screen items-center justify-center px-6 text-center"
      >
        <h2
          ref={statementTextRef}
          className="text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:whitespace-nowrap"
        >
          Good design apologizes for nothing.
        </h2>
      </section>

      {/* Philosophy */}
      <section
        ref={philosophySectionRef}
        data-theme="dark"
        className="theme-dark bg-section-bg text-section-fg relative min-h-screen px-6 py-32"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase">
            Philosophy
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Three ideas we refuse to compromise on.
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {PHILOSOPHY_POINTS.map((point, i) => (
              <div
                key={point.title}
                ref={(el) => {
                  philosophyCardRefs.current[i] = el;
                }}
                className="border-section-accent/20 bg-section-fg/[0.03] rounded-2xl border p-6"
              >
                <h3 className="text-xl font-semibold tracking-tight">
                  {point.title}
                </h3>
                <p className="text-section-muted mt-3 text-base leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section
        ref={craftSectionRef}
        data-theme="light"
        className="theme-light bg-section-bg text-section-fg flex min-h-screen items-center px-6"
      >
        <div className="mx-auto max-w-3xl">
          <p
            ref={craftEyebrowRef}
            className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase"
          >
            Craftsmanship
          </p>
          <h2
            ref={craftHeadlineRef}
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            Made by hand, proven by machine.
          </h2>
          <p
            ref={craftBodyRef}
            className="text-section-muted mt-6 text-lg leading-relaxed sm:text-xl"
          >
            Every prototype starts on a workbench before it ever touches a
            production line. Engineers file, sand, and reassemble the same
            part dozens of times — not because the machines can&apos;t do it
            faster, but because a hand that has made something badly a
            hundred times is the only reliable judge of when it&apos;s finally
            right. The tolerances get written down only after the feel is
            settled.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section
        ref={closeSectionRef}
        data-theme="dark"
        className="theme-dark bg-section-bg text-section-fg flex min-h-screen items-center justify-center"
      >
        <div
          ref={closeContentRef}
          className="flex flex-col items-center gap-6 px-6 text-center"
        >
          <p className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase">
            Still going
          </p>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
            The story isn&apos;t finished. It never is.
          </h2>
          <p className="text-section-muted max-w-lg text-lg sm:text-xl">
            Aura changes every cycle. The reasons behind it mostly don&apos;t.
          </p>
        </div>
      </section>
    </div>
  );
}
