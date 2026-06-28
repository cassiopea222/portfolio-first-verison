# Playground Tab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Playground" tab to the header and build a freeform 2D scrollable canvas page where design assets are displayed as a collage, with a click-to-expand lightbox overlay.

**Architecture:** Header gains a third tab by extending the existing `navLinks` array and `TAB_WIDTHS`/`TAB_OFFSETS` maps; the button width switches from conditional className to `style` so it's data-driven. The `/playground` page renders a large absolute-positioned canvas inside a viewport-sized `overflow: scroll` container. Lightbox state lives inline in the page component.

**Tech Stack:** Next.js 15 App Router, React, Tailwind CSS (no new packages)

## Global Constraints

- No new npm packages
- Tailwind CSS only — no new CSS files (add keyframes to existing `src/app/globals.css`)
- Follow existing code style in `Header.tsx` (named exports, inline Tailwind, Record maps)
- Tab widths must be measured and confirmed in the browser before committing

---

### Task 1: Update Header with Playground tab

**Files:**
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Produces: `/playground` route accessible from desktop pill nav and mobile overlay; pill slides correctly between all three tabs

- [ ] **Step 1: Extend `navLinks`, `TAB_WIDTHS`, and `TAB_OFFSETS`**

In `src/components/Header.tsx`, replace the top constants block:

```ts
const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
];

// Tab widths match Figma: Work=100px, About=104px, Playground=measured in Step 4
const TAB_WIDTHS: Record<string, number> = { "/": 100, "/about": 104, "/playground": 148 };
// Offset = sum of widths of all tabs before this one
const TAB_OFFSETS: Record<string, number> = { "/": 0, "/about": 100, "/playground": 204 };
```

- [ ] **Step 2: Update `activeHref` to cover `/playground`**

```ts
const activeHref =
  pathname === "/about"
    ? "/about"
    : pathname === "/playground"
    ? "/playground"
    : "/";
```

- [ ] **Step 3: Switch button width from conditional className to data-driven `style`**

The current button has `${href === "/" ? "w-[100px]" : "w-[104px]"}` in its `className`. Remove that conditional and add a `style` prop instead:

```tsx
{navLinks.map(({ href, label }) => (
  <button
    key={href}
    role="tab"
    type="button"
    aria-selected={activeHref === href}
    onClick={() => onTabClick(href)}
    style={{ width: TAB_WIDTHS[href] }}
    className={`relative z-10 py-[6px] text-center font-sans text-[16px] leading-[26px] transition-colors duration-150 ${
      activeHref === href
        ? "cursor-default font-medium text-[var(--text-secondary)]"
        : "cursor-pointer font-normal text-[var(--text-tertiary)]"
    }`}
  >
    {label}
  </button>
))}
```

- [ ] **Step 4: Start dev server and measure the Playground tab width**

```bash
npm run dev
```

Open `http://localhost:3000`. In DevTools, inspect the Playground button element. With `width: 148px`, check visually whether the left/right breathing room matches Work and About. If the text looks tight or too loose, adjust `TAB_WIDTHS["/playground"]` and `TAB_OFFSETS["/playground"]` stays `204` (it is the sum of Work + About widths, independent of Playground's own width).

Typical measured result: 144–152px. Use the value that matches the visual padding of the other tabs.

- [ ] **Step 5: Verify pill animation across all three tabs**

Click Work → About → Playground → Work. The pill should slide and resize smoothly with no visual glitch. Check that `pillWidth` and `pillOffset` resolve correctly for `/playground`.

- [ ] **Step 6: Verify mobile menu**

Resize below 810px. Open hamburger. Playground should appear as the third link automatically (mobile nav maps over `navLinks`).

- [ ] **Step 7: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add Playground tab to header"
```

---

### Task 2: Create playground data file

**Files:**
- Create: `src/data/playground.ts`

**Interfaces:**
- Produces: `PlaygroundItem` type and `playgroundItems` array, consumed by Task 3

- [ ] **Step 1: Create the file**

```ts
// src/data/playground.ts

export type PlaygroundItem = {
  id: string;
  type: "image" | "video" | "iframe";
  src: string;
  width: number;   // canvas display width in px
  height: number;  // canvas display height in px
  top: number;     // absolute position from canvas top
  left: number;    // absolute position from canvas left
  alt?: string;
};

export const playgroundItems: PlaygroundItem[] = [];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/playground.ts
git commit -m "feat: add playground data types and item array"
```

---

### Task 3: Build Playground canvas page with lightbox

**Files:**
- Create: `src/app/playground/page.tsx`
- Modify: `src/app/globals.css` (add keyframe animations)

**Interfaces:**
- Consumes: `PlaygroundItem`, `playgroundItems` from `@/data/playground`

- [ ] **Step 1: Add keyframe animations to `globals.css`**

At the bottom of `src/app/globals.css`, append:

```css
@keyframes pg-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes pg-scale-in {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
```

- [ ] **Step 2: Create the page**

```tsx
// src/app/playground/page.tsx
"use client";

import { useEffect, useState } from "react";
import { playgroundItems, PlaygroundItem } from "@/data/playground";

export default function PlaygroundPage() {
  const [selected, setSelected] = useState<PlaygroundItem | null>(null);

  // Close lightbox on Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      {/* Canvas container — fills viewport below the header */}
      <div
        className="overflow-scroll cursor-grab active:cursor-grabbing"
        style={{ width: "100%", height: "calc(100dvh - 80px)" }}
      >
        <div className="relative" style={{ width: 4000, height: 3000 }}>
          {playgroundItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item)}
              aria-label={item.alt ?? `Playground item ${item.id}`}
              className="absolute p-0 border-0 bg-transparent cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ui-focus-ring)] focus-visible:outline-offset-2"
              style={{ top: item.top, left: item.left, width: item.width, height: item.height }}
            >
              {item.type === "image" && (
                <img
                  src={item.src}
                  alt={item.alt ?? ""}
                  className="block w-full h-full object-cover"
                />
              )}
              {item.type === "video" && (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="block w-full h-full object-cover"
                />
              )}
              {item.type === "iframe" && (
                <iframe
                  src={item.src}
                  title={item.alt ?? "Embedded prototype"}
                  className="block w-full h-full border-0 pointer-events-none"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt ?? "Playground item"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          style={{ animation: "pg-fade-in 150ms ease forwards" }}
          onClick={() => setSelected(null)}
        >
          {/* Inner content — stop click from closing when clicking the item itself */}
          <div
            style={{ animation: "pg-scale-in 150ms ease forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            {selected.type === "image" && (
              <img
                src={selected.src}
                alt={selected.alt ?? ""}
                className="block"
                style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
              />
            )}
            {selected.type === "video" && (
              <video
                src={selected.src}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="block"
                style={{ maxWidth: "90vw", maxHeight: "90vh" }}
              />
            )}
            {selected.type === "iframe" && (
              <iframe
                src={selected.src}
                title={selected.alt ?? "Embedded prototype"}
                className="block border-0"
                style={{
                  width: selected.width,
                  height: selected.height,
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Verify canvas height in the browser**

Open `http://localhost:3000/playground`. The canvas container should fill the viewport below the header with no extra page scroll. If there is a gap or the container overflows, inspect the `AppShellHeader` rendered height in DevTools and update the `calc(100dvh - 80px)` value to match the actual header height.

- [ ] **Step 4: Add a temporary test item and verify the lightbox**

In `src/data/playground.ts`, temporarily add:

```ts
export const playgroundItems: PlaygroundItem[] = [
  {
    id: "test-1",
    type: "image",
    src: "https://placehold.co/400x300/e7e7e7/818790",
    width: 400,
    height: 300,
    top: 200,
    left: 300,
    alt: "Test placeholder",
  },
  {
    id: "test-2",
    type: "image",
    src: "https://placehold.co/600x400/dfdfdf/4b4d53",
    width: 600,
    height: 400,
    top: 600,
    left: 900,
    alt: "Second test placeholder",
  },
];
```

Verify:
- Items appear on the canvas at the correct absolute positions
- Scrolling in both axes works
- Clicking an item opens the lightbox with the fade+scale animation
- Clicking the dark backdrop closes it
- Pressing `Escape` closes it
- Clicking the image itself (not the backdrop) does not close it

- [ ] **Step 5: Remove test items, leave array empty**

```ts
export const playgroundItems: PlaygroundItem[] = [];
```

- [ ] **Step 6: Commit**

```bash
git add src/app/playground/page.tsx src/app/globals.css src/data/playground.ts
git commit -m "feat: add Playground canvas page with collage layout and lightbox"
```
