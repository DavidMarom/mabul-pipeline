# Task: Pipeline learnings knowledge base

Status: done
Track: B
Track reason: workflow/process change to skill definitions and markdown structure — no new UI surface, no visual change

## Problem
Once a task is closed it gets renamed to `<name>.done.md` and is effectively forgotten. Lessons captured in it — deviations from briefs, recurring user feedback, gotchas discovered during implementation — don't carry forward. Each new task starts cold, and the same mistakes or rediscoveries can repeat across tasks. `docs/DESIGN_SYSTEM.md` captures design tokens but nothing about process learnings, recurring pitfalls, or user preferences that span tasks.

## Goal
The pipeline retains durable, cross-task learnings so that `product`, `designer`, and `developer` start each new task already informed by what was learned on prior ones.

## Requirements
- Create a durable learnings store (e.g. `docs/LEARNINGS.md` or a `knowledge/` folder) that persists across tasks and is checked into the repo.
- `developer` appends a short entry when it finishes a task: notable deviations from the brief, pitfalls hit, or patterns worth reusing — not a full changelog, just what would help a future task.
- `designer` appends entries the same way for design-side learnings (e.g. a token that turned out to be wrong, a pattern that worked well).
- `product` reads the learnings store during Step 1 (Intake) so new task framing benefits from prior experience, and references it when briefing `designer`/`developer`.
- Keep entries short and skimmable — bullet points, not essays. Avoid duplicating what's already documented in `docs/DESIGN_SYSTEM.md` or task files.

## Constraints
- Must not duplicate the per-task `## Implementation Notes` / `## Design Brief` sections already written into task files — this store is for things worth surfacing across tasks, not a copy of task history.
- Should follow the existing markdown-file conventions used elsewhere in `.claude/skills/` and `docs/`.

## Out of scope
- Building any UI for browsing learnings
- Automated summarization or search — plain markdown append is sufficient for now
- Migrating/backfilling learnings from already-closed `.done.md` task files

## Implementation Notes
- Files created/modified:
  - `docs/LEARNINGS.md` (new — durable cross-task learnings store with `## Product`, `## Design`, `## Development` sections, each pre-seeded with an HTML comment explaining what belongs there)
  - `.claude/skills/product/SKILL.md` (Step 1 now reads the `## Product` section before intake; Track B handoff to developer now passes the `docs/LEARNINGS.md` path; Step 4 close-out now appends a learnings bullet when a task surfaces a recurring pattern, framing mistake, or user preference)
  - `.claude/skills/designer/SKILL.md` (Step 0 now reads the `## Design` section alongside the design system; Step 3 now appends a learnings bullet after updating the design system, when warranted)
  - `.claude/skills/developer/SKILL.md` (added a top-level note in `## Invocation` to read the `## Development` section before implementing; all three completion paths — direct from product, from designer, and Track B fast-track — now append a learnings bullet alongside the existing Implementation Notes step, when warranted)
- Deviations from brief: none
- New design tokens used: none

## Completion Summary
Built `docs/LEARNINGS.md`, a durable cross-task knowledge store with `## Product`, `## Design`, and `## Development` sections, and wired all three pipeline skills (`product`, `designer`, `developer`) to read their relevant section before starting work and append a short bullet on completion when something is worth carrying forward to future tasks. Confirmed done by the user on 2026-06-08.
