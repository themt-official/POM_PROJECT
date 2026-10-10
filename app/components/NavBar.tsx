"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/specs", label: "Specs" },
  { href: "/about", label: "About" },
  { href: "/store", label: "Store" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Tracks which themed section currently sits behind the nav bar, so the
  // bar's own colors can flip to stay legible as the page scrolls between
  // theme-dark and theme-light bands. Re-runs whenever the route changes,
  // since each page has its own set of [data-theme] sections.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-theme]"),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const next = entry.target.getAttribute("data-theme");
            if (next === "dark" || next === "light") setTheme(next);
          }
        }
      },
      {
        // A thin horizontal band just under the nav bar — whichever
        // section occupies it "wins" the nav bar's theme.
        rootMargin: "-1px 0px -95% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const isDark = theme === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex items-center gap-8 rounded-full border px-6 py-2.5 backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? "border-white/10 bg-black/30 text-white"
            : "border-black/10 bg-white/60 text-[#1d1d1f]"
        }`}
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Aura
        </Link>
        <ul className="flex items-center gap-6">
          {LINKS.slice(1).map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-opacity hover:opacity-100 ${
                    active ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
