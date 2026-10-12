/* GSAP: efectos propios (ScrollTrigger). Para quitarlos: borra los 3 <script> de gsap/ScrollTrigger/motion.js en cada página. */
(function(){
 if(!window.gsap||!window.ScrollTrigger)return;
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 gsap.registerPlugin(ScrollTrigger);
 const $=s=>document.querySelector(s),$$=s=>gsap.utils.toArray(s);
 const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;

 gsap.from(".site-header",{yPercent:-100,duration:.7,ease:"power3.out",clearProps:"transform"});

 /* 1. Hero: titular letra a letra + foto con zoom y parallax */
 const h1=$(".photo-hero h1");
 if(h1){
  const lines=h1.innerHTML.split(/<br\s*\/?>/i).map(t=>t.trim());
  h1.setAttribute("aria-label",lines.join(" "));
  h1.innerHTML=lines.map(t=>`<span class="ln" aria-hidden="true">${[...t].map(c=>`<span class="ch">${c}</span>`).join("")}</span>`).join("");
  gsap.set(".photo-hero",{"--py":"0px","--zs":1});
  gsap.from(".photo-hero .ch",{yPercent:115,rotate:7,duration:1.1,ease:"power4.out",stagger:.045,delay:.2});
  gsap.from(".photo-hero .btn",{y:22,opacity:0,duration:.8,ease:"power3.out",delay:.95,clearProps:"transform,opacity"});
  gsap.fromTo(".photo-hero",{"--z":1.14},{"--z":1,duration:2.6,ease:"power2.out"});
  gsap.to(".photo-hero",{"--py":"90px","--zs":1.12,ease:"none",scrollTrigger:{trigger:".photo-hero",start:"top top",end:"bottom top",scrub:true}});
  gsap.to(".ph-in",{y:-110,opacity:0,ease:"none",scrollTrigger:{trigger:".photo-hero",start:"top top",end:"65% top",scrub:true}});
 }

 /* 2. Cuenta atrás: el número sube contando */
 if($(".dband")){
  const cd=$("#cd"),st={trigger:".dband",start:"top 88%",once:true};
  ScrollTrigger.create({...st,onEnter:()=>{const t=+cd.textContent||0,o={v:0};window.__cdLock=true;
   gsap.to(o,{v:t,duration:1.8,ease:"power3.out",onUpdate:()=>cd.textContent=Math.round(o.v),onComplete:()=>{window.__cdLock=false;cd.textContent=t}})}});
  gsap.from(".dband p",{x:-40,opacity:0,duration:.9,delay:.15,ease:"power3.out",scrollTrigger:st});
 }

 /* 3. Marquee infinito que reacciona a la velocidad del scroll */
 if($(".mq")){
  const mq=gsap.to(".mq-in",{xPercent:-100,repeat:-1,duration:32,ease:"none"});let tid;
  ScrollTrigger.create({onUpdate:s=>{const v=Math.min(Math.abs(s.getVelocity())/250,8);
   gsap.to(mq,{timeScale:(1+v)*s.direction,duration:.25,overwrite:true});
   clearTimeout(tid);tid=setTimeout(()=>gsap.to(mq,{timeScale:s.direction||1,duration:1.2,overwrite:true}),120)}});
 }

 /* 4. Manifiesto: las palabras se encienden con el scroll */
 const mani=$(".mani");
 if(mani){
  const words=mani.textContent.trim().split(/\s+/);
  mani.setAttribute("aria-label",words.join(" "));
  mani.innerHTML=words.map(w=>`<span class="w" aria-hidden="true">${w}</span>`).join(" ");
  gsap.to(".mani .w",{opacity:1,stagger:.12,ease:"none",scrollTrigger:{trigger:mani,start:"top 78%",end:"bottom 48%",scrub:true}});
 }

 /* 5. Plan: sección fijada con scroll horizontal (solo escritorio) */
 const three=$("#plan .three");
 if(three){
  $$("#plan .box").forEach((b,i)=>{if(!b.querySelector(".hn"))b.insertAdjacentHTML("afterbegin",`<span class="hn" aria-hidden="true">0${i+1}</span>`)});
  gsap.matchMedia().add("(min-width: 960px)",()=>{
   three.classList.add("htrack");
   const dist=()=>Math.max(0,three.scrollWidth-$("#plan .wrap").clientWidth);
   gsap.to(three,{x:()=>-dist(),ease:"none",scrollTrigger:{trigger:"#plan",start:"top 68px",end:()=>"+="+dist(),pin:true,scrub:.6,anticipatePin:1,invalidateOnRefresh:true}});
   return()=>{three.classList.remove("htrack");gsap.set(three,{clearProps:"transform"})};
  });
 }

 /* 6. Imágenes de noticias: se destapan */
 $$(".ncard .nimg").forEach(el=>gsap.from(el,{clipPath:"inset(0 0 100% 0)",duration:1.1,ease:"power4.inOut",clearProps:"clipPath",scrollTrigger:{trigger:el,start:"top 92%",once:true}}));

 /* 7. Tarjeta de afiliado, menú y números de propuestas */
 if($(".tarjeta"))gsap.from(".tarjeta",{y:60,opacity:0,rotation:-10,duration:1.1,ease:"power3.out",clearProps:"transform,opacity",scrollTrigger:{trigger:".tarjeta",start:"top 88%",once:true}});
 if($(".side"))gsap.from(".side a",{x:-18,opacity:0,duration:.6,stagger:.04,ease:"power2.out",delay:.2,clearProps:"transform,opacity"});
 $$(".pnum").forEach(n=>gsap.from(n,{x:-30,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:n,start:"top 88%",once:true}}));

 /* 8. Botones magnéticos y cursor circular (solo ratón) */
 if(fine){
  $$(".btn").forEach(b=>{const xq=gsap.quickTo(b,"x",{duration:.5,ease:"power3.out"}),yq=gsap.quickTo(b,"y",{duration:.5,ease:"power3.out"});
   b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();xq((e.clientX-r.left-r.width/2)*.25);yq((e.clientY-r.top-r.height/2)*.35)});
   b.addEventListener("pointerleave",()=>{xq(0);yq(0)})});
  const c=document.createElement("div");c.className="cur";c.setAttribute("aria-hidden","true");document.body.appendChild(c);
  const qx=gsap.quickTo(c,"x",{duration:.35,ease:"power3"}),qy=gsap.quickTo(c,"y",{duration:.35,ease:"power3"});
  addEventListener("pointermove",e=>{qx(e.clientX);qy(e.clientY);c.classList.add("on")});
  document.addEventListener("pointerover",e=>c.classList.toggle("big",!!e.target.closest("a,button,summary,.ncard,.damt,.chip")));
 }

 /* 9. Aparición en cascada del resto */
 const sel=".head,.pp-head>*,.phead>*,.ncard,.box,.mcard,details.prop,.tl li,.acts li,.join,.carnet-sec>div:first-child,.dona>div:first-child,.damt,.plead,.related h2,.art>*";
 const els=$$(sel).filter(e=>!e.closest(".photo-hero")&&!e.closest("#plan .three"));
 els.forEach(e=>e.classList.add("gs"));
 gsap.set(els,{opacity:0,y:34});
 ScrollTrigger.batch(els,{start:"top 90%",once:true,
  onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:.85,ease:"power3.out",stagger:.08,overwrite:true,onComplete:()=>{gsap.set(b,{clearProps:"transform,opacity"});b.forEach(e=>e.classList.remove("gs"))}})});
 (document.fonts?document.fonts.ready:Promise.resolve()).then(()=>ScrollTrigger.refresh());
})();
