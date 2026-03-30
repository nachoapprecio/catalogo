#!/usr/bin/env bash
set -euo pipefail

# Weekly helper: commit and push only country JSON updates.
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

BRANCH="${GITHUB_REF_NAME:-$(git rev-parse --abbrev-ref HEAD)}"
if [[ -z "$BRANCH" || "$BRANCH" == "HEAD" ]]; then
  BRANCH="$(git branch --show-current || true)"
fi
if [[ -z "$BRANCH" ]]; then
  BRANCH="main"
fi

STAMP="$(date +"%Y-%m-%d")"
COMMIT_MSG="chore(data): weekly giftcards json update ${STAMP}"

TARGETS=(
  "src/data/giftcards_chile.json"
  "src/data/giftcards_colombia.json"
  "src/data/giftcards_ecuador.json"
  "src/data/giftcards_mexico.json"
  "src/data/giftcards_peru.json"
  "hubspot-module/catalogo-module.css"
  "hubspot-module/catalogo-module.html"
  "hubspot-module/catalogo-module.js"
)

# Stage only known automation targets.
git add -A "${TARGETS[@]}"

if git diff --cached --quiet; then
  echo "No hay cambios en JSON por pais o modulo HubSpot para commitear."
  exit 0
fi

git commit -m "$COMMIT_MSG"
git push origin "$BRANCH"

echo "Commit y push completados en $BRANCH"
