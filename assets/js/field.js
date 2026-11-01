// Fondo vivo en tres capas (la aurora es CSS; acá van las dos de canvas):
//  1. grilla de puntos tenue con una onda lenta y una lente bajo el cursor;
//  2. constelación: nodos que derivan sobre un campo de flujo, se enlazan por
//     cercanía y llevan "pulsos" de señal de un nodo a otro, como mensajes
//     entre agentes. El cursor atrae nodos cercanos y se conecta con ellos.
export function initField({ reduced }) {
  const canvas = document.getElementById('field');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const GAP = 34;
  const LENS = 180;
  const LINK = 140;
  const SIGNAL = [255, 91, 35];
  const PAPER = [238, 236, 228];

  let W = 0, H = 0, dpr = 1, cols = 0, rows = 0;
  let nodes = [];
  let pulses = [];
  let scrollY = window.scrollY;
  let lastPulse = 0;
  const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, active: false };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / GAP) + 1;
    rows = Math.ceil(H / GAP) + 1;
    const count = Math.round(Math.min(120, Math.max(38, (W * H) / 15000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: 0,
      vy: 0,
      depth: 0.15 + Math.random() * 0.55, // parallax: los "lejanos" se mueven menos
      hot: Math.random() < 0.12,          // algunos nodos son de señal
      r: 0.8 + Math.random() * 1.2,
    }));
    pulses = [];
  }

  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  // posición en pantalla con parallax según el scroll
  const sy = (n) => {
    const y = (n.y - scrollY * n.depth * 0.6) % H;
    return y < 0 ? y + H : y;
  };

  function drawGrid(time) {
    const offX = (W % GAP) / 2;
    const offY = (H % GAP) / 2;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = offX + i * GAP;
        const y = offY + j * GAP;
        const wave = Math.sin(i * 0.2 + j * 0.15 - time * 1.4) * 0.5 + 0.5;
        let a = 0.035 + wave * wave * 0.05;
        let r = 0.7;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LENS * LENS) {
          const k = 1 - Math.sqrt(d2) / LENS;
          a += k * k * 0.35;
          r += k * k * 0.9;
          ctx.fillStyle = rgba([255, Math.round(236 - 145 * k), Math.round(228 - 193 * k)], a);
        } else {
          ctx.fillStyle = rgba(PAPER, a);
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 6.2832);
        ctx.fill();
      }
    }
  }

  function step(time) {
    for (const n of nodes) {
      // campo de flujo suave (pseudo-ruido con senos)
      const ang = Math.sin(n.x * 0.0016 + time * 0.35) * Math.cos(n.y * 0.0019 - time * 0.27) * Math.PI * 1.6;
      n.vx += Math.cos(ang) * 0.012;
      n.vy += Math.sin(ang) * 0.012;
      // atracción leve hacia el cursor
      if (mouse.active) {
        const px = n.x;
        const py = sy(n);
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const d = Math.hypot(dx, dy);
        if (d < 240 && d > 30) {
          n.vx += (dx / d) * 0.018;
          n.vy += (dy / d) * 0.018;
        }
      }
      n.vx *= 0.965;
      n.vy *= 0.965;
      n.x += n.vx + 0.06;
      n.y += n.vy;
      if (n.x < -20) n.x += W + 40;
      if (n.x > W + 20) n.x -= W + 40;
      if (n.y < -20) n.y += H + 40;
      if (n.y > H + 20) n.y -= H + 40;
    }
  }

  function drawNetwork(now) {
    const pts = nodes.map((n) => ({ x: n.x, y: sy(n), n }));
    const links = [];
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK * LINK) continue;
        const k = 1 - Math.sqrt(d2) / LINK;
        const hot = a.n.hot || b.n.hot;
        ctx.strokeStyle = hot ? rgba(SIGNAL, k * 0.22) : rgba(PAPER, k * 0.1);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        links.push([i, j]);
      }
    }

    // enlaces al cursor
    if (mouse.active) {
      for (const p of pts) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d > 200) continue;
        const k = 1 - d / 200;
        ctx.strokeStyle = rgba(SIGNAL, k * 0.45);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 26);
      g.addColorStop(0, rgba(SIGNAL, 0.55));
      g.addColorStop(1, rgba(SIGNAL, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 26, 0, 6.2832);
      ctx.fill();
    }

    // nodos
    for (const p of pts) {
      if (p.n.hot) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9);
        g.addColorStop(0, rgba(SIGNAL, 0.5));
        g.addColorStop(1, rgba(SIGNAL, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, 6.2832);
        ctx.fill();
        ctx.fillStyle = rgba(SIGNAL, 0.95);
      } else {
        ctx.fillStyle = rgba(PAPER, 0.28 + p.n.depth * 0.4);
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.n.r, 0, 6.2832);
      ctx.fill();
    }

    // pulsos: nacen sobre un enlace existente y viajan de un nodo al otro
    if (links.length && now - lastPulse > 260) {
      lastPulse = now;
      const [i, j] = links[Math.floor(Math.random() * links.length)];
      pulses.push({ a: i, b: j, t0: now, dur: 700 + Math.random() * 700 });
    }
    pulses = pulses.filter((pl) => {
      const k = (now - pl.t0) / pl.dur;
      if (k >= 1) {
        // a veces el pulso sigue camino desde el nodo de llegada
        if (Math.random() < 0.45) {
          const next = links.find(([x, y]) => (x === pl.b && y !== pl.a) || (y === pl.b && x !== pl.a));
          if (next) pulses.push({ a: pl.b, b: next[0] === pl.b ? next[1] : next[0], t0: now, dur: pl.dur });
        }
        return false;
      }
      const A = pts[pl.a];
      const B = pts[pl.b];
      if (!A || !B || Math.hypot(A.x - B.x, A.y - B.y) > LINK * 1.2) return false;
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const x = A.x + (B.x - A.x) * e;
      const y = A.y + (B.y - A.y) * e;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
      g.addColorStop(0, rgba([255, 200, 170], 0.95));
      g.addColorStop(0.35, rgba(SIGNAL, 0.6));
      g.addColorStop(1, rgba(SIGNAL, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, 6.2832);
      ctx.fill();
      return true;
    });
    if (pulses.length > 40) pulses.splice(0, pulses.length - 40);
  }

  function frame(now) {
    const time = now * 0.001;
    mouse.x += (mouse.tx - mouse.x) * 0.14;
    mouse.y += (mouse.ty - mouse.y) * 0.14;
    ctx.clearRect(0, 0, W, H);
    drawGrid(time);
    if (!reduced) step(time);
    drawNetwork(now);
    if (!reduced && !document.hidden) requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { resize(); if (reduced) frame(0); }, { passive: true });
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;
    if (!mouse.active) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    mouse.active = true;
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { mouse.active = false; mouse.tx = mouse.ty = -1e4; });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !reduced) requestAnimationFrame(frame); });

  resize();
  requestAnimationFrame(frame);
}
