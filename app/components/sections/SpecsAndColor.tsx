"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ColorOption = {
  name: string;
  swatch: string;
};

const COLORS: ColorOption[] = [
  { name: "Silver", swatch: "#e3e4e6" },
  { name: "Graphite", swatch: "#4b4b4d" },
  { name: "Gold", swatch: "#e6c89c" },
  { name: "Midnight Blue", swatch: "#1d3557" },
  { name: "Starlight", swatch: "#f3ecdf" },
];

type SpecRow = {
  label: string;
  base: string;
  pro: string;
  proMax: string;
};

const SPECS: SpecRow[] = [
  { label: "Display", base: "6.1\" OLED", pro: "6.1\" OLED, 120Hz", proMax: "6.7\" OLED, 120Hz" },
  { label: "Chip", base: "A-series", pro: "A-series Pro", proMax: "A-series Pro" },
  { label: "Battery", base: "Up to 20 hrs", pro: "Up to 23 hrs", proMax: "Up to 29 hrs" },
  { label: "Storage", base: "128/256 GB", pro: "128/256/512 GB", proMax: "256/512/1TB GB" },
  { label: "Weight", base: "172 g", pro: "187 g", proMax: "221 g" },
];

export default function SpecsAndColor() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLORS[0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-fade-in]");

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
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="theme-dark bg-section-bg text-section-fg flex min-h-screen flex-col items-center justify-center gap-16 px-6 py-24"
    >
      {/* Specs table — calm, static rest beat */}
      <div data-fade-in className="w-full max-w-4xl">
        <h2 className="mb-2 text-center text-3xl font-semibold">Compare the lineup</h2>
        <p className="text-section-muted mb-8 text-center text-sm">
          A quiet moment to look at the numbers before you choose.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-section-muted px-5 py-4 font-medium">Spec</th>
                <th className="px-5 py-4 font-medium">Base</th>
                <th className="px-5 py-4 font-medium">Pro</th>
                <th className="px-5 py-4 font-medium">Pro Max</th>
              </tr>
            </thead>
            <tbody>
              {SPECS.map((row, i) => (
                <tr
                  key={row.label}
                  className={i !== SPECS.length - 1 ? "border-b border-white/5" : ""}
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
      </div>

      {/* Color / configuration picker */}
      <div data-fade-in className="flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-28 w-28 rounded-full ring-4 ring-white/20 ring-offset-4 ring-offset-section-bg transition-colors duration-300"
            style={{ backgroundColor: selectedColor.swatch }}
            aria-hidden
          />
          <p className="text-section-accent text-lg font-medium">{selectedColor.name}</p>
        </div>

        <div className="flex items-center gap-5">
          {COLORS.map((color) => {
            const isSelected = color.name === selectedColor.name;
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color.name}`}
                aria-pressed={isSelected}
                className={`h-10 w-10 cursor-pointer rounded-full transition-transform duration-200 ${
                  isSelected
                    ? "ring-2 ring-section-accent ring-offset-2 ring-offset-section-bg scale-110"
                    : "ring-1 ring-white/20 hover:scale-105"
                }`}
                style={{ backgroundColor: color.swatch }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
