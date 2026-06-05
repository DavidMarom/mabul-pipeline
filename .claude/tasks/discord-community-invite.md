# Task: Discord Community Invite

Status: reviewing

Track: A
Track reason: New UI surface — invite banner/section with a Discord CTA, no existing pattern in the app

## Problem
Users of Mabul Pipeline have no visible prompt to join the community Discord server. Potential community members miss the opportunity to connect with other users.

## Goal
Surface a Discord invite CTA that encourages users to join the community server at https://discord.gg/5AYMXycvgZ.

## Requirements
- Display a Discord invite element visible on the homepage
- Include the Discord server invite link: https://discord.gg/5AYMXycvgZ
- Clicking the CTA opens the Discord invite in a new tab
- Should feel native to the existing design (Navbar / Hero / Personas / Footer layout)
- Mobile responsive

## Constraints
- Must use existing design system tokens (docs/DESIGN_SYSTEM.md)
- Invite URL is fixed: https://discord.gg/5AYMXycvgZ

## Out of scope
- Discord bot integration
- Authentication or user account linking with Discord
- Tracking/analytics on invite clicks

## Design Brief

### Layout
- A full-width `<section>` placed between `<Personas />` and `<Footer />` in `page.tsx`
- Inner container: max-width 1080px, centered with `margin: 0 auto`, horizontal padding `var(--space-3)` mobile / `var(--space-4)` tablet+
- **Mobile:** single column, centered — icon above, then heading + subtext, then CTA button
- **Tablet+ (768px+):** single row with `display: flex; align-items: center; justify-content: space-between` — icon+text on the left, button on the right
- Separator: `border-top: 1px solid var(--color-border)` at section top to visually separate from Personas

### Component hierarchy
- `DiscordBanner` (new) — `src/components/DiscordBanner/`
  - `section.banner` — outer section with background and border
    - `div.inner` — max-width container
      - `div.content` — icon + text block
        - `DiscordIcon` (new SVG, inline in component) — 28×28px
        - `div.text`
          - `p.heading` — primary invite line
          - `p.subtext` — supporting copy
      - `a.cta` — Discord-branded CTA button, `target="_blank" rel="noopener noreferrer"`

### Copy
- **heading:** "Join the Mabul community"
- **subtext:** "Ask questions, share your pipeline, and connect with other builders."
- **CTA label:** "Join Discord"

### Spacing & sizing
- Section vertical padding: `var(--space-6)` top and bottom (48px)
- `inner` horizontal padding: `var(--space-3)` (16px) mobile, `var(--space-4)` (24px) tablet+
- Gap between icon and text: `var(--space-3)` (16px)
- Gap between content block and CTA (mobile): `var(--space-4)` (24px)
- CTA min-height: 44px (touch target), padding: 12px 24px
- CTA border-radius: 8px (consistent with button pattern)

### Color & typography
- Section background: `var(--color-surface)` (`#161616`)
- Icon color: `--color-discord` (`#5865F2`) — new token, Discord brand purple-indigo
- `heading`: `var(--color-text-primary)`, 16px / 600 weight, Geist Sans
- `subtext`: `var(--color-text-secondary)`, 14px / 400 weight, Geist Sans, line-height 1.6
- CTA background: `--color-discord` (`#5865F2`); text: `#fff`; hover bg: `--color-discord-hover` (`#4752c4`) — new token
- CTA focus-visible: `outline: 2px solid var(--color-accent); outline-offset: 3px` (consistent with system)

**New tokens to add to `globals.css`:**
```css
--color-discord: #5865F2;
--color-discord-hover: #4752c4;
```

### Interaction states
| Element | Default | Hover | Focus-visible | Active |
|---|---|---|---|---|
| CTA button | `bg: --color-discord`, white text | `bg: --color-discord-hover`, `translateY(-1px)` | `outline: 2px solid var(--color-accent)`, offset 3px | `translateY(0)` |

Reduced motion: suppress `transform` on CTA hover, keep background color transition.

### Accessibility
- CTA `<a>` must include `aria-label="Join the Mabul Pipeline Discord community"` (descriptive for screen readers)
- Discord icon is decorative → `aria-hidden="true"`
- Minimum contrast: white text on `#5865F2` passes WCAG AA (4.54:1)
- Keyboard: tab order flows naturally — content left-to-right, CTA last
- Focus ring on CTA uses `--color-accent` (consistent with system focus pattern)

## Implementation Notes
- Files created/modified:
  - `src/components/DiscordBanner/DiscordBanner.tsx` (created)
  - `src/components/DiscordBanner/DiscordBanner.module.css` (created)
  - `src/components/index.ts` (added DiscordBanner export)
  - `src/app/page.tsx` (added DiscordBanner between Personas and Footer)
  - `src/app/globals.css` (added --color-discord and --color-discord-hover tokens)
- Deviations from brief: none
- New design tokens used: `--color-discord` (#5865F2), `--color-discord-hover` (#4752c4)
