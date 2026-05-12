// data.js — All plan content for IRONMAN 2030 Thun
// Athletic data, dates, training blocks, nutrition, budget.

window.IRONMAN_DATA = {
  // The mission and race target
  target: {
    name: "IRONMAN Switzerland Thun",
    date: "2030-07-21", // typical late July; placeholder
    location: "Thun, Schweiz",
    swim: "3.8 km",
    bike: "180 km",
    run: "42.2 km"
  },

  // 4 phases of the road map
  phases: [
    {
      id: "marathon",
      no: "01",
      name: "Lausanne Marathon",
      date: "25 OKT 2026",
      start: "14.05.2026",
      color: "#57e389",
      focus: "Laufen — Pace, Ökonomie, mentale Distanzhärte.",
      desc: "23 Wochen vom Aufbau bis zum ersten Marathon. Reine Lauf-Fokus-Phase mit Kraft im Hintergrund.",
      stats: [
        { l: "Distanz", v: "42.2 km" },
        { l: "Ziel-Zeit", v: "4:00 h" },
        { l: "Avg Pace", v: "5:41/km" }
      ],
      blocks: [
        { wk: "W1–4",  name: "Base 1 — Aerobe Grundlage", desc: "30–40 km/Woche · Zone 2, Cadence-Drills, lockere Steigerungsläufe", dur: "4 Wochen" },
        { wk: "W5–8",  name: "Base 2 — Volumen", desc: "40–55 km/Woche · Long Run bis 18 km · 1× Tempo-Block 8 km", dur: "4 Wochen" },
        { wk: "W9–12", name: "Build 1 — Kraftausdauer", desc: "50–65 km/Woche · Hill Reps · Long Run bis 26 km · 1× Tempo + 1× Intervalle", dur: "4 Wochen" },
        { wk: "W13–16", name: "Build 2 — Marathon-Pace", desc: "55–70 km/Woche · MP-Blöcke 3×4 km @ 5:41 · Long Run bis 32 km mit Pace-Wechsel", dur: "4 Wochen" },
        { wk: "W17–19", name: "Peak", desc: "65–75 km · Long Run 32 km mit 16 km @ MP · Half-Marathon-Test als Race Sim", dur: "3 Wochen" },
        { wk: "W20–22", name: "Taper", desc: "Volumen −40 % · Carb-Load letzte 3 Tage · Schlaf-Priorität", dur: "3 Wochen" },
        { wk: "W23",   name: "Race Week — Lausanne", desc: "Bib-Pickup Sa · Pasta-Abend · Start 10:05 Place de Milan", dur: "Race" }
      ]
    },
    {
      id: "swimrun",
      no: "02",
      name: "Ötillö Engadin",
      date: "JULI 2027",
      start: "01.11.2026",
      color: "#38c4ff",
      focus: "Schwimmen aufbauen + Lauf-Pace halten. Open-Water unter 12 °C.",
      desc: "9 Monate. Schwimm-Volumen verdoppeln, Trail-Pace halten, Übergänge nass↔trocken trainieren.",
      stats: [
        { l: "Distanz", v: "43.4 km" },
        { l: "Schwimmen", v: "5.9 km" },
        { l: "Laufen", v: "37.5 km" }
      ],
      blocks: [
        { wk: "Nov–Dez",  name: "Schwimm-Reboot", desc: "3× Pool/Woche · Technik (Catch, Atmung 3er) · 2 km/Session · Maintenance-Run 30 km/Wo", dur: "8 Wochen" },
        { wk: "Jan–Feb",  name: "Schwimm-Volumen", desc: "3–4× Pool · 3 km/Session · 100 m Sprints für Schwimm-VO₂max", dur: "8 Wochen" },
        { wk: "Mär–Apr",  name: "Trail + Wetsuit", desc: "Trail-Run 1× Woche · Wetsuit-Schwimmen Hallenbad · Brick Pool→Run", dur: "8 Wochen" },
        { wk: "Mai",      name: "Open Water", desc: "1× Woche Thunersee/Aare · Sichten alle 6 Züge · Kalt-Adaption (kalte Dusche)", dur: "4 Wochen" },
        { wk: "Jun",      name: "Race Sim 1800 m Höhe", desc: "Wochenende Engadin: 4 h Trail-Run + 3× 800 m See", dur: "4 Wochen" },
        { wk: "Jul",      name: "Taper + Race", desc: "Volumen −30 % · 2 Wochen Höhenakklimatisation · Race Silvaplana", dur: "Race" }
      ]
    },
    {
      id: "cycling",
      no: "03",
      name: "180 km < 8 h",
      date: "JULI 2028",
      start: "Aug 2027",
      color: "#f5d442",
      focus: "Radleistung Z2–Z3 für 7 h. Lauf-, Schwimm-Pace beibehalten.",
      desc: "12 Monate Bike-Focus. FTP-Anhebung, Long-Ride Gewohnheit, Triathlon-Bike-Position.",
      stats: [
        { l: "Distanz", v: "180 km" },
        { l: "Ziel-Zeit", v: "< 8 h" },
        { l: "Avg Speed", v: "≥ 22.5 km/h" }
      ],
      blocks: [
        { wk: "Aug–Okt 27", name: "Bike Base", desc: "Indoor 4×/Wo Z2 (60–90 min) · Wochenende Long Ride 60→120 km · Bike-Fit-Termin", dur: "12 Wochen" },
        { wk: "Nov–Jan 28", name: "FTP Build", desc: "2× 2×20 min @ Sweet Spot · 1× VO₂max 5×3 min · Z2-Ride 3 h Wochenende", dur: "12 Wochen" },
        { wk: "Feb–Apr 28", name: "Volume Push", desc: "Long Ride 120→160 km · Back-to-Back Sa+So · Climbing Reps (Niederhorn / Beatenberg)", dur: "12 Wochen" },
        { wk: "Mai–Jun 28", name: "Race Pace", desc: "180 km Testfahrt mit Race-Nutrition · Bike→Run-Brick 90 min + 20 min", dur: "8 Wochen" },
        { wk: "Jul 28",     name: "180 km Solo Time-Trial", desc: "Eigene Route Berner Oberland · Begleitperson + Verpflegungsbox", dur: "Test" }
      ]
    },
    {
      id: "triathlons",
      no: "04",
      name: "6× Triathlon → IRONMAN",
      date: "AUG 2028 – JULI 2030",
      start: "Aug 2028",
      color: "#ff6a2c",
      focus: "Disziplinen verbinden, Wettkampf-Erfahrung, Race-Day-Routine.",
      desc: "Sechs Wettkämpfe in aufsteigender Distanz als Sprungbrett zum vollen IRONMAN Thun 2030.",
      stats: [
        { l: "Wettkämpfe", v: "6" },
        { l: "Block", v: "24 Mon." },
        { l: "Peak", v: "Thun 2030" }
      ],
      blocks: [
        { wk: "Sep 28", name: "Tri #1 — Sprint Zürich", desc: "750 m / 20 km / 5 km · Übergänge T1/T2 lernen · Wechselzone üben", dur: "Race" },
        { wk: "Mai 29", name: "Tri #2 — Olympic Nyon", desc: "1.5 km / 40 km / 10 km · Pacing-Strategie · Race-Nutrition kalibrieren", dur: "Race" },
        { wk: "Jul 29", name: "Tri #3 — Olympic Sursee", desc: "Wiederholung mit besserer Time · Mental Race Plan üben", dur: "Race" },
        { wk: "Aug 29", name: "Tri #4 — Half Rapperswil 70.3", desc: "1.9 km / 90 km / 21.1 km · Ironman-Format · 70.3 Switzerland", dur: "Race" },
        { wk: "Sep 29", name: "Tri #5 — Half Zürich", desc: "Zweite 70.3 für Robustheit · Spät-Saison-Erfahrung kalt", dur: "Race" },
        { wk: "Mai 30", name: "Tri #6 — Half Switzerland 70.3", desc: "Letzte 70.3 als IM-Generalprobe · Vollständige Race-Nutrition test", dur: "Race" },
        { wk: "Jul 30", name: "🏁 IRONMAN Switzerland Thun", desc: "3.8 km Thunersee · 180 km Gantrisch-Loop · 42.2 km Aareufer", dur: "GOAL" }
      ]
    }
  ],

  // Weekly schedule template (after work hours)
  // Days: Mo Di Mi Do Fr Sa So
  weekly: [
    // [day index, kind, name, label]
    { day: 0, slot: "work",  name: "ARBEIT",     time: "07:30–17:00", title: "Office" },
    { day: 0, slot: "push",  name: "18:00–19:30", time: "Push Day",  title: "Push" },
    { day: 1, slot: "work",  name: "ARBEIT",     time: "07:30–17:00", title: "Office" },
    { day: 1, slot: "run",   name: "18:00–19:30", time: "Run Z2",    title: "Run Z2" },
    { day: 2, slot: "work",  name: "ARBEIT",     time: "07:30–17:00", title: "Office" },
    { day: 2, slot: "pull",  name: "18:00–19:30", time: "Pull Day",  title: "Pull" },
    { day: 3, slot: "work",  name: "ARBEIT",     time: "07:30–17:00", title: "Office" },
    { day: 3, slot: "rest",  name: "REST",       time: "Mobilität",  title: "Rest" },
    { day: 4, slot: "work",  name: "ARBEIT",     time: "07:30–17:00", title: "Office" },
    { day: 4, slot: "leg",   name: "18:00–19:30", time: "Leg Day",   title: "Legs" },
    { day: 5, slot: "long",  name: "08:00–11:30", time: "Endurance",  title: "Long Session" },
    { day: 5, slot: "swim",  name: "16:00–17:00", time: "Easy Swim",  title: "Swim Drills" },
    { day: 6, slot: "rest",  name: "REST",       time: "Recovery",    title: "Rest" }
  ],

  // PUSH/PULL/LEG exercises (gym-based)
  splits: [
    {
      id: "push", title: "PUSH", color: "#ff6a2c",
      sub: "Brust · Schultern · Trizeps · 60–75 min",
      ex: [
        { n: "Bench Press", s: "4×6 — Kraftbasis, schwer aber sauber" },
        { n: "Incline DB Press", s: "3×8–10 — Oberer Brust-Schwerpunkt" },
        { n: "Overhead Press", s: "4×6 — Schulter-Stabilität für Schwimmen" },
        { n: "Cable Fly", s: "3×12 — Isolation, kontrollierte Spannung" },
        { n: "Lateral Raises", s: "3×15 — Schulterbreite & Posture" },
        { n: "Triceps Pushdown + Skullcrusher", s: "Superset 3×12 — Trizeps-Pump" },
        { n: "Plank-Roll-Out", s: "3×10 — Core-Stabilität Ride-Posture" }
      ]
    },
    {
      id: "pull", title: "PULL", color: "#c060e0",
      sub: "Rücken · Bizeps · Hintere Schulter · 60–75 min",
      ex: [
        { n: "Deadlift", s: "4×5 — Posteriore Kette, Hüftantrieb" },
        { n: "Pull-Ups (assisted ok)", s: "4×6–8 — Latissimus für Schwimm-Zug" },
        { n: "Barbell Row", s: "4×8 — Rudermuskulatur dicht halten" },
        { n: "Lat Pulldown", s: "3×10 — Catch-Pattern im Wasser" },
        { n: "Face Pulls", s: "3×15 — Schulter-Gesundheit" },
        { n: "DB Curl + Hammer Curl", s: "Superset 3×12 — Bizeps & Brachialis" },
        { n: "Reverse Hyper / Back Extension", s: "3×12 — Lower Back resilience" }
      ]
    },
    {
      id: "leg", title: "LEG", color: "#57e389",
      sub: "Quadriceps · Hams · Gluteen · Waden · 75–90 min",
      ex: [
        { n: "Back Squat", s: "4×6 — Bein-Kraftbasis" },
        { n: "Romanian Deadlift", s: "4×8 — Hamstrings für Lauf-Ökonomie" },
        { n: "Bulgarian Split Squat", s: "3×8 je Bein — Einbein-Stabilität" },
        { n: "Leg Press", s: "3×12 — Bein-Volumen, Knie-schonend" },
        { n: "Walking Lunges", s: "3×20 Schritte — funktionelle Kraft" },
        { n: "Standing Calf Raise", s: "4×15 — Schwung-Phase im Lauf" },
        { n: "Pallof Press + Side Plank", s: "Superset 3×12 — Hüft-Stabilität" }
      ]
    }
  ],

  // Nutrition — 7-day rotating menu (default training day, ~3000 kcal)
  macros: { kcal: 3000, carbs: 55, protein: 25, fat: 20 },

  // Tabs: Trainingstag · Long Day · Rest Day · Race Day
  meals: {
    "Trainingstag": [
      { when: "06:30", what: "Haferflocken 80 g + Beeren + Mandelbutter + Whey", kcal: "560" },
      { when: "10:00", what: "Snack: Banane + Walnüsse + Skyr", kcal: "350" },
      { when: "12:30", what: "Bowl: Quinoa + Pouletbrust + Brokkoli + Avocado + Olivenöl", kcal: "780" },
      { when: "15:30", what: "Pre-Workout: Reiswaffel + Honig + Espresso", kcal: "220" },
      { when: "19:45", what: "Post-Workout: Whey-Shake + Banane", kcal: "330" },
      { when: "20:30", what: "Süsskartoffel + Lachs + Spinat + Olivenöl", kcal: "760" }
    ],
    "Long Day": [
      { when: "07:00", what: "Bircher Müsli mit Vollmilch + Apfel + Mandeln", kcal: "640" },
      { when: "08:00", what: "Während: Iso-Drink + Gels alle 30 min", kcal: "≈90/30min" },
      { when: "12:00", what: "Recovery: 4:1 Carb-Protein-Shake + Banane", kcal: "420" },
      { when: "13:30", what: "Pasta al Pesto + Pouletfilet + Salat + Olivenöl", kcal: "920" },
      { when: "16:00", what: "Snack: Skyr + Honig + Granola", kcal: "320" },
      { when: "20:00", what: "Rindsfilet + Kartoffeln + Gemüse + Quark-Dessert", kcal: "880" }
    ],
    "Rest Day": [
      { when: "07:30", what: "Eier-Omelette (3) + Vollkornbrot + Avocado", kcal: "520" },
      { when: "10:00", what: "Kaffee + Apfel + Nuss-Mix 30 g", kcal: "260" },
      { when: "12:30", what: "Linsencurry + Basmati + Spinat + Joghurt", kcal: "680" },
      { when: "15:30", what: "Hüttenkäse + Beeren + Leinsamen", kcal: "260" },
      { when: "19:30", what: "Ofen-Lachs + Süsskartoffel + Brokkoli + Olivenöl", kcal: "680" }
    ],
    "Race Day": [
      { when: "−3 h",  what: "Haferflocken 100 g + Honig + Banane (low-fibre)", kcal: "650" },
      { when: "−45 min", what: "Espresso + Gel + 500 ml Iso", kcal: "150" },
      { when: "During", what: "60–90 g Carbs/h: Gels + Iso + Banane + Salz-Kapseln", kcal: "300/h" },
      { when: "+15 min", what: "Recovery-Shake 4:1 + Cola light", kcal: "420" },
      { when: "+90 min", what: "Risotto + Pouletbrust + Gemüse + Süsses Dessert", kcal: "900" },
      { when: "Abends", what: "Burger + Pommes + Bier (verdient.)", kcal: "1100" }
    ]
  },

  // Equipment with cost in CHF
  equipment: [
    { name: "Triathlon-Rennrad (Used / Cervélo P3 o.ä.)", note: "Carbon · Aero · Used in TOP-Zustand", cost: 5500, tag: "Bike" },
    { name: "Bike Fitting (Professional)", note: "Position für 7 h Effizienz", cost: 350, tag: "Bike" },
    { name: "Power Meter Pedale (4iiii / Assioma)", note: "Pflicht für FTP-Training", cost: 700, tag: "Bike" },
    { name: "Aero-Helm", note: "Watt-Gewinn 5–8 W", cost: 220, tag: "Bike" },
    { name: "Cycling-Schuhe + Cleats", note: "Klick-Pedalsystem", cost: 280, tag: "Bike" },
    { name: "Bike-Wartung & Verschleiss (4 J)", note: "Service, Reifen, Ketten", cost: 1200, tag: "Bike" },
    { name: "Wetsuit (Orca / blueseventy)", note: "Open-Water + Engadin Cold", cost: 480, tag: "Swim" },
    { name: "Swimrun-Paddles + Pull-Buoy", note: "Ötillö-spezifisch", cost: 120, tag: "Swim" },
    { name: "Schwimmbrille + Wechsel (3×)", note: "Pool + Open Water tinted", cost: 90, tag: "Swim" },
    { name: "Tri-Suit (Sleeveless)", note: "Race-Kleidung", cost: 290, tag: "Race" },
    { name: "Laufschuhe Rotation (8 Paar / 4 J)", note: "Daily + Tempo + Race-Day", cost: 1600, tag: "Run" },
    { name: "Carbon-Race-Shoes (Vaporfly o.ä.)", note: "Marathon + 70.3 Race Day", cost: 350, tag: "Run" },
    { name: "GPS-Uhr (Garmin Fenix / Forerunner)", note: "HR + Power + Multisport", cost: 650, tag: "Tech" },
    { name: "HR-Brustgurt", note: "Genauer als Optic-HR", cost: 90, tag: "Tech" },
    { name: "Smart Trainer (Wahoo Kickr / Tacx)", note: "Indoor Bike Winter", cost: 950, tag: "Tech" },
    { name: "Race Entries (gesamt ~10 Rennen)", note: "Lausanne, Ötillö, 6 Tri's, IM", cost: 2200, tag: "Race" },
    { name: "Nutrition 4 J (Gels, Iso, Whey, Salz)", note: "≈ 25 CHF/Woche × 208 W", cost: 5200, tag: "Nutrition" },
    { name: "Supplements (Mg, Creatin, Vit D)", note: "Basis-Stack", cost: 600, tag: "Nutrition" },
    { name: "Physio & Massage (4 J)", note: "Prävention", cost: 1500, tag: "Recovery" },
    { name: "Reise IRONMAN Thun + Buffer", note: "Anreise, Hotel 4 N, Verpflegung", cost: 900, tag: "Race" }
  ],

  // Monthly savings plan (CHF/Monat) — starting Aug 2026
  savings: [
    { period: "08/2026 – 07/2027", monthly: 400, months: 12 },
    { period: "08/2027 – 07/2028", monthly: 500, months: 12 },
    { period: "08/2028 – 07/2029", monthly: 600, months: 12 },
    { period: "08/2029 – 07/2030", monthly: 800, months: 12 }
  ],

  // Principles
  principles: [
    { n: "01", t: "Schlaf > alles", d: "7.5–9 h pro Nacht. Kein Training kompensiert chronischen Schlafmangel. Daten messen, nicht raten." },
    { n: "02", t: "Konsistenz > Intensität", d: "85 % aller Sessions wie geplant durchziehen schlägt jeden Hero-Workout. 4 Jahre = 1'460 Tage." },
    { n: "03", t: "Auto-Regulation", d: "HRV niedrig + RPE hoch → Long Run wird Easy Run. Plan ist Vorschlag, Körper ist Wahrheit." },
    { n: "04", t: "Fuel the Work", d: "Kohlenhydrate sind kein Feind. Fasten-Training nur in dedizierten Z2-Blöcken." }
  ]
};
