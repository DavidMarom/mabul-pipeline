#!/bin/bash
# Stop hook — enforces Step 4 of the /product skill.
#
# A task is closed by renaming it to <name>.done.md. That close is only legitimate
# if the task file carries a `## Verification` checklist proving each requirement
# was confirmed against the diff. This hook blocks the turn when one doesn't.
#
# Tasks closed before the hook was installed are grandfathered: the first run
# drops a .verification-baseline marker, and only .done.md files newer than that
# marker are ever checked.

root="${CLAUDE_PROJECT_DIR:-$PWD}"
tasks="$root/.claude/tasks"
[ -d "$tasks" ] || exit 0

baseline="$tasks/.verification-baseline"
if [ ! -f "$baseline" ]; then
  touch "$baseline"
  exit 0
fi

missing=()
while IFS= read -r f; do
  [ -n "$f" ] || continue
  grep -q '^## Verification' "$f" || missing+=("$(basename "$f")")
done < <(find "$tasks" -maxdepth 1 -name '*.done.md' -newer "$baseline" 2>/dev/null)

[ ${#missing[@]} -gt 0 ] || exit 0

jq -nc --arg files "${missing[*]}" '{
  decision: "block",
  reason: ("Closed without a ## Verification section: \($files).\n\nStep 4 of the product skill is not optional: run the build, walk every line of the task ## Requirements against `git diff`, and append the ## Verification checklist to the task file. If a requirement is not met, reopen the task instead of closing it.")
}'
