// ============================================================
// Ernährung + Budget + Equipment
// ============================================================

function Nutrition() {
  const typeMeta = {
    gym: { chip: 'gym', color: 'var(--gym)' },
    key: { chip: 'run', color: 'var(--run)' },
    rest: { chip: 'rest', color: 'var(--rest)' },
    long: { chip: 'bike', color: 'var(--bike)' },
  };
  const todayIdx = (new Date().getDay() + 6) % 7; // Mo = 0
  const [sel, setSel] = React.useState(todayIdx);
  const d = window.NUTRITION[sel];
  const meta = typeMeta[d.type];
  const dayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

  return (
    <section className="block alt" id="ernaehrung" data-screen-label="Ernährungsplan">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">06 — Ernährung</span>
          <h2>Die Trainingswoche auf dem Teller</h2>
          <p className="lede">
            Ausgewogen, abwechslungsreich, alltagstauglich — periodisiert nach Trainingstag.
            Wähle einen Tag, um den Plan zu sehen.
          </p>
        </div>

        <div className="nut-principles" data-reveal-group="85">
          {window.NUT_PRINCIPLES.map((p, i) => (
            <div className="np" key={i}>
              <div className="v">{p.v} <small>{p.u}</small></div>
              <div className="k">{p.k}</div>
            </div>
          ))}
        </div>

        <div className="nut-days" role="tablist" aria-label="Wochentag wählen">
          {window.NUTRITION.map((day, i) => (
            <button
              key={day.day} role="tab" aria-selected={i === sel}
              className={'nut-day-btn' + (i === sel ? ' active' : '')}
              style={{ '--nd': typeMeta[day.type].color }}
              onClick={() => setSel(i)}
            >
              <span className="dn">{day.day}</span>
              <span className="dd"></span>
            </button>
          ))}
        </div>

        <div className="nut-detail">
          <div className="nut-detail-head">
            <span className="dayname">{dayNames[sel]}</span>
            <span className={'chip ' + meta.chip}>{d.label}</span>
            <span className="kcal">Tagesziel <b>~{d.kcal} kcal</b></span>
          </div>
          <div className="nut-meals">
            <div className="nut-meal"><div className="mn">Frühstück</div><div className="mv">{d.f}</div></div>
            <div className="nut-meal"><div className="mn">Mittag</div><div className="mv">{d.m}</div></div>
            <div className="nut-meal"><div className="mn">Abend</div><div className="mv">{d.a}</div></div>
            <div className="nut-meal"><div className="mn">Snack</div><div className="mv">{d.s}</div></div>
          </div>
        </div>
        <p className="nut-footnote">
          Die Struktur gilt für jede Woche: kcal-Rahmen und Muster (KH-Quelle + Protein + Gemüse) bleiben,
          die Gerichte rotieren saisonal. Richtwerte für ~75 kg — in Phase 3–4 an langen Tagen um 300–500 kcal erhöhen.
        </p>
      </div>
    </section>
  );
}

// ---------- Budget-Chart (SVG) ----------
function BudgetChart() {
  const W = 700, H = 300, P = { l: 52, r: 16, t: 16, b: 34 };
  const [hov, setHov] = React.useState(null);
  const svgRef = React.useRef(null);
  const months = [];
  let cum = 0;
  const rates = [400, 500, 600, 800];
  for (let i = 0; i < 48; i++) {
    cum += rates[Math.floor(i / 12)];
    months.push(cum);
  }
  const maxV = 28000;
  const x = (i) => P.l + (i / 47) * (W - P.l - P.r);
  const y = (v) => H - P.b - (v / maxV) * (H - P.t - P.b);

  const line = months.map((v, i) => (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
  const area = line + ' L' + x(47).toFixed(1) + ',' + y(0) + ' L' + x(0).toFixed(1) + ',' + y(0) + ' Z';
  const hitIdx = months.findIndex((v) => v >= 16000); // Monat, in dem 16'000 erreicht ist

  const yearLabels = ['Jul 26', 'Jul 27', 'Jul 28', 'Jul 29', 'Jun 30'];

  const M_NAMES = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  const monthLabel = (i) => M_NAMES[(6 + i) % 12] + ' ' + (2026 + Math.floor((6 + i) / 12));
  const fromClientX = (clientX) => {
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - P.l) / (W - P.l - P.r)) * 47);
    return Math.min(47, Math.max(0, i));
  };

  return (
    <svg ref={svgRef} viewBox={'0 0 ' + W + ' ' + H} style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'pan-y', cursor: 'crosshair' }} role="img"
      onMouseMove={(e) => setHov(fromClientX(e.clientX))}
      onMouseLeave={() => setHov(null)}
      onTouchStart={(e) => setHov(fromClientX(e.touches[0].clientX))}
      onTouchMove={(e) => setHov(fromClientX(e.touches[0].clientX))}
      aria-label="Sparverlauf Juli 2026 bis Juni 2030">
      {[0, 7000, 14000, 21000, 28000].map((v) => (
        <g key={v}>
          <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.07)" />
          <text x={P.l - 8} y={y(v) + 4} textAnchor="end" fill="var(--faint)" fontSize="10.5" fontFamily="var(--font-mono)">
            {(v / 1000) + 'k'}
          </text>
        </g>
      ))}
      {yearLabels.map((lbl, i) => (
        <text key={lbl} x={x(Math.min(i * 12, 47))} y={H - 12} textAnchor="middle" fill="var(--faint)"
          fontSize="10.5" fontFamily="var(--font-mono)">{lbl}</text>
      ))}
      <path d={area} fill="rgba(232,69,46,0.10)" />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {/* 16k Ziellinie */}
      <line x1={P.l} x2={W - P.r} y1={y(16000)} y2={y(16000)} stroke="var(--rest)" strokeWidth="1.5" strokeDasharray="5 5" />
      <text x={W - P.r} y={y(16000) - 7} textAnchor="end" fill="var(--rest)" fontSize="11" fontFamily="var(--font-mono)">
        Budget-Ziel 16’000 CHF
      </text>
      <circle cx={x(hitIdx)} cy={y(months[hitIdx])} r="5" fill="var(--rest)" />
      <text x={x(hitIdx) - 8} y={y(months[hitIdx]) - 10} textAnchor="end" fill="var(--rest)" fontSize="11" fontFamily="var(--font-mono)">
        erreicht ~März 2029
      </text>
      <circle cx={x(47)} cy={y(months[47])} r="5" fill="var(--accent)" />
      <text x={x(47) - 8} y={y(months[47]) + 4} textAnchor="end" fill="var(--text)" fontSize="12" fontWeight="600" fontFamily="var(--font-mono)">
        27’600 CHF
      </text>
      {hov !== null ? (
        <g pointerEvents="none">
          <line x1={x(hov)} x2={x(hov)} y1={P.t} y2={H - P.b} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
          <circle cx={x(hov)} cy={y(months[hov])} r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.5" />
          <g transform={'translate(' + (x(hov) > W - 150 ? x(hov) - 140 : x(hov) + 10) + ',' + Math.max(P.t + 2, y(months[hov]) - 44) + ')'}>
            <rect width="130" height="38" rx="7" fill="#1c212a" stroke="rgba(255,255,255,0.16)" />
            <text x="10" y="16" fill="var(--muted)" fontSize="10.5" fontFamily="var(--font-mono)">{monthLabel(hov)}</text>
            <text x="10" y="30" fill="var(--text)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-mono)">{months[hov].toLocaleString('de-CH')} CHF</text>
          </g>
        </g>
      ) : null}
    </svg>
  );
}

function Budget() {
  return (
    <section className="block" id="budget" data-screen-label="Budget">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">07 — Budget</span>
          <h2>Der Sparplan</h2>
          <p className="lede">
            Monatlich zur Seite legen, jedes Jahr etwas mehr. So ist das 16’000-CHF-Budget
            rund ein Jahr vor dem Rennen voll — und am Ende bleibt eine satte Reserve.
          </p>
        </div>
        <div className="budget-grid">
          <div className="chart-card">
            <h3>Sparverlauf bis Juni 2030</h3>
            <BudgetChart />
          </div>
          <div className="budget-side">
            <h3>Monatlich</h3>
            {window.BUDGET_YEARS.map((b, i) => (
              <div className="byear" key={i}>
                <span className="rng">{b.range}</span>
                <span className="amt">{b.monthly} <small>CHF/Mt</small></span>
                <span className="cum">kumuliert<b>{b.cum.toLocaleString('de-CH')} CHF</b></span>
              </div>
            ))}
            <div className="budget-callout">
              <b>+11’600 CHF Reserve</b> über dem Budget bis Juli 2030 — Polster für Defekte,
              Physio, Preiserhöhungen oder ein Trainingslager. Gym- und ÖV-Abo laufen separat weiter.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EquipGroup({ g, defaultOpen }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="eq-group" style={{ '--eg': g.color }}>
      <button className="eq-group-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <h3><span>{g.g}</span></h3>
        <span className="yr">{g.yr}</span>
        <span className="tot">{g.total.toLocaleString('de-CH')} CHF</span>
        <span className="rm-chev" style={{ transform: open ? 'rotate(180deg)' : 'none' }} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
      </button>
      {open ? (
        <div className="eq-items">
          {g.items.map((it, j) => (
            <div className="eq-item" key={j}>
              <span className="n">{it.n}{it.s ? <small>{it.s}</small> : null}</span>
              <span className="p">{it.p.toLocaleString('de-CH')} CHF</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Equipment() {
  const total = window.EQUIPMENT.reduce((a, g) => a + g.total, 0);
  return (
    <section className="block alt" id="equipment" data-screen-label="Equipment">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">08 — Equipment</span>
          <h2>Die Einkaufsliste</h2>
          <p className="lede">
            Komplett bei null gestartet — gekauft wird phasenweise, immer erst wenn die Disziplin dran ist.
            Öffne ein Paket für die Positionen.
          </p>
        </div>
        <div className="eq-summary" data-reveal-group="85">
          <div className="eq-sum-card">
            <div className="v">{total.toLocaleString('de-CH')} <small>CHF</small></div>
            <div className="k">Gesamtbudget, voll verplant</div>
          </div>
          <div className="eq-sum-card">
            <div className="v">5 <small>Pakete</small></div>
            <div className="k">je Phase ein Equipment-Paket</div>
          </div>
          <div className="eq-sum-card">
            <div className="v">0 <small>CHF</small></div>
            <div className="k">für Gym &amp; ÖV — Abos bereits vorhanden</div>
          </div>
        </div>
        <div className="eq-groups" data-reveal-group="110">
          {window.EQUIPMENT.map((g, i) => (
            <EquipGroup g={g} key={i} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nutrition, Budget, Equipment });
