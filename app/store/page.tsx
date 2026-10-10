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

type TierOption = {
  name: string;
  price: number;
  blurb: string;
};

const TIERS: TierOption[] = [
  { name: "Base", price: 999, blurb: "128GB storage, all-day battery." },
  { name: "Pro", price: 1199, blurb: "256GB storage, 120Hz display, faster chip." },
  { name: "Pro Max", price: 1399, blurb: "512GB storage, largest display, longest battery." },
];

export default function StorePage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLORS[0]);
  const [selectedTier, setSelectedTier] = useState<TierOption>(TIERS[0]);

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
      data-theme="dark"
      className="theme-dark bg-section-bg text-section-fg flex min-h-screen flex-col items-center gap-16 px-6 pt-32 pb-24"
    >
      {/* Intro / header */}
      <div data-fade-in className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <p className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase">
          Store
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Aura</h1>
        <p className="text-section-muted text-lg">
          Build your Aura. Choose a finish, pick a tier, and make it yours.
        </p>
      </div>

      {/* Product preview */}
      <div data-fade-in className="flex flex-col items-center gap-3">
        <div
          className="h-40 w-40 rounded-[2.5rem] shadow-2xl ring-4 ring-white/15 ring-offset-4 ring-offset-section-bg transition-colors duration-300"
          style={{ backgroundColor: selectedColor.swatch }}
          aria-hidden
        />
        <p className="text-section-fg text-base font-medium">
          Aura {selectedTier.name} &middot; {selectedColor.name}
        </p>
      </div>

      {/* Configurator */}
      <div data-fade-in className="flex w-full max-w-3xl flex-col items-center gap-14">
        {/* Color picker */}
        <div className="flex w-full flex-col items-center gap-5">
          <p className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase">
            Finish
          </p>
          <p className="text-section-muted text-sm">{selectedColor.name}</p>
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
                  className={`h-10 w-10 cursor-pointer rounded-full shadow-md transition-transform duration-200 ${
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

        {/* Tier picker */}
        <div className="flex w-full flex-col items-center gap-5">
          <p className="text-section-accent text-sm font-medium tracking-[0.2em] uppercase">
            Tier
          </p>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {TIERS.map((tier) => {
              const isSelected = tier.name === selectedTier.name;
              return (
                <button
                  key={tier.name}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-start gap-2 rounded-2xl border px-5 py-5 text-left transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? "border-section-accent bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="text-section-fg text-base font-semibold">{tier.name}</span>
                  <span className="text-section-accent text-sm font-medium">
                    ${tier.price.toLocaleString()}
                  </span>
                  <span className="text-section-muted text-xs">{tier.blurb}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex w-full flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-8">
          <div className="flex flex-col items-center gap-1">
            <p className="text-section-muted text-sm">Aura {selectedTier.name}</p>
            <p className="text-section-fg text-3xl font-semibold tracking-tight">
              ${selectedTier.price.toLocaleString()}
            </p>
          </div>
          <a
            href="#"
            className="bg-section-accent text-section-bg w-full max-w-xs rounded-full px-8 py-3 text-center text-base font-medium shadow-lg transition-transform duration-200 hover:scale-[1.02]"
          >
            Buy Aura {selectedTier.name}
          </a>
          <p className="text-section-muted text-xs">
            Demo checkout &middot; no purchase will be made
          </p>
        </div>
      </div>
    </section>
  );
}
