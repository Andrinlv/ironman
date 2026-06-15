// ============================================================
// App-Shell: Nav, Footer, Tweaks, Komposition
// ============================================================

const NAV_LINKS = [
  ['#status', 'Heute'],
  ['#roadmap', 'Roadmap'],
  ['#pace', 'Pace'],
  ['#renntag', 'Renntag'],
  ['#training', 'Training'],
  ['#gym', 'Gym'],
  ['#ernaehrung', 'Ernährung'],
  ['#budget', 'Budget'],
  ['#equipment', 'Equipment'],
  ['#strecke', 'Strecke'],
];

function Nav() {
  const [active, setActive] = React.useState('');
  React.useEffect(() => {
    const ids = NAV_LINKS.map(([h]) => h.slice(1));
    let ticking = false;
    const update = () => {
      const marker = window.innerHeight * 0.38;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#top"><span className="dot"></span>THUN 2030</a>
        <div className="nav-links">
          {NAV_LINKS.map(([href, lbl]) => (
            <a href={href} key={href} className={active === href.slice(1) ? 'active' : ''}>{lbl}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="foot" data-screen-label="Footer">
      <div className="wrap">
        <div className="big">Anything is possible.</div>
        <p>
          Vier Jahre sind lang — dieser Plan lebt davon, dass die Wochenstruktur einfach bleibt:
          Mo/Mi/Fr Gym, Do Pause, Sa lang, So Pause. Wenn eine Woche schiefgeht, zählt nur die nächste.
          Termine 2027–2030 sind Richtwerte und werden bestätigt, sobald die Veranstalter die Daten publizieren.
        </p>
      </div>
    </footer>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#e8452e",
  "showWhy": true
}/*EDITMODE-END*/;

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return 'rgba(' + ((n >> 16) & 255) + ', ' + ((n >> 8) & 255) + ', ' + (n & 255) + ', ' + a + ')';
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [finish, setFinish] = React.useState(13.0);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--accent', t.accentColor);
    r.setProperty('--accent-soft', hexToRgba(t.accentColor, 0.14));
    r.setProperty('--run', t.accentColor);
    r.setProperty('--run-soft', hexToRgba(t.accentColor, 0.14));
  }, [t.accentColor]);

  React.useEffect(() => {
    document.body.classList.toggle('hide-why', !t.showWhy);
  }, [t.showWhy]);

  // Scroll-Engine: gestaffelte Reveals + Hero-Parallax.
  // Grundzustand bleibt sichtbar; .rv-in animiert nur das Erscheinen,
  // Finalizer räumen eingefrorene Animationen weg.
  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pending = [];
    document.querySelectorAll('[data-reveal]').forEach((el) => pending.push({ el, delay: 0 }));
    document.querySelectorAll('[data-reveal-group]').forEach((g) => {
      const step = parseFloat(g.getAttribute('data-reveal-group')) || 80;
      Array.from(g.children).forEach((el, i) => pending.push({ el, delay: Math.min(i * step, 640) }));
    });
    if (!pending.length) return;

    const reveal = (it) => {
      if (reduced) return;
      it.el.style.animationDelay = it.delay + 'ms';
      it.el.classList.add('rv-in');
      const finalize = () => { it.el.style.animation = 'none'; };
      it.el.addEventListener('animationend', finalize, { once: true });
      setTimeout(finalize, 950 + it.delay);
    };

    const heroWrap = document.querySelector('.hero > .wrap');
    const parallax = () => {
      if (!heroWrap || reduced) return;
      const f = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.85), 0), 1);
      heroWrap.style.transform = 'translateY(' + (f * 58).toFixed(1) + 'px)';
      heroWrap.style.opacity = (1 - f * 0.85).toFixed(3);
    };

    const check = () => {
      const vh = window.innerHeight;
      pending = pending.filter((it) => {
        const r = it.el.getBoundingClientRect();
        if (r.top < vh - 30 && r.bottom > -30) {
          reveal(it);
          return false;
        }
        return true;
      });
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; parallax(); check(); });
    };
    parallax();
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const iv = setInterval(() => {
      check();
      if (!pending.length) clearInterval(iv);
    }, 800);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearInterval(iv);
    };
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <StatusBoard />
      <Roadmap />
      <PaceLab finish={finish} setFinish={setFinish} />
      <RaceSim finish={finish} />
      <WeeklyPlan />
      <GymPlan />
      <Nutrition />
      <Budget />
      <Equipment />
      <CourseMap />
      <Footer />
      <TweaksPanel>
        <TweakSection label="Farbe" />
        <TweakColor
          label="Akzent" value={t.accentColor}
          options={['#e8452e', '#e05c9a', '#4f7df0', '#5fc88f']}
          onChange={(v) => setTweak('accentColor', v)}
        />
        <TweakSection label="Inhalt" />
        <TweakToggle
          label="«Warum»-Hinweise im Gym-Plan" value={t.showWhy}
          onChange={(v) => setTweak('showWhy', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
