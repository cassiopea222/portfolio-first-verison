# Hero Blur-In Entrance Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fast (300ms), staggered blur-to-clear entrance animation to the hero nav bar and headline that plays on every page load/reload, without affecting layout and respecting `prefers-reduced-motion`.

**Architecture:** Pure CSS `@keyframes` in `globals.css`, following the existing `page-enter` pattern. Two utility classes (`.hero-enter-nav`, `.hero-enter-heading`) apply the same keyframes with different `animation-delay`. No JS/Framer Motion — `animation-fill-mode: both` makes it self-triggering on mount.

**Tech Stack:** Next.js App Router, Tailwind v4 (`@import "tailwindcss"` + `@layer utilities`), plain CSS keyframes. No test runner in this repo (`package.json` only has `dev`/`build`/`start`/`lint`) — verification is `npm run lint`, `npm run build`, and manual browser check.

## Global Constraints

- Duration: 300ms (spec range 250–350ms)
- Blur amount: 12px → 0 (spec range 10–12px)
- Timing function: `ease-out`
- Stagger: nav delay 0ms, heading delay 70ms (spec range 50–80ms)
- Animate only `opacity` and `filter` — never `transform`/`width`/`height`
- `animation-fill-mode: both`
- Must not collide with the existing `.route-enter` / `.route-enter-stagger` animation on `IntroSection`'s `<section>` root (that targets the section, this targets the `<h1>` inside it — different elements, no shorthand overwrite)
- Must extend the existing `@media (prefers-reduced-motion: reduce)` block in `globals.css`, not add a second one
- Spec file: `docs/superpowers/specs/2026-07-04-hero-blur-in-design.md`

---

### Task 1: Add `hero-enter` keyframes + utility classes to `globals.css`

**Files:**
- Modify: `src/app/globals.css:278-303` (immediately after the existing `.route-enter-stagger` rules, inside the same `@layer utilities` block)
- Modify: `src/app/globals.css:363-383` (existing `@media (prefers-reduced-motion: reduce)` block)

**Interfaces:**
- Produces: CSS classes `.hero-enter-nav` and `.hero-enter-heading`, both driven by a `@keyframes hero-enter` rule. Task 2 applies these class names verbatim to JSX elements.

- [ ] **Step 1: Add the `hero-enter` keyframes above the `@layer utilities` block**

In `src/app/globals.css`, directly above the line `@layer utilities {` (currently line 174), add:

```css
/* Hero entrance: blur-to-clear reveal for the nav bar + headline on load */
@keyframes hero-enter {
  from {
    opacity: 0;
    filter: blur(12px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}
```

- [ ] **Step 2: Add the two utility classes inside `@layer utilities`, after `.route-enter-stagger > *:nth-child(4)`**

Immediately after this existing block (around line 300-302):

```css
  .route-enter-stagger > *:nth-child(4) {
    animation-delay: 210ms;
  }
```

add:

```css
  .hero-enter-nav {
    animation: hero-enter 300ms ease-out both;
    will-change: opacity, filter;
  }

  .hero-enter-heading {
    animation: hero-enter 300ms ease-out 70ms both;
    will-change: opacity, filter;
  }
```

- [ ] **Step 3: Extend the reduced-motion media query**

In the existing block (currently lines 363-383):

```css
@media (prefers-reduced-motion: reduce) {
  .route-enter,
  .route-enter-stagger > * {
    animation: none;
    opacity: 1;
    transform: none;
  }
```

change the selector list to also include the new classes:

```css
@media (prefers-reduced-motion: reduce) {
  .route-enter,
  .route-enter-stagger > *,
  .hero-enter-nav,
  .hero-enter-heading {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
  }
```

(This adds `filter: none` to the shared rule — harmless for `.route-enter`/`.route-enter-stagger > *`, which never set `filter`.)

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: no new errors (CSS isn't linted by ESLint, so this just confirms the edit didn't break anything else — should pass same as before the change).

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add hero-enter blur-to-clear keyframes and utility classes"
```

---

### Task 2: Apply the classes to the nav bar and headline

**Files:**
- Modify: `src/components/Header.tsx:68-72` (the `<header>` root element)
- Modify: `src/components/IntroSection.tsx:296-298` (the `<h1>` element)

**Interfaces:**
- Consumes: `.hero-enter-nav` and `.hero-enter-heading` classes produced in Task 1.

- [ ] **Step 1: Apply `.hero-enter-nav` to the header root in `Header.tsx`**

Current code (lines 68-72):

```tsx
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 mx-auto w-full max-w-[900px] fluid-px pt-6 pb-3"
    >
```

Change to:

```tsx
  return (
    <header
      ref={headerRef}
      className="hero-enter-nav sticky top-0 z-50 mx-auto w-full max-w-[900px] fluid-px pt-6 pb-3"
    >
```

- [ ] **Step 2: Apply `.hero-enter-heading` to the `<h1>` in `IntroSection.tsx`**

Current code (lines 296-298):

```tsx
        <h1
          className="flex flex-col items-center font-semibold text-[var(--text-primary)]"
          style={{
```

Change to:

```tsx
        <h1
          className="hero-enter-heading flex flex-col items-center font-semibold text-[var(--text-primary)]"
          style={{
```

- [ ] **Step 3: Run lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed with no new errors.

- [ ] **Step 4: Manual verification in the browser**

Run: `npm run dev`, open `http://localhost:3000`.

Check:
- On load/reload, the nav bar blurs in first, the headline (including the folder/tags, cover image, heart, and phone visuals inside it) blurs in ~70ms after, both finishing within ~370ms total.
- Reload a few times — no layout shift/jump during the animation (only opacity/blur change, no positional jump).
- In Chrome DevTools, Rendering tab → "Emulate CSS media feature `prefers-reduced-motion`" → set to `reduce`, reload: both elements should appear instantly at full opacity/no blur, no animation.
- Navigate to `/about` and back to `/` (client-side route change): confirm the existing route-enter section fade/slide on `IntroSection` still plays normally and doesn't look broken alongside the new heading blur (the two animations target different elements — section vs. `<h1>` — so both should run independently without visual conflict).

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/IntroSection.tsx
git commit -m "feat: wire up hero blur-in animation on nav bar and headline"
```
