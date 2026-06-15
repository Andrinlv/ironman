// ============================================================
// Streckenkarte Thun — echte Karte (Leaflet + CARTO dark tiles)
// Routen angelehnt an IRONMAN Switzerland Thun (2019–2022):
// Schwimmen im Thunersee, Rad durch Gürbetal/Kiesental, Laufen an der Aare.
// ============================================================

const CM_START = [46.7464, 7.6334]; // Lachenareal / Strandbad Thun

const CM_ROUTES = {
  swim: {
    color: '#4fb8e6',
    coords: [
      [46.7464, 7.6334], [46.7448, 7.6356], [46.7424, 7.6400], [46.7402, 7.6448],
      [46.7392, 7.6488], [46.7370, 7.6470], [46.7382, 7.6420], [46.7404, 7.6368],
      [46.7430, 7.6322], [46.7452, 7.6310], [46.7464, 7.6334],
    ],
  },
  bike: {
    color: '#e9a83a',
    coords: [
      [46.7464, 7.6334], [46.7415, 7.6260], [46.7370, 7.6170], [46.7440, 7.5990],
      [46.7570, 7.5840], [46.7745, 7.5730], [46.7870, 7.5380], [46.7990, 7.5150],
      [46.8230, 7.4980], [46.8600, 7.4900], [46.8910, 7.4980], [46.8890, 7.5300],
      [46.8730, 7.5610], [46.8790, 7.6180], [46.8410, 7.6140], [46.8290, 7.6070],
      [46.8090, 7.6050], [46.7950, 7.6050], [46.7780, 7.6330], [46.7640, 7.6300],
      [46.7560, 7.6290], [46.7464, 7.6334],
    ],
  },
  run: {
    color: '#e8452e',
    coords: [
      [46.7464, 7.6334], [46.7478, 7.6300], [46.7500, 7.6285], [46.7530, 7.6290],
      [46.7570, 7.6280], [46.7620, 7.6250], [46.7660, 7.6225], [46.7705, 7.6190],
      [46.7720, 7.6170],
      [46.7705, 7.6190], [46.7660, 7.6225], [46.7620, 7.6250], [46.7570, 7.6280],
      [46.7530, 7.6290], [46.7500, 7.6285], [46.7478, 7.6300], [46.7464, 7.6334],
    ],
  },
};

const CM_INFO = {
  all: {
    title: 'Der Renntag auf einen Blick',
    rows: [
      ['Start & Ziel', 'Lachenareal, Thun'],
      ['Schwimmen', '1 Runde im Thunersee'],
      ['Rad', '2 Runden Gürbetal & Kiesental'],
      ['Laufen', '4 Runden entlang der Aare'],
      ['Cut-off', '16:00 h nach Start'],
    ],
    text: 'Streckenführung angelehnt an IRONMAN Switzerland Thun (2019–2022) — die 2030er-Routen übernehme ich, sobald sie publiziert sind. Alles spielt sich rund um Thun ab; deine Leute sehen dich auf jeder Runde.',
  },
  swim: {
    title: 'Schwimmen — Thunersee',
    rows: [
      ['Distanz', '3.8 km'],
      ['Runden', '1 · Rolling Start'],
      ['Wasser im Juli', '~19–21 °C'],
      ['Cut-off', '2:20 h'],
      ['Dein Ziel-Pace', '2:10 /100 m'],
    ],
    text: 'Start am Lachenareal, eine grosse Schlaufe im Thunersee. Im Juli meist Wetsuit-legal. Dein Engadin-Training zahlt sich doppelt aus: kaltes Wasser kennst du längst.',
  },
  bike: {
    title: 'Rad — Gürbetal & Kiesental',
    rows: [
      ['Distanz', '180 km'],
      ['Runden', '2'],
      ['Höhenmeter', '~1’800 m'],
      ['Verpflegung', 'alle ~20 km'],
      ['Dein Ziel-Schnitt', '26 km/h'],
    ],
    text: 'Von Thun durchs Gürbetal Richtung Belp, über Konolfingen und das Kiesental zurück — wellig, schnell, kein Bergmonster. Aber 1’800 Höhenmeter wollen klug eingeteilt sein: genau dafür ist dein 180-km-Test 2028 da.',
  },
  run: {
    title: 'Marathon — an der Aare',
    rows: [
      ['Distanz', '42.195 km'],
      ['Runden', '4 · flach'],
      ['Verpflegung', 'alle ~2 km'],
      ['Cut-off gesamt', '16:00 h'],
      ['Dein Ziel-Pace', '6:30 /km'],
    ],
    text: 'Vier flache Runden der Aare entlang Richtung Schwäbis und zurück — mental perfekt: kurze Abschnitte, viel Publikum, alle 2 km ein Verpflegungsstand. Dein Luzern-Pacing von 2026 ist hier der Anker.',
  },
};

// Höhenprofil Rad: Kontrollpunkte [km, m ü. M.] einer Runde, 2× wiederholt
const CM_ELEV_LAP = [[0, 560], [8, 645], [15, 705], [22, 640], [30, 600], [38, 690], [48, 860], [55, 900], [62, 760], [72, 645], [82, 585], [90, 560]];

function cmElevationPoints() {
  const pts = [];
  for (let lap = 0; lap < 2; lap++) {
    CM_ELEV_LAP.forEach(([km, m], i) => {
      if (lap === 1 && i === 0) return;
      pts.push([km + lap * 90, m]);
    });
  }
  return pts;
}

function ElevProfile() {
  const W = 860, H = 130, P = { l: 40, r: 10, t: 12, b: 22 };
  const pts = cmElevationPoints();
  const x = (km) => P.l + (km / 180) * (W - P.l - P.r);
  const y = (m) => H - P.b - ((m - 520) / (940 - 520)) * (H - P.t - P.b);
  const line = pts.map(([km, m], i) => (i === 0 ? 'M' : 'L') + x(km).toFixed(1) + ',' + y(m).toFixed(1)).join(' ');
  const area = line + ' L' + x(180) + ',' + y(520) + ' L' + x(0) + ',' + y(520) + ' Z';

  const [hov, setHov] = React.useState(null);
  const ref = React.useRef(null);
  const elevAt = (km) => {
    let prev = pts[0];
    for (const p of pts) {
      if (p[0] >= km) {
        const f = (km - prev[0]) / Math.max(p[0] - prev[0], 0.001);
        return prev[1] + (p[1] - prev[1]) * f;
      }
      prev = p;
    }
    return pts[pts.length - 1][1];
  };
  const fromClientX = (cx) => {
    const rect = ref.current.getBoundingClientRect();
    const px = ((cx - rect.left) / rect.width) * W;
    return Math.min(180, Math.max(0, ((px - P.l) / (W - P.l - P.r)) * 180));
  };

  return (
    <div className="cm-elev">
      <div className="cm-elev-head">
        <span>Höhenprofil Rad — 2 Runden</span>
        <span className="cm-elev-hm">~1’800 Hm total</span>
      </div>
      <svg ref={ref} viewBox={'0 0 ' + W + ' ' + H} style={{ width: '100%', height: 'auto', display: 'block', cursor: 'crosshair', touchAction: 'pan-y' }}
        onMouseMove={(e) => setHov(fromClientX(e.clientX))}
        onMouseLeave={() => setHov(null)}
        onTouchStart={(e) => setHov(fromClientX(e.touches[0].clientX))}
        onTouchMove={(e) => setHov(fromClientX(e.touches[0].clientX))}
        role="img" aria-label="Höhenprofil der Radstrecke, zwei Runden, zirka 1800 Höhenmeter">
        {[560, 740, 920].map((m) => (
          <g key={m}>
            <line x1={P.l} x2={W - P.r} y1={y(m)} y2={y(m)} stroke="rgba(255,255,255,0.07)" />
            <text x={P.l - 6} y={y(m) + 3} textAnchor="end" fill="var(--faint)" fontSize="9.5" fontFamily="var(--font-mono)">{m}</text>
          </g>
        ))}
        <line x1={x(90)} x2={x(90)} y1={P.t} y2={H - P.b} stroke="rgba(255,255,255,0.13)" strokeDasharray="3 4" />
        <text x={x(90) + 5} y={H - 8} textAnchor="start" fill="var(--faint)" fontSize="9.5" fontFamily="var(--font-mono)">Runde 2</text>
        <text x={x(0)} y={H - 8} textAnchor="start" fill="var(--faint)" fontSize="9.5" fontFamily="var(--font-mono)">km 0</text>
        <text x={x(180)} y={H - 8} textAnchor="end" fill="var(--faint)" fontSize="9.5" fontFamily="var(--font-mono)">km 180</text>
        <path d={area} fill="rgba(233,168,58,0.12)" />
        <path d={line} fill="none" stroke="var(--bike)" strokeWidth="2" strokeLinejoin="round" />
        {hov !== null ? (
          <g pointerEvents="none">
            <line x1={x(hov)} x2={x(hov)} y1={P.t} y2={H - P.b} stroke="rgba(255,255,255,0.3)" strokeDasharray="2 3" />
            <circle cx={x(hov)} cy={y(elevAt(hov))} r="4" fill="var(--bg)" stroke="var(--bike)" strokeWidth="2" />
            <g transform={'translate(' + (x(hov) > 700 ? x(hov) - 118 : x(hov) + 8) + ',' + P.t + ')'}>
              <rect width="110" height="20" rx="5" fill="#1c212a" stroke="rgba(255,255,255,0.16)" />
              <text x="8" y="14" fill="var(--text)" fontSize="10.5" fontFamily="var(--font-mono)">
                km {hov.toFixed(0)} · {elevAt(hov).toFixed(0)} m
              </text>
            </g>
          </g>
        ) : null}
      </svg>
    </div>
  );
}

function CourseMap() {
  const [focus, setFocus] = React.useState('all');
  const [mapFailed, setMapFailed] = React.useState(false);
  const mapElRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const linesRef = React.useRef({});

  // Karte einmalig aufbauen
  React.useEffect(() => {
    if (!window.L || !mapElRef.current) { setMapFailed(true); return; }
    const L = window.L;
    const map = L.map(mapElRef.current, {
      scrollWheelZoom: false,   // Seiten-Scroll nicht kapern
      attributionControl: true,
      zoomControl: true,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19,
    }).addTo(map);

    // Routen als "Strava-Linien": dunkle Outline + Farblinie
    Object.entries(CM_ROUTES).forEach(([id, r]) => {
      const casing = L.polyline(r.coords, { color: '#0c0e11', weight: 7, opacity: 0.85 }).addTo(map);
      const line = L.polyline(r.coords, { color: r.color, weight: 3.5, opacity: 0.95 }).addTo(map);
      linesRef.current[id] = { line, casing };
    });

    // Start/Ziel-Marker
    L.circleMarker(CM_START, {
      radius: 8, color: '#ffffff', weight: 2, fillColor: '#e8452e', fillOpacity: 1,
    }).addTo(map).bindTooltip('Start / Ziel — Lachenareal', { direction: 'top', offset: [0, -8] });

    map.fitBounds(linesRef.current.bike.line.getBounds(), { padding: [28, 28] });
    mapRef.current = map;

    // Container wird per Scroll-Reveal sichtbar → Grösse nachziehen
    const t = setTimeout(() => map.invalidateSize(), 900);
    return () => { clearTimeout(t); map.remove(); mapRef.current = null; };
  }, []);

  // Fokuswechsel: Routen dimmen + Ausschnitt anpassen
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    Object.entries(linesRef.current).forEach(([id, { line, casing }]) => {
      const lit = focus === 'all' || focus === id;
      line.setStyle({ opacity: lit ? 0.95 : 0.18, weight: lit ? 3.5 : 2.5 });
      casing.setStyle({ opacity: lit ? 0.85 : 0 });
      if (lit && focus !== 'all') line.bringToFront();
    });
    const target = focus === 'all' ? linesRef.current.bike : linesRef.current[focus];
    if (target) map.flyToBounds(target.line.getBounds(), { padding: [28, 28], duration: 0.8 });
  }, [focus]);

  const info = CM_INFO[focus];
  const tabs = [
    ['all', 'Alles', 'var(--text)'],
    ['swim', 'Schwimmen', 'var(--swim)'],
    ['bike', 'Rad', 'var(--bike)'],
    ['run', 'Laufen', 'var(--run)'],
  ];

  return (
    <section className="block" id="strecke" data-screen-label="Streckenkarte">
      <div className="wrap">
        <div className="sec-head" data-reveal="">
          <span className="sec-index">09 — Strecke</span>
          <h2>Der Kurs in Thun</h2>
          <p className="lede">
            Echte Karte, echte Gegend: Routen angelehnt an IRONMAN Switzerland Thun (2019–2022).
            Wähle eine Disziplin — die Karte fliegt zur Route.
          </p>
        </div>

        <div className="course-grid" data-reveal="">
          <div className="course-map-card">
            <div className="cm-tabs" role="tablist">
              {tabs.map(([id, lbl, col]) => (
                <button key={id} role="tab" aria-selected={focus === id}
                  className={'cm-tab' + (focus === id ? ' active' : '')}
                  style={{ '--ct': col }}
                  onClick={() => setFocus(id)}>{lbl}</button>
              ))}
            </div>

            {mapFailed ? (
              <div className="cm-map-fallback">
                Karte konnte nicht geladen werden (keine Verbindung zum Kartendienst).
                Die Strecken-Daten findest du rechts im Panel.
              </div>
            ) : (
              <div ref={mapElRef} className="cm-map" aria-label="Karte der Ironman-Strecken rund um Thun"></div>
            )}

            <ElevProfile />
          </div>

          <aside className="course-info" key={focus}>
            <h3>{info.title}</h3>
            {info.rows.map((r) => (
              <div className="ci-row" key={r[0]}>
                <span className="ci-k">{r[0]}</span>
                <span className="ci-v">{r[1]}</span>
              </div>
            ))}
            <p className="ci-text">{info.text}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CourseMap });
