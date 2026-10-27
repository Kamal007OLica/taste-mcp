(() => {
  const ENDPOINT = 'https://agent-taste.vercel.app/mcp';
  const kb = JSON.parse(document.getElementById('kb-data').textContent || '{}');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Install tabs
  const TABS = {
    claude: { cmd: `claude mcp add --scope user --transport http taste ${ENDPOINT}`, note: 'Run it once in your terminal. Every Claude Code session in every project then starts with the taste rules loaded. Drop --scope user to add it to the current project only.' },
    codex: { cmd: `# ~/.codex/config.toml\n[mcp_servers.taste]\nurl = "${ENDPOINT}"`, note: 'Add these lines to your Codex config and restart Codex.' },
    cursor: { cmd: `// ~/.cursor/mcp.json\n{\n  "mcpServers": {\n    "taste": { "url": "${ENDPOINT}" }\n  }\n}`, note: 'This file applies to every project. To scope it to one repo, put it at .cursor/mcp.json instead.' },
    desktop: { cmd: ENDPOINT, note: 'In the Claude desktop app or claude.ai, open Settings, then Connectors, then Add custom connector, and paste the link.' },
    vscode: { cmd: `code --add-mcp '{"name":"taste","type":"http","url":"${ENDPOINT}"}'`, note: 'Adds it to VS Code for agent mode.' },
    local: { cmd: 'claude mcp add --scope user taste -- npx -y github:Kamal007OLica/taste-mcp', note: 'Runs the same server on your machine over stdio. Everything works offline except brand references, which are fetched from GitHub.' },
  };
  const cmdText = $('#cmd-text');
  const cmdNote = $('#cmd-note');
  $$('.tabs [role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.tabs [role="tab"]').forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      const t = TABS[tab.dataset.tab];
      cmdText.textContent = t.cmd;
      cmdNote.textContent = t.note;
    });
  });

  // Copy buttons
  $$('.copy').forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      const text = $(btn.dataset.copy)?.textContent || '';
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
      } catch {
        const range = document.createRange();
        range.selectNodeContents($(btn.dataset.copy));
        getSelection().removeAllRanges();
        getSelection().addRange(range);
        btn.textContent = 'Selected';
      }
      btn.dataset.done = '';
      clearTimeout(btn._t);
      btn._t = setTimeout(() => { btn.textContent = label; delete btn.dataset.done; }, 1600);
    });
  });

  $$('.pane a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));

  // Real audit scores, computed at build time
  if (kb.audit) {
    $$('[data-score]').forEach((el) => { $('b', el).textContent = kb.audit[el.dataset.score]; });
  }

  // Direction rail restyles the "after" pane with real tokens from pick_direction
  const after = $('#after');
  const rail = $('#rail');
  const dirs = kb.directions || [];
  const dark = matchMedia('(prefers-color-scheme: dark)');
  const loaded = new Set();
  const family = (s) => String(s || '').split(/,|\s\+\s|\s\(|\s\d{3}\b/)[0].replace(/["']/g, '').trim();
  const weight = (s) => (String(s || '').match(/\b([1-9]00)\b/) || [, '400'])[1];
  const px = (s) => (String(s || '').match(/(\d+(?:\.\d+)?)px/) || [, '8'])[1];
  const isSystem = (f) => /^(system|sf pro|-apple|ui-|new york|helvetica|arial|georgia)/i.test(f);

  function loadFonts(d) {
    const q = d.type?.googleFonts;
    if (!q || loaded.has(q)) return;
    loaded.add(q);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${q.replace(/&display=swap$/, '')}&display=swap`;
    document.head.appendChild(link);
  }

  function apply(d) {
    const p = (dark.matches && d.palette?.dark) ? { ...d.palette, ...d.palette.dark } : d.palette || {};
    const set = (k, v) => v && after.style.setProperty(k, v);
    set('--d-bg', p.bg); set('--d-surface', p.surface); set('--d-text', p.text); set('--d-muted', p.muted);
    set('--d-border', p.border); set('--d-accent', p.accent); set('--d-accent-ink', p.accentInk || d.palette?.accentInk);
    const disp = family(d.type?.display), body = family(d.type?.body);
    set('--d-display', isSystem(disp) ? 'ui-sans-serif, system-ui, -apple-system, sans-serif' : `"${disp}", ui-serif, Georgia, serif`);
    set('--d-body', isSystem(body) ? 'ui-sans-serif, system-ui, -apple-system, sans-serif' : `"${body}", ui-sans-serif, system-ui, sans-serif`);
    $('.a-title', after).style.fontWeight = weight(d.type?.display);
    set('--d-radius', `${Math.min(Number(px(d.shape?.radius)), 14)}px`);
    loadFonts(d);
    $('#dir-name').textContent = d.name;
    $('.cap-dir').textContent = d.name;
    $('#dir-sig').textContent = `(${d.genre})`;
    $$('button', rail).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.id === d.id)));
  }

  if (dirs.length) {
    for (const d of dirs) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.dataset.id = d.id;
      const sw = document.createElement('span');
      sw.className = 'sw';
      sw.setAttribute('aria-hidden', 'true');
      for (const k of ['bg', 'surface', 'text', 'accent']) {
        const c = document.createElement('i');
        c.style.background = d.palette?.[k];
        sw.appendChild(c);
      }
      b.append(sw, document.createTextNode(d.name));
      b.addEventListener('click', () => apply(d));
      rail.appendChild(b);
    }
    rail.addEventListener('keydown', (e) => {
      const btns = $$('button', rail);
      const i = btns.indexOf(document.activeElement);
      if (i < 0 || !['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
      e.preventDefault();
      const n = btns[(i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length];
      n.focus();
      n.click();
    });
    const start = dirs.find((d) => d.id === kb.demoDirection) || dirs[0];
    apply(start);
    dark.addEventListener('change', () => apply(dirs.find((d) => d.id === $('[aria-checked="true"]', rail)?.dataset.id) || start));
  } else {
    $('.rail-wrap').hidden = true;
  }
})();
