// Cursor glow
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Search tabs
  document.querySelectorAll('.stab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Intersection observer — fade up
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   LUXURY ABSTRACT CANVAS — Scott Landau Team
   Layers: deep ink base · gold orb nebulae · geometric
   line grid · muted sparkle particles · shimmer waves
═══════════════════════════════════════════════════════ */
(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  const INK   = [17, 24, 40];
  const NAVY  = [54, 74, 116];
  const GOLD  = [184, 150, 90];
  const GOLD2 = [212, 175, 114];
  const GOLD3 = [240, 217, 168];

  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Subtle orbs — very low opacity
  const orbs = [
    { x:0.72, y:0.38, r:0.52, speed:0.00018, phase:0,   col:GOLD,  a:0.07 },
    { x:0.18, y:0.65, r:0.38, speed:0.00013, phase:2.1, col:GOLD2, a:0.04 },
    { x:0.85, y:0.80, r:0.30, speed:0.00022, phase:4.3, col:GOLD3, a:0.03 },
    { x:0.40, y:0.20, r:0.25, speed:0.00016, phase:1.5, col:GOLD,  a:0.04 },
  ];

  // Muted sparkle particles — few, dim, slow
  const sparks = Array.from({ length: 38 }, function() {
    return {
      x:     Math.random(),
      y:     Math.random(),
      vx:    (Math.random() - 0.5) * 0.00006,
      vy:    (Math.random() - 0.5) * 0.00004 - 0.00002,
      r:     Math.random() * 0.8 + 0.2,
      a:     Math.random() * 0.12 + 0.03,
      ph:    Math.random() * Math.PI * 2,
      sp:    Math.random() * 0.0004 + 0.0002,
      col:   [GOLD, GOLD2, GOLD3][Math.floor(Math.random() * 3)],
    };
  });

  // Geometric grid
  const GRID_COLS = 12, GRID_ROWS = 8;

  // Shimmer waves
  const waves = Array.from({ length: 4 }, function(_, i) {
    return {
      yBase: 0.3 + i * 0.14,
      amp:   0.018 + i * 0.006,
      freq:  0.5 + i * 0.25,
      speed: 0.00020 + i * 0.00006,
      phase: (i / 4) * Math.PI * 2,
      alpha: 0.025 + i * 0.008,
    };
  });

  function draw() {
    t++;

    // Base gradient
    var bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,   'rgb(' + INK[0]  + ',' + INK[1]  + ',' + INK[2]  + ')');
    bg.addColorStop(0.5, 'rgb(' + NAVY[0] + ',' + NAVY[1] + ',' + NAVY[2] + ')');
    bg.addColorStop(1,   'rgb(' + INK[0]  + ',' + INK[1]  + ',' + INK[2]  + ')');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Orb nebulae
    orbs.forEach(function(o) {
      var drift = Math.sin(t * o.speed * 1000 + o.phase);
      var cx = (o.x + drift * 0.06) * W;
      var cy = (o.y + Math.cos(t * o.speed * 800 + o.phase) * 0.04) * H;
      var r  = o.r * Math.min(W, H);
      var g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0,   rgba(o.col, o.a));
      g.addColorStop(0.4, rgba(o.col, o.a * 0.3));
      g.addColorStop(1,   rgba(o.col, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.65, drift * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Geometric grid — very subtle
    ctx.lineWidth = 0.4;
    for (var c = 0; c <= GRID_COLS; c++) {
      var xBase = (c / GRID_COLS) * W;
      ctx.strokeStyle = rgba(GOLD, 0.035);
      ctx.beginPath();
      for (var py = 0; py <= H; py += 6) {
        var wv = Math.sin(py * 0.008 + t * 0.002 + c * 0.5) * 5;
        if (py === 0) ctx.moveTo(xBase + wv, py);
        else          ctx.lineTo(xBase + wv, py);
      }
      ctx.stroke();
    }
    for (var r = 0; r <= GRID_ROWS; r++) {
      var yBase = (r / GRID_ROWS) * H;
      ctx.strokeStyle = rgba(GOLD, 0.035);
      ctx.beginPath();
      for (var px = 0; px <= W; px += 6) {
        var wv2 = Math.sin(px * 0.006 + t * 0.002 + r * 0.7) * 4;
        if (px === 0) ctx.moveTo(px, yBase + wv2);
        else          ctx.lineTo(px, yBase + wv2);
      }
      ctx.stroke();
    }

    // Diagonal accent lines
    ctx.lineWidth = 0.6;
    for (var d = -2; d <= 14; d++) {
      var x0  = (d / 12) * W * 1.5 - W * 0.25;
      var dft = Math.sin(t * 0.0015 + d * 0.4) * 18;
      ctx.strokeStyle = rgba(GOLD2, 0.025 + Math.sin(t * 0.002 + d) * 0.01);
      ctx.beginPath();
      ctx.moveTo(x0 + dft, 0);
      ctx.lineTo(x0 + H * 0.55 + dft, H);
      ctx.stroke();
    }

    // Shimmer waves
    waves.forEach(function(w) {
      var pulse = 0.5 + 0.5 * Math.sin(t * 0.001 + w.phase);
      ctx.strokeStyle = rgba(GOLD3, w.alpha * pulse);
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (var px = 0; px <= W; px += 4) {
        var yy = (w.yBase + Math.sin(px * w.freq * 0.005 + t * w.speed * 1000 + w.phase) * w.amp) * H;
        if (px === 0) ctx.moveTo(px, yy);
        else          ctx.lineTo(px, yy);
      }
      ctx.stroke();
    });

    // Muted sparkle particles
    sparks.forEach(function(p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      var pulse = 0.5 + 0.5 * Math.sin(t * p.sp * 1000 + p.ph);
      var a  = p.a * pulse;
      var px = p.x * W, py = p.y * H;
      // Soft glow
      var glow = ctx.createRadialGradient(px, py, 0, px, py, p.r * 5);
      glow.addColorStop(0, rgba(p.col, a * 0.4));
      glow.addColorStop(1, rgba(p.col, 0));
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(px, py, p.r * 5, 0, Math.PI * 2); ctx.fill();
      // Core dot
      ctx.fillStyle = rgba(p.col, a * 0.8);
      ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();
    });

    // Corner accents
    var ca = 0.12 + 0.04 * Math.sin(t * 0.002);
    ctx.strokeStyle = rgba(GOLD, ca); ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(60, 100); ctx.lineTo(60, 140); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(60, 100); ctx.lineTo(100, 100); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W-60, H-100); ctx.lineTo(W-60, H-140); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W-60, H-100); ctx.lineTo(W-100, H-100); ctx.stroke();

    // Subtle ring pulse
    var ringR  = (0.16 + 0.015 * Math.sin(t * 0.0015)) * Math.min(W, H);
    var ringA  = 0.04 + 0.02 * Math.sin(t * 0.002);
    var ringCX = W * 0.72, ringCY = H * 0.42;
    ctx.strokeStyle = rgba(GOLD2, ringA); ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.arc(ringCX, ringCY, ringR, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = rgba(GOLD2, ringA * 0.4);
    ctx.beginPath(); ctx.arc(ringCX, ringCY, ringR * 1.35, 0, Math.PI * 2); ctx.stroke();

    requestAnimationFrame(draw);
  }

  draw();
})();

/* ════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   INTRO CANVAS — slow breathing gradient, no particles
═══════════════════════════════════════════════════ */
(function() {
  var c = document.getElementById('intro-canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  var W, H, t = 0, raf;

  function resize() {
    W = c.width  = c.offsetWidth;
    H = c.height = c.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    t++;

    // Deep navy base — eXp brand blue #364A74
    var bgG = ctx.createLinearGradient(0, 0, W, H);
    bgG.addColorStop(0,   '#0e1a2e');
    bgG.addColorStop(0.4, '#162340');
    bgG.addColorStop(0.7, '#1a2d52');
    bgG.addColorStop(1,   '#0e1a2e');
    ctx.fillStyle = bgG;
    ctx.fillRect(0, 0, W, H);

    // Large blue atmosphere — fills most of the screen
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.004);
    var r1 = Math.min(W, H) * (0.85 + pulse * 0.08);
    var cx = W * 0.5, cy = H * 0.5;
    var g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r1);
    g1.addColorStop(0,   'rgba(54,74,116,' + (0.55 + pulse * 0.15) + ')');
    g1.addColorStop(0.4, 'rgba(54,74,116,' + (0.30 + pulse * 0.08) + ')');
    g1.addColorStop(0.75,'rgba(30,50,90,'  + (0.15 + pulse * 0.05) + ')');
    g1.addColorStop(1,   'rgba(14,26,46,0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);

    // Secondary blue accent — upper area
    var r2 = Math.min(W, H) * (0.5 + pulse * 0.06);
    var g2 = ctx.createRadialGradient(cx, H * 0.3, 0, cx, H * 0.3, r2);
    g2.addColorStop(0,   'rgba(80,110,180,' + (0.22 + pulse * 0.08) + ')');
    g2.addColorStop(0.5, 'rgba(54,74,116,'  + (0.10 + pulse * 0.04) + ')');
    g2.addColorStop(1,   'rgba(14,26,46,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    // Subtle gold warmth at center
    var r3 = Math.min(W, H) * 0.3;
    var g3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r3);
    g3.addColorStop(0,   'rgba(184,150,90,' + (0.06 + pulse * 0.03) + ')');
    g3.addColorStop(1,   'rgba(184,150,90,0)');
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, W, H);

    // Single horizontal shimmer line that drifts slowly
    var lineY = H * (0.5 + Math.sin(t * 0.003) * 0.04);
    var lineA = 0.04 + pulse * 0.03;
    var lg = ctx.createLinearGradient(0, 0, W, 0);
    lg.addColorStop(0,   'rgba(212,175,114,0)');
    lg.addColorStop(0.3, 'rgba(212,175,114,' + lineA + ')');
    lg.addColorStop(0.5, 'rgba(240,217,168,' + (lineA * 1.5) + ')');
    lg.addColorStop(0.7, 'rgba(212,175,114,' + lineA + ')');
    lg.addColorStop(1,   'rgba(212,175,114,0)');
    ctx.strokeStyle = lg;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(W, lineY);
    ctx.stroke();

    raf = requestAnimationFrame(draw);
  }
  draw();

  window._stopIntroCanvas = function() { cancelAnimationFrame(raf); };
})();

/* ═══════════════════════════════════════════════════
   INTRO DISMISS
═══════════════════════════════════════════════════ */
document.body.classList.add('intro-active');

// Auto-dismiss after 6s if user doesn't click
var autoDismiss = setTimeout(function() { dismissIntro(); }, 8000);

function dismissIntro() {
  clearTimeout(autoDismiss);
  var intro = document.getElementById('intro');
  intro.classList.add('hide');
  document.body.classList.remove('intro-active');
  if (window._stopIntroCanvas) {
    setTimeout(window._stopIntroCanvas, 1400);
  }
  setTimeout(function() {
    intro.style.display = 'none';
  }, 1400);
}

// Also dismiss on any key press
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') dismissIntro();
}, {once: true});
// Scroll hint — dismiss intro and scroll to main content
var scrollHint = document.querySelector(".intro-scroll-hint");
if (scrollHint) {
  scrollHint.addEventListener("click", function() {
    dismissIntro();
    setTimeout(function() {
      var hero = document.getElementById("home");
      if (hero) hero.scrollIntoView({ behavior: "smooth" });
    }, 800);
  });
}

/* ── HAMBURGER MENU ── */
var hamburger = document.getElementById('navHamburger');
var mobileMenu = document.getElementById('navMobileMenu');

function closeMobileMenu() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

if (hamburger) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// Close on scroll
window.addEventListener('scroll', function() {
  closeMobileMenu();
}, { passive: true });
