/* GSAP: pocos efectos y rápidos. Para quitarlos: borra los 3 <script> de gsap/ScrollTrigger/motion.js en cada página. */
(function(){
 if(!window.gsap||!window.ScrollTrigger)return;
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 gsap.registerPlugin(ScrollTrigger);
 const $=s=>document.querySelector(s),$$=s=>gsap.utils.toArray(s);

 /* Hero: titular por líneas y parallax suave de la foto */
 const h1=$(".photo-hero h1");
 if(h1){
  const lines=h1.innerHTML.split(/<br\s*\/?>/i).map(t=>t.trim());
  h1.setAttribute("aria-label",lines.join(" "));
  h1.innerHTML=lines.map(t=>`<span class="ln" aria-hidden="true"><span class="li">${t}</span></span>`).join("");
  gsap.set(".photo-hero",{"--py":"0px","--zs":1});
  gsap.from(".photo-hero .li",{yPercent:105,duration:.7,ease:"power4.out",stagger:.1});
  gsap.from(".photo-hero .btn",{y:14,opacity:0,duration:.5,delay:.35,ease:"power3.out",clearProps:"transform,opacity"});
  gsap.to(".photo-hero",{"--py":"70px","--zs":1.08,ease:"none",scrollTrigger:{trigger:".photo-hero",start:"top top",end:"bottom top",scrub:true}});
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
   gsap.to(three,{x:()=>-dist(),ease:"none",scrollTrigger:{trigger:"#plan",start:"top 68px",end:()=>"+="+dist(),pin:true,scrub:.5,anticipatePin:1,invalidateOnRefresh:true}});
   return()=>{three.classList.remove("htrack");gsap.set(three,{clearProps:"transform"})};
  });
 }

 /* Banda de foto: parallax suave */
 if($(".pimg"))gsap.fromTo(".pimg",{yPercent:-6},{yPercent:6,ease:"none",scrollTrigger:{trigger:".pband",start:"top bottom",end:"bottom top",scrub:true}});

 /* Desplegables fluidos (Nuestras propuestas) */
 $$("details.prop").forEach(d=>{
  const s=d.querySelector("summary"),body=document.createElement("div");body.className="pbody";
  [...d.children].forEach(c=>{if(c!==s)body.appendChild(c)});d.appendChild(body);
  if(d.open)d.classList.add("is-open");
  s.addEventListener("click",e=>{e.preventDefault();if(d._busy)return;d._busy=true;
   if(d.open){d.classList.remove("is-open");
    gsap.to(body,{height:0,opacity:0,duration:.35,ease:"power3.inOut",onComplete:()=>{d.open=false;d._busy=false}});
   }else{d.open=true;d.classList.add("is-open");
    gsap.fromTo(body,{height:0,opacity:0},{height:"auto",opacity:1,duration:.45,ease:"power3.out",onComplete:()=>{d._busy=false}});
   }});
 });

 /* Aparición rápida y sobria de tarjetas y filas */
 const sel=".ncard,.mcard,details.prop,.acts li,.stat,.damt,.carnet-sec>*,.dona>div:first-child,.join,.art>*";
 const els=$$(sel).filter(e=>!e.closest(".photo-hero")&&!e.closest("#plan .three"));
 els.forEach(e=>e.classList.add("gs"));
 gsap.set(els,{opacity:0,y:20});
 ScrollTrigger.batch(els,{start:"top 92%",once:true,
  onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:.5,ease:"power3.out",stagger:.05,overwrite:true,onComplete:()=>{gsap.set(b,{clearProps:"transform,opacity"});b.forEach(e=>e.classList.remove("gs"))}})});
 (document.fonts?document.fonts.ready:Promise.resolve()).then(()=>ScrollTrigger.refresh());
})();
