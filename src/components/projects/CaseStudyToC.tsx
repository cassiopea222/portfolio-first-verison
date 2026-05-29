"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowBackNavIcon } from "@/components/icons/ArrowBackNavIcon";

export type ToCSection = { id: string; label: string };

export default function CaseStudyToC({
  sections,
  backHref = "/",
}: {
  sections: ToCSection[];
  backHref?: string;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
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
        }
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      intersecting.clear();
    };
  }, [sections]);

  return (
    <>
      {/* Sticky sidebar — visible from 810px */}
      <nav
        aria-label="Table of contents"
        className="sticky top-[120px] hidden h-fit w-[180px] shrink-0 flex-col gap-[32px] min-[810px]:flex"
      >
        <Link
          href={backHref}
          className="flex items-center gap-[6px] font-inconsolata text-[16px] font-medium leading-[18px] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
        >
          <ArrowBackNavIcon />
          <span>Go back</span>
        </Link>
        <div className="flex flex-col gap-[12px] tracking-[-0.2px]">
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

      {/* Inline go-back — mobile only (<810px) */}
      <Link
        href={backHref}
        className="type-body inline-flex w-fit items-center gap-2 rounded-xl border border-[#dadada] bg-[linear-gradient(179.23deg,#fff_4.27%,rgba(231,231,231,0.7)_98.14%)] px-3 py-2 text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,color] duration-200 ease-out hover:border-[#d5d5d5] hover:bg-[#efefef] hover:text-[var(--text-primary)] min-[810px]:hidden"
      >
        <ArrowBackNavIcon />
        Go back
      </Link>
    </>
  );
}
