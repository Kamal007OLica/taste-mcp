#!/bin/bash
# Deploys site/ as its own Vercel project (tasteagent.vercel.app), separate from the MCP endpoint.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
node "$ROOT/scripts/build-kb.mjs" > /dev/null
SNAP="$(mktemp -d)"
cp -R "$ROOT/site/." "$SNAP"/
cat > "$SNAP/vercel.json" <<'JSON'
{
  "framework": null,
  "buildCommand": "",
  "outputDirectory": ".",
  "headers": [
    { "source": "/(.*)\\.md", "headers": [{ "key": "content-type", "value": "text/markdown; charset=utf-8" }] },
    { "source": "/llms.txt", "headers": [{ "key": "content-type", "value": "text/plain; charset=utf-8" }] }
  ]
}
JSON
[ -d "$ROOT/.vercel-site" ] && cp -R "$ROOT/.vercel-site" "$SNAP/.vercel"
cd "$SNAP"
[ -d .vercel ] || vercel link --yes --project tasteagent --scope kamal007
vercel deploy --prod --yes --scope kamal007
rm -rf "$ROOT/.vercel-site" && cp -R .vercel "$ROOT/.vercel-site"
