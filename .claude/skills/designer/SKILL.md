---
name: designer
description: Entry point for design work. Use when the user invokes /designer or asks for UI/UX design decisions, layout, component hierarchy, or CSS design specs. The design work itself runs in the `naamah` subagent.
---

# Designer

Design work is done by **Naamah**, the `naamah` subagent (`.claude/agents/naamah.md`), in her own context. This skill only routes to her — do not produce a Design Brief inline.

Normally you don't need this skill: `/product` spawns Naamah itself for every Track A task. It exists for when the user invokes `/designer` directly.

## When invoked directly by the user

1. Read `.claude/tasks/.current-task`.
2. **If it points to a valid task file:** spawn the `naamah` subagent (Agent tool, `subagent_type: "naamah"`) with that task file path. If the user named a specific gap ("we need a warning color"), pass that along as a gap-fill request.
   - If she returns `BLOCKED: <question>`, ask the user that question, record the answer in the task file, and spawn her again.
   - If she returns `DONE`, show the user her summary and tell them: "The Design Brief is in the task file. Run `/product` to continue the task."
3. **If there is no active task:** tell the user design work starts from a task — "Run `/product` and describe what you want to build; it will bring Naamah in if the task needs design." Don't design against an unwritten task.
