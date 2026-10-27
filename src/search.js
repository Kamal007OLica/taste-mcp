// Small BM25 ranker. Documents are plain objects; `fields` maps field name to weight.
const STOP = new Set('a an and are as at be by for from in into is it of on or the to with my our your app site page build make need want that this'.split(' '));

export function tokens(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9#\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map((t) => (t.length > 4 && t.endsWith('s') && !t.endsWith('ss') ? t.slice(0, -1) : t));
}

const cache = new WeakMap();

function index(docs, fields) {
  const hit = cache.get(docs);
  if (hit && hit.fields === fields) return hit;
  const rows = docs.map((doc) => {
    const tf = new Map();
    let len = 0;
    for (const [field, weight] of Object.entries(fields)) {
      const value = Array.isArray(doc[field]) ? doc[field].join(' ') : doc[field];
      for (const t of tokens(value)) {
        tf.set(t, (tf.get(t) || 0) + weight);
        len += weight;
      }
    }
    return { tf, len };
  });
  const df = new Map();
  for (const { tf } of rows) for (const t of tf.keys()) df.set(t, (df.get(t) || 0) + 1);
  const avg = rows.reduce((n, r) => n + r.len, 0) / Math.max(rows.length, 1);
  const built = { fields, rows, df, avg };
  cache.set(docs, built);
  return built;
}

export function rank(docs, query, fields, limit = 5) {
  if (!docs?.length) return [];
  const { rows, df, avg } = index(docs, fields);
  const q = [...new Set(tokens(query))];
  const N = rows.length, k1 = 1.2, b = 0.75;
  return rows
    .map(({ tf, len }, i) => {
      let score = 0;
      for (const t of q) {
        const f = tf.get(t);
        if (!f) continue;
        const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
        score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * len) / avg)));
      }
      return { doc: docs[i], score };
    })
    .filter((r) => r.score > 0)
    .sort((a, z) => z.score - a.score)
    .slice(0, limit);
}
