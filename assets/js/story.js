// Scrollytelling "De pipeline a agente": los pasos de la izquierda activan una
// etapa y el diagrama reacomoda sus nodos; las aristas se recalculan en cada
// frame mientras dura la transición.
import { STAGES, DIAGRAM } from './content.js';

const RING = {
  es: 'solo lectura · lista blanca de tablas · PII enmascarado · topes de vueltas · ',
  en: 'read-only · table allowlist · PII masked · turn caps · ',
};

export function initStory({ getLang, reduced }) {
  const stepsEl = document.querySelector('.story__steps');
  const diagram = document.querySelector('.diagram');
  if (!stepsEl || !diagram) return { render() {} };

  const svg = diagram.querySelector('.diagram__edges');
  const nodesEl = diagram.querySelector('.diagram__nodes');
  const ring = diagram.querySelector('.diagram__ring');
  const dots = [...document.querySelectorAll('.story__dots li')];
  const nodes = {};
  let current = 's1';
  let rafUntil = 0;

  for (const [key, def] of Object.entries(DIAGRAM.nodes)) {
    const el = document.createElement('div');
    el.className = `node${def.kind ? ` node--${def.kind}` : ''}`;
    el.dataset.key = key;
    nodesEl.appendChild(el);
    nodes[key] = el;
  }

  function renderSteps() {
    const lang = getLang();
    stepsEl.innerHTML = STAGES.map((s, i) => `
      <article class="step${s.id === current ? ' is-active' : ''}" data-stage="${s.id}">
        <p class="step__when"><b>${i + 1}</b>${s.when[lang]}</p>
        <h3>${s.title[lang]}</h3>
        <p>${s.text[lang]}</p>
        <div class="chips">${s.chips[lang].map((c) => `<span class="chip">${c}</span>`).join('')}</div>
        ${s.metric ? `<div class="step__metric"><b>${s.metric.value < 0 ? '−' : ''}${Math.abs(s.metric.value)}${s.metric.unit}</b><span>${s.metric.label[lang]}</span></div>` : ''}
      </article>`).join('');
    observeSteps();
  }

  function renderLabels() {
    const lang = getLang();
    for (const [key, def] of Object.entries(DIAGRAM.nodes)) {
      const override = def.stageLabel?.[current];
      nodes[key].textContent = (override || def.label)[lang];
    }
    const text = RING[lang].repeat(lang === 'es' ? 2 : 3);
    ring.innerHTML = `<svg viewBox="0 0 100 100"><defs><path id="ring-path" d="M50,50 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"/></defs><text><textPath href="#ring-path" textLength="293">${text}</textPath></text></svg>`;
  }

  function setStage(id) {
    current = id;
    const stage = DIAGRAM.stages[id];
    renderLabels(); // primero los textos: el ancho de cada nodo depende de su etiqueta
    placeNodes();
    nodes.llm.classList.toggle('pulse', id === 's3');
    ring.classList.toggle('is-on', !!stage.ring);
    const idx = STAGES.findIndex((s) => s.id === id);
    dots.forEach((d, i) => d.classList.toggle('is-on', i <= idx));
    stepsEl.querySelectorAll('.step').forEach((s) => s.classList.toggle('is-active', s.dataset.stage === id));
    animateEdges();
  }

  // Posiciona en px y limita cada nodo para que no se salga del recuadro
  // (en pantallas chicas las etiquetas largas se cortaban en los bordes).
  function placeNodes() {
    const stage = DIAGRAM.stages[current];
    const W = diagram.clientWidth;
    const H = diagram.clientHeight;
    const M = 8;
    for (const [key, el] of Object.entries(nodes)) {
      const p = stage.pos[key];
      if (!p) { el.classList.remove('is-on'); continue; }
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = Math.min(Math.max((p[0] / 100) * W, w / 2 + M), W - w / 2 - M);
      const y = Math.min(Math.max((p[1] / 100) * H, h / 2 + M), H - h / 2 - M);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.classList.add('is-on');
    }
  }

  // ── Aristas ──
  function center(el, box) {
    const r = el.getBoundingClientRect();
    return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
  }

  function drawEdges() {
    const box = diagram.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    const { edges } = DIAGRAM.stages[current];
    const set = new Set(edges.map(([a, b]) => `${a}>${b}`));
    let html = '';
    for (const [a, b] of edges) {
      const A = center(nodes[a], box);
      const B = center(nodes[b], box);
      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const len = Math.hypot(dx, dy) || 1;
      // si existe la arista inversa, separamos los dos carriles
      const bend = set.has(`${b}>${a}`) ? 9 : 0;
      const mx = (A.x + B.x) / 2 + (-dy / len) * bend;
      const my = (A.y + B.y) / 2 + (dx / len) * bend;
      const d = `M${A.x.toFixed(1)},${A.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${B.x.toFixed(1)},${B.y.toFixed(1)}`;
      html += `<path d="${d}"/><path class="flow" d="${d}"/>`;
    }
    svg.innerHTML = html;
  }

  function animateEdges() {
    rafUntil = performance.now() + (reduced ? 0 : 1300);
    const tick = (t) => {
      drawEdges();
      if (t < rafUntil) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ── Activación por scroll ──
  // En escritorio se activa por scroll vertical (el diagrama queda fijo al costado).
  // En pantallas chicas los pasos son tarjetas que se deslizan de costado:
  // se activa la que está a la vista dentro del carrusel.
  const mobile = matchMedia('(max-width: 860px)');
  let io;
  function observeSteps() {
    io?.disconnect();
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && e.target.dataset.stage !== current) setStage(e.target.dataset.stage);
      }
    }, mobile.matches
      ? { root: stepsEl, threshold: 0.6 }
      : { rootMargin: '-45% 0px -45% 0px' });
    stepsEl.querySelectorAll('.step').forEach((s) => io.observe(s));
  }
  mobile.addEventListener('change', observeSteps);

  // En mobile, las rayitas debajo del esquema llevan a cada tarjeta
  dots.forEach((d, i) => d.addEventListener('click', () => {
    if (!mobile.matches) return;
    const step = stepsEl.querySelectorAll('.step')[i];
    if (step) stepsEl.scrollTo({ left: step.offsetLeft - stepsEl.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
  }));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { placeNodes(); animateEdges(); }, 120);
  }, { passive: true });

  renderSteps();
  setStage('s1');

  return {
    render() {
      renderSteps();
      renderLabels();
      placeNodes();
      animateEdges();
    },
  };
}
