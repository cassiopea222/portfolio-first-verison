# Side Work Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-bleed, auto-scrolling "Side Work" carousel to the home page that pauses and zooms the hovered card, and opens a lightbox on click.

**Architecture:** A new client component (`SideWork.tsx`) reads a static data array (`src/data/sideWork.ts`), renders a duplicated track of cards for a seamless CSS-keyframe marquee, and reuses the existing lightbox fade/scale keyframes already in `globals.css`. No new dependencies, no backend, no test framework changes — this repo has no test runner configured, so verification is `npm run lint`, `npx tsc --noEmit`, and manual checks against the running dev server (per project convention for UI work).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

## Global Constraints

- No test framework exists in this repo (`package.json` has no test script, no jest/vitest/playwright config) — do not introduce one. Verify each task via `npm run lint`, `npx tsc --noEmit`, and visual confirmation with `npm run dev`.
- Reuse existing assets verbatim: `/playground/vinyl_plate_animation.mp4`, `/playground/concept_animation.mp4`, `/playground/lorde%20ipod.png` (file on disk: `public/playground/lorde ipod.png`), `/playground/player%20lorde.png` (file on disk: `public/playground/player lorde.png`).
- Device mockup images do not exist yet (`public/side-work/device-1.png` … `device-4.png`). Reference them by path; render a neutral placeholder box on image load failure so the page never shows a broken `<img>`. Do not create dummy placeholder image files.
- Section heading text is exactly "Side work", styled identically to `ProjectsGrid`'s "Selected work" heading (`font-sans text-[24px] font-medium leading-[32px] text-[var(--text-secondary)]`).
- Card corner radius: `rounded-[20px]` (matches `ProjectCard`'s cover radius).
- Reuse the existing `pg-fade-in` / `pg-scale-in` keyframes (already defined in `src/app/globals.css:381-389`) for the lightbox — do not redefine them.
- Spec reference: `docs/superpowers/specs/2026-07-01-side-work-section-design.md`.

---

## File Structure

- `src/data/sideWork.ts` — **create**. Item types + the 7-item array.
- `src/app/globals.css` — **modify**. Add the marquee keyframes, a `.side-work-track` class, and a reduced-motion override.
- `src/components/SideWork.tsx` — **create**. The section: heading, full-bleed marquee track, hover pause/zoom, lightbox.
- `src/app/page.tsx` — **modify**. Render `<SideWork />` between `<ProjectsGrid />` and `<FooterNote />`.

---

### Task 1: Side Work data file

**Files:**
- Create: `src/data/sideWork.ts`

**Interfaces:**
- Produces: `SideWorkItem` (discriminated union on `kind: "video" | "image" | "ipodComposition"`), `sideWorkItems: SideWorkItem[]` — consumed by Task 3/4.

- [ ] **Step 1: Write the data file**

```ts
// src/data/sideWork.ts

export type SideWorkVideoItem = {
  id: string;
  kind: "video";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type SideWorkImageItem = {
  id: string;
  kind: "image";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type SideWorkIpodCompositionItem = {
  id: string;
  kind: "ipodComposition";
  ipodSrc: string;
  playerSrc: string;
  width: number;
  height: number;
  alt: string;
};

export type SideWorkItem =
  | SideWorkVideoItem
  | SideWorkImageItem
  | SideWorkIpodCompositionItem;

export const sideWorkItems: SideWorkItem[] = [
  {
    id: "vinyl-animation",
    kind: "video",
    src: "/playground/vinyl_plate_animation.mp4",
    width: 360,
    height: 360,
    alt: "Vinyl plate animation",
  },
  {
    id: "concept-animation",
    kind: "video",
    src: "/playground/concept_animation.mp4",
    width: 480,
    height: 360,
    alt: "Concept animation",
  },
  {
    id: "device-1",
    kind: "image",
    src: "/side-work/device-1.png",
    width: 150,
    height: 360,
    alt: "Device mockup 1",
  },
  {
    id: "device-2",
    kind: "image",
    src: "/side-work/device-2.png",
    width: 150,
    height: 360,
    alt: "Device mockup 2",
  },
  {
    id: "device-3",
    kind: "image",
    src: "/side-work/device-3.png",
    width: 150,
    height: 360,
    alt: "Device mockup 3",
  },
  {
    id: "device-4",
    kind: "image",
    src: "/side-work/device-4.png",
    width: 150,
    height: 360,
    alt: "Device mockup 4",
  },
  {
    id: "lorde-ipod",
    kind: "ipodComposition",
    ipodSrc: "/playground/lorde%20ipod.png",
    playerSrc: "/playground/player%20lorde.png",
    width: 420,
    height: 360,
    alt: "Lorde iPod concept with player overlay",
  },
];
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `sideWork.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/data/sideWork.ts
git commit -m "feat: add Side Work section data"
```

---

### Task 2: Marquee keyframes in globals.css

**Files:**
- Modify: `src/app/globals.css` (insert after the existing `pg-scale-in` block, currently ending at line 389)

**Interfaces:**
- Produces: `.side-work-track` class and `side-work-scroll` keyframe — consumed by Task 3 (`SideWork.tsx`).

- [ ] **Step 1: Read the current end of the keyframes section**

Run: `sed -n '380,390p' src/app/globals.css`
Expected output ends with:
```
@keyframes pg-scale-in {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
```

- [ ] **Step 2: Append the marquee keyframes and track class**

Add this block immediately after the `pg-scale-in` keyframes (after the closing `}` on the line matched above):

```css

@keyframes side-work-scroll {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0%); }
}

.side-work-track {
  animation: side-work-scroll 50s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .side-work-track {
    animation: none;
  }
}
```

- [ ] **Step 3: Verify the file still parses**

Run: `npm run lint`
Expected: no new errors (lint covers `.css` only if configured; at minimum confirm no other rule broke — this step mainly guards against a stray brace).

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add Side Work marquee keyframes"
```

---

### Task 3: SideWork component — static track, media rendering, marquee

**Files:**
- Create: `src/components/SideWork.tsx`

**Interfaces:**
- Consumes: `sideWorkItems`, `SideWorkItem` from `src/data/sideWork.ts` (Task 1); `.side-work-track` class from `src/app/globals.css` (Task 2).
- Produces: default export `SideWork` (no props) — consumed by Task 4 (`page.tsx`). Also produces internal helpers `SideWorkCardMedia`, `SideWorkImage`, `IpodComposition`, `SideWorkLightbox`, all defined in this same file (not exported — internal to this component, per Task 5's lightbox additions).

- [ ] **Step 1: Write the component (static track + media, no hover/lightbox yet)**

```tsx
// src/components/SideWork.tsx
"use client";

import { useState, type CSSProperties } from "react";
import { sideWorkItems, type SideWorkItem } from "@/data/sideWork";

const TRACK_ITEMS = [...sideWorkItems, ...sideWorkItems];

const EDGE_MASK =
  "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)";

function SideWorkImage({
  item,
}: {
  item: Extract<SideWorkItem, { kind: "image" }>;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="h-full w-full bg-[#ededed]" aria-hidden="true" />;
  }
  return (
    <img
      src={item.src}
      alt=""
      onError={() => setFailed(true)}
      className="block h-full w-full object-cover"
    />
  );
}

function IpodComposition({
  item,
  className = "h-full w-full",
  style,
}: {
  item: Extract<SideWorkItem, { kind: "ipodComposition" }>;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`relative ${className}`} style={style}>
      <img
        src={item.ipodSrc}
        alt=""
        className="absolute object-cover"
        style={{ left: "11%", top: "14%", width: "40%", height: "72%" }}
      />
      <img
        src={item.playerSrc}
        alt=""
        className="absolute object-cover"
        style={{ left: "55%", top: "40%", width: "37%", height: "19%" }}
      />
    </div>
  );
}

function SideWorkCardMedia({ item }: { item: SideWorkItem }) {
  if (item.kind === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        className="block h-full w-full object-cover"
      />
    );
  }
  if (item.kind === "ipodComposition") {
    return <IpodComposition item={item} />;
  }
  return <SideWorkImage item={item} />;
}

export default function SideWork() {
  return (
    <section className="w-full pb-[60px]">
      <h2 className="mx-auto mb-6 w-full max-w-[900px] fluid-px font-sans text-[24px] font-medium leading-[32px] text-[var(--text-secondary)]">
        Side work
      </h2>

      <div
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
        style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
      >
        <div className="side-work-track flex w-max gap-6">
          {TRACK_ITEMS.map((item, index) => {
            const key = `${item.id}-${index}`;
            return (
              <div
                key={key}
                className="relative shrink-0 overflow-hidden rounded-[20px] bg-[#ededed]"
                style={{ width: item.width, height: item.height }}
              >
                <SideWorkCardMedia item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `SideWork.tsx`.

- [ ] **Step 3: Temporarily mount it to verify visually**

Edit `src/app/page.tsx` to add `import SideWork from "@/components/SideWork";` and render `<SideWork />` right after `<ProjectsGrid />` (this exact edit is finalized in Task 4 — here it's just to preview).

Run: `npm run dev`, open `http://localhost:3000`.
Expected: below "Selected work", a "Side work" heading appears, followed by a full-width row of cards (vinyl + concept videos playing, 4 gray placeholder boxes where device mockups will go, and the iPod/player composition) drifting continuously left→right, fading at the left/right viewport edges, looping seamlessly.

- [ ] **Step 4: Commit**

```bash
git add src/components/SideWork.tsx
git commit -m "feat: add Side Work card track with marquee animation"
```

(Leave the temporary `page.tsx` edit from Step 3 uncommitted — Task 4 redoes it as part of its own commit.)

---

### Task 4: Hover pause + zoom, and click-to-open lightbox

**Files:**
- Modify: `src/components/SideWork.tsx` (the file created in Task 3)

**Interfaces:**
- Consumes: everything from Task 3 (`SideWorkCardMedia`, `IpodComposition`, `TRACK_ITEMS`, `SideWorkItem`).
- Produces: same default export `SideWork`, now with hover-pause, hover-zoom, and lightbox wired in. No new exports.

- [ ] **Step 1: Replace the card `div` with an interactive `button`, add hover state, and pause the track on hover**

In `src/components/SideWork.tsx`, replace the `export default function SideWork() { ... }` block with:

```tsx
function SideWorkLightbox({
  item,
  onClose,
}: {
  item: SideWorkItem;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      style={{ animation: "pg-fade-in 150ms ease forwards" }}
      onClick={onClose}
    >
      <div
        style={{ animation: "pg-scale-in 150ms ease forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.kind === "video" && (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="block"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          />
        )}
        {item.kind === "image" && (
          <img
            src={item.src}
            alt={item.alt}
            className="block"
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
          />
        )}
        {item.kind === "ipodComposition" && (
          <IpodComposition
            item={item}
            className=""
            style={{ width: "min(90vw, 480px)", height: "min(90vh, 411px)" }}
          />
        )}
      </div>
    </div>
  );
}

export default function SideWork() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<SideWorkItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section className="w-full pb-[60px]">
      <h2 className="mx-auto mb-6 w-full max-w-[900px] fluid-px font-sans text-[24px] font-medium leading-[32px] text-[var(--text-secondary)]">
        Side work
      </h2>

      <div
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
        style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
      >
        <div
          className="side-work-track flex w-max gap-6"
          style={{ animationPlayState: hoveredKey ? "paused" : "running" }}
        >
          {TRACK_ITEMS.map((item, index) => {
            const key = `${item.id}-${index}`;
            const isHovered = hoveredKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(item)}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() =>
                  setHoveredKey((current) => (current === key ? null : current))
                }
                aria-label={item.alt}
                className={`relative shrink-0 overflow-hidden rounded-[20px] border-0 bg-[#ededed] p-0 transition-transform duration-200 ease-out ${
                  isHovered ? "scale-[1.06]" : "scale-100"
                }`}
                style={{ width: item.width, height: item.height }}
              >
                <SideWorkCardMedia item={item} />
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <SideWorkLightbox item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
```

- [ ] **Step 2: Update the import line to include `useEffect`**

Change:
```tsx
import { useState, type CSSProperties } from "react";
```
to:
```tsx
import { useEffect, useState, type CSSProperties } from "react";
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `SideWork.tsx`.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors (a `<button>` wrapping a `<video>`/`<img>` is valid; if eslint flags the inline `style` usage, that's consistent with existing patterns in `ProjectCard.tsx` and is not a new violation).

- [ ] **Step 5: Manual verification with dev server**

Run: `npm run dev` (page.tsx temporarily edited from Task 3, Step 3 still in place), open `http://localhost:3000`.

Check:
- Hovering any card pauses the entire row's drift immediately.
- The hovered card scales up slightly; un-hovering shrinks it back and resumes drift.
- Clicking a video card opens a centered lightbox with that video playing with controls; clicking the backdrop or pressing Escape closes it.
- Clicking the iPod/player card opens a lightbox showing both images composed the same way as the card, just larger.
- Clicking a device placeholder card opens a lightbox showing the gray placeholder box treatment is acceptable (no broken image icon).

- [ ] **Step 6: Commit**

```bash
git add src/components/SideWork.tsx
git commit -m "feat: add hover pause/zoom and lightbox to Side Work"
```

---

### Task 5: Wire into the home page

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: default export `SideWork` from `src/components/SideWork.tsx` (Task 4).

- [ ] **Step 1: Update the page**

Replace the full contents of `src/app/page.tsx` with:

```tsx
import FooterNote from "@/components/FooterNote";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import SideWork from "@/components/SideWork";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <SideWork />
      <FooterNote />
    </>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with no errors.

- [ ] **Step 3: Full manual walkthrough**

Run: `npm run dev`, open `http://localhost:3000`.

Confirm, against the spec (`docs/superpowers/specs/2026-07-01-side-work-section-design.md`):
- Section order top to bottom: Hero, "Selected work", "Side work", footer.
- "Side work" heading matches "Selected work" heading style.
- The card row is full-bleed (extends past the 900px column to the viewport edges) while the heading stays aligned to the 900px column.
- Row auto-scrolls continuously without user input; loop is seamless (no visible jump/reset).
- Both videos autoplay/loop muted on page load, independent of hover.
- Hovering pauses the whole row and zooms only the hovered card; un-hovering resumes.
- Clicking any card opens the lightbox; Escape and backdrop-click both close it.
- Resize the browser to a narrow (mobile) width — row still renders full-bleed and scrolls; tapping a card (no hover available) opens the lightbox directly.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: render Side Work section on home page"
```

---

## Post-implementation note

Device mockup images don't exist yet. Once `public/side-work/device-1.png` … `device-4.png` are added (no code change needed — `src/data/sideWork.ts` already points at those paths), reload the dev server and confirm the four cards switch from gray placeholders to the real images automatically.
