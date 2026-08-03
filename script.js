/* =========================================================================
   SCRIPT.JS — layout logic + animations. Content lives in content.js.
   ========================================================================= */
(function(){
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     ICONS (inline SVG strings, keyed by name)
  --------------------------------------------------------------------- */
  const ICONS = {
    powerbi: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="4" height="10" rx="1" fill="currentColor" opacity=".55"/><rect x="10" y="6" width="4" height="15" rx="1" fill="currentColor" opacity=".8"/><rect x="17" y="2" width="4" height="19" rx="1" fill="currentColor"/></svg>`,
    sql: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" stroke-width="1.6"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="currentColor" stroke-width="1.6"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="currentColor" stroke-width="1.6"/></svg>`,
    excel: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" stroke-width="1.2" opacity=".6"/></svg>`,
    python: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2c-3 0-4 1.2-4 3v2.4h4.2v.6H5.8C4 8 3 9.6 3 12s1 4 2.8 4H8v-2.2c0-2 1.7-3.4 3.6-3.4H16c1.6 0 2.8-1.3 2.8-2.8V5c0-1.8-1-3-4-3h-2.8Zm-1.6 2.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" fill="currentColor" opacity=".85"/><path d="M12 22c3 0 4-1.2 4-3v-2.4h-4.2v-.6h6.4c1.8 0 2.8-1.6 2.8-4s-1-4-2.8-4H16v2.2c0 2-1.7 3.4-3.6 3.4H8c-1.6 0-2.8 1.3-2.8 2.8V19c0 1.8 1 3 4 3h2.8Zm1.6-2.3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill="currentColor"/></svg>`,
    mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.6"/></svg>`,
    linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 10v7M7.5 7.2v.1M11.5 17v-4.2c0-1.5 1-2.6 2.4-2.6 1.4 0 2.1 1 2.1 2.6V17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor"/></svg>`,
    doc: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M6 2h9l5 5v15H6V2Z" stroke="currentColor" stroke-width="1.4"/><path d="M15 2v5h5" stroke="currentColor" stroke-width="1.4"/></svg>`
  };

  /* ---------------------------------------------------------------------
     RENDER: SKILLS
  --------------------------------------------------------------------- */
  function renderSkills(){
    const grid = document.getElementById("skills-grid");
    if(!grid || typeof SKILLS === "undefined") return;
    grid.innerHTML = SKILLS.map((s, i) => `
      <div class="skill-card reveal" style="--delay:${(i % 4) * 0.6}s; transition-delay:${i * 0.08}s">
        <div class="skill-icon">${ICONS[s.icon] || ""}</div>
        <h3 class="skill-name">${escapeHTML(s.name)}</h3>
        <p class="skill-blurb">${escapeHTML(s.blurb)}</p>
      </div>
    `).join("");
  }

  /* ---------------------------------------------------------------------
     RENDER: PROJECTS
  --------------------------------------------------------------------- */
  function isPowerBI(tools){
    return Array.isArray(tools) && tools.some(t => /power\s*bi/i.test(t));
  }

  function renderProjects(){
    const grid = document.getElementById("projects-grid");
    if(!grid || typeof PROJECTS === "undefined") return;

    if(PROJECTS.length === 0){
      grid.innerHTML = `<p class="section-sub">No projects yet — add one in <code>js/content.js</code>.</p>`;
      return;
    }

    grid.innerHTML = PROJECTS.map((p) => {
      const featured = !!p.featured || isPowerBI(p.tools);
      const media = p.image
        ? `<img src="${p.image}" alt="${escapeHTML(p.title)} dashboard preview">`
        : `<div class="media-placeholder">${chartPlaceholderSVG()}</div>`;

      const badge = isPowerBI(p.tools)
        ? `<span class="pbi-badge">${ICONS.powerbi}Power BI</span>` : "";

      const tools = (p.tools || []).map(t => `<span class="tool-tag">${escapeHTML(t)}</span>`).join("");

      const insights = (p.insights && p.insights.length)
        ? `<ul class="insights">${p.insights.map(i => `<li>${escapeHTML(i)}</li>`).join("")}</ul>`
        : "";

      const links = `
        <div class="project-links">
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">${ICONS.github} Code</a>` : ""}
          ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">${arrowIcon()} Live</a>` : ""}
        </div>`;

      const templateFlag = p.isTemplate
        ? `<span class="template-flag">${ICONS.doc.replace(/width="26" height="26"/, 'width="12" height="12"')} Template — replace me</span>`
        : "";

      return `
        <article class="project-card reveal ${featured ? "featured" : ""}">
          <div class="project-media">
            ${media}
            ${badge}
          </div>
          <div class="project-body">
            ${templateFlag}
            <h3 class="project-title">${escapeHTML(p.title)}</h3>
            <p class="project-desc">${escapeHTML(p.description || "")}</p>
            <div class="tool-tags">${tools}</div>
            ${insights}
            ${links}
          </div>
        </article>
      `;
    }).join("");
  }

  function chartPlaceholderSVG(){
    return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" opacity=".4"/>
      <rect x="10" y="7" width="4" height="14" rx="1" fill="currentColor" opacity=".6"/>
      <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" opacity=".9"/>
    </svg>`;
  }
  function arrowIcon(){
    return `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="vertical-align:-1px"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  /* ---------------------------------------------------------------------
     RENDER: CONTACT LINKS
  --------------------------------------------------------------------- */
  function renderContact(){
    const wrap = document.getElementById("contact-links");
    if(!wrap || typeof CONTACT_LINKS === "undefined") return;
    wrap.innerHTML = CONTACT_LINKS.map(c => `
      <a class="contact-link" href="${c.href}" target="${c.href.startsWith('mailto:') ? '_self' : '_blank'}" rel="noopener">
        <span class="ic">${ICONS[c.icon] || ""}</span>
        <span>
          <span class="cl-label">${escapeHTML(c.label)}</span><br>
          <span class="cl-value">${escapeHTML(c.value)}</span>
        </span>
      </a>
    `).join("");
  }

  function escapeHTML(str){
    if(str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------------------------------------------------------------------
     NAV: scroll state, active link, mobile toggle
  --------------------------------------------------------------------- */
  function initNav(){
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });

    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => links.classList.remove("open"));
    });

    // active link on scroll
    const sections = [...document.querySelectorAll("main > section, main")].filter(s => s.id);
    const navLinks = [...document.querySelectorAll("[data-nav]")];

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const id = entry.target.id;
          navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(s => spy.observe(s));
  }

  /* ---------------------------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------------------------- */
  function initReveal(){
    const items = document.querySelectorAll(".reveal");
    if(reduceMotion){
      items.forEach(el => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    items.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------------------
     SCROLL CUE + smooth-scroll offset
  --------------------------------------------------------------------- */
  function initScrollCue(){
    const cue = document.getElementById("scroll-cue");
    if(!cue) return;
    cue.addEventListener("click", () => {
      document.getElementById("about").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------------------
     GENTLE PARALLAX on hero visual (mouse move) — desktop only, subtle
  --------------------------------------------------------------------- */
  function initParallax(){
    if(reduceMotion) return;
    const visual = document.getElementById("hero-visual");
    if(!visual || window.matchMedia("(hover: none)").matches) return;

    let raf = null;
    visual.addEventListener("mousemove", (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        visual.querySelectorAll(".float-chip").forEach((chip, i) => {
          const depth = 6 + (i % 3) * 3;
          chip.style.setProperty("--px", `${x * depth}px`);
          chip.style.setProperty("--py", `${y * depth}px`);
          chip.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
        const card = document.getElementById("photo-card");
        if(card) card.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
      });
    });
    visual.addEventListener("mouseleave", () => {
      visual.querySelectorAll(".float-chip").forEach(chip => chip.style.transform = "");
      const card = document.getElementById("photo-card");
      if(card) card.style.transform = "";
    });
  }

  /* ---------------------------------------------------------------------
     BACKGROUND CANVAS — floating data grid / constellation
  --------------------------------------------------------------------- */
  function initCanvas(){
    const canvas = document.getElementById("bg-canvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    let points = [];
    let scrollY = 0;

    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = Math.min(h, window.innerHeight * 2.2) * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = Math.min(h, window.innerHeight * 2.2) + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedPoints();
    }

    function seedPoints(){
      const viewH = window.innerHeight * 2.2;
      const density = Math.min(70, Math.floor((w * viewH) / 26000));
      points = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * viewH,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        r: Math.random() * 1.4 + 0.6
      }));
    }

    function step(){
      if(!reduceMotion){
        const viewH = window.innerHeight * 2.2;
        ctx.clearRect(0, 0, w, viewH);

        // dot grid (very faint)
        ctx.fillStyle = "rgba(151,168,209,0.05)";
        const gap = 46;
        for(let gx = (scrollY * 0.02) % gap; gx < w; gx += gap){
          for(let gy = 0; gy < viewH; gy += gap){
            ctx.fillRect(gx, gy, 1, 1);
          }
        }

        // move + draw points
        points.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if(p.x < 0) p.x = w; if(p.x > w) p.x = 0;
          if(p.y < 0) p.y = viewH; if(p.y > viewH) p.y = 0;
        });

        // connecting lines
        for(let i = 0; i < points.length; i++){
          for(let j = i + 1; j < points.length; j++){
            const a = points[i], b = points[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < 130){
              ctx.strokeStyle = `rgba(69,217,192,${0.09 * (1 - dist / 130)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        points.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(124,233,214,0.5)";
          ctx.fill();
        });
      }
      requestAnimationFrame(step);
    }

    window.addEventListener("resize", debounce(resize, 200));
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
      canvas.style.transform = `translateY(${-scrollY * 0.06}px)`;
    }, { passive: true });

    resize();
    step();
  }

  function debounce(fn, wait){
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }

  /* ---------------------------------------------------------------------
     CONTACT FORM — mailto fallback (no backend required)
  --------------------------------------------------------------------- */
  function initContactForm(){
    const form = document.getElementById("contact-form");
    if(!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const to = (typeof PROFILE !== "undefined" && PROFILE.email) ? PROFILE.email : "";
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

  /* ---------------------------------------------------------------------
     INIT
  --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    renderSkills();
    renderProjects();
    renderContact();
    initNav();
    initReveal();
    initScrollCue();
    initParallax();
    initCanvas();
    initContactForm();
  });
})();
