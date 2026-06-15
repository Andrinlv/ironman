// ============================================================
// Background FX — animierte Ridgelines (Berge/Wasser) im Hero
// Vanilla JS, kein React. Wartet, bis der Hero gerendert ist.
// Respektiert prefers-reduced-motion, pausiert bei verstecktem Tab.
// ============================================================
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hexToRgb(hex) {
    hex = (hex || '').trim();
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return { r: 232, g: 69, b: 46 };
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function init() {
    const hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.fx-canvas')) return !!hero;

    const canvas = document.createElement('canvas');
    canvas.className = 'fx-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    hero.insertBefore(canvas, hero.firstChild);
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0, dpr = 1;
    let accent = { r: 232, g: 69, b: 46 };
    let frame = 0, raf = null;

    // Maus-Einfluss (sanft nachgeführt)
    let mx = -9999, mTarget = -9999, mStrength = 0, mStrTarget = 0;

    function resize() {
      const rect = hero.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function refreshAccent() {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent');
      accent = hexToRgb(v);
    }

    function glow(cx, cy, r, rgb, alpha) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + alpha + ')');
      g.addColorStop(1, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0)');
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    }

    const SWIM = { r: 79, g: 184, b: 230 };

    function draw(t) {
      ctx.clearRect(0, 0, w, h);

      // Sanft driftende Farbglühen
      glow(w * 0.76 + Math.sin(t * 0.05) * w * 0.07, h * -0.05 + Math.cos(t * 0.04) * h * 0.07, w * 0.45, accent, 0.06);
      glow(w * 0.06 + Math.cos(t * 0.035) * w * 0.05, h * 1.02, w * 0.4, SWIM, 0.05);

      // Maus nachführen
      mx += (mTarget - mx) * 0.08;
      mStrength += (mStrTarget - mStrength) * 0.06;

      // Ridgelines — Bergketten / Wasserlinien
      const n = 14;
      const step = 12;
      for (let i = 0; i < n; i++) {
        const p = i / (n - 1);
        const baseY = h * (0.30 + p * 0.76);
        const amp = 12 + p * 46;
        const alpha = 0.034 + p * 0.05;

        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          let y = baseY
            + amp * (0.6 * Math.sin(x * 0.004 + t * 0.35 + i * 1.31)
                   + 0.4 * Math.sin(x * 0.011 - t * 0.22 + i * 2.13));
          // Wellenberg unter dem Cursor
          if (mStrength > 0.01) {
            const d = (x - mx) / 150;
            y -= Math.exp(-d * d) * 30 * p * mStrength
               * (0.7 + 0.3 * Math.sin(x * 0.02 + t * 1.6));
          }
          if (x <= 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        if (i === 9) {
          ctx.strokeStyle = 'rgba(' + accent.r + ',' + accent.g + ',' + accent.b + ',0.15)';
        } else if (i === 4) {
          ctx.strokeStyle = 'rgba(' + SWIM.r + ',' + SWIM.g + ',' + SWIM.b + ',0.10)';
        } else {
          ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
        }
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function loop(now) {
      frame++;
      if (frame % 240 === 0) refreshAccent();
      draw(now / 1000);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (raf === null && !REDUCED) raf = requestAnimationFrame(loop);
    }
    function stop() {
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    }

    resize();
    refreshAccent();

    if (REDUCED) {
      draw(0); // ein statisches Bild, keine Animation
    } else {
      hero.addEventListener('pointermove', (e) => {
        const rect = hero.getBoundingClientRect();
        mTarget = e.clientX - rect.left;
        mStrTarget = 1;
      });
      hero.addEventListener('pointerleave', () => { mStrTarget = 0; });
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
      });
      start();
    }

    window.addEventListener('resize', () => {
      resize();
      if (REDUCED) draw(0);
    });

    return true;
  }

  // React rendert den Hero erst nach dem Laden — kurz pollen
  const poll = setInterval(() => {
    if (init()) clearInterval(poll);
  }, 200);
  setTimeout(() => clearInterval(poll), 15000);
})();
