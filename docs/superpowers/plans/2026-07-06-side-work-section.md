# Side Work Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Side work" section to the home page — three stacked cards (Finance concept, Vinyl animation, Movie diary) matching the Figma design, replacing the old disabled marquee implementation.

**Architecture:** A data-driven client component (`SideWork.tsx`) maps `sideWorkCards` from `src/data/sideWork.ts` to stacked cards. Each card renders its media absolutely positioned in native 840×553 coordinates inside the existing `ScaledCover` component (same responsive scaling as `ProjectCard`). Missing media files fail silently to the gray cover via `onError`.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS v4, TypeScript. No test framework in this repo — gates are `npm run build`, `npm run lint`, and visual checks.

**Spec:** `docs/superpowers/specs/2026-07-06-side-work-section-design.md`

## Global Constraints

- Section heading "Side work": 32px semibold, `leading-[40px]`, `tracking-[0.32px]`, color `var(--text-primary)`.
- Card covers: native 840×553, `rounded-[32px]`, rendered through `ScaledCover`.
- Card titles: 24px semibold, `leading-[32px]`, color `#383232`, 20px below the cover. No dates, subtitles, descriptions, or links.
- 70px gap between cards; 40px between heading and first card; 100px total visual gap between the last project card and the "Side work" heading (ProjectsGrid already has `pb-[60px]`, so the section adds `pt-[40px]`).
- Tailwind arbitrary classes must appear as complete literals in scanned source files (never string-concatenated at runtime), or Tailwind v4 won't generate them.
- Videos: `autoPlay muted loop playsInline`, `object-cover`.
- Expected upload path for pending content: `public/home/side-work/movie-diary.mp4`.

---

### Task 1: Asset folder + finance images

**Files:**
- Create: `public/home/side-work/` (folder)
- Create: `public/home/side-work/finance-1.png` … `finance-4.png` (downloaded from Figma MCP asset URLs — valid ~7 days from 2026-07-06)

**Interfaces:**
- Produces: four image files at `/home/side-work/finance-{1..4}.png` referenced by Task 2's data file.

- [ ] **Step 1: Create the folder and download the four finance images**

```bash
mkdir -p public/home/side-work
curl -sL -o public/home/side-work/finance-1.png "https://www.figma.com/api/mcp/asset/1a62d3a6-113b-4ba4-a7b7-1def03d81157"
curl -sL -o public/home/side-work/finance-2.png "https://www.figma.com/api/mcp/asset/961947f6-e093-49b2-ba68-9becfcc8b318"
curl -sL -o public/home/side-work/finance-3.png "https://www.figma.com/api/mcp/asset/6cb88c57-689b-487f-b611-c851ca210662"
curl -sL -o public/home/side-work/finance-4.png "https://www.figma.com/api/mcp/asset/687ff862-92c5-4430-82a9-80412a5e497c"
```

- [ ] **Step 2: Verify the downloads are real images**

Run: `file public/home/side-work/finance-*.png`
Expected: each line reports `PNG image data` (or another real image type — if a file is HTML/JSON, the URL expired and the download failed; stop and report).

- [ ] **Step 3: Commit**

```bash
git add public/home/side-work
git commit -m "feat: add finance concept images for side work section"
```

---

### Task 2: Rewrite side-work data model and component

**Files:**
- Rewrite: `src/data/sideWork.ts` (replace old marquee item model entirely)
- Rewrite: `src/components/SideWork.tsx` (replace old marquee component entirely)

**Interfaces:**
- Consumes: `ScaledCover` from `@/components/ScaledCover` — props `{ children, nativeWidth?, nativeHeight?, className? }`; renders children at native size scaled to container width. Finance images from Task 1.
- Produces: default export `SideWork` (React component, no props) used by Task 3; exports `sideWorkCards: SideWorkCard[]`, types `SideWorkCard`, `SideWorkMedia` from `@/data/sideWork`.

- [ ] **Step 1: Replace the contents of `src/data/sideWork.ts`**

```ts
export type SideWorkMedia = {
  kind: "image" | "video";
  src: string;
  /** Position & size in the cover's native 840×553 coordinate space. */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Corner radius in px, omitted = square corners. */
  rounded?: number;
};

export type SideWorkCard = {
  id: string;
  title: string;
  /** Complete Tailwind class literal so Tailwind v4 can see it at build time. */
  coverBgClass: string;
  media: SideWorkMedia[];
};

export const sideWorkCards: SideWorkCard[] = [
  {
    id: "finance-concept",
    title: "Finance mobile app concept",
    coverBgClass: "bg-[#f1f1f1]",
    media: [
      { kind: "image", src: "/home/side-work/finance-1.png", x: 34, y: 88, width: 185, height: 383 },
      { kind: "image", src: "/home/side-work/finance-2.png", x: 230, y: 88, width: 185, height: 383 },
      { kind: "image", src: "/home/side-work/finance-3.png", x: 425, y: 88, width: 185, height: 383 },
      { kind: "image", src: "/home/side-work/finance-4.png", x: 620, y: 88, width: 185, height: 383 },
    ],
  },
  {
    id: "vinyl-animation",
    title: "Vinyl playing animation",
    coverBgClass: "bg-[#ececec]",
    media: [
      {
        kind: "video",
        src: "/playground/vinyl_plate_animation.mp4",
        x: 208.5,
        y: 65,
        width: 423,
        height: 423,
        rounded: 16,
      },
    ],
  },
  {
    id: "movie-diary",
    title: "Movie diary web app",
    coverBgClass: "bg-[#ececec]",
    media: [
      // Content pending upload — card renders as a plain gray cover until
      // this file exists (see MediaItem onError fallback).
      {
        kind: "video",
        src: "/home/side-work/movie-diary.mp4",
        x: 39.5,
        y: 65,
        width: 761,
        height: 423,
        rounded: 16,
      },
    ],
  },
];
```

- [ ] **Step 2: Replace the contents of `src/components/SideWork.tsx`**

```tsx
"use client";

import { useState } from "react";
import ScaledCover from "@/components/ScaledCover";
import { sideWorkCards, type SideWorkMedia } from "@/data/sideWork";

function MediaItem({ media }: { media: SideWorkMedia }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    // Missing file (e.g. content not uploaded yet) — fall back to the
    // plain gray cover.
    return null;
  }

  const style: React.CSSProperties = {
    position: "absolute",
    left: media.x,
    top: media.y,
    width: media.width,
    height: media.height,
    borderRadius: media.rounded,
  };

  if (media.kind === "video") {
    return (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        onError={() => setFailed(true)}
        className="overflow-hidden object-cover"
        style={style}
      />
    );
  }

  return (
    <img
      src={media.src}
      alt=""
      onError={() => setFailed(true)}
      className="pointer-events-none object-cover"
      style={style}
    />
  );
}

export default function SideWork() {
  return (
    <section
      id="side-work"
      className="mx-auto w-full max-w-[900px] fluid-px pt-[40px] pb-[60px]"
    >
      <h2 className="mb-[40px] font-sans text-[32px] font-semibold leading-[40px] tracking-[0.32px] text-[var(--text-primary)]">
        Side work
      </h2>
      <div className="flex flex-col gap-[70px]">
        {sideWorkCards.map((card) => (
          <article key={card.id} className="flex flex-col gap-[20px]">
            <ScaledCover
              nativeWidth={840}
              nativeHeight={553}
              className={`rounded-[32px] shrink-0 ${card.coverBgClass}`}
            >
              {card.media.map((media) => (
                <MediaItem key={media.src} media={media} />
              ))}
            </ScaledCover>
            <h3 className="font-sans text-[24px] font-semibold leading-[32px] text-[#383232]">
              {card.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Note: plain `<img>` (not `next/image`) is intentional — it matches the old SideWork/media handling, supports `onError` without extra wiring, and these are fixed-size decorative images. If the linter flags `@next/next/no-img-element`, keep `<img>` and silence per line only if the repo already does so elsewhere (the old `SideWork.tsx` used `<img>` without suppression, so no warning is expected).

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors (warnings acceptable only if pre-existing).

- [ ] **Step 4: Commit**

```bash
git add src/data/sideWork.ts src/components/SideWork.tsx
git commit -m "feat: rebuild side work section as stacked cards per Figma design"
```

---

### Task 3: Wire section into home page + remove dead marquee CSS

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css:431-449` (delete `side-work-scroll` / `side-work-track` / `side-work-paused` rules)

**Interfaces:**
- Consumes: default export `SideWork` from `@/components/SideWork` (Task 2).

- [ ] **Step 1: Enable the section in `src/app/page.tsx`** (uncomment import, place between `ProjectsGrid` and `FooterNote`)

```tsx
import FooterNote from "@/components/FooterNote";
import IntroSection from "@/components/IntroSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import SideWork from "@/components/SideWork";

export default function Home() {
  return (
    <>
      <IntroSection />
      <ProjectsGrid />
      <SideWork />
      <FooterNote />
    </>
  );
}
```

- [ ] **Step 2: Delete the dead marquee CSS from `src/app/globals.css`**

Remove exactly this block (currently lines 431–449):

```css
@keyframes side-work-scroll {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0%); }
}

.side-work-track {
  animation: side-work-scroll 50s linear infinite;
  will-change: transform;
}

.side-work-paused {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .side-work-track {
    animation: none;
  }
}
```

Then confirm nothing references it: `grep -rn "side-work-track\|side-work-paused\|side-work-scroll" src/` → expected: no matches.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds with no type or lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: enable side work section on home page, drop marquee CSS"
```

---

### Task 4: Visual verification

**Files:** none (verification only)

**Interfaces:**
- Consumes: the running app (`npm run dev`) with Tasks 1–3 complete.

- [ ] **Step 1: Start the dev server and screenshot the section**

Run `npm run dev` in the background, then load `http://localhost:3000` (headless browser screenshot or manual check) and verify against the Figma screenshot:

- "Side work" heading appears below the last project card, left-aligned in the same column.
- Card 1: four finance phone screenshots in a row on the light-gray cover.
- Card 2: vinyl video playing centered in its cover.
- Card 3: plain gray cover (no broken-media icon, no console error that breaks rendering), title "Movie diary web app".
- Narrow the viewport below 840px: cards scale uniformly like the project cards.

- [ ] **Step 2: Report result to the user**

State what was verified with evidence (screenshot or described observation). If anything mismatches the Figma, fix before claiming completion.
