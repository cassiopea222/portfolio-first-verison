"use client";

import { useCallback, useEffect, useState } from "react";
import OrchidAnimation from "@/components/OrchidAnimation";

const EMAIL_ADDRESS = "ubulyndina@gmail.com";

export default function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    if (!emailCopied) return;
    const t = window.setTimeout(() => setEmailCopied(false), 2800);
    return () => window.clearTimeout(t);
  }, [emailCopied]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
    } catch {
      // ignore
    }
    setEmailCopied(true);
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-[900px] flex-col fluid-px pt-[48px] pb-[60px]">
      <div className="flex w-full flex-col gap-4">
        <OrchidAnimation size={90} initialFrame={1} />
        <p
          className="font-medium italic tracking-[0.44px] text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-crimson), serif", fontSize: 32, lineHeight: "40px" }}
        >
          Julia Bulyndina
        </p>
        <div className="flex w-full flex-col gap-3">
          <p className="w-full font-sans text-[16px] font-normal leading-[24px] tracking-[0.27px] text-[var(--text-secondary)]">
            She is a product designer with a love for visual craft and cohesive systems. She builds
            across interface, brand, and interaction - drawn to the small decisions that scale into
            experiences people feel.
          </p>
          <p className="w-full font-sans text-[16px] font-normal leading-[24px] tracking-[0.27px] text-[var(--text-secondary)]">
            Lately she has worked on gov dashboards, design systems, b2b logistics website &amp; a fitness app.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              data-tooltip={emailCopied ? "Copied" : "Copy"}
              onClick={(e) => {
                e.preventDefault();
                void copyEmail();
              }}
              className="py-2 font-inconsolata text-[20px] font-semibold leading-[26px] text-[var(--text-tertiary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/julia-bulyndina-872617241/"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="Go"
              className="py-2 font-inconsolata text-[20px] font-semibold leading-[26px] text-[var(--text-tertiary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
            >
              LinkedIn
            </a>
            <a
              href="/cv/julia-bulyndina-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="Open"
              className="py-2 font-inconsolata text-[20px] font-semibold leading-[26px] text-[var(--text-tertiary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
