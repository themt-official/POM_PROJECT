"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureCamera() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (progress: number) => {
      const { width, height } = canvas;
      // In production this would instead call ctx.drawImage() on a preloaded frame
      // indexed by Math.floor(progress * totalFrames), rather than drawing procedurally.
      ctx.clearRect(0, 0, width, height);

      const hue = 200 + progress * 120;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `hsl(${hue}, 70%, 92%)`);
      gradient.addColorStop(1, `hsl(${hue + 40}, 70%, 80%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) * 0.35;
      const radius = maxRadius * (0.2 + progress * 0.8);
      const rotation = progress * Math.PI * 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue + 180}, 60%, 35%)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue + 180}, 60%, 55%)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue + 180}, 70%, 85%)`;
      ctx.fill();

      ctx.restore();
    };

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(progressRef.current);
    };

    resize();
    window.addEventListener("resize", resize);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        draw(self.progress);
      },
    });
    scrollTriggerRef.current = trigger;

    return () => {
      window.removeEventListener("resize", resize);
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="theme-light bg-section-bg text-section-fg relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0 bg-black/10"
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <p className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase">
          Camera &amp; Display
        </p>
        <p className="text-section-fg text-3xl font-semibold tracking-tight sm:text-5xl">
          Every detail, redesigned.
        </p>
        <p className="text-section-muted max-w-md text-sm leading-relaxed sm:text-base">
          Scroll to scrub through the sequence — the drawing updates frame by
          frame with your position.
        </p>
      </div>
    </section>
  );
}
