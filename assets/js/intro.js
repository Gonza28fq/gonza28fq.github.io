// Intro de arranque (~2 s): líneas de consola, el nombre y un contador; después
// la pantalla se corre hacia arriba y revela el hero. Se puede saltar con clic o
// tecla, aparece una vez por sesión y nunca con movimiento reducido (eso lo
// decide un script inline en <head> agregando .no-intro antes de pintar).
const LINES = {
  es: ['iniciando gonza28fq.github.io', 'cargando proyectos', 'conectando agente', 'listo'],
  en: ['booting gonza28fq.github.io', 'loading projects', 'connecting agent', 'ready'],
};
const SKIP = { es: 'clic o cualquier tecla para saltar', en: 'click or press any key to skip' };

export function runIntro(lang) {
  const root = document.documentElement;
  const el = document.querySelector('.intro');
  if (!el || root.classList.contains('no-intro')) {
    el?.remove();
    return Promise.resolve();
  }

  const log = el.querySelector('.intro__log');
  const count = el.querySelector('.intro__count');
  const bar = el.querySelector('.intro__bar span');
  el.querySelector('.intro__skip').textContent = SKIP[lang];

  const TOTAL = 1900;
  const timers = [];
  let done = false;
  let resolveFn;
  const finished = new Promise((r) => { resolveFn = r; });

  LINES[lang].forEach((text, i) => {
    timers.push(setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'intro__line';
      const last = i === LINES[lang].length - 1;
      line.innerHTML = `<span class="p">›</span> ${text}${last ? '' : '<span class="dots"></span><span class="ok">✓</span>'}`;
      log.appendChild(line);
    }, 120 + i * 260));
  });
  timers.push(setTimeout(() => el.classList.add('show-name'), 900));

  const t0 = performance.now();
  const tick = (now) => {
    if (done) return;
    const p = Math.min(1, (now - t0) / TOTAL);
    const eased = 1 - Math.pow(1 - p, 3);
    count.textContent = String(Math.round(eased * 100)).padStart(3, '0');
    bar.style.transform = `scaleX(${eased})`;
    if (p < 1) requestAnimationFrame(tick);
    else finish();
  };
  requestAnimationFrame(tick);

  function finish() {
    if (done) return;
    done = true;
    timers.forEach(clearTimeout);
    count.textContent = '100';
    bar.style.transform = 'scaleX(1)';
    try { sessionStorage.setItem('intro-seen', '1'); } catch { /* modo privado: se ignora */ }
    el.classList.add('is-out');
    root.classList.remove('intro-lock');
    removeEventListener('keydown', finish);
    el.removeEventListener('click', finish);
    // el hero arranca su animación mientras la cortina sube
    setTimeout(resolveFn, 250);
    setTimeout(() => el.remove(), 1100);
  }

  addEventListener('keydown', finish);
  el.addEventListener('click', finish);
  return finished;
}
