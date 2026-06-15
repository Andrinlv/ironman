// ============================================================
// IRONMAN 2030 THUN — Plan-Daten
// ============================================================

window.RACE_DATE = new Date('2030-07-14T07:00:00+02:00'); // provisorisch, Mitte Juli 2030

// ---------- Roadmap / Meilensteine ----------
window.MILESTONES = [
  {
    yr: '2026', mo: 'OKT', color: 'var(--run)',
    title: 'SwissCityMarathon Luzern',
    chips: [['run', 'Laufen']],
    text: 'Erster grosser Meilenstein: 42.195 km. Fokus ausschliesslich aufs Laufen — saubere Technik, Kadenz ~175–180, Grundlagenausdauer und einen Pace, den du über 4+ Stunden halten kannst. Aufbau ab Juni 2026 über 18 Wochen.',
    goals: [['Zielzeit', '4:15–4:30 h'], ['Race-Pace', '6:10–6:25 /km'], ['Longest Run', '32 km']],
  },
  {
    yr: '2027', mo: 'JUL', color: 'var(--swim)',
    title: 'ÖTILLÖ Swimrun Engadin · World Series',
    chips: [['swim', 'Schwimmen'], ['run', 'Laufen']],
    text: 'World-Series-Distanz in Silvaplana: rund 43 km — ca. 37 km Trail-Running und 6 km Schwimmen in 10–14 °C kalten Bergseen auf 1\u2019800 m Höhe. Fokus: Kraul-Technik, Open-Water-Routine, Wechsel Schwimmen↔Laufen — und dabei deinen Marathon-Pace halten.',
    goals: [['Schwimm-Pace', '2:10–2:20 /100m'], ['Run-Pace flach', '6:15 /km'], ['Kaltwasser', 'ab 12 °C trainiert']],
  },
  {
    yr: '2028', mo: 'JUL', color: 'var(--bike)',
    title: '180 km Rad < 8 Stunden',
    chips: [['bike', 'Rad']],
    text: 'Eigener Test auf der Original-Ironman-Distanz: 180 km in unter 8 h (Ø ≥ 22.5 km/h, Ziel Ø 26 km/h). Aufbau ab Herbst 2027 mit Smart-Trainer im Winter und langen Ausfahrten ab Frühling. Schwimm- und Lauf-Pace werden parallel mit je 1 Einheit/Woche erhalten.',
    goals: [['Distanz', '180 km'], ['Zeit', '< 8:00 h'], ['Ziel-Schnitt', '26 km/h']],
  },
  {
    yr: '2028–30', mo: 'AUG–JUN', color: 'var(--gym)',
    title: '6 Triathlons — Sprint bis Halbdistanz',
    chips: [['swim', 'Swim'], ['bike', 'Bike'], ['run', 'Run']],
    text: 'Sechs Wettkämpfe mit steigender Distanz, um Wechselzonen, Renn-Nutrition und Pacing über alle drei Disziplinen zu automatisieren: 1× Sprint, 2× Olympisch, 3× Halbdistanz (70.3) — die letzte als Generalprobe ca. 6 Wochen vor Thun.',
    goals: [['#1 Sprint', 'Aug 2028'], ['#2–3 Olympisch', 'Sep 28 / Mai 29'], ['#4–5 Halbdistanz', 'Jun / Sep 29'], ['#6 Generalprobe 70.3', 'Mai/Jun 30']],
  },
  {
    yr: '2030', mo: 'JUL', color: 'var(--accent)', final: true,
    title: 'IRONMAN Thun',
    chips: [['swim', '3.8 km'], ['bike', '180 km'], ['run', '42.2 km']],
    text: 'Der Tag, auf den vier Jahre hinarbeiten: Schwimmen im Thunersee, Radfahren im Berner Oberland, Marathon zum Schluss. Ziel: kontrolliert finishen — mit grossem Puffer auf den Cut-off.',
    goals: [['Ziel-Finish', '≈ 13:00 h'], ['Puffer Cut-off', '> 3 h'], ['Status', 'FINISHER']],
  },
];

// ---------- Trainingsphasen + Wochenpläne ----------
// Regeln: min. 3× Gym/Woche · Donnerstag fixer Restday · min. 2 Restdays · So Restday
window.PHASES = [
  {
    id: 'run', num: 'Phase 1', name: 'Laufen', range: 'Jun 2026 – Okt 2026', color: 'var(--run)',
    focus: '<b>Marathon-Aufbau Luzern.</b> 3 Laufeinheiten pro Woche (Intervalle, lockerer Lauf, Long Run) plus 3× Gym als Verletzungsschutz. Der Long Run wächst alle 2 Wochen um 2 km (12 → 32 km), jede 4. Woche ist eine Entlastungswoche mit −30 % Umfang. Die letzten 3 Wochen vor dem Marathon: Tapering.',
    week: [
      { day: 'MO', sessions: [{ tag: 'gym', t: 'Gym — PUSH', d: 'Komplettes Push-Programm + 10\u2019 Rumpf', dur: '60–75 min' }] },
      { day: 'DI', sessions: [{ tag: 'run', t: 'Intervalle', d: '6–10 × 800 m @ 5:30/km, Trabpause 400 m. Kadenz-Fokus 175–180', dur: '50–60 min' }] },
      { day: 'MI', sessions: [{ tag: 'gym', t: 'Gym — PULL', d: 'Komplettes Pull-Programm', dur: '60 min' }, { tag: 'run', t: 'Easy Run (abends)', d: '6–8 km locker @ 6:45–7:00/km, Nasenatmung', dur: '40–50 min' }] },
      { day: 'DO', rest: true, fixed: true, sessions: [{ tag: 'rest', t: 'Restday', d: 'Fixer Ruhetag. Spazieren, dehnen, früh schlafen', dur: '—' }] },
      { day: 'FR', sessions: [{ tag: 'gym', t: 'Gym — LEG', d: 'Komplettes Leg-Programm + Lauf-ABC (Skippings, Anfersen)', dur: '70 min' }] },
      { day: 'SA', sessions: [{ tag: 'run', t: 'Long Run', d: '12 → 32 km @ 6:30–6:50/km. Ab 20 km: Verpflegung üben (Gel alle 40\u2019)', dur: '1:20–3:30 h' }] },
      { day: 'SO', rest: true, sessions: [{ tag: 'rest', t: 'Restday', d: 'Regeneration nach dem Long Run. Beine hoch', dur: '—' }] },
    ],
  },
  {
    id: 'swim', num: 'Phase 2', name: 'Schwimmen', range: 'Nov 2026 – Jul 2027', color: 'var(--swim)',
    focus: '<b>ÖTILLÖ Engadin Aufbau.</b> Von der Technik zur Strecke: bis Februar reiner Kraul-Technikblock (Wasserlage, Atmung 3er-Zug, Catch), danach Umfänge bis 3 km am Stück. Ab Mai Open-Water im See inkl. Kaltwasser-Gewöhnung und Swimrun-Kombis im Wetsuit mit Schuhen. Laufform wird mit 2 Einheiten gehalten — der Marathon-Pace bleibt.',
    week: [
      { day: 'MO', sessions: [{ tag: 'gym', t: 'Gym — PUSH', d: 'Komplettes Push-Programm', dur: '60 min' }] },
      { day: 'DI', sessions: [{ tag: 'swim', t: 'Schwimmen — Technik', d: 'Drills: Abschlagschwimmen, Faust, Wasserlage. 1.5–2.5 km total', dur: '60 min' }] },
      { day: 'MI', sessions: [{ tag: 'gym', t: 'Gym — PULL', d: 'Komplettes Pull-Programm (Latissimus = Schwimm-Motor)', dur: '60 min' }, { tag: 'run', t: 'Easy Run (abends)', d: '8–10 km @ 6:45/km — Marathon-Form erhalten', dur: '50–60 min' }] },
      { day: 'DO', rest: true, fixed: true, sessions: [{ tag: 'rest', t: 'Restday', d: 'Fixer Ruhetag', dur: '—' }] },
      { day: 'FR', sessions: [{ tag: 'gym', t: 'Gym — LEG', d: 'Komplettes Leg-Programm', dur: '60 min' }, { tag: 'swim', t: 'Schwimmen — Intervalle', d: '10–16 × 100 m @ Ziel-Pace 2:10/100m, Pause 20\u2019\u2019', dur: '45 min' }] },
      { day: 'SA', sessions: [{ tag: 'swim', t: 'Swimrun-Kombi / Long Session', d: 'Winter: 3 km Schwimmen am Stück. Ab Mai: Run-Swim-Run im See (bis 25 km / 4 km)', dur: '1:00–3:00 h' }] },
      { day: 'SO', rest: true, sessions: [{ tag: 'rest', t: 'Restday', d: 'Sauna/Mobility. Vor Engadin: Höhenwanderungen als Aktiv-Erholung', dur: '—' }] },
    ],
  },
  {
    id: 'bike', num: 'Phase 3', name: 'Rad', range: 'Aug 2027 – Jul 2028', color: 'var(--bike)',
    focus: '<b>180 km unter 8 h.</b> Winter auf dem Smart-Trainer (Sweet-Spot-Intervalle, FTP-Aufbau), ab Frühling lange Ausfahrten draussen: 60 → 100 → 140 → 180 km, alle 3 Wochen ein Sprung. Aero-Position, Trittfrequenz 85–95 und Essen auf dem Rad (60–90 g KH/h) werden von Anfang an mittrainiert. Schwimmen und Laufen je 1× pro Woche zum Pace-Erhalt.',
    week: [
      { day: 'MO', sessions: [{ tag: 'gym', t: 'Gym — PUSH', d: 'Komplettes Push-Programm', dur: '60 min' }, { tag: 'swim', t: 'Schwimmen (abends)', d: '2 km Erhalt @ 2:10/100m', dur: '45 min' }] },
      { day: 'DI', sessions: [{ tag: 'bike', t: 'Rad — Intervalle', d: 'Smart-Trainer: 3 × 12\u2019 Sweet Spot (88–93 % FTP), Kadenz 90', dur: '60–75 min' }] },
      { day: 'MI', sessions: [{ tag: 'gym', t: 'Gym — PULL', d: 'Komplettes Pull-Programm', dur: '60 min' }, { tag: 'run', t: 'Easy Run (abends)', d: '8–10 km @ 6:45/km — Pace-Erhalt', dur: '50 min' }] },
      { day: 'DO', rest: true, fixed: true, sessions: [{ tag: 'rest', t: 'Restday', d: 'Fixer Ruhetag', dur: '—' }] },
      { day: 'FR', sessions: [{ tag: 'gym', t: 'Gym — LEG', d: 'Komplettes Leg-Programm (Kraftbasis fürs Rad)', dur: '70 min' }] },
      { day: 'SA', sessions: [{ tag: 'bike', t: 'Long Ride', d: '60 → 180 km @ Ziel-Schnitt 26 km/h. Verpflegung: 60–90 g KH/h, trinken alle 15\u2019', dur: '2:30–7:30 h' }] },
      { day: 'SO', rest: true, sessions: [{ tag: 'rest', t: 'Restday', d: 'Nach Long Rides heilig. Beine hoch, Foam Rolling', dur: '—' }] },
    ],
  },
  {
    id: 'tri', num: 'Phase 4', name: 'Triathlon', range: 'Aug 2028 – Jul 2030', color: 'var(--accent)',
    focus: '<b>Alles zusammenführen.</b> Alle drei Disziplinen jede Woche, dazu Koppeltraining (Rad→Lauf), Wechseltraining und 6 Wettkämpfe mit steigender Distanz. Die Paces aus Phase 1–3 sind jetzt deine Renn-Paces. Ab März 2030: spezifischer 16-Wochen-Block für Thun, letzte Generalprobe (70.3) ca. 6 Wochen vor dem Rennen, dann 3 Wochen Taper.',
    week: [
      { day: 'MO', sessions: [{ tag: 'gym', t: 'Gym — PUSH', d: 'Komplettes Push-Programm', dur: '60 min' }, { tag: 'swim', t: 'Schwimmen (abends)', d: 'Intervalle: 10 × 200 m @ 2:05–2:10/100m', dur: '60 min' }] },
      { day: 'DI', sessions: [{ tag: 'bike', t: 'Brick: Rad + Koppellauf', d: '60–90\u2019 Rad mit Race-Intervallen, direkt danach 15–20\u2019 Lauf @ Marathon-Pace', dur: '90–110 min' }] },
      { day: 'MI', sessions: [{ tag: 'gym', t: 'Gym — PULL', d: 'Komplettes Pull-Programm', dur: '60 min' }, { tag: 'run', t: 'Easy Run (abends)', d: '8–12 km locker, jede 2. Woche mit Steigerungen', dur: '50–60 min' }] },
      { day: 'DO', rest: true, fixed: true, sessions: [{ tag: 'rest', t: 'Restday', d: 'Fixer Ruhetag', dur: '—' }] },
      { day: 'FR', sessions: [{ tag: 'gym', t: 'Gym — LEG', d: 'Komplettes Leg-Programm', dur: '60 min' }, { tag: 'swim', t: 'Open Water (Mai–Sep)', d: 'See: 2–3.8 km im Wetsuit, Orientierung & Gruppenstart üben', dur: '60 min' }] },
      { day: 'SA', sessions: [{ tag: 'bike', t: 'Long Brick', d: 'Wechselnd: 100–160 km Rad + 30\u2019 Koppellauf ODER Long Run 25–30 km', dur: '3:00–7:00 h' }] },
      { day: 'SO', rest: true, sessions: [{ tag: 'rest', t: 'Restday', d: 'Regeneration. Race-Wochenenden ersetzen Sa/So', dur: '—' }] },
    ],
  },
];

// ---------- Gym: PUSH / PULL / LEG ----------
window.GYM = [
  {
    id: 'push', name: 'PUSH', sub: 'Montag · Brust, Schultern, Trizeps', color: 'var(--gym)',
    ex: [
      { n: 'Bankdrücken Langhantel', s: '4 × 6–8', w: 'Grundkraft Oberkörper' },
      { n: 'Schrägbankdrücken Kurzhantel', s: '3 × 8–10', w: 'Obere Brust, Stabilität' },
      { n: 'Schulterdrücken Kurzhantel', s: '3 × 8–10', w: 'Schulterkraft für Schwimmzug' },
      { n: 'Dips (Körpergewicht)', s: '3 × max.', w: 'Druckkraft, Trizeps' },
      { n: 'Seitheben', s: '3 × 12–15', w: 'Schultergesundheit (Schwimmen!)' },
      { n: 'Trizeps am Kabel', s: '3 × 12', w: 'Armstreckung Schwimmzug-Ende' },
      { n: 'Plank-Varianten', s: '3 × 60\u2019\u2019', w: 'Rumpf für Aero-Position' },
    ],
  },
  {
    id: 'pull', name: 'PULL', sub: 'Mittwoch · Rücken, Bizeps, hintere Schulter', color: 'var(--swim)',
    ex: [
      { n: 'Klimmzüge', s: '4 × 6–10', w: 'Der Schwimm-Motor: Latissimus' },
      { n: 'Langhantel-Rudern', s: '4 × 8', w: 'Rückenkraft, Haltung auf dem Rad' },
      { n: 'Latzug enger Griff', s: '3 × 10', w: 'Zugmuster wie Kraul-Armzug' },
      { n: 'Face Pulls', s: '3 × 15', w: 'Rotatorenmanschette schützen' },
      { n: 'Reverse Flys', s: '3 × 12–15', w: 'Hintere Schulter, Ausgleich' },
      { n: 'Bizeps-Curls Kurzhantel', s: '3 × 10–12', w: 'Ellbogen-Stabilität' },
      { n: 'Hanging Leg Raises', s: '3 × 10–12', w: 'Unterer Rumpf' },
    ],
  },
  {
    id: 'leg', name: 'LEG', sub: 'Freitag · Beine, Gesäss, Stabilität', color: 'var(--bike)',
    ex: [
      { n: 'Kniebeugen Langhantel', s: '4 × 6–8', w: 'Watt auf dem Rad' },
      { n: 'Rumänisches Kreuzheben', s: '3 × 8–10', w: 'Hamstrings = Laufschutz Nr. 1' },
      { n: 'Bulgarian Split Squats', s: '3 × 10 / Seite', w: 'Einbeinig wie Laufen & Treten' },
      { n: 'Hip Thrust', s: '3 × 10', w: 'Gesäss: Hügel & Endphase Marathon' },
      { n: 'Wadenheben stehend', s: '4 × 12–15', w: 'Achillessehne & Abdruck' },
      { n: 'Copenhagen Plank', s: '3 × 30\u2019\u2019 / Seite', w: 'Adduktoren, Leistenschutz' },
      { n: 'Einbein-Stand instabil', s: '3 × 45\u2019\u2019 / Seite', w: 'Fussgelenk für Trails (Engadin)' },
    ],
  },
];

window.GYM_NOTES = [
  { t: 'Progression', d: 'Erst Wiederholungen ans obere Ende bringen, dann +2.5 kg. In Wettkampf-Wochen: Gewicht halten, 1 Satz weniger.' },
  { t: 'Saison-Anpassung', d: 'Okt–Feb: schwerer (Kraftaufbau, 6–8 Wdh.). Mär–Sep: Kraft-Erhalt (8–12 Wdh., −20 % Volumen) — die Ausdauer hat Vorrang.' },
  { t: 'Taper', d: 'Letzte 2 Wochen vor jedem Hauptwettkampf: nur noch 2× Gym, 50 % Volumen, nichts Neues. Race-Woche: kein Gym.' },
];

// ---------- Ernährung: Wochenplan ----------
window.NUT_PRINCIPLES = [
  { v: '1.6–2.0', u: 'g/kg', k: 'Protein pro Tag — verteilt auf 4 Mahlzeiten, für Regeneration aus Gym + Ausdauer' },
  { v: '60–90', u: 'g KH/h', k: 'Kohlenhydrate pro Stunde in langen Einheiten (> 90 min) — im Training üben, nicht erst im Rennen' },
  { v: '2.5–3.5', u: 'Liter', k: 'Flüssigkeit pro Tag, an langen Tagen plus Elektrolyte' },
  { v: '80 / 20', u: 'Regel', k: '80 % vollwertig kochen, 20 % Genuss — vier Jahre Disziplin funktionieren nur ohne Verbote' },
];

window.NUTRITION = [
  { day: 'MO', type: 'gym', label: 'Gym + Swim', kcal: '2\u2019900', f: 'Porridge mit Beeren, Baumnüssen & Honig', m: 'Poulet-Reis-Bowl mit Brokkoli, Rüebli & Sesam', a: 'Lachs aus dem Ofen, Süsskartoffeln, grüner Salat', s: 'Magerquark mit Honig' },
  { day: 'DI', type: 'key', label: 'Intervalle', kcal: '3\u2019000', f: 'Birchermüesli mit Apfel, Joghurt & Leinsamen', m: 'Vollkorn-Pasta al Pomodoro mit Mozzarella', a: 'Omelette mit Spinat, Rösti & Tomatensalat', s: 'Banane + Riegel vor dem Training' },
  { day: 'MI', type: 'gym', label: 'Gym + Easy Run', kcal: '2\u2019900', f: 'Vollkornbrot mit Ei, Avocado & Hüttenkäse', m: 'Linsen-Dal mit Basmatireis & Naturejoghurt', a: 'Riz Casimir mit Poulet & gedämpftem Gemüse', s: 'Handvoll Mandeln + Apfel' },
  { day: 'DO', type: 'rest', label: 'RESTDAY', kcal: '2\u2019300', f: 'Griechisches Joghurt mit Beeren & wenig Granola', m: 'Grosser Salatteller mit Thon, Ei & Vollkornbrot', a: 'Gemüse-Curry mit Tofu & wenig Reis', s: 'Gemüsesticks mit Hummus' },
  { day: 'FR', type: 'gym', label: 'Gym + Swim', kcal: '2\u2019900', f: 'Porridge mit Banane & Erdnussbutter', m: 'Ghackets mit Hörnli & Apfelmus (mageres Rind)', a: 'Pouletbrust mit Quinoa, Peperoni & Zucchetti', s: 'Skyr mit Beeren' },
  { day: 'SA', type: 'long', label: 'LONG SESSION', kcal: '3\u2019400+', f: 'Pancakes mit Ahornsirup & Banane (Carb-Load)', m: 'Unterwegs: Gels, Iso, Banane — 60–90 g KH/h', a: 'Selbstgemachte Pizza mit Rohschinken & Salat', s: 'Recovery-Shake direkt nach der Einheit' },
  { day: 'SO', type: 'rest', label: 'RESTDAY', kcal: '2\u2019400', f: 'Zopf mit Konfi, Rühreier & Früchte (Sonntag!)', m: 'Ofengemüse mit Halloumi & Kichererbsen', a: 'Gerstensuppe mit Vollkornbrot & Käse', s: '2 Reihen dunkle Schokolade' },
];

// ---------- Budget ----------
window.BUDGET_YEARS = [
  { range: '2026–27', monthly: 400, sum: 4800, cum: 4800 },
  { range: '2027–28', monthly: 500, sum: 6000, cum: 10800 },
  { range: '2028–29', monthly: 600, sum: 7200, cum: 18000 },
  { range: '2029–30', monthly: 800, sum: 9600, cum: 27600 },
];

// ---------- Equipment (Total = 16'000 CHF) ----------
window.EQUIPMENT = [
  {
    g: 'Phase 1 · Laufen', yr: '2026', color: 'var(--run)', total: 1500,
    items: [
      { n: 'Laufschuhe, 2 Paar (Training + Wettkampf)', s: 'alle ~700 km ersetzen', p: 360 },
      { n: 'GPS-Multisportuhr + Herzfrequenz-Brustgurt', s: 'begleitet alle 4 Jahre — nicht sparen', p: 700 },
      { n: 'Laufbekleidung Sommer & Winter', s: 'inkl. Regenjacke, Stirnlampe', p: 300 },
      { n: 'Startgeld SwissCityMarathon Luzern', s: 'Oktober 2026', p: 140 },
    ],
  },
  {
    g: 'Phase 2 · Swimrun', yr: '2027', color: 'var(--swim)', total: 1200,
    items: [
      { n: 'Swimrun-Wetsuit', s: 'flexibel, für 10–14 °C Bergseen', p: 450 },
      { n: 'Brillen (2×), Pullbuoy, Paddles, Safety-Buoy', s: 'Technik- & Open-Water-Ausrüstung', p: 220 },
      { n: 'Trail-/Swimrun-Schuhe', s: 'drainierend, fürs Engadin', p: 180 },
      { n: 'Startgeld ÖTILLÖ Engadin World Series', s: 'Juli 2027, Early Bird', p: 350 },
    ],
  },
  {
    g: 'Phase 3 · Rad', yr: '2027–28', color: 'var(--bike)', total: 6800,
    items: [
      { n: 'Rennrad (Carbon, Vorjahresmodell)', s: 'grösster Einzelposten — Kauf ab Nov 2027 möglich', p: 4200 },
      { n: 'Radschuhe + Klickpedale', s: '', p: 400 },
      { n: 'Helm', s: '', p: 200 },
      { n: 'Radbekleidung Sommer & Winter', s: 'Bibshorts, Trikots, Jacke, Handschuhe', p: 500 },
      { n: 'Smart-Trainer', s: 'Winter-Training Nov–Mär', p: 800 },
      { n: 'Werkzeug, Pumpe, Schläuche, Flaschen', s: '', p: 300 },
      { n: 'Service & Verschleiss (Reifen, Kette)', s: '2 Jahre', p: 400 },
    ],
  },
  {
    g: 'Phase 4 · Triathlon', yr: '2028–30', color: 'var(--accent)', total: 4500,
    items: [
      { n: 'Triathlon-Wetsuit', s: 'Thunersee-tauglich', p: 550 },
      { n: 'Trisuit', s: 'eine Bekleidung für alle 3 Disziplinen', p: 250 },
      { n: 'Aero-Aufsatz + Race-Setup', s: 'Auflieger, Flaschenhalterung hinten', p: 350 },
      { n: 'Carbon-Race-Laufschuhe', s: 'für 70.3 & Ironman-Marathon', p: 300 },
      { n: 'Startgelder 6 Triathlons', s: 'Sprint → Olympisch → 3× 70.3', p: 1600 },
      { n: 'Startgeld IRONMAN Thun 2030', s: 'früh anmelden!', p: 950 },
      { n: 'Wettkampf-Nutrition', s: 'Gels, Iso, Salztabletten — im Training getestet', p: 500 },
    ],
  },
  {
    g: 'Reserve & Reisen', yr: 'laufend', color: 'var(--rest)', total: 2000,
    items: [
      { n: 'Reisen & Übernachtungen Wettkämpfe', s: 'Engadin, Luzern, Tri-Wochenenden — mit ÖV-Abo günstig', p: 1000 },
      { n: 'Unvorhergesehenes', s: 'Defekte, Ersatz, Physio-Einzelstunden', p: 1000 },
    ],
  },
];
