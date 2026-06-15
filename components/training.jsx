// ============================================================
// Wochenplan (Phasen-Tabs) + Gym-Plan PUSH/PULL/LEG
// ============================================================

const TAG_LABELS = { swim: 'Swim', bike: 'Bike', run: 'Run', gym: 'Gym', rest: 'Rest' };

function WeeklyPlan() {
  const [active, setActive] = React.useState(0);
  const phase = window.PHASES[active];
  return (
    <section className="block alt" id="training" data-screen-label="Wochenplan">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">04 — Trainingswoche</span>
          <h2>Eine Woche, vier Jahreszeiten</h2>
          <p className="lede">
            Das Grundgerüst bleibt über alle vier Jahre gleich: 3× Gym (Mo/Mi/Fr),
            Donnerstag fixer Restday, Sonntag zweiter Restday. Nur der Ausdauer-Inhalt wechselt — wähle eine Phase.
          </p>
        </div>

        <div className="phase-tabs" role="tablist" data-reveal-group="70">
          {window.PHASES.map((p, i) => (
            <button
              key={p.id} role="tab" aria-selected={i === active}
              className={'phase-tab' + (i === active ? ' active' : '')}
              style={{ '--ph': p.color }}
              onClick={() => setActive(i)}
            >
              <div className="pt-num">{p.num}</div>
              <div className="pt-name">{p.name}</div>
              <div className="pt-range">{p.range}</div>
            </button>
          ))}
        </div>

        <div className="phase-focus" style={{ '--ph': phase.color }} dangerouslySetInnerHTML={{ __html: phase.focus }}></div>

        <div className="week" data-reveal-group="60">
          {phase.week.map((d, i) => (
            <div className={'day-card' + (d.rest ? ' restday' : '')} key={i}>
              <div className="dc-day">
                <span>{d.day}</span>
                {d.fixed ? <span className="dc-fix">FIX</span> : null}
              </div>
              {d.sessions.map((s, j) => (
                <div className="dc-sess" key={j}>
                  <span className={'chip ' + s.tag}>{TAG_LABELS[s.tag]}</span>
                  <div className="t">{s.t}</div>
                  <div className="d">{s.d}</div>
                  <div className="dur">{s.dur}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="week-foot">
          <div className="wf-item"><span className="sw" style={{ background: 'var(--gym)' }}></span>Gym — 3× pro Woche, fix</div>
          <div className="wf-item"><span className="sw" style={{ background: 'var(--swim)' }}></span>Schwimmen</div>
          <div className="wf-item"><span className="sw" style={{ background: 'var(--bike)' }}></span>Rad</div>
          <div className="wf-item"><span className="sw" style={{ background: 'var(--run)' }}></span>Laufen</div>
          <div className="wf-item"><span className="sw" style={{ background: 'var(--rest)' }}></span>Restday — min. 2× pro Woche (Do fix)</div>
        </div>
      </div>
    </section>
  );
}

const IS_NARROW = window.matchMedia('(max-width: 1060px)').matches;

function GymCol({ g, defaultOpen }) {
  const [open, setOpen] = React.useState(IS_NARROW ? defaultOpen : true);
  const collapsible = IS_NARROW;
  const Head = collapsible ? 'button' : 'div';
  return (
    <div className="gym-col" style={{ '--gc': g.color }}>
      <Head className="gym-col-head" onClick={collapsible ? () => setOpen(!open) : undefined}
        aria-expanded={collapsible ? open : undefined}>
        <div>
          <h3>{g.name}</h3>
          <div className="sub">{g.sub}</div>
        </div>
        {collapsible ? (
          <span className="rm-chev" style={{ transform: open ? 'rotate(180deg)' : 'none' }} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </span>
        ) : null}
      </Head>
      {open ? g.ex.map((e, i) => (
        <div className="gym-ex" key={i}>
          <div>
            <div className="nm">{e.n}</div>
            <div className="why">{e.w}</div>
          </div>
          <div className="sr">{e.s}</div>
        </div>
      )) : null}
    </div>
  );
}

function GymPlan() {
  return (
    <section className="block" id="gym" data-screen-label="Gym-Plan">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">05 — Krafttraining</span>
          <h2>Push · Pull · Leg</h2>
          <p className="lede">
            Drei feste Gym-Tage pro Woche — nicht für die Show, sondern als Verletzungsschutz
            und Kraftbasis für 226 km. Jede Übung hat einen Job im Triathlon.
          </p>
        </div>
        <div className="gym-grid" data-reveal-group="130">
          {window.GYM.map((g, i) => (
            <GymCol g={g} key={g.id} defaultOpen={i === 0} />
          ))}
        </div>
        <div className="gym-notes" data-reveal-group="90">
          {window.GYM_NOTES.map((n, i) => (
            <div className="gnote" key={i}><b>{n.t}</b>{n.d}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WeeklyPlan, GymPlan });
