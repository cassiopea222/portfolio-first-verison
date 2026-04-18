"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About me" },
];

const externalLinks = [
  { href: "mailto:hello@example.com", label: "Email", tooltip: "Copy" },
  { href: "https://linkedin.com", label: "LinkedIn", tooltip: "Go!" },
  { href: "#", label: "CV", tooltip: "See" },
];
const TAB_PILL_INSET = 4;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const activeHref = pathname === "/about" ? "/about" : "/";
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState({ x: 0, width: 0, height: 0, ready: false });

  const updatePill = useCallback((href: string) => {
    const container = tabsContainerRef.current;
    const target = tabRefs.current[href];
    if (!container || !target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setPill({
      x: targetRect.left - containerRect.left - TAB_PILL_INSET,
      width: targetRect.width,
      height: targetRect.height,
      ready: true,
    });
  }, []);

  useLayoutEffect(() => {
    updatePill(activeHref);
  }, [activeHref, updatePill]);

  useEffect(() => {
    updatePill(activeHref);
  }, [activeHref, updatePill]);

  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => updatePill(activeHref));
    observer.observe(container);
    return () => observer.disconnect();
  }, [activeHref, updatePill]);

  const onTabClick = (href: string) => {
    if (href === activeHref) return;
    updatePill(href);
    router.push(href);
  };

  return (
    <header className="relative mx-auto flex w-full max-w-[1440px] items-center px-6 py-6 md:px-14 lg:px-[140px]">
      <Link
        href="/"
        className="group flex items-center gap-4 overflow-visible text-[var(--text-primary)] no-underline"
      >
        <p className="flex items-baseline overflow-visible py-[2px] leading-[32px] text-[var(--text-primary)]">
          <span
            className="inline-block pb-[1px] italic tracking-[0.24px] transition-colors duration-200 ease-out group-hover:bg-[linear-gradient(90deg,_rgb(231,114,163)_0%,_rgb(193,105,197)_34.971%,_rgb(172,185,51)_70.77%,_rgb(221,150,28)_100%)] group-hover:bg-clip-text group-hover:text-transparent"
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

      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
        <div
          ref={tabsContainerRef}
          className="relative flex w-[228px] items-center rounded-[40px] bg-white p-1 shadow-[0px_0.5px_4px_0px_rgba(0,0,0,0.2),0px_1px_4px_0px_rgba(0,0,0,0.1)]"
        >
          <div
            className="absolute left-1 top-1 z-0 rounded-[60px] border-[0.7px] border-[#cecece] bg-gradient-to-t from-[#e6e6e6] from-[8.552%] to-white shadow-[0px_2px_3px_0px_rgba(184,184,184,0.35)] transition-[transform,width] duration-300 ease-out"
            style={{
              transform: `translateX(${pill.x}px)`,
              width: 110,
              height: pill.height,
              opacity: pill.ready ? 1 : 0,
            }}
          />
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              ref={(node) => {
                tabRefs.current[href] = node;
              }}
              type="button"
              onClick={() => onTabClick(href)}
              className={`type-nav relative z-10 flex h-10 w-[110px] items-center justify-center rounded-[60px] py-2 transition-colors duration-200 ease-out ${
                activeHref === href ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
              }`}
              aria-pressed={activeHref === href}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="ml-auto hidden w-[216px] items-center justify-end gap-5 lg:flex">
        {externalLinks.map(({ href, label, tooltip }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            data-tooltip={tooltip}
            className="inline-flex items-center py-2 text-[16px] font-normal leading-[18px] text-[var(--text-secondary)] no-underline"
          >
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}
