# Task: Pipeline goal and plan tracking

Status: done
Track: B
Track reason: workflow/process change to skill definitions and markdown structure — no new UI surface, no visual change

## Problem
The pipeline only models a flat list of `Task`s, each tracked via its own file and a `Status` field. There's no way to express that several tasks belong to one larger initiative (e.g. "launch onboarding flow" composed of 5 related tasks), and `product` doesn't produce any explicit up-front plan before routing work — it goes straight from intake + classification to handoff. For multi-task initiatives this makes it hard to see the big picture, sequence dependent tasks, or know when the initiative as a whole is done.

## Goal
`product` can group related tasks under a named `Goal`, and produces a short `Plan` (sequencing/dependencies) before routing the first task — so multi-task initiatives are coherent and trackable, while single, standalone tasks keep working exactly as they do now.

## Requirements
- Add an optional `Goal` concept: a markdown file (e.g. `.claude/tasks/goals/<goal-name>.md`) listing the goal's one-line description, its constituent task file paths, and overall status (in progress / done).
- During intake, `product` asks (or infers) whether a request is part of a larger initiative; if so, it creates or updates the relevant `Goal` file and links the new task file to it.
- Before routing the first task of a multi-task goal, `product` writes a brief `## Plan` section into the Goal file: the ordered list of tasks and why that order/dependency makes sense.
- When the last task under a goal reaches `Status: done`, `product` marks the Goal as done.
- Single, standalone requests (the common case) skip goal/plan creation entirely — no added ceremony for simple tasks.

## Constraints
- Must not change the existing `Status` pipeline (`intake → designing → implementing → reviewing → done`) for individual tasks — goals are an additional grouping layer, not a replacement.
- Keep the Goal file lightweight — a few lines, not a full project-management document.
- Must not break the existing `.current-task` single-pointer mechanism; `.current-task` continues to point at the task currently being worked, regardless of whether it belongs to a goal.

## Out of scope
- Visual/UI representation of goals or plans (e.g. a roadmap view)
- Automatic task generation from a goal description
- Cross-goal prioritization or scheduling

## Implementation Notes
- Files created/modified:
  - `.claude/skills/product/SKILL.md` (new top-level `## Goals — optional grouping layer` section documenting the Goal file format/template, the `.claude/tasks/goals/<goal-name>.md` convention, and when to create/update/close a goal; Step 1 now assesses whether a request is part of a multi-task initiative and routes to the Goals section when so; Step 2 now links the new task into its goal's `## Tasks` checklist; Step 3 now writes the goal's `## Plan` section before routing the first task of a brand-new goal; Step 4 now checks off the task in its goal and marks the goal `Status: done` once every task is checked; Rules section gained a line keeping goal usage optional)
  - `.claude/tasks/goals/` (new directory, with a `.gitkeep` placeholder so the convention path exists — no goal files created, per the task's instruction that none need to exist yet)
- Deviations from task requirements: none
- New design tokens used: none

## Completion Summary
Added an optional `Goal`/`Plan` grouping layer to the `product` skill: a lightweight Goal file format (`.claude/tasks/goals/<goal-name>.md`) with a `## Tasks` checklist and `## Plan` section, plus workflow hooks at intake (detect/confirm multi-task initiatives), task creation (link into the goal), first routing (write the plan), and close-out (check off tasks, mark goal done). The existing per-task `Status` pipeline and `.current-task` pointer remain unchanged. Confirmed done by the user on 2026-06-08.
