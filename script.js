gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════
   NAVBAR — switch to dark glass on scroll
════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
ScrollTrigger.create({
  trigger: '.hero',
  start: 'bottom top',
  onEnter:     () => navbar.classList.add('scrolled'),
  onLeaveBack: () => navbar.classList.remove('scrolled'),
});

/* ═══════════════════════════════════════
   HERO NAME MARQUEE
════════════════════════════════════════ */
const heroTrack = document.getElementById('heroTrack');
if (heroTrack) {
  gsap.to(heroTrack, {
    x: '-50%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });
}

/* ═══════════════════════════════════════
   HERO IMAGE PARALLAX
════════════════════════════════════════ */
gsap.to('.hero-img-wrap', {
  y: 120,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
});

/* ═══════════════════════════════════════
   HERO ENTRANCE
════════════════════════════════════════ */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .from('.hero-name-track span', { y: 80, opacity: 0, duration: 1, stagger: 0.1 })
  .from('.hero-img-wrap',        { y: 60, opacity: 0, duration: 1.2 }, '-=0.7')
  .from('.hero-role p',          { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.6')
  .from('.hero-social a',        { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.5')
  .from('.nav-logo, .nav-links a', { y: -16, opacity: 0, duration: 0.5, stagger: 0.07 }, 0);

/* ═══════════════════════════════════════
   INTRO – word-by-word reveal
════════════════════════════════════════ */
const introH = document.querySelector('.intro-headline');
if (introH) {
  introH.innerHTML = introH.innerHTML.replace(
    /(\S+)/g,
    '<span class="iword" style="display:inline-block;overflow:hidden;"><span class="iword-inner" style="display:inline-block;">$1</span></span> '
  );
  gsap.from('.iword-inner', {
    y: '105%',
    duration: 0.7,
    stagger: 0.025,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.intro-headline', start: 'top 80%' }
  });
}

gsap.from('.intro-right p, .intro-right .btn-pill', {
  y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: '.intro-right', start: 'top 85%' }
});

/* Intro headline colour: muted → white on scroll */
ScrollTrigger.create({
  trigger: '.intro',
  start: 'top 60%',
  end: 'bottom 40%',
  onEnter:     () => gsap.to('.intro-headline', { color: '#ffffff', duration: 0.4 }),
  onEnterBack: () => gsap.to('.intro-headline', { color: '#ffffff', duration: 0.4 }),
  onLeave:     () => gsap.to('.intro-headline', { color: '#444444', duration: 0.4 }),
  onLeaveBack: () => gsap.to('.intro-headline', { color: '#444444', duration: 0.4 }),
});

/* ═══════════════════════════════════════
   SERVICES – sticky number 3D flip
   Numbers are now solid white (.solid-num)
════════════════════════════════════════ */
const nums = {
  n01: document.getElementById('sNum01'),
  n02: document.getElementById('sNum02'),
};

function flipTo(incoming, outgoing) {
  if (!outgoing || !incoming) return;
  gsap.to(outgoing, {
    rotateX: 90, opacity: 0, duration: 0.45, ease: 'power2.in',
    transformOrigin: 'center top',
    onComplete: () => outgoing.classList.add('hidden'),
  });
  incoming.classList.remove('hidden');
  gsap.fromTo(incoming,
    { rotateX: -90, opacity: 0 },
    { rotateX: 0, opacity: 1, duration: 0.55, ease: 'power2.out', delay: 0.15, transformOrigin: 'center bottom' }
  );
}

let currentNum = nums.n01;

if (document.getElementById('svcBlock02')) {
  ScrollTrigger.create({
    trigger: '#svcBlock02',
    start: 'top 55%',
    onEnter:     () => { flipTo(nums.n02, currentNum); currentNum = nums.n02; },
    onLeaveBack: () => { flipTo(nums.n01, currentNum); currentNum = nums.n01; },
  });
}

/* Services headings: grey → white */
document.querySelectorAll('.svc-head h2').forEach(h => {
  gsap.to(h, {
    color: '#ffffff',
    duration: 0.5,
    scrollTrigger: {
      trigger: h,
      start: 'top 65%',
      toggleActions: 'play none none reverse',
    }
  });
});

document.querySelectorAll('.svc-row').forEach(row => {
  gsap.fromTo(row,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* ═══════════════════════════════════════
   TOOLS
════════════════════════════════════════ */
gsap.fromTo('.tool-card',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '.tools-grid', start: 'top 85%' }
  }
);

/* ═══════════════════════════════════════
   UI/UX PROJECTS – responsive GSAP
════════════════════════════════════════ */
const projectCards = gsap.utils.toArray('.uiux-projects .project-card');

projectCards.forEach((card, i) => {
  gsap.fromTo(card,
    { y: 100, opacity: 0, scale: 0.95 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      delay: i * 0.08,
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    }
  );
});

/* ═══════════════════════════════════════
   GRAPHIC DESIGN — INFINITE CAROUSEL
   • Auto-scrolls left continuously
   • Hovering ANY card pauses the whole track
   • Mouse leave resumes
   • Center card is brightest/largest, edges dim + shrink
════════════════════════════════════════ */
(function () {
  const vp    = document.getElementById('gdViewport');
  const track = document.getElementById('gdTrack');
  if (!vp || !track) return;

  // ── Pause / resume on card hover ──
  const allCards = track.querySelectorAll('.gd-card');

  allCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      track.classList.add('paused');
    });
    card.addEventListener('mouseleave', () => {
      track.classList.remove('paused');
    });
  });

  // ── Per-frame: scale + brightness falloff from viewport centre ──
  function updateScales() {
    const vpRect   = vp.getBoundingClientRect();
    const vpCenter = vpRect.left + vpRect.width / 2;

    allCards.forEach(card => {
      const rect       = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist       = Math.abs(vpCenter - cardCenter);
      const maxDist    = vpRect.width / 2;
      const ratio      = Math.min(dist / maxDist, 1);

      // scale: 1.0 at centre → 0.82 at edges
      const scale      = 1 - ratio * 0.18;
      // brightness: 1.0 at centre → 0.5 at edges
      const brightness = 1 - ratio * 0.50;

      card.style.transform = `scale(${scale.toFixed(3)})`;
      card.style.filter    = `brightness(${brightness.toFixed(3)})`;
    });

    requestAnimationFrame(updateScales);
  }

  updateScales();

  // ── GSAP scroll entrance ──
  gsap.from('.graphic-projects .gd-card', {
    y: 50, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: '.graphic-projects', start: 'top 80%' }
  });
})();

/* ═══════════════════════════════════════
   DESIGN PROCESS
════════════════════════════════════════ */
gsap.to('.dp-title', {
  opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.design-process', start: 'top 75%' }
});

gsap.to('.dp-subtitle', {
  opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2,
  scrollTrigger: { trigger: '.design-process', start: 'top 75%' }
});

document.querySelectorAll('.dp-step').forEach((step, i) => {
  gsap.to(step, {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
    scrollTrigger: { trigger: '.dp-steps', start: 'top 80%', toggleActions: 'play none none none' }
  });
});

/* ═══════════════════════════════════════
   EXPERIENCE
════════════════════════════════════════ */
gsap.from('.exp-year', {
  x: -30, opacity: 0, duration: 0.6,
  scrollTrigger: { trigger: '.exp-row', start: 'top 85%' }
});

gsap.from('.exp-role, .exp-company, .exp-desc', {
  y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: '.exp-row', start: 'top 85%' }
});

/* ═══════════════════════════════════════
   TESTIMONIALS – slide switcher
════════════════════════════════════════ */
const slides  = document.querySelectorAll('.t-slide');
const avatars = document.querySelectorAll('.t-avatar');
const counter = document.getElementById('tCurrent');
let current   = 0;

function goToSlide(idx) {
  slides[current].classList.remove('active');
  avatars[current].classList.remove('active');
  current = idx;
  slides[current].classList.add('active');
  avatars[current].classList.add('active');
  if (counter) counter.textContent = String(current + 1).padStart(2, '0');
}

avatars.forEach(av => av.addEventListener('click', () => goToSlide(+av.dataset.slide)));
setInterval(() => goToSlide((current + 1) % slides.length), 5000);

gsap.from('.testimonial-wrap', {
  y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
  scrollTrigger: { trigger: '.testimonials', start: 'top 75%' }
});

/* ═══════════════════════════════════════
   SMOOTH SCROLL
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ═══════════════════════════════════════
   CUSTOM CURSOR DOT
════════════════════════════════════════ */
const dot = document.createElement('div');
dot.style.cssText = `
  position:fixed; width:8px; height:8px; background:#ff6b35;
  border-radius:50%; pointer-events:none; z-index:9999;
  transform:translate(-50%,-50%); transition:transform 0.15s, opacity 0.3s;
  top:0; left:0; opacity:0;
`;
document.body.appendChild(dot);

document.addEventListener('mousemove', e => {
  gsap.to(dot, { left: e.clientX, top: e.clientY, duration: 0.15, ease: 'power2.out', opacity: 1 });
});

document.addEventListener('mouseleave', () => gsap.to(dot, { opacity: 0, duration: 0.3 }));

document.querySelectorAll('a, button, .project-card, .t-avatar, .svc-row, .dp-step, .gd-card').forEach(el => {
  el.addEventListener('mouseenter', () => gsap.to(dot, { scale: 3, duration: 0.3 }));
  el.addEventListener('mouseleave', () => gsap.to(dot, { scale: 1, duration: 0.3 }));
});