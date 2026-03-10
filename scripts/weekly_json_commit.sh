#!/usr/bin/env bash
set -euo pipefail

# Weekly helper: commit and push only country JSON updates.
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
STAMP="$(date +"%Y-%m-%d")"
COMMIT_MSG="chore(data): weekly giftcards json update ${STAMP}"

TARGETS=(
  "src/data/giftcards_chile.json"
  "src/data/giftcards_colombia.json"
  "src/data/giftcards_ecuador.json"
  "src/data/giftcards_mexico.json"
  "src/data/giftcards_peru.json"
)

# Stage only the country JSON files.
git add "${TARGETS[@]}"

if git diff --cached --quiet; then
  echo "No hay cambios en JSON por pais para commitear."
  exit 0
fi

git commit -m "$COMMIT_MSG"
git push origin "$BRANCH"

echo "Commit y push completados en $BRANCH"
