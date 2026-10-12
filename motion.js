/* GSAP: animaciones sobrias. Para quitarlas: borra las 3 etiquetas <script> (gsap, ScrollTrigger, motion.js) de cada página. */
(function(){
 if(!window.gsap||!window.ScrollTrigger)return;                     // si el CDN falla, la web se ve igual
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;  // respeta la preferencia del sistema
 gsap.registerPlugin(ScrollTrigger);
 const $=s=>document.querySelector(s),$$=s=>gsap.utils.toArray(s);

 // header
 gsap.from(".site-header",{yPercent:-100,duration:.7,ease:"power3.out",clearProps:"transform"});

 // hero: titular por líneas, zoom lento y parallax de la foto
 const h1=$(".photo-hero h1");
 if(h1){
  h1.innerHTML=h1.innerHTML.split(/<br\s*\/?>/i).map(t=>`<span class="ln"><span class="li">${t}</span></span>`).join("");
  gsap.from(".photo-hero .li",{yPercent:115,duration:1.15,ease:"power4.out",stagger:.14,delay:.15});
  gsap.from(".photo-hero .btn",{y:22,opacity:0,duration:.8,ease:"power3.out",delay:.75,clearProps:"transform,opacity"});
  gsap.fromTo(".photo-hero",{"--z":1.12},{"--z":1,duration:2.6,ease:"power2.out"});
  gsap.to(".photo-hero",{"--py":"90px",ease:"none",scrollTrigger:{trigger:".photo-hero",start:"top top",end:"bottom top",scrub:true}});
 }

 // franja de cuenta atrás
 if($(".dband")){
  const st={trigger:".dband",start:"top 88%",once:true};
  gsap.from(".dband .num",{yPercent:55,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:st});
  gsap.from(".dband p",{x:-40,opacity:0,duration:.9,delay:.15,ease:"power3.out",scrollTrigger:st});
 }

 // tarjeta de afiliado
 if($(".tarjeta"))gsap.from(".tarjeta",{y:60,opacity:0,rotation:-10,duration:1.1,ease:"power3.out",clearProps:"transform,opacity",scrollTrigger:{trigger:".tarjeta",start:"top 88%",once:true}});

 // propuestas: menú lateral y números grandes
 if($(".side"))gsap.from(".side a",{x:-18,opacity:0,duration:.6,stagger:.04,ease:"power2.out",delay:.2,clearProps:"transform,opacity"});
 $$(".pnum").forEach(n=>gsap.from(n,{x:-30,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:n,start:"top 88%",once:true}}));

 // aparición en cascada del resto de elementos
 const sel=".head,.pp-head>*,.phead>*,.ncard,.box,.mcard,details.prop,.tl li,.acts li,.join,.carnet-sec>div:first-child,.dona>div:first-child,.damt,.plead,.related h2,.art>*";
 const els=$$(sel).filter(e=>!e.closest(".photo-hero"));
 els.forEach(e=>e.classList.add("gs"));
 gsap.set(els,{opacity:0,y:34});
 ScrollTrigger.batch(els,{
  start:"top 90%",once:true,
  onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:.85,ease:"power3.out",stagger:.08,overwrite:true,onComplete:()=>{gsap.set(b,{clearProps:"transform,opacity"});b.forEach(e=>e.classList.remove("gs"))}})
 });
 (document.fonts?document.fonts.ready:Promise.resolve()).then(()=>ScrollTrigger.refresh());
})();
