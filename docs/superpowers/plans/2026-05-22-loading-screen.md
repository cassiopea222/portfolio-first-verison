# Loading Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an orchid flipbook loading screen that appears on initial page load (1500ms minimum) and during Next.js App Router route transitions.

**Architecture:** A single `LoadingScreen` client component (fixed overlay, 8-frame webp orchid flipbook at 130ms/frame) is shared between two contexts — `AppShell.tsx` manages the initial-load splash in `layout.tsx`, and `/src/app/loading.tsx` exports it for Next.js route transitions.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, no testing framework (use `npx tsc --noEmit` + manual verification)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/LoadingScreen.tsx` | Create | Fixed overlay, orchid flipbook, `visible` prop controls opacity |
| `src/components/AppShell.tsx` | Create | Client wrapper; shows `LoadingScreen` on mount, hides after `window.onload` + 1500ms |
| `src/app/layout.tsx` | Modify | Import and use `AppShell` instead of the bare `<div>` |
| `src/app/loading.tsx` | Create | Next.js route transition loading state — re-exports `LoadingScreen` |

---

### Task 1: `LoadingScreen` component

**Files:**
- Create: `src/components/LoadingScreen.tsx`

- [ ] **Step 1: Create the component**

```tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

const FRAMES = [
  "/orchid/1.webp",
  "/orchid/2.webp",
  "/orchid/frame-01.webp",
  "/orchid/frame-02.webp",
  "/orchid/frame-03.webp",
  "/orchid/frame-04.webp",
  "/orchid/frame-06.webp",
  "/orchid/frame-07.webp",
];

const SIZE = 160;
const FRAME_MS = 130;

interface Props {
  visible?: boolean;
}

export default function LoadingScreen({ visible = true }: Props) {
  const [frameIdx, setFrameIdx] = useState(0);
  const hasPreloaded = useRef(false);

  useEffect(() => {
    if (!hasPreloaded.current) {
      hasPreloaded.current = true;
      FRAMES.slice(1).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }

    const timer = setInterval(() => {
      setFrameIdx((i) => (i + 1) % FRAMES.length);
    }, FRAME_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        backgroundColor: "var(--background)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 400ms ease",
      }}
    >
      <div style={{ position: "relative", width: SIZE, height: SIZE }}>
        {FRAMES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            width={SIZE}
            height={SIZE}
            style={{
              position: "absolute",
              inset: 0,
              width: SIZE,
              height: SIZE,
              objectFit: "contain",
              opacity: i === frameIdx ? 1 : 0,
              userSelect: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `cd /Users/yulliab/portfolio && npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/LoadingScreen.tsx
git commit -m "feat: add LoadingScreen orchid flipbook component"
```

---

### Task 2: `AppShell` client component

**Files:**
- Create: `src/components/AppShell.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";

const MIN_DISPLAY_MS = 1500;
const FADE_MS = 400;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const startRef = useRef(Date.now());

  useEffect(() => {
    function hide() {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setMounted(false), FADE_MS);
      }, remaining);
    }

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      return () => window.removeEventListener("load", hide);
    }
  }, []);

  return (
    <>
      {mounted && <LoadingScreen visible={visible} />}
      {children}
    </>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AppShell.tsx
git commit -m "feat: add AppShell splash controller for initial page load"
```

---

### Task 3: Wire `AppShell` into `layout.tsx`

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add the `AppShell` import and wrap the layout content**

Open `src/app/layout.tsx`. Add the import at the top (after the existing imports):

```tsx
import AppShell from "@/components/AppShell";
```

Then replace the `<TooltipProvider>` block inside `<body>` — currently:

```tsx
<TooltipProvider>
  <div className="flex min-h-screen flex-col bg-[var(--background)]">
    <AppShellHeader />
    <main className="flex-1">{children}</main>
  </div>
</TooltipProvider>
```

With:

```tsx
<AppShell>
  <TooltipProvider>
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <AppShellHeader />
      <main className="flex-1">{children}</main>
    </div>
  </TooltipProvider>
</AppShell>
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wrap layout in AppShell for initial-load splash"
```

---

### Task 4: Route transition loading state

**Files:**
- Create: `src/app/loading.tsx`

- [ ] **Step 1: Create `loading.tsx`**

```tsx
import LoadingScreen from "@/components/LoadingScreen";

export default function Loading() {
  return <LoadingScreen />;
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/loading.tsx
git commit -m "feat: add route-transition loading screen via Next.js loading.tsx"
```

---

### Task 5: Manual verification

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Initial load — open the site**

Navigate to `http://localhost:3000`. Verify:
1. Orchid flipbook is visible immediately on load, centered on a white background
2. Flowers cycle visibly for at least 1.5 seconds
3. Screen fades out smoothly (~400ms) after the minimum time + page load
4. Portfolio content is visible and usable after the fade

- [ ] **Step 3: Route transition — navigate between pages**

Click through to a project case study. Verify:
1. Loading screen appears during navigation
2. Disappears when the new page is ready

- [ ] **Step 4: Fast reload check**

Hard-refresh (`Cmd+Shift+R`) multiple times. Confirm the loading screen always shows for the full 1.5s minimum, never flickers.
