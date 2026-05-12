// app.js — Renders dynamic sections, handles theme/menu/modals/checklist
(function() {
  const D = window.IRONMAN_DATA;
  if (!D) { console.error('Data missing'); return; }

  // ---------- THEME ----------
  const root = document.documentElement;
  const saved = localStorage.getItem('im2030_theme');
  if (saved) root.setAttribute('data-theme', saved);
  const themeBtn = document.getElementById('themeBtn');
  function setThemeIcon() {
    const isLight = root.getAttribute('data-theme') === 'light';
    themeBtn.innerHTML = isLight
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><span>DARK</span>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg><span>LIGHT</span>';
  }
  themeBtn.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('im2030_theme', next);
    setThemeIcon();
  });
  setThemeIcon();

  // ---------- MOBILE MENU ----------
  const menuBtn = document.getElementById('menuBtn');
  const menuClose = document.getElementById('menuClose');
  const menuSheet = document.getElementById('menuSheet');
  menuBtn.addEventListener('click', () => menuSheet.classList.add('open'));
  menuClose.addEventListener('click', () => menuSheet.classList.remove('open'));
  menuSheet.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menuSheet.classList.remove('open')));

  // ---------- COUNTDOWN ----------
  const target = new Date(D.target.date).getTime();
  function updateCD() {
    const now = Date.now();
    const diff = target - now;
    const days = Math.floor(diff / 86400000);
    const months = Math.floor(days / 30.44);
    const years = (days / 365.25).toFixed(2);
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('cdDays', days.toLocaleString('de-CH'));
    set('cdMonths', months);
    set('cdYears', years);
  }
  updateCD();
  setInterval(updateCD, 60000);

  // ---------- PHASES ----------
  const phasesGrid = document.getElementById('phasesGrid');
  D.phases.forEach(p => {
    const card = document.createElement('div');
    card.className = 'phase-card';
    card.style.setProperty('--phase-color', p.color);
    card.innerHTML = `
      <div class="ph-no">PHASE ${p.no}</div>
      <div class="ph-name">${p.name}</div>
      <div class="ph-date">${p.date}</div>
      <div class="ph-desc">${p.desc}</div>
    `;
    card.addEventListener('click', () => openPhase(p));
    phasesGrid.appendChild(card);
  });

  // ---------- MODAL ----------
  const modalBack = document.getElementById('modalBack');
  const modal = document.getElementById('modal');
  modalBack.addEventListener('click', (e) => { if (e.target === modalBack) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  function openPhase(p) {
    modal.style.setProperty('--phase-color', p.color);
    modal.innerHTML = `
      <button class="modal-close" id="mc2">✕</button>
      <div class="eyebrow" style="color:${p.color}">PHASE ${p.no} · ${p.date}</div>
      <h2>${p.name}</h2>
      <p style="margin-top:14px;max-width:60ch">${p.focus}</p>
      <div class="race-stats">
        ${p.stats.map(s => `<div class="s"><div class="l">${s.l}</div><div class="v">${s.v}</div></div>`).join('')}
      </div>
      <h3>Trainings-Blöcke</h3>
      <div class="block-list">
        ${p.blocks.map(b => `
          <div class="block-row">
            <div class="wk">${b.wk}</div>
            <div>
              <div class="name">${b.name}</div>
              <div class="desc">${b.desc}</div>
            </div>
            <div class="dur">${b.dur}</div>
          </div>
        `).join('')}
      </div>
    `;
    document.getElementById('mc2').addEventListener('click', closeModal);
    modalBack.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalBack.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ---------- WEEK GRID ----------
  const weekGrid = document.getElementById('weekGrid');
  const days = ['MONTAG', 'DIENSTAG', 'MITTWOCH', 'DONNERSTAG', 'FREITAG', 'SAMSTAG', 'SONNTAG'];
  const slots = [
    { l: '06:00', s: 6 }, { l: '08:00', s: 8 }, { l: '10:00', s: 10 },
    { l: '12:00', s: 12 }, { l: '14:00', s: 14 }, { l: '16:00', s: 16 },
    { l: '18:00', s: 18 }, { l: '20:00', s: 20 }
  ];

  weekGrid.innerHTML = '';
  // Header
  weekGrid.appendChild(cellEl('time-h', ''));
  days.forEach((d, i) => {
    const h = cellEl('day-h', d);
    if (i === 3 || i === 6) h.classList.add('rest');
    weekGrid.appendChild(h);
  });

  // Time rows
  // Build a map: day → list of events with start/end times
  const events = [
    // Mo
    { day: 0, start: 7.5, end: 17, kind: 'work', name: 'OFFICE', title: 'Arbeit' },
    { day: 0, start: 18, end: 19.5, kind: 'push', name: '18:00', title: 'PUSH' },
    // Di
    { day: 1, start: 7.5, end: 17, kind: 'work', name: 'OFFICE', title: 'Arbeit' },
    { day: 1, start: 18, end: 19.5, kind: 'run', name: '18:00', title: 'RUN Z2' },
    // Mi
    { day: 2, start: 7.5, end: 17, kind: 'work', name: 'OFFICE', title: 'Arbeit' },
    { day: 2, start: 18, end: 19.5, kind: 'pull', name: '18:00', title: 'PULL' },
    // Do REST
    { day: 3, start: 7.5, end: 17, kind: 'work', name: 'OFFICE', title: 'Arbeit' },
    { day: 3, start: 18, end: 19, kind: 'rest', name: 'REST', title: 'Mobility' },
    // Fr
    { day: 4, start: 7.5, end: 17, kind: 'work', name: 'OFFICE', title: 'Arbeit' },
    { day: 4, start: 18, end: 19.5, kind: 'leg', name: '18:00', title: 'LEGS' },
    // Sa
    { day: 5, start: 8, end: 11.5, kind: 'long', name: '08:00', title: 'LONG' },
    { day: 5, start: 16, end: 17, kind: 'swim', name: '16:00', title: 'SWIM' },
    // So REST
    { day: 6, start: 9, end: 10, kind: 'rest', name: 'REST', title: 'Recovery' }
  ];

  for (let row = 0; row < slots.length; row++) {
    const s = slots[row];
    weekGrid.appendChild(cellEl('time-h', s.l));
    for (let d = 0; d < 7; d++) {
      const cell = cellEl('cell', '');
      const ev = events.find(e => e.day === d && Math.floor(e.start) === s.s);
      if (ev) {
        const dur = ev.end - ev.start;
        // approximate height: each slot is 2 hours; clamp
        const heightSlots = Math.max(1, Math.ceil(dur / 2));
        const blk = document.createElement('div');
        blk.className = 'blk ' + ev.kind;
        blk.style.height = `calc(${heightSlots * 100}% - 8px)`;
        blk.innerHTML = `<div class="t-name">${ev.name}</div><div class="t-title">${ev.title}</div>`;
        cell.appendChild(blk);
      }
      weekGrid.appendChild(cell);
    }
  }

  function cellEl(cls, txt) {
    const e = document.createElement('div');
    e.className = cls; e.textContent = txt; return e;
  }

  // ---------- SPLITS ----------
  const splitsGrid = document.getElementById('splitsGrid');
  D.splits.forEach(sp => {
    const card = document.createElement('div');
    card.className = 'split-card';
    card.style.setProperty('--split-color', sp.color);
    card.innerHTML = `
      <div class="split-mark"></div>
      <h3>${sp.title}</h3>
      <div class="sub">${sp.sub}</div>
      <ol>
        ${sp.ex.map(e => `<li><strong>${e.n}</strong><small>${e.s}</small></li>`).join('')}
      </ol>
    `;
    splitsGrid.appendChild(card);
  });

  // ---------- NUTRITION ----------
  // Macro bars
  const macroBars = document.getElementById('macroBars');
  const macros = [
    { k: 'Kohlenhydrate', v: D.macros.carbs, color: '#ff6a2c' },
    { k: 'Protein', v: D.macros.protein, color: '#38c4ff' },
    { k: 'Fett', v: D.macros.fat, color: '#f5d442' }
  ];
  macroBars.innerHTML = macros.map(m => `
    <div class="macro-row">
      <div class="lbl"><span>${m.k}</span><span>${m.v}%</span></div>
      <div class="bar"><div class="fill" style="width:${m.v}%;background:${m.color}"></div></div>
    </div>
  `).join('');

  // Meal tabs
  const mealTabs = document.getElementById('mealTabs');
  const mealList = document.getElementById('mealList');
  const tabs = Object.keys(D.meals);
  tabs.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'meal-tab' + (i === 0 ? ' active' : '');
    btn.textContent = t;
    btn.addEventListener('click', () => {
      [...mealTabs.children].forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMeals(t);
    });
    mealTabs.appendChild(btn);
  });
  function renderMeals(t) {
    mealList.innerHTML = D.meals[t].map(m => `
      <div class="meal-row">
        <div class="when">${m.when}</div>
        <div class="what">${m.what}</div>
        <div class="kcal">${m.kcal} kcal</div>
      </div>
    `).join('');
  }
  renderMeals(tabs[0]);

  // ---------- BUDGET ----------
  const totalCost = D.equipment.reduce((a, b) => a + b.cost, 0);
  const totalSavings = D.savings.reduce((a, s) => a + s.monthly * s.months, 0);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('totalCost', 'CHF ' + totalCost.toLocaleString('de-CH'));
  set('totalSavings', 'CHF ' + totalSavings.toLocaleString('de-CH'));
  set('budgetCap', 'CHF 16\u2019000');
  set('savingsBuffer', 'CHF ' + (totalSavings - 16000).toLocaleString('de-CH'));

  // Bar chart of savings per period
  const barChart = document.getElementById('barChart');
  const maxVal = Math.max(...D.savings.map(s => s.monthly * s.months));
  barChart.innerHTML = D.savings.map(s => {
    const v = s.monthly * s.months;
    const h = Math.round(v / maxVal * 92);
    return `
      <div class="bar-col">
        <div class="bar" style="height:${h}%" data-v="CHF ${v.toLocaleString('de-CH')}"></div>
        <div class="yr">${s.period.split(' ')[0]}</div>
      </div>
    `;
  }).join('');

  // ---------- EQUIPMENT ----------
  const equipList = document.getElementById('equipList');
  const stored = JSON.parse(localStorage.getItem('im2030_equip') || '{}');
  equipList.innerHTML = D.equipment.map((e, i) => `
    <div class="equip-row ${stored[i] ? 'done' : ''}" data-i="${i}">
      <div class="item">${e.name}<small>${e.note}</small></div>
      <div class="tag">${e.tag}</div>
      <div class="cost">CHF ${e.cost.toLocaleString('de-CH')}</div>
      <input type="checkbox" ${stored[i] ? 'checked' : ''}/>
    </div>
  `).join('');
  equipList.addEventListener('change', (e) => {
    if (e.target.matches('input[type=checkbox]')) {
      const row = e.target.closest('.equip-row');
      const i = row.dataset.i;
      stored[i] = e.target.checked;
      localStorage.setItem('im2030_equip', JSON.stringify(stored));
      row.classList.toggle('done', e.target.checked);
      updateAcquiredCount();
    }
  });
  function updateAcquiredCount() {
    const count = Object.values(stored).filter(Boolean).length;
    set('acquiredCount', count + '/' + D.equipment.length);
  }
  updateAcquiredCount();

  // ---------- PRINCIPLES ----------
  const principles = document.getElementById('principles');
  principles.innerHTML = D.principles.map(p => `
    <div class="pcard">
      <div class="n">${p.n}</div>
      <h4>${p.t}</h4>
      <p>${p.d}</p>
    </div>
  `).join('');

  // ---------- REVEAL ON SCROLL ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- ACTIVE NAV ----------
  const navLinks = document.querySelectorAll('.nav-pill a');
  const sections = ['#mission', '#phases', '#week', '#training', '#nutrition', '#budget'];
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(id => { const el = document.querySelector(id); if (el) navIO.observe(el); });

})();
