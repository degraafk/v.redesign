/* GSAP: efectos propios (ScrollTrigger). Para quitarlos: borra los 3 <script> de gsap/ScrollTrigger/motion.js en cada página. */
(function(){
 if(!window.gsap||!window.ScrollTrigger)return;
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 gsap.registerPlugin(ScrollTrigger);
 const $=s=>document.querySelector(s),$$=s=>gsap.utils.toArray(s);
 const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
 const WORDS=".head h2,.dona h2,.carnet-sec h2,.join h2,.pband h2,.pp-head h1";

 gsap.from(".site-header",{yPercent:-100,duration:.7,ease:"power3.out",clearProps:"transform"});

 /* Hero: titular letra a letra, foto con zoom y parallax */
 const h1=$(".photo-hero h1");
 if(h1){
  const lines=h1.innerHTML.split(/<br\s*\/?>/i).map(t=>t.trim());
  h1.setAttribute("aria-label",lines.join(" "));
  h1.innerHTML=lines.map(t=>`<span class="ln" aria-hidden="true">${[...t].map(c=>`<span class="ch">${c}</span>`).join("")}</span>`).join("");
  gsap.set(".photo-hero",{"--py":"0px","--zs":1});
  gsap.from(".photo-hero .eyebrow",{x:-24,opacity:0,duration:.9,ease:"power3.out",delay:.1,clearProps:"transform,opacity"});
  gsap.from(".photo-hero .ch",{yPercent:115,rotate:7,duration:1.1,ease:"power4.out",stagger:.045,delay:.25});
  gsap.from(".photo-hero .hsub,.photo-hero .btn",{y:22,opacity:0,duration:.8,ease:"power3.out",stagger:.12,delay:.95,clearProps:"transform,opacity"});
  gsap.fromTo(".photo-hero",{"--z":1.14},{"--z":1,duration:2.6,ease:"power2.out"});
  gsap.to(".photo-hero",{"--py":"90px","--zs":1.12,ease:"none",scrollTrigger:{trigger:".photo-hero",start:"top top",end:"bottom top",scrub:true}});
  gsap.to(".ph-in",{y:-110,opacity:0,ease:"none",scrollTrigger:{trigger:".photo-hero",start:"top top",end:"65% top",scrub:true}});
  gsap.to(".scrollcue",{opacity:0,ease:"none",scrollTrigger:{trigger:".photo-hero",start:"top top",end:"20% top",scrub:true}});
 }

 /* Cuenta atrás: el número sube contando */
 if($(".dband")){
  const cd=$("#cd"),st={trigger:".dband",start:"top 88%",once:true};
  ScrollTrigger.create({...st,onEnter:()=>{const t=+cd.textContent||0,o={v:0};window.__cdLock=true;
   gsap.to(o,{v:t,duration:1.8,ease:"power3.out",onUpdate:()=>cd.textContent=Math.round(o.v),onComplete:()=>{window.__cdLock=false;cd.textContent=t}})}});
  gsap.from(".dband p",{x:-40,opacity:0,duration:.9,delay:.15,ease:"power3.out",scrollTrigger:st});
 }

 /* Marquees infinitos (uno va en sentido contrario) que reaccionan al scroll */
 const mqs=$$(".marquee");
 if(mqs.length){
  const tws=mqs.map(m=>{const dir=m.dataset.dir==="r"?-1:1,ins=m.querySelectorAll(".mq-in");
   gsap.set(ins,{xPercent:dir>0?0:-100});
   return gsap.to(ins,{xPercent:dir>0?-100:0,repeat:-1,duration:32,ease:"none"})});
  let tid;
  ScrollTrigger.create({onUpdate:s=>{const v=Math.min(Math.abs(s.getVelocity())/250,8);
   tws.forEach(t=>gsap.to(t,{timeScale:(1+v)*s.direction,duration:.25,overwrite:true}));
   clearTimeout(tid);tid=setTimeout(()=>tws.forEach(t=>gsap.to(t,{timeScale:s.direction||1,duration:1.2,overwrite:true})),120)}});
 }

 /* Manifiesto: las palabras se encienden con el scroll */
 const mani=$(".mani");
 if(mani){
  const words=mani.textContent.trim().split(/\s+/);
  mani.setAttribute("aria-label",words.join(" "));
  mani.innerHTML=words.map(w=>`<span class="w" aria-hidden="true">${w}</span>`).join(" ");
  gsap.to(".mani .w",{opacity:1,stagger:.12,ease:"none",scrollTrigger:{trigger:mani,start:"top 78%",end:"bottom 48%",scrub:true}});
 }

 /* Plan: sección fijada con scroll horizontal (escritorio) */
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

 /* Cifras: contadores */
 $$(".stat b").forEach(b=>{const t=+b.dataset.n,o={v:0};
  ScrollTrigger.create({trigger:b,start:"top 92%",once:true,onEnter:()=>gsap.to(o,{v:t,duration:1.8,ease:"power3.out",onUpdate:()=>b.textContent=Math.round(o.v)})})});
 $$(".stat").forEach((e,i)=>gsap.from(e,{y:40,opacity:0,duration:.8,delay:i*.08,ease:"power3.out",clearProps:"transform,opacity",scrollTrigger:{trigger:e,start:"top 92%",once:true}}));

 /* Banda de foto con parallax */
 if($(".pimg"))gsap.fromTo(".pimg",{yPercent:-8},{yPercent:8,ease:"none",scrollTrigger:{trigger:".pband",start:"top bottom",end:"bottom top",scrub:true}});
 if($(".pband"))gsap.from(".pband .btn,.pband p",{y:26,opacity:0,duration:.8,stagger:.12,ease:"power3.out",clearProps:"transform,opacity",scrollTrigger:{trigger:".pband",start:"top 55%",once:true}});

 /* Títulos: aparecen palabra a palabra con máscara */
 $$(WORDS).forEach(h=>{
  const t=h.textContent.trim();if(!t)return;h.setAttribute("aria-label",t);
  h.innerHTML=t.split(/\s+/).map(w=>`<span class="wm" aria-hidden="true"><span class="wi">${w}</span></span>`).join(" ");
  gsap.from(h.querySelectorAll(".wi"),{yPercent:115,duration:.95,ease:"power4.out",stagger:.07,scrollTrigger:{trigger:h,start:"top 90%",once:true}});
 });

 /* Imágenes de noticias: se destapan */
 $$(".ncard .nimg").forEach(el=>gsap.from(el,{clipPath:"inset(0 0 100% 0)",duration:1.1,ease:"power4.inOut",clearProps:"clipPath",scrollTrigger:{trigger:el,start:"top 92%",once:true}}));

 /* Tarjeta de afiliado: entrada y giro 3D con el ratón */
 const card=$(".tarjeta");
 if(card){
  gsap.from(card,{y:60,opacity:0,rotation:-10,duration:1.1,ease:"power3.out",clearProps:"transform,opacity",scrollTrigger:{trigger:card,start:"top 88%",once:true}});
  if(fine){
   card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    gsap.to(card,{rotationY:x*16,rotationX:-y*16,rotation:0,transformPerspective:900,duration:.4,ease:"power2.out",overwrite:true})});
   card.addEventListener("pointerleave",()=>gsap.to(card,{rotationX:0,rotationY:0,rotation:-3,duration:.7,ease:"power3.out",overwrite:true,onComplete:()=>gsap.set(card,{clearProps:"transform"})}));
  }
 }
 if($(".side"))gsap.from(".side a",{x:-18,opacity:0,duration:.6,stagger:.04,ease:"power2.out",delay:.2,clearProps:"transform,opacity"});
 $$(".pnum").forEach(n=>gsap.from(n,{x:-30,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:n,start:"top 88%",once:true}}));

 /* Desplegables fluidos (Nuestras propuestas) */
 $$("details.prop").forEach(d=>{
  const s=d.querySelector("summary"),body=document.createElement("div");body.className="pbody";
  [...d.children].forEach(c=>{if(c!==s)body.appendChild(c)});d.appendChild(body);
  if(d.open)d.classList.add("is-open");
  s.addEventListener("click",e=>{e.preventDefault();if(d._busy)return;d._busy=true;
   if(d.open){d.classList.remove("is-open");
    gsap.to(body,{height:0,opacity:0,duration:.5,ease:"power3.inOut",onComplete:()=>{d.open=false;d._busy=false}});
   }else{d.open=true;d.classList.add("is-open");
    gsap.fromTo(body,{height:0,opacity:0},{height:"auto",opacity:1,duration:.6,ease:"power3.out",onComplete:()=>{d._busy=false}});
   }});
 });

 /* Botones magnéticos (ratón) */
 if(fine)$$(".btn").forEach(b=>{const xq=gsap.quickTo(b,"x",{duration:.5,ease:"power3.out"}),yq=gsap.quickTo(b,"y",{duration:.5,ease:"power3.out"});
  b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();xq((e.clientX-r.left-r.width/2)*.25);yq((e.clientY-r.top-r.height/2)*.35)});
  b.addEventListener("pointerleave",()=>{xq(0);yq(0)})});

 /* Texto gigante del pie: se desplaza con el scroll */
 if($(".bigtype span"))gsap.fromTo(".bigtype span",{xPercent:12},{xPercent:-12,ease:"none",scrollTrigger:{trigger:"footer",start:"top bottom",end:"bottom bottom",scrub:true}});

 /* Aparición en cascada del resto */
 const sel=".head>:not(h2),.pp-head>*,.phead>*,.ncard,.box,.mcard,details.prop,.tl li,.acts li,.join,.carnet-sec>div:first-child,.dona>div:first-child,.damt,.plead,.related h2,.art>*";
 const els=$$(sel).filter(e=>!e.closest(".photo-hero")&&!e.closest("#plan .three")&&!e.matches(WORDS));
 els.forEach(e=>e.classList.add("gs"));
 gsap.set(els,{opacity:0,y:34});
 ScrollTrigger.batch(els,{start:"top 90%",once:true,
  onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:.85,ease:"power3.out",stagger:.08,overwrite:true,onComplete:()=>{gsap.set(b,{clearProps:"transform,opacity"});b.forEach(e=>e.classList.remove("gs"))}})});
 (document.fonts?document.fonts.ready:Promise.resolve()).then(()=>ScrollTrigger.refresh());
})();
