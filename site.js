/* Datos y piezas compartidas. Edita aquí noticias, propuestas y actos. */
const NEWS=[
{slug:"acto-estepona",p:2,i:"hero.jpg",o:"46% 40%",t:"Acto público en Estepona con cientos de asistentes",d:"2026-10-11",c:"Actos",g:"g1",s:"Una tarde de acto al aire libre con vecinos de la zona y representantes locales.",b:["Cientos de personas se reunieron este domingo en un acto público al aire libre en Estepona, en uno de los primeros encuentros con vecinos tras la convocatoria de las elecciones generales.","Los asistentes pudieron escuchar las intervenciones de los representantes locales y resolver dudas sobre las propuestas del partido.","Este texto es un contenido de ejemplo para la maqueta. Sustitúyelo por la nota de prensa real."]},
{slug:"buzon-hiperregulacion",p:2,i:"img/campo.jpg",o:"36% 30%",t:"Nuevo buzón ciudadano contra la hiperregulación",d:"2026-10-09",c:"Propuestas",g:"g2",s:"Una vía para que autónomos y pymes cuenten qué trámites les frenan.",b:["Se abre un buzón en línea para que autónomos, agricultores y pequeñas empresas señalen los trámites que más tiempo les consumen.","Las aportaciones se agruparán por sectores y servirán para preparar propuestas de simplificación administrativa.","Contenido de ejemplo para la maqueta."]},
{slug:"parlamento-europeo",p:3,t:"Resumen semanal del Parlamento Europeo",d:"2026-10-07",c:"Europa",g:"g3",s:"Los temas de la semana en Bruselas y Estrasburgo, explicados en pocas líneas.",b:["Cada semana resumimos los asuntos más relevantes de la actividad en el Parlamento Europeo y cómo afectan a España.","Este espacio servirá para publicar un resumen breve con enlaces a las votaciones y los documentos oficiales.","Contenido de ejemplo para la maqueta."]},
{slug:"plan-vivienda",p:1,i:"img/vivienda.jpg",o:"50% 45%",t:"Presentamos nuestro plan de vivienda para el 29-N",d:"2026-10-10",c:"Propuestas",g:"g4",s:"Más suelo, licencias ágiles y seguridad jurídica, en un documento claro.",b:["Presentamos las líneas de nuestro plan de vivienda: más suelo disponible, licencias más rápidas y mayor seguridad jurídica para propietarios e inquilinos.","El documento completo estará disponible para descargar y recogerá cada medida con su plazo y su coste.","Contenido de ejemplo para la maqueta. Sustitúyelo por la nota de prensa real."]},
{slug:"voluntariado-29n",p:2,t:"Abrimos el voluntariado para la campaña del 29-N",d:"2026-10-08",c:"Campaña",g:"g1",s:"Reparto, mesas informativas y apoyo el día de las elecciones.",b:["Abrimos el registro de voluntarios para la campaña, que arranca el 13 de noviembre y termina el 27.","Buscamos gente para mesas informativas, reparto de material en los barrios y apoyo durante la jornada electoral.","Contenido de ejemplo para la maqueta."]},
{slug:"calendario-actos",p:2,t:"Este es el calendario de actos de la campaña",d:"2026-10-06",c:"Campaña",g:"g2",s:"Del mitin de arranque al cierre de campaña, ciudad por ciudad.",b:["Publicamos el calendario de actos de las dos semanas de campaña, con ciudades, fechas y horarios.","Puedes añadir cada acto a tu calendario y consultar el listado completo por provincia.","Contenido de ejemplo para la maqueta."]}
,
{slug:"mesas-informativas",p:3,t:"Mesas informativas este fin de semana en cinco provincias",d:"2026-10-05",c:"Campaña",g:"g3",s:"Voluntarios en plazas y mercados para resolver dudas sobre el programa.",b:["Este fin de semana habrá mesas informativas en plazas y mercados de cinco provincias.","Los voluntarios repartirán material y atenderán las dudas de los vecinos.","Contenido de ejemplo para la maqueta."]},
{slug:"voto-por-correo",p:3,t:"Voto por correo: qué trámites hacer y cuándo",d:"2026-10-04",c:"Elecciones",g:"g4",s:"Una guía breve con los pasos para solicitarlo a tiempo.",b:["Resumimos los pasos para solicitar el voto por correo y los documentos que conviene tener a mano.","Consulta siempre los plazos oficiales antes de iniciar el trámite.","Contenido de ejemplo para la maqueta."]},
{slug:"encuesta-pymes",p:3,t:"Primeros resultados de la encuesta a pymes sobre trámites",d:"2026-10-03",c:"Propuestas",g:"g2",s:"Qué gestiones consumen más tiempo a autónomos y pequeñas empresas.",b:["Presentamos un adelanto de los resultados de la encuesta lanzada entre autónomos y pymes.","Los datos servirán para priorizar las medidas de simplificación administrativa.","Contenido de ejemplo para la maqueta."]},
{slug:"sector-agrario",p:3,i:"img/campo.jpg",o:"36% 30%",t:"Reunión con asociaciones del sector agrario",d:"2026-10-02",c:"Actos",g:"g1",s:"Un encuentro para recoger las demandas de agricultores y ganaderos.",b:["Representantes del partido se reunieron con asociaciones del sector para escuchar sus demandas.","Las conclusiones se incorporarán al apartado de campo y mar del programa.","Contenido de ejemplo para la maqueta."]},
{slug:"ponencia-seguridad",p:3,i:"img/noche.jpg",o:"50% 35%",t:"Jornada sobre medios y respaldo a las fuerzas de seguridad",d:"2026-10-01",c:"Propuestas",g:"g3",s:"Un debate abierto sobre plantillas, equipamiento y coordinación.",b:["Se celebró una jornada de trabajo sobre plantillas, equipamiento y coordinación entre cuerpos.","Las propuestas resultantes se publicarán en la web.","Contenido de ejemplo para la maqueta."]}
];
const PROPS=[
{id:"economia",t:"Economía",s:"Menos trámites y menos cargas para quien emprende y contrata.",l:["Ventanilla única digital para empresas","Simplificar altas y licencias de autónomos","Reducir cargas sobre el trabajo y el ahorro"]},
{id:"vivienda",t:"Vivienda",s:"Más oferta y más seguridad jurídica para propietarios e inquilinos.",l:["Liberar suelo y agilizar licencias","Plazos claros en los procesos de desahucio","Ayudas a la primera compra de jóvenes"]},
{id:"campo-y-mar",t:"Campo y mar",s:"Menos burocracia para quien produce alimentos.",l:["Reducir informes y trámites agrarios","Defender los productos españoles en Bruselas","Más infraestructura hídrica"]},
{id:"seguridad",t:"Seguridad",s:"Medios y respaldo para las fuerzas de seguridad.",l:["Más plantillas y mejor equipamiento","Coordinación entre cuerpos","Respuesta judicial más rápida"]},
{id:"familia",t:"Familia",s:"Apoyo directo a quienes quieren formar una familia.",l:["Deducciones por hijo a cargo","Conciliación más flexible","Ayudas para familias numerosas"]},
{id:"energia",t:"Energía",s:"Suministro estable y precios asumibles.",l:["Mix energético con todas las fuentes disponibles","Menos impuestos en la factura","Mejores redes eléctricas"]},
{id:"educacion",t:"Educación",s:"Más exigencia y más libertad de elección.",l:["Evaluaciones comunes en todo el país","Libertad de elección de centro","Refuerzo de la formación profesional"]},
{id:"sanidad",t:"Sanidad",s:"Menos esperas y una gestión más eficiente.",l:["Reducir listas de espera","Historia clínica común entre regiones","Mejores condiciones para el personal sanitario"]},
{id:"europa",t:"España en Europa",s:"Una voz clara en las decisiones que afectan a cada provincia.",l:["Defensa de los intereses nacionales","Fondos europeos con transparencia","Cooperación con aliados europeos"]}
];
const ACTOS=[
{d:"2026-11-14",t:"Mitin de arranque de campaña",p:"Madrid",h:"19:00"},
{d:"2026-11-16",t:"Encuentro con autónomos",p:"Valencia",h:"18:00"},
{d:"2026-11-18",t:"Charla sobre vivienda",p:"Málaga",h:"19:30"},
{d:"2026-11-20",t:"Encuentro con vecinos",p:"Sevilla",h:"18:30"},
{d:"2026-11-22",t:"Jornada con el sector agrario",p:"Murcia",h:"12:00"},
{d:"2026-11-24",t:"Acto sobre seguridad",p:"Barcelona",h:"19:00"},
{d:"2026-11-26",t:"Mesa informativa",p:"Zaragoza",h:"11:00"},
{d:"2026-11-27",t:"Cierre de campaña",p:"Valencia",h:"20:00"}
];
const MES=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const fmt=(iso,long)=>{const [y,m,d]=iso.split("-").map(Number);return long?`${d} de ${["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"][m-1]} de ${y}`:`${d} ${MES[m-1].toUpperCase()}`};
const ncard=n=>`<a class="ncard p${n.p||3}" href="noticia.html?n=${n.slug}"><div class="nimg ${n.g}${n.i?" has":""}"${n.i?` style="--img:url(${n.i});--pos:${n.o}"`:""}><span class="cat">${n.c}</span></div><div class="nbody"><time datetime="${n.d}">${fmt(n.d,1)}</time><h3>${n.t}</h3><p>${n.s}</p></div></a>`;
const sorted=()=>[...NEWS].sort((a,b)=>b.d.localeCompare(a.d));
const byPriority=()=>[...NEWS].sort((a,b)=>(a.p||3)-(b.p||3)||b.d.localeCompare(a.d));
const page=location.pathname.split("/").pop()||"index.html";
const on=h=>page===h?' class="on"':'';
document.getElementById("hdr").outerHTML=`<header class="site-header"><div class="wrap bar">
<a class="logo" href="index.html" aria-label="VOX, inicio"><img src="logo.svg" alt="VOX" width="68" height="33"></a>
<nav id="nav" aria-label="Principal"><a href="noticias.html"${on("noticias.html")}>Noticias</a><a href="propuestas.html"${on("propuestas.html")}>Propuestas</a><a href="actos.html"${on("actos.html")}>Actos</a><a href="index.html#cartel">Materiales</a></nav>
<a class="btn" href="index.html#participa">Únete</a>
<button class="burger" id="burger" aria-expanded="false" aria-controls="nav" aria-label="Abrir menú">☰</button></div></header>`;
document.getElementById("ftr").outerHTML=`<footer id="contacto"><div class="wrap cols">
<div><a class="logo" href="index.html"><img src="logo.svg" alt="VOX" width="60" height="29"></a><p>Concepto de rediseño. Sin vínculo oficial.</p></div>
<div><a href="noticias.html">Noticias</a><a href="propuestas.html">Propuestas</a><a href="actos.html">Actos</a><a href="index.html#cartel">Materiales</a></div>
<div><a href="#">Aviso legal</a><a href="#">Privacidad</a><a href="#">Cookies</a><a href="#">Accesibilidad</a></div></div></footer>`;
const nav=document.getElementById("nav"),bg=document.getElementById("burger");
bg.onclick=()=>{const o=nav.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");bg.setAttribute("aria-expanded",false)}));
const L=document.getElementById("latest");if(L){const all=byPriority(),pick=(p,n)=>all.filter(x=>x.p===p).slice(0,n);L.innerHTML=[...pick(1,1),...pick(2,2),...pick(3,3)].map(ncard).join("")};

/* motion helpers */
const EASE="cubic-bezier(.22,1,.36,1)",calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
const flow=els=>{if(calm)return;els.forEach((el,i)=>el.animate({opacity:[0,1],transform:["translateY(12px)","none"]},{duration:520,delay:Math.min(i,10)*45,easing:EASE,fill:"backwards"}))};
/* accordion with animated height */
document.querySelectorAll("details.prop").forEach(d=>{
 const s=d.querySelector("summary"),rest=[...d.children].filter(c=>c!==s);let a=null;
 d.classList.toggle("is-open",d.open);
 const closedH=()=>{const c=getComputedStyle(d);return s.offsetHeight+parseFloat(c.paddingTop)+parseFloat(c.paddingBottom)+parseFloat(c.borderTopWidth)+parseFloat(c.borderBottomWidth)};
 s.addEventListener("click",e=>{
  e.preventDefault();
  const opening=!d.open;d.classList.toggle("is-open",opening);
  if(calm){d.open=opening;return}
  const from=d.offsetHeight;if(a)a.cancel();
  d.style.overflow="hidden";
  if(opening)d.open=true;
  const to=opening?d.offsetHeight:closedH();
  a=d.animate({height:[from+"px",to+"px"]},{duration:520,easing:EASE});
  rest.forEach(r=>r.animate({opacity:opening?[0,1]:[1,0]},{duration:opening?520:260,easing:EASE,fill:"both"}));
  const done=()=>{a=null;d.style.overflow="";if(!opening)d.open=false;rest.forEach(r=>r.getAnimations().forEach(x=>x.cancel()))};
  a.onfinish=done;a.oncancel=()=>{d.style.overflow=""};
 });
});
