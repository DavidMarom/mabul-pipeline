<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# Project rules

These apply to everyone who touches this repo — the main conversation, every skill, and every subagent. Skills add role-specific workflow on top; they never override these.

## Styling

- **CSS Modules only** (`*.module.css`). Never Tailwind, never inline styles (`style={{...}}`).
- **Tokens, not raw values.** Colors, spacing, and typography come from the custom properties in `src/app/globals.css`. Never write a raw hex, px, or rem value when a token exists for it.
- `docs/DESIGN_SYSTEM.md` is the source of truth for tokens and patterns. If you need a value that isn't there, don't invent one — it's a design gap (see **Workflow**).
- Class names in modules are camelCase.

## Component structure

Every component lives in its own folder under `src/components/`:

```
src/components/
├── index.ts                     ← barrel file — export every component here
└── MyComponent/
    ├── MyComponent.tsx           ← JSX only, keep it thin
    ├── MyComponent.module.css    ← all styles
    ├── MyComponent.utils.ts      ← plain TS helpers — business logic lives here
    ├── MyComponent.constants.ts  ← constants
    └── MyComponent.types.ts      ← interfaces & types
```

Types shared across components go in a top-level `src/types/` folder.

## Code style

- **Named exports everywhere — except Next.js route files.** `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` and the like must `export default`; the framework requires it. Don't "fix" them.
- Prefer explicit types over inference when it aids readability. No `any`.
- Functions in `.utils.ts` are pure where possible.

## Workflow

Feature work goes through `/product`, which owns task files in `.claude/tasks/`. A task is only closed once its `## Verification` section is filled in — a Stop hook enforces this.
