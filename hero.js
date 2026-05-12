// hero.js — Three.js animated 3D scene for hero
// Original geometry: three interlocking torus rings (Swim, Bike, Run) over particle field.

(function() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
  camera.position.set(0, 0, 12);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffaa66, 1.2);
  dir.position.set(5, 6, 8);
  scene.add(dir);
  const rim = new THREE.PointLight(0x38c4ff, 1.4, 30);
  rim.position.set(-6, -4, 6);
  scene.add(rim);

  // 3 Rings
  const colors = [0xff6a2c, 0xf5d442, 0x38c4ff]; // run, bike, swim accent vibe
  const rings = [];
  const ringGroup = new THREE.Group();
  scene.add(ringGroup);

  for (let i = 0; i < 3; i++) {
    const geo = new THREE.TorusGeometry(2.2, 0.07, 32, 220);
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i],
      emissive: colors[i],
      emissiveIntensity: 0.4,
      metalness: 0.6,
      roughness: 0.25
    });
    const mesh = new THREE.Mesh(geo, mat);
    // unique tilt per ring
    mesh.rotation.x = (i === 0) ? Math.PI / 2.4 : (i === 1) ? Math.PI / 3 : Math.PI / 2;
    mesh.rotation.y = i * (Math.PI / 3);
    ringGroup.add(mesh);
    rings.push(mesh);
  }

  // Center orb
  const orbGeo = new THREE.IcosahedronGeometry(0.55, 1);
  const orbMat = new THREE.MeshStandardMaterial({
    color: 0xff6a2c,
    emissive: 0xff6a2c,
    emissiveIntensity: 0.75,
    metalness: 0.4,
    roughness: 0.15,
    flatShading: true
  });
  const orb = new THREE.Mesh(orbGeo, orbMat);
  ringGroup.add(orb);

  // Particles
  const pCount = 800;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const r = 6 + Math.random() * 14;
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    pPos[i*3] = r * Math.sin(phi) * Math.cos(theta);
    pPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i*3+2] = r * Math.cos(phi);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.025,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Mouse parallax
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('deviceorientation', (e) => {
    if (e.beta == null || e.gamma == null) return;
    mouse.tx = Math.max(-1, Math.min(1, e.gamma / 30));
    mouse.ty = Math.max(-1, Math.min(1, e.beta / 60));
  });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas);
  resize();

  let running = true;
  document.addEventListener('visibilitychange', () => running = !document.hidden);

  const clock = new THREE.Clock();
  function tick() {
    if (running) {
      const t = clock.getElapsedTime();

      rings[0].rotation.z = t * 0.5;
      rings[1].rotation.z = -t * 0.4;
      rings[2].rotation.z = t * 0.3;
      rings[0].rotation.y = Math.sin(t * 0.3) * 0.5;
      rings[1].rotation.x = Math.PI / 3 + Math.cos(t * 0.25) * 0.4;

      orb.rotation.y = t * 0.6;
      orb.rotation.x = t * 0.4;
      orb.scale.setScalar(1 + Math.sin(t * 2) * 0.08);

      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.02;

      // parallax (eased)
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      ringGroup.rotation.y = mouse.x * 0.4;
      ringGroup.rotation.x = -mouse.y * 0.3;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  // Theme reactive
  function applyTheme() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    pMat.opacity = isLight ? 0.35 : 0.55;
    pMat.color.set(isLight ? 0x303040 : 0xffffff);
    ambient.intensity = isLight ? 0.7 : 0.45;
  }
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  applyTheme();
})();
