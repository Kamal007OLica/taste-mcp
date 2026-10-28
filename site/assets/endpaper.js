// The page's backdrop: a marbled endpaper, drawn with the real marbling maths (Lu, Jaffer, Jin,
// Zhao & Mao, "Mathematical Marbling", IEEE CG&A 2012). Each ink drop pushes the earlier ink aside,
// a rake and a wave pull it into veins, and every pixel is traced back through those operations to
// the drop its ink came from, so the edges stay crisp at any size. Every visit floats a new sheet
// (add ?seed=N to the URL to float a particular one). Colour only falls where nothing is read:
// drops that would land under the text column or the nav float in paper tones instead.
(() => {
  const canvas = document.getElementById('endpaper');
  const fail = () => document.getElementById('endpaper-note')?.setAttribute('hidden', '');
  if (!canvas || !window.WebGL2RenderingContext) return fail();

  const kb = JSON.parse(document.getElementById('kb-data')?.textContent || '{}');
  const dirs = kb.directions || [];
  const dark = matchMedia('(prefers-color-scheme: dark)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const MAX = 480; // operations, two vec4 each: a 15 KB uniform block (WebGL2 guarantees 16 KB)

  // ---- GPU: one fragment shader traces each pixel back through the operations ----
  const VS = `#version 300 es
  void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`;
  const FS = `#version 300 es
  precision highp float;
  precision highp int;
  layout(std140) uniform Ops { vec4 uOp[${MAX * 2}]; };
  uniform int uCount;
  uniform int uSamples;
  uniform vec3 uInk[6];
  uniform vec3 uBath;
  uniform vec2 uRes;
  uniform float uDpr;
  out vec4 outColor;

  vec3 trace(vec2 p) {
    for (int i = uCount - 1; i >= 0; i--) {
      vec4 a = uOp[i * 2], b = uOp[i * 2 + 1];
      if (a.x < 0.5) {
        // Drop at b.xy, radius b.z, ink b.w. Inside it, this is its ink; outside, undo its push:
        // P = C + (P' - C) * sqrt(1 - r^2 / |P' - C|^2).
        vec2 d = p - b.xy;
        float d2 = dot(d, d), r2 = b.z * b.z;
        if (d2 < r2) return uInk[int(b.w + 0.5)];
        p = b.xy + d * sqrt(1.0 - r2 / d2);
      } else if (a.x < 1.5) {
        // Rake pulled along a.yz, tines every a.w px through b.xy, shift b.z, tine width b.w.
        vec2 m = a.yz;
        float d = dot(p - b.xy, vec2(-m.y, m.x));
        d -= a.w * floor(d / a.w + 0.5);
        p -= m * b.z * exp2(-d * d / (b.w * b.w));
      } else if (a.x < 2.5) {
        // Wave: shift along a.yz by b.x * sin(2 pi (p . n) / a.w + b.y).
        vec2 m = a.yz;
        p -= m * b.x * sin(6.2831853 * dot(p, vec2(-m.y, m.x)) / a.w + b.y);
      } else {
        // Stylus stroke at b.xy moving by a.yz with reach b.z, inverted by fixed-point iteration.
        vec2 d = p - b.xy;
        float k = -0.5 / (b.z * b.z);
        if (dot(d, d) * k > -12.0) {
          vec2 q = p;
          for (int j = 0; j < 4; j++) { vec2 e = q - b.xy; q = p - a.yz * exp(dot(e, e) * k); }
          p = q;
        }
      }
    }
    return uBath;
  }

  void main() {
    vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
    vec3 col;
    if (uSamples == 1) col = trace(px / uDpr);
    else if (uSamples == 2) col = 0.5 * (trace((px + vec2(-0.25, -0.25)) / uDpr) + trace((px + vec2(0.25, 0.25)) / uDpr));
    else col = 0.25 * (trace((px + vec2(-0.125, -0.375)) / uDpr) + trace((px + vec2(0.375, -0.125)) / uDpr)
                     + trace((px + vec2(0.125, 0.375)) / uDpr) + trace((px + vec2(-0.375, 0.125)) / uDpr));
    outColor = vec4(col, 1.0);
  }`;

  let gl = null, U = null;
  const buf = new Float32Array(MAX * 8);
  function init() {
    gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
    if (!gl) return false;
    const prog = gl.createProgram();
    for (const [type, src] of [[gl.VERTEX_SHADER, VS], [gl.FRAGMENT_SHADER, FS]]) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      gl.attachShader(prog, s);
    }
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);
    gl.bindVertexArray(gl.createVertexArray());
    U = Object.fromEntries(['uCount', 'uSamples', 'uInk', 'uBath', 'uRes', 'uDpr'].map((n) => [n, gl.getUniformLocation(prog, n)]));
    const ubo = gl.createBuffer();
    gl.bindBuffer(gl.UNIFORM_BUFFER, ubo);
    gl.bufferData(gl.UNIFORM_BUFFER, MAX * 32, gl.DYNAMIC_DRAW);
    gl.uniformBlockBinding(prog, gl.getUniformBlockIndex(prog, 'Ops'), 0);
    gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, ubo);
    return true;
  }
  if (!init()) return fail();

  // ---- Inks ----
  // Drop order: sand, clay, ink, accent, cream. Stone is the quieter clay that floats near text.
  const SAND = 0, CLAY = 1, INK = 2, ACCENT = 3, CREAM = 4, STONE = 5;
  const TASTE = {
    light: { bath: '#f2efe7', muted: '#5c584e', inks: ['#e3dccd', '#c9bfac', '#2a2620', '#b8391b', '#f8f5ee', '#d8d0c1'] },
    dark: { bath: '#121110', muted: '#a39e93', inks: ['#262420', '#3a3731', '#e6e1d6', '#e0603c', '#1b1a17', '#2b2925'] },
  };
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const mix = (a, b, t) => '#' + rgb(a).map((v, i) => Math.round((v + (rgb(b)[i] - v) * t) * 255).toString(16).padStart(2, '0')).join('');
  const lum = (h) => { const [r, g, b] = rgb(h).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  let dir = null; // null: this page's own inks; otherwise one of the 24 directions
  function palette() {
    const base = TASTE[dark.matches ? 'dark' : 'light'];
    if (!dir) return base;
    // The direction's rule, muted, text, accent and surface. The tones that float under text lean
    // toward this page's ground until the page's muted text still reads on them at 4.5:1.
    const p = (dark.matches && dir.palette.dark) || dir.palette;
    const calm = (h, t) => { let c = mix(h, base.bath, t); for (let k = t; contrast(c, base.muted) < 4.6 && k < 1; k += 0.05) c = mix(h, base.bath, k); return c; };
    return { ...base, inks: [calm(p.border, 0.35), mix(p.border, p.muted, 0.35), p.text, p.accent, calm(p.surface, 0.4), calm(p.border, 0.6)] };
  }
  function setInks() {
    const p = palette(), flat = new Float32Array(18);
    p.inks.forEach((h, i) => flat.set(rgb(h), i * 3));
    gl.uniform3fv(U.uInk, flat);
    gl.uniform3fv(U.uBath, rgb(p.bath));
  }

  // ---- The sheet: rounds of drops, then a rake down the page and a wave across it ----
  const RECIPE = {
    // [ink, share of the plate, drop radius, ink if it would land under text or the nav]
    rounds: [[SAND, 0.5, 90, SAND], [CLAY, 0.3, 70, STONE], [INK, 0.08, 40, STONE], [ACCENT, 0.16, 56, CREAM], [CREAM, 0.7, 100, CREAM]],
    rake: { spacing: 180, shift: 160, width: 40 },
    wave: { length: 520, amp: 40 },
    boost: 1.6, // extra density of the coloured rounds where they may stay coloured
    maxDrops: 200,
  };
  const mulberry = (a) => () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  let seed = Number(new URLSearchParams(location.search).get('seed')) || Math.floor(Math.random() * 1e6);
  let ops = [], buildEnd = 0, plateW = 0, plateH = 0, zone = { left: -Infinity, right: 0, top: 0 };

  function measure() {
    // The reading column, measured on the words themselves (a Range), since flex rows and
    // max-width blocks are wider than their text. Plus the band the nav sits in.
    let left = Infinity, right = 0;
    for (const q of ['.hero h1', '.lede', '.tabs', '.cmd-note', '.link-line', '.field-note', '.foot p']) {
      const el = document.querySelector(q);
      if (!el) continue;
      const range = document.createRange();
      range.selectNodeContents(el);
      const r = range.getBoundingClientRect();
      if (!r.width) continue;
      left = Math.min(left, r.left);
      right = Math.max(right, r.right);
    }
    const nav = document.querySelector('.top')?.getBoundingClientRect();
    zone = { left: left - 32 > 160 ? left - 32 : -Infinity, right: right + 32, top: nav ? nav.bottom + scrollY + 24 : 0 };
  }
  const quiet = (x, y) => y < zone.top || (x > zone.left && x < zone.right);

  function generate() {
    measure();
    // Leave at least 100 slots for stylus strokes; on very large screens, use fewer, larger drops.
    for (let budget = RECIPE.maxDrops; ; budget *= 0.85) if (lay(budget) <= MAX - 100) break;
    settleInks();
  }

  function lay(budget) {
    const R = mulberry(seed), W = plateW, H = plateH, { rake, wave } = RECIPE;
    const x0 = -80 - wave.amp, x1 = W + 80 + wave.amp, y0 = -80 - rake.shift, y1 = H + 80;
    const area = (x1 - x0) * (y1 - y0);
    const want = RECIPE.rounds.map(([, cover, r]) => (cover * area) / (Math.PI * r * r));
    const grow = Math.sqrt(Math.max(1, want.reduce((a, b) => a + b) / budget));
    const scatter = (g, xa, xb, ya, yb, out) => { for (let y = ya; y < yb; y += g) for (let x = xa; x < xb; x += g) out.push([x + R() * g, y + R() * g]); };
    ops = [];
    let at = 0;
    RECIPE.rounds.forEach(([ink, , r0, quietInk], k) => {
      const r = r0 * grow, g = Math.sqrt(area / Math.max(3, want[k] / (grow * grow)));
      const cells = [];
      scatter(g, x0, x1, y0, y1, cells);
      if (ink !== quietInk) {
        const g2 = g / Math.sqrt(RECIPE.boost);
        if (zone.right < W - 120) scatter(g2, zone.right - 40, x1, zone.top, y1, cells);
        if (zone.left > 160) scatter(g2, x0, zone.left + 40, zone.top, y1, cells);
      }
      for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
      cells.forEach(([x, y], i) => ops.push({ k: 0, x, y, r: r * (0.7 + 0.6 * R()), loud: ink, quietInk, ink, t0: at + (i / cells.length) * 260, dur: 620 }));
      at += 310;
    });
    ops.push({ k: 1, mx: 0, my: 1, ox: R() * rake.spacing, oy: 0, s: rake.spacing, z: rake.shift, c: rake.width, t0: at + 100, dur: 1000 });
    ops.push({ k: 2, mx: 1, my: 0, len: wave.length, amp: wave.amp, ph: R() * Math.PI * 2, t0: at + 600, dur: 1000 });
    buildEnd = at + 1700;
    return ops.length;
  }

  // Where a point ends up after operations from..end: the forward maps of the same operations.
  function forward(x, y, from) {
    for (let i = from; i < ops.length; i++) {
      const o = ops[i];
      if (o.k === 0) {
        const dx = x - o.x, dy = y - o.y, f = Math.sqrt(1 + (o.r * o.r) / (dx * dx + dy * dy || 1e-6));
        x = o.x + dx * f; y = o.y + dy * f;
      } else if (o.k === 1) {
        let d = (x - o.ox) * -o.my + (y - o.oy) * o.mx;
        d -= o.s * Math.floor(d / o.s + 0.5);
        const sh = o.z * Math.pow(2, -(d * d) / (o.c * o.c));
        x += o.mx * sh; y += o.my * sh;
      } else {
        const sh = o.amp * Math.sin((2 * Math.PI * (x * -o.my + y * o.mx)) / o.len + o.ph);
        x += o.mx * sh; y += o.my * sh;
      }
    }
    return [x, y];
  }

  // A coloured drop keeps its colour only if all of its ink, run forward through every later
  // operation, lands clear of the text column and the nav. Otherwise it floats a paper tone.
  function settleInks() {
    ops.forEach((o, i) => {
      if (o.k !== 0) return;
      o.ink = o.loud;
      if (o.loud === o.quietInk) return;
      let ok = !quiet(...forward(o.x, o.y, i + 1));
      for (let a = 0; ok && a < 24; a++) {
        const t = (a / 24) * Math.PI * 2;
        ok = !quiet(...forward(o.x + Math.cos(t) * o.r * 0.98, o.y + Math.sin(t) * o.r * 0.98, i + 1));
      }
      if (!ok) o.ink = o.quietInk;
    });
  }

  // ---- Stylus: the pointer combs the ink, which then settles back ----
  const SIGMA = 56, TAU = 900, GAIN = 1;
  let strokes = [], px = 0, py = 0, dx = 0, dy = 0, tracking = false;

  function pack(t, now) {
    let n = 0;
    const put = (a0, a1, a2, a3, b0, b1, b2, b3) => {
      const i = n++ * 8;
      buf[i] = a0; buf[i + 1] = a1; buf[i + 2] = a2; buf[i + 3] = a3; buf[i + 4] = b0; buf[i + 5] = b1; buf[i + 6] = b2; buf[i + 7] = b3;
    };
    const bloom = (x) => 1 - Math.pow(1 - x, 3);
    const pull = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);
    for (const o of ops) {
      if (o.t0 > t) break;
      const p = Math.min(1, (t - o.t0) / o.dur);
      if (o.k === 0) put(0, 0, 0, 0, o.x, o.y, o.r * bloom(p), o.ink);
      else if (o.k === 1) put(1, o.mx, o.my, o.s, o.ox, o.oy, o.z * pull(p), o.c);
      else put(2, o.mx, o.my, o.len, o.amp * pull(p), o.ph, 0, 0);
    }
    for (const s of strokes) {
      if (n >= MAX) break;
      const f = Math.exp(-(now - s.t0) / TAU);
      put(3, s.vx * f, s.vy * f, 0, s.x, s.y, SIGMA, 0);
    }
    return n;
  }

  // ---- Frames ----
  let W = 0, H = 0, dpr = 1, raf = 0, start = 0, ready = false;
  function size() {
    W = innerWidth; H = innerHeight;
    edged = !!sheet && sheet.getBoundingClientRect().width < document.documentElement.clientWidth - 1;
    // Cap the backing store near 6.5M pixels; past that, CSS scales the canvas up.
    const scale = Math.min(devicePixelRatio || 1, 2, Math.sqrt(6.5e6 / (W * H)));
    canvas.width = Math.round(W * scale); canvas.height = Math.round(H * scale);
    dpr = canvas.width / W;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uDpr, dpr);
    if (W > plateW || H > plateH) {
      const first = !plateW;
      plateW = W; plateH = H + 160;
      generate();
      if (!first) start = performance.now() - buildEnd; // after a resize, the new sheet shows finished
    }
  }

  function draw(t, now, live) {
    const n = pack(t, now);
    gl.bufferSubData(gl.UNIFORM_BUFFER, 0, buf, 0, n * 8);
    gl.uniform1i(U.uCount, n);
    // While moving, one sample per pixel on dense screens; once settled, antialias the edges.
    gl.uniform1i(U.uSamples, dpr >= 1.5 ? (live ? 1 : 2) : 4);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  // Draw only while the endpaper shows: above the first section, behind the footer, or down the
  // sheet's edges wherever the sheet is narrower than the window.
  const showing = new Set([document.body]); // assume it shows until the observer first reports
  const sheet = document.querySelector('.sheet');
  let edged = false;
  const shows = () => edged || showing.size > 0;
  function frame(now) {
    raf = 0;
    if (!ready) return;
    const t = reduce.matches ? Infinity : now - start;
    if (dx || dy) {
      // One stroke per frame, each small enough for the shader's inversion to stay within a pixel.
      const len = Math.hypot(dx, dy), f = GAIN * Math.min(1, (0.5 * SIGMA) / (len * GAIN));
      strokes.push({ x: px, y: py, vx: dx * f, vy: dy * f, t0: now });
      dx = dy = 0;
    }
    while (strokes.length && now - strokes[0].t0 > TAU * 4.6) strokes.shift();
    const room = Math.min(140, MAX - ops.length);
    if (strokes.length > room) strokes.splice(0, strokes.length - room);
    const live = t < buildEnd || strokes.length > 0;
    draw(t, now, live);
    canvas.classList.add('is-ready');
    if (live && shows()) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf && ready) raf = requestAnimationFrame(frame); };

  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || reduce.matches || !fine.matches || !shows()) { tracking = false; return; }
    const over = e.target instanceof Element && e.target.closest('.sheet, .install');
    if (tracking && !over) { dx += e.clientX - px; dy += e.clientY - py; }
    px = e.clientX; py = e.clientY; tracking = true;
    if (dx || dy) kick();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { tracking = false; });
  let resizeTimer = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!ready) return;
      size();
      cancelAnimationFrame(raf);
      frame(performance.now());
    }, 150);
  });
  dark.addEventListener('change', () => { setInks(); kick(); });
  reduce.addEventListener('change', kick);
  const watch = new IntersectionObserver((entries) => {
    showing.delete(document.body);
    for (const e of entries) e.isIntersecting ? showing.add(e.target) : showing.delete(e.target);
    kick();
  });
  document.querySelectorAll('.top, .hero, .foot').forEach((el) => watch.observe(el));

  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); ready = false; canvas.classList.remove('is-ready'); });
  canvas.addEventListener('webglcontextrestored', () => { if (init()) { setInks(); size(); ready = true; raf = 0; kick(); } });

  // ---- Marble it again, in another direction's inks ----
  const inksLabel = document.getElementById('endpaper-inks');
  const order = dirs.map((d) => [Math.random(), d]).sort((a, b) => a[0] - b[0]).map(([, d]) => d);
  let next = 0;
  document.getElementById('remarble')?.addEventListener('click', () => {
    if (!order.length || !ready) return;
    dir = order[next++ % order.length];
    canvas.classList.remove('is-ready');
    setTimeout(() => {
      seed = Math.floor(Math.random() * 1e6);
      strokes = [];
      generate();
      setInks();
      start = performance.now();
      if (inksLabel) inksLabel.textContent = `${dir.name}'s inks`;
      kick();
    }, reduce.matches ? 0 : 260);
  });

  setInks();
  // Measure the column in the real faces: wait for them briefly, and if they land later, re-measure
  // and re-settle which drops keep their colour.
  const note = document.getElementById('endpaper-note');
  const faces = Promise.all(['400 64px Gloock', '400 17px "Schibsted Grotesk"'].map((f) => document.fonts?.load(f).catch(() => {})));
  faces.then(() => {
    if (!ready) return;
    const was = zone.right;
    measure();
    if (Math.abs(zone.right - was) > 0.5) { settleInks(); kick(); }
  });
  Promise.race([faces, new Promise((r) => setTimeout(r, 900))]).then(() => {
    size();
    ready = true;
    start = performance.now();
    note?.removeAttribute('data-pending');
    kick();
  });
})();
