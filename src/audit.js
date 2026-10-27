// Static taste audit: regex detectors from knowledge/detectors.json plus a few
// metric checks (palette, spacing, radius and type sprawl) computed over the code.
const WEIGHT = { high: 8, medium: 4, low: 2 };

function lineOf(code, offset) {
  let line = 1;
  for (let i = 0; i < offset && i < code.length; i++) if (code.charCodeAt(i) === 10) line++;
  return line;
}

function compile(det) {
  try {
    const flags = (det.flags || 'gi').includes('g') ? det.flags || 'gi' : `${det.flags}g`;
    return new RegExp(det.pattern, flags);
  } catch {
    return null;
  }
}

function distinct(code, re, map = (m) => m[1]) {
  const set = new Set();
  for (const m of code.matchAll(re)) set.add(map(m).toLowerCase().trim());
  return set;
}

function metrics(code) {
  const out = [];
  // Colours defined as custom properties are tokens, not sprawl; count raw usage only.
  const raw = code.replace(/--[\w-]+\s*:\s*[^;}\n]+/g, '');
  const hexes = distinct(raw, /#([0-9a-f]{6}|[0-9a-f]{3})\b/gi);
  const twColors = distinct(raw, /\b(?:bg|text|border|from|to|via|ring|fill|stroke)-((?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})\b/g);
  const colorCount = hexes.size + twColors.size;
  if (colorCount > 14) out.push({ id: 'palette-sprawl', area: 'color', severity: 'medium', title: 'Palette sprawl', count: colorCount,
    why: `${colorCount} distinct colours in one file; tasteful UIs run on a neutral ramp plus one accent.`,
    fix: 'Collapse to tokens: 1 neutral ramp (6-9 steps), 1 accent, semantic success/warn/error. Reference tokens, not raw values.' });

  const spacing = [...code.matchAll(/\b(?:margin|padding|gap|row-gap|column-gap|inset|top|left|right|bottom)(?:-[a-z]+)?\s*:\s*([^;}"']+)/gi)]
    .flatMap((m) => [...m[1].matchAll(/(\d+(?:\.\d+)?)px/g)].map((n) => Number(n[1])))
    .filter((n) => n > 2);
  const off = spacing.filter((n) => n % 4 !== 0);
  if (spacing.length >= 6 && off.length / spacing.length > 0.25) out.push({ id: 'off-grid-spacing', area: 'layout', severity: 'medium', title: 'Off-grid spacing', count: off.length,
    why: `${off.length} of ${spacing.length} spacing values are not on a 4px grid (${[...new Set(off)].slice(0, 6).join(', ')}px).`,
    fix: 'Use one scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Nudge every value onto it.' });

  const radii = distinct(code.replace(/border-radius\s*:\s*(?:calc\()?var\([^;}]+/gi, ''), /border-radius\s*:\s*([^;}"']+)/gi);
  const twRadii = distinct(code, /\brounded(?:-[a-z]{1,2})?-(none|sm|md|lg|xl|2xl|3xl|full|\[[^\]]+\])/g);
  const radiusCount = radii.size + twRadii.size;
  if (radiusCount > 4) out.push({ id: 'radius-sprawl', area: 'components', severity: 'low', title: 'Radius sprawl', count: radiusCount,
    why: `${radiusCount} different corner radii; shape language should feel like one family.`,
    fix: 'Pick 2-3 radii (e.g. 6px controls, 12px cards, full for pills) and nest them: inner radius = outer radius minus padding.' });

  const families = distinct(code, /font-family\s*:\s*['"]?([^,;'"}]+)/gi);
  if (families.size > 3) out.push({ id: 'font-sprawl', area: 'typography', severity: 'medium', title: 'Too many typefaces', count: families.size,
    why: `${families.size} font families (${[...families].slice(0, 5).join(', ')}).`,
    fix: 'One display face, one text face, optionally one mono. Express hierarchy with size and weight instead.' });

  const sizes = distinct(code, /font-size\s*:\s*([\d.]+(?:px|rem|em))/gi);
  const twSizes = distinct(code, /\btext-(xs|sm|base|lg|xl|[2-9]xl|\[[\d.]+(?:px|rem)\])\b/g);
  if (sizes.size + twSizes.size > 9) out.push({ id: 'type-scale-sprawl', area: 'typography', severity: 'low', title: 'No type scale', count: sizes.size + twSizes.size,
    why: `${sizes.size + twSizes.size} distinct font sizes; that reads as improvised.`,
    fix: 'Use a modular scale (1.2 for apps, 1.25 to 1.333 for marketing) with 6-8 steps.' });

  const zs = [...code.matchAll(/z-index\s*:\s*(\d+)|\bz-\[(\d+)\]/gi)].map((m) => Number(m[1] || m[2]));
  if (zs.some((z) => z >= 999)) out.push({ id: 'z-index-war', area: 'layout', severity: 'low', title: 'z-index arms race', count: zs.filter((z) => z >= 999).length,
    why: 'z-index 999+ means stacking is being fought, not designed.',
    fix: 'Define a small layer scale (base 0, raised 10, dropdown 20, sticky 30, overlay 40, modal 50, toast 60).' });

  const important = (code.match(/!important/g) || []).length;
  if (important > 5) out.push({ id: 'important-overuse', area: 'layout', severity: 'low', title: '!important overuse', count: important,
    why: `${important} !important declarations; the cascade is fighting itself.`, fix: 'Lower specificity at the source; use cascade layers (@layer) for overrides.' });
  return out;
}

// Regions wrapped in taste-ignore-start / taste-ignore-end (any comment syntax) are skipped,
// so docs and style guides can quote the patterns they ban.
const IGNORED = /taste-ignore-start[\s\S]*?taste-ignore-end/g;

export function audit(source, detectors) {
  const code = String(source).replace(IGNORED, (m) => m.replace(/[^\n]/g, ' '));
  const findings = [];
  for (const det of detectors) {
    const re = compile(det);
    if (!re) continue;
    const hits = [...code.matchAll(re)];
    if (hits.length < (det.minMatches || 1)) continue;
    findings.push({
      id: det.id, area: det.area, severity: det.severity, title: det.title, count: hits.length,
      lines: [...new Set(hits.slice(0, 4).map((h) => lineOf(code, h.index)))],
      sample: hits[0][0].slice(0, 80), why: det.why, fix: det.fix, source: det.source,
    });
  }
  findings.push(...metrics(code));
  const order = { high: 0, medium: 1, low: 2 };
  findings.sort((a, z) => order[a.severity] - order[z.severity] || z.count - a.count);
  const penalty = findings.reduce((n, f) => n + WEIGHT[f.severity] * Math.min(1 + Math.log2(f.count || 1), 3), 0);
  return { score: Math.max(0, Math.round(100 - penalty)), findings };
}
