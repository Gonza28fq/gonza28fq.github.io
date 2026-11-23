import { EN, WORK, FEATURED, OTHERS, BADGES, DEGREES, STACK, PRINCIPLES, AUTOMATIONS } from './content.js';
import { initStory } from './story.js';
import { initConsole } from './console.js';
import { initField } from './field.js';
import { runIntro } from './intro.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const CV = { es: 'Gonzalo_Pedraza_Developer.pdf', en: 'Gonzalo_Iv%C3%A1n_Pedraza_Resume.pdf' };
const EMAIL = 'gonza280797@hotmail.com';
const GH_USER = 'Gonza28fq';

/* ═══════════ i18n ═══════════ */
// El español se toma del propio HTML, así no se duplica.
// Claves que solo usa el JS (no están en el HTML).
const ES = {
  'work.more': 'Detalle',
  'work.less': 'Cerrar',
  'projects.live': 'Ver en vivo',
  'projects.pushed': 'último push',
  'projects.shots': 'Pantallas',
  'projects.zoom': 'Ampliar pantalla',
  'projects.note': 'Capturas en local con datos inventados.',
  'certs.verify': 'Verificar',
  'certs.qr': 'Ver QR de validación',
  'contact.copied': 'Copiado',
  'auto.features': 'Qué hace',
};
$$('[data-i18n]').forEach((el) => { ES[el.dataset.i18n] = el.textContent; });
$$('[data-i18n-html]').forEach((el) => { ES[el.dataset.i18nHtml] = el.innerHTML; });
$$('[data-i18n-placeholder]').forEach((el) => { ES[el.dataset.i18nPlaceholder] = el.placeholder; });
const DICT = { es: ES, en: EN };

let lang = (() => {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'es') return q;
  return localStorage.getItem('lang') || (navigator.language?.startsWith('es') ? 'es' : 'en');
})();
const getLang = () => lang;
const t = (k) => DICT[lang][k] ?? ES[k] ?? k;

function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  $$('[data-lang-opt]').forEach((el) => el.classList.toggle('is-on', el.dataset.langOpt === lang));
  $$('[data-cv]').forEach((el) => { el.href = CV[lang]; });
  document.title = lang === 'es' ? 'Gonzalo Pedraza — Backend Developer · IA aplicada' : 'Gonzalo Pedraza — Backend Developer · Applied AI';
}

function setLang(next) {
  if (next === lang) return;
  lang = next;
  localStorage.setItem('lang', lang);
  applyLang();
  renderAll();
  story.render();
  consoleDemo.restart();
  fillGitHub();
}

/* ═══════════ Render de listas ═══════════ */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function renderWork() {
  $('.work__grid').innerHTML = WORK.map((w, i) => `
    <article class="card reveal${w.size ? ` card--${w.size}` : ''}" style="transition-delay:${(i % 3) * 70}ms">
      <p class="card__area">${w.area[lang]}${w.status ? `<span class="card__status card__status--${w.status.kind}">${w.status[lang]}</span>` : ''}</p>
      <h4>${w.title[lang]}</h4>
      <p class="card__sum">${w.summary[lang]}</p>
      <div class="card__metric"><b>${w.metric}</b><span>${w.metricLabel[lang]}</span></div>
      <div class="card__details" id="wd-${i}"><ul>${w.details[lang].map((d) => `<li>${d}</li>`).join('')}</ul></div>
      <div class="card__foot">
        <div class="card__tags">${w.tags.map((x) => `<span>${x}</span>`).join('')}</div>
        <button class="card__toggle" type="button" aria-expanded="false" aria-controls="wd-${i}"><i></i><span>${t('work.more')}</span></button>
      </div>
    </article>`).join('');
}

function renderProjects() {
  $('.featured').innerHTML = FEATURED.map((p) => `
    <article class="proj reveal" style="--accent:${p.accent}">
      <div class="proj__visual">
      <a class="proj__media" href="${p.live}" target="_blank" rel="noopener" aria-label="${esc(p.name.replace(/<[^>]+>/g, ''))} — ${p.liveLabel ? p.liveLabel[lang] : t('projects.live')}">
        <div class="frame">
          <div class="frame__bar"><i></i><span>${p.live.replace(/^https:\/\/(www\.)?/, '')}</span></div>
          <img src="${p.img}" alt="" loading="lazy" width="1200" height="750">
        </div>
      </a>
      ${p.gallery ? `<div class="shots" role="group" aria-label="${t('projects.shots')}">
        ${p.gallery.map((g, i) => `<button class="shot${i === 0 ? ' is-on' : ''}" type="button" data-src="${g.src}" aria-pressed="${i === 0}"><img src="${g.thumb}" alt="" loading="lazy" width="360" height="225"><span>${g.label[lang]}</span></button>`).join('')}
        <button class="shots__zoom" type="button" aria-label="${t('projects.zoom')}" title="${t('projects.zoom')}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9"/></svg></button>
      </div>
      <p class="shots__note">${p.note ? p.note[lang] : t('projects.note')}</p>` : ''}
      </div>
      <div class="proj__body">
        <div class="proj__meta"><span class="kind">${p.kind[lang]}</span><span>${p.year}</span></div>
        <h3>${p.name}</h3>
        <p>${p.desc[lang]}</p>
        <div class="chips">${p.stack.map((s) => `<span class="chip">${s}</span>`).join('')}</div>
        <div class="proj__links">
          <a class="btn btn--signal" href="${p.live}" target="_blank" rel="noopener">${p.liveLabel ? p.liveLabel[lang] : t('projects.live')} ↗</a>
          ${p.repo ? `<a class="btn btn--ghost" href="https://github.com/${GH_USER}/${p.repo}" target="_blank" rel="noopener">GitHub</a>` : ''}
        </div>
        ${p.repo ? `<p class="proj__live" data-repo="${p.repo.toLowerCase()}"></p>` : ''}
      </div>
    </article>`).join('');

  $('.others').innerHTML = OTHERS.map((o) => `
    <li class="reveal">
      <a class="row" href="${o.href}" target="_blank" rel="noopener">
        <span class="yr">${o.year}</span>
        <span class="nm">${o.name[lang]}</span>
        <span class="wt">${o.what[lang]}</span>
        <span class="sk">${o.stack}</span>
        <span class="ar">↗</span>
      </a>
      ${o.doc ? `<a class="doc" href="${o.doc}" target="_blank" rel="noopener">${lang === 'es' ? 'Documentación técnica (PDF)' : 'Technical documentation (PDF)'}</a>` : ''}
    </li>`).join('');
}

function renderCerts() {
  $('.badges').innerHTML = BADGES.map((b, i) => `
    <a class="badge reveal" style="transition-delay:${(i % 2) * 80}ms" href="${b.verify}" target="_blank" rel="noopener">
      <img src="assets/img/badges/${b.slug}.png" alt="Claude Academy — ${b.title}" loading="lazy" width="1200" height="630">
      <div class="badge__foot"><strong>${b.title}</strong><span>${t('certs.verify')} ↗</span></div>
    </a>`).join('');

  $('.degrees__list').innerHTML = DEGREES.map((d) => `
    <button class="degree" type="button" data-qr="${d.qr}">
      <img src="${d.qr}" alt="" loading="lazy">
      <div><strong>${d.title[lang]}</strong><span>${t('certs.qr')}</span></div>
    </button>`).join('');
}

function renderStack() {
  $('.stack__grid').innerHTML = STACK.map((s) => `
    <div class="stack__col reveal"><h4>${s.group[lang]}</h4><ul>${s.items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`).join('');
}

function renderAbout() {
  $('.principles').innerHTML = PRINCIPLES.map((p, i) => `
    <li class="principle reveal" style="transition-delay:${i * 60}ms">
      <span class="principle__n">${String(i + 1).padStart(2, '0')}</span>
      <div><h4>${p.title[lang]}</h4><p>${p.text[lang]}</p></div>
    </li>`).join('');
}

function renderAutomations() {
  $('.auto__list').innerHTML = AUTOMATIONS.map((a, i) => `
    <article class="bot reveal">
      <header class="bot__head">
        <div>
          <p class="bot__status"><i></i>${a.status[lang]}</p>
          <h4>${a.name[lang]}</h4>
        </div>
        <a class="link-arrow" href="https://github.com/${GH_USER}/${a.repo}" target="_blank" rel="noopener">GitHub ↗</a>
      </header>
      <p class="bot__pitch">${a.pitch[lang]}</p>
      <div class="flow" style="--n:${a.flow.length};--delay:${i * -1.3}s" aria-label="${esc(a.flow.join(' → '))}">
        ${a.flow.map((f, j) => `<span class="flow__node" style="--j:${j}">${f}</span>`).join('<span class="flow__wire"><i></i></span>')}
      </div>
      <p class="bot__label">${t('auto.features')}</p>
      <ul class="bot__features">${a.features[lang].map((f) => `<li>${f}</li>`).join('')}</ul>
      <div class="chips">${a.stack.map((s) => `<span class="chip">${s}</span>`).join('')}</div>
    </article>`).join('');
}

function renderAll() {
  renderAbout();
  renderAutomations();
  renderWork();
  renderProjects();
  renderCerts();
  renderStack();
  observeReveals();
  bindDynamic();
}

/* ═══════════ Reveal al hacer scroll ═══════════ */
const revealIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      revealIO.unobserve(e.target);
    }
  }
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

function observeReveals() {
  $$('.reveal:not(.is-in)').forEach((el) => {
    if (reduced) el.classList.add('is-in');
    else revealIO.observe(el);
  });
}

/* ═══════════ Interacciones de elementos renderizados ═══════════ */
function bindDynamic() {
  $$('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    const btn = $('.card__toggle', card);
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
      $('span', btn).textContent = open ? t('work.less') : t('work.more');
    });
  });

  if (!reduced && matchMedia('(pointer: fine)').matches) {
    $$('.proj__media').forEach((m) => {
      const frame = $('.frame', m);
      m.addEventListener('pointermove', (e) => {
        const r = m.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        frame.style.setProperty('--ry', `${x * 7}deg`);
        frame.style.setProperty('--rx', `${-y * 7}deg`);
      });
      m.addEventListener('pointerleave', () => {
        frame.style.setProperty('--ry', '0deg');
        frame.style.setProperty('--rx', '0deg');
      });
    });
  }

  $$('[data-qr]').forEach((b) => b.addEventListener('click', () => openLightbox(b.dataset.qr)));
}

/* ═══════════ Lightbox y toast ═══════════ */
const lightbox = $('.lightbox');
function openLightbox(src, wide = false) {
  lightbox.classList.toggle('is-shot', wide);
  $('img', lightbox).src = src;
  lightbox.hidden = false;
}

/* Galería de pantallas de cada proyecto: cambia la captura principal y la amplía */
document.addEventListener('click', (e) => {
  const shot = e.target.closest('.shot');
  const zoom = e.target.closest('.shots__zoom');
  if (!shot && !zoom) return;
  const img = $('.frame img', e.target.closest('.proj'));
  if (zoom) { openLightbox(img.src, true); return; }
  if (shot.classList.contains('is-on')) return;
  $$('.shot', shot.parentElement).forEach((b) => { b.classList.toggle('is-on', b === shot); b.setAttribute('aria-pressed', b === shot); });
  img.classList.add('is-swap');
  setTimeout(() => {
    img.onload = () => img.classList.remove('is-swap');
    img.src = shot.dataset.src;
    if (img.complete) img.classList.remove('is-swap');
  }, 220);
});
lightbox.addEventListener('click', () => { lightbox.hidden = true; });

let toastTimer;
function toast(msg) {
  const el = $('.toast');
  el.textContent = msg;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 1800);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL);
    toast(`${t('contact.copied')} · ${EMAIL}`);
  } catch {
    location.href = `mailto:${EMAIL}`;
  }
}
$$('[data-copy]').forEach((b) => b.addEventListener('click', copyEmail));

/* ═══════════ Contadores ═══════════ */
function initCounters() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const target = Number(e.target.dataset.count);
      const sign = target < 0 ? '−' : '';
      const abs = Math.abs(target);
      if (reduced) { e.target.textContent = sign + abs; continue; }
      const t0 = performance.now();
      const dur = 1600;
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        e.target.textContent = sign + Math.round(abs * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => io.observe(el));
}

/* ═══════════ Nav, progreso y sección activa ═══════════ */
function initChrome() {
  const nav = $('.nav');
  const bar = $('.progress span');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('is-scrolled', y > 20);
    nav.classList.toggle('is-hidden', y > window.innerHeight * 0.9 && y > lastY + 4 && !document.body.classList.contains('palette-open'));
    if (y < lastY - 4) nav.classList.remove('is-hidden');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = $$('.nav__links a');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
    }
  }, { rootMargin: '-40% 0px -55% 0px' });
  $$('main > section[id]').forEach((s) => io.observe(s));

  $('.lang').addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));
}

/* ═══════════ Paleta de comandos ═══════════ */
function initPalette() {
  const pal = $('.palette');
  const input = $('.palette__input', pal);
  const list = $('.palette__list', pal);
  const empty = $('.palette__empty', pal);
  let items = [];
  let sel = 0;

  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  const open = (url) => () => window.open(url, '_blank', 'noopener');
  const commands = () => {
    const es = lang === 'es';
    const nav = es ? 'ir a' : 'go to';
    const act = es ? 'acción' : 'action';
    const link = 'link';
    return [
      { label: es ? 'Inicio' : 'Home', hint: nav, run: go('top') },
      { label: t('nav.about'), hint: nav, run: go('sobre-mi') },
      { label: es ? 'Automatizaciones e integraciones' : 'Automations & integrations', hint: nav, run: () => $('.auto')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }) },
      { label: t('nav.case') + ' — ' + (es ? 'De pipeline a agente' : 'From pipeline to agent'), hint: nav, run: go('caso') },
      { label: t('nav.work'), hint: nav, run: go('experiencia') },
      { label: t('nav.projects'), hint: nav, run: go('proyectos') },
      { label: t('nav.certs'), hint: nav, run: go('certificaciones') },
      { label: 'Stack', hint: nav, run: go('stack') },
      { label: t('nav.contact'), hint: nav, run: go('contacto') },
      { label: es ? 'Switch to English' : 'Cambiar a español', hint: act, run: () => setLang(es ? 'en' : 'es') },
      { label: es ? 'Copiar email' : 'Copy email', hint: act, run: copyEmail },
      { label: es ? 'Descargar CV (español)' : 'Download CV (Spanish)', hint: act, run: open(CV.es) },
      { label: es ? 'Descargar CV (inglés)' : 'Download resume (English)', hint: act, run: open(CV.en) },
      ...FEATURED.map((p) => ({ label: `${p.name.replace(/<[^>]+>/g, '')} — ${es ? 'ver en vivo' : 'view live'}`, hint: link, run: open(p.live) })),
      { label: 'GitHub', hint: link, run: open(`https://github.com/${GH_USER}`) },
      { label: 'LinkedIn', hint: link, run: open('https://www.linkedin.com/in/gonzalo-pedraza-b8b568298') },
    ];
  };

  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  function render() {
    const q = norm(input.value.trim());
    items = commands().filter((c) => !q || norm(c.label).includes(q) || norm(c.hint).includes(q));
    sel = Math.min(sel, Math.max(0, items.length - 1));
    list.innerHTML = items.map((c, i) => `<li role="option" data-i="${i}" class="${i === sel ? 'is-sel' : ''}" aria-selected="${i === sel}">${esc(c.label)}<small>${c.hint}</small></li>`).join('');
    empty.hidden = items.length > 0;
  }
  function show() {
    pal.hidden = false;
    document.body.classList.add('palette-open');
    input.value = '';
    sel = 0;
    render();
    input.focus();
  }
  function hide() {
    pal.hidden = true;
    document.body.classList.remove('palette-open');
  }
  function exec(i) {
    const c = items[i];
    if (!c) return;
    hide();
    c.run();
  }

  input.addEventListener('input', () => { sel = 0; render(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(1, items.length); render(); list.children[sel]?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + items.length) % Math.max(1, items.length); render(); list.children[sel]?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter') { e.preventDefault(); exec(sel); }
  });
  list.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) exec(Number(li.dataset.i)); });
  list.addEventListener('pointermove', (e) => {
    const li = e.target.closest('li');
    if (li && Number(li.dataset.i) !== sel) { sel = Number(li.dataset.i); render(); }
  });
  pal.addEventListener('click', (e) => { if (e.target === pal) hide(); });
  $$('[data-open-palette]').forEach((b) => b.addEventListener('click', show));

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? show() : hide(); }
    else if (e.key === 'Escape') { if (!pal.hidden) hide(); if (!lightbox.hidden) lightbox.hidden = true; }
    else if (e.key === '/' && pal.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); show(); }
  });
}

/* ═══════════ Datos en vivo de GitHub ═══════════ */
let repos = null;
async function loadRepos() {
  const KEY = 'gh-repos-v1';
  try {
    const cached = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (cached && Date.now() - cached.at < 30 * 60 * 1000) return cached.data;
  } catch { /* cache corrupta: se ignora */ }
  const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const json = await res.json();
  const data = Object.fromEntries(json.map((r) => [r.name.toLowerCase(), { pushed: r.pushed_at, language: r.language }]));
  sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data }));
  return data;
}

function ago(iso) {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const s = (new Date(iso) - Date.now()) / 1000;
  const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
  for (const [u, sec] of units) if (Math.abs(s) >= sec) return rtf.format(Math.round(s / sec), u);
  return rtf.format(0, 'minute');
}

async function fillGitHub() {
  try {
    repos ??= await loadRepos();
  } catch {
    return; // sin red o rate limit: la sección queda sin el dato, no se rompe nada
  }
  $$('.proj__live[data-repo]').forEach((el) => {
    const r = repos[el.dataset.repo];
    if (!r) return;
    el.innerHTML = `<i></i>GitHub · ${t('projects.pushed')} ${ago(r.pushed)}${r.language ? ` · ${r.language}` : ''}`;
  });
  const site = repos[`${GH_USER.toLowerCase()}.github.io`];
  if (site) {
    const f = $('.footer__updated');
    $('time', f).dateTime = site.pushed;
    $('time', f).textContent = new Date(site.pushed).toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    f.hidden = false;
  }
}

/* ═══════════ Arranque ═══════════ */
applyLang();
renderAll();
initChrome();
initCounters();
initPalette();
initField({ reduced });
const story = initStory({ getLang, reduced });
const consoleDemo = initConsole({ getLang, reduced });
fillGitHub();

// Entrada del hero cuando las fuentes están listas (con tope por si tardan)
$$('.hero__copy > *:not(h1), .console').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${0.25 + i * 0.08}s`;
});
// La intro (si corresponde) va primero; el hero se anima cuando la cortina sube.
Promise.all([
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]),
  runIntro(lang),
]).then(() => {
  requestAnimationFrame(() => document.body.classList.add('is-ready'));
});
