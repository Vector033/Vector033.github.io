// Traces a request through the Project Z board: a pulse of current runs along
// each copper trace in order and lights the chip it arrives at.
(() => {
  const svg = document.querySelector('.pcb');
  if (!svg) return;

  const FLOWS = {
    login: {
      start: 'u4',
      steps: [['dash-auth'], ['auth-fs'], ['auth-fs', true], ['dash-auth', true]],
      text: 'The dashboard sends credentials to the Auth service, which checks the bcrypt hash in Firestore and returns a refreshable JWT. Ten attempts a minute, then HTTP 429. The other services verify the token themselves.',
    },
    chat: {
      start: 'u5',
      steps: [['widget-chat'], ['chat-gemini'], ['chat-gemini', true], ['chat-fs'], ['widget-chat', true]],
      text: "A visitor types in the widget. The Chat service streams Gemini's reply back token by token over SSE and saves both sides to Firestore. If a model is busy, it falls back through four tiers.",
    },
    lead: {
      start: 'u5',
      steps: [['widget-chat'], ['chat-fs']],
      text: 'A regex pass (under 0.5 ms) plus an intent gate pulls a name, email and phone number out of the conversation. Only the Chat service may create a lead; Analysis can only update one.',
    },
    handover: {
      start: 'u2',
      steps: [['chat-gemini'], ['chat-gemini', true], ['chat-redis'], ['redis-dash']],
      text: "When Gemini calls the request_human_agent tool, Chat publishes on Redis Pub/Sub and the merchant's dashboard gets a live alert to take the conversation over.",
    },
    analysis: {
      start: 'u4',
      steps: [['dash-analysis'], ['analysis-gemini'], ['analysis-gemini', true], ['analysis-fs']],
      text: 'After 10 closed chats, or a click on "Run AI Analysis", the Analysis service claims the job in a Firestore transaction, asks Gemini 3.1 Pro for sentiment, intent and a lead score, then partially updates the lead. With nothing to analyze it exits in about 36 ms with no Gemini calls.',
    },
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pulses = svg.querySelector('.pulses');
  const caption = document.getElementById('flow-caption');
  const buttons = [...document.querySelectorAll('.switches button')];
  const trace = (id) => svg.querySelector('#t-' + id);
  const chip = (id) => svg.querySelector('#' + id);
  let run = 0;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function light(id) {
    const c = chip(id);
    c.classList.remove('lit');
    void c.getBBox();
    c.classList.add('lit');
    setTimeout(() => c.classList.remove('lit'), 900);
  }

  function pulse(path, reverse, id) {
    const len = path.getTotalLength();
    const seg = 34;
    const p = path.cloneNode();
    p.removeAttribute('id');
    p.setAttribute('class', 'pulse');
    p.style.strokeDasharray = `${seg} ${len + seg}`;
    pulses.appendChild(p);
    const from = reverse ? -len : seg;
    const to = reverse ? seg : -len;
    const anim = p.animate(
      [{ strokeDashoffset: from }, { strokeDashoffset: to }],
      { duration: Math.min(900, Math.max(320, len * 2.6)), easing: 'cubic-bezier(.45,0,.25,1)' }
    );
    // The wake: copper brightens behind the pulse head, then settles to the lit level.
    const w = path.cloneNode();
    w.removeAttribute('id');
    w.setAttribute('class', 'wake');
    w.style.strokeDasharray = `${len} ${len}`;
    pulses.insertBefore(w, pulses.firstChild);
    w.animate(
      [{ strokeDashoffset: reverse ? -len : len }, { strokeDashoffset: 0 }],
      { duration: anim.effect.getTiming().duration, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'forwards' }
    );
    return anim.finished.then(() => {
      p.remove();
      if (id === run) path.classList.add('on');
      w.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: 'cubic-bezier(.16,1,.3,1)' })
        .finished.then(() => w.remove(), () => w.remove());
    }, () => p.remove());
  }

  async function play(name) {
    const flow = FLOWS[name];
    const id = ++run;
    pulses.replaceChildren();
    svg.querySelectorAll('.trace').forEach((t) => t.classList.remove('on'));
    svg.querySelectorAll('.chip').forEach((c) => c.classList.remove('in-flow', 'lit'));
    caption.textContent = flow.text;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.flow === name)));

    const touched = new Set([flow.start]);
    flow.steps.forEach(([t]) => {
      const el = trace(t);
      touched.add(el.dataset.a).add(el.dataset.b);
    });
    touched.forEach((c) => chip(c).classList.add('in-flow'));
    if (reduce.matches) {
      flow.steps.forEach(([t]) => trace(t).classList.add('on'));
      return;
    }

    light(flow.start);
    for (const [t, reverse] of flow.steps) {
      await wait(120);
      if (id !== run) return;
      const el = trace(t);
      await pulse(el, reverse, id);
      if (id !== run) return;
      light(reverse ? el.dataset.a : el.dataset.b);
    }
  }

  let touchedByUser = false;
  buttons.forEach((b) => b.addEventListener('click', () => {
    touchedByUser = true;
    play(b.dataset.flow);
  }));

  // Hovering a chip brightens every trace that touches it.
  svg.querySelectorAll('.chip').forEach((c) => {
    const near = [...svg.querySelectorAll(`.trace[data-a="${c.id}"], .trace[data-b="${c.id}"]`)];
    c.addEventListener('pointerenter', () => near.forEach((t) => t.classList.add('near')));
    c.addEventListener('pointerleave', () => near.forEach((t) => t.classList.remove('near')));
  });

  // Run the chat flow once when the board first comes into view.
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      setTimeout(() => { if (!touchedByUser) play('chat'); }, 450);
    }
  }, { threshold: 0.5 });
  io.observe(svg);
})();

// Page interactions: cursor, tilt, screenshot switchers and viewer, copy email, local clock.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  // Dual-layer cursor: the dot follows the pointer, the ring trails it and grows over anything clickable.
  if (fine && !reduce) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let x = -100, y = -100, rx = x, ry = y, s = 1, target = 1;
    document.documentElement.classList.add('has-cursor');
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const hot = e.target.closest('a, button, [role="button"], summary');
      target = hot ? 1.8 : 1;
      ring.classList.toggle('hover', !!hot);
    }, { passive: true });
    document.addEventListener('pointerleave', () => { x = y = -100; });
    (function frame() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; s += (target - s) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${s})`;
      requestAnimationFrame(frame);
    })();
  }

  // 3D tilt with a specular highlight that follows the pointer.
  if (fine && !reduce) {
    document.querySelectorAll('.tilt').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
        el.style.transition = 'transform .12s linear';
        el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 5}deg)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transition = ''; el.style.transform = ''; });
    });
  }

  // Screenshot & video tour switchers: each .gallery swaps its own image or feature video tour
  const viewer = document.getElementById('viewer');
  const viewerImg = document.getElementById('viewer-img');
  const viewerVideo = document.getElementById('viewer-video');
  document.querySelectorAll('.gallery').forEach((g) => {
    const shot = g.querySelector('.shot-open img');
    const video = g.querySelector('.shot-open video');
    const buttons = [...g.querySelectorAll('.switcher button')];
    buttons.forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.video) {
        if (shot) shot.style.display = 'none';
        if (video) {
          video.style.display = 'block';
          video.play().catch(() => {});
        }
      } else {
        if (video) {
          video.pause();
          video.style.display = 'none';
        }
        if (shot) {
          shot.style.display = 'block';
          shot.src = b.dataset.src;
          if (b.dataset.srcset) shot.srcset = b.dataset.srcset;
          shot.alt = b.dataset.alt;
        }
      }
      buttons.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    }));
    g.querySelector('.shot-open').addEventListener('click', () => {
      if (video && video.style.display !== 'none' && !video.paused) {
        video.pause();
        if (viewerVideo) {
          viewerVideo.src = video.src;
          viewerVideo.style.display = 'block';
          if (viewerImg) viewerImg.style.display = 'none';
          viewerVideo.play().catch(() => {});
        }
      } else {
        if (viewerVideo) {
          viewerVideo.pause();
          viewerVideo.style.display = 'none';
        }
        if (viewerImg) {
          viewerImg.style.display = 'block';
          viewerImg.src = shot.getAttribute('src');
          viewerImg.alt = shot.alt;
        }
      }
      viewer.showModal();
    });
  });
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer) {
      if (viewerVideo) viewerVideo.pause();
      viewer.close();
    }
  });
  viewer.addEventListener('close', () => {
    if (viewerVideo) viewerVideo.pause();
  });

  // Copy email.
  const copy = document.getElementById('copy-email');
  const status = document.getElementById('copy-status');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copy.dataset.email);
      copy.textContent = 'Copied!';
      status.textContent = 'Email address copied';
    } catch {
      copy.textContent = 'Copy failed';
      status.textContent = 'Could not copy. Select the address to copy it.';
    }
    setTimeout(() => { copy.textContent = 'Copy'; }, 2000);
  });

  // Local clock (Thailand is one time zone, named Asia/Bangkok).
  const time = document.getElementById('bkk-time');
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' });
  const tick = () => { const now = new Date(); time.textContent = fmt.format(now); time.dateTime = now.toISOString(); };
  tick();
  setInterval(tick, 15000);
})();

// Scroll motion: hero readings count up, sections rise in. Both skip reduced motion; content is visible without JS.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ease = (k) => 1 - Math.pow(1 - k, 3);

  // "90.3%" counts 0 → 90.3; "164/172" counts the first number and keeps "/172".
  const countUp = (el) => {
    const m = el.textContent.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!m || parseFloat(m[1]) === 0) return;
    const end = parseFloat(m[1]), dec = (m[1].split('.')[1] || '').length, rest = m[2], t0 = performance.now();
    el.style.minWidth = `${el.offsetWidth}px`; // no width jitter while digits change
    (function tick(now) {
      const k = Math.min(1, (now - t0) / 1200);
      el.textContent = (end * ease(k)).toFixed(dec) + rest;
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  };
  const counter = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { counter.unobserve(e.target); countUp(e.target); }
  }), { threshold: 0.6 });
  document.querySelectorAll('.g-num').forEach((n) => counter.observe(n));

  const targets = document.querySelectorAll('section:not(.hero) > h2, section:not(.hero) > .kicker, section:not(.hero) > .lede, .flagship, .bento .card, .side, .circuit, .skill-grid > *, .contact-copy, .contact-list');
  const reveal = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    reveal.unobserve(e.target);
    e.target.classList.add('revealed');
    e.target.addEventListener('transitionend', () => e.target.style.removeProperty('--d'), { once: true }); // tilt reset shouldn't wait for the stagger
  }), { rootMargin: '0px 0px -8% 0px' });
  targets.forEach((el) => {
    const i = [...el.parentElement.children].indexOf(el);
    if (el.parentElement.matches('.bento, .skill-grid')) el.style.setProperty('--d', `${i * 70}ms`);
    el.classList.add('reveal');
    reveal.observe(el);
  });
})();

// Ambient particles behind the page: slow drift, scroll parallax with inertia, a gentle push and faint links near the pointer.
(() => {
  const c = document.getElementById('bg-canvas');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!c || reduce.matches) return;
  const ctx = c.getContext('2d');
  const LINK = 120, PUSH = 140;
  let w = 0, h = 0, pts = [], mx = -1e4, my = -1e4, lastY = scrollY, drift = 0, raf = 0;

  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(80, Math.round((w * h) / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16, z: 0.4 + Math.random() * 0.6,
    }));
  };

  const frame = () => {
    drift += ((scrollY - lastY) - drift) * 0.08; // inertia: particles lag behind fast scrolls
    lastY = scrollY;
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy - drift * 0.12 * p.z;
      const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
      if (d < PUSH && d > 0.5) { const f = (1 - d / PUSH) * 0.8; p.x += (dx / d) * f; p.y += (dy / d) * f; }
      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > LINK) continue;
        const near = Math.max(0, 1 - Math.hypot((a.x + b.x) / 2 - mx, (a.y + b.y) / 2 - my) / 220);
        ctx.strokeStyle = `rgba(236, 72, 153, ${(1 - d / LINK) * (0.04 + near * 0.1)})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.fillStyle = `rgba(244, 114, 182, ${0.12 + a.z * 0.16})`;
      ctx.beginPath(); ctx.arc(a.x, a.y, 0.6 + a.z, 0, 6.283); ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };

  const start = () => { if (!raf && !document.hidden && !reduce.matches) raf = requestAnimationFrame(frame); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  size(); start();
  let resizing = 0;
  addEventListener('resize', () => { cancelAnimationFrame(resizing); resizing = requestAnimationFrame(size); });
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  document.addEventListener('pointerleave', () => { mx = my = -1e4; });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduce.addEventListener('change', () => { if (reduce.matches) { stop(); ctx.clearRect(0, 0, w, h); } });
})();
