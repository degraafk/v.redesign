/* VOX · motion — GSAP 3 + ScrollTrigger.
   • Each block runs inside mod(), so one failure can never leave content hidden.
   • Hover states live in CSS (individual `translate`/`scale`); GSAP only writes `transform`.
   • Remove everything: delete the three <script> tags (gsap, ScrollTrigger, motion.js). */
(() => {
  "use strict";
  const root = document.documentElement;
  const { gsap, ScrollTrigger } = window;

  if (!gsap || !ScrollTrigger || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.remove("js");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.6 });
  root.classList.add("motion");

  /* ---------- utils ---------- */
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => gsap.utils.toArray(s, r);
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const HEADER = parseFloat(getComputedStyle(root).getPropertyValue("--header")) || 68;
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const mod = (name, fn) => { try { fn(); } catch (err) { console.warn(`[motion] ${name}`, err); } };
  const seen = key => { try { if (sessionStorage.getItem(key)) return true; sessionStorage.setItem(key, "1"); } catch {} return false; };

  /** Headline split by <br> lines, then characters, each line masked. */
  const splitChars = el => {
    const lines = el.innerHTML.split(/<br\s*\/?>/i).map(s => s.trim());
    el.setAttribute("aria-label", lines.join(" "));
    el.innerHTML = lines.map(l => `<span class="ln" aria-hidden="true">${[...l].map(c => `<span class="ch">${c}</span>`).join("")}</span>`).join("");
    return qa(".ch", el);
  };

  /** Plain-text heading split into masked words. */
  const splitWords = el => {
    const text = el.textContent.trim().replace(/\s+/g, " ");
    el.setAttribute("aria-label", text);
    el.innerHTML = text.split(" ").map(w => `<span class="wm" aria-hidden="true"><span class="wi">${esc(w)}</span></span>`).join(" ");
    return qa(".wi", el);
  };

  /* ==========================================================================
     Header: slides in once per session; nav underline follows the pointer
     ========================================================================== */
  mod("header", () => {
    const header = q(".site-header");
    if (header && !seen("vox-intro")) {
      gsap.from(header, { yPercent: -100, duration: 0.55, clearProps: "transform" });
    }

    const nav = q("#nav");
    if (!nav || !fine) return;
    const ind = document.createElement("span");
    ind.className = "nav-ind";
    ind.setAttribute("aria-hidden", "true");
    nav.append(ind);

    const items = qa("a", nav);
    const active = items.find(a => a.classList.contains("on"));
    const place = (a, instant) => {
      if (!a) return gsap.to(ind, { opacity: 0, duration: 0.2, overwrite: "auto" });
      const jump = instant || gsap.getProperty(ind, "opacity") < 0.05;
      gsap.to(ind, { x: a.offsetLeft + 12, width: a.offsetWidth - 24, opacity: 1, duration: jump ? 0 : 0.35, overwrite: "auto" });
    };
    items.forEach(a => ["pointerenter", "focus"].forEach(ev => a.addEventListener(ev, () => place(a))));
    nav.addEventListener("pointerleave", () => place(active));
    nav.addEventListener("focusout", e => { if (!nav.contains(e.relatedTarget)) place(active); });
    addEventListener("resize", () => place(active, true));
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => place(active, true));
  });

  /* ==========================================================================
     Home hero: one orchestrated sequence, then scroll parallax
     ========================================================================== */
  mod("hero", () => {
    const hero = q(".hero");
    if (!hero) return;
    const img = q(".hero-img", hero), btn = q(".btn", hero);
    const chars = splitChars(q("h1", hero));

    gsap.timeline({ defaults: { ease: "power4.out" } })
      .fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
      .from(chars, { yPercent: 110, rotate: 6, duration: 0.8, stagger: 0.03 }, 0.1)
      .from(btn, { y: 16, opacity: 0, duration: 0.5, clearProps: "transform,opacity" }, 0.6);

    gsap.to(img, { yPercent: 7, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    gsap.to(q(".hero-in", hero), { y: -80, opacity: 0, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "60% top", scrub: true } });
  });

  /* ==========================================================================
     Subpage + article headers: masked word rise, then the rest cascades
     ========================================================================== */
  mod("page-head", () => {
    const head = q(".phead, .pp-head");
    if (!head) return;
    const h1 = q("h1", head);
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .from([...head.children].filter(e => e !== h1), { y: 14, opacity: 0, duration: 0.45, stagger: 0.07, clearProps: "transform,opacity" }, 0)
      .from(splitWords(h1), { yPercent: 110, duration: 0.7, stagger: 0.05, clearProps: "transform" }, 0.05);
  });

  mod("article", () => {
    const art = q(".art");
    if (!art) return;
    const h1 = q("h1", art), figure = q(".hero-img", art);
    const rest = [...art.children].filter(e => e !== h1 && e !== figure && !e.matches(".body, .share"));

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(splitWords(h1), { yPercent: 110, duration: 0.7, stagger: 0.05, clearProps: "transform" }, 0)
      .from(rest, { y: 14, opacity: 0, duration: 0.45, stagger: 0.07, clearProps: "transform,opacity" }, 0.1);
    if (figure) {
      tl.from(figure, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut", clearProps: "clipPath" }, 0.25);
      const photo = q("img", figure);
      if (photo) tl.from(photo, { scale: 1.25, duration: 1.1, ease: "power2.out", clearProps: "transform" }, 0.25);
    }

    if (q(".body", art)) {
      const bar = Object.assign(document.createElement("div"), { className: "progress" });
      bar.setAttribute("aria-hidden", "true");
      document.body.append(bar);
      gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: art, start: "top 20%", end: "bottom 80%", scrub: 0.2 } });
    }
  });

  /* ==========================================================================
     Countdown band: green wipe → number counts up → text slides in
     ========================================================================== */
  mod("countdown", () => {
    const band = q(".dband");
    if (!band || band.hidden) return;
    const num = q("#cd"), text = q("p", band);
    const target = +num.textContent || 0, o = { v: 0 };
    num.textContent = "0";

    gsap.timeline({ scrollTrigger: { trigger: band, start: "top 88%", once: true }, defaults: { ease: "power3.out" } })
      .from(band, { clipPath: "inset(0 100% 0 0)", duration: 0.7, ease: "power4.inOut", clearProps: "clipPath" })
      .to(o, { v: target, duration: 1.2, onUpdate: () => { num.textContent = Math.round(o.v); }, onComplete: () => { num.textContent = target; } }, 0.15)
      .from(text, { x: -32, opacity: 0, duration: 0.6, clearProps: "transform,opacity" }, 0.35);
  });

  /* ==========================================================================
     Marquee: seamless loop, speeds up and reverses with scroll velocity
     ========================================================================== */
  mod("marquee", () => {
    const track = q(".mq");
    if (!track) return;
    const group = q(".mq-in", track);
    const width = group.getBoundingClientRect().width;
    if (!width) return;

    const copies = Math.ceil(innerWidth / width) + 1;
    for (let i = 1; i < copies; i++) {
      const clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.append(clone);
    }

    const loop = gsap.to(track, { xPercent: -100 / copies, duration: width / 90, ease: "none", repeat: -1 });
    ScrollTrigger.create({ trigger: ".marquee", onToggle: s => (s.isActive ? loop.play() : loop.pause()) });

    let idle;
    ScrollTrigger.create({
      onUpdate(self) {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 7);
        gsap.to(loop, { timeScale: boost * self.direction, duration: 0.3, overwrite: true });
        clearTimeout(idle);
        idle = setTimeout(() => gsap.to(loop, { timeScale: self.direction || 1, duration: 1, overwrite: true }), 100);
      }
    });
  });

  /* ==========================================================================
     Manifesto: words light up with scroll; <mark> words draw an underline
     ========================================================================== */
  mod("manifesto", () => {
    const p = q(".mani");
    if (!p) return;

    const label = p.textContent.replace(/\s+/g, " ").trim();
    const visual = document.createElement("span");
    visual.setAttribute("aria-hidden", "true");
    const word = () => Object.assign(document.createElement("span"), { className: "w" });
    let prev = null;

    p.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        const text = node.textContent;
        (text.match(/\S+/g) || []).forEach((tok, i) => {
          if (i === 0 && prev && /^\S/.test(text)) { prev.append(tok); return; } // punctuation sticks to the previous word
          prev = word(); prev.textContent = tok; visual.append(prev);
        });
      } else {
        prev = word(); prev.append(node.cloneNode(true)); visual.append(prev);
      }
    });

    p.replaceChildren(Object.assign(document.createElement("span"), { className: "sr", textContent: label }), visual);

    gsap.to(qa(".w", visual), {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 55%", scrub: true }
    });
    qa("mark", visual).forEach(m => ScrollTrigger.create({
      trigger: m, start: "top 62%", once: true,
      onEnter: () => gsap.to(m, { "--u": "100%", duration: 0.6, ease: "power3.inOut" })
    }));
  });

  /* ==========================================================================
     Plan: pinned horizontal track (desktop only)
     ========================================================================== */
  mod("plan", () => {
    const track = q("#plan .three");
    if (!track) return;
    gsap.matchMedia().add("(min-width: 960px)", () => {
      track.classList.add("htrack");
      const dist = () => Math.max(0, track.scrollWidth - q("#plan .wrap").clientWidth);
      gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: "#plan", start: `top ${HEADER}px`, end: () => `+=${dist()}`, pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true }
      });
      return () => { track.classList.remove("htrack"); gsap.set(track, { clearProps: "transform" }); };
    });
  });

  /* ==========================================================================
     Scroll reveal: one restrained batch for everything else
     ========================================================================== */
  mod("reveal", () => {
    const targets = [
      ".head", ".ncard", ".box", ".mcard", "details.prop", ".acts li", ".join", ".pcta .join",
      ".carnet-sec > div:first-child", ".dona > div:first-child", ".damt", ".plead", ".pnum",
      ".related h2", ".art > .body", ".art > .share"
    ].join(",");
    const els = qa(targets).filter(e => !e.closest(".hero, #plan .three"));
    if (!els.length) return;

    gsap.set(els, { opacity: 0, y: 24 });
    ScrollTrigger.batch(els, {
      start: "top 92%", once: true,
      onEnter: batch => {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, overwrite: true, clearProps: "opacity,transform" });
        const photos = batch.flatMap(e => qa(".nimg img", e));
        if (photos.length) gsap.from(photos, { scale: 1.18, duration: 1, stagger: 0.07, ease: "power2.out", clearProps: "transform" });
      }
    });

    /* lists that re-render (filters) call this for their new nodes */
    VOX.reveal = nodes => {
      gsap.fromTo(gsap.utils.toArray(nodes), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.035, overwrite: true, clearProps: "opacity,transform" });
    };
  });

  mod("side-nav", () => {
    if (q(".side")) gsap.from(".side a", { x: -12, opacity: 0, duration: 0.4, stagger: 0.03, delay: 0.15, clearProps: "transform,opacity" });
  });

  /* ==========================================================================
     Proposals accordion: height tween on <details>
     ========================================================================== */
  mod("accordion", () => {
    qa("details.prop").forEach(d => {
      const summary = q("summary", d), body = q(".pbody", d);
      if (!summary || !body) return;
      let closing = false;

      summary.addEventListener("click", e => {
        e.preventDefault();
        const reopening = closing;
        const fromH = reopening ? body.offsetHeight : 0;
        const fromO = reopening ? +gsap.getProperty(body, "opacity") : 0;
        gsap.killTweensOf(body);

        if (d.open && !reopening) {
          closing = true;
          gsap.to(body, {
            height: 0, opacity: 0, duration: 0.3, ease: "power3.inOut",
            onComplete: () => { d.open = false; closing = false; gsap.set(body, { clearProps: "height,opacity" }); ScrollTrigger.refresh(); }
          });
        } else {
          closing = false;
          d.open = true;
          gsap.fromTo(body, { height: fromH, opacity: fromO }, {
            height: "auto", opacity: 1, duration: 0.4,
            clearProps: "height,opacity", onComplete: () => ScrollTrigger.refresh()
          });
        }
      });
    });
  });

  /* ==========================================================================
     Member card: slides in, then tilts toward the pointer
     ========================================================================== */
  mod("carnet", () => {
    const card = q(".tarjeta");
    if (!card) return;
    gsap.from(card, { y: 60, rotation: -7, opacity: 0, duration: 0.9, clearProps: "transform,opacity", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
    if (!fine) return;

    const rx = gsap.quickTo(card, "rotationX", { duration: 0.4 });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.4 });
    card.addEventListener("pointerenter", () => gsap.set(card, { transformPerspective: 900 }));
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 18);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
    });
    card.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });

  /* ==========================================================================
     Donate dialog + amount picker
     ========================================================================== */
  mod("donate", () => {
    VOX.dialogIn = d => gsap.fromTo(d, { y: 28, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, clearProps: "transform,opacity" });
    VOX.dialogOut = (d, done) => gsap.to(d, {
      y: 14, scale: 0.97, opacity: 0, duration: 0.2, ease: "power2.in",
      onComplete: () => { done(); gsap.set(d, { clearProps: "transform,opacity" }); }
    });

    let count;
    VOX.amountText = (from, to, el) => {
      count?.kill();
      const o = { v: from };
      count = gsap.to(o, { v: to, duration: 0.35, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v) + " €"; }, onComplete: () => { el.textContent = to + " €"; } });
    };

    document.addEventListener("click", e => {
      const b = e.target.closest(".amt");
      if (b) gsap.fromTo(b, { scale: 0.92 }, { scale: 1, duration: 0.45, ease: "back.out(3)", clearProps: "transform" });
    });
  });

  /* ==========================================================================
     Pointer effects (mouse only): magnetic buttons + ring cursor
     ========================================================================== */
  mod("pointer", () => {
    if (!fine) return;

    let magnet = null;
    document.addEventListener("pointermove", e => {
      const b = e.target.closest(".btn");
      if (magnet && magnet !== b) {
        gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
        magnet = null;
      }
      if (!b) return;
      magnet = b;
      const r = b.getBoundingClientRect();
      gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3, overwrite: "auto" });
    });

    const ring = document.createElement("div");
    ring.className = "cur";
    ring.setAttribute("aria-hidden", "true");
    document.body.append(ring);
    const moveX = gsap.quickTo(ring, "x", { duration: 0.35 });
    const moveY = gsap.quickTo(ring, "y", { duration: 0.35 });
    addEventListener("pointermove", e => { moveX(e.clientX); moveY(e.clientY); ring.classList.add("on"); });
    document.addEventListener("pointerleave", () => ring.classList.remove("on"));
    document.addEventListener("pointerover", e => ring.classList.toggle("big", !!e.target.closest("a, button, summary, select, .ncard")));
  });

  /* ---------- ready: reveal the load-timeline targets, then re-measure ---------- */
  root.classList.remove("js");
  addEventListener("load", () => ScrollTrigger.refresh());
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => ScrollTrigger.refresh());
})();
