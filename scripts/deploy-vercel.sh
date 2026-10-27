#!/bin/bash
# Deploys the MCP endpoint from a git-free snapshot (Vercel rejects commits by non-team authors).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SNAP="$(mktemp -d)"
cp -R "$ROOT"/{api,src,bin,scripts,knowledge,data,public,site,package.json,package-lock.json,vercel.json} "$SNAP"/
[ -d "$ROOT/.vercel" ] && cp -R "$ROOT/.vercel" "$SNAP"/
cd "$SNAP"
[ -d .vercel ] || vercel link --yes --project agent-taste --scope kamal007
vercel deploy --prod --yes --scope kamal007
cp -R .vercel "$ROOT"/
