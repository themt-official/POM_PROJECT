"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  label: string;
  target: number;
  suffix: string;
  decimals?: number;
};

const STATS: Stat[] = [
  { label: "Faster chip", target: 2, suffix: "x" },
  { label: "Battery life", target: 18, suffix: " hrs" },
  { label: "Camera", target: 48, suffix: "MP" },
];

export default function FeaturePerformance() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tweens: gsap.core.Tween[] = [];

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        STATS.forEach((stat, index) => {
          const proxy = { value: 0 };
          const tween = gsap.to(proxy, {
            value: stat.target,
            duration: 1.4,
            delay: index * 0.15,
            ease: "power2.out",
            onUpdate: () => {
              setValues((prev) => {
                const next = [...prev];
                next[index] = proxy.value;
                return next;
              });
            },
          });
          tweens.push(tween);
        });
      },
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="theme-dark bg-section-bg text-section-fg flex min-h-screen items-center justify-center"
    >
      <div className="flex w-full max-w-5xl flex-col items-center gap-16 px-6">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">
          Performance, redefined
        </h2>
        <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-3">
          {STATS.map((stat, index) => {
            const decimals = stat.decimals ?? 0;
            const displayValue = values[index].toFixed(decimals);
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="text-section-accent text-6xl font-bold tabular-nums sm:text-7xl">
                  {displayValue}
                  {stat.suffix}
                </span>
                <span className="text-section-muted text-lg">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
