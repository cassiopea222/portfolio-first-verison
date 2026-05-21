"use client";

import { useCallback, useEffect, useState } from "react";

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
  { href: "/cv/julia-bulyndina-cv.pdf", label: "Resume", tooltip: "Open", external: true },
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
  const [emailCopied, setEmailCopied] = useState(false);

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

  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-[18px] fluid-px pb-[80px] pt-0">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 max-w-[731px]">
          <p
            className="font-medium italic tracking-[0.32px] text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-crimson), serif", fontSize: 32, lineHeight: "40px" }}
          >
            Julia Bulyndina
          </p>
          <div className="flex flex-col gap-3">
            <p className="font-sans text-[16px] font-normal leading-[22px] tracking-[0.2px] text-[var(--text-secondary)]">
              She is a product designer with a love for visual craft and cohesive systems. She builds
              across interface, brand, and interaction - drawn to the small decisions that scale into
              experiences people feel.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {externalLinks.map(({ href, label, tooltip, external }) =>
            label === "Email" ? (
              <div key={label} className="flex items-center gap-3">
                <a
                  href={href}
                  data-tooltip={tooltip}
                  onClick={(e) => {
                    e.preventDefault();
                    void copyEmail();
                  }}
                  className="py-2 font-inconsolata text-[18px] font-semibold leading-[24px] text-[var(--text-tertiary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
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
                className="py-2 font-inconsolata text-[18px] font-semibold leading-[24px] text-[var(--text-tertiary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
              >
                {label}
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
