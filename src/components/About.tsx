import { Fragment } from "react";
import Image from "next/image";

import FooterNote from "@/components/FooterNote";
import SpotifyWidget from "@/components/SpotifyWidget";

type ExperienceBlock = {
  key: string;
  title: string;
  company?: string;
  date: string;
  description?: string;
  bullets?: string[];
};

const experience: ExperienceBlock[] = [
  {
    key: "fireart",
    title: "Product Designer",
    company: "Fireart Studio",
    date: "Jul 2022 - Present",
    description:
      "Via Fireart Studio, worked across a range of client projects spanning fintech, government, fitness, cybersecurity, and logistics.",
  },
  {
    key: "nda",
    title: "Governmental B2C platform - NDA",
    date: "Jan 2025 – June 2026",
    bullets: [
      "Owned and led multiple core flows end-to-end.",
      "Created the visual foundation of the design system: color system, typography, design tokens.",
      "Built and maintained the Figma component library with variables, auto-layout, and component slots.",
    ],
  },
  {
    key: "sadie",
    title: "Fitness app - Sadie Active",
    date: "Oct 2023 – Feb 2024",
    bullets: [
      "Redesigned the full mobile experience - training and nutrition flows - with a focus on emotional engagement and habit formation.",
      "Led user research to identify friction points and redesign key flows for retention.",
    ],
  },
  {
    key: "gettr",
    title: "Social media platform - GETTR",
    date: "Jan 2023 – Oct 2023",
    bullets: [
      "Designed core communication flows: text messaging, live video streaming, real-time interaction patterns.",
      "Worked on complex multi-state screens at scale - high-traffic features with dense engagement loops.",
      "Improved usability and engagement across the platform's most active surfaces.",
    ],
  },
  {
    key: "cortwo",
    title: "Cybersecurity startup - Cortwo",
    date: "Nov 2024 – Jan 2025",
    bullets: [
      "Designed early product concepts: key user journeys and interaction patterns for secure communication.",
    ],
  },
  {
    key: "nextg",
    title: "Crypto payments platform - NextG / Aeon",
    date: "Feb 2024 – June 2024",
    bullets: [
      "Designed core money flows: balances, transfers, withdrawals, blockchain wallet.",
      "Built and maintained the product design system; advanced prototyping for multi-step transactional journeys.",
    ],
  },
  {
    key: "freelance",
    title: "UX/UI Designer",
    company: "Freelance",
    date: "Sep 2021 - Jul 2022",
    description:
      "Designed web and mobile interfaces for early-stage clients across different domains - from first wireframes to polished UI. Handled projects end to end, working directly with clients to turn requirements into usable products.",
  },
];

const headingFont = {
  fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif",
  letterSpacing: "0.01em",
};

export default function About() {
  return (
    <>
      <section className="mx-auto flex w-full max-w-[900px] flex-col items-start justify-center px-[90px] pt-[100px] pb-[60px]">
        <div className="flex w-full flex-col gap-[60px]">
          <div className="hero-enter-heading flex w-full flex-col gap-[60px]">
            <div
              data-tooltip="It's me!"
              className="relative h-[260px] w-[241px] self-start overflow-hidden rounded-[24px]"
            >
              <Image
                src="/about/portrait-v2.jpg"
                alt="Julia's portrait"
                fill
                priority
                quality={95}
                sizes="360px"
                className="object-cover"
              />
            </div>

            <div className="flex w-full flex-col gap-[24px]">
              <h1
                className="font-semibold text-[var(--text-primary)]"
                style={{ ...headingFont, fontSize: 32, lineHeight: "40px" }}
              >
                Hi there!
              </h1>
              <div className="flex flex-col gap-[32px]">
                <div className="flex w-full flex-col gap-4 font-sans text-[20px] font-normal leading-[28px] text-[var(--text-secondary)]">
                  <p>
                    Originally from Ukraine, I was curious about art and then the
                    design from my childhood - I built my first website at the age
                    of 10 using sites constructor.
                  </p>
                  <p>
                    What I love about this work is observing how people interact
                    with interfaces. There&apos;s something fascinating about what
                    makes an interaction feel intuitive, and I love being the
                    person who gets to shape that. I care a lot about craft and
                    visuals - I think it shapes the experience long before a user
                    even starts interacting with the product.
                  </p>
                  <p>
                    Over 4 years I&apos;ve worked across a broad range of product
                    types - social platforms, fintech, fitness apps, government
                    platforms - moving between real-time, engagement-driven
                    experiences and more structured, high-stakes systems. I like
                    that range: it means adapting my approach to what the product
                    actually needs, rather than applying the same playbook
                    everywhere.
                  </p>
                  <p>
                    Outside the work I draw, explore niche perfumery and do yoga.
                  </p>
                </div>
                <div className="flex items-center gap-[24px]">
                  <a
                    href="mailto:ubulyndina@gmail.com"
                    data-tooltip="Copy"
                    className="font-sans text-[20px] font-medium leading-[28px] text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--text-primary)]"
                  >
                    Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/julia-bulyndina-872617241/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tooltip="Go"
                    className="font-sans text-[20px] font-medium leading-[28px] text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--text-primary)]"
                  >
                    Linkedin
                  </a>
                  <a
                    href="/cv/julia-bulyndina-cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tooltip="Open"
                    className="font-sans text-[20px] font-medium leading-[28px] text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--text-primary)]"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[32px]">
            <h2
              className="font-semibold text-[var(--text-primary)]"
              style={{ ...headingFont, fontSize: 32, lineHeight: "40px" }}
            >
              Experience
            </h2>

            <div className="flex flex-col gap-[24px]">
              {experience.map((exp, i) => (
                <Fragment key={exp.key}>
                  {i > 0 && <div className="h-px w-full bg-[#e5e5e5]" />}
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex w-full items-center justify-between gap-4 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-1">
                      <div className="flex items-center gap-3">
                        <p
                          className={`text-[20px] font-medium leading-6 ${
                            exp.company ? "text-[var(--text-primary)]" : "text-black/90"
                          }`}
                        >
                          {exp.title}
                        </p>
                        {exp.company && (
                          <p className="text-[20px] font-medium leading-6 text-black/40">
                            {exp.company}
                          </p>
                        )}
                      </div>
                      <p className="whitespace-nowrap text-[18px] font-medium leading-[26px] text-[#787878]">
                        {exp.date}
                      </p>
                    </div>
                    {exp.description ? (
                      <p className="font-sans text-[20px] font-normal leading-[28px] text-[var(--text-secondary)]">
                        {exp.description}
                      </p>
                    ) : (
                      <ul className="flex list-disc flex-col gap-[10px] pl-[30px] font-sans text-[20px] font-normal leading-[28px] text-[var(--text-secondary)]">
                        {exp.bullets!.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Widgets */}
        <div className="mt-[80px] grid w-full grid-cols-1 gap-4 min-[810px]:grid-cols-2">
          <SpotifyWidget className="min-w-0" />

          <article
            data-tooltip="Currently building"
            className="flex min-w-0 flex-col justify-between overflow-hidden rounded-[12px] border border-[#cecece] bg-gradient-to-b from-white to-[#d4d4d4] to-[182.4%] px-3 py-2 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.08)]"
          >
            <div className="flex flex-col gap-[2px]">
              <div className="type-mono flex items-center justify-between">
                <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                  Tbilisi, Georgia
                </p>
                <p className="text-[20px] font-medium leading-7 tracking-[0.4px] text-[var(--text-primary)]">
                  5°C
                </p>
              </div>
              <p className="type-mono text-[14px] font-medium leading-5 tracking-[-0.14px] text-[var(--text-tertiary)]">
                Partly Cloudy · Feels like 3°
              </p>
            </div>
            <div className="type-mono flex items-center justify-between">
              <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                12:30 AM
              </p>
              <p className="text-[14px] font-medium leading-5 text-[var(--text-tertiary)]">
                -4 hrs CET
              </p>
            </div>
          </article>
        </div>
      </section>
      <FooterNote />
    </>
  );
}
