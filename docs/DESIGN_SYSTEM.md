# Design System

> Living document. Updated by the `/designer` skill after each design session.
> Source of truth for tokens, patterns, and decisions — if it's here, use it; if you're adding something new, add it here.

---

## Color tokens

Defined in `src/app/globals.css` as CSS custom properties.

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0d0d0d` | Page background |
| `--color-surface` | `#161616` | Card, navbar, panel backgrounds |
| `--color-surface-raised` | `#1e1e1e` | Hover state for surfaces |
| `--color-border` | `#2a2a2a` | All borders and dividers |
| `--color-text-primary` | `#f0f0f0` | Body text, headings |
| `--color-text-secondary` | `#888888` | Captions, metadata, muted labels |
| `--color-accent` | `#4f8ef7` | CTAs, links, focus rings, icons |
| `--color-accent-dim` | `rgba(79,142,247,0.12)` | Icon badge backgrounds, subtle highlights |
| `--color-accent-hover` | `#3a7de0` | Accent on hover |
| `--color-discord` | `#5865F2` | Discord brand CTA background — purposefully off-palette to signal "leaves the app" |
| `--color-discord-hover` | `#4752c4` | Discord CTA hover state |

**Theme:** dark only (`color-scheme: dark` on `html`).

---

## Spacing scale

Base unit: **4px**. All spacing uses these tokens — no raw px values in components.

| Token | Value | Common use |
|---|---|---|
| `--space-1` | 4px | Tiny gaps (icon + label) |
| `--space-2` | 8px | Tight internal padding |
| `--space-3` | 16px | Default component padding (mobile) |
| `--space-4` | 24px | Default component padding (desktop), card padding |
| `--space-5` | 32px | Section gaps |
| `--space-6` | 48px | Section padding (footer, features) |
| `--space-8` | 64px | Large section separators |
| `--space-10` | 80px | Hero / page-level padding |

---

## Typography

Fonts loaded via Next.js font system (`var(--font-geist-sans)`, `var(--font-geist-mono)`).

| Role | Font | Size | Weight | Line height |
|---|---|---|---|---|
| Logo / code labels | Geist Mono | 15px | 600 | — |
| Nav links | Geist Sans | 14px | 500 | — |
| Card title (mobile) | Geist Sans | 16px | 600 | 1.3 |
| Card title (desktop) | Geist Sans | 18px | 600 | 1.3 |
| Card description (mobile) | Geist Sans | 14px | 400 | 1.6 |
| Card description (desktop) | Geist Sans | 15px | 400 | 1.6 |
| Footer / captions | Geist Sans | 13px | 400 | 1.5 |

---

## Breakpoints

Mobile-first. All components start at mobile and layer up.

| Name | Min-width | Notes |
|---|---|---|
| mobile | — | Default (no media query) |
| tablet | 768px | Navbar grows to 64px; padding shifts to `--space-4` |
| desktop | 1024px | Typography scales up; grid columns increase |

Max content width: **1080px**, centered with `margin: 0 auto`.

---

## Border radius

| Context | Radius |
|---|---|
| Cards | 12px |
| Icon badges | 10px |
| Focus ring offset elements | 2–4px |
| Buttons | 8px — consistent with Hero implementation; softer than card radius to feel actionable |

---

## Interaction states

Consistent patterns across all interactive elements:

| State | Pattern |
|---|---|
| Hover (text links) | `color: var(--color-text-primary)`, `transition: color 150ms ease` |
| Hover (cards) | `background: --color-surface-raised`, border shifts to `rgba(79,142,247,0.3)`, `translateY(-2px)` |
| Focus-visible | `outline: 2px solid var(--color-accent)`, `outline-offset: 3px` |
| Reduced motion | Suppress `transform` transitions; keep color transitions |

Touch targets: minimum **44×44px** on mobile.

---

## Elevation model

No box shadows. Elevation is expressed through background color steps:

```
bg → surface → surface-raised
#0d0d0d  →  #161616  →  #1e1e1e
```

---

## Component inventory

| Component | Location | Status |
|---|---|---|
| Navbar | `src/components/Navbar/` | Stable |
| Footer | `src/components/Footer/` | Stable |
| FeatureCard | `src/components/FeatureCard/` | Stable |
| Features (grid) | `src/components/Features/` | Stable |
| Hero | `src/components/Hero/` | In progress |
| Icons | `src/components/icons/` | In progress |
| PageHeader | `src/components/PageHeader/` | Planned — inner-page eyebrow + h1 + tagline pattern |
| SkillCard | `src/components/SkillCard/` | Planned — command badge + persona + responsibilities |
| PipelineFlow | `src/components/PipelineFlow/` | Planned — Track A / Track B visual flow |
| DiscordBanner | `src/components/DiscordBanner/` | Planned — community invite strip between Personas and Footer |
