"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
];

const EMAIL_ADDRESS = "ubulyndina@gmail.com";

const externalLinks: {
  href: string;
  label: string;
  tooltip: string;
  external?: boolean;
}[] = [
  { href: `mailto:${EMAIL_ADDRESS}`, label: "Email", tooltip: "Copy" },
  {
    href: "https://www.linkedin.com/in/julia-bulyndina-872617241/",
    label: "LinkedIn",
    tooltip: "Go",
    external: true,
  },
  { href: "/cv/julia-bulyndina-cv.pdf", label: "CV", tooltip: "Open", external: true },
];

function EmailCopiedPill() {
  return (
    <span
      role="status"
      aria-live="polite"
      className="inline-flex shrink-0 items-center justify-center rounded-[20px] border-[0.7px] border-[#dadada] bg-[linear-gradient(179deg,#fff_4.27%,#e7e7e7_98%)] px-2 py-1.5 font-sans text-[14px] font-medium leading-[16px] text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)]"
    >
      Copied
    </span>
  );
}

export default function Hero() {
  const router = useRouter();
  const pathname = usePathname();
  const activeHref = pathname === "/about" ? "/about" : "/";
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

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

  useEffect(() => {
    if (!emailCopied) return;
    const t = window.setTimeout(() => setEmailCopied(false), 2800);
    return () => window.clearTimeout(t);
  }, [emailCopied]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setEmailCopied(true);
    } catch {
      setEmailCopied(true);
    }
  }, []);

  const onTabClick = (href: string) => {
    if (href === activeHref) return;
    router.push(href);
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] fluid-px-home pb-[100px] pt-[40px] min-[810px]:pb-[120px]">
      <div className="flex w-full items-start justify-between">
        {/* Left: orchid + name + description */}
        <div className="flex w-full max-w-[584px] flex-col gap-6">
          <div className="relative h-[94px] w-[92px] shrink-0 overflow-hidden">
            <Image
              src="/orchid/2.webp"
              alt=""
              fill
              sizes="92px"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="flex flex-col gap-3">
            <p
              className="font-medium italic tracking-[0.32px] text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-crimson), serif", fontSize: 32, lineHeight: "40px" }}
            >
              Julia Bulyndina
            </p>
            <p className="text-[18px] font-medium leading-7 text-[var(--text-secondary)]">
              She is a product designer with a love for visual craft and cohesive systems. She builds
              across interface, brand, and interaction - drawn to the small decisions that scale into
              experiences people feel.
            </p>
          </div>

          {/* Contact links */}
          <div className="flex items-center gap-6">
            {externalLinks.map(({ href, label, tooltip, external }) =>
              label === "Email" ? (
                <div key={label} className="flex items-center gap-3">
                  <a
                    href={href}
                    data-tooltip={tooltip}
                    onClick={(e) => { e.preventDefault(); void copyEmail(); }}
                    className="py-2 text-[18px] font-semibold leading-[26px] text-[var(--text-tertiary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
                  >
                    {label}
                  </a>
                  {emailCopied ? <EmailCopiedPill /> : null}
                </div>
              ) : (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  data-tooltip={tooltip}
                  className="py-2 text-[18px] font-semibold leading-[26px] text-[var(--text-tertiary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
                >
                  {label}
                </a>
              ),
            )}
          </div>
        </div>

        {/* Right: desktop nav links */}
        <div className="hidden items-center gap-6 min-[810px]:flex">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              ref={(node) => {
                tabRefs.current[href] = node;
              }}
              type="button"
              onClick={() => onTabClick(href)}
              className={`inline-flex items-center py-2 text-[18px] font-medium leading-[26px] transition-colors duration-200 ease-out ${
                activeHref === href
                  ? "cursor-default text-[var(--text-primary)]"
                  : "cursor-pointer text-[var(--text-secondary)]"
              }`}
              aria-pressed={activeHref === href}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-[var(--text-primary)] min-[810px]:hidden"
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

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 z-50 flex min-h-0 min-w-0 flex-col overflow-y-auto bg-white min-[810px]:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex items-center justify-between fluid-px-home pt-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="group flex max-w-[216px] items-center gap-4 overflow-visible text-[var(--text-primary)] no-underline"
            >
              <p className="flex items-baseline overflow-visible py-[2px] leading-[32px] text-[var(--text-primary)]">
                <span
                  className="inline-block -ml-[3px] pb-[1px] pl-[3px] italic tracking-[0.24px] transition-colors duration-200 ease-out group-hover:bg-[linear-gradient(90deg,_rgb(231,114,163)_0%,_rgb(193,105,197)_34.971%,_rgb(172,185,51)_70.77%,_rgb(221,150,28)_100%)] group-hover:bg-clip-text group-hover:text-transparent"
                  style={{ fontFamily: "var(--font-crimson), serif", fontSize: 24, lineHeight: "32px" }}
                >
                  Julia Bulyndina{" "}
                </span>
                <span
                  className="inline-block pb-[1px] font-bold italic transition-colors duration-200 ease-out group-hover:bg-[linear-gradient(90deg,_rgb(231,114,163)_0%,_rgb(193,105,197)_34.971%,_rgb(172,185,51)_70.77%,_rgb(221,150,28)_100%)] group-hover:bg-clip-text group-hover:text-transparent"
                  style={{ fontFamily: "var(--font-crimson), serif", fontSize: 20, lineHeight: "32px" }}
                >
                  ⋆˙⟡
                </span>
              </p>
            </Link>
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

          <div className="mt-6 flex flex-1 flex-col gap-3 fluid-px-home pb-8">
            <nav className="flex flex-col gap-0.5" aria-label="Primary">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeHref === href ? "page" : undefined}
                  className={`inline-flex max-w-full justify-center self-start py-2 text-[18px] leading-[26px] no-underline text-[var(--text-primary)] ${
                    activeHref === href ? "font-medium" : "font-medium"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="h-px w-full shrink-0 bg-[#ededed]" aria-hidden="true" />
            <div className="flex flex-col gap-0.5">
              {externalLinks.map(({ href, label, tooltip, external }) =>
                label === "Email" ? (
                  <div key={label} className="flex flex-wrap items-center gap-3 py-2">
                    <a
                      href={href}
                      data-tooltip={tooltip}
                      onClick={(e) => {
                        e.preventDefault();
                        void copyEmail();
                      }}
                      className="text-[18px] font-medium leading-[26px] text-[var(--text-primary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
                    >
                      {label}
                    </a>
                    {emailCopied ? <EmailCopiedPill /> : null}
                  </div>
                ) : (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    data-tooltip={tooltip}
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex justify-center self-start py-2 text-[18px] font-medium leading-[26px] text-[var(--text-primary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
                  >
                    {label}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
