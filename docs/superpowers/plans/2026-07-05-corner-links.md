# Corner Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent, always-visible bottom-right corner element with links to email, LinkedIn, and resume, matching the Figma reference (node `707:23711`, file `J3uPwVk6E3k2rI1b1RTP7S`), rendered globally so it appears on every route.

**Architecture:** One new presentational component, `src/components/CornerLinks.tsx`, rendered once in `src/app/layout.tsx` as a sibling of `AppShellHeader`/`main`. Fixed positioning, hidden below the 810px breakpoint, no background/border/shadow — plain text links reusing the existing destinations from `Hero.tsx`.

**Tech Stack:** Next.js App Router, Tailwind v4, plain `<a>` tags. No test runner in this repo (`package.json` only has `dev`/`build`/`start`/`lint`) — verification is `npm run lint`, `npm run build`, and manual browser check.

## Global Constraints

- Container: `fixed bottom-6 right-6 z-40`
- Hidden below 810px: `hidden min-[810px]:flex` (matches `Header.tsx`'s existing breakpoint)
- Column layout, right-aligned (`items-end`)
- Row 1: "LinkedIn" and "Resume", `gap-4` (16px)
- Row 2: email address text, below row 1
- Font: Inter medium, `text-[18px] leading-[26px]`, no underline
- Row 1 color: `#818790` (matches `--text-tertiary`)
- Row 2 (email) color: `#4b4d53` (literal value per Figma — distinct from existing `--text-secondary` `#404246`)
- No background, border, or shadow anywhere in this component
- Links reuse exact destinations from `src/components/Hero.tsx:47,58,67`: `mailto:ubulyndina@gmail.com`, `https://www.linkedin.com/in/julia-bulyndina-872617241/`, `/cv/julia-bulyndina-cv.pdf`
- Email link is plain (no copy-to-clipboard interception — that stays specific to the Hero CTA)
- LinkedIn and Resume links use `target="_blank" rel="noopener noreferrer"`
- Spec file: `docs/superpowers/specs/2026-07-05-corner-links-design.md`

---

### Task 1: Create `CornerLinks` component and wire it into the root layout

**Files:**
- Create: `src/components/CornerLinks.tsx`
- Modify: `src/app/layout.tsx:64-69`

**Interfaces:**
- Produces: default-exported React component `CornerLinks` with no props, rendered as `<CornerLinks />`.

- [ ] **Step 1: Create the component file**

Create `src/components/CornerLinks.tsx`:

```tsx
const EMAIL_ADDRESS = "ubulyndina@gmail.com";

export default function CornerLinks() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end min-[810px]:flex">
      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/julia-bulyndina-872617241/"
          target="_blank"
          rel="noopener noreferrer"
          className="py-1 font-sans text-[18px] font-medium leading-[26px] text-[#818790] no-underline transition-colors hover:text-[var(--text-primary)]"
        >
          LinkedIn
        </a>
        <a
          href="/cv/julia-bulyndina-cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="py-1 font-sans text-[18px] font-medium leading-[26px] text-[#818790] no-underline transition-colors hover:text-[var(--text-primary)]"
        >
          Resume
        </a>
      </div>
      <a
        href={`mailto:${EMAIL_ADDRESS}`}
        className="py-1 font-sans text-[18px] font-medium leading-[26px] text-[#4b4d53] no-underline transition-colors hover:text-[var(--text-primary)]"
      >
        {EMAIL_ADDRESS}
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Wire it into the root layout**

In `src/app/layout.tsx`, current code (lines 64-69):

```tsx
        <TooltipProvider>
          <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <AppShellHeader />
            <main className="flex-1">{children}</main>
          </div>
        </TooltipProvider>
```

Change to:

```tsx
        <TooltipProvider>
          <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <AppShellHeader />
            <main className="flex-1">{children}</main>
          </div>
          <CornerLinks />
        </TooltipProvider>
```

Add the import alongside the other component imports near the top of the file:

```tsx
import AppShellHeader from "@/components/AppShellHeader";
import CornerLinks from "@/components/CornerLinks";
import TooltipProvider from "@/components/TooltipProvider";
```

- [ ] **Step 3: Run lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed with no new errors.

- [ ] **Step 4: Manual verification in the browser**

Run: `npm run dev`, open `http://localhost:3000`.

Check:
- At viewport widths ≥810px, the LinkedIn / Resume / email links are visible fixed to the bottom-right corner, with no background/border/shadow behind them.
- The corner links stay in place while scrolling the page (fixed, not scrolling away).
- Navigate to `/about` and `/playground` — the corner links persist unchanged on every route.
- Resize below 810px — the corner links disappear (matching the nav's mobile breakpoint), no layout overlap with the hamburger menu.
- Click LinkedIn: opens the LinkedIn profile in a new tab.
- Click Resume: opens `/cv/julia-bulyndina-cv.pdf` in a new tab.
- Click the email address: opens the system mail client addressed to `ubulyndina@gmail.com` (no copy-to-clipboard behavior, unlike the Hero email button).
- Hover each link: text color shifts (visual affordance), no underline appears.

- [ ] **Step 5: Commit**

```bash
git add src/components/CornerLinks.tsx src/app/layout.tsx
git commit -m "feat: add persistent corner links for email, linkedin, and resume"
```
