# Learnings

> Living document. Cross-task knowledge that should outlive a single task file.
> Append short, skimmable bullet points only — deviations, pitfalls, and patterns worth reusing.
> Do not duplicate what belongs in `DESIGN_SYSTEM.md` (tokens/patterns) or in a task's own `## Implementation Notes` / `## Design Brief` (that task's history).

---

## Product

<!-- /product appends entries here when it learns something during intake, classification, or close-out that should inform future tasks. -->

## Design

<!-- /designer appends entries here: tokens that turned out wrong, patterns that worked well, recurring brief gaps. -->

## Development

- **CSS transform breaks position:fixed on children** — any parent with `transform` (including hover animations like `translateY`) creates a new stacking context, making `position: fixed` descendants scroll with the page instead of the viewport. Fix: render modals/overlays via `ReactDOM.createPortal(..., document.body)`. Guard with a `mounted` state to avoid SSR issues in Next.js App Router.
- **A bash script can rename its own working directory safely** — a running script's cwd tracks the directory's inode, not its path, so `cd .. && mv "$old_name" "$new_name" && cd "$new_name"` works mid-script without losing state. Guard against `mv` silently nesting the project if a sibling with the target name already exists (`[ -e "$parent_dir/$new_name" ]` before the move).
