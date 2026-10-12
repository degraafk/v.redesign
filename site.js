/* VOX · shared data, helpers and page chrome.
   Edit NEWS / PROPS / ACTOS below; every page reads from here. */
"use strict";

/* ==========================================================================
   Data
   p = priority on the home bento (1 hero, 2 wide, 3 small) · img/pos optional
   ========================================================================== */
const NEWS = [
  { slug: "acto-estepona", p: 1, img: "hero.jpg", pos: "60% 30%", t: "Acto público en Estepona con cientos de asistentes", d: "2026-10-11", c: "Actos", g: "g1",
    s: "Una tarde de acto al aire libre con vecinos de la zona y representantes locales.",
    b: ["Cientos de personas se reunieron este domingo en un acto público al aire libre en Estepona, en uno de los primeros encuentros con vecinos tras la convocatoria de las elecciones generales.", "Los asistentes pudieron escuchar las intervenciones de los representantes locales y resolver dudas sobre las propuestas del partido.", "Este texto es un contenido de ejemplo para la maqueta. Sustitúyelo por la nota de prensa real."] },
  { slug: "buzon-hiperregulacion", p: 3, t: "Nuevo buzón ciudadano contra la hiperregulación", d: "2026-10-09", c: "Propuestas", g: "g2",
    s: "Una vía para que autónomos y pymes cuenten qué trámites les frenan.",
    b: ["Se abre un buzón en línea para que autónomos, agricultores y pequeñas empresas señalen los trámites que más tiempo les consumen.", "Las aportaciones se agruparán por sectores y servirán para preparar propuestas de simplificación administrativa.", "Contenido de ejemplo para la maqueta."] },
  { slug: "parlamento-europeo", p: 3, t: "Resumen semanal del Parlamento Europeo", d: "2026-10-07", c: "Europa", g: "g3",
    s: "Los temas de la semana en Bruselas y Estrasburgo, explicados en pocas líneas.",
    b: ["Cada semana resumimos los asuntos más relevantes de la actividad en el Parlamento Europeo y cómo afectan a España.", "Este espacio servirá para publicar un resumen breve con enlaces a las votaciones y los documentos oficiales.", "Contenido de ejemplo para la maqueta."] },
  { slug: "plan-vivienda", p: 2, img: "vivienda.jpg", pos: "50% 35%", t: "Presentamos nuestro plan de vivienda para el 29-N", d: "2026-10-10", c: "Propuestas", g: "g4",
    s: "Más suelo, licencias ágiles y seguridad jurídica, en un documento claro.",
    b: ["Presentamos las líneas de nuestro plan de vivienda: más suelo disponible, licencias más rápidas y mayor seguridad jurídica para propietarios e inquilinos.", "El documento completo estará disponible para descargar y recogerá cada medida con su plazo y su coste.", "Contenido de ejemplo para la maqueta. Sustitúyelo por la nota de prensa real."] },
  { slug: "voluntariado-29n", p: 2, img: "noche.jpg", pos: "50% 30%", t: "Abrimos el voluntariado para la campaña del 29-N", d: "2026-10-08", c: "Campaña", g: "g1",
    s: "Reparto, mesas informativas y apoyo el día de las elecciones.",
    b: ["Abrimos el registro de voluntarios para la campaña, que arranca el 13 de noviembre y termina el 27.", "Buscamos gente para mesas informativas, reparto de material en los barrios y apoyo durante la jornada electoral.", "Contenido de ejemplo para la maqueta."] },
  { slug: "calendario-actos", p: 3, t: "Este es el calendario de actos de la campaña", d: "2026-10-06", c: "Campaña", g: "g2",
    s: "Del mitin de arranque al cierre de campaña, ciudad por ciudad.",
    b: ["Publicamos el calendario de actos de las dos semanas de campaña, con ciudades, fechas y horarios.", "Puedes añadir cada acto a tu calendario y consultar el listado completo por provincia.", "Contenido de ejemplo para la maqueta."] },
  { slug: "mesas-informativas", p: 3, t: "Mesas informativas en toda España este fin de semana", d: "2026-10-09", c: "Campaña", g: "g3",
    s: "Voluntarios en las calles para resolver dudas sobre el programa.",
    b: ["Este fin de semana habrá mesas informativas en decenas de ciudades para explicar el programa y resolver dudas.", "Puedes apuntarte como voluntario desde la sección de participación.", "Contenido de ejemplo para la maqueta."] },
  { slug: "ventanilla-unica", p: 3, t: "Ventanilla única digital: así funcionaría para tu empresa", d: "2026-10-07", c: "Propuestas", g: "g4",
    s: "Un solo punto de acceso para altas, licencias y trámites.",
    b: ["Explicamos cómo funcionaría una ventanilla única digital para autónomos y pymes, con un solo punto de acceso a los trámites habituales.", "El objetivo es reducir tiempos y evitar pedir los mismos documentos varias veces.", "Contenido de ejemplo para la maqueta."] },
  { slug: "jornada-agraria", p: 3, img: "campo.jpg", pos: "30% 30%", t: "Jornada con el sector agrario: menos papeleo, más campo", d: "2026-10-05", c: "Actos", g: "g1",
    s: "Agricultores y ganaderos trasladan sus principales preocupaciones.",
    b: ["Una jornada de trabajo con profesionales del sector agrario para recoger sus propuestas sobre burocracia y costes.", "Las conclusiones se publicarán en esta web.", "Contenido de ejemplo para la maqueta."] }
];

const PROPS = [
  { id: "economia", t: "Economía", s: "Menos trámites y menos cargas para quien emprende, contrata y ahorra.", m: [
    { t: "Ventanilla única digital", d: "Un solo punto de acceso para altas, licencias y obligaciones, sin pedir los mismos documentos varias veces." },
    { t: "Trámites más simples para autónomos", d: "Menos formularios y plazos más claros para quien trabaja por cuenta propia." },
    { t: "Menor carga sobre el trabajo", d: "Revisar los costes que pesan sobre contratar y sobre el ahorro de las familias." }] },
  { id: "vivienda", t: "Vivienda", s: "Más oferta de vivienda y más seguridad jurídica para propietarios e inquilinos.", m: [
    { t: "Más suelo disponible", d: "Poner suelo público y urbanizable en el mercado con plazos y criterios claros." },
    { t: "Licencias más rápidas", d: "Plazos máximos de resolución y seguimiento en línea de cada expediente." },
    { t: "Primera vivienda para jóvenes", d: "Ayudas y avales para facilitar la primera compra." }] },
  { id: "campo-y-mar", t: "Campo y mar", s: "Quitar burocracia a quienes producen nuestros alimentos.", m: [
    { t: "Menos papeleo", d: "Reducir informes y declaraciones duplicadas en explotaciones agrarias y pesqueras." },
    { t: "Defensa del producto español", d: "Una posición firme en Bruselas para proteger precios y condiciones de competencia." },
    { t: "Agua e infraestructuras", d: "Planificar y mantener las infraestructuras hídricas que necesita el campo." }] },
  { id: "seguridad", t: "Seguridad", s: "Medios, respaldo y coordinación para las fuerzas de seguridad.", m: [
    { t: "Plantillas y equipamiento", d: "Reforzar plantillas y renovar el material de los cuerpos de seguridad." },
    { t: "Coordinación entre cuerpos", d: "Compartir información y protocolos entre Policía, Guardia Civil y policías locales." },
    { t: "Justicia más ágil", d: "Acortar los plazos de respuesta judicial en los casos que afectan a la seguridad ciudadana." }] },
  { id: "familia", t: "Familia", s: "Apoyo directo a quienes quieren formar una familia.", m: [
    { t: "Deducciones por hijo a cargo", d: "Un apoyo fiscal claro y fácil de solicitar para las familias con hijos." },
    { t: "Conciliación más flexible", d: "Más flexibilidad horaria y teletrabajo donde sea posible." },
    { t: "Familias numerosas", d: "Ayudas específicas y reconocimiento en servicios y transporte." }] },
  { id: "energia", t: "Energía", s: "Un suministro estable y precios asumibles para hogares y empresas.", m: [
    { t: "Todas las fuentes disponibles", d: "Un mix energético que combine las tecnologías que den seguridad de suministro." },
    { t: "Menos impuestos en la factura", d: "Revisar los cargos e impuestos que encarecen la factura de la luz." },
    { t: "Mejores redes eléctricas", d: "Invertir en transporte y distribución para evitar cuellos de botella." }] },
  { id: "educacion", t: "Educación", s: "Más exigencia y más libertad de elección para las familias.", m: [
    { t: "Evaluaciones comunes", d: "Pruebas comparables en todo el país para conocer cómo avanza cada centro." },
    { t: "Libertad de elección de centro", d: "Que las familias puedan elegir el colegio que prefieren para sus hijos." },
    { t: "Formación profesional", d: "Reforzar la FP y su conexión con las empresas de cada zona." }] },
  { id: "sanidad", t: "Sanidad", s: "Menos esperas y una gestión más eficiente de los recursos.", m: [
    { t: "Reducir listas de espera", d: "Un plan con objetivos y seguimiento público de los tiempos de atención." },
    { t: "Historia clínica común", d: "Que tu historial médico te acompañe en cualquier comunidad autónoma." },
    { t: "Personal sanitario", d: "Mejores condiciones y estabilidad para quienes cuidan de nuestra salud." }] },
  { id: "europa", t: "España en Europa", s: "Una voz clara en las decisiones que afectan a cada provincia.", m: [
    { t: "Defensa de los intereses nacionales", d: "Presencia activa en las negociaciones que afectan a nuestros sectores." },
    { t: "Fondos con transparencia", d: "Seguimiento público de cómo se reparten y se usan los fondos europeos." },
    { t: "Cooperación con aliados", d: "Trabajo conjunto con los países con los que compartimos prioridades." }] }
];

/* f = featured on the home agenda */
const ACTOS = [
  { d: "2026-11-14", t: "Mitin de arranque de campaña", p: "Madrid",    h: "19:00", f: 1 },
  { d: "2026-11-16", t: "Encuentro con autónomos",      p: "Valencia",  h: "18:00" },
  { d: "2026-11-18", t: "Charla sobre vivienda",        p: "Málaga",    h: "19:30" },
  { d: "2026-11-20", t: "Encuentro con vecinos",        p: "Sevilla",   h: "18:30", f: 1 },
  { d: "2026-11-22", t: "Jornada con el sector agrario", p: "Murcia",   h: "12:00" },
  { d: "2026-11-24", t: "Acto sobre seguridad",         p: "Barcelona", h: "19:00" },
  { d: "2026-11-26", t: "Mesa informativa",             p: "Zaragoza",  h: "11:00" },
  { d: "2026-11-27", t: "Cierre de campaña",            p: "Valencia",  h: "20:00", f: 1 }
];

/* ==========================================================================
   Helpers (global: pages use them)
   ========================================================================== */
const MONTHS_SHORT = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MONTHS_LONG = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/** "2026-11-14" → "14 NOV" (or "14 de noviembre de 2026" when long) */
const fmt = (iso, long) => {
  const [y, m, d] = iso.split("-").map(Number);
  return long ? `${d} de ${MONTHS_LONG[m - 1]} de ${y}` : `${d} ${MONTHS_SHORT[m - 1].toUpperCase()}`;
};

const sorted = () => [...NEWS].sort((a, b) => b.d.localeCompare(a.d));
const prio = () => [...NEWS].sort((a, b) => a.p - b.p || b.d.localeCompare(a.d));

/** News card. `bento` adds the size class used by the home grid (n1 / n2 / n3). */
const ncard = (n, bento = false) => `
<a class="ncard${bento ? " n" + n.p : ""}" href="noticia.html?n=${n.slug}">
  <div class="nimg ${n.g}">${n.img ? `<img src="${n.img}" alt="" loading="lazy" decoding="async" style="object-position:${n.pos || "50% 30%"}">` : ""}<span class="cat">${n.c}</span></div>
  <div class="nbody"><time datetime="${n.d}">${fmt(n.d, 1)}</time><h3>${n.t}</h3><p>${n.s}</p></div>
</a>`;

/** Valid RFC 5545 calendar file as a data URI (1 h event, floating local time). */
const ics = a => {
  const pad = n => String(n).padStart(2, "0");
  const [y, mo, d] = a.d.split("-");
  const [h, mi] = a.h.split(":").map(Number);
  const at = hour => `${y}${mo}${d}T${pad(hour)}${pad(mi)}00`;
  const uid = `${a.d}-${pad(h)}${pad(mi)}-${a.p.normalize("NFD").replace(/[^a-z0-9]/gi, "").toLowerCase()}@vox-concepto`;
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//VOX//Campana 29-N//ES", "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, "")}`,
    `DTSTART:${at(h)}`, `DTEND:${at(Math.min(h + 1, 23))}`,
    `SUMMARY:${a.t} (${a.p})`, `LOCATION:${a.p}`,
    "END:VEVENT", "END:VCALENDAR"
  ];
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
};

/** One agenda row (home + /actos). */
const actoRow = a => `
<li><span class="d">${fmt(a.d)}</span>
  <div><strong>${a.t}</strong><small>${a.p} · ${a.h}</small></div>
  <a class="btn out" download="acto-${a.d}.ics" href="${ics(a)}">Añadir al calendario</a></li>`;

/** Hooks that motion.js fills in. Everything works without them. */
window.VOX = { reveal: null, dialogIn: null, dialogOut: null, amountText: null };

/* ==========================================================================
   Chrome: header, footer, mobile menu
   ========================================================================== */
(() => {
  const $ = id => document.getElementById(id);
  const here = location.pathname.split("/").pop().replace(/\.html$/, "") || "index"; // works with cleanUrls
  const links = [["noticias", "Noticias"], ["propuestas", "Propuestas"], ["actos", "Actos"]]
    .map(([id, label]) => {
      const section = here === id || (id === "noticias" && here === "noticia");
      return `<a href="${id}.html"${section ? ' class="on"' : ""}${here === id ? ' aria-current="page"' : ""}>${label}</a>`;
    }).join("");

  $("hdr").outerHTML = `
<header class="site-header"><div class="wrap bar">
  <a class="logo" href="index.html" aria-label="VOX, inicio"><img src="logo.svg" alt="VOX" width="68" height="33"></a>
  <nav class="site-nav" id="nav" aria-label="Principal">${links}</nav>
  <a class="btn" href="index.html#participa">Únete</a>
  <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="Abrir menú"><span></span><span></span></button>
</div></header>`;

  $("ftr").outerHTML = `
<footer id="contacto"><div class="wrap cols">
  <div><a class="logo" href="index.html"><img src="logo.svg" alt="VOX" width="60" height="29"></a><p>Concepto de rediseño. Sin vínculo oficial.</p></div>
  <div><a href="noticias.html">Noticias</a><a href="propuestas.html">Propuestas</a><a href="actos.html">Actos</a></div>
  <div><a href="#">Aviso legal</a><a href="#">Privacidad</a><a href="#">Cookies</a><a href="#">Accesibilidad</a></div>
</div></footer>`;

  const nav = $("nav"), burger = $("burger");
  const setMenu = open => {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", e => { if (!e.target.closest(".site-header")) setMenu(false); });
  matchMedia("(min-width: 901px)").addEventListener("change", () => setMenu(false));
})();

/* ==========================================================================
   Donations: floating tab + dialog
   ========================================================================== */
(() => {
  document.body.insertAdjacentHTML("beforeend", `
<button class="dtab" type="button" data-donate aria-label="Donar">Donar</button>
<dialog class="dlg" id="dlg" aria-labelledby="dt"><div class="dform">
  <button class="dx" id="dx" type="button" aria-label="Cerrar">×</button>
  <h2 id="dt">Apoya la campaña</h2>
  <p>Tu donativo financia actos, material y presencia en cada provincia.</p>
  <div class="amts" role="group" aria-label="Importe">${[25, 50, 100, 350].map(a => `<button type="button" class="amt" data-a="${a}" aria-pressed="false">${a} €</button>`).join("")}</div>
  <label class="oth">Otra cantidad<input type="number" id="oa" min="1" max="10000" inputmode="numeric" placeholder="€"></label>
  <button type="button" class="btn gold lg" id="go">Donar <span id="ga">50 €</span></button>
  <p class="dnote" id="dn" aria-live="polite">Maqueta: aquí se conectaría la pasarela de pago. Antes de recibir donativos reales, revisa la normativa de financiación de partidos.</p>
</div></dialog>`);

  const $ = id => document.getElementById(id);
  const dlg = $("dlg"), custom = $("oa"), label = $("ga"), note = $("dn");
  const NOTE = note.textContent;
  let amount = 50, closing = false;

  const setAmount = (to, fromPreset = true) => {
    const from = amount;
    amount = to;
    dlg.querySelectorAll(".amt").forEach(b => {
      const on = fromPreset && +b.dataset.a === to;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
    });
    (VOX.amountText || ((_, t) => { label.textContent = t + " €"; }))(from, to, label);
  };

  const open = preset => {
    setAmount(preset || amount);
    custom.value = "";
    note.textContent = NOTE;
    dlg.showModal();
    VOX.dialogIn?.(dlg);
  };
  const close = () => {
    if (!dlg.open || closing) return;
    closing = true;
    const done = () => { dlg.close(); closing = false; };
    VOX.dialogOut ? VOX.dialogOut(dlg, done) : done();
  };

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-donate]");
    if (!t) return;
    e.preventDefault();
    open(+t.dataset.amount);
  });
  dlg.querySelector(".amts").addEventListener("click", e => {
    const b = e.target.closest(".amt");
    if (!b) return;
    custom.value = "";
    setAmount(+b.dataset.a);
  });
  custom.addEventListener("input", () => {
    const v = Math.min(10000, Math.floor(+custom.value));
    if (v > 0) setAmount(v, false);
  });
  $("dx").addEventListener("click", close);
  dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
  dlg.addEventListener("cancel", e => { e.preventDefault(); close(); }); // Esc
  $("go").addEventListener("click", () => { note.textContent = "Gracias. Esto es una maqueta: no se ha realizado ningún cobro."; });
})();
