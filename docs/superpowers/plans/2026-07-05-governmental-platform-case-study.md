# Governmental Platform Case Study + Inter Font Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Governmental Platform case study page from Figma (node `552-8876`, file `J3uPwVk6E3k2rI1b1RTP7S`), and migrate the site's sans font from Geist to Inter + Inter Display to match Figma, applying the same heading treatment to the existing case studies.

**Architecture:** This is a content-only Next.js App Router project with no test runner (`package.json` has no test script). Verification per task is: `npm run lint`, `npm run build` (which statically renders every case study via `generateStaticParams`, so a broken component fails the build), and a `curl` smoke-check of the rendered HTML for expected strings. There is no browser-automation tool available in this environment — final visual sign-off in an actual browser is the user's job; say so explicitly, don't claim visual verification you didn't do.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, `next/font/google` + `next/font/local`, `next/image`.

## Global Constraints

- Design source of truth: Figma node `552-8876`, file key `J3uPwVk6E3k2rI1b1RTP7S`. All copy is verbatim from that node (already extracted into this plan — do not re-fetch Figma).
- Font stack: `Inter` (via `next/font/google`) for body/default sans; existing local `Inter Display` (SemiBold-only, `--font-inter-display`) for all section/page headings. Geist (sans) is removed; Geist Mono stays for `--font-mono`.
- Image assets already downloaded into `public/home/governmental-platform/` (see Task 3 for the full list) — do not re-download, they're committed as part of this work.
- No new npm dependencies.
- Reuse `CaseStudyLayout`, `CaseStudyToC`, `CaseStudyMeta`, `ScaledCover` as-is (one small additive prop on `CaseStudyMeta`, see Task 2) — don't restructure them.
- "Design System case study" and "Mobile app case study" mentions render as plain text, not links (those routes don't exist).

---

### Task 1: Font migration — Inter + Inter Display site-wide

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css:90-91`
- Modify: `src/components/projects/FitnessCaseStudy.tsx:63-65`
- Modify: `src/components/projects/BetaTestingPlatformCaseStudy.tsx:144-146`
- Modify: `src/components/projects/RoleManagementCaseStudy.tsx:233-235`

**Interfaces:**
- Produces: CSS variable `--font-inter` (new, from `next/font/google`'s `Inter`), reachable everywhere via the existing `--font-sans` token and every `.type-*` utility class. `--font-inter-display` already exists (unchanged) — this task just puts it on more elements.

- [ ] **Step 1: Add Inter, remove Geist (sans) in `layout.tsx`**

Current top of `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Pro, Geist, Geist_Mono, Inconsolata } from "next/font/google";
import localFont from "next/font/local";
import AppShellHeader from "@/components/AppShellHeader";
import TooltipProvider from "@/components/TooltipProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
```

Replace with:

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Pro, Geist_Mono, Inconsolata, Inter } from "next/font/google";
import localFont from "next/font/local";
import AppShellHeader from "@/components/AppShellHeader";
import TooltipProvider from "@/components/TooltipProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

- [ ] **Step 2: Update the `<body>` className to use `inter` instead of `geist`**

Find (near the bottom of `layout.tsx`):

```tsx
      <body
        className={`${geist.className} ${geist.variable} ${inconsolata.variable} ${geistMono.variable} ${crimsonPro.variable} ${cormorantGaramond.variable} ${interDisplay.variable} min-h-screen antialiased`}
      >
```

Replace with:

```tsx
      <body
        className={`${inter.className} ${inter.variable} ${inconsolata.variable} ${geistMono.variable} ${crimsonPro.variable} ${cormorantGaramond.variable} ${interDisplay.variable} min-h-screen antialiased`}
      >
```

- [ ] **Step 3: Repoint `--font-sans` and `--font-serif` in `globals.css`**

In `src/app/globals.css`, find:

```css
  --font-sans: var(--font-geist);
  --font-serif: var(--font-geist);
```

Replace with:

```css
  --font-sans: var(--font-inter);
  --font-serif: var(--font-inter);
```

(`--font-mono: var(--font-geist-mono);` on the next line is unchanged — Geist Mono stays.)

- [ ] **Step 4: Update the Fitness case study H1 to Inter Display**

In `src/components/projects/FitnessCaseStudy.tsx`, find:

```tsx
            <h1 className="text-[28px] font-medium leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:text-[26px] max-[809px]:leading-9">
              Fitness app redesign
            </h1>
```

Replace with:

```tsx
            <h1
              className="font-semibold text-[28px] leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:text-[26px] max-[809px]:leading-9"
              style={{ fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Fitness app redesign
            </h1>
```

- [ ] **Step 5: Update the Ajax case study H1 to Inter Display**

In `src/components/projects/BetaTestingPlatformCaseStudy.tsx`, find:

```tsx
            <h1 className="text-[28px] font-medium leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:leading-7">
              Beta testing platform
            </h1>
```

Replace with:

```tsx
            <h1
              className="font-semibold text-[28px] leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:leading-7"
              style={{ fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Beta testing platform
            </h1>
```

- [ ] **Step 6: Update the Role Management case study H1 to Inter Display**

In `src/components/projects/RoleManagementCaseStudy.tsx`, find:

```tsx
            <h1 className="text-[28px] font-medium leading-9 text-[var(--text-primary)]">
              Role Management System
            </h1>
```

Replace with:

```tsx
            <h1
              className="font-semibold text-[28px] leading-9 text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Role Management System
            </h1>
```

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: Build succeeds with no errors (this statically renders all 4 case study routes — a font/JSX mistake here fails the build).

- [ ] **Step 8: Verify no leftover Geist (sans) references**

Run: `grep -rn "font-geist\b\|Geist(" src`
Expected: No output (only `Geist_Mono`/`geistMono`/`--font-geist-mono` references remain, which is correct — that grep pattern only matches the removed sans font, not the mono one).

- [ ] **Step 9: Smoke-check rendered fonts**

Run: `npm run dev &` then, after a few seconds, `curl -s http://localhost:3000/ | grep -o 'font-inter[a-z-]*' | sort -u`
Expected: Output includes `font-inter` variable class names (confirms Inter is loaded into the page's font stack). Stop the dev server afterward (`kill %1` or equivalent).

- [ ] **Step 10: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/components/projects/FitnessCaseStudy.tsx src/components/projects/BetaTestingPlatformCaseStudy.tsx src/components/projects/RoleManagementCaseStudy.tsx
git commit -m "feat: migrate site font from Geist to Inter + Inter Display"
```

---

### Task 2: Add `accent` variant to `CaseStudyMeta`

**Files:**
- Modify: `src/components/projects/CaseStudyMeta.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `CaseStudyMeta` gains an optional `accent?: boolean` prop (default `false`, existing callers unaffected). When `true`, the label renders in Inter Semibold blue (`#157ebe`) instead of the default `font-inconsolata` grey — used by the Governmental Platform case study (Task 3) to match Figma's blue Role/Team/Timeline labels.

- [ ] **Step 1: Read the current file for context**

Current `src/components/projects/CaseStudyMeta.tsx`:

```tsx
import type { ReactNode } from "react";

type MetaItem = { label: string; value: ReactNode };

export default function CaseStudyMeta({ items }: { items: MetaItem[] }) {
  return (
    <div className="flex items-start justify-between gap-6 max-[402px]:flex-col max-[402px]:gap-[20px]">
      {items.map(({ label, value }) => (
        <div key={label} className="flex w-[200px] flex-col gap-[8px] max-[402px]:w-full">
          <p className="font-inconsolata text-[18px] font-semibold uppercase leading-6 text-[var(--text-tertiary)]">
            {label}
          </p>
          <div className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add the `accent` prop**

Replace the whole file with:

```tsx
import type { ReactNode } from "react";

type MetaItem = { label: string; value: ReactNode };

export default function CaseStudyMeta({
  items,
  accent = false,
}: {
  items: MetaItem[];
  /** Blue Inter Semibold labels (matches Figma's Governmental Platform meta row) instead of the default grey mono labels. */
  accent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-6 max-[402px]:flex-col max-[402px]:gap-[20px]">
      {items.map(({ label, value }) => (
        <div key={label} className="flex w-[200px] flex-col gap-[8px] max-[402px]:w-full">
          <p
            className={
              accent
                ? "text-[16px] font-semibold uppercase leading-6 text-[#157ebe]"
                : "font-inconsolata text-[18px] font-semibold uppercase leading-6 text-[var(--text-tertiary)]"
            }
          >
            {label}
          </p>
          <div className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify lint and build**

Run: `npm run lint && npm run build`
Expected: Both succeed (existing callers of `CaseStudyMeta` don't pass `accent`, so they keep rendering the original grey/mono style — no visual change to Fitness/Ajax/Role Management).

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/CaseStudyMeta.tsx
git commit -m "feat: add accent label variant to CaseStudyMeta"
```

---

### Task 3: Scaffold `GovernmentalPlatformCaseStudy.tsx` — title, NDA notice, cover, meta

**Files:**
- Create: `src/components/projects/GovernmentalPlatformCaseStudy.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/lib/projects.ts:24` (flip `status: "planned"` → `"ready"` for the `governmental-platform` record)

**Interfaces:**
- Consumes: `CaseStudyLayout` (`sidebar`, `backHref`, `children` props), `CaseStudyToC` (`sections: ToCSection[]`, `backHref`, `title`), `CaseStudyMeta` (`items`, `accent` from Task 2), `ScaledCover` (`nativeWidth`, `nativeHeight`, `className`, `children`).
- Produces: default-exported `GovernmentalPlatformCaseStudy()` component; `TOC_SECTIONS` array (module-level, all 7 section ids used by later tasks: `context`, `challenges`, `team-and-role`, `process`, `dashboard`, `cms-back-office`, `summary`); a `Showcase` helper (`{ src, alt, caption, imgWidth, imgHeight }`) and a `SectionHeading` helper (`{ title }`) that Tasks 4-9 reuse for every subsequent section.

**Assets used this task** (already downloaded to `public/home/governmental-platform/`):
- `cover-bg.png` (1024×410 — blurred background photo)
- `cover-screenshot.png` (2517×1399 — dashboard screenshot overlay)

- [ ] **Step 1: Verify the asset files exist**

Run: `ls public/home/governmental-platform/`
Expected output includes (among others): `cover-bg.png`, `cover-screenshot.png`, `context-diagram-connector.svg`, `role-icon-design.svg`, `role-icon-ba.svg`, `role-icon-qa.svg`, `process-arrow.svg`, `dashboard-overview.png`, `dashboard-tourism-indicators.png`, `cms-operation-dashboard.png`, `cms-demand-details.png`, `cms-sector-details.png`, `cms-role-management-table.png`, `cms-role-creating.png`, `cms-role-assigning.png`, `cms-role-permissions.png` (16 files total; `background.png`/`screenshot.png` are pre-existing card assets, unrelated).

If any are missing, re-download from Figma node `552-8876` (file `J3uPwVk6E3k2rI1b1RTP7S`) via `get_design_context` on the relevant sub-node — see the design spec at `docs/superpowers/specs/2026-07-05-governmental-platform-case-study-design.md` for the section breakdown.

- [ ] **Step 2: Create the component file**

Create `src/components/projects/GovernmentalPlatformCaseStudy.tsx`:

```tsx
import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";
import CaseStudyToC, { type ToCSection } from "@/components/projects/CaseStudyToC";
import CaseStudyMeta from "@/components/projects/CaseStudyMeta";
import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

// Cover assets
const imgCoverBg = "/home/governmental-platform/cover-bg.png";
const imgCoverScreenshot = "/home/governmental-platform/cover-screenshot.png";

const TOC_SECTIONS: ToCSection[] = [
  { id: "context", label: "Context" },
  { id: "challenges", label: "Challenges" },
  { id: "team-and-role", label: "Team and my role" },
  { id: "process", label: "Process" },
  { id: "dashboard", label: "Dashboard" },
  { id: "cms-back-office", label: "CMS Back-office" },
  { id: "summary", label: "Summary" },
];

const displayFont = {
  fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif",
};

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="font-semibold text-[24px] leading-8 text-[var(--text-primary)]" style={displayFont}>
      {title}
    </h2>
  );
}

function Showcase({
  src,
  alt,
  caption,
  imgWidth,
  imgHeight,
}: {
  src: string;
  alt: string;
  caption: string;
  imgWidth: number;
  imgHeight: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <ScaledCover nativeWidth={840} nativeHeight={500} className="rounded-[24px] border border-[#ececec] bg-[#f0f0f0]">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px]"
          style={{ width: imgWidth, height: imgHeight }}
        >
          <Image src={src} alt={alt} fill sizes="840px" className="object-cover" />
        </div>
      </ScaledCover>
      <p className="text-[16px] leading-6 text-[var(--text-tertiary)]">{caption}</p>
    </div>
  );
}

export default function GovernmentalPlatformCaseStudy() {
  return (
    <CaseStudyLayout
      backHref="/"
      sidebar={<CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Web, Mobile & CMS" />}
    >
      <div className="flex min-w-0 w-full flex-col gap-12">
        {/* Opening block */}
        <div className="flex w-full flex-col gap-8">
          <h1
            className="font-semibold text-[32px] leading-[50px] text-[var(--text-primary)] max-[809px]:text-[26px] max-[809px]:leading-9"
            style={displayFont}
          >
            Government Monitoring Platform:
            <br />
            Web (Dashboards &amp; CMS)
          </h1>

          <div className="flex w-full items-center rounded-[12px] border border-[#ededed] bg-[#fafafa] px-4 py-3">
            <p className="text-[16px] leading-[26px] tracking-[0.02em] text-[var(--text-tertiary)]">
              This project is under NDA - almost all data, content, and visuals shown have been altered{" "}
              <br className="max-[809px]:hidden" />
              and are fictional.
            </p>
          </div>

          <ScaledCover nativeWidth={840} nativeHeight={444} className="rounded-[24px] bg-[#ececec]">
            <div className="absolute left-1/2 top-0 h-[633px] w-[1583px] -translate-x-1/2">
              <Image
                src={imgCoverBg}
                alt=""
                fill
                sizes="1583px"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute left-1/2 top-[40px] h-[430px] w-[773px] -translate-x-1/2 overflow-hidden rounded-[16px]">
              <Image
                src={imgCoverScreenshot}
                alt="Government Monitoring Platform dashboard overview"
                fill
                sizes="773px"
                priority
                className="object-cover"
              />
            </div>
          </ScaledCover>

          <CaseStudyMeta
            accent
            items={[
              { label: "Role", value: "Product Designer" },
              { label: "Team", value: "4 designers" },
              { label: "Timeline", value: "Feb 2025 - June 2026" },
            ]}
          />
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Wire the new component into the project page router**

In `src/app/projects/[slug]/page.tsx`, find:

```tsx
import { notFound } from "next/navigation";
import BetaTestingPlatformCaseStudy from "@/components/projects/BetaTestingPlatformCaseStudy";
import FitnessCaseStudy from "@/components/projects/FitnessCaseStudy";
import RoleManagementCaseStudy from "@/components/projects/RoleManagementCaseStudy";
import ProjectCaseSkeleton from "@/components/projects/ProjectCaseSkeleton";
import { getProjectBySlug, projects } from "@/lib/projects";
```

Replace with:

```tsx
import { notFound } from "next/navigation";
import BetaTestingPlatformCaseStudy from "@/components/projects/BetaTestingPlatformCaseStudy";
import FitnessCaseStudy from "@/components/projects/FitnessCaseStudy";
import GovernmentalPlatformCaseStudy from "@/components/projects/GovernmentalPlatformCaseStudy";
import RoleManagementCaseStudy from "@/components/projects/RoleManagementCaseStudy";
import ProjectCaseSkeleton from "@/components/projects/ProjectCaseSkeleton";
import { getProjectBySlug, projects } from "@/lib/projects";
```

Then find:

```tsx
  if (project.slug === "role-management-system") {
    return <RoleManagementCaseStudy />;
  }

  return <ProjectCaseSkeleton project={project} />;
```

Replace with:

```tsx
  if (project.slug === "role-management-system") {
    return <RoleManagementCaseStudy />;
  }

  if (project.slug === "governmental-platform") {
    return <GovernmentalPlatformCaseStudy />;
  }

  return <ProjectCaseSkeleton project={project} />;
```

- [ ] **Step 4: Flip the project status to "ready"**

In `src/lib/projects.ts`, find (the `governmental-platform` record):

```ts
    cover: "governmental",
    status: "planned",
  },
```

Replace with:

```ts
    cover: "governmental",
    status: "ready",
  },
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: Build succeeds; `/projects/governmental-platform` appears in the static route output.

- [ ] **Step 6: Smoke-check the rendered page**

Run: `npm run dev &`, wait a few seconds, then:
`curl -s http://localhost:3000/projects/governmental-platform | grep -o "Government Monitoring Platform"`
Expected: `Government Monitoring Platform` (confirms the title rendered). Then `kill %1`.

- [ ] **Step 7: Commit**

```bash
git add src/components/projects/GovernmentalPlatformCaseStudy.tsx src/app/projects/\[slug\]/page.tsx src/lib/projects.ts public/home/governmental-platform/
git commit -m "feat: scaffold Governmental Platform case study (title, NDA notice, cover, meta)"
```

---

### Task 4: Add Context + Challenges sections

**Files:**
- Modify: `src/components/projects/GovernmentalPlatformCaseStudy.tsx`

**Interfaces:**
- Consumes: `SectionHeading` and asset-const pattern from Task 3.
- Produces: two new `<div id="context">` / `<div id="challenges">` sections, matched by `TOC_SECTIONS` ids from Task 3.

**Assets used this task:** `context-diagram-connector.svg` (373.5×101 decorative connector lines).

- [ ] **Step 1: Add the asset const**

At the top of `src/components/projects/GovernmentalPlatformCaseStudy.tsx`, below the existing cover asset consts, add:

```tsx
const imgContextDiagram = "/home/governmental-platform/context-diagram-connector.svg";
```

- [ ] **Step 2: Insert the Context and Challenges sections**

In the same file, find the closing of the opening block (the `<CaseStudyMeta .../>` call followed by `</div>` then `</div>` then `</CaseStudyLayout>`):

```tsx
          <CaseStudyMeta
            accent
            items={[
              { label: "Role", value: "Product Designer" },
              { label: "Team", value: "4 designers" },
              { label: "Timeline", value: "Feb 2025 - June 2026" },
            ]}
          />
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

Replace with:

```tsx
          <CaseStudyMeta
            accent
            items={[
              { label: "Role", value: "Product Designer" },
              { label: "Team", value: "4 designers" },
              { label: "Timeline", value: "Feb 2025 - June 2026" },
            ]}
          />
        </div>

        {/* Context */}
        <div id="context" className="flex w-full flex-col gap-4">
          <SectionHeading title="Context" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            A government platform built as three connected products. The Dashboard gives
            leadership a read-only, real-time view across sectors - economy, tourism,
            healthcare, education, logistics, and more - while a separate, higher-level
            dashboard mirrors this for the Prime Minister&apos;s office. Both draw from the
            CMS, where operational users - sector staff, indicator analysts, access admins,
            and a content team - publish and update the information that flows live into
            both dashboards.
          </p>

          <div className="relative flex w-full flex-col items-center py-6">
            <div className="rounded-[12px] border border-[#a1cde6] bg-[#e9f6fd] px-4 py-3 text-center text-[#025382]">
              <p className="font-semibold text-[18px] leading-[26px]">CMS</p>
              <p className="text-[16px] leading-6">Sector staff, analysts, admins</p>
            </div>
            <img
              src={imgContextDiagram}
              alt=""
              className="my-2 h-[76px] w-full max-w-[373px] object-contain"
            />
            <div className="flex w-full max-w-[627px] items-start justify-between gap-4 max-[500px]:flex-col max-[500px]:items-center">
              <div className="w-full max-w-[255px] rounded-[12px] border border-[#e0e0e0] bg-[#f9f9f9] px-4 py-3 text-center text-[#252525]">
                <p className="font-semibold text-[18px] leading-[26px]">Dashboard</p>
                <p className="text-[16px] leading-6">Leadership, read-only</p>
              </div>
              <div className="w-full max-w-[255px] rounded-[12px] border border-[#e0e0e0] bg-[#f9f9f9] px-4 py-3 text-center text-[#252525]">
                <p className="font-semibold text-[18px] leading-[26px]">PM Dashboard</p>
                <p className="text-[16px] leading-6">Prime minister view</p>
              </div>
            </div>
          </div>
        </div>

        {/* Challenges */}
        <div id="challenges" className="flex w-full flex-col gap-4">
          <SectionHeading title="Challenges" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Access to stakeholders and end users was limited due to NDA restrictions, so the
            design and business analysis teams worked in daily, close collaboration -
            refining requirements together as the product took shape, rather than relying on
            a fixed spec upfront. This made for a highly iterative process, with several
            passes on nearly every feature as the scope evolved alongside the design.
          </p>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Smoke-check**

Run: `npm run dev &`, wait, then `curl -s http://localhost:3000/projects/governmental-platform | grep -o "Prime minister view"`, expect that string back, then `kill %1`.

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/GovernmentalPlatformCaseStudy.tsx
git commit -m "feat: add Context and Challenges sections to Governmental Platform case study"
```

---

### Task 5: Add "Team and my role" section

**Files:**
- Modify: `src/components/projects/GovernmentalPlatformCaseStudy.tsx`

**Interfaces:**
- Produces: a `RoleCard` helper (`{ icon, title, subtitle, items }`) used only within this section; a new `<div id="team-and-role">` section.

**Assets used this task:** `role-icon-design.svg`, `role-icon-ba.svg`, `role-icon-qa.svg` (20×20 icons).

- [ ] **Step 1: Add the icon asset consts**

Below `imgContextDiagram`, add:

```tsx
const imgRoleIconDesign = "/home/governmental-platform/role-icon-design.svg";
const imgRoleIconBA = "/home/governmental-platform/role-icon-ba.svg";
const imgRoleIconQA = "/home/governmental-platform/role-icon-qa.svg";
```

- [ ] **Step 2: Add the `RoleCard` helper**

Below the `Showcase` function (still above `export default function GovernmentalPlatformCaseStudy()`), add:

```tsx
function RoleCard({
  icon,
  title,
  subtitle,
  items,
}: {
  icon: string;
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <div className="flex flex-1 flex-col gap-6 rounded-[16px] border border-[#e0e0e0] bg-[#f9f9f9] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d3eefe]">
          <img src={icon} alt="" width={20} height={20} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-[18px] leading-6 text-[var(--text-primary)]">{title}</p>
          <p className="text-[16px] leading-6 text-[var(--text-secondary)]">{subtitle}</p>
        </div>
      </div>
      <ul className="flex list-disc flex-col gap-3 pl-6 text-[16px] leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 3: Insert the "Team and my role" section**

Find the end of the Challenges section:

```tsx
        {/* Challenges */}
        <div id="challenges" className="flex w-full flex-col gap-4">
          <SectionHeading title="Challenges" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Access to stakeholders and end users was limited due to NDA restrictions, so the
            design and business analysis teams worked in daily, close collaboration -
            refining requirements together as the product took shape, rather than relying on
            a fixed spec upfront. This made for a highly iterative process, with several
            passes on nearly every feature as the scope evolved alongside the design.
          </p>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

Replace with:

```tsx
        {/* Challenges */}
        <div id="challenges" className="flex w-full flex-col gap-4">
          <SectionHeading title="Challenges" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Access to stakeholders and end users was limited due to NDA restrictions, so the
            design and business analysis teams worked in daily, close collaboration -
            refining requirements together as the product took shape, rather than relying on
            a fixed spec upfront. This made for a highly iterative process, with several
            passes on nearly every feature as the scope evolved alongside the design.
          </p>
        </div>

        {/* Team and my role */}
        <div id="team-and-role" className="flex w-full flex-col gap-8">
          <SectionHeading title="Team and my role" />

          <div className="flex flex-col gap-4">
            <div className="flex items-stretch gap-4 max-[809px]:flex-col">
              <RoleCard
                icon={imgRoleIconDesign}
                title="Design"
                subtitle="4 designers"
                items={[
                  "UX/UI design",
                  "Product research",
                  "Design system (RTL, bilingual)",
                  "User flows",
                  "Prototyping and iteration",
                ]}
              />
              <RoleCard
                icon={imgRoleIconBA}
                title="Business Analysis"
                subtitle="BA team"
                items={["Business logic", "Stakeholder communication", "Scope definition", "Flow validation"]}
              />
              <RoleCard
                icon={imgRoleIconQA}
                title="QA & development"
                subtitle="QDS team"
                items={["Design review", "Development", "Edge case review", "Release validation"]}
              />
            </div>

            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              I owned complex workflows across both dashboards and CMS, took main role in
              creation of design systems used across the entire platform - see the [Design
              System case study] for the full breakdown. I also worked directly with the
              business analysts to help shape requirements, not just design against them.
            </p>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Smoke-check**

Run: `npm run dev &`, wait, then `curl -s http://localhost:3000/projects/governmental-platform | grep -o "Business Analysis"`, expect that string back, then `kill %1`.

- [ ] **Step 6: Commit**

```bash
git add src/components/projects/GovernmentalPlatformCaseStudy.tsx
git commit -m "feat: add Team and my role section to Governmental Platform case study"
```

---

### Task 6: Add Process section (sprint timeline diagram)

**Files:**
- Modify: `src/components/projects/GovernmentalPlatformCaseStudy.tsx`

**Interfaces:**
- Produces: a new `<div id="process">` section.

**Assets used this task:** `process-arrow.svg` (11×59.75 decorative connector arrow).

- [ ] **Step 1: Add the asset const**

Below `imgRoleIconQA`, add:

```tsx
const imgProcessArrow = "/home/governmental-platform/process-arrow.svg";
```

- [ ] **Step 2: Insert the Process section**

Find the closing of the "Team and my role" section (the `</div>` that closes `id="team-and-role"`, right before the final `</div></CaseStudyLayout>`):

```tsx
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              I owned complex workflows across both dashboards and CMS, took main role in
              creation of design systems used across the entire platform - see the [Design
              System case study] for the full breakdown. I also worked directly with the
              business analysts to help shape requirements, not just design against them.
            </p>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

Replace with:

```tsx
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              I owned complex workflows across both dashboards and CMS, took main role in
              creation of design systems used across the entire platform - see the [Design
              System case study] for the full breakdown. I also worked directly with the
              business analysts to help shape requirements, not just design against them.
            </p>
          </div>
        </div>

        {/* Process */}
        <div id="process" className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeading title="Process" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Design consistently worked a sprint ahead of development. Each cycle moved from
              an initial brief and scoping questions, through iterations shaped by ongoing BA
              feedback, to a finalized spec ready for handoff - while development built and
              tested the previous feature in parallel, and design had already begun the next
              one.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-[24px] border border-[#ececec] bg-[#fafafa] p-6 max-[809px]:overflow-x-auto">
            <div className="flex min-w-[560px] items-center justify-between gap-4 pr-[42px] text-[16px] leading-6 text-[var(--text-secondary)]">
              <p>Sprint 1</p>
              <p>Sprint 2</p>
              <p>Sprint 3</p>
              <p>Sprint 4</p>
              <p>Sprint 5</p>
            </div>

            <div className="flex min-w-[560px] items-center">
              <div className="flex h-[277px] w-[93px] shrink-0 flex-col justify-between py-[52px] text-[16px] leading-6 text-[var(--text-secondary)]">
                <p>Design + BA</p>
                <p>QDS</p>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-[24px] border border-[#ececec] bg-white">
                <div className="absolute inset-y-0 left-[37%] flex w-[47%] justify-between">
                  <div className="h-full border-l border-dashed border-[#e0e0e0]" />
                  <div className="h-full border-l border-dashed border-[#e0e0e0]" />
                  <div className="h-full border-l border-dashed border-[#e0e0e0]" />
                  <div className="h-full border-l border-dashed border-[#e0e0e0]" />
                </div>
                <p className="absolute left-[40%] top-1/2 -translate-y-1/2 text-[14px] leading-[18px] text-[var(--text-secondary)]">
                  Spec handoff
                </p>

                <div className="absolute left-[19px] top-[32px] flex w-[47%] flex-col items-center gap-[2px] rounded-[12px] border border-[#b9e4fc] bg-[#e7f6ff] px-6 py-3 text-center">
                  <p className="font-semibold text-[16px] leading-6 text-[#004c78]">Feature A - design</p>
                  <p className="text-[14px] leading-[18px] text-[#5c7481]">Brief, iterations, final spec</p>
                </div>

                <div className="absolute right-[19px] top-[32px] flex w-[28%] flex-col items-center gap-[2px] rounded-[12px] border border-[#ffd2a4] bg-[#fff4e8] px-6 py-3 text-center">
                  <p className="font-semibold text-[16px] leading-6 text-[#d16f0d]">Feature B - design</p>
                  <p className="text-[14px] leading-[18px] text-[#78644f]">Brief, first iterations</p>
                </div>

                <div className="absolute bottom-[32px] right-[19px] flex w-[29%] flex-col items-center gap-[2px] rounded-[12px] border border-[#b9e4fc] bg-[#e7f6ff] px-6 py-3 text-center">
                  <p className="font-semibold text-[16px] leading-6 text-[#004c78]">Feature A - build</p>
                  <p className="text-[14px] leading-[18px] text-[#5c7481]">Development + QA</p>
                </div>

                <img
                  src={imgProcessArrow}
                  alt=""
                  className="absolute left-[50%] top-[45%] h-[70px] w-[13px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Smoke-check**

Run: `npm run dev &`, wait, then `curl -s http://localhost:3000/projects/governmental-platform | grep -o "Spec handoff"`, expect that string back, then `kill %1`.

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/GovernmentalPlatformCaseStudy.tsx
git commit -m "feat: add Process section to Governmental Platform case study"
```

---

### Task 7: Add Dashboard section

**Files:**
- Modify: `src/components/projects/GovernmentalPlatformCaseStudy.tsx`

**Interfaces:**
- Consumes: `Showcase` helper from Task 3.
- Produces: a new `<div id="dashboard">` section.

**Assets used this task:** `dashboard-overview.png` (1440×800, shown at 752×418), `dashboard-tourism-indicators.png` (1440×800, shown at 752×418).

- [ ] **Step 1: Add the asset consts**

Below `imgProcessArrow`, add:

```tsx
const imgDashboardOverview = "/home/governmental-platform/dashboard-overview.png";
const imgDashboardTourism = "/home/governmental-platform/dashboard-tourism-indicators.png";
```

- [ ] **Step 2: Insert the Dashboard section**

Find the closing of the Process section (the `</div>` closing `id="process"`, right before the final `</div></CaseStudyLayout>`):

```tsx
                <img
                  src={imgProcessArrow}
                  alt=""
                  className="absolute left-[50%] top-[45%] h-[70px] w-[13px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

Replace with:

```tsx
                <img
                  src={imgProcessArrow}
                  alt=""
                  className="absolute left-[50%] top-[45%] h-[70px] w-[13px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div id="dashboard" className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeading title="Dashboard" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The dashboard gives decision-makers a real-time, cross-sector view - from
              economic indicators to healthcare and tourism metrics - surfacing trends,
              alerts, and comparisons that support faster, more informed decisions.
            </p>
          </div>

          <Showcase
            src={imgDashboardOverview}
            alt="Dashboard overview with economic growth, statistics of interest, and benchmark comparisons"
            caption="Overview"
            imgWidth={752}
            imgHeight={418}
          />
          <Showcase
            src={imgDashboardTourism}
            alt="Tourism sector indicators dashboard"
            caption="Tourism Indicators"
            imgWidth={752}
            imgHeight={418}
          />
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Smoke-check**

Run: `npm run dev &`, wait, then `curl -s http://localhost:3000/projects/governmental-platform | grep -o "Tourism Indicators"`, expect that string back, then `kill %1`.

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/GovernmentalPlatformCaseStudy.tsx
git commit -m "feat: add Dashboard section to Governmental Platform case study"
```

---

### Task 8: Add CMS Back-office section — Demand Management + Library

**Files:**
- Modify: `src/components/projects/GovernmentalPlatformCaseStudy.tsx`

**Interfaces:**
- Consumes: `Showcase`, `SectionHeading` from Task 3.
- Produces: a new `<div id="cms-back-office">` section, opened here and continued (not closed) — Task 9 appends the Role Management sub-section into the same `<div>` before closing it.

**Assets used this task:** `cms-operation-dashboard.png`, `cms-demand-details.png`, `cms-sector-details.png` (each 697×436 shown).

- [ ] **Step 1: Add the asset consts**

Below `imgDashboardTourism`, add:

```tsx
const imgCmsOperationDashboard = "/home/governmental-platform/cms-operation-dashboard.png";
const imgCmsDemandDetails = "/home/governmental-platform/cms-demand-details.png";
const imgCmsSectorDetails = "/home/governmental-platform/cms-sector-details.png";
```

- [ ] **Step 2: Insert the CMS Back-office section (opening + Demand Management + Library)**

Find the closing of the Dashboard section:

```tsx
          <Showcase
            src={imgDashboardTourism}
            alt="Tourism sector indicators dashboard"
            caption="Tourism Indicators"
            imgWidth={752}
            imgHeight={418}
          />
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

Replace with:

```tsx
          <Showcase
            src={imgDashboardTourism}
            alt="Tourism sector indicators dashboard"
            caption="Tourism Indicators"
            imgWidth={752}
            imgHeight={418}
          />
        </div>

        {/* CMS Back-office */}
        <div id="cms-back-office" className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeading title="CMS Back-office" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The CMS is where operational users - sector staff, analysts, admins, and
              content teams - manage the data and content that power both dashboards, from
              requesting changes to reviewing records to controlling access.
            </p>
          </div>

          {/* Demand Management */}
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[20px] leading-6 text-[var(--text-primary)]" style={displayFont}>
              Demand Management
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Demand Management is the module that lets users without direct edit access
              request changes to platform content - indicators, sectors, projects, and more -
              by submitting a demand for someone with the right permissions to review and
              approve.
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The Operation Dashboard, part of it, gives requesters and approvers a shared
              view of every demand - status, assignee, and progress at a glance - while a
              detailed panel surfaces the full history of each request: who approved,
              returned, or escalated it, and why, down to the specific comment left at each
              step.
            </p>
          </div>

          <Showcase
            src={imgCmsOperationDashboard}
            alt="Operation Dashboard showing demand tasks with status filters"
            caption="Operation Dashboard"
            imgWidth={697}
            imgHeight={436}
          />
          <Showcase
            src={imgCmsDemandDetails}
            alt="Demand details panel showing approval history and workflow"
            caption="Demand details"
            imgWidth={697}
            imgHeight={436}
          />

          {/* Library */}
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[20px] leading-6 text-[var(--text-primary)]" style={displayFont}>
              Library
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The Library is where users browse and review the current state of everything
              tracked on the platform - sectors, indicators, projects, programs, drivers,
              enablers, and entities - organized as a searchable, filterable catalogue rather
              than a raw database view.
            </p>
          </div>

          <Showcase
            src={imgCmsSectorDetails}
            alt="Sector library catalogue with sector detail panel"
            caption="Sector details"
            imgWidth={697}
            imgHeight={436}
          />
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Smoke-check**

Run: `npm run dev &`, wait, then `curl -s http://localhost:3000/projects/governmental-platform | grep -o "Demand Management"`, expect that string back, then `kill %1`.

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/GovernmentalPlatformCaseStudy.tsx
git commit -m "feat: add CMS Back-office Demand Management and Library subsections"
```

---

### Task 9: Complete CMS Back-office (Role Management) + Summary + Read connected case studies

**Files:**
- Modify: `src/components/projects/GovernmentalPlatformCaseStudy.tsx`

**Interfaces:**
- Consumes: `Showcase`, `SectionHeading`, `displayFont` from earlier tasks.
- Produces: closes out the `id="cms-back-office"` div opened in Task 8; adds `<div id="summary">`; adds the final "Read connected case studies" block (no id — not in the ToC).

**Assets used this task:** `cms-role-management-table.png`, `cms-role-creating.png`, `cms-role-assigning.png`, `cms-role-permissions.png` (each 697×436 shown).

- [ ] **Step 1: Add the asset consts**

Below `imgCmsSectorDetails`, add:

```tsx
const imgCmsRoleTable = "/home/governmental-platform/cms-role-management-table.png";
const imgCmsRoleCreating = "/home/governmental-platform/cms-role-creating.png";
const imgCmsRoleAssigning = "/home/governmental-platform/cms-role-assigning.png";
const imgCmsRolePermissions = "/home/governmental-platform/cms-role-permissions.png";
```

- [ ] **Step 2: Insert Role Management, Summary, and Read connected case studies**

Find the closing of the CMS Back-office section:

```tsx
          <Showcase
            src={imgCmsSectorDetails}
            alt="Sector library catalogue with sector detail panel"
            caption="Sector details"
            imgWidth={697}
            imgHeight={436}
          />
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

Replace with:

```tsx
          <Showcase
            src={imgCmsSectorDetails}
            alt="Sector library catalogue with sector detail panel"
            caption="Sector details"
            imgWidth={697}
            imgHeight={436}
          />

          {/* Role Management */}
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[20px] leading-6 text-[var(--text-primary)]" style={displayFont}>
              Role Management
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              A role management system for a multi-environment government dashboard. I
              designed the full permission architecture and interaction model - from how
              roles are structured to how individual user access is configured.
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Replaced a fixed set of predefined roles with a granular permission model -
              supporting virtually unlimited role combinations across{" "}
              <span className="font-medium">3 environments</span>.
            </p>
          </div>

          <Showcase
            src={imgCmsRoleTable}
            alt="Role Management table listing all defined roles"
            caption="Database of roles"
            imgWidth={697}
            imgHeight={436}
          />

          <div className="flex flex-col items-center gap-6">
            <p className="w-full text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              When creating a role, admin can select platforms to which the role should have
              access
            </p>
            <Showcase
              src={imgCmsRoleCreating}
              alt="Create New Role form with platform and channel selection"
              caption="Creating new role"
              imgWidth={697}
              imgHeight={436}
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            <p className="w-full text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              When the role is created, admin assigns it to the user during profile creation
              or editing.
            </p>
            <Showcase
              src={imgCmsRoleAssigning}
              alt="Profile creation wizard with role assignment step"
              caption="Assigning role to a user during profile creation"
              imgWidth={697}
              imgHeight={436}
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            <p className="w-full text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              After assigning a role, admin selects action permissions for each user
              separately for every platform.
            </p>
            <Showcase
              src={imgCmsRolePermissions}
              alt="Permissions step showing per-platform action checkboxes"
              caption="Setting up granular action permissions for each user separately"
              imgWidth={697}
              imgHeight={436}
            />
          </div>
        </div>

        {/* Summary */}
        <div id="summary" className="flex w-full flex-col gap-4">
          <SectionHeading title="Summary" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            The government organisation now runs on analytics dashboards and back-office CMS
            built specifically around their internal workflows and structure, supported by a
            dedicated design systems built and maintained by three designers (see [Design
            System case study]).
          </p>
        </div>

        {/* Read connected case studies */}
        <div className="flex w-full flex-col gap-6">
          <SectionHeading title="Read connected case studies" />
          <div className="flex flex-wrap gap-6 text-[18px] font-medium leading-[26px] text-[var(--text-secondary)]">
            <p>Design System case study</p>
            <p>Mobile app case study</p>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Smoke-check**

Run: `npm run dev &`, wait, then `curl -s http://localhost:3000/projects/governmental-platform | grep -o "Read connected case studies"`, expect that string back, then `kill %1`.

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/GovernmentalPlatformCaseStudy.tsx
git commit -m "feat: complete Governmental Platform case study (Role Management, Summary, connected case studies)"
```

---

### Task 10: Final QA pass

**Files:** none (verification only)

- [ ] **Step 1: Run lint and build**

Run: `npm run lint && npm run build`
Expected: Both succeed with no errors or warnings introduced by this work.

- [ ] **Step 2: Confirm all 7 ToC section ids are present and unique**

Run: `grep -o 'id="[a-z-]*"' src/components/projects/GovernmentalPlatformCaseStudy.tsx | sort | uniq -c`
Expected: `context`, `challenges`, `team-and-role`, `process`, `dashboard`, `cms-back-office`, `summary` each appear exactly once.

- [ ] **Step 3: Confirm the homepage card now links to the case study**

Run: `npm run dev &`, wait, then:
`curl -s http://localhost:3000/ | grep -o 'href="/projects/governmental-platform"'`
Expected: `href="/projects/governmental-platform"` (confirms `status: "ready"` made the card clickable). Then `kill %1`.

- [ ] **Step 4: Confirm no dead/broken image references**

Run: `grep -o '"/home/governmental-platform/[a-zA-Z.-]*"' src/components/projects/GovernmentalPlatformCaseStudy.tsx | sort -u | while read -r f; do path="public${f//\"/}"; [ -f "$path" ] || echo "MISSING: $path"; done`
Expected: no output (every referenced asset path exists on disk).

- [ ] **Step 5: Note the manual follow-up for the user**

This environment has no browser-automation tool. Tell the user: "Build, lint, and content smoke-checks all pass, and every image path resolves — but I haven't visually inspected the rendered page in a browser. Please run `npm run dev` and check `/projects/governmental-platform` (and the homepage card) yourself before considering this done, especially the Process timeline diagram and the responsive breakpoints (mobile/tablet), since those were hand-built from Figma's absolute-position layout rather than copied 1:1."

- [ ] **Step 6: Final commit (if anything was left uncommitted)**

```bash
git status
```

If clean, no action needed. Otherwise stage and commit any remaining changes with a descriptive message.
