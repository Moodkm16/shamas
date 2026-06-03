/* ============================================================
   SHAMAS — three-hero.js
   Floating 3D golden rings + orbiting spheres in the hero.
   Requires three.min.js loaded before this script.
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-3d');
  if (!canvas || typeof THREE === 'undefined') return;

  /* Respect reduced-motion preference */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  /* ── Renderer ──────────────────────────────────────────── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = false;

  /* ── Scene ─────────────────────────────────────────────── */
  const scene = new THREE.Scene();

  /* ── Camera ────────────────────────────────────────────── */
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.5, 7);

  /* ── Lighting ──────────────────────────────────────────── */
  scene.add(new THREE.AmbientLight(0xfaf8f4, 0.9));

  const keyLight = new THREE.DirectionalLight(0xffe8a0, 2.2);
  keyLight.position.set(5, 8, 5);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xd4a840, 3, 30);
  fillLight.position.set(-4, -2, 4);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xfff8e0, 2, 20);
  rimLight.position.set(2, -5, -2);
  scene.add(rimLight);

  /* ── Materials (Phong — no env-map needed, warm gold colour) */
  const matGold = new THREE.MeshPhongMaterial({
    color:     0xc8a030,
    specular:  0xffe090,
    shininess: 90,
    emissive:  0x3a2a00,
    emissiveIntensity: 0.18,
  });
  const matGoldLight = new THREE.MeshPhongMaterial({
    color:     0xe0c060,
    specular:  0xfff0a0,
    shininess: 110,
    emissive:  0x503800,
    emissiveIntensity: 0.14,
  });
  const matGem = new THREE.MeshPhongMaterial({
    color:     0xfaf0d8,
    specular:  0xffffff,
    shininess: 180,
    emissive:  0x2a2010,
    emissiveIntensity: 0.08,
  });

  /* ── Main torus (outer watch ring) ─────────────────────── */
  const mainTorus = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.13, 64, 200),
    matGold
  );
  mainTorus.rotation.x = 0.3;
  scene.add(mainTorus);

  /* ── Gyro ring (inner, perpendicular) ──────────────────── */
  const gyroRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.1, 0.07, 32, 120),
    matGoldLight
  );
  gyroRing.rotation.x = Math.PI / 2.2;
  gyroRing.rotation.z = 0.35;
  scene.add(gyroRing);

  /* ── Thin accent ring ───────────────────────────────────── */
  const accentRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.2, 0.04, 16, 160),
    matGoldLight
  );
  accentRing.rotation.x = 1.1;
  accentRing.rotation.y = 0.5;
  scene.add(accentRing);

  /* ── Central gem (octahedron) ───────────────────────────── */
  const gem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.22, 0),
    matGem
  );
  scene.add(gem);

  /* ── Orbiting particles ─────────────────────────────────── */
  const particles = [];
  const particleCount = 18;
  for (let i = 0; i < particleCount; i++) {
    const angle   = (i / particleCount) * Math.PI * 2;
    const radius  = 1.68 + (Math.random() - 0.5) * 0.5;
    const yOff    = (Math.random() - 0.5) * 0.6;
    const size    = 0.035 + Math.random() * 0.065;
    const speed   = (0.12 + Math.random() * 0.22) * (Math.random() < 0.5 ? 1 : -1);
    const phase   = Math.random() * Math.PI * 2;
    const mat     = i % 3 === 0 ? matGem : i % 3 === 1 ? matGold : matGoldLight;

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(size, 10, 10),
      mat
    );
    scene.add(mesh);
    particles.push({ mesh, angle, radius, yOff, speed, phase });
  }

  /* ── Resize ─────────────────────────────────────────────── */
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── Scroll ─────────────────────────────────────────────── */
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    scrollProgress = Math.min(window.scrollY / hero.offsetHeight, 1);
  }, { passive: true });

  /* ── Mouse parallax ─────────────────────────────────────── */
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.6;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
  }, { passive: true });

  /* ── Animation loop ─────────────────────────────────────── */
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.004;

    /* Main torus — slow spin + scroll tilt */
    mainTorus.rotation.y = t * 0.22 + mouseX * 0.4;
    mainTorus.rotation.x = 0.3  + scrollProgress * 1.3 + mouseY * 0.3;

    /* Gyro ring — counter-rotation */
    gyroRing.rotation.y  = -t * 0.38;
    gyroRing.rotation.z  =  0.35 + t * 0.12;

    /* Accent ring — independent drift */
    accentRing.rotation.y = t * 0.14;
    accentRing.rotation.x = 1.1 + t * 0.07;

    /* Central gem — spin + pulse */
    gem.rotation.y = t * 0.7;
    gem.rotation.x = t * 0.35;
    const pulse = 1 + Math.sin(t * 1.8) * 0.06;
    gem.scale.setScalar(pulse);

    /* Orbiting particles */
    particles.forEach(p => {
      p.angle += p.speed * 0.012;
      p.mesh.position.set(
        Math.cos(p.angle) * p.radius,
        p.yOff + Math.sin(p.angle * 0.6 + p.phase) * 0.3,
        Math.sin(p.angle) * p.radius
      );
    });

    /* Camera follows scroll + mouse subtly */
    camera.position.y = 0.5 - scrollProgress * 1.4 + mouseY * -0.3;
    camera.position.z = 7   + scrollProgress * 1.2;
    camera.lookAt(mouseX * 0.4, mouseY * 0.2, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
