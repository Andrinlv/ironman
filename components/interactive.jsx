// ============================================================
// Interaktiv: Status-Board "Heute" + Renntag-Simulator
// ============================================================

const PLAN_START = new Date('2026-06-01T00:00:00');
const MS_DAY = 86400000;

const TICKS = [
  { d: new Date('2026-10-25'), label: 'Luzern' },
  { d: new Date('2027-07-03'), label: 'Engadin' },
  { d: new Date('2028-07-15'), label: '180 km' },
  { d: new Date('2029-06-15'), label: '70.3' },
];

function currentPhaseIndex(now) {
  if (now < new Date('2026-11-01')) return 0;
  if (now < new Date('2027-08-01')) return 1;
  if (now < new Date('2028-08-01')) return 2;
  return 3;
}

function isoWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / MS_DAY + 1) / 7);
  return d.getUTCFullYear() + '-W' + String(week).padStart(2, '0');
}

const CHECK_STORE = 'ironman2030-week-checks';
function loadStore(weekKey, sessionTotal) {
  let o = null;
  try { o = JSON.parse(localStorage.getItem(CHECK_STORE) || 'null'); } catch (e) { /* ignore */ }
  if (!o || typeof o !== 'object') o = { week: weekKey, checked: {}, total: sessionTotal, history: [] };
  if (!Array.isArray(o.history)) o.history = [];
  if (o.week !== weekKey) {
    // Wochenwechsel: alte Woche ins Archiv, neue Woche frisch starten
    if (o.week && o.checked) {
      const done = Object.values(o.checked).filter(Boolean).length;
      o.history.push({ week: o.week, done, total: o.total || sessionTotal });
      if (o.history.length > 250) o.history = o.history.slice(-250);
    }
    o.week = weekKey;
    o.checked = {};
    o.total = sessionTotal;
  }
  return o;
}
function saveStore(o) {
  try { localStorage.setItem(CHECK_STORE, JSON.stringify(o)); } catch (e) { /* ignore */ }
}

function ProgressRing({ done, total, color }) {
  const r = 25, c = 2 * Math.PI * r;
  const frac = total ? done / total : 0;
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" className="check-ring" aria-hidden="true">
      <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
      <circle cx="34" cy="34" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - frac)}
        transform="rotate(-90 34 34)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="34" y="39" textAnchor="middle" fill="var(--text)" fontSize="15"
        fontFamily="var(--font-display)">{done}/{total}</text>
    </svg>
  );
}

function StatusBoard() {
  const now = new Date();
  const total = Math.round((window.RACE_DATE - PLAN_START) / MS_DAY);
  const rawDay = Math.floor((now - PLAN_START) / MS_DAY) + 1;
  const started = rawDay >= 1;
  const day = Math.min(Math.max(rawDay, 0), total);
  const pct = Math.min(Math.max(((now - PLAN_START) / (window.RACE_DATE - PLAN_START)) * 100, 0), 100);

  const nextMs = [...TICKS, { d: window.RACE_DATE, label: 'IRONMAN Thun' }].find((t) => t.d > now);
  const daysToNext = nextMs ? Math.ceil((nextMs.d - now) / MS_DAY) : 0;

  const phaseIdx = currentPhaseIndex(now);
  const phase = window.PHASES[phaseIdx];

  // Wochen-Checkliste (persistent im Browser, mit Wochen-Archiv)
  const weekKey = isoWeekKey(now);
  const sessions = [];
  phase.week.forEach((d) => {
    d.sessions.forEach((s, j) => {
      if (s.tag !== 'rest') sessions.push({ id: d.day + '-' + j, day: d.day, t: s.t, tag: s.tag });
    });
  });
  const storeRef = React.useRef(null);
  if (!storeRef.current) storeRef.current = loadStore(weekKey, sessions.length);
  const [checked, setChecked] = React.useState(storeRef.current.checked);
  const doneCount = sessions.filter((s) => checked[s.id]).length;

  const toggle = (id) => {
    const next = Object.assign({}, checked, { [id]: !checked[id] });
    setChecked(next);
    const o = storeRef.current;
    o.checked = next;
    o.total = sessions.length;
    saveStore(o);
  };

  const hist = storeRef.current.history;
  const histComplete = hist.filter((h) => h.total && h.done >= h.total).length;
  let streak = doneCount === sessions.length ? 1 : 0;
  for (let i = hist.length - 1; i >= 0; i--) {
    if (hist[i].total && hist[i].done >= hist[i].total) streak++; else break;
  }

  return (
    <section className="block alt" id="status" data-screen-label="Heute">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">00 — Heute</span>
          <h2>Wo du gerade stehst</h2>
        </div>
        <div className="status-grid">

          <div className="prog-card" data-reveal="">
            <div className="prog-top">
              <div>
                <div className="prog-day">
                  {started ? <span>Tag <b>{day.toLocaleString('de-CH')}</b> von {total.toLocaleString('de-CH')}</span>
                    : <span>Start in <b>{Math.abs(rawDay - 1)}</b> Tagen</span>}
                </div>
                <div className="prog-phase">
                  <span className="chip neutral">{phase.num}</span>
                  <span className="prog-phase-name" style={{ color: phase.color }}>{phase.name}</span>
                </div>
              </div>
              <div className="prog-pct">{pct.toFixed(1)}<small>%</small></div>
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: pct + '%' }}></div>
              {TICKS.map((t, i) => {
                const p = ((t.d - PLAN_START) / (window.RACE_DATE - PLAN_START)) * 100;
                const past = t.d < now;
                return (
                  <div className={'prog-tick' + (past ? ' past' : '')} key={i} style={{ left: p + '%' }}>
                    <span className="pt-dot"></span>
                    <span className="pt-lbl">{t.label}</span>
                  </div>
                );
              })}
              <div className="prog-tick final" style={{ left: '100%' }}>
                <span className="pt-dot"></span>
                <span className="pt-lbl">THUN</span>
              </div>
            </div>
            {nextMs ? (
              <div className="prog-next">
                Nächster Meilenstein: <b>{nextMs.label}</b> in <b>{daysToNext}</b> Tagen
              </div>
            ) : null}
          </div>

          <div className="check-card" data-reveal="">
            <div className="check-head">
              <div>
                <h3>Diese Woche</h3>
                <p>{weekKey} · {phase.num} {phase.name} — Einheiten abhaken. Bleibt im Browser gespeichert, auch nach Neuladen; montags startet die neue Woche und die alte wandert ins Archiv.</p>
              </div>
              <ProgressRing done={doneCount} total={sessions.length} color={phase.color} />
            </div>
            <div className="check-list">
              {sessions.map((s) => (
                <button key={s.id} className={'check-item' + (checked[s.id] ? ' done' : '')}
                  onClick={() => toggle(s.id)} aria-pressed={!!checked[s.id]}>
                  <span className="check-box" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6.5l2.6 2.6L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                  <span className="check-day">{s.day}</span>
                  <span className="check-title">{s.t}</span>
                  <span className={'chip ' + s.tag}>{({ swim: 'Swim', bike: 'Bike', run: 'Run', gym: 'Gym' })[s.tag]}</span>
                </button>
              ))}
            </div>
            {doneCount === sessions.length ? (
              <div className="check-complete">Woche komplett. Donnerstag &amp; Sonntag: Füsse hoch.</div>
            ) : null}
            <div className="check-hist">
              {hist.length > 0 ? (
                <React.Fragment>
                  <span><b>{histComplete}</b> von <b>{hist.length}</b> Wochen komplett</span>
                  <span className="ch-sep">·</span>
                  <span>Serie: <b>{streak}</b> {streak === 1 ? 'Woche' : 'Wochen'}</span>
                </React.Fragment>
              ) : (
                <span>Woche 1 — ab nächstem Montag wächst hier dein Archiv.</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================
// Renntag-Simulator
// ============================================================

function fmtClock(h) {
  let hh = Math.floor(h);
  let mm = Math.round((h - hh) * 60);
  if (mm === 60) { hh += 1; mm = 0; }
  return String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
}

function buildSegments(finish) {
  const active = finish - 0.25;
  const swimH = active * 0.11, bikeH = active * 0.53, runH = active * 0.36;
  return [
    { id: 'swim', name: 'Schwimmen', loc: 'Thunersee', col: 'var(--swim)', dur: swimH, dist: 3.8, unitDec: 2 },
    { id: 't1', name: 'Wechselzone T1', loc: 'Strandbad Thun', col: 'rgba(255,255,255,0.28)', dur: 0.125, dist: 0, unitDec: 0 },
    { id: 'bike', name: 'Radfahren', loc: 'Berner Oberland', col: 'var(--bike)', dur: bikeH, dist: 180, unitDec: 0 },
    { id: 't2', name: 'Wechselzone T2', loc: 'Wechselzone Thun', col: 'rgba(255,255,255,0.28)', dur: 0.125, dist: 0, unitDec: 0 },
    { id: 'run', name: 'Marathon', loc: 'Laufstrecke an der Aare', col: 'var(--run)', dur: runH, dist: 42.195, unitDec: 1 },
  ];
}

function segMessage(seg, hoursIn) {
  if (!seg) return '';
  if (seg.id === 'swim') return 'Ruhig anschwimmen, eigene Linie finden. Alle 6 Züge kurz orientieren — der Puls entscheidet den Tag.';
  if (seg.id === 't1') return 'Neo ab, Helm an, nichts hetzen. Die 7 Minuten sind eingeplant — wer in T1 sprintet, bezahlt auf dem Rad.';
  if (seg.id === 'bike') {
    const nr = Math.floor((hoursIn * 60) / 25) + 1;
    return 'Jetzt wird gegessen: 60–90 g Kohlenhydrate pro Stunde, trinken alle 15 Minuten. Du bist bei Verpflegung Nr. ' + nr + '. Watt deckeln — der Marathon kommt noch.';
  }
  if (seg.id === 't2') return 'Rad abgeben, Laufschuhe an, Cap auf. Kurz durchatmen — jetzt beginnt der Teil, für den du 2026 angefangen hast.';
  const nr = Math.floor((hoursIn * 60) / 40) + 1;
  return 'Geduld. Die ersten 10 km bewusst langsamer als das Gefühl will. Gel Nr. ' + nr + ' alle 40 Minuten. Ab km 30 übernimmt der Kopf.';
}

function RaceSim({ finish }) {
  const segs = buildSegments(finish);
  const [elapsed, setElapsed] = React.useState(() => Math.min(4.5, finish - 0.1));
  React.useEffect(() => {
    setElapsed((e) => Math.min(e, finish));
  }, [finish]);

  // aktuelle Position bestimmen
  let acc = 0, cur = null, fracIn = 0, hoursIn = 0, totalKm = 0;
  const finished = elapsed >= finish - 0.001;
  for (const s of segs) {
    if (!finished && elapsed < acc + s.dur) {
      cur = s; hoursIn = elapsed - acc; fracIn = hoursIn / s.dur;
      totalKm += s.dist * fracIn;
      break;
    }
    acc += s.dur;
    totalKm += s.dist;
  }
  if (finished) { totalKm = 226; }

  const distIn = cur ? cur.dist * fracIn : 0;
  const pctDone = Math.min((elapsed / finish) * 100, 100);

  return (
    <section className="block" id="renntag" data-screen-label="Renntag-Simulator">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">03 — Renntag</span>
          <h2>Simulation: Der Tag in Thun</h2>
          <p className="lede">
            Spul durch deinen Renntag — Start 07:00 Uhr, Ziel-Finishzeit {fmtH(finish)} h
            (stell sie oben im Pace-Rechner ein). Wo bist du um 14 Uhr? Was solltest du gerade essen?
          </p>
        </div>

        <div className="sim-card" data-reveal="">
          <div className="sim-top">
            <div className="sim-clock">
              <div className="sc-lbl">Uhrzeit</div>
              <div className="sc-val">{fmtClock(7 + Math.min(elapsed, finish))}</div>
            </div>
            <div className="sim-stats">
              <div className="sim-stat">
                <div className="ss-k">Disziplin</div>
                <div className="ss-v" style={{ color: finished ? 'var(--accent)' : (cur ? cur.col : 'var(--text)') }}>
                  {finished ? 'ZIEL' : cur.name}
                </div>
                <div className="ss-s">{finished ? 'Lachenareal, Thun' : cur.loc}</div>
              </div>
              <div className="sim-stat">
                <div className="ss-k">In der Disziplin</div>
                <div className="ss-v">
                  {finished ? '—' : (cur.dist ? distIn.toFixed(cur.unitDec) + ' / ' + cur.dist.toLocaleString('de-CH') + ' km' : fmtClock(0 + hoursIn).slice(3) + ' min')}
                </div>
                <div className="ss-s">{finished ? 'alles geschafft' : (cur.dist ? Math.round(fracIn * 100) + ' % der Strecke' : 'Wechsel läuft')}</div>
              </div>
              <div className="sim-stat">
                <div className="ss-k">Total zurückgelegt</div>
                <div className="ss-v">{totalKm.toFixed(0)} / 226 km</div>
                <div className="ss-s">{pctDone.toFixed(0)} % des Rennens</div>
              </div>
            </div>
          </div>

          <div className="sim-trackwrap">
            <div className="sim-track">
              {segs.map((s) => (
                <div key={s.id}
                  className={'sim-seg' + (cur && cur.id === s.id && !finished ? ' active' : '')}
                  style={{ width: (s.dur / finish) * 100 + '%', background: s.col }}
                  title={s.name}></div>
              ))}
              <div className="sim-dot" style={{ left: pctDone + '%' }}></div>
            </div>
            <div className="sim-times"><span>07:00 Start</span><span>{fmtClock(7 + finish)} Ziel</span></div>
          </div>

          <input type="range" className="pace-slider sim-slider"
            min="0" max={finish} step="0.05" value={elapsed}
            onChange={(e) => setElapsed(parseFloat(e.target.value))}
            aria-label="Verstrichene Rennzeit" />

          <div className="sim-msg" style={{ '--sm': finished ? 'var(--accent)' : (cur ? cur.col : 'var(--accent)') }}>
            {finished
              ? 'Ziellinie. Vier Jahre Plan, ein Satz: You are an IRONMAN.'
              : segMessage(cur, hoursIn)}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { StatusBoard, RaceSim });
