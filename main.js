/* ============================================================
   SNEHAL DAS — main.js
   Pure vanilla JS scroll animations — no CDN needed.
   Apple-style: purposeful, choreographed, smooth.
   ============================================================ */

/* ── THEME ── */
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasAnime = () => typeof window.anime === 'function' && motionOK;

function toggleTheme() {
  const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  document.querySelector('.theme-btn .theme-icon').textContent = t === 'dark' ? '☽' : '☼';
}
(function initTheme() {
  const t = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
  const icon = document.querySelector('.theme-btn .theme-icon');
  if (icon) icon.textContent = t === 'dark' ? '☽' : '☼';
})();

/* ── TYPEWRITER ── */
const roles = ['Post-Quantum Cryptographer','Assistive Tech Builder','Quantum Computing Explorer','F1 Strategy Engineer','CSE Researcher @ SRMIST'];
let ri = 0, ci = 0, del = false;
const tw = document.getElementById('typeTarget');
function type() {
  const w = roles[ri];
  if (!del) { ci++; tw.innerHTML = w.slice(0,ci)+'<span class="cursor"></span>'; if(ci===w.length){setTimeout(()=>{del=true;type()},2400);return;} }
  else { ci--; tw.innerHTML = w.slice(0,ci)+'<span class="cursor"></span>'; if(ci===0){del=false;ri=(ri+1)%roles.length;} }
  setTimeout(type, del?36:68);
}
if (tw) type();

/* ── PAGE PROGRESS ── */
function updatePageProgress() {
  const bar = document.querySelector('.nav-progress');
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  bar.style.transform = `scaleX(${pct})`;
}
window.addEventListener('scroll', updatePageProgress, { passive: true });
window.addEventListener('resize', updatePageProgress);
updatePageProgress();

/* ── ANIME.JS DYNAMIC MOTION ── */
function initAnimeMotion() {
  if (!hasAnime()) return;

  const scrollLine = document.querySelector('.scroll-line');
  if (scrollLine) {
    scrollLine.style.animation = 'none';
    anime({
      targets: scrollLine,
      keyframes: [
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, transformOrigin: 'top' },
        { scaleY: 0, transformOrigin: 'bottom' }
      ],
      duration: 1800,
      easing: 'easeInOutSine',
      loop: true
    });
  }

  const marquee = document.querySelector('[data-marquee]');
  if (marquee) {
    marquee.style.animation = 'none';
    const marqueeLoop = anime({
      targets: marquee,
      translateX: ['0%', '-50%'],
      duration: 26000,
      easing: 'linear',
      loop: true
    });
    marquee.closest('.marquee-strip')?.addEventListener('mouseenter', () => marqueeLoop.pause());
    marquee.closest('.marquee-strip')?.addEventListener('mouseleave', () => marqueeLoop.play());
  }

  const ribbonWords = document.querySelectorAll('.ribbon-word');
  if (ribbonWords.length) {
    anime({
      targets: ribbonWords,
      translateY: (_, i) => i % 2 ? [-3, 6] : [5, -4],
      scale: (_, i) => i % 3 === 0 ? [1, 1.06] : [1.03, 1],
      opacity: (_, i) => i % 2 ? [.44, .95] : [.72, 1],
      delay: anime.stagger(75),
      duration: 2600,
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true
    });
  }

  anime({
    targets: '.pulse-dot',
    scale: [1, .62, 1],
    opacity: [1, .35, 1],
    duration: 1900,
    easing: 'easeInOutSine',
    loop: true
  });

  anime({
    targets: '.hero-photo-wrap',
    translateY: [-8, 8],
    rotate: [-.35, .35],
    duration: 5200,
    direction: 'alternate',
    easing: 'easeInOutSine',
    loop: true
  });

  anime({
    targets: '.hero-stats-bar',
    translateY: [0, -6],
    duration: 3600,
    direction: 'alternate',
    easing: 'easeInOutSine',
    loop: true
  });

  document.querySelectorAll('.btn-fill, .btn-line, .pill').forEach(el => {
    el.addEventListener('mouseenter', () => anime.remove(el));
    el.addEventListener('mouseenter', () => anime({ targets: el, scale: 1.025, duration: 260, easing: 'easeOutQuad' }));
    el.addEventListener('mouseleave', () => {
      anime.remove(el);
      anime({ targets: el, scale: 1, duration: 300, easing: 'easeOutQuad' });
    });
  });

  document.querySelectorAll('.skill-card, .exp-card, .project-row, .contact-row').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      anime.remove(el);
      anime({
        targets: el,
        rotateX: -y * 3,
        rotateY: x * 4,
        translateY: -3,
        scale: 1.008,
        duration: 420,
        easing: 'easeOutExpo'
      });
    });
    el.addEventListener('pointerleave', () => {
      anime.remove(el);
      anime({
        targets: el,
        rotateX: 0,
        rotateY: 0,
        translateY: 0,
        scale: 1,
        duration: 650,
        easing: 'easeOutExpo'
      });
    });
  });
}

/* ── SCROLL HINT FADE ── */
window.addEventListener('scroll', () => {
  const h = document.querySelector('.scroll-hint');
  if (h) h.style.opacity = scrollY > 80 ? '0' : '.35';
}, { passive: true });

/* ── NAV ACTIVE ── */
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const m = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (m) m.classList.add('active');
    }
  });
}, { threshold: .35 }).observe;
document.querySelectorAll('section[id]').forEach(s => {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const m = document.querySelector(`.nav-links a[href="#${s.id}"]`);
      if (m) m.classList.add('active');
    }
  }, { threshold: .35 }).observe(s);
});

/* ═══════════════════════════════════════════════════════════
   CORE ANIMATION ENGINE
   Smooth easing + requestAnimationFrame tweening.
   ═══════════════════════════════════════════════════════════ */

// Easing functions
const ease = {
  outExpo:  t => t===1 ? 1 : 1 - Math.pow(2, -10*t),
  outCubic: t => 1 - Math.pow(1-t, 3),
  outBack:  t => { const c = 1.70158; return 1 + (c+1)*Math.pow(t-1,3) + c*Math.pow(t-1,2); },
  outQuart: t => 1 - Math.pow(1-t, 4),
};

/**
 * tween(el, props, opts)
 * props: { opacity:[0,1], translateY:[40,0], scale:[.95,1], ... }
 * opts:  { duration, delay, easing }
 */
function tween(el, props, opts = {}) {
  const { duration = 700, delay = 0, easing = ease.outExpo } = opts;
  let start = null;

  // parse props into [from, to] numeric pairs
  const keys = Object.keys(props);

  setTimeout(() => {
    function frame(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = easing(p);

      let transform = '';
      keys.forEach(k => {
        const [from, to] = props[k];
        const v = from + (to - from) * e;
        if (k === 'opacity') el.style.opacity = v;
        else if (k === 'translateY') transform += `translateY(${v}px) `;
        else if (k === 'translateX') transform += `translateX(${v}px) `;
        else if (k === 'scale') transform += `scale(${v}) `;
        else if (k === 'rotate') transform += `rotate(${v}deg) `;
      });
      if (transform) el.style.transform = transform.trim();

      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, delay);
}

/** staggered tween for a NodeList */
function tweenAll(els, props, opts = {}) {
  const { stagger = 80, ...rest } = opts;
  els.forEach((el, i) => tween(el, props, { ...rest, delay: (opts.delay || 0) + i * stagger }));
}

/* ═══════════════════════════════════════════════════════════
   HERO — runs on DOMContentLoaded (no scroll needed)
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initAnimeMotion();

  const heroEls = document.querySelectorAll('.anim-hero');
  if (hasAnime()) {
    anime({
      targets: heroEls,
      opacity: [0, 1],
      translateY: [42, 0],
      delay: anime.stagger(130, { start: 110 }),
      duration: 900,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.anim-photo',
      opacity: [0, 1],
      translateX: [62, 0],
      duration: 1050,
      delay: 220,
      easing: 'easeOutExpo'
    });
  } else {
    heroEls.forEach((el, i) => {
      tween(el, { opacity:[0,1], translateY:[40,0] }, {
        duration: 800, delay: 120 + i * 140, easing: ease.outExpo
      });
    });

    const photo = document.querySelector('.anim-photo');
    if (photo) tween(photo, { opacity:[0,1], translateX:[60,0] }, { duration: 1000, delay: 200, easing: ease.outExpo });
  }

  // stat count-up
  setTimeout(() => {
    document.querySelectorAll('.stat-n').forEach(el => {
      const end = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dec = String(end).includes('.') ? 1 : 0;
      if (hasAnime()) {
        const state = { value: 0 };
        anime({
          targets: state,
          value: end,
          duration: 1300,
          easing: 'easeOutExpo',
          update: () => { el.textContent = state.value.toFixed(dec) + suffix; }
        });
        return;
      }
      let s = null;
      function countFrame(ts) {
        if (!s) s = ts;
        const p = Math.min((ts-s)/1200, 1);
        const v = (end * ease.outExpo(p)).toFixed(dec);
        el.textContent = v + suffix;
        if (p < 1) requestAnimationFrame(countFrame);
      }
      requestAnimationFrame(countFrame);
    });
  }, 900);
});

/* ═══════════════════════════════════════════════════════════
   SCROLL-TRIGGERED ANIMATIONS
   IntersectionObserver watches sections; fires RAF tweens.
   ═══════════════════════════════════════════════════════════ */

// Generic: watch a section, fire callback once on enter
function onSectionEnter(id, cb, threshold = 0.12) {
  const el = document.getElementById(id);
  if (!el) return;
  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) { cb(); obs.disconnect(); }
  }, { threshold }).observe(el);
}

/* ABOUT */
onSectionEnter('about', () => {
  const els = document.querySelectorAll('#about .reveal-el');
  els.forEach((el, i) => {
    tween(el, { opacity:[0,1], translateY:[36,0] }, {
      duration: 750, delay: i * 100, easing: ease.outExpo
    });
  });
  document.querySelectorAll('#about .detail').forEach((el, i) => {
    tween(el, { opacity:[0,1], translateX:[-24,0] }, {
      duration: 600, delay: 300 + i * 70, easing: ease.outCubic
    });
  });
});

/* SKILLS */
onSectionEnter('skills', () => {
  const headers = document.querySelectorAll('#skills .eyebrow, #skills h2, #skills .section-sub');
  headers.forEach((el, i) => tween(el, {opacity:[0,1],translateY:[30,0]}, {duration:700, delay:i*110, easing:ease.outExpo}));

  document.querySelectorAll('.skill-card').forEach((el, i) => {
    tween(el, { opacity:[0,1], translateY:[50,0], scale:[.95,1] }, {
      duration: 700, delay: 200 + i * 90, easing: ease.outBack
    });
  });
});

/* PROJECTS */
onSectionEnter('projects', () => {
  const headers = document.querySelectorAll('#projects .eyebrow, #projects h2, #projects .section-sub');
  headers.forEach((el, i) => tween(el, {opacity:[0,1],translateY:[30,0]}, {duration:700, delay:i*110, easing:ease.outExpo}));

  document.querySelectorAll('.project-row').forEach((el, i) => {
    tween(el, { opacity:[0,1], translateX:[-40,0] }, {
      duration: 650, delay: 250 + i * 100, easing: ease.outCubic
    });
  });
}, 0.06);

/* EXPERIENCE */
onSectionEnter('experience', () => {
  const headers = document.querySelectorAll('#experience .eyebrow, #experience h2, #experience .section-sub');
  headers.forEach((el, i) => tween(el, {opacity:[0,1],translateY:[30,0]}, {duration:700, delay:i*110, easing:ease.outExpo}));

  document.querySelectorAll('.exp-card').forEach((el, i) => {
    tween(el, { opacity:[0,1], translateY:[56,0] }, {
      duration: 750, delay: 250 + i * 120, easing: ease.outBack
    });
  });
});

/* CONTACT */
onSectionEnter('contact', () => {
  const headers = document.querySelectorAll('#contact .eyebrow, #contact h2, #contact .section-sub');
  headers.forEach((el, i) => tween(el, {opacity:[0,1],translateY:[30,0]}, {duration:700, delay:i*120, easing:ease.outExpo}));

  document.querySelectorAll('.contact-row').forEach((el, i) => {
    tween(el, { opacity:[0,1], translateX:[36,0] }, {
      duration: 600, delay: 350 + i * 100, easing: ease.outCubic
    });
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── PARALLAX HERO PHOTO on scroll ── */
const heroPhoto = document.querySelector('.hero-photo-wrap img');
window.addEventListener('scroll', () => {
  if (!heroPhoto) return;
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroPhoto.style.transform = `translateY(${y * 0.12}px)`;
  }
}, { passive: true });
