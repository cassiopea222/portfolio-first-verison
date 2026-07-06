"use client";

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

  const onTabClick = (href: string) => {
    if (href === activeHref) return;
    router.push(href);
  };

  const pillWidth = TAB_WIDTHS[activeHref] ?? 100;
  const pillOffset = TAB_OFFSETS[activeHref] ?? 0;

  return (
    <header className="hero-enter-nav sticky top-0 z-50 mx-auto w-full max-w-[900px] fluid-px pt-6 pb-3">
      {/* ── Desktop layout: centered tabs ── */}
      <div className="hidden md:flex md:justify-center">
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

      {/* ── Mobile layout: compact inline nav ── */}
      <nav
        className="flex justify-center md:hidden"
        aria-label="Site navigation"
      >
        <div className="flex items-center gap-0.5 rounded-[40px] bg-white p-1 shadow-[0px_1px_3px_rgba(0,0,0,0.14),0px_1px_4px_rgba(0,0,0,0.10)]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={activeHref === href ? "page" : undefined}
              className={`rounded-[32px] px-3 py-[6px] font-sans text-[14px] leading-[22px] no-underline transition-colors duration-150 ${
                activeHref === href
                  ? "border-[0.7px] border-[#dfdfdf] bg-gradient-to-t from-[#e7e7e7] to-white font-medium text-[var(--text-secondary)] shadow-[0px_1px_2px_0px_rgba(184,184,184,0.35)]"
                  : "font-medium text-[var(--text-tertiary)]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
