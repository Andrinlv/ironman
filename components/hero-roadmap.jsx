// ============================================================
// Hero, Countdown, Roadmap, Pace-Rechner
// ============================================================

function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target - new Date());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    return { d, h, m, s };
  };
  const [t, setT] = React.useState(calc);
  React.useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useCountUp(target, decimals) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(target); return; }
    const t0 = performance.now(), dur = 1300;
    let raf;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setV(target * ease);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v.toFixed(decimals);
}

function HeroStat({ v, dec, unit, cls, k }) {
  const num = useCountUp(v, dec);
  return (
    <div className={'hstat ' + cls}>
      <div className="v">{num} {unit}</div>
      <div className="k">{k}</div>
    </div>
  );
}

function Hero() {
  const cd = useCountdown(window.RACE_DATE);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <header className="hero" id="top" data-screen-label="Hero">
      <div className="wrap">
        <p className="hero-kicker">Der Masterplan · 2026 → 2030</p>
        <div className="hero-grid">
          <div>
            <h1>Ironman<br />2030 <span className="thin">Thun</span></h1>
            <p className="hero-sub">
              Vier Jahre, vier Phasen, ein Ziel: 3.8 km durch den Thunersee schwimmen,
              180 km durchs Berner Oberland fahren und zum Abschluss einen Marathon laufen —
              an einem einzigen Tag.
            </p>
          </div>
          <div>
            <div className="countdown" aria-label="Countdown bis zum Rennen">
              <div className="cd-cell"><div className="cd-num">{cd.d}</div><div className="cd-lbl">Tage</div></div>
              <div className="cd-cell"><div className="cd-num">{pad(cd.h)}</div><div className="cd-lbl">Std</div></div>
              <div className="cd-cell"><div className="cd-num">{pad(cd.m)}</div><div className="cd-lbl">Min</div></div>
              <div className="cd-cell"><div className="cd-num">{pad(cd.s)}</div><div className="cd-lbl">Sek</div></div>
            </div>
            <p className="cd-note">bis ca. 14. Juli 2030 (Datum provisorisch)</p>
          </div>
        </div>
        <div className="hero-stats" data-reveal-group="110">
          <HeroStat v={3.8} dec={1} unit="km" cls="swim" k="Schwimmen · Thunersee" />
          <HeroStat v={180} dec={0} unit="km" cls="bike" k="Rad · Berner Oberland" />
          <HeroStat v={42.2} dec={1} unit="km" cls="run" k="Marathon · Thun" />
          <HeroStat v={226} dec={0} unit="km" cls="total" k="Total an einem Tag" />
        </div>
      </div>
      <div className="hero-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="hc-line"></span>
      </div>
    </header>
  );
}

function Chevron() {
  return (
    <span className="rm-chev" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </span>
  );
}

function RoadmapItem({ m, defaultOpen }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={'rm-item' + (m.final ? ' final' : '')} style={{ '--node': m.color }} data-reveal="">
      <div className="rm-when">
        <div className="yr">{m.yr}</div>
        <div className="mo">{m.mo}</div>
      </div>
      <div className="rm-spine"><div className="rm-node"></div></div>
      <div className={'rm-card' + (open ? ' open' : '')}>
        <button className="rm-head" onClick={() => setOpen(!open)} aria-expanded={open}>
          <div className="rm-head-main">
            <div className="rm-date-inline">{m.yr} · {m.mo}</div>
            <h3>{m.title}</h3>
            <div className="meta">
              {m.chips.map((c, j) => <span className={'chip ' + c[0]} key={j}>{c[1]}</span>)}
            </div>
          </div>
          <Chevron />
        </button>
        {open ? (
          <div className="rm-body">
            <p>{m.text}</p>
            <div className="rm-goals">
              {m.goals.map((g, j) => (
                <span className="rm-goal" key={j}>{g[0]}: <b>{g[1]}</b></span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Roadmap() {
  return (
    <section className="block" id="roadmap" data-screen-label="Roadmap">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">01 — Roadmap</span>
          <h2>Die Etappen bis Thun</h2>
          <p className="lede">
            Jedes Jahr eine neue Disziplin meistern — und die gelernten Paces nie wieder hergeben.
            Tippe auf eine Etappe für Details und Ziele.
          </p>
        </div>
        <div className="roadmap" data-reveal-group="130">
          {window.MILESTONES.map((m, i) => (
            <RoadmapItem m={m} key={i} defaultOpen={!!m.final} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Pace-Rechner ----------
function fmtH(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return h + ':' + String(m).padStart(2, '0');
}
function fmtPace(minPerUnit) {
  const m = Math.floor(minPerUnit);
  const s = Math.round((minPerUnit - m) * 60);
  return m + ':' + String(s).padStart(2, '0');
}

function PaceLab({ finish, setFinish }) {
  const transitions = 0.25; // 15 min Wechselzonen
  const active = finish - transitions;
  const swimH = active * 0.11;
  const bikeH = active * 0.53;
  const runH = active * 0.36;
  const swimPace = (swimH * 60) / 38;          // min pro 100 m
  const bikeSpeed = 180 / bikeH;               // km/h
  const runPace = (runH * 60) / 42.195;        // min pro km

  const cards = [
    { c: 'var(--swim)', lbl: 'Schwimmen · 3.8 km', big: fmtPace(swimPace), unit: '/100m', sub: 'Split ≈ ' + fmtH(swimH) + ' h · Cut-off 2:20 h' },
    { c: 'var(--bike)', lbl: 'Rad · 180 km', big: bikeSpeed.toFixed(1), unit: 'km/h', sub: 'Split ≈ ' + fmtH(bikeH) + ' h · dein Ziel: < 8 h' },
    { c: 'var(--run)', lbl: 'Marathon · 42.2 km', big: fmtPace(runPace), unit: '/km', sub: 'Split ≈ ' + fmtH(runH) + ' h' },
    { c: 'var(--gym)', lbl: 'Wechselzonen T1 + T2', big: '15', unit: 'min', sub: 'im Triathlon-Block ab 2028 geübt' },
  ];

  return (
    <section className="block alt" id="pace" data-screen-label="Pace-Ziele">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">02 — Pace-Ziele</span>
          <h2>Das Rennen rückwärts gerechnet</h2>
          <p className="lede">
            Aus der Ziel-Finishzeit ergeben sich die Paces, die in jeder Phase trainiert werden.
            Verschiebe den Regler und sieh, was jede Disziplin leisten muss.
          </p>
        </div>
        <div className="pace-grid">
          <div className="pace-ctrl">
            <h3>Ziel-Finishzeit</h3>
            <p className="hint">Cut-off in Thun: ~16 h. Geplant wird mit grossem Puffer.</p>
            <div className="pace-target">{fmtH(finish)}<small> h</small></div>
            <input
              type="range" className="pace-slider"
              min="11.5" max="15.5" step="0.25" value={finish}
              onChange={(e) => setFinish(parseFloat(e.target.value))}
              aria-label="Ziel-Finishzeit in Stunden"
            />
            <div className="pace-scale"><span>11:30</span><span>ambitioniert ← → sicher</span><span>15:30</span></div>
            <p className="pace-note">
              Aufteilung der aktiven Zeit: 11 % Schwimmen, 53 % Rad, 36 % Laufen
              (typische Verteilung für Erst-Finisher) plus 15 min Wechselzonen.
            </p>
          </div>
          <div className="pace-cards" data-reveal-group="90">
            {cards.map((c, i) => (
              <div className="pace-card" key={i} style={{ '--pc': c.c }}>
                <div className="lbl">{c.lbl}</div>
                <div className="big">{c.big}<small>{c.unit}</small></div>
                <div className="sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Roadmap, PaceLab, fmtH, fmtPace });
