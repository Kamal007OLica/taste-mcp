// The page's backdrop: a drafting grid whose cells bloom into the accents of the
// 24 directions near the pointer, leave a fading trail, and drift with scroll.
(() => {
  const canvas = document.getElementById('field');
  const kb = JSON.parse(document.getElementById('kb-data')?.textContent || '{}');
  const dirs = kb.directions || [];
  if (!canvas || !dirs.length || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const dark = matchMedia('(prefers-color-scheme: dark)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const CELL = 28, RADIUS = 230, DRIFT = 0.22;

  let W = 0, H = 0, cols = 0, rows = 0, energy = new Float32Array(0), accents = [], mark = '';
  let px = -1e4, py = -1e4, lastMove = 0, raf = 0, prev = 0, wave = null, nextWave = performance.now() + 2500;

  // Stable pseudo-random per world cell, so colours stay put as the grid drifts.
  const hash = (i, j) => {
    let h = Math.imul(i, 374761393) + Math.imul(j, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return (h ^ (h >>> 16)) >>> 0;
  };

  function theme() {
    accents = dirs.map((d) => (dark.matches && d.palette?.dark?.accent) || d.palette?.accent).filter(Boolean);
    mark = getComputedStyle(document.documentElement).getPropertyValue('--field-mark').trim() || 'rgba(0,0,0,.12)';
  }

  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / CELL) + 2; rows = Math.ceil(H / CELL) + 2;
    energy = new Float32Array(cols * rows);
    frame();
  }

  function inject(x, y, radius, strength, shift) {
    const i0 = Math.max(0, Math.floor((x - radius) / CELL)), i1 = Math.min(cols - 1, Math.ceil((x + radius) / CELL));
    const j0 = Math.max(0, Math.floor((y + shift - radius) / CELL)), j1 = Math.min(rows - 1, Math.ceil((y + shift + radius) / CELL));
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const d = Math.hypot(i * CELL + CELL / 2 - x, j * CELL - shift - y);
        if (d >= radius) continue;
        const v = (1 - d / radius) ** 2 * strength, k = j * cols + i;
        if (v > energy[k]) energy[k] = v;
      }
    }
  }

  function draw(off, base) {
    ctx.clearRect(0, 0, W, H);
    const shift = off % CELL;
    for (let j = 0; j < rows; j++) {
      const y = j * CELL - shift;
      for (let i = 0; i < cols; i++) {
        const x = i * CELL + CELL / 2, k = j * cols + i;
        const h = hash(i, j + base);
        const rest = h % 43 === 0 ? 0.22 : 0;
        const e = Math.max(energy[k], rest);
        if (e < 0.05) {
          ctx.fillStyle = mark;
          ctx.fillRect(x - 2.5, y - 0.5, 5, 1);
          ctx.fillRect(x - 0.5, y - 2.5, 1, 5);
          continue;
        }
        const s = 2 + 11 * e;
        ctx.globalAlpha = Math.min(1, 0.25 + e * 0.75);
        ctx.fillStyle = accents[h % accents.length];
        ctx.beginPath();
        ctx.roundRect(x - s / 2, y - s / 2, s, s, s * 0.28);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  function frame(t = performance.now()) {
    raf = 0;
    const dt = Math.min(64, t - (prev || t)); prev = t;
    const off = scrollY * DRIFT, base = Math.floor(off / CELL), shift = off % CELL;
    let alive = false;
    if (!reduce.matches) {
      const decay = Math.pow(0.945, dt / 16.7);
      for (let k = 0; k < energy.length; k++) {
        if (!energy[k]) continue;
        energy[k] = energy[k] > 0.01 ? energy[k] * decay : 0;
        alive = true;
      }
      if (px > -1e3) inject(px, py, RADIUS, 1, shift);
      // Idle: a soft diagonal sweep every few seconds, so touch screens see the field breathe.
      if (!wave && t > nextWave && t - lastMove > 4000 && !document.hidden) wave = { t0: t };
      if (wave) {
        const p = (t - wave.t0) / 5200;
        if (p >= 1) { wave = null; nextWave = t + 7000; }
        else {
          const line = -H * 0.6 + p * (W + H * 1.2);
          for (let y = -CELL; y < H + CELL; y += CELL * 2) inject(line - y * 0.6, y, 120, 0.45, shift);
        }
        alive = true;
      }
    }
    draw(off, base);
    if (alive || px > -1e3) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; lastMove = performance.now(); kick(); }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { px = py = -1e4; kick(); });
  addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') { px = py = -1e4; kick(); } }, { passive: true });
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', size);
  dark.addEventListener('change', () => { theme(); kick(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
  setInterval(() => { if (!document.hidden && !reduce.matches) kick(); }, 2500);

  theme();
  size();
})();
