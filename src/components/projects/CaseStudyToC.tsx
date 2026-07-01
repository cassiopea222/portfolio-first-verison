"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowBackNavIcon } from "@/components/icons/ArrowBackNavIcon";

export type ToCSection = { id: string; label: string };

const TOP_ID = "__top";

export default function CaseStudyToC({
  sections,
  backHref = "/",
  title,
}: {
  sections: ToCSection[];
  backHref?: string;
  title?: string;
}) {
  const [activeId, setActiveId] = useState(title ? TOP_ID : sections[0]?.id ?? "");
  const intersectingRef = useRef(new Set<string>());

  useEffect(() => {
    if (!sections.length) return;

    const intersecting = intersectingRef.current;
    intersecting.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });

        // Topmost section in document order that is currently visible
        const firstVisible = sections.find(({ id }) => intersecting.has(id));
        if (firstVisible) {
          setActiveId(firstVisible.id);
        } else if (intersecting.size === 0) {
          // Nothing in the zone — if first section hasn't scrolled into view yet, reset to top
          const firstEl = document.getElementById(sections[0].id);
          if (firstEl && firstEl.getBoundingClientRect().top > window.innerHeight * 0.4) {
            setActiveId(title ? TOP_ID : sections[0].id);
          }
        }
      },
      // threshold: 0 fires as soon as any pixel enters/exits the zone,
      // preventing fast-scroll from skipping sections entirely
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      intersecting.clear();
    };
  }, [sections, title]);

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-[120px] hidden h-fit w-[180px] shrink-0 flex-col gap-[32px] min-[1200px]:flex"
    >
      <Link
        href={backHref}
        className="flex items-center gap-[6px] font-inconsolata text-[16px] font-medium leading-[18px] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowBackNavIcon />
        <span>Go back</span>
      </Link>
      <div className="flex flex-col gap-[12px] tracking-[-0.2px]">
        {title && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveId(TOP_ID);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`font-inconsolata text-[16px] leading-[18px] transition-colors ${
              activeId === TOP_ID
                ? "font-semibold text-[var(--text-primary)]"
                : "font-medium text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {title}
          </a>
        )}
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveId(id);
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`font-inconsolata text-[16px] leading-[18px] transition-colors ${
              activeId === id
                ? "font-semibold text-[var(--text-primary)]"
                : "font-medium text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
