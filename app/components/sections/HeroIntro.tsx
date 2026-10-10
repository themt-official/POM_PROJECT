"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroIntro() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero load-in animation (not scroll-triggered)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1 }
      ).fromTo(
        subheadRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      // Looping scroll-down cue animation
      gsap.to(scrollCueRef.current, {
        y: 10,
        duration: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Scrub-based scale-up of the intro statement as user scrolls through it
      gsap.fromTo(
        introTextRef.current,
        { scale: 0.85, opacity: 0.6 },
        {
          scale: 1.15,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={heroRef}>
      <section className="theme-dark bg-section-bg text-section-fg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <h1
          ref={headlineRef}
          className="text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl"
        >
          Introducing Nothing New.
        </h1>
        <p
          ref={subheadRef}
          className="text-section-muted mt-6 max-w-xl text-lg sm:text-xl"
        >
          A portfolio demo of scroll-driven storytelling, built the way the
          best product pages are.
        </p>

        <div
          ref={scrollCueRef}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-section-muted text-xs uppercase tracking-widest">
            Scroll
          </span>
          <svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
            className="text-section-accent"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="26"
              rx="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="8" r="2" fill="currentColor" />
          </svg>
        </div>
      </section>

      <section
        ref={introRef}
        className="theme-light bg-section-bg text-section-fg flex min-h-screen items-center justify-center px-6 text-center"
      >
        <h2
          ref={introTextRef}
          className="whitespace-nowrap text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          Thinner. Faster. Still here.
        </h2>
      </section>
    </div>
  );
}
