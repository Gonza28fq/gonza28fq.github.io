// Genera los PDF del CV desde cv-es.html y cv-en.html usando Microsoft Edge
// en modo headless (protocolo DevTools). Sin dependencias: solo Node 22+.
//
//   node cv/build-pdf.mjs
//
// Necesita un servidor local sirviendo la carpeta del portfolio, por ejemplo:
//   python -m http.server 5173
// (se usa http:// y no file:// para que carguen las fuentes de Google).
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.CV_BASE || 'http://127.0.0.1:5173';
const EDGE = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);

const JOBS = [
  { page: 'cv/cv-es.html', out: 'Gonzalo_Pedraza_Developer.pdf', label: 'Gonzalo Iván Pedraza — CV' },
  { page: 'cv/cv-en.html', out: 'Gonzalo_Iván_Pedraza_Resume.pdf', label: 'Gonzalo Iván Pedraza — Resume' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
if (!EDGE) throw new Error('No encontré Microsoft Edge.');

const port = 9400 + Math.floor(Math.random() * 400);
const proc = spawn(EDGE, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'cvpdf-'))}`, 'about:blank'], { stdio: 'ignore' });

let wsUrl;
for (let i = 0; i < 60 && !wsUrl; i++) {
  await sleep(200);
  try {
    wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page')?.webSocketDebuggerUrl;
  } catch { /* todavía arrancando */ }
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Page.enable');
await send('Runtime.enable');

const footer = (label) => `
  <div style="width:100%;padding:0 14mm;font-family:Consolas,monospace;font-size:7px;color:#8a877e;display:flex;justify-content:space-between;">
    <span>${label} · gonza28fq.github.io</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;

try {
  for (const job of JOBS) {
    await send('Page.navigate', { url: `${BASE}/${job.page}` });
    // espera a que carguen las fuentes y las imágenes
    for (let i = 0; i < 50; i++) {
      await sleep(200);
      const r = await send('Runtime.evaluate', {
        expression: `document.readyState === 'complete' && document.fonts.status === 'loaded' && [...document.images].every(i => i.complete)`,
        returnByValue: true,
      });
      if (r.result?.result?.value) break;
    }
    await sleep(300);
    const pdf = await send('Page.printToPDF', {
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: footer(job.label),
    });
    if (!pdf.result) throw new Error(`Falló ${job.page}: ${JSON.stringify(pdf.error)}`);
    writeFileSync(join(ROOT, job.out), Buffer.from(pdf.result.data, 'base64'));
    console.log(`✓ ${job.out}`);
  }
} finally {
  ws.close();
  proc.kill();
}
process.exit(0);
