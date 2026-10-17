/* OWNGROUND × Magic UI motion layer — Downloads
 * 다운로드 페이지는 "확인하고 받는" 실무 페이지라 홈보다 효과를 덜 쓴다.
 * 무결성(SHA-256)·설치 신뢰를 보여주는 데 쓰이는 효과만 고른다.
 * 모든 효과는 prefers-reduced-motion에서 꺼진다.
 */
(() => {
  const EFFECTS = [
    { key: 'text',    name: 'Text Animate', where: '상단 OWNGROUND DOWNLOADS' },
    { key: 'fade',    name: 'Blur Fade',    where: '제품 카드 순차 등장' },
    { key: 'hyper',   name: 'Hyper Text',   where: 'SHA-256 해시 검증 표시' },
    { key: 'border',  name: 'Border Beam',  where: '다운로드 버튼 (hover·focus)' },
    { key: 'copy',    name: 'Animated Button', where: 'COPY → 복사됨 전환' },
    { key: 'ripple',  name: 'Ripple',       where: 'OGoperation 링 아이콘' },
  ];
  const doc = document, root = doc.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = doc.createElement('style');
  css.textContent = `
  @media (prefers-reduced-motion: reduce){
    .mu-line{animation:none!important;opacity:1!important;filter:none!important;transform:none!important}
    .product-card,.intro p{opacity:1!important;filter:none!important;transform:none!important;transition:none!important}
    .mu-ripple,.download .mu-bb{display:none!important}
  }
  /* Text Animate */
  html.mux-text h1 .mu-line{display:block;opacity:0;filter:blur(10px);transform:translateY(14px);
    animation:mu-in .9s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:calc(var(--i)*.16s + .1s)}
  @keyframes mu-in{to{opacity:1;filter:blur(0);transform:none}}

  /* Blur Fade: cards start visible-but-soft only when JS has armed them, never hidden at rest */
  html.mux-fade .intro p,html.mux-fade .product-card.mu-armed{opacity:0;filter:blur(6px);transform:translateY(16px);
    transition:opacity .8s ease,filter .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}
  html.mux-fade .intro p{animation:mu-in .9s cubic-bezier(.2,.7,.2,1) .45s forwards}
  html.mux-fade .product-card.mu-armed.mu-seen{opacity:1;filter:none;transform:none}

  /* Hyper Text: digits settle left→right; the settled part takes the brand green for a moment */
  .mu-hash{font-variant-numeric:tabular-nums}
  .mu-hash .mu-ok{color:var(--green);transition:color 1.4s ease}
  .mu-hash.mu-done .mu-ok{color:inherit}

  /* Border Beam on download buttons (hover/focus only, one quiet pass) */
  .download{isolation:isolate}
  .download .mu-bb{position:absolute;inset:-1px;pointer-events:none;opacity:0;z-index:1;
    padding:1px;border-radius:0;
    background:conic-gradient(from var(--a,0deg),transparent 0 78%,#5cc28c 88%,transparent 96%);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
    -webkit-mask-composite:xor;mask-composite:exclude}
  @property --a{syntax:'<angle>';inherits:false;initial-value:0deg}
  html.mux-border .download:not([aria-disabled="true"]):is(:hover,:focus-visible) .mu-bb{opacity:1;animation:mu-spin 1.8s linear infinite}
  @keyframes mu-spin{to{--a:360deg}}

  /* Animated Button: COPY ↔ 복사됨 */
  html.mux-copy .copy{position:relative;overflow:hidden;transition:border-color .2s,color .2s}
  html.mux-copy .copy.mu-copied{border-color:var(--green);color:var(--green)}
  html.mux-copy .copy .mu-face{display:inline-block;animation:mu-flip .32s cubic-bezier(.2,.7,.2,1)}
  @keyframes mu-flip{from{transform:translateY(110%);opacity:0}to{transform:none;opacity:1}}

  /* Ripple around the Green Ring */
  .ring{position:relative}
  .mu-ripple{position:absolute;inset:0;pointer-events:none;display:none}
  html.mux-ripple .mu-ripple{display:block}
  .mu-ripple i{position:absolute;inset:0;border:1px solid var(--green);border-radius:50%;opacity:0;
    animation:mu-ring 4.2s cubic-bezier(.2,.6,.3,1) infinite}
  .mu-ripple i:nth-child(2){animation-delay:1.4s}.mu-ripple i:nth-child(3){animation-delay:2.8s}
  @keyframes mu-ring{0%{transform:scale(.92);opacity:.42}100%{transform:scale(1.9);opacity:0}}
  `;
  doc.head.appendChild(css);

  // ---- Text Animate: split h1 into its two lines (text + span)
  const h1 = doc.querySelector('.intro h1');
  if (h1) {
    const brand = h1.firstChild.textContent.trim(), sub = h1.querySelector('span');
    h1.innerHTML = `<span class="mu-line" style="--i:0;color:inherit">${brand}</span>`;
    if (sub) { sub.classList.add('mu-line'); sub.style.setProperty('--i', 1); h1.appendChild(sub); }
  }

  // ---- Blur Fade: arm only cards below the fold, so the first frame stays complete
  const cards = [...doc.querySelectorAll('.product-card')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('mu-seen'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  cards.forEach(c => { if (c.getBoundingClientRect().top > innerHeight * 0.9) { c.classList.add('mu-armed'); io.observe(c); } });

  // ---- Hyper Text on SHA-256 values
  const HEX = '0123456789ABCDEF';
  const scramble = el => {
    const target = el.dataset.muHash; const n = target.length;
    if (reduce || !root.classList.contains('mux-hyper')) { el.innerHTML = target + verified(); el.classList.add('mu-done'); return; }
    el.classList.remove('mu-done');
    const start = performance.now(), dur = 1100;
    const tick = now => {
      const p = Math.min(1, (now - start) / dur), k = Math.floor(p * n);
      let rnd = ''; for (let i = k; i < n; i++) rnd += HEX[(Math.random() * 16) | 0];
      el.innerHTML = `<span class="mu-ok">${target.slice(0, k)}</span>${rnd}`;
      if (p < 1) requestAnimationFrame(tick);
      else { el.innerHTML = `<span class="mu-ok">${target}</span>${verified()}`; requestAnimationFrame(() => el.classList.add('mu-done')); }
    };
    requestAnimationFrame(tick);
  };
  const verified = () => '';
  const hio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { scramble(e.target); hio.unobserve(e.target); }
  }), { threshold: 0.6 });
  const armHashes = () => doc.querySelectorAll('.hash-row > span:first-child').forEach(s => {
    const v = s.textContent.trim();
    if (s.dataset.muHash || !/^[0-9A-F]{64}$/i.test(v)) return;
    s.dataset.muHash = v; s.classList.add('mu-hash'); s.setAttribute('aria-label', v);
    hio.observe(s);
  });

  // ---- Border Beam layer + Ripple, re-applied when release cards re-render
  const decorate = () => {
    doc.querySelectorAll('.download').forEach(a => { if (!a.querySelector('.mu-bb')) a.insertAdjacentHTML('afterbegin', '<span class="mu-bb" aria-hidden="true"></span>'); });
    armHashes();
  };
  const ring = doc.querySelector('#ogoperation .ring');
  if (ring) ring.insertAdjacentHTML('beforeend', '<span class="mu-ripple" aria-hidden="true"><i></i><i></i><i></i></span>');
  decorate();
  new MutationObserver(decorate).observe(doc.querySelector('.products'), { childList: true, subtree: true });

  // ---- Animated copy button: watch the page's own text change (it writes "복사됨"/"COPIED")
  new MutationObserver(ms => ms.forEach(m => {
    const b = m.target.nodeType === 1 ? m.target.closest?.('.copy') : m.target.parentElement?.closest('.copy');
    if (!b || !root.classList.contains('mux-copy') || b.querySelector('.mu-face')) return;
    const txt = b.textContent; const copied = !/^(COPY|コピー|COPIAR|SAO CHÉP|SALIN|คัดลอก)$/.test(txt.trim());
    b.classList.toggle('mu-copied', copied);
    b.innerHTML = `<span class="mu-face">${copied ? '✓ ' : ''}${txt}</span>`;
  })).observe(doc.querySelector('.products'), { characterData: true, childList: true, subtree: true });

  const set = (k, on) => root.classList.toggle('mux-' + k, on);
  EFFECTS.forEach(e => set(e.key, true));
})();
