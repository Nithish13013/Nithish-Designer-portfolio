gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════
   SECTION LABEL SWAP
════════════════════════════════════════ */
const fixedLabel = document.createElement('div');
fixedLabel.className = 'section-label';
fixedLabel.style.cssText = 'position:fixed;top:28px;left:28px;z-index:200;opacity:0;transition:opacity 0.4s,transform 0.4s;transform:translateY(4px);';
document.body.appendChild(fixedLabel);

const sections = [
  { el: document.querySelector('.intro'),            text: '// Intro' },
  { el: document.querySelector('.services'),         text: '// Services' },
  { el: document.querySelector('.tools'),            text: '// Tools' },
  { el: document.querySelector('.projects'),         text: '// Projects' },
  { el: document.querySelector('.portfolio-section'),text: '// Graphic Design' },
  { el: document.querySelector('.design-process'),   text: '// Process' },
  { el: document.querySelector('.experience'),       text: '// Experience' },
  { el: document.querySelector('.testimonials'),     text: '// Testimonials' },
  { el: document.querySelector('.contact'),          text: '// Contact' },
];

sections.forEach(({ el, text }) => {
  if (!el) return;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 40%',
    end: 'bottom 40%',
    onEnter: () => showLabel(text),
    onEnterBack: () => showLabel(text),
  });
});

function showLabel(text) {
  gsap.to(fixedLabel, { opacity: 0, y: -6, duration: 0.18, onComplete: () => {
    fixedLabel.textContent = text;
    fixedLabel.style.color = '#ff6b35';
    gsap.to(fixedLabel, { opacity: 1, y: 0, duration: 0.3 });
  }});
}

ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom 40%',
  onEnter: () => gsap.to(fixedLabel, { opacity: 0, duration: 0.3 }),
  onEnterBack: () => gsap.to(fixedLabel, { opacity: 0, duration: 0.3 }),
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
  .from('.hero-img-wrap', { y: 60, opacity: 0, duration: 1.2 }, '-=0.7')
  .from('.hero-role p', { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.6')
  .from('.hero-social a', { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.5')
  .from('.nav-logo, .nav-links a', { y: -16, opacity: 0, duration: 0.5, stagger: 0.07 }, 0);

/* ═══════════════════════════════════════
   INTRO – word-by-word reveal
════════════════════════════════════════ */
const introH = document.querySelector('.intro-headline');
if (introH) {
  introH.innerHTML = introH.innerHTML.replace(/(\S+)/g, '<span class="iword" style="display:inline-block;overflow:hidden;"><span class="iword-inner" style="display:inline-block;">$1</span></span> ');
  gsap.from('.iword-inner', {
    y: '105%',
    duration: 0.7,
    stagger: 0.025,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.intro-headline',
      start: 'top 80%',
    }
  });
}

gsap.from('.intro-sub p, .intro-sub .btn-pill', {
  y: 30,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.intro-sub',
    start: 'top 85%',
  }
});

/* ═══════════════════════════════════════
   INTRO HEADLINE – dark bg: muted grey → white
════════════════════════════════════════ */
ScrollTrigger.create({
  trigger: ".intro",
  start: "top 60%",
  end: "bottom 40%",
  onEnter:     () => gsap.to(".intro-headline", { color: "#ffffff", duration: 0.4 }),
  onEnterBack: () => gsap.to(".intro-headline", { color: "#ffffff", duration: 0.4 }),
  onLeave:     () => gsap.to(".intro-headline", { color: "#444444", duration: 0.4 }),
  onLeaveBack: () => gsap.to(".intro-headline", { color: "#444444", duration: 0.4 }),
});

/* ═══════════════════════════════════════
   SERVICES – sticky number 3D flip
════════════════════════════════════════ */
const nums = {
  n01: document.getElementById('sNum01'),
  n02: document.getElementById('sNum02'),
  n03: document.getElementById('sNum03'),
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
    onEnter:    () => { flipTo(nums.n02, currentNum); currentNum = nums.n02; },
    onLeaveBack:() => { flipTo(nums.n01, currentNum); currentNum = nums.n01; },
  });
}

if (document.getElementById('svcBlock03')) {
  ScrollTrigger.create({
    trigger: '#svcBlock03',
    start: 'top 55%',
    onEnter:    () => { flipTo(nums.n03, currentNum); currentNum = nums.n03; },
    onLeaveBack:() => { flipTo(nums.n02, currentNum); currentNum = nums.n02; },
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

document.querySelectorAll('.svc-row').forEach((row) => {
  gsap.to(row, {
    opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
    scrollTrigger: {
      trigger: row,
      start: 'top 88%',
      toggleActions: 'play none none none',
    }
  });
});

/* ═══════════════════════════════════════
   DESIGN PROCESS – animations
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
   EXPERIENCE ANIMATION
════════════════════════════════════════ */
gsap.from('.exp-title', {
  y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.experience', start: 'top 80%' }
});

gsap.from('.exp-year', {
  x: -30, opacity: 0, duration: 0.6,
  scrollTrigger: { trigger: '.exp-row', start: 'top 85%' }
});

gsap.from('.exp-role, .exp-company, .exp-desc', {
  y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: '.exp-row', start: 'top 85%' }
});

/* ═══════════════════════════════════════
   TOOLS
════════════════════════════════════════ */
gsap.to(".tool-card", {
  opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
  scrollTrigger: { trigger: ".tools-grid", start: "top 85%" }
});

/* ═══════════════════════════════════════
   UI/UX PROJECTS – RESPONSIVE GSAP
════════════════════════════════════════ */
let projectCards = gsap.utils.toArray(".uiux-projects .project-card");

ScrollTrigger.matchMedia({

  "(max-width: 768px)": function () {
    projectCards.forEach((card) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" } }
      );
    });
  },

  "(min-width: 769px) and (max-width: 1024px)": function () {
    projectCards.forEach((card) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" } }
      );
    });
  },

  "(min-width: 1025px)": function () {
    projectCards.forEach((card) => {
      gsap.fromTo(card,
        { y: 120, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", end: "top 40%", scrub: true } }
      );
    });
  }

});

/* ═══════════════════════════════════════
   TESTIMONIALS – slide switcher
════════════════════════════════════════ */
const slides  = document.querySelectorAll('.t-slide');
const avatars = document.querySelectorAll('.t-avatar');
const counter = document.getElementById('tCurrent');
let current = 0;

function goToSlide(idx) {
  slides[current].classList.remove('active');
  avatars[current].classList.remove('active');
  current = idx;
  slides[current].classList.add('active');
  avatars[current].classList.add('active');
  if (counter) counter.textContent = String(current + 1).padStart(2, '0');
}

avatars.forEach((av) => av.addEventListener('click', () => goToSlide(+av.dataset.slide)));
setInterval(() => goToSlide((current + 1) % slides.length), 5000);

gsap.from('.testimonial-wrap', {
  y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
  scrollTrigger: { trigger: '.testimonials', start: 'top 75%' }
});

/* ═══════════════════════════════════════
   CLIENTS MARQUEE
════════════════════════════════════════ */
const clientsTrack = document.getElementById('clientsTrack');
if (clientsTrack) {
  clientsTrack.innerHTML += clientsTrack.innerHTML;
  const totalW = clientsTrack.scrollWidth / 2;
  gsap.to(clientsTrack, { x: -totalW, duration: 20, ease: 'none', repeat: -1 });
}

/* ═══════════════════════════════════════
   CONTACT MARQUEE
════════════════════════════════════════ */
const contactTrack = document.getElementById('contactTrack');
if (contactTrack) {
  gsap.to(contactTrack, {
    x: '-50%', ease: 'none',
    scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });
}

gsap.to('.contact-photo-overlay', {
  y: -80, ease: 'none',
  scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true }
});

gsap.from('.contact-details', {
  y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
  scrollTrigger: { trigger: '.contact-details', start: 'top 90%' }
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
   CURSOR DOT
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

document.querySelectorAll('a, button, .project-card, .t-avatar, .svc-row, .dp-step').forEach(el => {
  el.addEventListener('mouseenter', () => gsap.to(dot, { scale: 3, duration: 0.3 }));
  el.addEventListener('mouseleave', () => gsap.to(dot, { scale: 1, duration: 0.3 }));
});