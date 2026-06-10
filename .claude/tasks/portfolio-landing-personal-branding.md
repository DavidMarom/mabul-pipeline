# Task: Portfolio Landing — Personal Branding for David Marom

Status: reviewing
Track: A
Track reason: New visual surface and layout changes to the landing page — personal branding elements, attribution, and LinkedIn link not in existing design system.

## Problem
The landing page currently presents Mabul AI Pipeline as a generic product. David Marom is job-hunting and wants to showcase this project in his portfolio — visitors (recruiters, hiring managers) have no idea who built it.

## Goal
Update the landing page so it clearly attributes the project to David Marom, with a visible LinkedIn link, while keeping the existing dark design aesthetic.

## Requirements
- Display "Built by David Marom" (or equivalent prominent attribution) on the landing page
- Include a clickable LinkedIn link: https://www.linkedin.com/in/maromdavid/
- Attribution should be visible without scrolling (above the fold or in the Navbar/Hero)
- LinkedIn link must open in a new tab
- Attribution and link should feel intentional and polished, not like an afterthought

## Constraints
- Must use existing design system tokens (colors, spacing, typography from docs/DESIGN_SYSTEM.md)
- Dark theme only
- Do not remove or break existing sections (Hero, Personas, DiscordBanner, Footer)

## Out of scope
- Full portfolio page or resume section
- Adding other social links (GitHub, Twitter, etc.) unless the designer includes them naturally
- Redesigning any section beyond the landing page

## Design Brief

### Summary
Attribution lives in three places — all above the fold or immediately visible — forming a layered, intentional signature without dominating the product content.

1. **Navbar** — LinkedIn icon link alongside the existing GitHub icon link (right side of the nav bar)
2. **Hero byline** — "Built by David Marom →" line between the headline and the CodeBlock, center-aligned
3. **Footer** — Enhance the existing footer line to include "Built by David Marom" with LinkedIn link

---

### Layout

**Navbar (existing `Navbar.tsx` + `Navbar.module.css`)**
- Add a `LinkedInIcon` SVG to `src/components/icons/index.tsx` (18×18, same spec as `GitHubIcon`)
- Add a new `<a>` element inside `.actions`, right of the GitHub link, styled with the new `.linkedinLink` class
- Layout: flex row, `gap: var(--space-2)` between icon and label text "LinkedIn"
- Same structure as `.githubLink`; text label "LinkedIn" hidden on mobile (≤767px), visible on tablet+

**Hero (existing `Hero.tsx` + `Hero.module.css`)**
- Insert a `<p className={styles.byline}>` element after `.headline`, before `<CodeBlock />`
- Content: `Built by ` (plain text) + `<a>David Marom</a>` (LinkedIn link, opens in new tab)
- Center-aligned, inline flow

**Footer (existing `Footer.tsx` + `Footer.module.css`)**
- Current: `© 2026 Mabul Pipeline — MIT License`
- New: two-line footer
  - Line 1: `© 2026 Mabul AI Pipeline — MIT License` (existing, minor text fix)
  - Line 2: `Built by David Marom` — "David Marom" is a LinkedIn link, styled with `.linkedinLink` class (new, reuses existing `.link` pattern but in accent color on the name)

Breakpoints: mobile-first, no layout change at breakpoints except the Navbar LinkedIn label visibility.

---

### Component hierarchy

```
Navbar
  header.navbar
    div.inner
      span.logo
      nav.actions
        Link (Home)
        Link (Skills)
        a.githubLink (GitHub icon + "GitHub")
        a.linkedinLink (LinkedIn icon + "LinkedIn")   ← NEW

Hero
  section.hero
    div.content
      p.eyebrow
      h1.headline
      p.byline                                        ← NEW
        "Built by "
        a (David Marom → LinkedIn)
      CodeBlock
      div.ctaGroup

Footer
  footer.footer
    p.text (copyright line)
    p.attribution                                     ← NEW
      "Built by "
      a.linkedinLink (David Marom → LinkedIn)
```

New components: none (all changes are to existing components).
New icon: `LinkedInIcon` added to `src/components/icons/index.tsx`.

---

### Spacing & sizing

| Element | Property | Value |
|---|---|---|
| Hero `.byline` | `margin-top` | `-var(--space-2)` (pulls it closer to headline) |
| Hero `.byline` | `margin-bottom` | `0` (gap handled by parent `.content` gap: `--space-4`) |
| Footer `.attribution` | `margin-top` | `var(--space-2)` |
| Navbar `.linkedinLink` | `gap` | `var(--space-2)` (icon + label, same as `.githubLink`) |
| Navbar `.linkedinLink` label | display | `none` on mobile, `inline` on tablet+ |

---

### Color & typography

**Hero byline**
- "Built by " — `color: var(--color-text-secondary)`, 13px, weight 400
- "David Marom" link — `color: var(--color-accent)` default, `color: var(--color-accent-hover)` on hover
- No underline by default; underline on hover (`text-decoration: underline`, `text-underline-offset: 3px`)
- Font: Geist Sans (inherits from body)

**Navbar LinkedIn link**
- Identical to `.githubLink`: `color: var(--color-text-secondary)` → `var(--color-text-primary)` on hover
- 14px, weight 500

**Footer attribution**
- "Built by " — `color: var(--color-text-secondary)`, 13px, weight 400 (inherits from `.text`)
- "David Marom" — `color: var(--color-accent)`, underline, same hover as Hero byline

---

### Interaction states

| Element | Default | Hover | Focus-visible | Active |
|---|---|---|---|---|
| Navbar LinkedIn link | `--color-text-secondary` | `--color-text-primary`, `transition: color 150ms ease` | `outline: 2px solid var(--color-accent)`, `outline-offset: 3px` | — |
| Hero byline name link | `--color-accent`, no underline | `--color-accent-hover`, `text-decoration: underline` | `outline: 2px solid var(--color-accent)`, `outline-offset: 3px` | — |
| Footer LinkedIn link | `--color-accent`, underline | `--color-accent-hover` | `outline: 2px solid var(--color-accent)`, `outline-offset: 3px`, `border-radius: 2px` | — |

---

### Accessibility

- LinkedIn `<a>` elements: `target="_blank" rel="noopener noreferrer"`
- Navbar LinkedIn icon: `aria-hidden="true"` on SVG; link text "LinkedIn" is the accessible label
- Hero byline link: visible text "David Marom" is sufficient; no extra aria-label needed
- Footer LinkedIn link: visible text "David Marom" is sufficient
- Contrast: `--color-accent` (#4f8ef7) on `--color-bg` (#0d0d0d) — WCAG AA compliant (approx 4.9:1)
- Touch target: Hero byline link must have `min-height: 44px` via padding or line-height on mobile; use `padding: var(--space-2) 0` on the byline `<p>` to ensure the link inside meets 44px tap target
- Keyboard: all links are native `<a>` elements — keyboard navigable by default

## Implementation Notes
- Files created/modified:
  - `src/components/icons/index.tsx` — added `LinkedInIcon`
  - `src/components/Navbar/Navbar.tsx` — added LinkedIn link
  - `src/components/Navbar/Navbar.module.css` — added `.linkedinLink`, `.linkedinLabel` styles
  - `src/components/Hero/Hero.tsx` — added byline paragraph
  - `src/components/Hero/Hero.module.css` — added `.byline` and `.byline a` styles
  - `src/components/Footer/Footer.tsx` — added attribution paragraph, updated "Mabul Pipeline" → "Mabul AI Pipeline"
  - `src/components/Footer/Footer.module.css` — added `.attribution` and `.linkedinLink` styles
- Deviations from brief: none
- New design tokens used: none
