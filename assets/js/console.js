// Consola del hero: reproduce una investigación del agente con datos ficticios.
// Cada escenario: pregunta → vueltas con herramientas en paralelo → vuelta final
// sin herramientas → respuesta estructurada.
import { SCENARIOS } from './content.js';

const SPIN = ['◐', '◓', '◑', '◒'];

export function initConsole({ getLang, reduced }) {
  const root = document.querySelector('.console');
  if (!root) return { restart() {} };
  const body = root.querySelector('.console__body');
  const meta = Object.fromEntries([...root.querySelectorAll('[data-m]')].map((el) => [el.dataset.m, el]));
  const next = root.querySelector('.console__next');

  let index = 0;
  let run = 0; // token de cancelación
  let visible = true;

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.1 }).observe(root);

  const sleep = async (ms, token) => {
    const end = performance.now() + ms;
    while (performance.now() < end || !visible) {
      if (token !== run) throw new Error('cancel');
      await new Promise((r) => setTimeout(r, Math.min(60, Math.max(0, end - performance.now())) || 60));
    }
    if (token !== run) throw new Error('cancel');
  };

  const line = (cls, html = '') => {
    const el = document.createElement('div');
    el.className = `c-line ${cls}`;
    el.innerHTML = html;
    body.appendChild(el);
    while (body.children.length > 40) body.firstChild.remove();
    return el;
  };

  const setMeta = (k, v) => { meta[k].textContent = v; };

  async function type(el, text, token, speed = 22) {
    el.classList.add('caret');
    for (let i = 1; i <= text.length; i++) {
      el.textContent = text.slice(0, i);
      await sleep(speed, token);
    }
    el.classList.remove('caret');
  }

  function renderStatic(sc, lang) {
    body.innerHTML = '';
    line('c-q').textContent = sc.q[lang];
    sc.turns.forEach((turn, t) => {
      line('c-turn', `· ${lang === 'es' ? 'vuelta' : 'turn'} ${t + 1} — ${turn.length} ${lang === 'es' ? 'herramientas en paralelo' : 'tools in parallel'}`);
      turn.forEach(([n, ms, sz]) => line('c-tool done', `<span class="st">✓</span><span class="nm">${n}</span><span class="ms">${ms} ms</span><span class="sz">${sz}</span>`));
    });
    line('c-turn', `· ${lang === 'es' ? 'vuelta' : 'turn'} ${sc.turns.length + 1} — ${lang === 'es' ? 'respuesta, sin herramientas' : 'answer, no tools'}`);
    const ans = line('c-ans');
    ans.innerHTML = answerHead(sc, lang);
    ans.insertAdjacentText('beforeend', sc.a[lang]);
    finalMeta(sc);
  }

  const answerHead = (sc, lang) => {
    const sev = lang === 'es' ? sc.sev : sc.sevEn;
    return `<header><span class="sev-${sev}">${lang === 'es' ? 'severidad' : 'severity'} · ${sev}</span><span>${lang === 'es' ? 'responsable' : 'owner'} · ${sc.who[lang]}</span></header>`;
  };

  const finalMeta = (sc) => {
    setMeta('turns', sc.meta.turns);
    setMeta('tools', sc.meta.tools);
    setMeta('cache', sc.meta.cache);
    setMeta('secs', sc.meta.secs);
  };

  async function play(sc, token) {
    const lang = getLang();
    body.innerHTML = '';
    ['turns', 'tools', 'cache'].forEach((k) => setMeta(k, 0));
    setMeta('secs', '0.0');
    const total = parseFloat(sc.meta.secs);
    const t0 = performance.now();
    const clock = setInterval(() => {
      if (token !== run) return clearInterval(clock);
      // el reloj simulado corre ~6x más rápido que el real
      setMeta('secs', Math.min(total, ((performance.now() - t0) / 1000) * 6).toFixed(1));
    }, 80);

    try {
      await sleep(300, token);
      await type(line('c-q'), sc.q[lang], token, 26);
      await sleep(450, token);

      let tools = 0;
      for (let t = 0; t < sc.turns.length; t++) {
        const turn = sc.turns[t];
        setMeta('turns', t + 1);
        line('c-turn', `· ${lang === 'es' ? 'vuelta' : 'turn'} ${t + 1} — ${turn.length} ${lang === 'es' ? 'herramientas en paralelo' : 'tools in parallel'}`);
        await sleep(250, token);
        const rows = turn.map(([n]) => line('c-tool', `<span class="st">${SPIN[0]}</span><span class="nm">${n}</span><span class="ms">…</span><span class="sz"></span>`));
        // todas arrancan juntas; cada una termina según su latencia
        let pending = turn.length;
        let frame = 0;
        const doneAt = turn.map(([, ms]) => performance.now() + 500 + ms * 2.2);
        while (pending > 0) {
          frame++;
          const now = performance.now();
          turn.forEach(([, ms, sz], i) => {
            const row = rows[i];
            if (row.classList.contains('done')) return;
            if (now >= doneAt[i]) {
              row.classList.add('done');
              row.querySelector('.st').textContent = '✓';
              row.querySelector('.ms').textContent = `${ms} ms`;
              row.querySelector('.sz').textContent = sz;
              pending--;
              tools++;
              setMeta('tools', tools);
            } else {
              row.querySelector('.st').textContent = SPIN[frame % 4];
            }
          });
          setMeta('cache', Math.round((sc.meta.cache * tools) / sc.meta.tools));
          await sleep(90, token);
        }
        await sleep(350, token);
      }

      setMeta('turns', sc.turns.length + 1);
      line('c-turn', `· ${lang === 'es' ? 'vuelta' : 'turn'} ${sc.turns.length + 1} — ${lang === 'es' ? 'respuesta, sin herramientas' : 'answer, no tools'}`);
      await sleep(600, token);
      const ans = line('c-ans');
      ans.innerHTML = answerHead(sc, lang);
      const text = document.createElement('span');
      ans.appendChild(text);
      const words = sc.a[lang].split(' ');
      text.classList.add('caret');
      for (let i = 1; i <= words.length; i++) {
        text.textContent = words.slice(0, i).join(' ');
        await sleep(45, token);
      }
      text.classList.remove('caret');
      clearInterval(clock);
      finalMeta(sc);
      await sleep(7000, token);
      index = (index + 1) % SCENARIOS.length;
      start();
    } catch {
      clearInterval(clock);
    }
  }

  function start() {
    run++;
    const sc = SCENARIOS[index];
    if (reduced) return renderStatic(sc, getLang());
    play(sc, run);
  }

  next.addEventListener('click', () => {
    index = (index + 1) % SCENARIOS.length;
    start();
  });

  start();
  return { restart: start };
}
