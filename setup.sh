#!/bin/bash
set -e

# Drop the template's history — the clone becomes your own project from here.
rm -rf .git

npm install

git init -q
git add -A
git commit -qm "Initial commit — from Mabul Pipeline template"

echo ""
echo "Ready. Run 'npm run dev', then invoke /product to start your first task."
