"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.set(content, { opacity: 0, y: 24 });

    const tween = gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="theme-light bg-section-bg text-section-fg flex min-h-screen items-center justify-center"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center gap-6 px-6 text-center"
      >
        <p className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase">
          Ready when you are
        </p>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Aura
        </h2>
        <p className="text-section-muted text-lg sm:text-xl">From $999</p>
        <a
          href="#"
          className="bg-section-accent text-section-bg mt-2 rounded-full px-8 py-3 text-base font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          Buy
        </a>
      </div>
    </section>
  );
}
