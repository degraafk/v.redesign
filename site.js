/* Datos y piezas compartidas. Edita aquí noticias, propuestas y actos. */
const NEWS=[
{slug:"acto-estepona",t:"Acto público en Estepona con cientos de asistentes",d:"2026-10-11",c:"Actos",g:"g1",s:"Una tarde de acto al aire libre con vecinos de la zona y representantes locales.",b:["Cientos de personas se reunieron este domingo en un acto público al aire libre en Estepona, en uno de los primeros encuentros con vecinos tras la convocatoria de las elecciones generales.","Los asistentes pudieron escuchar las intervenciones de los representantes locales y resolver dudas sobre las propuestas del partido.","Este texto es un contenido de ejemplo para la maqueta. Sustitúyelo por la nota de prensa real."]},
{slug:"buzon-hiperregulacion",t:"Nuevo buzón ciudadano contra la hiperregulación",d:"2026-10-09",c:"Propuestas",g:"g2",s:"Una vía para que autónomos y pymes cuenten qué trámites les frenan.",b:["Se abre un buzón en línea para que autónomos, agricultores y pequeñas empresas señalen los trámites que más tiempo les consumen.","Las aportaciones se agruparán por sectores y servirán para preparar propuestas de simplificación administrativa.","Contenido de ejemplo para la maqueta."]},
{slug:"parlamento-europeo",t:"Resumen semanal del Parlamento Europeo",d:"2026-10-07",c:"Europa",g:"g3",s:"Los temas de la semana en Bruselas y Estrasburgo, explicados en pocas líneas.",b:["Cada semana resumimos los asuntos más relevantes de la actividad en el Parlamento Europeo y cómo afectan a España.","Este espacio servirá para publicar un resumen breve con enlaces a las votaciones y los documentos oficiales.","Contenido de ejemplo para la maqueta."]},
{slug:"plan-vivienda",t:"Presentamos nuestro plan de vivienda para el 29-N",d:"2026-10-10",c:"Propuestas",g:"g4",s:"Más suelo, licencias ágiles y seguridad jurídica, en un documento claro.",b:["Presentamos las líneas de nuestro plan de vivienda: más suelo disponible, licencias más rápidas y mayor seguridad jurídica para propietarios e inquilinos.","El documento completo estará disponible para descargar y recogerá cada medida con su plazo y su coste.","Contenido de ejemplo para la maqueta. Sustitúyelo por la nota de prensa real."]},
{slug:"voluntariado-29n",t:"Abrimos el voluntariado para la campaña del 29-N",d:"2026-10-08",c:"Campaña",g:"g1",s:"Reparto, mesas informativas y apoyo el día de las elecciones.",b:["Abrimos el registro de voluntarios para la campaña, que arranca el 13 de noviembre y termina el 27.","Buscamos gente para mesas informativas, reparto de material en los barrios y apoyo durante la jornada electoral.","Contenido de ejemplo para la maqueta."]},
{slug:"calendario-actos",t:"Este es el calendario de actos de la campaña",d:"2026-10-06",c:"Campaña",g:"g2",s:"Del mitin de arranque al cierre de campaña, ciudad por ciudad.",b:["Publicamos el calendario de actos de las dos semanas de campaña, con ciudades, fechas y horarios.","Puedes añadir cada acto a tu calendario y consultar el listado completo por provincia.","Contenido de ejemplo para la maqueta."]}
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
const ncard=n=>`<a class="ncard" href="noticia.html?n=${n.slug}"><div class="nimg ${n.g}"><span class="cat">${n.c}</span></div><div class="nbody"><time datetime="${n.d}">${fmt(n.d,1)}</time><h3>${n.t}</h3><p>${n.s}</p></div></a>`;
const sorted=()=>[...NEWS].sort((a,b)=>b.d.localeCompare(a.d));
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
const L=document.getElementById("latest");if(L)L.innerHTML=sorted().slice(0,3).map(ncard).join("");
