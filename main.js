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
