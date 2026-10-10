"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Generic wrapper that fades in any children tagged with [data-fade-in]
 * as they scroll into view. Mirrors the pattern used in
 * app/components/sections/SpecsAndColor.tsx.
 */
function FadeSection({
  as: Tag = "section",
  theme,
  className = "",
  children,
}: {
  as?: "section";
  theme: "dark" | "light";
  className?: string;
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-fade-in]");
    if (targets.length === 0) return;

    const tween = gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <Tag
      ref={sectionRef}
      data-theme={theme}
      className={`theme-${theme} bg-section-bg text-section-fg ${className}`}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-section-accent mb-3 text-center text-sm font-medium tracking-[0.2em] uppercase">
      {children}
    </p>
  );
}

type DetailRow = { label: string; base: string; pro: string; proMax: string };

function DetailTable({ rows }: { rows: DetailRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03]">
            <th className="text-section-muted px-5 py-4 font-medium">Spec</th>
            <th className="px-5 py-4 font-medium">Base</th>
            <th className="px-5 py-4 font-medium">Pro</th>
            <th className="px-5 py-4 font-medium">Pro Max</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`transition-colors hover:bg-white/[0.04] ${
                i !== rows.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <td className="text-section-muted px-5 py-4">{row.label}</td>
              <td className="px-5 py-4">{row.base}</td>
              <td className="px-5 py-4">{row.pro}</td>
              <td className="px-5 py-4">{row.proMax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FULL_COMPARISON: DetailRow[] = [
  { label: "Display", base: "6.1\" OLED, 60Hz", pro: "6.1\" OLED, 120Hz ProMotion", proMax: "6.7\" OLED, 120Hz ProMotion" },
  { label: "Peak brightness", base: "1,600 nits", pro: "2,000 nits", proMax: "2,000 nits" },
  { label: "Chip", base: "A-series", pro: "A-series Pro", proMax: "A-series Pro" },
  { label: "Neural cores", base: "16-core", pro: "16-core", proMax: "16-core" },
  { label: "RAM", base: "6 GB", pro: "8 GB", proMax: "8 GB" },
  { label: "Storage", base: "128 / 256 GB", pro: "128 / 256 / 512 GB", proMax: "256 GB / 512 GB / 1 TB" },
  { label: "Battery (video)", base: "Up to 20 hrs", pro: "Up to 23 hrs", proMax: "Up to 29 hrs" },
  { label: "Charging", base: "20W wired, 15W wireless", pro: "27W wired, 15W wireless", proMax: "30W wired, 15W wireless" },
  { label: "Rear cameras", base: "Dual 12MP", pro: "Triple 48MP", proMax: "Triple 48MP" },
  { label: "Optical zoom", base: "2x", pro: "3x optical", proMax: "5x optical" },
  { label: "Build", base: "Aluminum & glass", pro: "Titanium & glass", proMax: "Titanium & glass" },
  { label: "Water resistance", base: "IP68", pro: "IP68", proMax: "IP68" },
  { label: "Weight", base: "172 g", pro: "187 g", proMax: "221 g" },
];

export default function SpecsPage() {
  return (
    <main>
      {/* Intro */}
      <FadeSection
        theme="dark"
        className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-32 pb-16 text-center"
      >
        <div data-fade-in>
          <Eyebrow>Technical specs</Eyebrow>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Every detail, out in the open.
          </h1>
          <p className="text-section-muted mx-auto mt-6 max-w-xl text-lg">
            A full breakdown of what&apos;s inside Aura — display, chip, battery,
            camera, and the engineering that holds it all together.
          </p>
        </div>
      </FadeSection>

      {/* Display */}
      <FadeSection
        theme="light"
        className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-24"
      >
        <div data-fade-in className="max-w-2xl text-center">
          <Eyebrow>Display</Eyebrow>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            A screen that disappears into the picture.
          </h2>
          <p className="text-section-muted text-base">
            Aura&apos;s OLED panel reaches true blacks and sustained peak
            brightness of up to 2,000 nits on Pro models, so the display stays
            legible from shade to direct sun. Pro and Pro Max add ProMotion,
            an adaptive refresh rate up to 120Hz that scales down automatically
            to save power when the content on screen is still.
          </p>
        </div>
        <div
          data-fade-in
          className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { k: "6.1\" / 6.7\"", v: "Panel sizes" },
            { k: "120Hz", v: "ProMotion refresh" },
            { k: "2,000 nits", v: "Peak brightness" },
          ].map((stat) => (
            <div
              key={stat.v}
              className="rounded-2xl border border-black/5 bg-white/40 px-6 py-8 text-center"
            >
              <p className="text-section-accent text-2xl font-semibold">{stat.k}</p>
              <p className="text-section-muted mt-1 text-sm">{stat.v}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* Performance / Chip */}
      <FadeSection
        theme="dark"
        className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-24"
      >
        <div data-fade-in className="max-w-2xl text-center">
          <Eyebrow>Performance</Eyebrow>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Built on a chip that thinks ahead.
          </h2>
          <p className="text-section-muted text-base">
            The A-series chip inside every Aura combines a high-efficiency CPU,
            a fast graphics core, and a 16-core neural engine tuned for on-device
            intelligence. Pro models step up to the A-series Pro, with a larger
            unified memory pool so the camera, display, and background tasks
            never compete for headroom.
          </p>
        </div>
        <div data-fade-in className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { k: "16-core", v: "Neural engine" },
            { k: "6-core", v: "GPU" },
            { k: "6 / 8 GB", v: "Unified memory" },
            { k: "3nm", v: "Process node" },
          ].map((stat) => (
            <div
              key={stat.v}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center"
            >
              <p className="text-section-accent text-xl font-semibold">{stat.k}</p>
              <p className="text-section-muted mt-1 text-xs">{stat.v}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* Battery & Charging */}
      <FadeSection
        theme="light"
        className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-24"
      >
        <div data-fade-in className="max-w-2xl text-center">
          <Eyebrow>Battery &amp; charging</Eyebrow>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            All-day power, gone in minutes.
          </h2>
          <p className="text-section-muted text-base">
            A larger cell and smarter power management give the Pro Max up to
            29 hours of video playback. All models support fast wired charging
            and 15W wireless charging, with Pro and Pro Max charging roughly
            50% faster than Base in the first 30 minutes.
          </p>
        </div>
        <DetailTable
          rows={[
            { label: "Video playback", base: "Up to 20 hrs", pro: "Up to 23 hrs", proMax: "Up to 29 hrs" },
            { label: "Wired charging", base: "20W", pro: "27W", proMax: "30W" },
            { label: "Wireless charging", base: "15W", pro: "15W", proMax: "15W" },
            { label: "0–50% (wired)", base: "~30 min", pro: "~22 min", proMax: "~20 min" },
          ]}
        />
      </FadeSection>

      {/* Camera */}
      <FadeSection
        theme="dark"
        className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-24"
      >
        <div data-fade-in className="max-w-2xl text-center">
          <Eyebrow>Camera</Eyebrow>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            See more, from farther away.
          </h2>
          <p className="text-section-muted text-base">
            Base ships with a capable dual-camera system for everyday shots.
            Pro and Pro Max add a third 48MP telephoto lens, with the Pro Max
            reaching 5x optical zoom — enough to bring distant detail
            convincingly close without losing clarity.
          </p>
        </div>
        <div data-fade-in className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { k: "48MP", v: "Main sensor" },
            { k: "5x", v: "Optical zoom (Pro Max)" },
            { k: "4K / 60fps", v: "Video capture" },
          ].map((stat) => (
            <div
              key={stat.v}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center"
            >
              <p className="text-section-accent text-2xl font-semibold">{stat.k}</p>
              <p className="text-section-muted mt-1 text-sm">{stat.v}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* Durability */}
      <FadeSection
        theme="light"
        className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-24"
      >
        <div data-fade-in className="max-w-2xl text-center">
          <Eyebrow>Durability</Eyebrow>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Engineered to take the knocks.
          </h2>
          <p className="text-section-muted text-base">
            Every Aura is rated IP68 for dust and water resistance, with a
            ceramic-infused front cover for scratch resistance. Pro and Pro
            Max use a titanium frame for a lighter, stronger build than the
            aluminum frame on Base.
          </p>
        </div>
        <div data-fade-in className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { k: "IP68", v: "Dust & water resistance" },
            { k: "Titanium", v: "Pro / Pro Max frame" },
            { k: "Ceramic shield", v: "Front cover" },
          ].map((stat) => (
            <div
              key={stat.v}
              className="rounded-2xl border border-black/5 bg-white/40 px-6 py-8 text-center"
            >
              <p className="text-section-accent text-2xl font-semibold">{stat.k}</p>
              <p className="text-section-muted mt-1 text-sm">{stat.v}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* Full comparison table */}
      <FadeSection
        theme="dark"
        className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-24"
      >
        <div data-fade-in className="w-full max-w-4xl">
          <Eyebrow>Full comparison</Eyebrow>
          <h2 className="mb-2 text-center text-3xl font-semibold tracking-tight">
            Base, Pro, and Pro Max — side by side
          </h2>
          <p className="text-section-muted mb-8 text-center text-sm">
            Everything from the sections above, in one place.
          </p>
          <DetailTable rows={FULL_COMPARISON} />
          <p className="text-section-muted mt-6 text-center text-xs">
            Battery life varies by use and configuration. Specifications shown
            are for illustration as part of a design portfolio demo.
          </p>
        </div>
      </FadeSection>
    </main>
  );
}
