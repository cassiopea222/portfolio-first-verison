# Case Study Layout Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken flex-row layout on all case study pages with a 3-column CSS grid so the content column is always centered on the viewport and the TOC sidebar never affects content centering.

**Architecture:** A new `CaseStudyLayout` wrapper component owns a full-width 3-column grid (`1fr min(800px, calc(100% - 40px)) 1fr`). The TOC sidebar goes in column 1, the content is always pinned to column 2 via `grid-column-start: 2`. `CaseStudyToC` is simplified to render only the sticky desktop nav (the mobile Go back button moves into `CaseStudyLayout`).

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v3, TypeScript

## Global Constraints

- Tailwind arbitrary value for grid: use inline `style` prop — `style={{ gridTemplateColumns: "1fr min(800px, calc(100% - 40px)) 1fr" }}` — because `min()` with `calc()` containing commas is unreliable in Tailwind's `[]` syntax.
- TOC sidebar breakpoint: `min-[1200px]` (was `min-[810px]`). At <1200px the left `1fr` column is under ~200px, not enough for the 180px TOC.
- Content max-width is enforced by the grid column (`min(800px, ...)`), not by a class on the inner div. Remove `max-w-[800px]` and `max-w-[840px]` from all inner content divs.
- No test framework — verification is TypeScript build (`npx tsc --noEmit`) + visual inspection in `npm run dev`.
- Do not add `cs-px` or `max-w-[1440px]` to `CaseStudyLayout` — those classes were compensating for the old unconstrained flex container.

---

### Task 1: Create `CaseStudyLayout` + update `CaseStudyToC`

**Files:**
- Create: `src/components/projects/CaseStudyLayout.tsx`
- Modify: `src/components/projects/CaseStudyToC.tsx`

**Interfaces:**
- Produces: `CaseStudyLayout` — default export, props `{ sidebar: ReactNode; backHref?: string; children: ReactNode }`
- Produces: `CaseStudyToC` — default export unchanged; now renders only the `<nav>` (no mobile Go back Link fragment)

---

- [ ] **Step 1: Create `CaseStudyLayout.tsx`**

  Create `src/components/projects/CaseStudyLayout.tsx` with this exact content:

  ```tsx
  import Link from "next/link";
  import { ArrowBackNavIcon } from "@/components/icons/ArrowBackNavIcon";
  import type { ReactNode } from "react";

  type Props = {
    sidebar: ReactNode;
    backHref?: string;
    children: ReactNode;
  };

  export default function CaseStudyLayout({ sidebar, backHref = "/", children }: Props) {
    return (
      <div
        className="grid w-full py-[120px] max-[809px]:py-[48px]"
        style={{ gridTemplateColumns: "1fr min(800px, calc(100% - 40px)) 1fr" }}
      >
        {/* TOC zone — col 1, shown only at ≥1200px */}
        <aside className="hidden min-[1200px]:flex justify-end pr-10">
          {sidebar}
        </aside>

        {/* Content zone — always col 2 */}
        <div className="col-start-2 min-w-0">
          {/* Mobile/tablet go-back — hidden when sidebar is visible */}
          <div className="mb-10 min-[1200px]:hidden">
            <Link
              href={backHref}
              className="type-body inline-flex w-fit items-center gap-2 rounded-xl border border-[#dadada] bg-[linear-gradient(179.23deg,#fff_4.27%,rgba(231,231,231,0.7)_98.14%)] px-3 py-2 text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,color] duration-200 ease-out hover:border-[#d5d5d5] hover:bg-[#efefef] hover:text-[var(--text-primary)]"
            >
              <ArrowBackNavIcon />
              Go back
            </Link>
          </div>
          {children}
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Update `CaseStudyToC` — change breakpoint and remove mobile Link**

  Open `src/components/projects/CaseStudyToC.tsx`. Make two changes:

  **Change 1:** Update the `<nav>` className — replace `min-[810px]:flex` with `min-[1200px]:flex`:

  ```tsx
  // Before
  className="sticky top-[120px] hidden h-fit w-[180px] shrink-0 flex-col gap-[32px] min-[810px]:flex"

  // After
  className="sticky top-[120px] hidden h-fit w-[180px] shrink-0 flex-col gap-[32px] min-[1200px]:flex"
  ```

  **Change 2:** Delete the entire mobile `<Link>` block at the bottom of the return (lines ~121–128). The full return statement should now be just the `<nav>` — no fragment wrapper needed:

  ```tsx
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
  ```

- [ ] **Step 3: Type-check**

  Run: `npx tsc --noEmit`

  Expected: no errors (CaseStudyLayout is new and not used anywhere yet, so no downstream type errors).

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/projects/CaseStudyLayout.tsx src/components/projects/CaseStudyToC.tsx
  git commit -m "feat: add CaseStudyLayout grid component, update CaseStudyToC breakpoint"
  ```

---

### Task 2: Migrate `FitnessCaseStudy`

**Files:**
- Modify: `src/components/projects/FitnessCaseStudy.tsx`

**Interfaces:**
- Consumes: `CaseStudyLayout` from `./CaseStudyLayout` — props `{ sidebar, backHref?, children }`
- Consumes: `CaseStudyToC` from `./CaseStudyToC` — props `{ sections, backHref?, title? }`

---

- [ ] **Step 1: Replace outer section with `CaseStudyLayout`**

  Open `src/components/projects/FitnessCaseStudy.tsx`.

  Add import at the top:
  ```tsx
  import CaseStudyLayout from "@/components/projects/CaseStudyLayout";
  ```

  Find the outer `<section>` (line ~52) and replace it with `CaseStudyLayout`. Also remove the `<CaseStudyToC>` from inside the content — move it to the `sidebar` prop. Update the inner content `<div>` to drop `max-w-[800px]` and `flex-1`.

  **Before (lines ~52–55):**
  ```tsx
  <section className="mx-auto flex w-full max-w-[1440px] items-start gap-[40px] cs-px py-[120px] max-[809px]:flex-col max-[809px]:gap-[40px] max-[809px]:py-[48px]">
    <CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Fitness app redesign" />

    <div className="flex min-w-0 w-full max-w-[800px] flex-1 flex-col gap-12">
  ```

  **After:**
  ```tsx
  <CaseStudyLayout
    backHref="/"
    sidebar={<CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Fitness app redesign" />}
  >
    <div className="flex min-w-0 w-full flex-col gap-12">
  ```

  At the bottom of the component, replace the closing `</section>` with `</CaseStudyLayout>`.

- [ ] **Step 2: Type-check**

  Run: `npx tsc --noEmit`

  Expected: no errors.

- [ ] **Step 3: Visual check in dev server**

  Run: `npm run dev`

  Navigate to `/projects/fitness-app-redesign` in a browser.

  Check at these viewport widths (use browser DevTools responsive mode):
  - **1440px**: Content is visually centered; TOC sidebar visible on the left. Measure or eyeball that the content's left and right margins are equal.
  - **1200px**: Content centered; TOC barely fits (left column ~200px).
  - **1100px**: TOC hidden; Go back button appears above title; content still centered.
  - **375px**: Mobile layout; Go back button shows; content full width with ~20px side margins.

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/projects/FitnessCaseStudy.tsx
  git commit -m "feat: migrate FitnessCaseStudy to CaseStudyLayout grid"
  ```

---

### Task 3: Migrate remaining case study components

**Files:**
- Modify: `src/components/projects/BetaTestingPlatformCaseStudy.tsx`
- Modify: `src/components/projects/RoleManagementCaseStudy.tsx`
- Modify: `src/components/projects/ProjectCaseSkeleton.tsx`

**Interfaces:**
- Consumes: `CaseStudyLayout` — same props as Task 2
- Consumes: `CaseStudyToC` — same props as Task 2

---

- [ ] **Step 1: Migrate `BetaTestingPlatformCaseStudy`**

  Open `src/components/projects/BetaTestingPlatformCaseStudy.tsx`.

  Add import:
  ```tsx
  import CaseStudyLayout from "@/components/projects/CaseStudyLayout";
  ```

  **Before (lines ~132–135):**
  ```tsx
  <section className="mx-auto flex w-full max-w-[1440px] items-start gap-[40px] cs-px py-[120px] max-[809px]:flex-col max-[809px]:gap-[40px] max-[809px]:py-[48px]">
    <CaseStudyToC sections={TOC_SECTIONS} title="Beta testing platform" />

    <div className="flex min-w-0 w-full max-w-[840px] flex-1 flex-col gap-[48px]">
  ```

  **After:**
  ```tsx
  <CaseStudyLayout
    backHref="/"
    sidebar={<CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Beta testing platform" />}
  >
    <div className="flex min-w-0 w-full flex-col gap-[48px]">
  ```

  Replace closing `</section>` with `</CaseStudyLayout>`.

- [ ] **Step 2: Migrate `RoleManagementCaseStudy`**

  Open `src/components/projects/RoleManagementCaseStudy.tsx`.

  Add import:
  ```tsx
  import CaseStudyLayout from "@/components/projects/CaseStudyLayout";
  ```

  **Before (lines ~220–223):**
  ```tsx
  <section className="mx-auto flex w-full max-w-[1440px] items-start gap-[40px] cs-px py-[120px] text-[var(--foreground)] max-[809px]:flex-col max-[809px]:gap-[40px] max-[809px]:py-[48px]">
    <CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Role Management System" />

    <div className="flex min-w-0 w-full max-w-[840px] flex-1 flex-col gap-[48px]">
  ```

  **After:** (`text-[var(--foreground)]` moves from the section to the inner div)
  ```tsx
  <CaseStudyLayout
    backHref="/"
    sidebar={<CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Role Management System" />}
  >
    <div className="flex min-w-0 w-full flex-col gap-[48px] text-[var(--foreground)]">
  ```

  Replace closing `</section>` with `</CaseStudyLayout>`.

- [ ] **Step 3: Migrate `ProjectCaseSkeleton`**

  Open `src/components/projects/ProjectCaseSkeleton.tsx`.

  Add imports:
  ```tsx
  import CaseStudyLayout from "@/components/projects/CaseStudyLayout";
  import CaseStudyToC from "@/components/projects/CaseStudyToC";
  ```

  Remove the existing `ArrowBackNavIcon` and `Link` imports (they're no longer used directly in this file — `CaseStudyLayout` handles the Go back button).

  **Before (lines ~11–19):**
  ```tsx
  <section className="mx-auto w-full max-w-[1440px] pb-[120px] pt-[120px] cs-px max-[809px]:py-[48px]">
    <div className="flex w-full max-w-[800px] flex-col gap-10">
      <Link
        href="/"
        className="type-body inline-flex w-fit items-center gap-2 rounded-xl border border-[#dadada] bg-[linear-gradient(179.23deg,#fff_4.27%,rgba(231,231,231,0.7)_98.14%)] px-3 py-2 text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,color] duration-200 ease-out hover:border-[#d5d5d5] hover:bg-[#efefef] hover:text-[var(--text-primary)]"
      >
        <ArrowBackNavIcon />
        Go back
      </Link>
  ```

  **After:**
  ```tsx
  <CaseStudyLayout
    backHref="/"
    sidebar={<CaseStudyToC sections={[]} backHref="/" />}
  >
    <div className="flex w-full flex-col gap-10">
  ```

  Replace closing `</section>` with `</CaseStudyLayout>`.

- [ ] **Step 4: Type-check**

  Run: `npx tsc --noEmit`

  Expected: no errors. If there are unused import warnings on `Link` or `ArrowBackNavIcon` in `ProjectCaseSkeleton`, remove those imports.

- [ ] **Step 5: Visual check in dev server**

  Run: `npm run dev`

  Check these routes at 1440px, 1200px, 1100px, and 375px:
  - `/projects/beta-testing-platform-ajax`
  - `/projects/role-management-system`

  At each viewport, verify:
  - **≥1200px**: TOC sidebar visible on the left; content visually centered (equal left/right margins around the 800px column).
  - **1100px**: No sidebar; Go back button above title; content centered.
  - **375px**: Go back button shows; content has ~20px side margins.

  Also confirm the long TOC (Role Management, 6 sections) doesn't affect content centering compared to the short TOC (Fitness, 3 sections).

- [ ] **Step 6: Production build check**

  Run: `npm run build`

  Expected: build completes with no errors. There may be warnings about `cs-px` being unused if no other page uses it — that's fine, leave the class definition in `globals.css`.

- [ ] **Step 7: Commit**

  ```bash
  git add src/components/projects/BetaTestingPlatformCaseStudy.tsx src/components/projects/RoleManagementCaseStudy.tsx src/components/projects/ProjectCaseSkeleton.tsx
  git commit -m "feat: migrate all case study pages to CaseStudyLayout grid"
  ```
