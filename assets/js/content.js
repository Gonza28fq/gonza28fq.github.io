// Contenido del sitio. Los textos estáticos en español viven en index.html
// (atributos data-i18n) y se leen del DOM al iniciar; acá solo va el inglés.
// Las listas que se renderizan desde JS tienen ambos idiomas.

export const EN = {
  'nav.about': 'About',
  'nav.case': 'Case study',
  'nav.work': 'Experience',
  'nav.projects': 'Projects',
  'nav.certs': 'Certifications',
  'nav.stack': 'Stack',
  'nav.contact': 'Contact',
  'nav.cmd': 'Menu',

  'hero.status': 'Open to remote roles · Java backend · AI engineer',
  'hero.role': 'Software developer · English translator',
  'hero.lede': 'I build software for <em>real problems</em>: I listen to the people who live them, design something that works and <em>take ownership</em> of keeping it working. Today I work across backend, data and applied AI.',
  'hero.i1': 'Understand the problem before the code',
  'hero.i2': 'Deliver, measure and keep improving',
  'hero.i3': 'AI with judgment, not as decoration',
  'hero.ctaCase': 'Get to know me',
  'hero.ctaCv': 'Download CV',
  'hero.scroll': 'scroll',

  'about.index': '01 — About me',
  'about.title': 'Committed to <em>what ships</em>',
  'about.p1': 'I am a Software Development Technician and English Translator from Tucumán, Argentina. I work as a backend developer at a software factory that builds a lending and case-management platform for several financial institutions at once.',
  'about.p2': 'Outside work I build systems for real businesses: a burger bar, a nutritionist, a dealership, a grocery store. That is where I learned what matters most — software is only finished when the person using it every day stops thinking about it.',
  'about.p3': 'Translation gave me something I use every day: turning the technical into words the business understands, and the other way round.',
  'about.s1': 'systems online for real clients',
  'about.s2': 'payment bots delivered',
  'about.s3': 'certifications in AI and agents',
  'about.s4': 'degrees: developer and translator',


  'console.title': 'agent · case diagnosis',
  'console.live': 'simulated demo',
  'console.note': 'Fictional data. Reproduces the real agent flow: parallel tools, caps, structured answer.',
  'console.replay': 'Next question',

  'case.index': '02 — Case study',
  'case.title': 'From pipeline <em>to agent</em>',
  'case.intro': 'When a case failed, Sales and Support only saw technical workflow-engine messages and escalated almost everything to Development. The goal: something that reads the case history and explains, in business language, what happened, why, who must act and what to do — without giving a model free access to a database full of personal data, and without cost per query running away.',
  'case.honest': 'Validated in a test environment with a known-answer evaluation (real errors + deliberately injected faults). There is no production usage metric yet.',
  'case.m1': 'cost per query',
  'case.m2': 'response time',
  'case.m3': 'rule-engine false positives',
  'case.m4': 'read-only tools',

  'work.index': '03 — Experience',
  'work.title': 'What I build <em>at work</em>',
  'work.role': 'Java backend developer',
  'work.period': '2026 — present',
  'work.context': 'Software factory. Its product is a workflow platform to originate loans and manage cases, serving several tenants at once: financial institutions, a university and mutual-aid associations. Java 17, JAX-RS, MySQL, React/TypeScript, SOAP/REST integrations and LLM APIs.',
  'work.more': 'Details',
  'work.less': 'Close',
  'work.site': 'Company site',

  'projects.index': '04 — Projects',
  'projects.title': 'Built on <em>my own</em>',
  'projects.more': 'More projects',
  'auto.title': 'Automations <em>&amp; integrations</em>',
  'auto.text': 'Small systems that remove friction from day-to-day work: they connect messaging, payment and banking APIs so that confirming a payment takes seconds and nobody has to call the owner.',
  'auto.features': 'What it does',
  'projects.live': 'View live',
  'projects.pushed': 'last push',
  'projects.shots': 'Screens',
  'projects.zoom': 'Enlarge screen',
  'projects.note': 'Captured locally with made-up data.',

  'certs.index': '05 — Certifications',
  'certs.title': 'Learning, <em>verified</em>',
  'certs.academy': 'Claude Academy · Anthropic',
  'certs.academyText': 'Eight courses on Claude, Claude Code, the API, MCP and working with agents. Each badge links to its public verification page.',
  'certs.verify': 'Verify',
  'certs.degrees': 'Degrees',
  'certs.qr': 'View validation QR',

  'stack.index': '06 — Stack',
  'stack.title': 'Tools <em>I use</em>',

  'contact.index': '07 — Contact',
  'contact.title': 'Shall we <em>talk?</em>',
  'contact.text': 'I am looking for a remote role as a Java backend developer or AI engineer, building real solutions where backend, data and AI work together. If that is what you are building, I would love to hear about it.',
  'work.statusNote': 'Each card shows its real status: what is in production, what is tested and what is still in progress.',
  'contact.copy': 'Copy email',
  'contact.copied': 'Copied',
  'contact.cvEs': 'CV in Spanish',
  'contact.cvEn': 'Resume in English',

  'footer.made': 'Handmade, no frameworks. Hosted on GitHub Pages.',
  'footer.updated': 'Last updated',

  'palette.placeholder': 'Type a command or section…',
  'palette.empty': 'No results',
};

// ── Etapas del caso "De pipeline a agente" ──
export const STAGES = [
  {
    id: 's1',
    when: { es: 'jul — ago 2026', en: 'Jul — Aug 2026' },
    title: { es: 'Asistente con catálogos', en: 'Catalog-based assistant' },
    text: {
      es: 'Arquitectura desacoplada con una regla dura: la IA nunca toca la base ni ejecuta SQL; solo recibe un JSON armado por la aplicación. Catálogos de errores conocidos por dominio, un catálogo cerrado de preguntas (el front manda solo un id, como defensa contra prompt injection) y un cliente mock para probar todo el flujo sin gastar cuota.',
      en: 'Decoupled architecture with one hard rule: the AI never touches the database or runs SQL; it only receives JSON built by the application. Known-error catalogs per domain, a closed question catalog (the front sends only an id, as a prompt-injection defense) and a mock client to test the whole flow without spending quota.',
    },
    chips: { es: ['1 llamada al modelo', 'multi-proveedor', 'mock LLM'], en: ['1 model call', 'multi-provider', 'mock LLM'] },
    metric: null,
  },
  {
    id: 's2',
    when: { es: 'oct 2026', en: 'Oct 2026' },
    title: { es: 'Rediseño con datos reales', en: 'Redesign with real data' },
    text: {
      es: 'Medí el motor de reglas contra 361 trámites reales y lo reescribí: entendí por qué marcaba trámites sanos y sumé reglas de ciclo de vida. Saqué los catálogos: el contexto sale del historial, una línea por tarea (~700 tokens). Enmascarado de datos personales, memoria compartida por trámite con bloqueo optimista y un contexto de tamaño fijo: el costo por pregunta no crece con el largo del chat.',
      en: 'I measured the rule engine against 361 real cases and rewrote it: I found why it flagged healthy cases and added lifecycle rules. I removed the catalogs: context now comes from the history, one line per task (~700 tokens). PII masking, shared per-case memory with optimistic locking and a fixed-size context: cost per question does not grow with chat length.',
    },
    chips: { es: ['motor de reglas v2', 'PII enmascarado', 'memoria compartida'], en: ['rule engine v2', 'PII masking', 'shared memory'] },
    metric: { value: -81, unit: '%', label: { es: 'falsos positivos (231 → 44 trámites)', en: 'false positives (231 → 44 cases)' } },
  },
  {
    id: 's3',
    when: { es: 'oct 2026', en: 'Oct 2026' },
    title: { es: 'Agente con herramientas', en: 'Tool-using agent' },
    text: {
      es: 'De "resumen armado + una llamada" a un agente con function calling: investiga el trámite con 16 herramientas de solo lectura en 5 familias y pide varias en paralelo por vuelta. Cada llamada pasa controles: herramienta habilitada por empresa, solo el trámite consultado, tablas en lista blanca, secretos ocultos, salida enmascarada y recortada, tope de vueltas. Caché incremental, elección de modelo por costo y una traza de tokens y costo por consulta.',
      en: 'From "pre-built summary + one call" to a function-calling agent: it investigates the case with 16 read-only tools in 5 families and requests several in parallel per turn. Every call is checked: tool enabled per tenant, only the queried case, allowlisted tables, hidden secrets, masked and truncated output, turn caps. Incremental caching, cost-driven model choice and per-query token and cost tracing.',
    },
    chips: { es: ['function calling', 'guardrails', 'evals', 'prompt caching'], en: ['function calling', 'guardrails', 'evals', 'prompt caching'] },
    metric: { value: -94, unit: '%', label: { es: 'costo por consulta · −42% tiempo', en: 'cost per query · −42% time' } },
  },
];

// ── Diagrama: posiciones por etapa (coordenadas 0–100) ──
export const DIAGRAM = {
  nodes: {
    user:    { label: { es: 'Soporte / Comercial', en: 'Support / Sales' }, kind: 'io' },
    api:     { label: { es: 'API', en: 'API' } },
    catalog: { label: { es: 'Catálogos JSON', en: 'JSON catalogs' }, kind: 'muted' },
    rules:   { label: { es: 'Motor de reglas', en: 'Rule engine' } },
    context: { label: { es: 'Contexto', en: 'Context' } },
    mask:    { label: { es: 'Enmascarado PII', en: 'PII masking' } },
    memory:  { label: { es: 'Memoria compartida', en: 'Shared memory' } },
    llm:     { label: { es: 'LLM', en: 'LLM' }, kind: 'core', stageLabel: { s3: { es: 'Agente', en: 'Agent' } } },
    answer:  { label: { es: 'Respuesta estructurada', en: 'Structured answer' }, kind: 'io' },
    t1:      { label: { es: 'Trámite', en: 'Case' }, kind: 'tool' },
    t2:      { label: { es: 'Servicios de terceros', en: 'Third-party services' }, kind: 'tool' },
    t3:      { label: { es: 'Config. del proceso', en: 'Process config' }, kind: 'tool' },
    t4:      { label: { es: 'Firma', en: 'Signature' }, kind: 'tool' },
    t5:      { label: { es: 'Código (Javadoc)', en: 'Code (Javadoc)' }, kind: 'tool' },
    trace:   { label: { es: 'Traza de costo', en: 'Cost trace' }, kind: 'muted' },
  },
  stages: {
    s1: {
      pos: { user: [50, 7], api: [50, 24], catalog: [18, 43], rules: [82, 43], context: [50, 43], llm: [50, 64], answer: [50, 86] },
      edges: [['user', 'api'], ['api', 'context'], ['catalog', 'context'], ['rules', 'context'], ['context', 'llm'], ['llm', 'answer']],
    },
    s2: {
      pos: { user: [50, 7], api: [50, 23], rules: [17, 41], context: [50, 41], mask: [83, 41], memory: [17, 66], llm: [50, 66], answer: [50, 88] },
      edges: [['user', 'api'], ['api', 'context'], ['rules', 'context'], ['context', 'mask'], ['mask', 'llm'], ['memory', 'llm'], ['llm', 'memory'], ['llm', 'answer']],
    },
    s3: {
      pos: { user: [15, 8], llm: [50, 50], t1: [50, 17], t2: [81, 40], t3: [70, 79], t4: [30, 79], t5: [19, 40], answer: [50, 93], trace: [85, 8] },
      edges: [['user', 'llm'], ['llm', 't1'], ['llm', 't2'], ['llm', 't3'], ['llm', 't4'], ['llm', 't5'], ['t1', 'llm'], ['t2', 'llm'], ['t3', 'llm'], ['t4', 'llm'], ['t5', 'llm'], ['llm', 'answer'], ['llm', 'trace']],
      ring: true,
    },
  },
};

// ── Experiencia: logros (clientes anonimizados, métricas en %) ──
export const WORK = [
  {
    size: 'wide',
    status: { kind: 'prod', es: 'En producción', en: 'In production' },
    area: { es: 'Costos de mensajería', en: 'Messaging costs' },
    title: { es: 'Del menú por WhatsApp a una web de autogestión', en: 'From a WhatsApp menu to a self-service web page' },
    metric: '−70%', metricLabel: { es: 'mensajes por consulta', en: 'messages per query' },
    summary: {
      es: 'Meta empezó a cobrar los mensajes de servicio y la factura de WhatsApp subió. El trámite sigue empezando por WhatsApp, pero ahora solo se envía un link y la consulta se hace en una página web.',
      en: 'Meta started charging for service messages and the WhatsApp bill went up. The process still starts on WhatsApp, but now only a link is sent and the query happens on a web page.',
    },
    details: {
      es: ['Relevamiento con datos reales: unos 9 mensajes por trámite, y el 55% era solo navegación (menú, saludo, pedido de DNI).', 'Hice el backend (la interfaz la hizo un compañero). El back es el único que habla con la entidad: la página no la llama directo.', 'Análisis de impacto antes del pase y cambio de línea como paso aparte, con vuelta atrás.', 'Primeras horas en producción: de 9,1 a 2,7 mensajes por consulta y 92% de los usuarios entró al link. Falta la medición de una semana completa.'],
      en: ['Survey with real data: about 9 messages per case, 55% of them pure navigation (menu, greeting, ID request).', 'I built the backend (a teammate built the UI). The backend is the only component that talks to the client’s systems; the page never calls them directly.', 'Impact analysis before release, and the line switch as a separate step with rollback.', 'First hours in production: from 9.1 to 2.7 messages per query, and 92% of users opened the link. A full-week measurement is still pending.'],
    },
    tags: ['Java 17', 'REST', 'WhatsApp API', 'MySQL'],
  },
  {
    size: '',
    status: { kind: 'wip', es: 'En desarrollo', en: 'In progress' },
    area: { es: 'Plataforma', en: 'Platform' },
    title: { es: 'Errores que el operador entiende', en: 'Errors operators can understand' },
    metric: '19 / 23', metricLabel: { es: '“rechazos” que en realidad eran fallas', en: '“rejections” that were actually failures' },
    summary: {
      es: 'Un único punto en el motor de trámites registra cada falla, sabe de dónde salió y muestra un mensaje claro.',
      en: 'A single point in the workflow engine records every failure, knows where it came from and shows a clear message.',
    },
    details: {
      es: ['Diagnóstico con datos reales: 1 de cada 10 tareas terminaba “bien” mientras un servicio externo fallaba adentro.', 'Tres finales declarados en el proceso (finalizado, rechazado, error) en lugar de deducirlos del nombre de la tarea.', 'Catálogo de errores con texto propio por empresa, editable por su administrador, y registro de cada falla con la respuesta del servicio.'],
      en: ['Diagnosis with real data: 1 in 10 tasks ended “successfully” while an external service was failing inside it.', 'Three explicit outcomes in the process (completed, rejected, error) instead of inferring them from the task name.', 'Error catalog with per-tenant text editable by each tenant’s admin, and every failure logged with the service response.'],
    },
    tags: ['Java 17', 'React', 'TypeScript'],
  },
  {
    size: 'wide',
    status: { kind: 'test', es: 'Probado contra la homologación de ARCA', en: 'Tested against ARCA’s staging environment' },
    area: { es: 'Facturación electrónica', en: 'E-invoicing' },
    title: { es: 'API de facturación por lotes contra ARCA', en: 'Batch e-invoicing API against ARCA' },
    metric: '−95%', metricLabel: { es: 'tiempo de facturación', en: 'invoicing time' },
    summary: {
      es: 'Un volumen real de comprobantes pasó de unos 29 minutos a 85 segundos, preservando la numeración fiscal.',
      en: 'A real invoice volume went from about 29 minutes to 85 seconds while preserving fiscal numbering.',
    },
    details: {
      es: ['Envío SOAP en bloques de hasta 250 comprobantes, conciliación automática cuando ARCA no responde e idempotencia de punta a punta.', 'Escritura en bloque y procesamiento paralelo con candado por empresa: −92% de consultas a la base por lote.', 'API key con hash, credenciales fuera del repo y errores sin stack traces: las pruebas de ataque de otro equipo no lograron ningún 500.', 'Migrado de Java 8 a 17 sin cambiar el contrato: el lote de 250 bajó a menos de la mitad del tiempo.'],
      en: ['SOAP submission in blocks of up to 250 invoices, automatic reconciliation when ARCA does not respond, and end-to-end idempotency.', 'Bulk writes and parallel processing with a per-tenant lock: −92% database queries per batch.', 'Hashed API keys, credentials out of the repo and errors without stack traces: another team’s attack tests produced zero 500s.', 'Migrated from Java 8 to 17 without changing the contract: a 250-invoice batch now takes less than half the time.'],
    },
    tags: ['Java 17', 'SOAP', 'MySQL', 'Postman'],
  },
  {
    size: '',
    status: { kind: 'prod', es: 'Corregido en menos de 24 h', en: 'Fixed in under 24 h' },
    area: { es: 'Incidente en producción', en: 'Production incident' },
    title: { es: 'Causa raíz de un fallo en la firma electrónica', en: 'Root cause of an e-signature failure' },
    metric: '<24 h', metricLabel: { es: 'del reporte al fix', en: 'from report to fix' },
    summary: {
      es: 'Firmas reportadas como exitosas con contratos sin firmar. Era una condición de carrera entre hilos.',
      en: 'Signatures reported as successful with unsigned contracts. It was a race condition between threads.',
    },
    details: {
      es: ['Reconstruí el incidente desde los logs y la historia de git: un cambio posterior había ocultado el error en lugar de corregirlo.', 'Corregí la causa con copias defensivas en los tres puntos de entrada afectados (solo uno había fallado).', 'Propuse una mitigación por capas en backend, servicio de estampado y front, con plan de verificación.'],
      en: ['Rebuilt the incident from logs and git history: a later change had hidden the error instead of fixing it.', 'Fixed the cause with defensive copies at all three affected entry points (only one had failed).', 'Proposed layered mitigation across backend, PDF stamping service and front, with a verification plan.'],
    },
    tags: ['Java', 'Concurrency', 'RCA'],
  },
  {
    size: '',
    status: { kind: 'test', es: 'En la release · falta producción', en: 'In the release · not yet in production' },
    area: { es: 'Workflow omnicanal', en: 'Omnichannel workflow' },
    title: { es: 'Entrega de una tarjeta provincial: web + WhatsApp + firma', en: 'Provincial card delivery: web + WhatsApp + e-signature' },
    metric: '120', metricLabel: { es: 'tareas en 7 procesos', en: 'tasks across 7 processes' },
    summary: {
      es: 'Proceso de punta a punta con motor de reglas configurable por datos: cambiar una regla es cambiar un valor, sin deploy.',
      en: 'End-to-end process with a data-driven rule engine: changing a rule means changing a value, no deploy.',
    },
    details: {
      es: ['Operador en la web, agente por WhatsApp, validación de identidad, firma electrónica y documentos firmados.', 'Pantallas genéricas de React configuradas desde la base: 12 pasos sin componente propio, reutilizadas luego en otro cliente.', 'Análisis de impacto multiempresa contra datos reales: cero cambios de comportamiento en los demás clientes.'],
      en: ['Web operator, WhatsApp agent, identity validation, e-signature and signed documents.', 'Generic React screens configured from the database: 12 steps without a dedicated component, later reused for another client.', 'Multi-tenant impact analysis against real data: zero behavior changes for other clients.'],
    },
    tags: ['Java 17', 'React', 'WhatsApp'],
  },
  {
    size: '',
    status: { kind: 'pilot', es: 'Piloto medido', en: 'Measured pilot' },
    area: { es: 'IA en el desarrollo', en: 'AI in development' },
    title: { es: 'Subagente revisor de código para Claude Code', en: 'Code-review subagent for Claude Code' },
    metric: '−20%', metricLabel: { es: 'tiempo · −14% tokens', en: 'time · −14% tokens' },
    summary: {
      es: 'Revisor de solo lectura con manual de reglas versionado que detecta riesgos multiempresa antes del PR.',
      en: 'Read-only reviewer with a versioned rulebook that flags multi-tenant risks before the PR.',
    },
    details: {
      es: ['Comando /revisar, base automática contra la última release y formato de reporte con archivo:línea.', 'Guardas a nivel de herramienta (permisos ask/deny): no ejecuta contra bases reales ni lee credenciales.', 'En el piloto encontró una rotura silenciosa del front que la versión anterior no veía.', 'Auditoría del contexto del proyecto (CLAUDE.md) con un plan para reducirlo con skills y hooks.'],
      en: ['/revisar command, automatic baseline against the latest release and a report format with file:line.', 'Tool-level guardrails (ask/deny permissions): it cannot run against live databases or read credentials.', 'In the pilot it caught a silent front-end break the earlier version missed.', 'Audited the project context (CLAUDE.md) with a plan to shrink it using skills and hooks.'],
    },
    tags: ['Claude Code', 'Subagents', 'Guardrails'],
  },
  {
    size: '',
    status: { kind: 'test', es: 'Probado en test · en la release', en: 'Tested · in the release' },
    area: { es: 'Plataforma', en: 'Platform' },
    title: { es: 'Exportar, importar y deshacer la configuración de una empresa', en: 'Export, import and undo a tenant’s configuration' },
    metric: '33', metricLabel: { es: 'tablas auditadas al revertir', en: 'tables audited on rollback' },
    summary: {
      es: 'Herramienta para mover procesos, roles, parámetros y templates entre servidores, con reversión exacta.',
      en: 'Tool to move processes, roles, parameters and templates between servers, with exact rollback.',
    },
    details: {
      es: ['Reversión basada en un registro de importación y una foto de auditoría con chequeo de huérfanos.', 'Rediseñé la resolución de parámetros por empresa y evité que una empresa consultara el backoffice de otra.', 'Relevé con análisis estático cientos de parámetros y valores hardcodeados del código legacy.'],
      en: ['Rollback based on an import log and an audit snapshot with orphan checks.', 'Redesigned per-tenant parameter resolution so one tenant could not query another’s back office.', 'Statically surveyed hundreds of parameters and hardcoded values in the legacy code.'],
    },
    tags: ['Java 17', 'MySQL', 'Multi-tenant'],
  },
  {
    size: '',
    status: { kind: 'wip', es: 'Migración en curso', en: 'Migration in progress' },
    area: { es: 'Modernización', en: 'Modernization' },
    title: { es: 'Servicios a Java 17 y backend en capas', en: 'Services to Java 17 and a layered backend' },
    metric: '~45', metricLabel: { es: 'endpoints migrados a v2', en: 'endpoints migrated to v2' },
    summary: {
      es: 'Migración del monolito a controller/service/DAO sin tocar el front ni las URLs, y tres servicios satélite a Java 17.',
      en: 'Monolith migrated to controller/service/DAO without touching the front or URLs, plus three satellite services on Java 17.',
    },
    details: {
      es: ['Pools de conexiones en lugar de conexiones estáticas compartidas: 400/400 consultas concurrentes sin errores ni fugas.', 'Detecté antes del deploy una pérdida silenciosa de mensajes con emoji (~2%) y la resolví sin perder filas.', 'Integraciones con la Central de Deudores del BCRA, validación de CBU y servicios de identidad.'],
      en: ['Connection pools instead of shared static connections: 400/400 concurrent queries with no errors or leaks.', 'Caught a silent loss of emoji messages (~2%) before deploy and fixed it without losing rows.', 'Integrations with the BCRA debtor registry, CBU validation and identity services.'],
    },
    tags: ['Java 17', 'HikariCP', 'REST/SOAP'],
  },
  {
    size: 'wide',
    status: { kind: 'wip', es: 'Probado en local', en: 'Tested locally' },
    area: { es: 'Front', en: 'Front end' },
    title: { es: 'Rediseño visual y migración de MUI 5 a 7', en: 'Visual redesign and MUI 5 → 7 migration' },
    metric: '~100', metricLabel: { es: 'archivos migrados', en: 'files migrated' },
    summary: {
      es: '7 propuestas de diseño sobre un tema central con modo claro/oscuro y color por ambiente para no confundir producción con desarrollo.',
      en: '7 design proposals on a central theme with light/dark mode and per-environment color so production is never mistaken for dev.',
    },
    details: {
      es: ['DataGrid y Date Pickers incluidos, sin errores de tipos nuevos y sin tocar lógica de negocio.', '6 regresiones detectadas y resueltas en pruebas con datos reales.'],
      en: ['DataGrid and Date Pickers included, with no new type errors and no business-logic changes.', '6 regressions found and fixed in tests with real data.'],
    },
    tags: ['React', 'TypeScript', 'MUI v7'],
  },
];

// ── Proyectos destacados ──
export const FEATURED = [
  {
    repo: 'mcp-datos-argentina',
    name: 'mcp-datos-<b>argentina</b>',
    year: '2026',
    kind: { es: 'Open source · servidor MCP', en: 'Open source · MCP server' },
    img: 'assets/img/projects/mcp-datos-argentina.svg',
    live: 'https://www.npmjs.com/package/mcp-datos-argentina',
    liveLabel: { es: 'Ver en npm', en: 'View on npm' },
    desc: {
      es: 'Servidor MCP que le da a Claude (o a cualquier cliente MCP) acceso a datos públicos de Argentina: dólar, BCRA y Central de Deudores, inflación, riesgo país, plazos fijos, direcciones (Georef) y series oficiales del INDEC. 20 tools con salida estructurada, 4 prompts y 5 resources, con transporte stdio y HTTP. Está publicado en npm y en el registro oficial de MCP, con tests y releases automáticos desde GitHub Actions.',
      en: 'MCP server that gives Claude (or any MCP client) access to Argentine public data: exchange rates, the Central Bank and its debtor registry, inflation, country risk, fixed-term deposit rates, addresses (Georef) and official INDEC time series. 20 tools with structured output, 4 prompts and 5 resources, over stdio and HTTP. Published on npm and the official MCP Registry, with tests and automated releases from GitHub Actions.',
    },
    stack: ['TypeScript', 'MCP SDK', 'Node.js', 'Zod', 'Vitest', 'Docker', 'GitHub Actions'],
    accent: '#74acdf',
  },
  {
    repo: 'LaPinta',
    name: 'La Pinta',
    year: '2026',
    kind: { es: 'Cliente · bar y hamburguesería', en: 'Client · burger bar' },
    img: 'assets/img/projects/lapinta.jpg',
    live: 'https://la-pinta-delta.vercel.app',
    desc: {
      es: 'Sistema operativo del bar: mozo → caja → cocina y barra en tiempo real con Socket.io, plano de mesas con drag & drop, seis roles, recibos imprimibles y métricas por jornada operativa (19 a 5 h).',
      en: 'The bar’s operating system: waiter → cashier → kitchen and bar in real time with Socket.io, drag & drop floor plan, six roles, printable receipts and metrics per operating day (7 PM to 5 AM).',
    },
    stack: ['React 18', 'Node.js', 'PostgreSQL', 'Socket.io', 'JWT'],
    gallery: [
      { src: 'assets/img/projects/lapinta.jpg', thumb: 'assets/img/projects/gallery/lapinta-mesas-thumb.jpg', label: { es: 'Plano de mesas', en: 'Floor plan' } },
      { src: 'assets/img/projects/gallery/lapinta-dashboard.jpg', thumb: 'assets/img/projects/gallery/lapinta-dashboard-thumb.jpg', label: { es: 'Dashboard', en: 'Dashboard' } },
      { src: 'assets/img/projects/gallery/lapinta-caja.jpg', thumb: 'assets/img/projects/gallery/lapinta-caja-thumb.jpg', label: { es: 'Caja', en: 'Cashier' } },
      { src: 'assets/img/projects/gallery/lapinta-metricas.jpg', thumb: 'assets/img/projects/gallery/lapinta-metricas-thumb.jpg', label: { es: 'Métricas', en: 'Metrics' } },
    ],
    accent: '#c9a465',
  },
  {
    repo: 'nutriapp',
    name: 'NutriApp',
    year: '2026',
    kind: { es: 'Cliente · consultorio de nutrición', en: 'Client · nutrition practice' },
    img: 'assets/img/projects/nutriapp.jpg',
    live: 'https://nutriapp-bay.vercel.app',
    desc: {
      es: 'Panel clínico para una nutricionista: pacientes con historia clínica, patologías y anamnesis, turnos multi-sede, consultas con antropometría y evolución en gráficos, planes semanales con macros en PDF/Excel, estadísticas y auditoría de cambios.',
      en: 'Clinical dashboard for a nutritionist: patients with medical history, conditions and dietary history, multi-location appointments, anthropometric consultations with progress charts, weekly meal plans with macros in PDF/Excel, statistics and a change audit log.',
    },
    stack: ['React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'Zod', 'Recharts'],
    gallery: [
      { src: 'assets/img/projects/nutriapp.jpg', thumb: 'assets/img/projects/gallery/nutriapp-dashboard-thumb.jpg', label: { es: 'Inicio', en: 'Home' } },
      { src: 'assets/img/projects/gallery/nutriapp-progreso.jpg', thumb: 'assets/img/projects/gallery/nutriapp-progreso-thumb.jpg', label: { es: 'Progreso', en: 'Progress' } },
      { src: 'assets/img/projects/gallery/nutriapp-estadisticas.jpg', thumb: 'assets/img/projects/gallery/nutriapp-estadisticas-thumb.jpg', label: { es: 'Estadísticas', en: 'Statistics' } },
      { src: 'assets/img/projects/gallery/nutriapp-turnos.jpg', thumb: 'assets/img/projects/gallery/nutriapp-turnos-thumb.jpg', label: { es: 'Turnos', en: 'Appointments' } },
    ],
    accent: '#7bbf5a',
  },
];

// ── Principios de trabajo (sección "Sobre mí") ──
export const PRINCIPLES = [
  {
    title: { es: 'Me hago cargo', en: 'I take ownership' },
    text: {
      es: 'Lo que entrego lo sigo de cerca. Cuando apareció un fallo en producción en la firma electrónica, pasé del reporte a la corrección de la causa raíz en menos de 24 horas.',
      en: 'I stay close to what I ship. When a production failure appeared in e-signatures, I went from report to root-cause fix in under 24 hours.',
    },
  },
  {
    title: { es: 'Mido antes de afirmar', en: 'I measure before I claim' },
    text: {
      es: 'Cada número de este sitio sale de una medición. Y cuando algo todavía no está en producción, lo digo.',
      en: 'Every number on this site comes from a measurement. And when something is not in production yet, I say so.',
    },
  },
  {
    title: { es: 'Cuido los datos', en: 'I protect the data' },
    text: {
      es: 'Solo lectura cuando alcanza, datos personales enmascarados, credenciales fuera del repositorio. En el trabajo y en mis propios bots.',
      en: 'Read-only whenever it is enough, masked personal data, credentials out of the repository. At work and in my own bots.',
    },
  },
  {
    title: { es: 'Documento y explico', en: 'I document and explain' },
    text: {
      es: 'Guías para el equipo, manuales para operadores, 240 páginas de documentación en mi tesis. Lo que no se entiende, no se mantiene.',
      en: 'Team guides, operator manuals, 240 pages of documentation for my thesis. What nobody understands, nobody maintains.',
    },
  },
  {
    title: { es: 'Aprendo en serio', en: 'I learn for real' },
    text: {
      es: 'Ramas, worktrees y flujos de git; ocho certificaciones en IA y agentes. Y lo aprendido lo llevo a algo que funcione.',
      en: 'Branches, worktrees and git workflows; eight certifications in AI and agents. And I turn what I learn into something that works.',
    },
  },
];

// ── Automatizaciones e integraciones (bots) ──
export const AUTOMATIONS = [
  {
    repo: 'mp-whatsapp-bot',
    name: { es: 'Verificador de pagos por WhatsApp', en: 'WhatsApp payment checker' },
    status: { es: 'Entregado', en: 'Delivered' },
    pitch: {
      es: 'Un empleado escribe "¿entró 15.500?" por WhatsApp y en segundos sabe si la transferencia impactó en Mercado Pago, sin llamar al dueño ni aceptar capturas de pantalla.',
      en: 'An employee texts "did 15,500 land?" on WhatsApp and knows within seconds whether the transfer hit Mercado Pago — no calling the owner, no accepting screenshots.',
    },
    flow: ['WhatsApp', 'Twilio', 'FastAPI', 'Mercado Pago'],
    features: {
      es: ['Entiende lenguaje natural: montos en formato argentino ("1.500,50"), "hace 30" para ampliar la ventana y "últimos 4 pagos" para listar.', 'Tolerancia del 2% en el monto y ventana configurable de búsqueda.', 'Responde con titular, hora en horario argentino y monto, armando la respuesta TwiML con escape seguro.', 'Solo lectura: consulta pagos aprobados, no puede mover dinero.'],
      en: ['Understands natural language: Argentine-format amounts ("1.500,50"), "hace 30" to widen the window and "últimos 4 pagos" to list.', '2% amount tolerance and configurable search window.', 'Replies with payer, Argentina-time timestamp and amount, building the TwiML response with safe escaping.', 'Read-only: it queries approved payments and cannot move money.'],
    },
    stack: ['Python', 'FastAPI', 'Twilio', 'WhatsApp', 'Mercado Pago API', 'Railway'],
  },
  {
    repo: 'verduleria-bot',
    name: { es: 'Alertas de cobros multi-sucursal', en: 'Multi-branch payment alerts' },
    status: { es: 'Entregado', en: 'Delivered' },
    pitch: {
      es: 'Cada vez que entra un pago por Mercado Pago o Brubank, el empleado de esa sucursal recibe una alerta por Telegram al instante; el dueño, además, ve totales y reportes.',
      en: 'Every time a payment arrives via Mercado Pago or Brubank, that branch’s employee gets an instant Telegram alert; the owner also sees totals and reports.',
    },
    flow: ['MP · Brubank', 'Webhook · MacroDroid', 'FastAPI', 'Telegram'],
    features: {
      es: ['Webhook oficial de Mercado Pago con validación de firma.', 'Brubank sin API pública: una automatización en Android (MacroDroid) lee la notificación y la envía al servidor.', 'Roles: el empleado consulta "1500?"; el dueño ve último pago, total del día y reporte semanal automático.', 'Historial en SQLite, endpoints admin protegidos por token y deploy en Railway.'],
      en: ['Official Mercado Pago webhook with signature validation.', 'Brubank has no public API: an Android automation (MacroDroid) reads the notification and posts it to the server.', 'Roles: employees ask "1500?"; the owner sees the last payment, the daily total and an automatic weekly report.', 'History in SQLite, token-protected admin endpoints and deploy on Railway.'],
    },
    stack: ['Python', 'FastAPI', 'Telegram Bot API', 'Mercado Pago', 'MacroDroid', 'APScheduler', 'SQLite'],
  },
];

export const OTHERS = [
  { name: { es: 'TurnoLex', en: 'TurnoLex' }, year: '2025 — 2026', what: { es: 'SaaS multi-tenant de turnos para estudios jurídicos (demo fuera de línea)', en: 'Multi-tenant appointment SaaS for law firms (demo offline)' }, stack: 'React · TS · Node · MongoDB', href: 'https://github.com/Gonza28fq/turnolex' },
  { name: { es: 'Gestor de tareas', en: 'Task manager' }, year: '2026', what: { es: 'Full stack con JWT, subtareas, vencimientos y drag & drop', en: 'Full stack with JWT, subtasks, deadlines and drag & drop' }, stack: 'React · TS · MongoDB', href: 'https://github.com/Gonza28fq/gestor-de-tareas', doc: 'Documentacion_Tecnica_GestorTareas.pdf' },
  { name: { es: 'Sistema para concesionaria', en: 'Car dealership system' }, year: '2026', what: { es: 'Stock con fotos, ajuste masivo de precios y audit log', en: 'Inventory with photos, bulk pricing and audit log' }, stack: 'React · Node · PostgreSQL', href: 'https://github.com/Gonza28fq/ConcesionarIaIba-ez' },
  { name: { es: 'Sistema de gestión comercial', en: 'Commercial management system' }, year: '2024', what: { es: 'Tesis: 7 módulos, roles y permisos, 240 páginas de documentación', en: 'Thesis: 7 modules, roles and permissions, 240 pages of docs' }, stack: 'PHP · JS · MySQL', href: 'https://github.com/Gonza28fq/commercial-management-system', doc: 'Documentacion_Tecnica.pdf' },
];

// ── Claude Academy (URL de verificación pública de cada PDF) ──
export const BADGES = [
  { slug: 'claude-code-in-action', title: 'Claude Code in Action', verify: 'https://academy.claude.com/verify/c9f38bc5f12033a4ae51c317ede4653f' },
  { slug: 'building-with-the-claude-api', title: 'Building with the Claude API', verify: 'https://academy.claude.com/verify/3fb9df04b949ed094c861165ea8afa6f' },
  { slug: 'model-context-protocol-advanced-topics', title: 'MCP: Advanced Topics', verify: 'https://academy.claude.com/verify/25fef495cbee4381cf58e363caaadf11' },
  { slug: 'introduction-to-model-context-protocol', title: 'Introduction to MCP', verify: 'https://academy.claude.com/verify/db78d752e82c599cb707da0d2db31860' },
  { slug: 'building-effective-human-agent-teams', title: 'Building Effective Human-Agent Teams', verify: 'https://academy.claude.com/verify/9c043f86b97e38a2052f8ef1678c4d54' },
  { slug: 'claude-code-101', title: 'Claude Code 101', verify: 'https://academy.claude.com/verify/0e036149c8b704c541dddc50bc5c90cb' },
  { slug: 'ai-fluency-framework-foundations', title: 'AI Fluency: Framework & Foundations', verify: 'https://academy.claude.com/verify/ecdabbc375a4a2c4c21ba89845f24665' },
  { slug: 'claude-101', title: 'Claude 101', verify: 'https://academy.claude.com/verify/c2affffade713bcdc7b7abf964582978' },
];

export const DEGREES = [
  { title: { es: 'Técnico Desarrollador de Software', en: 'Software Development Technician' }, qr: 'screenshots/WhatsApp Image 2026-05-21 at 20.42.52.jpeg' },
  { title: { es: 'Traductor de Inglés', en: 'English Translator' }, qr: 'screenshots/2026-05-21 (1).png' },
];

export const STACK = [
  { group: { es: 'IA aplicada', en: 'Applied AI' }, items: ['OpenAI Responses API', 'Anthropic API', 'Function calling', 'Structured outputs', 'Prompt caching', 'Evals', 'MCP', 'Claude Code'] },
  { group: { es: 'Backend', en: 'Backend' }, items: ['Java 17', 'JAX-RS', 'Node.js', 'Express', 'TypeScript', 'PHP', 'Python', 'SOAP / REST'] },
  { group: { es: 'Datos', en: 'Data' }, items: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'HikariCP'] },
  { group: { es: 'Front', en: 'Front end' }, items: ['React', 'TypeScript', 'MUI', 'Tailwind CSS', 'Vite', 'Socket.io'] },
  { group: { es: 'Infra y flujo', en: 'Infra & workflow' }, items: ['Git (ramas, worktrees)', 'GitHub', 'Railway', 'Vercel', 'Docker', 'Postman'] },
  { group: { es: 'Idiomas', en: 'Languages' }, items: ['Español (nativo)', 'English (advanced)', 'Traducción técnica'] },
];

// ── Demo de la consola del agente (datos ficticios) ──
export const SCENARIOS = [
  {
    q: { es: '¿Por qué está frenado el trámite T-4821?', en: 'Why is case T-4821 stuck?' },
    turns: [
      [['tramite.historial', 312, '1.8k'], ['proceso.config', 188, '0.9k'], ['servicios.llamadas', 421, '1.2k']],
      [['codigo.metodo_tarea', 96, '0.4k']],
    ],
    sev: 'MEDIA', sevEn: 'MEDIUM', who: { es: 'Comercial', en: 'Sales' },
    a: {
      es: 'La validación de identidad espera al servicio de padrón: devolvió timeout 2 veces y la tarea quedó sin próxima tarea. Reintentar desde la bandeja; si vuelve a fallar, escalar a Desarrollo.',
      en: 'Identity validation is waiting on the registry service: it timed out twice and the task was left with no next task. Retry from the inbox; if it fails again, escalate to Development.',
    },
    meta: { turns: 3, tools: 4, cache: 61, secs: '24.1' },
  },
  {
    q: { es: '¿Por qué se rechazó la solicitud S-1077?', en: 'Why was application S-1077 rejected?' },
    turns: [
      [['tramite.historial', 274, '2.1k'], ['tramite.subprocesos', 133, '0.6k']],
      [['firma.estado', 240, '0.7k'], ['servicios.llamadas', 388, '1.0k']],
    ],
    sev: 'BAJA', sevEn: 'LOW', who: { es: 'Nadie', en: 'No one' },
    a: {
      es: 'La premisa no es correcta: la solicitud no se rechazó, se aprobó el día 12 y la firma está completa. Lo que se canceló fue un subproceso duplicado, sin impacto.',
      en: 'The premise is wrong: the application was not rejected — it was approved on the 12th and the signature is complete. What got cancelled was a duplicate subprocess, with no impact.',
    },
    meta: { turns: 3, tools: 4, cache: 58, secs: '27.6' },
  },
  {
    q: { es: '¿Qué pasó con la firma del trámite T-3302?', en: 'What happened to the signature on case T-3302?' },
    turns: [
      [['firma.estado', 205, '0.8k'], ['tramite.historial', 296, '1.6k'], ['proceso.config', 171, '0.9k']],
      [['servicios.llamadas', 402, '1.1k'], ['codigo.metodo_tarea', 88, '0.3k']],
    ],
    sev: 'ALTA', sevEn: 'HIGH', who: { es: 'Desarrollo', en: 'Development' },
    a: {
      es: 'El servicio de estampado respondió OK pero el documento consolidado no tiene la firma. El método de la tarea arma el PDF antes de recibir la confirmación. Requiere Desarrollo.',
      en: 'The stamping service answered OK but the consolidated document lacks the signature. The task method builds the PDF before receiving confirmation. Needs Development.',
    },
    meta: { turns: 3, tools: 5, cache: 64, secs: '31.2' },
  },
];
