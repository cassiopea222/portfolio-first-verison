"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
];

// Tab widths match Figma: Work=100px, About=104px, Playground=measured in Step 4
const TAB_WIDTHS: Record<string, number> = { "/": 100, "/about": 104, "/playground": 118 };
// Offset = sum of widths of all tabs before this one
const TAB_OFFSETS: Record<string, number> = { "/": 0, "/about": 100, "/playground": 204 };

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const activeHref =
    pathname === "/about"
      ? "/about"
      : pathname === "/playground"
      ? "/playground"
      : "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const onTabClick = (href: string) => {
    if (href === activeHref) return;
    router.push(href);
  };

  const pillWidth = TAB_WIDTHS[activeHref] ?? 100;
  const pillOffset = TAB_OFFSETS[activeHref] ?? 0;

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-[900px] fluid-px pt-6 pb-3">
      {/* ── Desktop layout: centered tabs ── */}
      <div className="hidden min-[810px]:flex min-[810px]:justify-center">
        <div
          className="relative flex items-center rounded-[40px] bg-white p-1 shadow-[0px_1px_3px_rgba(0,0,0,0.14),0px_1px_4px_rgba(0,0,0,0.10)]"
          role="tablist"
          aria-label="Site navigation"
        >
          {/* Sliding active pill */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-1 left-1 rounded-[32px] border-[0.7px] border-[#dfdfdf] bg-gradient-to-t from-[#e7e7e7] to-white shadow-[0px_1px_2px_0px_rgba(184,184,184,0.35)]"
            style={{
              width: pillWidth,
              transform: `translateX(${pillOffset}px)`,
              transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), width 220ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              role="tab"
              type="button"
              aria-selected={activeHref === href}
              onClick={() => onTabClick(href)}
              style={{ width: TAB_WIDTHS[href] }}
              className={`relative z-10 py-[6px] text-center font-sans text-[16px] leading-[26px] transition-colors duration-150 ${
                activeHref === href
                  ? "cursor-default font-medium text-[var(--text-secondary)]"
                  : "cursor-pointer font-medium text-[var(--text-tertiary)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile layout: hamburger ── */}
      <div className="flex items-center justify-end min-[810px]:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          className="inline-flex h-6 w-6 items-center justify-center text-[var(--text-primary)]"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 z-50 flex min-h-0 min-w-0 flex-col overflow-y-auto bg-white min-[810px]:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex items-center justify-between fluid-px pt-6">
            <div className="flex max-w-[216px] items-center gap-4 overflow-visible text-[var(--text-primary)]">
              <p className="flex items-baseline overflow-visible py-[2px] leading-[32px] text-[var(--text-primary)]">
                <span
                  className="inline-block -ml-[3px] pb-[1px] pl-[3px] italic tracking-[0.24px]"
                  style={{ fontFamily: "var(--font-crimson), serif", fontSize: 24, lineHeight: "32px" }}
                >
                  Julia Bulyndina{" "}
                </span>
                <span
                  className="inline-block pb-[1px] font-bold italic"
                  style={{ fontFamily: "var(--font-crimson), serif", fontSize: 20, lineHeight: "32px" }}
                >
                  ⋆˙⟡
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-[var(--text-primary)]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex flex-1 flex-col gap-3 fluid-px pb-8">
            <nav className="flex flex-col gap-0.5" aria-label="Primary">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeHref === href ? "page" : undefined}
                  className="inline-flex max-w-full justify-center self-start py-2 font-sans text-[14px] font-medium leading-[18px] text-[var(--text-primary)] no-underline"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
