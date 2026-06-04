# Task: Skills Explainer Page

Status: done

## Problem
Developers who adopt the Mabul Pipeline framework don't have a dedicated place to learn what the three skills (product, designer, developer) are, what each one does, and how to invoke them. The landing page shows the personas but doesn't explain the workflow or give actionable usage instructions.

## Goal
Create a new page (`/skills`) that explains the three skills — who each persona is, what they do, and how a developer invokes them — so that any new user can understand and start using the pipeline within minutes.

## Requirements
- New route at `/skills` (Next.js App Router page)
- A visible CTA button on the home page (`/`) that navigates the user to `/skills`
- Explains all three skills: Product (Noah), Designer (Naamah), Developer (Shem)
- For each skill: name, persona description, responsibilities, and the exact invocation command (e.g. `/product`, `/designer`, `/developer`)
- Shows the full pipeline flow: how the skills hand off to each other (Track A: full pipeline; Track B: fast track)
- Mobile-first, responsive layout
- Accessible (proper headings, readable contrast, keyboard-navigable)
- Linked from the main Navbar so users can reach it at any time

## Constraints
- CSS Modules only — no Tailwind, no inline styles
- Must use existing design tokens from `docs/DESIGN_SYSTEM.md`
- Content is static — no API or dynamic data
- Must fit the dark theme of the existing app

## Out of scope
- Interactive demos or live code execution
- Editing or configuring skills from the UI
- Authentication or user accounts

Track: A
Track reason: new page and layout — new UI surface with no existing pattern

## Design Brief

### Layout

**`/skills` page — overall structure (mobile-first):**
- Navbar (reuse, with "Skills" link added)
- PageHeader: eyebrow + h1 + tagline
- SkillsGrid: 3 SkillCards
- PipelineFlow: Track A & B visual
- Footer (reuse)

All sections: `max-width: 1080px`, centered, `padding: 0 var(--space-3)`.
Tablet (768px+): padding shifts to `var(--space-4)`.
Desktop (1024px+): SkillsGrid becomes 3-column grid.

**Home page change:** Add secondary CTA "Explore Skills →" in Hero's `ctaGroup` linking to `/skills`. Uses existing `.secondaryCta` class — no new styles.

### Component hierarchy

- `Navbar` — reuse, add "Skills" nav link (`href="/skills"`)
- `Hero` — reuse, add secondary CTA to `/skills`
- `src/app/skills/page.tsx` — new page route
- `PageHeader` — new: eyebrow, h1, tagline (reusable inner-page header)
- `SkillCard` — new: command badge + persona name + role + description + responsibilities list
- `PipelineFlow` — new: visual Track A / Track B flow diagram
- `Footer` — reuse, no changes

### Spacing & sizing

- Page top padding: `var(--space-10)` on PageHeader
- Between sections: `var(--space-8)` (64px)
- PageHeader: centered, `max-width: 600px`
- SkillsGrid gap: `var(--space-4)` (24px)
- SkillCard padding: `var(--space-4)` (24px)
- PipelineFlow padding: `var(--space-6)` vertical, `var(--space-3)` horizontal
- Command badge padding: `4px 10px`

### Color & typography

**PageHeader:**
- Eyebrow: `--color-accent`, Geist Mono, 12px/500, uppercase, `letter-spacing: 0.12em`
- h1: `--color-text-primary`, 36px/600 mobile → 48px desktop
- Tagline: `--color-text-secondary`, 16px/400, `line-height: 1.6`

**SkillCard:**
- Card: bg `--color-surface`, border `1px solid --color-border`, radius 12px
- Hover: bg `--color-surface-raised`, border `rgba(79,142,247,0.3)`, `translateY(-2px)`
- Persona name: `--color-text-primary`, 20px/700
- Role label: `--color-text-secondary`, 13px/400
- Command badge: bg `--color-accent-dim`, color `--color-accent`, Geist Mono, 13px/600, radius 6px
- Description: `--color-text-secondary`, 14px/400, `line-height: 1.6`
- Responsibilities: `--color-text-secondary`, 13px/400, `line-height: 1.5`; bullet `--color-accent`

**PipelineFlow:**
- Section bg: `--color-surface`, border top/bottom `1px solid --color-border`
- Track label: `--color-text-secondary`, 11px/600, uppercase, Geist Mono
- Step pill: bg `--color-accent-dim`, color `--color-accent`, Geist Mono, 13px/500, radius 6px, padding `4px 12px`
- Arrow: `--color-text-secondary`, `→` character, 14px, `aria-hidden="true"`

### Interaction states

**Navbar "Skills" link:** default `--color-text-secondary`; hover `--color-text-primary`; active page `--color-text-primary`; focus-visible standard ring.
**Hero secondary CTA:** reuses `.secondaryCta` — no new styles.
**SkillCard:** hover bg `--color-surface-raised`, border accent-tinted, `translateY(-2px)` (motion-safe). Cards are `<article>` — non-interactive, no card-level focus state.

### Accessibility

- `<h1>` in PageHeader is the page title; section headings `<h2>`; card persona names `<h3>`
- Command badge wrapped in `<code>` for semantic correctness
- Pipeline arrows `aria-hidden="true"` — decorative
- All contrast ratios meet WCAG AA
- Touch targets ≥ 44px for nav links and CTAs

## Implementation Notes
- Files created/modified:
  - `src/components/PageHeader/PageHeader.tsx` + `.module.css` + `.types.ts` (new)
  - `src/components/SkillCard/SkillCard.tsx` + `.module.css` + `.types.ts` (new)
  - `src/components/PipelineFlow/PipelineFlow.tsx` + `.module.css` + `.types.ts` + `.constants.ts` (new)
  - `src/app/skills/page.tsx` + `skills.module.css` + `constants.ts` (new route)
  - `src/components/Navbar/Navbar.tsx` — added "Skills" Link
  - `src/components/Navbar/Navbar.module.css` — added `.navLink` class
  - `src/components/Hero/Hero.tsx` — added "Explore Skills →" secondary CTA
  - `src/components/index.ts` — added 3 new component exports
- Deviations from brief: none
- New design tokens used: none — all values from existing design system

## Completion Summary
Created the `/skills` page with a three-card layout explaining the Product (Noah), Designer (Naamah), and Developer (Shem) personas, their responsibilities, and exact invocation commands. Added a `PipelineFlow` section showing Track A and Track B handoff sequences. Added a "Skills" nav link to the Navbar and an "Explore Skills →" secondary CTA to the Hero. Confirmed complete by the user on 2026-06-04.
