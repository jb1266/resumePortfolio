document.addEventListener('DOMContentLoaded', function() {
  // ── CONTACT LINKS (assembled in JS so no raw email in HTML) ──
  var links = [
    ['LinkedIn', 'https://www.linkedin.com/in/john-barr-539643393/'],
    ['GitHub', 'https://github.com/jb1266'],
  ];
  var fl = document.getElementById('footer-links');
  links.forEach(function(l) {
    var a = document.createElement('a');
    a.href = l[1]; a.textContent = l[0];
    fl.appendChild(a);
  });

  // ── CURSOR ──
  var dot = document.getElementById('cur-dot');
  var ring = document.getElementById('cur-ring');
  var mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // ── TRAIL SVG ICONS ──
  var ICONS = [
    // AWS
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#232F3E"/><text x="50" y="44" font-family="Arial Black,sans-serif" font-size="21" font-weight="900" fill="white" text-anchor="middle">aws</text><path d="M28 60 Q50 72 72 60" stroke="#FF9900" stroke-width="5" fill="none" stroke-linecap="round"/><polygon points="68,56 75,62 75,56" fill="#FF9900"/></svg>',
    // CloudWatch
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#E7157B"/><path d="M18 70 Q33 28 50 45 Q67 62 82 18" stroke="white" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="50" cy="52" r="6" fill="white"/><path d="M28 74 Q50 64 72 74" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
    // CodeBuild
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#3F48CC"/><rect x="28" y="18" width="9" height="62" rx="3" fill="white"/><rect x="28" y="18" width="44" height="9" rx="3" fill="white"/><rect x="63" y="27" width="9" height="32" rx="3" fill="white"/><text x="52" y="94" font-family="monospace" font-size="13" fill="white" text-anchor="middle">&lt;/&gt;</text></svg>',
    // CodeDeploy
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#4A6EBF"/><rect x="16" y="26" width="68" height="48" rx="6" fill="none" stroke="white" stroke-width="4"/><text x="50" y="58" font-family="monospace" font-size="22" fill="white" text-anchor="middle">&lt;/&gt;</text><circle cx="28" cy="38" r="4" fill="white" opacity="0.6"/></svg>',
    // CodePipeline
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#5A45A0"/><path d="M22 48 Q50 16 78 48" stroke="white" stroke-width="4" fill="rgba(255,255,255,.15)"/><line x1="33" y1="47" x2="50" y2="72" stroke="white" stroke-width="2.5"/><line x1="50" y1="32" x2="50" y2="72" stroke="white" stroke-width="2.5"/><line x1="67" y1="47" x2="50" y2="72" stroke="white" stroke-width="2.5"/><rect x="42" y="70" width="16" height="12" rx="3" fill="white"/></svg>',
    // EC2 Chip
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#ED7100"/><rect x="28" y="28" width="44" height="44" rx="6" fill="none" stroke="white" stroke-width="4"/><rect x="36" y="36" width="28" height="28" rx="3" fill="white" opacity="0.2"/><line x1="36" y1="18" x2="36" y2="28" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="18" x2="50" y2="28" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="64" y1="18" x2="64" y2="28" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="36" y1="72" x2="36" y2="82" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="72" x2="50" y2="82" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="64" y1="72" x2="64" y2="82" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="18" y1="36" x2="28" y2="36" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="18" y1="50" x2="28" y2="50" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="18" y1="64" x2="28" y2="64" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="72" y1="36" x2="82" y2="36" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="72" y1="50" x2="82" y2="50" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="72" y1="64" x2="82" y2="64" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>',
    // CloudFormation
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#E8702A"/><path d="M50 16 L76 30 L76 60 L50 74 L24 60 L24 30 Z" fill="none" stroke="white" stroke-width="4"/><path d="M50 30 L64 38 L64 54 L50 62 L36 54 L36 38 Z" fill="white" opacity="0.2"/></svg>',
    // Auto Scaling
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#3F8624"/><rect x="22" y="38" width="30" height="24" rx="4" fill="none" stroke="white" stroke-width="3.5"/><path d="M58 26 L78 26 L78 46" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="52" y1="50" x2="78" y2="26" stroke="white" stroke-width="3.5" stroke-linecap="round"/><path d="M40 74 L20 74 L20 54" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    // SNS
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#8C3494"/><circle cx="76" cy="26" r="11" fill="none" stroke="white" stroke-width="3.5"/><circle cx="76" cy="74" r="11" fill="none" stroke="white" stroke-width="3.5"/><circle cx="24" cy="50" r="11" fill="none" stroke="white" stroke-width="3.5"/><line x1="35" y1="44" x2="65" y2="30" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="35" y1="56" x2="65" y2="70" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>',
    // Git
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="white"/><path d="M50 6 L94 50 L50 94 L6 50 Z" fill="#F05032"/><path d="M56 36 L64 44 L44 64 L36 56 Z" fill="white"/><path d="M32 36 L40 44 L32 52 L24 44 Z" fill="white"/><circle cx="64" cy="36" r="8" fill="white"/><circle cx="36" cy="64" r="8" fill="white"/></svg>',
    // HTML5
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="white"/><path d="M16 10 L22 90 L50 98 L78 90 L84 10 Z" fill="#E44D26"/><path d="M50 88 L72 82 L78 26 L50 26 Z" fill="#F16529"/><path d="M50 56 L35 52 L34 42 L50 42 L50 32 L24 32 L25 48 L50 56 Z" fill="white"/><path d="M50 56 L65 52 L66.5 37 L50 37 L50 47 L64 47 L63 56 L50 59 Z" fill="white"/></svg>',
    // CSS3
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="white"/><path d="M16 10 L22 90 L50 98 L78 90 L84 10 Z" fill="#1572B6"/><path d="M50 88 L72 82 L78 26 L50 26 Z" fill="#33A9DC"/><path d="M50 60 L36 56 L35 46 L50 46 L50 36 L26 36 L27.5 54 L50 60 Z" fill="white"/><path d="M50 60 L64 56 L65.5 40 L50 40 L50 50 L63 50 L62 57 L50 60 Z" fill="white"/></svg>',
    // S3 Bucket
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#3F8624"/><path d="M28 36 Q28 24 50 24 Q72 24 72 36 L66 80 Q66 84 50 84 Q34 84 34 80 Z" fill="none" stroke="white" stroke-width="4"/><ellipse cx="50" cy="36" rx="22" ry="9" fill="none" stroke="white" stroke-width="4"/><line x1="34" y1="52" x2="66" y2="52" stroke="white" stroke-width="3" opacity="0.5"/></svg>',
    // SQL
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#0078D4"/><ellipse cx="50" cy="32" rx="24" ry="10" fill="#50A0DC"/><rect x="26" y="32" width="48" height="36" fill="#0078D4"/><ellipse cx="50" cy="68" rx="24" ry="10" fill="#50A0DC"/><ellipse cx="50" cy="32" rx="24" ry="10" fill="#50A0DC"/><text x="50" y="57" font-family="Arial,sans-serif" font-size="15" font-weight="bold" fill="white" text-anchor="middle">SQL</text></svg>',
    // WAF
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#7B2F8E"/><path d="M28 24 Q26 40 24 50 Q32 70 50 78 Q68 70 76 50 Q74 40 72 24 L50 20 Z" fill="none" stroke="white" stroke-width="4"/><path d="M20 48 Q32 42 42 46 L50 40 Q60 34 70 38" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="50" cy="56" r="9" fill="none" stroke="white" stroke-width="3"/></svg>',
    // GuardDuty
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#DD344C"/><circle cx="50" cy="50" r="32" fill="none" stroke="white" stroke-width="3.5"/><circle cx="50" cy="50" r="18" fill="none" stroke="white" stroke-width="2.5" opacity="0.5"/><path d="M50 70 Q40 58 43 46 Q47 52 50 50 Q52 42 58 34 Q61 46 57 52 Q63 48 63 58 Q61 68 50 70 Z" fill="white"/><line x1="50" y1="16" x2="50" y2="22" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="78" x2="50" y2="84" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="16" y1="50" x2="22" y2="50" stroke="white" stroke-width="3" stroke-linecap="round"/><line x1="78" y1="50" x2="84" y2="50" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>',
    // Azure
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#0078D4"/><path d="M20 68 L42 20 L60 20 L74 68 Z" fill="white" opacity="0.9"/><path d="M38 68 L58 68 L74 68 L58 36 Z" fill="#50ABF1"/><path d="M20 68 L50 54 L74 68 Z" fill="white" opacity="0.5"/></svg>',
    // Terminal
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#1C1C1C"/><rect x="10" y="10" width="80" height="80" rx="8" fill="#0D0D0D"/><text x="18" y="46" font-family="monospace" font-size="15" fill="#00FF41">$_</text><line x1="18" y1="58" x2="56" y2="58" stroke="#00FF41" stroke-width="2.5" opacity="0.6" stroke-linecap="round"/><line x1="18" y1="68" x2="42" y2="68" stroke="#00FF41" stroke-width="2.5" opacity="0.4" stroke-linecap="round"/><path d="M18 36 L28 44 L18 52" stroke="#00FF41" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    // Linux Tux
    '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#f5f5f5"/><ellipse cx="50" cy="63" rx="22" ry="26" fill="#1C1C1C"/><ellipse cx="50" cy="69" rx="13" ry="16" fill="#F5C842"/><ellipse cx="50" cy="33" rx="18" ry="18" fill="#1C1C1C"/><ellipse cx="43" cy="29" rx="5" ry="6" fill="white"/><ellipse cx="57" cy="29" rx="5" ry="6" fill="white"/><circle cx="44" cy="30" r="3" fill="#1C1C1C"/><circle cx="58" cy="30" r="3" fill="#1C1C1C"/><path d="M44 40 Q50 46 56 40 Q50 48 44 40 Z" fill="#F5C842"/><ellipse cx="39" cy="88" rx="9" ry="5" fill="#F5C842"/><ellipse cx="61" cy="88" rx="9" ry="5" fill="#F5C842"/><path d="M28 56 Q18 67 26 79" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M72 56 Q82 67 74 79" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round"/></svg>'
  ];

  var lastTrail = 0;
  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - lastTrail < 90) return;
    // suppress trail inside project cards and focus cards
    if (e.target.closest('.project-card, .focus-card')) return;
    lastTrail = now;
    var el = document.createElement('div');
    el.className = 'trail';
    el.innerHTML = ICONS[Math.floor(Math.random() * ICONS.length)];
    el.style.left = e.clientX + 'px';
    el.style.top  = e.clientY + 'px';
    document.body.appendChild(el);
    setTimeout(function() { el.parentNode && el.parentNode.removeChild(el); }, 1100);
  });

  // ── HERO WAVE DOT CANVAS ──
  var heroCanvas = document.getElementById('heroCanvas');
  var hctx = heroCanvas.getContext('2d');
  var hmx = -1000, hmy = -1000; // mouse relative to hero
  var heroEl = document.getElementById('hero');

  function resizeHeroCanvas() {
    heroCanvas.width  = heroEl.offsetWidth;
    heroCanvas.height = heroEl.offsetHeight;
  }
  resizeHeroCanvas();
  window.addEventListener('resize', resizeHeroCanvas);

  // Track mouse relative to hero section
  document.addEventListener('mousemove', function(e) {
    var rect = heroEl.getBoundingClientRect();
    hmx = e.clientX - rect.left;
    hmy = e.clientY - rect.top;
  });

  // Ripple pool — stores active mouse ripples
  var ripples = [];
  document.addEventListener('mousemove', function(e) {
    var rect = heroEl.getBoundingClientRect();
    // Only add ripple when mouse is over hero
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t: 0 });
      if (ripples.length > 6) ripples.shift();
    }
  });

  var SP = 30;  // dot spacing
  var T  = 0;   // global time

  (function drawHero() {
    T += 0.018;
    hctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

    var cols = Math.ceil(heroCanvas.width  / SP) + 2;
    var rows = Math.ceil(heroCanvas.height / SP) + 2;

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var bx = i * SP;
        var by = j * SP;

        // ── Wave 1: diagonal rolling wave ──
        var wave1 = Math.sin((bx * 0.022) + (by * 0.012) + T * 1.8) * 0.5 + 0.5;

        // ── Wave 2: perpendicular wave ──
        var wave2 = Math.sin((bx * 0.010) - (by * 0.025) + T * 1.2) * 0.5 + 0.5;

        // ── Wave 3: radial pulse from center ──
        var cx = heroCanvas.width  / 2;
        var cy = heroCanvas.height / 2;
        var distCenter = Math.sqrt((bx-cx)*(bx-cx) + (by-cy)*(by-cy));
        var wave3 = Math.sin(distCenter * 0.04 - T * 2.2) * 0.5 + 0.5;

        // Blend all three waves
        var waveBlend = (wave1 * 0.45) + (wave2 * 0.3) + (wave3 * 0.25);

        // ── Mouse proximity influence ──
        var distMouse = Math.sqrt((bx-hmx)*(bx-hmx) + (by-hmy)*(by-hmy));
        var mouseInf  = Math.max(0, 1 - distMouse / 140);

        // ── Ripple influence from mouse trail ──
        var rippleInf = 0;
        for (var r = 0; r < ripples.length; r++) {
          var rip = ripples[r];
          var rd  = Math.sqrt((bx-rip.x)*(bx-rip.x) + (by-rip.y)*(by-rip.y));
          var rWave = Math.sin(rd * 0.09 - rip.t * 3.5) * Math.max(0, 1 - rd / 180);
          rippleInf += rWave * Math.max(0, 1 - rip.t / 40);
        }
        rippleInf = Math.max(0, Math.min(1, rippleInf));

        // Combine all influences
        var totalInf = waveBlend + mouseInf * 0.6 + rippleInf * 0.5;

        // Dot size — much bigger on wave peaks
        var radius  = 1.5 + waveBlend * 4.5 + mouseInf * 3.0 + rippleInf * 2.5;

        // Opacity — more visible waves
        var opacity = 0.12 + waveBlend * 0.45 + mouseInf * 0.5 + rippleInf * 0.4;
        opacity = Math.min(0.88, opacity);

        // Color — grey base for waves, blue only near cursor
        var r255 = Math.round(160 - mouseInf * 123 - rippleInf * 60);
        var g255 = Math.round(175 - mouseInf * 138 - rippleInf * 80);
        var b255 = Math.round(192 + mouseInf * 63  + rippleInf * 40);

        hctx.beginPath();
        hctx.arc(bx, by, radius, 0, Math.PI * 2);
        hctx.fillStyle = 'rgba(' + r255 + ',' + g255 + ',' + b255 + ',' + opacity + ')';
        hctx.fill();
      }
    }

    // Age ripples
    for (var r = 0; r < ripples.length; r++) { ripples[r].t += 1; }
    ripples = ripples.filter(function(rp) { return rp.t < 50; });

    requestAnimationFrame(drawHero);
  })();

  // ── PAGE DOT CANVAS (outside hero — static subtle dots) ──
  var canvas = document.getElementById('dotCanvas');
  var ctx = canvas.getContext('2d');
  var cmx = -1000, cmy = -1000;

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  document.addEventListener('mousemove', function(e) { cmx = e.clientX; cmy = e.clientY; });

  (function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Only draw dots outside the hero section
    var heroBottom = heroEl.getBoundingClientRect().bottom + window.scrollY;
    var scrollY    = window.scrollY;
    var sp = 32;
    var cols = Math.ceil(canvas.width  / sp) + 2;
    var rows = Math.ceil(canvas.height / sp) + 2;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var x = i * sp, y = j * sp;
        // Skip dots in hero zone
        if ((y + scrollY) < heroBottom) continue;
        var d   = Math.sqrt((x-cmx)*(x-cmx) + (y-cmy)*(y-cmy));
        var inf = Math.max(0, 1 - d / 160);
        ctx.beginPath();
        ctx.arc(x, y, 1.5 + inf * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(160,175,200,' + (0.18 + inf * 0.45) + ')';
        ctx.fill();
      }
    }
    requestAnimationFrame(drawDots);
  })();

  // ── SCROLL REVEAL ──
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function(el) { observer.observe(el); });

}); // end DOMContentLoaded