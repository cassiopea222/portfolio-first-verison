# Hero text style fix + Works section rework — Design

Source: Figma `workspace` file, node `708:444773` (MacBook Pro 14" — 5), covering the
"Intro Section" (`708:444787`) and "Projects Section" (`708:444890`, first three
`Project Card` children).

## 1. Hero (IntroSection) text style

`src/components/IntroSection.tsx` was already built against this exact Figma node
(see its existing code comment referencing `708:444787`). Diffing the live
`get_design_context` output against the component found one mismatch:

- Figma: `line-height: 76px` at `font-size: 64px` (ratio `76/64`)
- Code: `lineHeight: 78 / 64`

Fix: change the headline's `lineHeight` from `78 / 64` to `76 / 64`. Font family
(Inter Display SemiBold via `--font-inter-display`), color (`--text-primary` /
`#373636`), and letter-spacing (`0.01em` ≈ `0.64px` at 64px) already match and are
left untouched.

## 2. Works section — complete rework

### Data model (`src/lib/projects.ts`)

- `ProjectRecord` gains:
  - `name: string` — bold project/client name (e.g. "Governmental Platform")
  - `subtitle: string` — medium-weight product-type descriptor (e.g. "Web, Mobile & CMS")
  - `hidden?: boolean` — excludes the entry from the homepage grid without removing
    it from the `projects` array, so `generateStaticParams` / `getProjectBySlug`
    (in `src/app/projects/[slug]/page.tsx`) keep working and the route stays
    reachable by direct link.
  - `cover` gains a `"governmental"` variant alongside `"ajax" | "fitness" | "role"`.
- `title` (the old single combined string) is replaced by `name` + `subtitle` everywhere
  it's read (`ProjectCard`, `ProjectCaseSkeleton`, any other consumer found via grep).
- `tags` stays on `ProjectRecord` for now (still used by `CaseStudyMeta` on case study
  pages) but is no longer rendered on the homepage card.

Entries, in order:
1. **Governmental Platform** (new) — `slug: "governmental-platform"`, `name:
   "Governmental Platform"`, `subtitle: "Web, Mobile & CMS"`, `dateRange: "Feb 2025 -
   Jun 2026"`, `description: "Three connected products built for a government
   organisation in the Arabic-speaking region - a monitoring dashboard, a back-office
   CMS, and a companion mobile app."`, `cover: "governmental"`, `status: "planned"`
   (no case study page yet → non-clickable, same as other `"planned"` entries today).
2. **Ajax Systems** — unchanged data, `cover: "ajax"`.
3. **Sadie Active** — unchanged data, `cover: "fitness"`.
4. **Role management system** — unchanged data, `hidden: true` added. Removed from
   the homepage grid; `/projects/role-management-system` keeps working.

### Card visuals (`src/components/ProjectCard.tsx`)

Per user decision: match Figma exactly — drop the tag pills and the bordered/
background card container entirely. New structure, image block then text directly
below, no wrapping frame:

- **Image block**: `rounded-[32px]`, `overflow-hidden`, no border/shadow. Aspect
  ratio via `ScaledCover` changes from `800×490` to `840×553` (Figma's card
  reference size) for all three cover types.
  - `governmental` (new): blurred abstract background image + centered rounded
    (16px) product screenshot — same layered pattern as `ajax`, using two new
    static images.
  - `ajax`: same blurred-bg + centered pattern, **keeping the existing video
    element exactly as implemented today** (per user instruction — don't touch the
    animation), just resized/re-radiused to the new 840×553 reference and 16px
    inner radius (up from 8px).
  - `fitness`: unchanged two-phone-image side-by-side pattern, resized to the new
    reference proportions (`226.773×479.218` each, ~28px gap, per Figma), background
    flattened to `#f1f1f1` with no border (border/shadow removed to match Figma).
  - `role`: untouched (hidden from the grid, but its case study page still renders
    it via `ProjectCard`/`ProjectCaseSkeleton` if visited directly — leave as-is).
  - The existing hover overlay (`bg-white/24` fade-in on group-hover) is kept for
    linked cards; it's a UX nicety not shown in the static Figma mock and doesn't
    conflict with the new visuals.
- **Text block** (directly below the image, no padding wrapper):
  - Date: `18px/26px`, medium, `#787878`, own line.
  - Title row: name (`24px/32px` semibold, `#383232`) + subtitle (`24px/32px`
    medium, `#383232`), `8px` gap — wraps to its own line under ~810px viewport
    width, same responsive pattern the current title/date row already uses.
  - Description: `20px/28px` regular, color changes from `--text-secondary` to
    `--text-primary` (`#373636`) per Figma — up from today's `16px/24px` secondary-gray.
- Tag pills are removed from the card markup entirely.

### New image assets

`public/home/governmental-platform/`:
- `background.png` — blurred abstract background (seeded with the Figma mock export;
  original 1024×410, upscale source recommended before final export)
- `screenshot.png` — product screenshot shown centered on top (seeded with the Figma
  mock export; original 2517×1399)

These are placeholders downloaded from the Figma file so the section renders
correctly today. The user will replace both files (same filenames) with real
exports whenever the actual product screenshots/background are ready — no code
changes needed for the swap.

## Out of scope

- The "Side work" section (Frame `712:795249` in the same Figma frame) is a
  separate, currently-commented-out (`<SideWork />`) piece of the page and is not
  touched by this change.
- No case study page is scaffolded for Governmental Platform (per user decision) —
  the card renders non-clickable via the existing `status: "planned"` path.
- Role Management's case study component/page/route are left fully intact, only
  unlisted from the homepage grid.
