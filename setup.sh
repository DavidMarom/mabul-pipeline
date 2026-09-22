#!/bin/bash
set -e

# Drop the template's history — the clone becomes your own project from here.
rm -rf .git

current_dir="$(pwd)"
current_name="$(basename "$current_dir")"
parent_dir="$(dirname "$current_dir")"

read -p "Name this project's folder (leave blank to keep '$current_name'): " project_name

if [ -n "$project_name" ] && [ "$project_name" != "$current_name" ]; then
  if [[ "$project_name" == */* ]]; then
    echo "Folder name can't contain '/' — keeping '$current_name'."
  elif [ -e "$parent_dir/$project_name" ]; then
    echo "'$parent_dir/$project_name' already exists — keeping '$current_name'."
  else
    cd "$parent_dir"
    mv "$current_name" "$project_name"
    cd "$project_name"
    current_name="$project_name"
    current_dir="$parent_dir/$project_name"
  fi
fi

npm install

git init -q
git add -A
git commit -qm "Initial commit — from Mabul Pipeline template"

echo ""
echo "Ready. Your project is at $current_dir — run 'npm run dev', then invoke /product to start your first task."
