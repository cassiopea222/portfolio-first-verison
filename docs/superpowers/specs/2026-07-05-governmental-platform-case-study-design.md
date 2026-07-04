# Governmental Platform case study + site-wide Inter font migration

Source: Figma node `552-8876` ("gov web" frame), file `J3uPwVk6E3k2rI1b1RTP7S`.

## Goal

Build out the "Governmental Platform" case study page (currently a `planned`
skeleton at `/projects/governmental-platform`) using the content, layout, and
typography defined in Figma, and migrate the site's body/heading font from
Geist to Inter + Inter Display to match Figma — applying the same font
treatment to the existing case studies for consistency.

## 1. Font migration

**Add Inter, retire Geist as the sans font:**
- Add `Inter` via `next/font/google` in `src/app/layout.tsx` (weights 400/500/600/700, variable `--font-inter`).
- In `globals.css`, change `--font-sans: var(--font-geist)` → `--font-sans: var(--font-inter)`. This automatically re-points every `type-*` utility class and any element relying on body's default `font-family`.
- Remove the `Geist` (sans) font load and `--font-geist` variable from `layout.tsx`/`globals.css`. `Geist_Mono` stays untouched — it's a separate font object backing only `--font-mono`/`.type-mono`, unrelated to the sans swap. `HeroFlowAround.tsx` reads `getComputedStyle(document.body).fontFamily` with a hardcoded `"Geist"` string fallback for SSR — that's just a fallback literal (used before hydration measures the real font), not a dependency on the font object, so no change needed there.
- `--font-inter-display` (local SemiBold-only font) already exists and is loaded — no change needed, just used more widely.

**Existing case studies — update H1 to Inter Display:**
- `FitnessCaseStudy.tsx`, `BetaTestingPlatformCaseStudy.tsx`, `RoleManagementCaseStudy.tsx`: change their `<h1>` to use `fontFamily: var(--font-inter-display)` (SemiBold), keeping current font sizes/weights/line-heights otherwise unchanged (28px/medium → stays 28px, just swap family + since Inter Display only ships SemiBold, drop the explicit `font-medium` override on that element).
- `ProjectCaseSkeleton.tsx` currently uses `var(--font-crimson)` (serif) for its placeholder heading — leave as-is, it's an intentional placeholder style, not part of this migration.
- Body copy in all case studies already inherits `--font-sans` by default (no explicit font-family), so it picks up Inter automatically — no per-file changes needed there.

## 2. New case study: `GovernmentalPlatformCaseStudy.tsx`

New file `src/components/projects/GovernmentalPlatformCaseStudy.tsx`, wired into
`src/app/projects/[slug]/page.tsx` for slug `governmental-platform` (same
pattern as the other three). `src/lib/projects.ts`: flip that record's
`status` from `"planned"` to `"ready"`.

Content and structure (all copy verbatim from Figma):

1. **Title** — "Government Monitoring Platform: Web (Dashboards & CMS)", two lines, Inter Display SemiBold 32px/50px, `text-primary`. No separate mono subtitle line above it (Figma has none for this page — differs from other case studies, which is what Figma specifies here).
2. **NDA notice** — bordered pill/box: "This project is under NDA - almost all data, content, and visuals shown have been altered and are fictional." (`background-subtle` `#fafafa` bg, `#ededed` border, `text-tertiary`).
3. **Cover** — blurred background photo + centered screenshot, rounded 24px container, same pattern as `Showcase`/hero covers in other case studies.
4. **Meta row** — Role: "Product Designer" / Team: "4 designers" / Timeline: "Feb 2025 - June 2026". Labels are **blue** (`#157EBE`) uppercase Inter Semibold — not the grey/mono treatment `CaseStudyMeta` uses elsewhere. Add an optional `accent?: boolean` prop to `CaseStudyMeta` that swaps the label from `font-inconsolata text-tertiary` to `font-semibold text-[#157ebe]` (Inter, inherited from body). Other case studies keep calling it without the prop → unaffected.
5. **Context** — heading + paragraph + a small diagram (CMS box with blue accent, connected to Dashboard + PM Dashboard boxes below via connector lines). Connector line art downloaded as an image asset (decorative, not worth hand-coding as SVG paths).
6. **Challenges** — heading + paragraph.
7. **Team and my role** — heading, 3 cards (Design/4 designers, Business Analysis/BA team, QA & development/QDS team) each with an icon + bullet list, followed by a closing paragraph. The paragraph references "[Design System case study]" — rendered as plain text (not a link), since that case study doesn't exist as a route.
8. **Process** — heading + paragraph + a 5-sprint timeline diagram (Design+BA / QDS swimlanes, "Feature A - design" / "Feature A - build" / "Feature B - design" blocks, dashed sprint gridlines, "Spec handoff" connector arrow).
9. **Dashboard** — heading + paragraph, then 2 screenshots with captions: "Overview", "Tourism Indicators".
10. **CMS Back-office** — heading + paragraph, then:
    - Demand Management (subheading + 2 paragraphs) → 2 screenshots: "Operation Dashboard", "Demand details"
    - Library (subheading + paragraph) → 1 screenshot: "Sector details"
    - Role Management (subheading + 2 paragraphs, one with "3 environments" emphasized) → 4 screenshots: "Database of roles", then 3 numbered flow screenshots each with its own lead-in sentence ("Creating new role", "Assigning role to a user during profile creation", "Setting up granular action permissions for each user separately")
11. **Summary** — heading + paragraph (mentions "[Design System case study]" again, plain text).
12. **Read connected case studies** — heading + "Design System case study" / "Mobile app case study", plain text (not links) since neither route exists yet.

## 3. Table of contents

Reuse `CaseStudyToC` unmodified. Flat list of the 7 top-level sections:

```
Context, Challenges, Team and my role, Process, Dashboard, CMS Back-office, Summary
```

`title` prop = `"Web, Mobile & CMS"` (the project's `subtitle` field — matches how Fitness/Ajax/Role pass their subtitle as the ToC title).

## 4. Assets

Download all Figma image assets referenced in the design (short-lived URLs,
must download during this session) into `public/home/governmental-platform/`:

- `cover-bg.png` (blurred shutterstock background, 1583×633)
- `cover-screenshot.png` (773×430 dashboard screenshot)
- `context-diagram-connector.png` (decorative connector lines)
- `role-icon-design.png`, `role-icon-ba.png`, `role-icon-qa.png` (20×20 icons)
- `process-arrow.png` (decorative connector)
- `dashboard-overview.png`, `dashboard-tourism-indicators.png`
- `cms-operation-dashboard.png`, `cms-demand-details.png`, `cms-sector-details.png`
- `cms-role-management-table.png`, `cms-role-creating.png`, `cms-role-assigning.png`, `cms-role-permissions.png`

All are explicitly NDA-altered/fictional per the design's own notice, so no
additional redaction needed beyond what's already in the source file.

## Out of scope

- Building the "Design System case study" or "Mobile app case study" pages/routes.
- Changing `CaseStudyLayout` or `CaseStudyToC` structurally (ToC stays flat, no nesting/grouping support added).
- RTL/bilingual support mentioned in the case study copy itself — that's describing the *product*, not a requirement for this *portfolio page*.
