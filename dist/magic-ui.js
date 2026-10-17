/* OWNGROUND × Magic UI motion layer
 * Magic UI 컴포넌트 7종을 브랜드 기준(structured minimal, restrained green)에 맞춰
 * 바닐라 CSS/JS로 옮긴 시안. 기존 site-shell + index 패치 구조는 건드리지 않고,
 * iframe 로드 후 별도 레이어로 주입한다. 모든 효과는 prefers-reduced-motion에서 꺼진다.
 */
(() => {
  // Text Animate · Animated Beam (hero / gap / platform) · FROM DATA structure + beam · Magic Card · Scroll Progress
  const EFFECTS = ['text', 'herobeam', 'evidence', 'gapbeam', 'platbeam', 'spotlight', 'progress'].map(key => ({ key }));

  const CSS = `
  @media (prefers-reduced-motion: reduce){
    .mu-beam, .mu-beam-dot, .mu-progress{display:none!important}
    .hero-title .mu-line{animation:none!important;opacity:1!important;filter:none!important;transform:none!important}
    #from-data .evidence-layer b, #from-data .evidence-layer small, #from-data .evidence-node{opacity:1!important;filter:none!important;transform:none!important;transition:none!important}
  }

  /* ---- Text Animate (blur-in, line by line) ---- */
  .mu-text .hero-title .mu-line{display:inline-block;opacity:0;filter:blur(10px);transform:translateY(14px);
    animation:mu-blur-in .9s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:calc(var(--i)*.14s + .15s)}
  @keyframes mu-blur-in{to{opacity:1;filter:blur(0);transform:none}}

  /* ---- Animated Beam (shared) ---- */
  .mu-beam{fill:none;stroke-linecap:round;pointer-events:none;opacity:0;transition:opacity .4s}
  html.mu-herobeam .mu-beam[data-g="hero"],
  html.mu-gapbeam  .mu-beam[data-g="gap"],
  html.mu-platbeam .mu-beam[data-g="plat"]{opacity:1}
  .mu-beam-dot{opacity:0;transition:opacity .4s;pointer-events:none}
  html.mu-herobeam .mu-beam-dot{opacity:1}

  /* ---- 02 FROM DATA: one measured structure for spine + underlines ----
     The original skewed guide box and three separate underlines are replaced by a single SVG drawn
     through the real node positions. Tone and weight deepen toward FIELD; connectors take the tone
     of the layer they arrive at. */
  html.mu-evidence #from-data .evidence-depth-guide,
  html.mu-evidence #from-data .evidence-line{visibility:hidden}
  .mu-ev{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:0;display:none}
  html.mu-evidence .mu-ev{display:block}
  .mu-ev path{fill:none;stroke-linecap:round}
  html.mu-evidence #from-data .evidence-layer b,
  html.mu-evidence #from-data .evidence-layer small{opacity:0;filter:blur(5px);transition:opacity .6s ease,filter .6s ease}
  html.mu-evidence #from-data .evidence-layer.mu-on b,
  html.mu-evidence #from-data .evidence-layer.mu-on small{opacity:1;filter:none}
  html.mu-evidence #from-data .evidence-node{opacity:0;transform:scale(.4);
    transition:opacity .25s ease,transform .35s cubic-bezier(.3,1.4,.5,1),background-color .35s ease}
  html.mu-evidence #from-data .evidence-layer.mu-on .evidence-node{opacity:1;transform:none}
  html.mu-evidence #from-data .evidence-layer-field.mu-on .evidence-node{background:var(--green)}
  /* OPERATION sits on the DATA→FIELD line so the spine stays one straight line (value set by JS). */
  html.mu-evidence #from-data .evidence-layer-operation{left:var(--mu-x,12%)!important}

  /* ---- 06 ECOSYSTEM: Magic Card spotlight ---- */
  .mu-spotlight .ecosystem-role{position:relative;isolation:isolate}
  .mu-spotlight .ecosystem-role::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:0;
    background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(32,94,69,.075),transparent 62%);
    transition:opacity .35s}
  .mu-spotlight .ecosystem-role::after{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;pointer-events:none;opacity:0;
    background:radial-gradient(180px circle at var(--mx,50%) 0,var(--green),transparent 70%);transition:opacity .35s}
  .mu-spotlight .ecosystem-role:hover::before,.mu-spotlight .ecosystem-role:hover::after{opacity:1}

  /* ---- Scroll Progress ---- */
  .mu-progress{position:fixed;left:0;top:85px;height:2px;width:100%;transform-origin:0 50%;transform:scaleX(var(--p,0));
    background:var(--green);z-index:999;pointer-events:none;display:none}
  html.mu-progress-on .mu-progress{display:block}
  `;

  function inject(doc) {
    const win = doc.defaultView;
    const root = doc.documentElement;
    const reduce = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const style = doc.createElement('style'); style.id = 'mu-style'; style.textContent = CSS;
    doc.head.appendChild(style);
    const NS = 'http://www.w3.org/2000/svg';

    // Visibility gate: beams run only while their section is on screen (CPU-friendly).
    const live = new Map();
    const io = new win.IntersectionObserver(es => es.forEach(e => {
      e.target.classList.toggle('mu-in', e.isIntersecting);
      (live.get(e.target) || []).forEach(a => e.isIntersecting ? a.play() : a.pause());
    }), { threshold: 0.25 });
    const watch = (sec, anims) => { live.set(sec, (live.get(sec) || []).concat(anims)); io.observe(sec); anims.forEach(a => a.pause()); };

    // ---- Text Animate: split hero title by <br> lines
    const h1 = doc.querySelector('#brand-core .hero-title');
    if (h1 && !h1.dataset.mu) {
      h1.dataset.mu = '1';
      const parts = h1.innerHTML.split(/<br\s*\/?>/i);
      h1.innerHTML = parts.map((t, i) => `<span class="mu-line" style="--i:${i}">${t}</span>`).join('<br>');
    }

    // ---- Beam factory: a short bright segment travelling along an existing path
    function beam(path, group, { width = 2.2, seg = 0.16, dur = 2600, delay = 0, reverse = false } = {}) {
      const L = path.getTotalLength(); const s = L * seg;
      const b = path.cloneNode(false);
      // The site sets pathLength on motion paths for its draw-in reveal; the beam needs real units.
      ['class', 'style', 'mask', 'pathLength', 'stroke-dasharray', 'stroke-dashoffset'].forEach(k => b.removeAttribute(k));
      b.setAttribute('class', 'mu-beam'); b.dataset.g = group;
      b.setAttribute('stroke', '#2f8a63'); b.setAttribute('stroke-width', width);
      b.setAttribute('stroke-dasharray', `${s} ${L + s}`);
      path.after(b);
      const from = reverse ? -L : s, to = reverse ? s : -L;
      return b.animate([{ strokeDashoffset: from }, { strokeDashoffset: to }],
        { duration: dur, delay, iterations: Infinity, easing: 'cubic-bezier(.45,0,.3,1)' });
    }

    if (!reduce) {
      // 01 HERO: signal travels TODAY → NEXT, with a small leading dot
      const hero = doc.querySelector('#brand-core');
      const curve = hero && hero.querySelector('path.hero-curve');
      if (curve) {
        const a = [beam(curve, 'hero', { width: 2.6, seg: .14, dur: 3400, delay: 600 })];
        const dot = doc.createElementNS(NS, 'circle');
        dot.setAttribute('r', 3.6); dot.setAttribute('fill', '#205e45'); dot.setAttribute('class', 'mu-beam-dot');
        curve.after(dot);
        const L = curve.getTotalLength();
        const pts = Array.from({ length: 41 }, (_, i) => curve.getPointAtLength(L * i / 40));
        a.push(dot.animate(pts.map((p, i) => ({ transform: `translate(${p.x}px,${p.y}px)`, opacity: i < 3 || i > 37 ? 0 : 1 })),
          { duration: 3400, delay: 600, iterations: Infinity, easing: 'cubic-bezier(.45,0,.3,1)' }));
        watch(hero, a);
      }

      // 04 THE GAP: signals along the two primary links, faint ones along a few secondaries
      const gap = doc.querySelector('#the-gap');
      if (gap) {
        const prim = [...gap.querySelectorAll('path.network-line.primary')];
        const sec = [...gap.querySelectorAll('path.network-line:not(.primary)')].filter(p => p.getTotalLength() > 250);
        const a = prim.map((p, i) => beam(p, 'gap', { width: 2.4, dur: 3000, delay: i * 1500 }))
          .concat(sec.map((p, i) => beam(p, 'gap', { width: 1.3, seg: .12, dur: 4200, delay: 800 + i * 1100 })));
        watch(gap, a);
      }

      // 05 PLATFORM: four domains → MOP
      const plat = doc.querySelector('#the-platform');
      if (plat) {
        const prim = [...plat.querySelectorAll('svg.platform-connections path.platform-line.primary')];
        const a = prim.map((p, i) => beam(p, 'plat', { width: 2.4, seg: .13, dur: 3200, delay: i * 800 }));
        watch(plat, a);
      }

    }

    // 02 FROM DATA: DATA → OPERATION → FIELD as one measured structure.
    // One straight spine runs DATA → FIELD without stopping; each underline starts the moment the
    // spine's tip passes that layer's node. OPERATION is placed on the spine so the line stays straight.
    // Built for everyone (the structure itself is the fix); only the drawing needs motion.
    const fd = doc.querySelector('#from-data');
    const evLayers = fd && fd.querySelector('.evidence-layers');
    if (evLayers) {
      const keys = ['data', 'operation', 'field'];
      const layerEls = keys.map(k => evLayers.querySelector(`.evidence-layer-${k}`));
      const TONE = ['rgba(137,154,145,.62)', 'rgba(96,118,106,.88)', '#205e45'];
      const UNDER_W = [1, 1, 2];
      const SPINE_MS = 1150, UNDER_MS = [620, 620, 820];
      const svg = doc.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'mu-ev'); svg.setAttribute('aria-hidden', 'true');
      evLayers.prepend(svg);
      let spine = null, unders = [], beamPath = null, at = [], running = [], timers = [], inView = false;

      const mk = (d, stroke, w) => {
        const p = doc.createElementNS(NS, 'path');
        p.setAttribute('d', d); p.setAttribute('stroke', stroke); p.setAttribute('stroke-width', w);
        svg.appendChild(p); return p;
      };
      const dash = p => { const L = p.getTotalLength(); p.setAttribute('stroke-dasharray', `${L} ${L}`); p._len = L; return p; };
      const build = () => {
        // Layout offsets, not getBoundingClientRect: the site's own reveal motion translates these
        // layers while it plays, and the structure must sit on their resting positions.
        const W = evLayers.offsetWidth, H = evLayers.offsetHeight;
        if (!W) return;
        const op = layerEls[1];
        op.style.removeProperty('--mu-x');
        // Node centre = layer's left edge, 0.5px above its bottom (.evidence-node: 8px, bottom:-3.5px).
        const node = l => ({ x: l.offsetLeft, y: l.offsetTop + l.offsetHeight - 0.5, xr: l.offsetLeft + l.offsetWidth });
        const a = node(layerEls[0]), c = node(layerEls[2]);
        const yb = op.offsetTop + op.offsetHeight - 0.5;
        const tB = (yb - a.y) / (c.y - a.y);
        op.style.setProperty('--mu-x', `${a.x + (c.x - a.x) * tB}px`);
        const pt = [a, node(op), c];
        at = [0, tB, 1];   // where along the spine each node sits

        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        svg.replaceChildren();
        // Spine tone deepens toward FIELD, matching each layer's underline at its node.
        const g = doc.createElementNS(NS, 'linearGradient');
        g.id = 'mu-ev-tone'; g.setAttribute('gradientUnits', 'userSpaceOnUse');
        g.setAttribute('x1', a.x); g.setAttribute('y1', a.y); g.setAttribute('x2', c.x); g.setAttribute('y2', c.y);
        g.innerHTML = TONE.map((t, i) => `<stop offset="${at[i]}" stop-color="${t}"/>`).join('');
        const defs = doc.createElementNS(NS, 'defs'); defs.appendChild(g); svg.appendChild(defs);
        spine = dash(mk(`M${a.x} ${a.y}L${c.x} ${c.y}`, 'url(#mu-ev-tone)', 1.25));
        unders = pt.map((p, i) => dash(mk(`M${p.x} ${p.y}H${p.xr}`, TONE[i], UNDER_W[i])));
        // The Animated Beam used elsewhere: down the spine, then a short run along FIELD.
        beamPath = mk(`M${a.x} ${a.y}L${c.x} ${c.y}H${c.x + (c.xr - c.x) * .35}`, '#2f8a63', 2.2);
        beamPath.setAttribute('class', 'mu-beam'); beamPath.dataset.g = 'ev';
      };
      const clear = () => {
        running.forEach(x => x.cancel()); running = [];
        timers.forEach(t => win.clearTimeout(t)); timers = [];
        if (beamPath) beamPath.style.opacity = 0;
      };
      const settle = () => {   // final, complete state (reduced motion, resize while visible)
        clear();
        [spine, ...unders].forEach(p => p && (p.style.strokeDashoffset = 0));
        layerEls.forEach(l => l.classList.add('mu-on'));
      };
      const reset = () => {
        clear();
        [spine, ...unders].forEach(p => p && (p.style.strokeDashoffset = p._len));
        layerEls.forEach(l => l.classList.remove('mu-on'));
      };
      const play = () => {
        if (reduce) return settle();
        reset();
        const t0 = 150;
        // Linear, so the tip passes each node exactly at at[i] * SPINE_MS.
        running.push(spine.animate([{ strokeDashoffset: spine._len }, { strokeDashoffset: 0 }],
          { duration: SPINE_MS, delay: t0, easing: 'linear', fill: 'forwards' }));
        unders.forEach((u, i) => {
          const start = t0 + at[i] * SPINE_MS;
          timers.push(win.setTimeout(() => inView && layerEls[i].classList.add('mu-on'), start));
          running.push(u.animate([{ strokeDashoffset: u._len }, { strokeDashoffset: 0 }],
            { duration: UNDER_MS[i], delay: start, easing: 'cubic-bezier(.3,0,.2,1)', fill: 'forwards' }));
        });
        const done = t0 + SPINE_MS + UNDER_MS[2];
        const L = beamPath.getTotalLength(), seg = L * .14;
        beamPath.setAttribute('stroke-dasharray', `${seg} ${L + seg}`);
        timers.push(win.setTimeout(() => { if (inView) beamPath.style.opacity = 1; }, done + 500));
        running.push(beamPath.animate(
          [{ strokeDashoffset: seg, offset: 0 }, { strokeDashoffset: -L, offset: .62 }, { strokeDashoffset: -L, offset: 1 }],
          { duration: 4600, delay: done + 500, iterations: Infinity, easing: 'cubic-bezier(.45,0,.3,1)', fill: 'backwards' }));
      };
      build(); reduce ? settle() : reset();
      new win.IntersectionObserver(es => {
        const v = es[0].isIntersecting;
        if (v && !inView) { inView = true; play(); }
        else if (!v && inView) { inView = false; reduce ? settle() : reset(); }
      }, { threshold: 0.35 }).observe(fd);
      let rz = 0;
      win.addEventListener('resize', () => { win.clearTimeout(rz); rz = win.setTimeout(() => { build(); inView || reduce ? settle() : reset(); }, 150); });
    }

    // 06 ECOSYSTEM spotlight follows cursor
    doc.querySelectorAll('#ecosystem .ecosystem-role').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

    // Scroll progress
    const bar = doc.createElement('div'); bar.className = 'mu-progress'; doc.body.appendChild(bar);
    const head = doc.querySelector('.site-head');
    const onScroll = () => {
      const se = doc.scrollingElement; const max = se.scrollHeight - win.innerHeight;
      bar.style.setProperty('--p', max > 0 ? (se.scrollTop / max).toFixed(4) : 0);
      if (head) bar.style.top = (head.getBoundingClientRect().bottom - 1) + 'px';
    };
    win.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    return {
      set(key, on) {
        root.classList.toggle(key === 'progress' ? 'mu-progress-on' : 'mu-' + key, on);
      },
      replayText() {
        if (!h1) return;
        h1.querySelectorAll('.mu-line').forEach(l => { l.style.animation = 'none'; void l.offsetWidth; l.style.animation = ''; });
      }
    };
  }

  const frame = document.querySelector('#preview');
  frame.addEventListener('load', () => {
    // Runs after the existing index.html load handler (registered earlier), so all
    // Narrative v0.2 sections (incl. 02 FROM DATA) already exist.
    setTimeout(() => {
      const doc = frame.contentDocument;
      if (!doc || doc.getElementById('mu-style')) return;
      const api = inject(doc);
      EFFECTS.forEach(e => api.set(e.key, true));
    }, 60);
  });
})();
